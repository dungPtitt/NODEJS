import db from '../../models/index';
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.role,
      })
      resolve("ok! create new user susses")
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        raw: true
      });
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await db.User.findOne({
        where: { id: userId },
        raw: true,
      })
      if (userData) {
        resolve(userData)
      }
      else {
        resolve({})
      }
    } catch (e) {
      reject(e)
    }
  })
}

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      })
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let AllData = await db.User.findAll()
        resolve(AllData)
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false
      })
      if (user) {
        await user.destroy();
      }
      let userData = db.User.findAll()
      resolve(userData)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createUser: createUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
}