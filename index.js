const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
const uploadRouter = require("./routers/upload.router"); // Corrected filename to match provided code
const productRouter = require('./routers/products.router');
const userRouter = require("./routers/user.router");



// Middleware
app.use(express.static("uploads")); // Serve static files from the "uploads" directory
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS

// Routes
app.get("/", (req, res) => {
    console.log("hello");
    res.status(200).send("Welcome to the file upload app");
});
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter); // Use the upload router for file uploads

app.use("/api/products", productRouter)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send a 500 error response
});

app.use((req, res) => {
    res.status(404).send('Sorry, we cannot find that!'); // Handle 404 errors
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ECOM')
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));















//     const express = require('express');
// const bodyParser = require("body-parser");
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const cors = require('cors');
// require('dotenv').config(); // For environment variables

// const app = express();
// const uploadRouter = require("./routers/upload.Router");

// app.use(express.static("uploads"));
// app.use(bodyParser.json());
// app.use(helmet());
// app.use(cors());

// app.get("/", (req, res) => {
//     console.log("hello");
//     res.status(200).send("Welcome to the image upload app");
// });

// app.use("/api/upload", uploadRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// app.use((req, res) => {
//     res.status(404).send('Sorry, we cannot find that!');
// });

// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(Server is running on port ${port}));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ECOM')
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((error) => console.log(error));