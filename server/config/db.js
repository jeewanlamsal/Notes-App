const mongoose=require('mongoose');

const connectDB=async ()=> {
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            //MongoDB connection strings had old & new formats. This forces Mongoose to use the modern parser.
            useUnifiedTopology: true
           // This makes Mongoose use MongoDB’s newer unified server discovery & monitoring engine.
            //Basically: more reliable, fewer connection bugs.
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
        
    }
};
 module.exports=connectDB;