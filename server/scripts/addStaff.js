require("dotenv").config();

const mongoose = require("mongoose");
const AllowedStaff = require('../models/AllowedStaff');
async function addStaff() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    const email = process.env.FIRST_STAFF_EMAIL
      ?.trim()
      .toLowerCase();

    if (!email) {
      throw new Error("FIRST_STAFF_EMAIL is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

const staff = await AllowedStaff.findOneAndUpdate(
        { email },
      {
        $setOnInsert: {
          email,
          registered: false,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    console.log("Approved staff email:", staff.email);
  } catch (error) {
    console.error("Setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

addStaff();
