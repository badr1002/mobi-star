const sgMail = require("@sendgrid/mail");

class Mailer {
  static activeMail = async (email, key) => {
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      to: `${email}`,
      from: "badrhelal1254@gmail.com", // Change to your verified sender
      subject: "Activate your account",
      text: "Activate your account open this link",
      html: `<p>Click <a href="${process.env.BACKEND_URL}/api/user/active/${key}">here</a> to active your acount</p>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  static setPass = async (email, id) => {
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      to: `${email}`,
      from: "badrhelal1254@gmail.com", // Change to your verified sender
      subject: "Set new password",
      text: "set new password copy this code",
      html: `<span>Code <h1 style="color:blue;">${id}</h1></span>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  static contact = async (name, email, sub, message) => {
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      from: "badrhelal1254@gmail.com",
      to: "badrhelal333@gmail.com",
      replyTo: `${name} <${email}>`,
      subject: `${sub}`,
      text: `${message}`,
      html: `<b>${message}</b>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
module.exports = Mailer;
