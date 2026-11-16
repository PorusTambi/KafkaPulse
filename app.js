// We import Express to run our web server so we can view things in a browser
import express from 'express';
// We import path and fileURLToPath to tell Express where our EJS HTML files live
import path from 'path';
import { fileURLToPath } from 'url';
import APP_CONSTANTS from './src/APP_CONSTANTS.js';

const {COLORS}=APP_CONSTANTS
import DefaultPartitioningRouter from './src/DefaultPartitioning/Router.js';
import KeyedOrderedPartitioningRouter from './src/KeyedOrderedPartitioning/Router.js';

console.log('\n⏳ Wait for the Application to started ...\n')

// Standard boilerplate to get the current directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize our Express application
const app = express();
// Tell Express to understand JSON if we send it in API requests
app.use(express.json());
// Tell Express we are using EJS as our visual template engine
app.set('view engine', 'ejs');
// Point Express to our 'views' folder
app.set('views', path.join(__dirname, './views'));

// Route 1: The Main Landing Page
app.get('/', (req, res) => {
  // Renders the list of all our Kafka features
  res.render('home');
});

app.use('/default-partitioning', DefaultPartitioningRouter);
app.use('/keyed-ordered-partitioning', KeyedOrderedPartitioningRouter);



//global error handler
app.use(function (err, req, res, next) {
  // Log the error in one central place
  console.error("Central Error Log:", err.message);

  // Use the error's custom status code if it has one, otherwise default to 500
  const statusCode = err.statusCode || 500;

  // Send the final error response to the client from here
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
})


// Finally, we start the Express server and initialize Kafka
app.listen(3000, async () => {
  console.log(`\n${COLORS.bright}${COLORS.cyan}========================================================${COLORS.reset}`);
  console.log(`${COLORS.bgBlue}${COLORS.bright}${COLORS.white}  ⚡ STARTING APPLICATION...                              ${COLORS.reset}`);
  console.log(`${COLORS.bright}${COLORS.green}  🚀 Server started successfully on ${COLORS.yellow}http://localhost:3000${COLORS.reset}`);
  console.log(`${COLORS.bright}${COLORS.cyan}  ✅ Application is ready to use!${COLORS.reset}`);
  console.log(`${COLORS.bright}${COLORS.green}  🚀 Go to ${COLORS.yellow}http://localhost:3000${COLORS.reset} ${COLORS.bright}${COLORS.green}in your browser to see the app in action${COLORS.reset}`);
  console.log(`${COLORS.bright}${COLORS.cyan}========================================================${COLORS.reset}\n`);
});

