import db from '../../models/index';
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmail(email)
      // neu ton tai email thi check password
      let dataUser = {}
      if (isExist) {
        //check password
        // check user co ton tai tiep de tranh loi
        let user = await db.User.findOne({
          attributes: ['email', 'password', 'roleId'],
          where: { email: email },
          raw: true
        })
        if (user) {
          let check = await bcrypt.compare(password, user.password);
          if (check) {
            dataUser.errCode = 0;
            dataUser.errMassage = 'OK';
            delete user['password'];
            dataUser.userInfo = user;
          } else {
            dataUser.errCode = 3,
              dataUser.errMassage = 'Wrong password'
          }
        }
        else {
          dataUser.errCode = 2,
            dataUser.errMassage = 'User not found!'
        }
      }
      else {
        dataUser.errCode = 1,
          dataUser.errMassage = 'Your email not exit. Please try other!'
      }
      resolve(dataUser)
    } catch (e) {
      reject(e)
    }
  })
}

let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail }
      })
      if (user) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
}

let getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    let users = ''
    try {
      if (id == 'All') {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"]
          }
        })
      }
      if (id && id !== 'All') {
        users = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"]
          }
        })
      }
      resolve(users)
    } catch (err) {
      reject(err)
    }
  })
}

let getMember = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.findAll({
        where: {
          roleId: "R2"
        },
        // attributes: [],
        limit: limitInput,
        order: [['id', 'DESC']],
        // offset: 0,
      })
      resolve({
        errCode: 0,
        message: "Get member success",
        data: res
      })
    } catch (e) {
      reject(e)
    }
  })
}

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(data.email);
      if (check) {
        resolve({
          errCode: 2,
          errMassage: "Email is already used"
        })
      }
      else {
        let hashPassword = bcrypt.hashSync(data.password, salt);
        await db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === '1' ? true : false,
          roleId: data.role,
        })
        resolve({
          errCode: 0,
          massage: "OK"
        })
      }

    } catch (err) {
      reject(err)
    }
  })
}

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMassage: "Missing input parametors."
        })
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!user) {
        resolve({
          errCode: 2,
          errMassage: "User not found!"
        })
      }
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.save();
      resolve({
        errCode: 0,
        massage: "Ok"
      })
    } catch (e) {
      reject(e)
    }
  })
}

let delelteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false
      })
      // console.log(user)
      if (!user) {
        resolve({
          errCode: 2,
          errMassage: "User isn't exit",
        })
      }
      await user.destroy()
      // await db.User.destroy({
      //   where: { id: userId }
      // })
      resolve({
        errCode: 0,
        massage: "Ok"
      })
    } catch (e) {
      reject(e)
    }
  })
}

let getAllcode = (inputType) => {
  return new Promise(async (resolve, reject) => {
    let res = {};
    try {
      let allcode = await db.Allcode.findAll({
        where: { type: inputType }
      });
      res.errCode = 0;
      res.massage = 'ok';
      res.data = allcode;
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}
module.exports = {
  handleUserLogin: handleUserLogin,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  delelteUser: delelteUser,
  getAllcode: getAllcode,
  getMember: getMember,
}