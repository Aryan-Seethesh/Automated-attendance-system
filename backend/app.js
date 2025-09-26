const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(morgan('combined')); // Logging
app.use(helmet()); // Security headers
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Automated Attendance System!');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;