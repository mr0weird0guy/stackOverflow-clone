import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import users from '../models/auth.js'

export const signUp = async(req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await users.findOne({ email })
    if(existingUser){
      console.log(`User ${existingUser}`)
      return res.status(404).json("User Already Exists.")
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await users.create({ name: name, email: email, password: hashedPassword })
      const token = jwt.sign({email: newUser.email, id: newUser.id, token: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
      console.log(token)
      res.status(200).json({result: newUser, token})
    }
  } catch (err) {
    res.status(500).json("Something went wrong")
    console.log(err)
  }
}

export const logIn = async(req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await users.findOne({ email })
    if(!existingUser){
      return res.status(404).json({ message:"User does not Exists." })
    }
    const isPasswordCrt = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCrt){
      return res.status(404).json({ message: "invalid credentials"})
    }
    const token = jwt.sign({email: existingUser.email, id: existingUser.id, token: existingUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
    res.status(200).json({result: existingUser, token})

  } catch (err) {
    res.status(500).json("Something went wrong")
  }
}