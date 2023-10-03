import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        console.log(process.env.MONGO_URI)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('The mongoDB connection waas made successfully!')
        });

        connection.on('error', (error) => {
            console.log('The mongoDB connection generated an errror:' + error)

            process.exit()

        });


    } catch (error) {
        console.log('The connection attempted generated an error!')
        console.log(error)
    }



}