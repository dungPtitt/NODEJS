import db from '../../models';
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()

let builtTokenId = (token, tourId) => {
  return `${process.env.REACT_APP}/verify-booking?token=${token}&tourId=${tourId}`;
}

let postBookingTicket = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // validate 
      if (!data.email || !data.tourId || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter"
        })
      } else {
        //gui email
        let token = uuidv4();
        await emailService.sendSempleEmail({
          receiver: data.email,
          name: data.fullName,
          address: data.address,
          date: data.date,
          link: builtTokenId(token, data.tourId)
        })
        // tao audience neu chua co
        let [user, create] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: 'R3',
            address: data.address,
            phonenumber: data.phoneNumber
          }
        })
        // tao booking
        await db.Booking.findOrCreate({
          where: { audienceId: user.id },
          defaults: {
            statusId: 'S1',
            audienceId: user.id,
            tourId: data.tourId,
            date: data.date,
            token: token
          }
        })
        resolve({
          errCode: 0,
          message: "Booking success"
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
let postVerifyBookingTicket = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check data from: ", data)
      if (!data.tourId || !data.token) {
        resolve({
          errCode: 5,
          errMessage: "Missing input parameter"
        })
      } else {
        let res = await db.Booking.findOne({
          where: {
            tourId: data.tourId,
            token: data.token,
            statusId: 'S1'
          },
          raw: false
        })
        if (res) {
          res.statusId = 'S2'
          await res.save()
          resolve({
            errCode: 0,
            message: "Confirm success"
          })
        } else {
          resolve({
            errCode: 3,
            errMessage: "Ban da dat ve tu truoc hoac khong ton tai"
          })
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  postBookingTicket: postBookingTicket,
  postVerifyBookingTicket: postVerifyBookingTicket,
}