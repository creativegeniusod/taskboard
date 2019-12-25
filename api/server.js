const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/error');
// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Route Files
const task = require('./routes/task');


const app = express();

//Body Parser
app.use(express.json({ limit: '50mb' }));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/task', task);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
