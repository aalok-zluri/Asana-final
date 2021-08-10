const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    data: [
        {
            gid: Number,
            name: String,
            resource_type: String
        }
    ]
});
const User = mongoose.model("User", userSchema);
module.exports = User;