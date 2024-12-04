import mongoose from 'mongoose';

// Define the User schema
const AreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    minlength: 6
  },
  pc: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
const Area = mongoose.models.Area || mongoose.model('Area', AreaSchema);

export default Area;
