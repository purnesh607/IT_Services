const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files from the main directory
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// Serve `index.html`
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Index.html"));
});

// Contact Form API
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
