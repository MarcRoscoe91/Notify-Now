# Notify-Now
# Notify-Now

Notify-Now is a reminder service consisting of a TypeScript/Express backend and a static HTML frontend. This repository contains everything you need to run the stack locally or deploy it on [Render](https://render.com).

## Repository structure

- `notifynow-backend/` – Express API with authentication, cron jobs, and vehicle/document endpoints.
- `notifynow-frontend/` – Static HTML/JS frontend that communicates with the API via `fetch`.
- `notifynow-stack/` – Legacy demo assets that are not used for deployment.
- `render.yaml` – Render Blueprint that provisions the backend and frontend.

## Requirements

- Node.js 20+
- npm 9+
- Render account (for deployment)

## Environment variables

The backend relies on the following variables:

| Variable | Required | Description |
| --- | --- | --- |
| `JWT_SECRET` | ✅ | Secret used to sign session tokens. Generate a long random string. |
| `APP_ORIGIN` | ✅ (in production) | Comma-separated list of allowed frontend origins. The Blueprint automatically injects the Render static site URL. |
| `RESEND_API_KEY` | optional | API key for [Resend](https://resend.com/) email delivery. |
| `EMAIL_FROM` | optional | Custom "from" address when using Resend (defaults to `NotifyNow <no-reply@example.com>`). |
| `SENDGRID_API_KEY` | optional | API key for [SendGrid](https://sendgrid.com/). |
| `SENDGRID_FROM` | optional | Custom "from" address when using SendGrid. |
| `DVSA_API_KEY` | optional | Key for DVSA integrations. |
| `DVLA_API_KEY` | optional | Key for DVLA integrations. |

The frontend build script accepts `NOTIFY_NOW_API_BASE`, which should be the public URL of the backend service (e.g. `https://notifynow-backend.onrender.com`).

## Local development

1. Install backend dependencies and build:
   ```bash
   cd notifynow-backend
   npm install
   npm run build
   npm start
   ```
   The API listens on `http://localhost:4000` by default.

2. Serve the frontend using any static file server (e.g. `npx serve notifynow-frontend`). By default it talks to `/api`, so either host it behind the same origin as the backend or set `NOTIFY_NOW_API_BASE` before running `notifynow-frontend/render-build.sh`.

## Deploying to Render

You can deploy both services in one shot using Render Blueprints:

1. Push this repository to a Git provider supported by Render.
2. In Render, choose **Blueprints** → **New Blueprint Instance** and point it at your repository.
3. Render will read `render.yaml` and propose two services:
   - `notifynow-backend` (Node web service)
   - `notifynow-frontend` (static site)
4. During the first deploy, provide values for the secret environment variables (e.g. `JWT_SECRET`, API keys). Render will remember them for future deploys.
5. The Blueprint wires `APP_ORIGIN` to the frontend URL and `NOTIFY_NOW_API_BASE` to the backend URL automatically so cross-site cookies work without extra setup.
6. Trigger the deploy. The static site's build command runs `render-build.sh`, which writes `notifynow-frontend/js/config.js` with the correct API base URL before publishing the files.

If you prefer manual setup, create a Node Web Service for `notifynow-backend` (build command `npm install && npm run build`, start command `npm start`) and a Static Site for `notifynow-frontend` (build command `./render-build.sh`, publish directory `.`). Configure the environment variables as shown above.

## Deploying outside Render

The same `render-build.sh` script can be reused anywhere you host the static files. Export `NOTIFY_NOW_API_BASE` to point at your API endpoint and run the script before uploading the frontend assets.

## Limitations

This environment cannot access external networks, so the project has **not** been deployed to Render from within this workspace. Follow the steps above in your own Render account to perform the deployment.
