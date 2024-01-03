# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


# Nest.js Application with PostgreSQL

## Introduction
This document provides instructions on how to set up and start a Nest.js application with a PostgreSQL database. The application is configured to work with the Rick and Morty API, populating the database with character data.

## Prerequisites
- Node.js
- PostgreSQL Database

## Environment Setup
Before starting the application, ensure that you have the following environment variables set in your `.env` file:
- `DB_PORT`
- `DB_DATABASE`
- `DB_USER`
- `DB_HOST`
- `DB_PASS`

These variables configure the PostgreSQL database connection.

## Starting the Application

1. **Change Directory**:
Navigate to the API's directory:
`cd ./rm-api`
2. **Install Dependencies**: 
Install the required Node.js packages:
`npm i`
3. **Database Setup**:
Ensure your PostgreSQL database is running and accessible with the credentials provided in the `.env` file.
4. **Populate Database**:
Run the script to populate the database with data from the Rick and Morty API:
`node ./scripts/populateDB.js`
5. **Start the Nest.js Application in Development Mode**:
Run the application:
`npm run start:dev`

## Usage
After starting the application, you can access the API endpoints as defined in your Nest.js application.
