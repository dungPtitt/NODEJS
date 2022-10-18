import db from '../../models/index';

let getTour = (limit) => {
  return new Promise(async (resolve, reject) => {
    let tours = []
    try {
      tours = await db.Tour.findAll({
        limit: limit,
      })
      resolve({
        errCode: 0,
        message: "Ok",
        tours: tours,
      })
    } catch (err) {
      reject(err)
    }
  })
}

let getAllTour = () => {
  return new Promise(async (resolve, reject) => {
    let tours = []
    try {
      tours = await db.Tour.findAll();
      resolve({
        errCode: 0,
        message: "Ok",
        tours: tours,
      })
    } catch (err) {
      reject(err)
    }
  })
}

let getMemorableTour = (limit) => {
  return new Promise(async (resolve, reject) => {
    let tours = []
    try {
      tours = await db.Tour.findAll({
        limit: limit,
        attributes: ['name', 'image'],
      })
      resolve({
        errCode: 0,
        message: "Ok",
        tours: tours,
      })
    } catch (err) {
      reject(err)
    }
  })
}
let createTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Tour.create({
        name: data.name,
        address: data.address,
        des: data.des,
        image: data.image,
        date: data.date,
        quantityMax: data.quantityMax,
        quantityCurrent: data.quantityCurrent
      })
      resolve({
        errCode: 0,
        message: "OK"
      })
    } catch (err) {
      reject(err)
    }
  })
}

let editTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = await db.Tour.findOne({
        where: {
          id: data.id,

        },
        raw: false
      })
      if (tour) {
        tour.name = data.name
        tour.address = data.address
        tour.des = data.des
        // tour.image = data.image
        // tour.date = data.date
        // tour.quantityMax = data.quantityMax
        // tour.quantityCurrent = data.quantityCurrent
        await tour.save();
        resolve({
          errCode: 0,
          message: "Update tour successs"
        })
      } else {
        resolve({
          errCode: 3,
          errMessage: "Tour not found!"
        })
      }
    } catch (err) {
      reject(err)
    }
  })
}
let deleteTour = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataTour = await db.Tour.findOne({
        where: { id: inputId },
        raw: false
      })
      // console.log(dataTour)
      if (dataTour) {
        await dataTour.destroy();
        resolve({
          errCode: 0,
          message: "Delete tour success!"
        })
      } else {
        return resolve({
          errCode: 2,
          errMessage: "Tour not found!"
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getTour: getTour,
  createTour: createTour,
  editTour: editTour,
  getMemorableTour: getMemorableTour,
  deleteTour: deleteTour,
  getAllTour: getAllTour,
}