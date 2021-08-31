const mongoose = require("mongoose");
require("dotenv").config();
// const options = {
//     useCreateIndex:true,
//     useFindAndModify:true,
//     useNewUrlParser:true,
//     useUnifiedTopology: true,

// }

// try {
//     mongoose.connect(
//       process.env.DBURL,
//       options
//     );
//     console.log("db connected");
// }
// catch(e){console.log(e)}

mongoose
  .connect(
    "mongodb://" +
      process.env.COSMOSDB_HOST +
      ":" +
      process.env.COSMOSDB_PORT +
      "/" +
      process.env.COSMOSDB_DBNAME +
      "?ssl=true&replicaSet=globaldb",
    {
      auth: {
        user: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD,
      },
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    }
  )
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch((err) => console.error(err));
