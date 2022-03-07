const createError = require('http-errors');
const compression = require('compression')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

require('./config/passport')

const { addVoterData, addCandidateData, addPassword, updateElectionVoters } = require('./fakeDataInsert');


const voterRouter = require('./api/routes/voter-route');
const candidateRouter = require('./api/routes/candidate-route');
const electionRouter = require('./api/routes/election-route');
const manifestoRouter = require('./api/routes/manifesto-route');
const authRouter = require('./api/routes/auth-route');

//swagger
const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Voting App API",
          version: "1.0.0",
          description: "An API for a Voting App for Voters, Candidates and Elections"
      },
      schema: [
          "http",
          "https"
      ],
      servers: [
          {
            url: "http://localhost:4000",
          }
      ],
  },
  apis: ["./swagger.yml"]
}



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//swagger
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

//compression
app.use(compression());

//set up
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/voter', voterRouter);
app.use('/candidate', candidateRouter);
app.use('/election', electionRouter);
app.use('/manifesto', manifestoRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
