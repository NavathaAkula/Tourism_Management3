const express = require('express');
const mysql = require('mysql2');

const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password1',
  database: 'auth_system',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Profile route

const tours = [
  { id: "01", title: "Charminar", city: "Hyderabad", price: 7000, Rating: 4.5 },
  { id: "02", title: "Golconda Fort", city: "Hyderabad", price: 8000, Rating: 4.5 },
  { id: "03", title: "Salar Jung Museum", city: "Hyderabad", price: 9000, Rating: 4.5 },
  { id: "04", title: "Hussain Sagar Lake", city: "Hyderabad", price: 9000, Rating: 4.5 },
  { id: "05", title: "Ramoji Film City", city: "Hyderabad", price: 10000, Rating: 4.5 },
  { id: "06", title: "Nehru Zoological Park", city: "Hyderabad", price: 8000, Rating: 4.5 },
  { id: "07", title: "Birla Mandir", city: "Hyderabad", price: 9000, Rating: 4.5 },
  { id: "08", title: "Munnar", city: "Kerala", price: 12000, Rating: 4.5 },
  { id: "09", title: "Alleppey", city: "Kerala", price: 12500, Rating: 4.5 },
  { id: "10", title: "Mahabalipuram", city: "Tamil Nadu", price: 15000, Rating: 4.5 },
  { id: "11", title: "Mysore Palace", city: "Karnataka", price: 12000, Rating: 4.5 },
  { id: "12", title: "Hampi", city: "Karnataka", price: 10500, Rating: 4.5 },
  { id: "13", title: "Ajanta and Ellora Caves", city: "Maharashtra", price: 12500, Rating: 4.5 },
  { id: "14", title: "Gateway of India", city: "Maharashtra", price: 10000, Rating: 4.5 },
  { id: "15", title: "Tirupati", city: "Andhra Pradesh", price: 9000, Rating: 4.5 },
  { id: "16", title: "Araku Valley", city: "Andhra Pradesh", price: 12500, Rating: 4.5 },
  { id: "17", title: "Baga Beach", city: "Goa", price: 10000, Rating: 4.5 },
  { id: "18", title: "Basilica of Bom Jesus", city: "Goa", price: 9000, Rating: 4.5 },
  { id: "19", title: "Statue of Unity", city: "Gujarat", price: 8000, Rating: 4.5 },
  { id: "20", title: "Gir National Park", city: "Gujarat", price: 13000, Rating: 4.5 },
  { id: "21", title: "Chitrakote Waterfalls", city: "Chhattisgarh", price: 8000, Rating: 4.5 },
  { id: "22", title: "Kanger Valley National Park", city: "Chhattisgarh", price: 9000, Rating: 4.5 },
  { id: "23", title: "Jagannath Temple", city: "Odisha", price: 12000, Rating: 4.5 },
  { id: "24", title: "Konark Sun Temple", city: "Odisha", price: 13500, Rating: 4.5 },
  { id: "25", title: "", city: "", price: 12500, Rating: 4.5 },
  { id: "26", title: "Darjeeling", city: "West Bengal", price: 14000, Rating: 4.5 },
  { id: "27", title: "Sundarbans", city: "West Bengal", price: 12500, Rating: 4.5 },
  { id: "28", title: "Netarhat", city: "Jharkhand", price: 13500, Rating: 4.5 },
  { id: "29", title: "Jubilee Park", city: "Jharkhand", price: 14000, Rating: 4.5 },
  { id: "30", title: "Bodh Gaya", city: "Bihar", price: 15000, Rating: 4.5 },
  { id: "31", title: "Nalanda", city: "Bihar", price: 12500, Rating: 4.5 },
  { id: "32", title: "Kakathiya Gate", city: "Warangal", price: 7000, Rating: 4.5 },
  { id: "33", title: "Medak Cathedral", city: "Medak", price: 6000, Rating: 4.5 },
  { id: "34", title: "Tawang", city: "Arunachal Pradesh", price: 12500, Rating: 4.5 },
  { id: "35", title: "Tsomgo Lake", city: "Sikkim", price: 12500, Rating: 4.5 },
  { id: "36", title: "Shanti Stupa", city: "Ladakh", price: 1200, Rating: 4.7 },
  { id: "37", title: "Pangong Lake", city: "Jammu and Kashmir", price: 1000, Rating: 4.8 },
  { id: "38", title: "Red Fort", city: "Delhi", price: 1250, Rating: 4.5 },
  { id: "39", title: "Lotus Temple", city: "Delhi", price: 1999, Rating: 4.5 },
  { id: "40", title: "Dalhousie", city: "Himachal Pradesh", price: 1599, Rating: 4.5 },
  { id: "41", title: "Manali", city: "Himachal Pradesh", price: 10000, Rating: 4.7 },
  { id: "42", title: "Varanasi", city: "Uttar Pradesh", price: 1999, Rating: 4.8 },
  { id: "43", title: "Taj Mahal", city: "Uttar Pradesh", price: 1000, Rating: 4.6 },
  { id: "44", title: "Ranthambore National Park", city: "Rajasthan", price: 2179, Rating: 4.5 },
  { id: "45", title: "Lake Pichola", city: "Rajasthan", price: 1990, Rating: 4.6 },
  { id: "46", title: "India Gate", city: "Delhi", price: 1900, Rating: 4.6 },
  { id: "47", title: "Sri Mahakaleshwar Jyotirlinga Temple", city: "Madhya Pradesh", price: 1000, Rating: 4.8 },
  { id: "48", title: "Panna National Park", city: "Madhya Pradesh", price: 1499, Rating: 4.5 },
  { id: "49", title: "Brahma Sarovar", city: "Haryana", price: 1000, Rating: 4.7 },
  { id: "50", title: "Yadavindra Gardens", city: "Haryana", price: 1200, Rating: 4.8 },
  { id: "51", title: "Golden Temple", city: "Punjab", price: 1500, Rating: 4.9 },
  { id: "52", title: "Jallianwala Bagh", city: "Punjab", price: 1999, Rating: 4.8 },
  { id: "53", title: "Valley of Flowers National Park", city: "Uttarakhand", price: 1600, Rating: 4.8 },
  { id: "54", title: "Rishikesh", city: "Uttarakhand", }]; 








