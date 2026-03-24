const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const app = express();
const PORT = process.env.PORT || 5001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Spotify Credentials
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const access_token_permanent = process.env.SPOTIFY_ACCESS_TOKEN; // Temporary token from user

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    if (access_token_permanent && !refresh_token) {
        return { access_token: access_token_permanent };
    }

    const response = await axios.post(TOKEN_ENDPOINT, new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
    }), {
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};

const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

const getRecentlyPlayed = async () => {
    try {
        const { access_token } = await getAccessToken();

        return await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
    } catch (error) {
        console.error('Error fetching recently played:', error.response?.data || error.message);
        throw error;
    }
};

app.use(cors());
app.use(express.json());

// Main site email route
app.post('/api/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: (process.env.EMAIL_USER || "").trim(),
        pass: (process.env.EMAIL_PASS || "").replace(/\s/g, "")
      }
    });

    const mailOptionsOwner = {
      from: (process.env.EMAIL_USER || "").trim(),
      to: 'vishalsuresh1975@gmail.com',
      subject: `New Transmission: ${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    const mailOptionsVisitor = {
      from: (process.env.EMAIL_USER || "").trim(),
      to: email,
      subject: 'Message Received - Vishal Suresh Portfolio',
      text: `Hello ${name},\n\nThank you for reaching out! This is an automated confirmation that I have received your message regarding "${subject}".\n\nI will review your transmission and get back to you shortly.\n\nBest regards,\nVishal Suresh`
    };

    await transporter.sendMail(mailOptionsOwner);
    await transporter.sendMail(mailOptionsVisitor);

    res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
});

// Spotify Route
app.get('/api/spotify/now-playing', async (req, res) => {
    try {
        if (!client_id || !client_secret || !refresh_token) {
            return res.status(200).json({ isPlaying: false, title: "Not Connected", artist: "Setup Spotify API" });
        }

        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            const recentResponse = await getRecentlyPlayed();
            const track = recentResponse.data.items[0].track;
            
            return res.status(200).json({
                isPlaying: false,
                title: track.name,
                artist: track.artists.map((_artist) => _artist.name).join(', '),
                albumArt: track.album.images[0].url,
                songUrl: track.external_urls.spotify,
            });
        }

        const song = response.data;
        res.status(200).json({
            isPlaying: song.is_playing,
            title: song.item.name,
            artist: song.item.artists.map((_artist) => _artist.name).join(', '),
            albumArt: song.item.album.images[0].url,
            songUrl: song.item.external_urls.spotify,
        });
    } catch (error) {
        console.error('Spotify API Error:', error.message);
        res.status(200).json({ isPlaying: false, title: "Offline", artist: "Spotify API" });
    }
});

app.get('/api/spotify/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: 'Query parameter "q" is required' });

        if (!client_id || !client_secret || !refresh_token) {
            return res.status(200).json({ tracks: { items: [] } });
        }

        const { access_token } = await getAccessToken();

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=4`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Spotify Search Error:', error.message);
        res.status(500).json({ error: 'Failed to search Spotify tracks' });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
