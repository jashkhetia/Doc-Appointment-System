const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
        },
        firstName:{
            type: String,
            required: [true, "Enter Your First Name"],
        },
        lastName:{
            type: String,
            required: [true, "Enter Your Last Name"],
        },
        phone: {
            type: String,
            required: [true, "Enter Your Phone Number."],
        },
        email:{
            type: String,
            required: [true,"Enter Your Email ID."],
        },
        website:{
            type:String,
        },
        address:{
            type: String,
            required: [true, "Enter Your Address."],
        },
        specialization:{
            type: String,
            required: [true, "Enter Your Specialization"],
        },
        experience:{
            type: String,
            required: [true, "Enter Your Experience."],
        },
        feesPerConsultation:{
            type: Number,
            required: [true, "Enter Your Fee Amount."],
        },
        status:{
            type: String,
            default:"Pending",
        },
        timings:{
            type: Object,
            required: [true, "Enter Your Working Hours."],
        },
    },
    {timestamps: true}
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;