# CreditBoost360

📈 CreditBoost360

CreditBoost360 is a financial empowerment platform designed to help small businesses and individuals improve their creditworthiness through personalized insights, education, and actionable steps. This repository contains the source code, documentation, and resources for building and deploying the CreditBoost360 platform, providing users with tools to manage their finances effectively and boost their credit scores.

🌟 Key Features

Credit Monitoring: Real-time tracking of credit scores, credit reports, and financial activities. Users receive notifications and updates to stay informed about any changes that affect their credit.

Gamification & Rewards: Engaging elements like points, badges, and progress levels to motivate users to take actions that improve their credit scores, such as paying bills on time or reducing debt.

Personalized Action Plans: AI-driven recommendations tailored to each user’s financial situation, offering actionable steps to improve credit health, such as budgeting tips, debt management strategies, and spending insights.

Financial Literacy Hub: An educational resource center with articles, tutorials, and interactive tools that help users understand credit, budgeting, debt management, and more.

Credit Score Simulator: Allows users to simulate different financial actions and see how they might impact their credit score, helping them make informed decisions.

Expense Tracking: Enables users to track their spending habits and identify areas where they can cut back, optimize their budget, or reallocate funds to improve their creditworthiness.

Credit Goal Setting: Users can set credit improvement goals and track their progress over time. The platform offers suggestions and resources to help achieve these goals faster.

Financial Alerts & Notifications: Instant alerts on late payments, credit score changes, or fraudulent activities, ensuring that users are always aware of their financial standing.

Integration with Financial Institutions: Securely connects with banks, credit unions, and other financial institutions to gather data for a comprehensive view of the user's financial health.

Data Security & Privacy: CreditBoost360 employs advanced encryption and security protocols to ensure all user data is protected, adhering to best practices for handling sensitive financial information.

## Overview

This AI powered platforms revolutionizes credit scoring with a **React Vite** frontend and a **Django** backend. The app follows a structured development workflow with three branches: `dev`, `main`, and `production`.

## Project Structure

- **Frontend**: React with Vite for fast development.
- **Backend**: Django for handling server-side logic.

## Branch Workflow

- **dev branch**: All developers push their changes here.
- **main branch**: Code is reviewed by another team member and merged from `dev` to `main`.
- **production branch**: The team lead reviews code from the `main` branch and pushes it to `production`.

## Installation

### Prerequisites

Ensure that the following are installed on your local machine:

- Node.js (v20 or later)
- Python (v3.8 or later)
- Git
- PostgreSQL/MySQL (or your preferred database) Note the backend uses the default db.mysql

### Backend (Django)

1. Clone the repository - PAT is your personal access token for github:

   ```bash
   git clone https://{PAT}@github.com/CreditBoost360/CreditBoost.git
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Set up a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

4. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Navigate to backend repository:

   ```bash
   cd backend
   ```

6. Create a `.env` file based on `.env.example` and update your database and other environment variables:

   ```bash
   cp .env.example .env
   ```

7. Run database migrations:

   ```bash
   python manage.py migrate
   ```

8. Start the Django server:

   ```bash
   python manage.py runserver
   ```

### Frontend (React Vite)

1. Navigate to the frontend directory:

   ```bash
   cd frontEnd
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

## Running the Project

- Run the Django backend server and the Vite frontend server simultaneously.
- The backend will run on `http://localhost:8000`, and the frontend will run on `http://localhost:5173`.

## Deployment

### Backend

1. Set up your production environment and make sure all environment variables in `.env` are updated.

2. Migrate the database:

   ```bash
   python manage.py migrate
   ```

3. Collect static files:

   ```bash
   python manage.py collectstatic
   ```

4. Use a production server like `gunicorn` or `uwsgi` to serve the Django backend.

### Frontend

1. Build the frontend for production:

   ```bash
   npm run build
   ```

2. Serve the built files using a web server like Nginx or Apache.
