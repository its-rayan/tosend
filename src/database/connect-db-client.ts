/*################################################
###### NEEDED TO CONNECT MONGOOSE TO DB  #########
#################################################*/

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

async function connectToDbClient() {
  try {
    if (!MONGO_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
    }

    await mongoose.connect(MONGO_URI);
    console.log('✅ Successfully connected to database');
  } catch (error) {
    console.error('🚨 Failed to connect to database: ', error);
    process.exit(1);
  }
}

export default connectToDbClient;
