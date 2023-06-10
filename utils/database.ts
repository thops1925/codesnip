import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		return console.log('is connected');
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: 'share',
		} as ConnectOptions);
		isConnected = true;
		console.log('mongo connected');
	} catch (error) {
		console.log(error);
	}
};
