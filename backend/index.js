import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import db from "./db/db.js";
import incomeRoute from "./routes/incomeRoute.js";
import expenseRoute from "./routes/expenseRoute.js";

dotenv.config();

const app=express();
const port=process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api',incomeRoute);
app.use('/api',expenseRoute)


const server=()=>{
    db();
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
})
}
server();
