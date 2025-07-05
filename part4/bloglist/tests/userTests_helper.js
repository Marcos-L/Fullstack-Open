const User = require('../models/usersModel')
const bcrypt = require('bcrypt')

const initialUsers = [
    {
        _id:"6865e4d38b57a82589cc3bc2",
        username: "JohnDoe123",
        name:"John Doe",
        password: 'DoeMaster123'
    },
    {
        _id:"6865e4d38b57a82589cc3bc3",
        username: "JaneDoe987",
        name:"Jane Doe",
        password: 'JaneDoeIsNumber1'
    },
    {
        _id:"6865e4d38b57a82589cc3bc4",
        username: "Salazar",
        name:"Oscar",
        password: 'NoLaTengo963'
    }
]

const getInvalidUserId = async () => {
    const password = 'ThisPasswordWasNotHashed'
    const saltRounds = 1
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const dummy_user = {
        username: 'Xx_TomSayer_xX',
        name: 'Tom Sayer',
        paswordHash: passwordHash
    }

    const user = new User(dummy_user)
    await user.save()
    await User.findByIdAndDelete(user.id)

    return user.id.toString()
}

module.exports = { initialUsers, getInvalidUserId }