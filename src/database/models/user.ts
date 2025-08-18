import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  avatar: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
