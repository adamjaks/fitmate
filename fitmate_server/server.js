const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");

const users = require("./routes/api/users");
const trainings = require("./routes/api/trainings");
const exercises = require("./routes/api/exercises");
const categories = require("./routes/api/categories");
const trainingDays = require("./routes/api/trainingDays");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/trainings", trainings);
app.use("/api/exercises", exercises);
app.use("/api/categories", categories);
app.use("/api/training-days", trainingDays);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));