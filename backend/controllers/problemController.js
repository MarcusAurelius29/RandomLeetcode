const LeetCodeProblem = require('../models/problemModel')
const mongoose = require('mongoose')
//these are functions

//get all workout
const getAllProblems = async (req , res) => {
      const problems = await LeetCodeProblem.find({}).sort({createdAt: -1})
      res.status(200).json(problems)
}

//get a single workout
const getSingleProblem = async (req , res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such problem'})
    }
    const problem = await LeetCodeProblem.findById(id)

    if(!problem)
    {
        return res.status(400).json({error: 'No Such Problem'})
    }

    res.status(200).json(problem)
}

const getCertainProblem = async (req , res) => {
    const {DSAConcept , Difficulty} = req.params

    const problem = await LeetCodeProblem.findOne({DSAConcept , Difficulty})

    if(!problem) 
    {
        return res.status(400).json({error: 'No such problem'})
    }

    res.status(200).json(problem)
}
//create a new workout
const createProblem = async (req , res) => {
    const {title , DSAConcept , Difficulty , LinkToProblem} = req.body

    try {

        const existingProblem = await LeetCodeProblem.findOne({ title });

        if (existingProblem) {
            // If a problem with the same title exists, return an error message
            return res.status(400).json({ error: 'Problem with this title already exists.' });
        }
        
        const problem = await LeetCodeProblem.create({title , DSAConcept , Difficulty , LinkToProblem})
        res.status(200).json(problem)
    }
    catch (error) {
        res.status(400).json( {error: error.message})
    }
}

//delete a workout

const deleteProblem = async (req , res) => {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such Problem'})
        }

        const problem = await LeetCodeProblem.findOneAndDelete({_id: id})

        if(!problem)
        {
            return res.status(400).json({error: 'No such Problem'})
        }

        res.status(200).json(problem)
    }



module.exports = {
    createProblem,
    getAllProblems,
    getSingleProblem,
    deleteProblem,
    getCertainProblem
    
}