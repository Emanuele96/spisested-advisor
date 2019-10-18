const express = require('express');
const router = express.Router();

const Company = require('../models/company.model');

// @route     GET companies
// @desc      Get all companies with possible sorts and filters on zipcode and city
// @access    Public
router.route('/').get((req, res) => {
  let zipcode = req.body.zipcode;
  let name = req.body.name;
  let orderby = req.body.orderby;
  let cities = req.body.cities;
  let smileys = req.body.smileys;

  let query = {};
  if (zipcode || name || orderby || cities || smileys) {
    query = {
      $or: [{ cities }, { zipcode }]
    };
  }

  Company.find(query)
    .limit(5)
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     PUT companies/:id
// @desc      Give rating and increment numberOfRatings automatically
// @access    Public
router.route('/company/giverating').put((req, res) => {
  const sumStars = req.body.sumStars;

  Company.findByIdAndUpdate(
    req.body.id,
    { $inc: { numberOfRatings: 1, sumStars } },
    { new: true }
    // { new: true } makes sure to return an obejct so it can be passed as a response
  )
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/cities
// @desc      Get all cities
// @access    Public
router.route('/cities').get((req, res) => {
  Company.aggregate([{ $group: { _id: null, cities: { $addToSet: '$city' } } }])
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/name
// @desc      Get all companies with same name or name that includes a substring
// @access    Public
router.route('/name').get((req, res) => {
  let name = req.body.name;

  Company.find({ name: new RegExp(name, 'i') })
    .limit(5)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route     GET companies/smilies
// @desc      Get companies with given smiley grade(s) given at last review
// @access    Public
router.route('/smileys').get((req, res) => {
  let smileysArr = req.body.smileys;

  Company.find({ 'smileys.0.grade': { $in: smileysArr } })
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
