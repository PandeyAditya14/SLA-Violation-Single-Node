const Mongoose = require('mongoose');
var UserModel = require('./UserModel');
Mongoose.connect("mongodb://localhost/sla");
async function main() {
try{
    var result = await UserModel.deleteMany({});
    console.log(result);
    process.exit(1);
}catch(err){
    console.log(err);
}
}

main();