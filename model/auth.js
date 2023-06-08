const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    repassword: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default:''
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

// userSchema.statics.login=async function(mail,password){
// const user=await this.findOne({mail})
// if(user){
//     const auth=await bcrypt.compare(password,user.password)
//     if(auth){
//         return user
//     }
//     else{
//         throw Error ('parol yanlisdir')

//     }
// }
//     else{
//         throw Error ('Istifadeci yoxdur')

//     }

// }
// userSchema.pre('save',async function (next){
//     const salt=await bcrypt.genSalt()
//     this.password=await bcrypt.hash(this.password,salt)
//     next()
// })
