const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server/.env') });

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

async function test() {
    try {
        console.log("Authenticating...");
        const tokenRes = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }), {
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const access_token = tokenRes.data.access_token;
        console.log("Token obtained!");

        console.log("Fetching currently playing...");
        try {
            const nowRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            console.log("currently-playing status:", nowRes.status);
            
            if (nowRes.status === 204 || nowRes.status > 400 || !nowRes.data || !nowRes.data.item) {
                console.log("Fetching recently played...");
                const recentRes = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                if (recentRes.data.items.length > 0) {
                    console.log("Recently played track:", recentRes.data.items[0].track.name);
                } else {
                    console.log("No recently played tracks.");
                }
            } else {
                console.log("Currently playing track:", nowRes.data.item.name);
            }
        } catch (e) {
            console.error("Fetch Error:", e.message);
            if (e.response) console.error("Response:", e.response.status, e.response.data);
        }
    } catch (e) {
        console.error("Auth Error:", e.message);
        if (e.response) console.error("Auth Response:", e.response.status, e.response.data);
    }
}
test();
