# Budget Tracker

Just a simple app for tracking budget with an ability to add expenses with categories.


## Features
- Track budgets based on their categories
- Budget & Expense charts
- Auto-save on browser's local storage

# Installation Guide

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes bundled with Node.js)
- Git (for cloning the repository)

## Step 1: Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Wafflegum/budget-tracker.git
```

## Step 2: Install Dependencies

Navigate into the project directory and install dependencies using npm:

```bash
npm install
```

This will download all required packages specified in the `package.json` file.

## Step 3: Start Development Server

Start the development server using Vite:

```bash
npm run dev
```

This command will start the development server, which you can access at `http://localhost:3000`.

## Step 4: Build and Deploy (Optional)

To build and deploy your application in production mode, use the following command:

```bash
npm run build
```

This will create a `dist` directory containing the compiled React code. You can then serve this directory using any web server or hosting platform.

## Tips

- Make sure to install all dependencies by running `npm install` before starting the development server.
- Use `npm run dev -- --port <port_number>` to start the development server on a custom port (e.g., `npm run dev -- --port 3001`).
- Run `npm run build --prod` for production builds.

## Troubleshooting

If you encounter any issues during installation or deployment, please refer to the Vite documentation or React documentation for troubleshooting guides.
