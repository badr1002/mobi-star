const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');


class Helper {
  static sendMailerToActiveAcoount = async (key, email) => {
    let transporter = await nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
      })
    );
    let mailOptions = {
      from: `${process.env.EMAIL}`,
      to: email,
      subject: "activate your account",
      text: "activate your account open this link",
      html: `<p>Click <a href="${process.env.BABEL_ENV}/api/user/active/${key}">here</a> to active your acount</p>`,
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
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
      })
    );
    let mailOptions = {
      from: `${process.env.EMAIL}`,
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
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
      })
    );
    let mailOptions = {
      from: `${name} <${email}>`,
      to: `${process.env.EMAIL}`,
      subject: sub,
      text: message,
      html: `<b>${message}</b>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw new Error("email not sent");
      else console.log("Email sent: " + info.response);
    });
  };
}


module.exports = Helper
