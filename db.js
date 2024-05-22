const mongoose=require("mongoose");

const colors = require('colors')

const connection = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(
        `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
      );
    } catch (error) {
      console.log(`Errro in Mongodb ${error}`.bgRed.white);
    }
  };
module.exports={connection};