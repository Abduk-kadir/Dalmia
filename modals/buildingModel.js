const mongoose=require('mongoose');
var valid = require('validator');
const assetSchema=mongoose.Schema({
    assetName:{type:String}
})
const roomSchema=mongoose.Schema({
    roomName:{
        type:String,
    },
    assests:[assetSchema] //array of assets
})
const floorSchema = new mongoose.Schema({
    floorName: { type:String},
    rooms: [roomSchema]  // Array of rooms on the floor
});
const buildingSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true},
    floors: [floorSchema]  // Array of floors in the building
});
module.exports=mongoose.model('Building',buildingSchema)