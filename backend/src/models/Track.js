import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    timestamp : Number,
    coords : {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})

const trackSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: "String",
        dafault : ""
    },
    locations : [pointSchema]
})

export default mongoose.model('Track', trackSchema)