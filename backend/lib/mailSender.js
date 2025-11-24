import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Event from "../model/eventModel.js";
import User from "../model/userModel.js";
import cron from "node-cron";

dotenv.config({});


const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

if (!EMAIL || !PASS) {
  console.error(
    "FATAL: Ethereal credentials (ETHEREAL_USER or ETHEREAL_PASS) are missing in environment variables."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

export const sendVerificationEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //

    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }

};

export const sendEventEmail = async (email, event) => {
  try {
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "Your Event Reminder",
      html: `<p>Reminder: ${event.title}</p>
             <p>Time: ${event.time}</p>
             <p>Date: ${event.date}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //

    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

cron.schedule("* * * * *", async () => {
  try {
    console.log("Cron running...");

    const now = new Date();
    const after30Min = new Date(now.getTime() + 30 * 60 * 1000);

    const events = await Event.find({});

    for (const event of events) {

      const eventDateTime = new Date(`${event.date} ${event.time}`);

      if (isNaN(eventDateTime)) {
        console.log("Invalid event datetime:", event);
        continue;
      }

      if (eventDateTime >= now && eventDateTime <= after30Min) {

        if (event.reminderSent) continue;

        const user = await User.findById(event.user);
        if (!user || !user.email) continue;

        await transporter.sendMail({
          from: EMAIL,
          to: user.email,
          subject: `Reminder: Your event "${event.title}" starts in 30 minutes`,
          html: `
            <h3>Hello ${user.username},</h3>
            <p>This is a reminder that your event starts soon.</p>
            <p><b>${event.title}</b></p>
            <p>${event.description}</p>
            <p><b>${event.date} at ${event.time}</b></p>
          `,
        });

        console.log("Reminder email sent to:", user.email);

        event.reminderSent = true;
        await event.save();
      }
    }
  } catch (error) {
    console.error("Cron error:", error);
  }
});
