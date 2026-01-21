import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Create transporter once (better performance)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/enquire", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    await transporter.sendMail({
      from: `"StoreStash" <tickets.storestash@gmail.com>`,
      to: email,
      subject: "We’ve received your StoreStash enquiry",
      text: `Hi ${name},

Thanks for getting in touch with StoreStash.

We’ve received your enquiry and will get back to you shortly.

Your message:
${message}

- StoreStash Team`,
      html: `
    <div style="
      font-family: Verdana, sans-serif;
      background: #f0f4ff;
      padding: 40px;
    ">
      <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        padding: 30px;
      ">
        <h2 style="
          color: #1e3a8a;
          text-align: center;
          margin-bottom: 24px;
        ">
          Thanks for contacting StoreStash 📦
        </h2>

        <p style="font-size: 15px;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size: 15px;">
          We’ve received your enquiry and one of our team will get back to you shortly.
        </p>

        <div style="
          background: #f8fafc;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          font-size: 14px;
        ">
          <p style="margin: 0 0 8px 0; font-weight: bold;">
            Your message:
          </p>
          <p style="margin: 0; white-space: pre-line;">
            ${message}
          </p>
        </div>

        <p style="font-size: 15px;">
          Thanks again for your interest in <strong>StoreStash</strong>.
        </p>

        <p style="margin-top: 32px; font-size: 14px;">
          — StoreStash Team
        </p>

        <p style="
          font-size: 12px;
          color: #9a9a9a;
          text-align: center;
          margin-top: 32px;
        ">
          This message was sent automatically. Please do not reply directly.
        </p>
      </div>
    </div>
  `,
    });

    await transporter.sendMail({
      from: `"StoreStash Enquiries" <tickets.storestash@gmail.com>`,
      to: "hello@storestash.co.uk",
      replyTo: email,
      subject: "New StoreStash Enquiry",
      text: `Name: ${name}
Email: ${email}

Message:
${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Enquiry sent successfully!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send enquiry." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
