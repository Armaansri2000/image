import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageName: { type: String, required: true, index: true },
  heading: { type: String, required: true, index: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

const Image = mongoose.model('Image', imageSchema, 'images');

export default Image;
