const express = require('express');
const annonce = express.Router();
const utils = require('../utils/utils');
const { getAnnonce, postAnnonce, updateAnnonce } = require('../middlewares/annonces');

annonce.get('/', getAnnonce, (req, res, next) => {
   res.status(200);
   res.json(req.annonces);
});

annonce.post('/', postAnnonce, (req, res, next) => {
   res.status(201);
   res.json({"message": "annonce created", "annonce": req.annonce});
});

annonce.put('/:id', updateAnnonce, (req, res, next) => {
   res.status(200);
   res.json({"message": "annonce updated", "modifs": req.modifs});
});

module.exports = annonce;