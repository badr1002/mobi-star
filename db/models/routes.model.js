const mongoose = require('mongoose');


const routeSchema = mongoose.Schema({
  roles: [
    {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  ],
  url: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});




const Route = mongoose.model('Routes', routeSchema);
module.exports = Route;