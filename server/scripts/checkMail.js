require("dotenv").config();

const transporter = require("../config/mail");

async function checkMail() {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TEST_EMAIL,
      subject: "Notes Store - Email Test",
      text: "Hello! Your Notes Store email service is working successfully.",
    });

    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
}

checkMail();
