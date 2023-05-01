const express = require('express');
const router = express.Router();
const Animal = require('../models/animals.model');
const auth = require('../auth.middleware');

// get all animals
router.get("/animals", async function(req, res, next) {
    let offset = parseInt(req.query.offset) || 0;
    let limit = parseInt(req.query.limit) || 5;

    try {

        let count = (await Animal.find()).length;
        let results = await Animal.find().skip(offset).limit(limit);
        let queryStringNext = `?offset=${offset + limit}&limit=${limit}`;
        let queryStringPrev = null;

        if (offset >= limit) {
            queryStringPrev = `?offset=${offset - limit}&limit=${limit}`;
        }

        let apiUrl = `${req.protocol}://${req.hostname}${req.hostname === 'localhost' ? ':4000' : '' }`;
        let apiPath = `${req.baseUrl}${req.path}`;

        let output = {
            count,
            next: (offset + limit < count) ? apiUrl + apiPath + queryStringNext : null,
            prev: (offset > 0) ? apiUrl + apiPath + queryStringPrev : null,
            results,
            url: apiUrl + req.originalUrl
        }

        return res.status(200).json(output);
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