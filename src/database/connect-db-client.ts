/*################################################
###### NEEDED TO CONNECT MONGOOSE TO DB  #########
#################################################*/

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDbClient() {
  try {
    if (!MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to database');
  } catch (error) {
    console.error('🚨 Failed to connect to database: ', error);
    process.exit(1);
  }
}

export default connectToDbClient;
