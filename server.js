const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (Replace with your MongoDB URI)
mongoose.connect("mongodb+srv://your-db-uri", { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ success: true, message: "Message saved!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving message" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
