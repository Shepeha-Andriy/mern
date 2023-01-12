const { Router } = require('express')
const User = require('../models/User')
const config = require('config')
const router = Router()
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

router.post('/register',
  [
    check('email', 'uncorrect email').isEmail(),
    check('password', 'uncorrect password min width 6 symbols').isLength({min: 6})
  ],
  async(req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
      const {email, password} = req.body

      const candidate = await User.findOne({email})
      if (candidate) {
        return res.status(400).json({message: "user already exist"})
      }

      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({email, password: hashPassword})

      await user.save()
      res.status(201).json({message: 'user created'})

    } catch (error) {
      res.status(500).json({message: 'somethink went wrong, try again'})
      console.log(error)
    }
})

router.post('/login',
[
  check('email', 'uncorrect email').normalizeEmail().isEmail(),
  check('password', 'uncorrect password min width 6 symbols').exists()
],
async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({message: 'user not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('wr pass')
      return res.status(400).json({message: 'wrong password'})
    }

    const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), { expiresIn: '10d' })
    return res.json({token, userId: user.id})
  } catch (error) {
      res.status(500).json({message: 'somethink went wrong, try again'})
  }
})

module.exports = router