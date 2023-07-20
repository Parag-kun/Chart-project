import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://paragbokde51:paragbokde51@cluster0.xzkwo9z.mongodb.net/?retryWrites=true&w=majority';

export default async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
};
