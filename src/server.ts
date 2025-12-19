import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const port = 5000;

async function main () {
    try {
        await mongoose.connect("mongodb+srv://nzamanraz:GSyfYJr6ufUNvcK6@cluster0.yzsgyep.mongodb.net/?appName=Cluster0");
        console.log("Connected to mongoDB using moongose");
        server = app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        })
    } catch (error) {
        
    }
}

main()