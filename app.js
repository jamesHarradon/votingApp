const createError = require('http-errors');
const compression = require('compression')
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

require('./config/passport')

const voterRouter = require('./api/routes/voter-route');
const candidateRouter = require('./api/routes/candidate-route');
const electionRouter = require('./api/routes/election-route');
const manifestoRouter = require('./api/routes/manifesto-route');
const authRouter = require('./api/routes/auth-route');
const userRouter = require('./api/routes/user-route');
const resultRouter = require('./api/routes/result-route');

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

//cors
const origin = {
  origin: process.env.CORS_ORIGIN,
  credentials: true
}

app.use(cors(origin));
app.options('*', cors(origin));

//view engine setup
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

//routes
app.use('/api/voter', voterRouter);
app.use('/api/candidate', candidateRouter);
app.use('/api/election', electionRouter);
app.use('/api/manifesto', manifestoRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/result', resultRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   //res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status || 500).send({Error: message});
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

module.exports = app;
