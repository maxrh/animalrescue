const express = require('express');
const router = express.Router();
const Animal = require('../models/animals.model');

// get all animals
router.get("/animals", async function(req, res, next) {
    try {
        let result = await Animal.find();
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
});

// get single animal by id
router.get("/animals/:id", async function(req, res, next) {

    try {
        let result = await Animal.findById(req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }

});

module.exports = router;