require ('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const noteRoutes=require('./routes/noteRoutes');
const connectDB=require('./config/db');

connectDB();

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log('MongoDB connected'))
 .catch (err  => console.error(err));
const PORT =process.env.PORT || 9000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
