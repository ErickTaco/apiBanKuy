import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "bancuy1534@gmail.com",
    pass: "jsjuwzegjhaonytm",
  },
});

transporter.verify().then(() => {
  console.log("REady for send emails");
});
