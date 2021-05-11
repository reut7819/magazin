//const { create } = require("../models/user");
const User = require('../models/userSchema')
//const User1 = require('../controllers/login')

//upDate
const upDate = async (req, res) => {
    try {
        console.log("id: ", req.params.userId, "userName ", req.body.name);
        const user = await User.findOneAndUpdate({ "_id": req.params.userId },
            { "name": req.body.name })
        const userUpdated = await User.findOne({ "_id": req.params.userId })
        console.log('user update');
        console.log(user, 'jjj')
        res.status(200).json({ myUserUpdate: userUpdated })
    } catch (error) {
        console.log(error);
        res.status(400).send('error')
    }
}

//delete
const deletUser = async (req, res) => {
    console.log("delete user")
    try {
        console.log(req.params.id);
        const user = await User.findByIdAndDelete(req.params.id)
        console.log("user delet");
        res.status(200).json({ "my": "ddak" })
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { upDate, deletUser }