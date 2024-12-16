const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.registerUser = async (req, res) => {
    try {
        
        const { username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
         }
        const closedPassword = await bcrypt.hash(password,10)
        const user = await User.create({ username, password : closedPassword })
        const jwtSecret = "efjfeef";
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered', token})
    } catch(error) {
        res.status(400).json({ error: error.message})
    }

}
exports.loginUser = async (req, res) => {
    try {
        const { username , password} = req.body;
        const user = await User.findOne({ where: {username}})
        
        if(!user) return res.status( 404).json({ message: 'User Not Found' })
        
        const ifMatch = await bcrypt.compare(password, user.password);
        if(!ifMatch) return res.status(401).json({ message: "invalid password" })


            const jwtSecret = 'OgRnofb/vLsLQ_{aMXC<i83;t%y:OZR](M|q.<V%8<?C0(FKm7F,^uaE:,WLFK';
      const token = jwt.sign({ id: user.id, username: user.username },jwtSecret , { expiresIn: '1h' });
      res.json({ message: "login successfully", token})
    } catch(error) {
        res.status(500).json({ error: error.message})
    }

}
