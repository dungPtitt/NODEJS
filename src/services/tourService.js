import db from '../../models/index';

let getTour = (id) => {
  return new Promise(async (resolve, reject) => {
    let tours = []
    try {
      if (id == 'All') {
        tours = await db.Tour.findAll()
      }
      if (id && id !== 'All') {
        tours = await db.Tour.findOne({
          where: { id: id },
        })
      }
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
        image: data.image
      })
      resolve({
        errCode: 0,
        massage: "OK"
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  getTour: getTour,
  createTour: createTour,
}