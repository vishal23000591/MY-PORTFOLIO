# Spotify API Setup Guide

To make your "Now Playing" widget live, follow these steps to get your API credentials.

## 1. Create a Spotify Developer App
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Log in with your Spotify account.
3. Click **"Create App"**.
4. Set the **App Name** (e.g., "Portfolio") and **Description**.
5. Set the **Redirect URI** to: `http://localhost:3000` (or any valid URL, we just need it once).

## 2. Get Client ID & Client Secret
1. Open your new app's settings.
2. Copy the **Client ID** and **Client Secret**.
3. Add them to your `/server/.env` file:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

## 3. Get Refresh Token
1. Construct this URL in your browser (replace `CLIENT_ID`):
   `https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played`
2. Log in and authorize.
3. You will be redirected to `http://localhost:3000/?code=AQ...`.
4. Copy the long `code` string from the URL.
5. In your terminal, run this command (replace `CLIENT_ID`, `CLIENT_SECRET`, and `CODE`):
   ```bash
   curl -H "Authorization: Basic $(echo -n CLIENT_ID:CLIENT_SECRET | base64)" \
   -d grant_type=authorization_code -d code=CODE \
   -d redirect_uri=http://localhost:3000 https://accounts.spotify.com/api/token
   ```
6. The JSON response will contain a `"refresh_token"`. Copy it!
7. Add it to your `/server/.env`:
   ```env
   SPOTIFY_REFRESH_TOKEN=your_refresh_token
   ```

## 4. Final Step
Once the keys are in `.env`, the backend will automatically start fetching your live music activity!
