// import { literal } from 'sequelize/types'
import userService from '../services/userService'

let handleLogin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing input params'
    })
  }
  let dataUser = await userService.handleUserLogin(email, password)
  return res.status(200).json({
    errCode: dataUser.errCode,
    message: dataUser.errMessage,
    user: dataUser.userInfo ? dataUser.userInfo : {}
    // user: dataUser.userInfo
  })
}

let handleGetUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing input parametes"
    })
  }
  //id = "All" => tat ca user
  //id = ...
  let user = await userService.getUser(id)
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    user
  })
}

let handleGetMember = async (req, res) => {
  try {
    let limit = req.query.limit;
    if (limit) {
      let info = await userService.getMember(+limit)
      return res.status(200).json(info)
    }
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing input parameter"
    })
  } catch (e) {
    // console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let handleCreateUser = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing info"
    })
  }
  let message = await userService.createUser(data);
  return res.status(200).json(message)
}

let handleUpdateUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
  let useId = req.body.id;
  if (!useId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Misssing input parametor."
    })
  }
  let message = await userService.delelteUser(useId);
  return res.status(200).json(message)
}

let handleGetAllcode = async (req, res) => {
  let inputType = req.query.type;
  if (!inputType) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Misssing input parametor."
    })
  }
  let data = await userService.getAllcode(inputType);
  return res.status(200).json(data)
}

module.exports = {
  handleLogin: handleLogin,
  handleGetUser: handleGetUser,
  handleCreateUser: handleCreateUser,
  handleUpdateUser: handleUpdateUser,
  handleDeleteUser: handleDeleteUser,
  handleGetAllcode: handleGetAllcode,
  handleGetMember: handleGetMember,
}