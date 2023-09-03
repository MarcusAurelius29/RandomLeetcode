const mongoose = require('mongoose')

const Schema = mongoose.Schema

const problemSchema = new Schema(
    {
        title: {
            type : String,
            required: true
        },
        DSAConcept: {
            type : String,
            required: true
        },
        Difficulty: {
            type : String,
            required: true
        },

        LinkToProblem: {
            type : String,
            required : true
        }
    }
)

module.exports = mongoose.model('Problem' , problemSchema)