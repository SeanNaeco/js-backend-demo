const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = 'mongodb+srv://seanhall:<db_password>@cluster0.vgu7o7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  // Replace with your Atlas connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

// Schema for Message
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true }
});

const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(express.static('public'));
app.use(express.json());

// POST request to store data in the database
app.post('/api/data', (req, res) => {
  const newMessage = new Message({
    message: req.body.message
  });

  // Save to MongoDB
  newMessage.save()
    .then(() => {
      console.log('Message saved to MongoDB!');
      res.json({ reply: `Server received and saved: "${req.body.message}"` });
    })
    .catch(err => {
      console.log('Error saving message:', err);
      res.status(500).json({ error: 'Failed to save message' });
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
