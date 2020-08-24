const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        first_name: {
            type: String,
            required: true
        }, 
         last_name: {
            type: String,
            required: true
        },
        emailId: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        jobtitle: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true,
        },
         address2: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true, 
            
        }, 
        state: {
            type: String,
            required: true, 
        }, 
         city: {
            type: String,
            required: true, 
        }, 
        zipcode: {
            type: String,
            required: true, 
            
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)