const express = require('express');
const router = express.Router();
const Animal = require('../models/animals.model');
const auth = require('../auth.middleware');

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

// create new animal
router.post("/animals", auth, async function(req, res, next) {
    try {
        let result = await Animal.create(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return next(error);
    }
});

// update animal by id
router.patch("/animals/:id", auth, async function(req, res, next) {
    try {
        let result = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
});

// delete animal by id
router.delete("/animals/:id", auth, async function(req, res, next) {
    try {
        await Animal.findByIdAndDelete(req.params.id);
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
});

module.exports = router;