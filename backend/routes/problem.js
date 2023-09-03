const express = require('express');
const Workout = require('../models/problemModel')
const { createProblem , getAllProblems , getSingleProblem , deleteProblem , getCertainProblem} = require('../controllers/problemController')
const router = express.Router();

// GET all workouts
router.get('/' , getAllProblems)

router.get('/:id' , getSingleProblem)

router.post('/' , createProblem)

router.delete('/:id' , deleteProblem)

router.get('/:DSAConcept/:Difficulty' , getCertainProblem)

module.exports = router