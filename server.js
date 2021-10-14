import express from 'express';
import mongoose from 'mongoose';
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middilewares/errorHandler';
import routes from './routes';
var cors = require('cors');
const app = express();
app.use(cors())

//database connection
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log("db connected");
})


const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/api', routes);
app.use('/images', express.static('images'))
app.use(errorHandler); 

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})