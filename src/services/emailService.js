require('dotenv').config()
const nodemailer = require("nodemailer");

let sendSempleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"DungPtit 👻" <dung136ptit@gmail.com>', // sender address
    to: dataSend.receiver, // list of receivers
    subject: "Thong tin dat ve buoi hoa nhac", // Subject line
    html: `
      <h3>Xin chao ${dataSend.name}</h3>
      <h4>Ban nhan duoc email nay vi da dat ve xem show ca nhac tai web side the Band</h4>
      <p>Duoi day la thong tin ve show ca nhac cua ban:</p>
      <div>Thoi gian ngay: ${dataSend.date}</div>
      <div>Dia diem: ${dataSend.address}</div>
      <p>Vui long click vao nut xac nhan de dat ve</p>
      <a href = ${dataSend.link} target="_blank">Click here</a>
      <div>Cam on ban da quan tam den show dien cua chung toi</div>
    `, // html body
  });

}

module.exports = {
  sendSempleEmail: sendSempleEmail
}