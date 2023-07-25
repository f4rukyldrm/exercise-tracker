const express = require('express');
const app = express();

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Exercise = require('./models/Exercise');
mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 4000;

// for fcc tests
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/users', async (req, res) => {
    const username = req.body.username;

    try {
        const userDoc = await User.create({ username });
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

app.post('/api/users/:_id/exercises', async (req, res) => {

    const _id = req.params._id;
    let { description, duration, date } = req.body;

    try {
        const userDoc = await User.findOne({ _id });

        const exerciseDoc = await Exercise.create({
            user_id: userDoc._id,
            description,
            duration,
            date: date ? new Date(date) : new Date()
        });

        res.json({
            username: userDoc.username,
            description,
            duration: exerciseDoc.duration,
            date: new Date(exerciseDoc.date).toDateString(),
            _id
        });

    } catch (error) {
        res.json(error);
    }
});

app.get('/api/users/:_id/logs', async (req, res) => {

    const { from, to, limit } = req.query;
    const _id = req.params._id;

    try {
        const userDoc = await User.findById(_id);

        let dateObj = {};
        let filter = { user_id: _id };

        if (from) {
            dateObj['$gte'] = new Date(from)
        }
        if (to) {
            dateObj['$lte'] = new Date(to);
        }

        if (from || to) {
            filter['date'] = dateObj;
        }

        const exercises = await Exercise.find(filter).limit(limit ? +limit : 20);

        const log = exercises.map((e) => {
            return {
                description: e.description,
                duration: e.duration,
                date: new Date(e.date).toDateString()
            }
        })

        res.json({
            username: userDoc.username,
            count: exercises.length,
            _id,
            log
        });
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, console.log('app listening on:', PORT));