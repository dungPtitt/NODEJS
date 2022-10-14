import db from '../../models'

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
        // tao audience neu chua co
        let [user, create] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: 'R3'
          }
        })
        // tao booking
        await db.Booking.findOrCreate({
          where: { audienceId: user.id },
          defaults: {
            status: 'S1',
            audienceId: user.id,
            tourId: data.id,
            date: data.date
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

module.exports = {
  postBookingTicket: postBookingTicket
}