app.post('/signup', (req, res) => {
  console.log(0);
  const { email, password, phone_number, region, address, aadhar_number } = req.body;

  console.log(req.body); // Log the incoming request body

  const query = 'INSERT INTO users (email, password, phone_number, region, address, aadhar_number) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [email, password, phone_number, region, address, aadhar_number], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    res.status(201).json({ success: true, message: 'User registered successfully' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    console.log('Query result:', result);

    if (result.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = result[0];
    console.log('User found:', user);

    if (password === user.password) {
      return res.status(200).json({
        success: true,
        message: 'Login successful.',
        userId: user.id,
      });
    } else {
      console.log('Password mismatch');
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  });
});


function generateResponse(user_input) {
  user_input = user_input.toLowerCase();
  if(user_input == "Hi"||user_input == "hi"|| user_input == "Hlo"||user_input == "hlo")
    return "Hi how I can assist you today?"; 

  // Check if the user input includes the word "book"
  if (user_input.includes("book")) {
    return `To book a tour, please sign up, log in, go to the search page, search for your favorite package, and book it!`;
  }

  // Separate block to handle user input for city-based queries
  const cityTours = tours.filter(tour => user_input.includes(tour.city.toLowerCase()));

  if (cityTours.length > 0) {
    // If city-based query, return all tours available in that city
    const cityTourTitles = cityTours.map(tour => `${tour.title} (₹${tour.price}, ${tour.Rating} stars)`).join(", ");
    return `Here are the tours available in ${cityTours[0].city}: ${cityTourTitles}.`;
  }

  // Loop through tours to check if the user mentioned any specific tourist spot
  for (let tour of tours) {
    const title = tour.title.toLowerCase();
    const city = tour.city.toLowerCase();

    if (user_input.includes(title) || user_input.includes(city)) {
      // Handle different types of queries about a specific tourist spot
      if (user_input.includes("price")) {
        return `The price for visiting ${tour.title} is ₹${tour.price}.`;
      } else if (user_input.includes("location") || user_input.includes("city")) {
        return `${tour.title} is located in ${tour.city}.`;
      } else if (user_input.includes("rating")) {
        return `The rating for ${tour.title} is ${tour.Rating} stars.`;
      }
      else if(user_input == "Hi"||user_input == "hi"|| user_input == "Hlo"||user_input == "hlo")
           return "Hi how I can assist you today?"; 
      
      else {
        return `${tour.title} is a beautiful place to visit in ${tour.city}. It costs ₹${tour.price} and has a rating of ${tour.Rating} stars.`;
      }
    }
  }

  return "I'm sorry, I don't have information about that. Can you specify the tourist spot?";
}


app.post("/chatbot", (req, res) => {
  const { query } = req.body;
  const response = generateResponse(query);
  res.json({ response });
});










