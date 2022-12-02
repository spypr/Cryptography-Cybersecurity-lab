const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          let passMatch = bcrypt.compareSync(password, users[i].password)
          if (passMatch) {
            let userObj = {...users[i]}
            delete userObj.password
            res.status(200).send(userObj)
            return
          }
        } 
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        
        let pass = req.body.password
        const salt = bcrypt.genSaltSync(5)
        const hashedPass = bcrypt.hashSync(pass, salt)
        
        let newUser = {...req.body}
        newUser.password = hashedPass 
        users.push(newUser)
        console.log(req.body)
        console.log(newUser)
        res.status(200).send(req.body)
    }
}