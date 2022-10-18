import { response } from 'express';
import db from '../../models/index';
import CRUDservice from '../services/CRUDservice'

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data)
    });
  } catch (e) {
    console.log(e)
  }
}

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
}

let getCRUD = (req, res) => {
  return res.render("crud.ejs")
}
let postCURD = async (req, res) => {
  let message = await CRUDservice.createUser(req.body)
  console.log(message)
  return res.send("date user")
}

let displayGetCRUD = async (req, res) => {
  let users = await CRUDservice.getAllUser()
  // console.log(users)
  return res.render("displayCRUD", {
    dataUser: users,
  })
}

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId)
    if (userData) {
      return res.render("editCRUD", {
        userData: userData,
      })
    }
    // console.log(userData)
    return res.send("Found user")
  } else {
    return res.send("Not found user")
  }
}

let putCRUD = async (req, res) => {
  let AllData = await CRUDservice.updateUser(req.body)
  return res.render("displayCRUD", {
    dataUser: AllData,
  })
}

let deleteCRUD = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    let data = await CRUDservice.deleteUserById(userId)
    return res.render("displayCRUD", {
      data: data,
    })
  }

  return res.send("User not found!")
}

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCURD: postCURD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
}