import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import tours from "./tours.js"; // Ensure this path is correct
import { UserContext } from "../UserProvider/UserProvider"; // <-- Corrected import

const Search = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm")?.toLowerCase(); // Normalize search term for case-insensitivity
  const [searchInput, setSearchInput] = useState(""); // State to store user input

  // Filter tours based on search term (if provided)
  const filteredTours = searchTerm
    ? tours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchTerm) ||
          tour.city.toLowerCase().includes(searchTerm)
      )
    : tours; // If no search term, show all tours

  const handleSearch = () => {
    navigate(`?searchTerm=${searchInput}`); // Update URL with search term
  };

  const handle = (tourId, price) => {
    // Pass userId, tourId, and price to the booking page
    navigate(`/book/${tourId}`, { state: { userId, tourId, price } });
  };
  

  return (
    <div className="container my-4">
      <h2 className="mb-4">Featured Tours</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title or city"
          className="form-control"
          style={{ maxWidth: "400px", display: "inline-block", marginRight: "10px" }}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Display Search Info */}
      <div>
        {searchTerm && <p>Searching for: {searchTerm}</p>}
        {userId && <p>User ID: {userId}</p>}
      </div>

      {/* Tour Cards */}
      {filteredTours.length > 0 ? (
        <Row className="g-4">
          {filteredTours.map((tour) => (
            <Col key={tour.id} md={4} sm={6}>
              <Card>
                {/* Adjust the image size */}
                <Card.Img
                  variant="top"
                  src={tour.photo}
                  alt={tour.title}
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <center>
                  {/* Adjust the card body size */}
                  <Card.Body
                    style={{ padding: "8px", margin: "5px 0", lineHeight: "1.2" }}
                  >
                    <Card.Title>{tour.title}</Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>
                      <strong>City:</strong> {tour.city} <br />
                      <strong>Price:</strong> ${tour.price} <br />
                      <strong>Avg Rating:</strong> {tour.avgRating} ⭐
                    </Card.Text>
                    <Card.Text className="text-muted" style={{ fontSize: "12px" }}>
                      {tour.desc}
                    </Card.Text>
                    <button onClick={() => handle(tour.title,tour.price,tour.title)}  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none">Book Now</button>
                  </Card.Body>
                </center>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div>No packages found based on your search.</div>
      )}
    </div>
  );
};

export default Search;
