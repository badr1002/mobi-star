const mongoose = require('mongoose');

const options = {
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}

try {
    mongoose.connect(process.env.DBURL, options);
    console.log("db connected");
}
catch(e){console.log(e)}

