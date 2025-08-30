import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  id_token: { type: String },
  expires_at: { type: Number },
  scope: { type: String },
  token_type: { type: String },
  providerAccountId: { type: String, required: true },
  provider: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Account =
  mongoose.models.Account || mongoose.model('Account', accountSchema);

export default Account;
