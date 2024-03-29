const express = require('express');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const router = express.Router();

const Story = require('../models/Story');


// @desc login/landing page
// @route GET /

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});


// @desc dashboard page
// @route GET /dashboard

router.get('/dashboard', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        });
    } catch(err) {
        console.log(err);
        res.render('error/500');
    }
});

module.exports = router;