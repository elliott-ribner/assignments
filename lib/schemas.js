const mongoose = require('mongoose')
const Random = require('meteor-random')
const Schema = mongoose.Schema

const AssignmentsSchema = new Schema({
    _id: String,
    name: {type: String, required: true},
    created: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    tags: {type: [String], required: true, default: []},
    duration: {type: Number, required: true} // number of days
})

const AssignmentModel = mongoose.model('Assignments', AssignmentsSchema )

const Assignments = {
    insert: (object) => {
        object._id =  Random.id()
        object.created = new Date()
        const instance = new AssignmentModel(object)
        return new Promise((resolve,reject) => {
            instance.save((err, product) => {
                if (err) { reject(err)}
                else {
                    resolve(product._doc)
                }

            })
        })
    },
    findOne: (id) => {
        return new Promise((resolve, reject) => {
            AssignmentModel.findOne({_id: id}, (err, assignment) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(assignment)
                }
            })
        })
    },
    find: (query) => {
        return new Promise((resolve, reject) => {
            AssignmentModel.find(query, (err, assignments) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(assignments)
                }
            })
        })
    },
    deleteAll: () => {
        return new Promise((resolve, reject) => {
            AssignmentModel.deleteMany({}, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

module.exports = {
    Assignments
}