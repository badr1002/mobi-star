const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');


class Helper {
  static sendMailerToActiveAcoount = async (key, email) => {
    let transporter = await nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "badrhelal333@gmail.com",
          pass: "B0R1H2L3M4K5@",
        },
      })
    );
    let mailOptions = {
      from: "badrhelal333@gmail.com",
      to: email,
      subject: "activate your account",
      text: "activate your account open this link",
      html: `<p>Click <a href="https://mobi-star.herokuapp.com/user/active/${key}">here</a> to active your acount</p>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw new Error("email not sent");
      else console.log("Email sent: " + info.response);
    });
  };

  static sendMailerToSetNewPassword = async (id, email) => {
    let transporter = await nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "badrhelal333@gmail.com",
          pass: "B0R1H2L3M4K5@",
        },
      })
    );
    let mailOptions = {
      from: "badrhelal333@gmail.com",
      to: email,
      subject: "Set new password",
      text: "set new password copy this code",
      html: `<span>Code <h1 style="color:blue;">${id}</h1></span>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw new Error("email not sent");
      else console.log("Email sent: " + info.response);
    });
  };

  static sendContactMessage = async (name,email, sub, message) => {
    let transporter = await nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "badrhelal333@gmail.com",
          pass: "B0R1H2L3M4K5@",
        },
      })
    );
    let mailOptions = {
      from: `${name} <${email}>`,
      to: "badrhelal333@gmail.com",
      subject: sub,
      text: message,
      html: `<b>${message}</b>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw new Error("email not sent");
      else console.log("Email sent: " + info.response);
    });
  };
}


module.exports = Helper
