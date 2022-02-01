const { User } = require("../database");
const { createToken } = require("../utils/auth");

exports.createUser = async ({ email, password, name }) => {
    const user = await User.create({
        email,
        password,
        name,
    })

    return createToken(user.id);
}

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    if (user.password != password) {
        throw new Error("Invalid Credentials");
    }

    return createToken(user.id);
}

exports.getUserById = async (id)=>{
    const user = await User.findOne({
        where:{
            id:id
        }
    })
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    return user;
}