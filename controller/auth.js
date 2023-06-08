const auth = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const randomstring=require('randomstring')
const register = async (req, res) => {
  try {
    const { email, password, repassword } = req.body;
    const user = await auth.findOne({ email });
    if (user) {
      res.json("Istifadeci var"); //json ve ya status kod
    }
    // if (password.length < 8) {
    //     console.log('Sifre 8 simvoldan kicik olmamalidir')
    // }
    if (password === repassword) {
      const hashPassword = await bcrypt.hash(password, 12); //12
      const newUser = await auth.create({
        email,
        password: hashPassword,
        repassword,
      });
      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res.json("ugurlu qeydiyyat");
      console.log(newUser, token);
    } else {
      res.json("sifreler uygun deyil");
    }
  } catch (err) {
    res.json(err);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.findOne({ email });
    if (!user) {
      console.log("bele bir istifadeci yoxdur"); //json ve ya status kod
      res.json("bele bir istifadeci yoxdur");
    }
    const comparePass = await bcrypt.compare(password, user.password);
    // const hashPassword = await bcrypt.hash(password) //12
    // const newUser = await auth.create({ username, email, password: hashPassword })

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({
      user,
      token,
    });
    console.log(token);

    if (!comparePass) {
      console.log("Sifre sehvdir");
      res.json("sifre sehvdir");
    }
  } catch (err) {
    console.log(err);
  }
};
const forgetpassword = async (req,res) => {
  try {
    const { email } = req.body;
    const userData = await auth.findOne({ email })
    if (userData) {
      const randomString = randomstring.generate()
      const data = await auth.updateOne({ email }, { $set: { token: randomString } })
      res.json('e-mail qutunuzu yoxlayin')
     
    }
    else {
      res.send('bu email databasede movcud deyil')
    }
  }

  catch (err){
     res.json(err)   
  }
}
module.exports = {
  register,
  login,forgetpassword
};
