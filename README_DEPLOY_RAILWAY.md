# Deploying MediMap to Railway.app

Follow these simple steps perfectly to host your application on Railway with zero cold-starts.

## Step 1: Upload Your Code to GitHub
Railway pulls your code directly from a GitHub repository.

1. Create a GitHub account if you don't have one: [github.com](https://github.com/)
2. Install Git on your computer if it isn't already installed: [git-scm.com](https://git-scm.com/)
3. Stop your local servers (`Ctrl+C` in your terminal).
4. Run these exact commands in your `Field Project` folder to push your code:
    ```bash
    git init
    git add .
    git commit -m "Initial Deployment Ready"
    ```
5. Create a **New Repository** on GitHub (keep it private if you wish).
6. Copy the commands GitHub gives you under *"…or push an existing repository from the command line"* and run them in your terminal.
   *(It will look like `git remote add origin ...` followed by `git push -u origin main`)*

## Step 2: Create a PostgreSQL Database on Railway
1. Go to [Railway.app](https://railway.app), log in with GitHub, and create a **New Project**.
2. Select **Provision PostgreSQL**. Railway will instantly create a live database.
3. Once created, click on the PostgreSQL service -> **Variables**.
4. You will see a `DATABASE_URL`. Copy this value! You will need it for the backend.

## Step 3: Deploy the Backend
1. On your Railway project dashboard, click **New** -> **GitHub Repo**.
2. Select your `medimap` repository.
3. Railway needs to know you only want to deploy the backend folder for this service.
   - Click on the new service that was added.
   - Go to **Settings** -> **Root Directory** and type `/backend`.
4. Go to the **Variables** tab for this backend service and add:
   - `DATABASE_URL`: *(paste the value you copied from PostgreSQL)*
   - `PORT`: `5000`
5. Railway will now automatically deploy your Node.js server.
   *Wait for it to turn green.*
6. Finally, go to the **Settings** tab of the backend service and click **Generate Domain** under "Public Networking". 
   - **Copy this URL**. It's your live backend URL (e.g., `https://medimap-backend-production.up.railway.app`).

## Step 4: Seed the Database
Before your frontend can show anything, we need to push data into the live DB.
1. In the Railway dashboard for your backend, click **Variables** -> **Raw Editor** and ensure `DATABASE_URL` is there. 
2. Locally on your laptop, open `backend/.env` and temporary change the `DB_URL` string to your *Railway* `DATABASE_URL`.
3. Run this locally to fill the live DB:
   ```bash
   npm run seed:pg --prefix backend
   ```
4. After it says "SUCCESS", change your local `backend/.env` back to your local PG database if you wish to keep developing locally!

## Step 5: Deploy the Frontend
1. On the same Railway project dashboard, click **New** -> **GitHub Repo** again.
2. Select your `medimap` repository again.
3. This time, we want to configure the frontend:
   - Click on this newly added service.
   - Go to **Settings** -> **Root Directory** and type `/frontend`.
4. Go to the **Variables** tab for the frontend and add:
   - `VITE_API_BASE_URL`: *(paste the Backend Domain URL you copied in Step 3)*
5. Railway will deploy your React frontend.
6. Go to **Settings** for the frontend service, click **Generate Domain**.
7. Click the domain to view your live, production-ready app!

---
*Note: Any time you push new code to GitHub (`git add .`, `git commit -m "update"`, `git push`), Railway will automatically rebuild and update your live site!*
