# Voting App

An Online Voting Platform for Admin, Candidate and Voter users.
Admin can create elections and add voters and candidates to them. They can also edit users and manifestos if needed.
Currently only in development - When admin adds a voter or candidate, an email is sent a test mailtrap account with login data for users. An email is also sent to confirm a voters vote. This feature is in progress and will be added to production. 
Candidates can create and edit their manifestos as well as see election and voter data.
Voters can view their elections, view candidates data and place a vote. 

See it live at [https://jims-voting-app.netlify.app/](https://jims-voting-app.netlify.app/)

The client was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template, utilising RTK Query.

The server uses Node.js with Express and a PostreSQL database.

Tests for this app are in progress.

## Local set up
 - Create a PostgreSQL database
 - Copy and paste the psql code found in database.pqsl to set up schema
 - Insert an admin user into admin table 

- create a .env file in the root directory, it will need to include the following;

PG_USER = postgres user \
PG_PASSWORD = postgres password \
PG_DATABASE = newly created db \
PG_HOST = localhost \
PG_PORT = usually 5432

JWT_SECRET = can be anything

app uses Nodemailer so you will need to set up an account and insert credentials
NODEMAILER_USER = user \
NODEMAILER_PASS = pass

CORS_ORIGIN = https://localhost:3000

 - You should now be able to create your own elections and add voters and canidates to it.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `nodemon app`

Runs server on http://localhost:4000

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Learn more about [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