/*

app.post('/api/bookings', (req, res) => {
  const { userId, tourId } = req.body;

  if (!userId || !tourId) {
    return res.status(400).json({ message: 'User ID and Tour ID are required' });
  }

  console.log('UserID:', userId, 'TourID:', tourId);

  // Fetch user's current bookings and update
  const query = 'SELECT bookings FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);  // Log the error
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Current Bookings:', result[0].bookings);  // Log current bookings

    // Parse existing bookings or initialize an empty array
    const currentBookings = result[0].bookings ? result[0].bookings.split(',') : [];

    // Check if the tourId is already in the bookings to avoid duplicates
    if (currentBookings.includes(tourId)) {
      return res.status(400).json({ message: 'Tour already booked' });
    }

    // Add the new booking (tourId)
    currentBookings.push(tourId);

    console.log('Updated Bookings:', currentBookings);  // Log the updated bookings

    // Update the user's bookings in the database
    const updateQuery = 'UPDATE users SET bookings = ? WHERE id = ?';
    db.query(updateQuery, [currentBookings.join(','), userId], (err, updateResult) => {
      if (err) {
        console.error('Error updating bookings:', err);  // Log the error
        return res.status(500).json({ message: 'Error updating bookings' });
      }

      // Respond with success message and updated bookings
      res.status(200).json({ message: 'Booking successful', bookings: currentBookings });
    });
  });
});*/
/*

app.post('/api/bookings', (req, res) => { 
  const { userId, tourId, price } = req.body;
  console.log(userId,tourId,price); 

  // Validate the request body
  if (!userId || !tourId || !price) {
    return res.status(400).json({ message: 'User ID, Tour ID, and Price are required.' });
  }

  console.log('[INFO] UserID:', userId, 'TourID:', tourId, 'Price:', price);

  // Fetch user's current bookings
  const query = 'SELECT bookings FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('[ERROR] Database error while fetching bookings:', err);
      return res.status(500).json({ message: 'Database error occurred.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log('[INFO] Current Bookings:', result[0].bookings);

    const currentBookings = result[0].bookings ? result[0].bookings.split(',') : [];

    // Check if the tour has already been booked
    if (currentBookings.includes(tourId)) {
      return res.status(400).json({ message: 'Tour already booked.' });
    }

    // Add the new tour to the user's bookings
    currentBookings.push(tourId);
    console.log('[INFO] Updated Bookings:', currentBookings);

    // Update the bookings in the database
    const updateQuery = 'UPDATE users SET bookings = ? WHERE id = ?';
    db.query(updateQuery, [currentBookings.join(','), userId], (updateErr) => {
      if (updateErr) {
        console.error('[ERROR] Error updating bookings:', updateErr);
        return res.status(500).json({ message: 'Error updating bookings.' });
      }

      // Optionally, store the price along with the booking, if needed
      console.log('[INFO] Booking successful with price:', price);

      res.status(200).json({
        message: 'Booking successful.',
        bookings: currentBookings,
        price, // You can send the price back if needed
      });
    });
  });
});

*/

app.post('/api/bookings', (req, res) => { 
  const { userId, tourId, price } = req.body;
  console.log(userId, tourId, price);

  // Validate the request body
  if (!userId || !tourId || !price) {
    return res.status(400).json({ message: 'User ID, Tour ID, and Price are required.' });
  }

  console.log('[INFO] UserID:', userId, 'TourID:', tourId, 'Price:', price);

  // Fetch user's current bookings
  const query = 'SELECT bookings FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('[ERROR] Database error while fetching bookings:', err);
      return res.status(500).json({ message: 'Database error occurred.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log('[INFO] Current Bookings:', result[0].bookings);

    const currentBookings = result[0].bookings ? result[0].bookings.split(',') : [];

    // Check if the tour has already been booked
    if (currentBookings.includes(tourId)) {
      return res.status(400).json({ message: 'Tour already booked.' });
    }

    // Simulate payment check (if payment is required before booking confirmation)
    // In reality, this should be checked against a real payment service.
    // For now, we assume that the `isPaid` status is part of the request body or session.
    const isPaid = true; // For example, this could come from the session or payment service

    if (!isPaid) {
      return res.status(400).json({ message: 'Payment failed or not completed.' });
    }

    // Proceed to update bookings and handle payment
    currentBookings.push(tourId);
    console.log('[INFO] Updated Bookings:', currentBookings);

    // Update the bookings in the database
    const updateQuery = 'UPDATE users SET bookings = ? WHERE id = ?';
    db.query(updateQuery, [currentBookings.join(','), userId], (updateErr) => {
      if (updateErr) {
        console.error('[ERROR] Error updating bookings:', updateErr);
        return res.status(500).json({ message: 'Error updating bookings.' });
      }

      // Optionally, store the price along with the booking, if needed
      console.log('[INFO] Booking successful with price:', price);

      // Return successful booking confirmation response
      res.status(200).json({
        message: 'Booking confirmed successfully.',
        bookings: currentBookings,
        price, // You can send the price back if needed
      });
    });
  });
});





/*


app.post('/api/profile', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }
// add here if userid is 5 then send total table else send only particlar row like below 
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Extract user data and convert bookings field to an array
    const user = result[0];
    user.bookings = user.bookings ? user.bookings.split(',') : []; // Handle bookings as an array

    // Send full user data
    return res.status(200).json({ success: true, user });
  });
});*/

app.post('/api/profile', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  // If userId is 5, fetch all rows from the 'users' table
  if (userId === '5') {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Database error.' });
      }

      // Convert bookings field to an array for all users
      const users = results.map(user => ({
        ...user,
        bookings: user.bookings ? user.bookings.split(',') : [], // Handle bookings as an array
      }));

      return res.status(200).json({ success: true, users });
    });
  } else {
    // Fetch a single user's row if userId is not 5
    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, message: 'Database error.' });
      }

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // Extract user data and convert bookings field to an array
      const user = result[0];
      user.bookings = user.bookings ? user.bookings.split(',') : []; // Handle bookings as an array

      // Send single user data
      return res.status(200).json({ success: true, user });
    });
  }
});









app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL (ensure it matches exactly)
  credentials: true, // Allow cookies if needed
}));


// Start the server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Start the server
