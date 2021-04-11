import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstname:{ type:String, required: true},
    lastname:{ type:String, required: true},
    username:{ type:String, required:true, unique: true},
    password: { type:String, required:true, allowNull: false, comment: "null", validate: [(password)=> password && password.length > 2, 'Password should be longer']},
    role: {type:String, possibleValues: ['nurse','patient'], required:true}
});

export default mongoose.model('User', userSchema);