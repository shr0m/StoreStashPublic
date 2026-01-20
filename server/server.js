import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Simple email validation function
function isValidEmail(email) {
  // Basic RFC 5322 compliant regex for most email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Email sending endpoint
app.post("/api/enquire", async (req, res) => {
  const { name, email, message } = req.body;

  // Check all fields exist
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: "tickets.storestash@gmail.com",
      to: "hello@storestash.co.uk",
      subject: "StoreStash Enquiry",
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    res.status(200).json({ message: "Enquiry sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send enquiry." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
