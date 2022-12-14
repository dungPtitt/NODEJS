import audienceService from "../services/audienceService";

let postBookingTicket = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing info"
      })
    } else {
      let response = await audienceService.postBookingTicket(req.body);
      return res.status(200).json(response)
    }

  } catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Err from server"
    })
  }
}

let postVerifyBookingTicket = async (req, res) => {
  try {
    if (!req.body) {

      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing info"
      })
    } else {
      console.log("check data from server: ", req.body)
      let response = await audienceService.postVerifyBookingTicket(req.body);
      return res.status(200).json(response)
    }

  } catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Err from server"
    })
  }
}

module.exports = {
  postBookingTicket: postBookingTicket,
  postVerifyBookingTicket: postVerifyBookingTicket,
}