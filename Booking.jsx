import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract tour details from state
  const { userId, price, tourId } = location.state;
  console.log(userId, price, tourId);

  // State to track payment status and booking status
  const [isPaid, setIsPaid] = useState(false);
  const [num, setNum] = useState(0);  // Track booking status (1 = already booked)

  // Log num whenever it changes
  useEffect(() => {
    console.log("Updated num: ", num);
  }, [num]); // This will run every time num changes

  const handlePayment = async () => {
    console.log("Current num before payment:", num); 
    if (num === 1) {  // Check if the tour is already booked
      alert("Payment failed. Tour already booked.");
      return;
    }

    try {
      alert(`Processing payment of $${price}...`);

      // Simulate payment processing (replace with actual integration)
     
        setIsPaid(true);
      
    
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleConfirmBooking = async () => {
    if (!isPaid) {
      alert("Please complete the payment first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/bookings", {
        userId,
        tourId,  // Ensure you are sending the tourId here
        price,   // Send the price as well
      });

      if (response.status === 200 ) {
        setNum(1); // Set num to 1 after booking confirmation
        console.log(num); 
        alert("Booking confirmed successfully! and   Payment Successful!");
        navigate("/search");  // Redirect to the search page
      }
    } catch (error) {
      console.error("Booking failed:", error);
      if (error.response && error.response.data.message) {
        // Check if the message is "Already booked"
        if (error.response.data.message === "Already booked") {
         // Set num to 1 if the tour is already booked
          alert("Payment failed. Tour already booked.");
        } else {
          alert(error.response.data.message+"Payment failed."); // Display other error messages from backend
        }
      } else {
        alert("Failed to confirm booking. Please try again.");
      }
    }
  };

  return (
    <div className="container my-4">
      <h2>Complete Your Booking</h2>
      <p>
        <strong>User ID:</strong> {userId} <br />
        <strong>Tour Price:</strong> ${price} <br />
      </p>

   
      <div className="my-4">
        <button
          className="btn btn-success"
          onClick={handlePayment}
          disabled={isPaid}
        >
          {isPaid ? "Paid" : "Pay Now"}
        </button>
      </div>

    
      <div>
        <button
          className="btn btn-primary"
          onClick={handleConfirmBooking}
          disabled={!isPaid} // Disable until payment is completed
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
