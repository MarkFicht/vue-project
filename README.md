# Game board (React)

React 19 + Vite + Firebase (Auth, Firestore, RTDB).

After user authorization, we will be able to play one of 3 online games.

Two of the games are modeled on classic board games: `Splendor` and `7 Wonders Duel`.

The third game written in `Canvas and JS`, in which we fight zombies in cooperation mode

Ultimately, the website is intended for `desktop computers` and tested in the `Chrome` browser

## In construction

-   Implements missing redirection cases
-   Implements rules in Firestore
-   Implements the `Settings` page
-   Adds DEMO video from game + screenshots
-   Prepares mechanism for `Splendor` game
-   Prepares mechanism for `Canvas + Js` game
-   Fixes and tests other bugs in `7 Wonders Duel`
-   Implements responsive for all devices
-   etc...

## DEMO

[DEMO here](https://vue-project-d53d4.web.app/) - `https://vue-project-d53d4.web.app/`

## Screens and Videos

-   Soon

## Rules of games

-   Soon

## Chat web push setup

1. In Firebase Console open: Project settings -> Cloud Messaging.
2. In "Web configuration" generate a Web Push certificate key pair.
3. Create `.env` from `.env.example` and set `VITE_FIREBASE_VAPID_KEY`.
4. Deploy updated Firestore rules (`firestore.rules`).
5. Reload app and allow browser notifications.

## App Check (optional, anti-abuse)

Protects Firebase APIs (Auth, Firestore, RTDB) from scripts without your app. **Off by default** until you set env vars.

### 1. Firebase Console

1. **Build → App Check** → register your **Web** app.
2. Provider: **reCAPTCHA v3** (create/link site key in Google reCAPTCHA admin if needed).
3. Copy the **site key** (public, not the secret).

### 2. Local `.env`

```env
VITE_FIREBASE_APP_CHECK_SITE_KEY=your_recaptcha_v3_site_key
```

Restart `npm run dev`. Console should log: `[App Check] Initialized (reCAPTCHA v3)`.

### 3. Local dev with enforcement

If Console already **enforces** App Check:

1. App Check → **Manage debug tokens** → add a token (any UUID).
2. In `.env` add `VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN=<that token>`.
3. Reload — dev uses the debug provider via that token.

### 4. Turn on enforcement (production)

In App Check → **APIs**, enable enforcement for **Authentication**, **Cloud Firestore**, and **Realtime Database** when metrics look good (start with “Monitor” if available).

Without `VITE_FIREBASE_APP_CHECK_SITE_KEY`, the app works as before (no App Check).

### 5. Firestore rules (optional, stricter)

After enforcement works, you can require a valid App Check token in rules, e.g. `request.app != null` together with `request.auth != null`. Do this only when all clients send App Check tokens.

## Status

Project: <b>In progress</b>

Auth: <b>Done</b>

Duel Game: <b>In tested</b>

Splendor Game: <b>In the future</b>

Reflex Game: <b>In the future</b>

Settings: <b>In the future</b>

## License

-   MIT
