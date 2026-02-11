import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";
import Fot from "./footer";

const MessChange = () => {
  const [messChangeRequests] = useState([
    {
      id: 1,
      currentMess: "Central Mess",
      requestedMess: "North Campus Mess",
      reason: "Closer to academic buildings and better food quality",
      status: "Approved",
      universityPolicy: "Mess change allowed once per semester with valid reason.",
    },
  ]);

  const [availableMesses] = useState([
    {
      id: 1,
      name: "Central Mess",
      description: "Main dining facility serving traditional Indian cuisine with modern amenities.",
      rating: 4.2,
      facilities: ["Vegetarian", "Non-Veg", "AC Dining", "Wi-Fi", "Clean Water"],
      capacity: 500,
      operatingHours: "6:00 AM - 10:00 PM",
      universityPolicy: "Serves balanced meals as per nutritional guidelines.",
      menu: {
        Monday: { breakfast: "Idli, Sambar, Chutney", lunch: "Rice, Dal, Mixed Vegetables, Curd", dinner: "Chapati, Paneer Curry, Salad" },
        Tuesday: { breakfast: "Dosa, Coconut Chutney", lunch: "Rice, Sambar, Fish Curry", dinner: "Naan, Chicken Masala" },
        Wednesday: { breakfast: "Pongal, Sambar", lunch: "Rice, Rasam, Vegetable Curry", dinner: "Roti, Dal Tadka, Pickle" },
        Thursday: { breakfast: "Vada, Sambar", lunch: "Rice, Curd Rice, Vegetable", dinner: "Paratha, Aloo Gobi" },
        Friday: { breakfast: "Upma, Chutney", lunch: "Rice, Dal, Chana Masala", dinner: "Biryani, Raita, Salad" },
        Saturday: { breakfast: "Puri, Bhaji", lunch: "Rice, Sambar, Egg Curry", dinner: "Chapati, Rajma, Salad" },
        Sunday: { breakfast: "Poori, Potato Curry", lunch: "Rice, Dal, Vegetable Biryani", dinner: "Naan, Butter Chicken" },
      },
    },
    {
      id: 2,
      name: "North Campus Mess",
      description: "Modern dining hall with healthy options and international cuisine.",
      rating: 4.5,
      facilities: ["Vegetarian", "Non-Veg", "Healthy Options", "Diet Plans", "AC", "Wi-Fi"],
      capacity: 300,
      operatingHours: "7:00 AM - 9:00 PM",
      universityPolicy: "Focuses on nutritional balance and dietary requirements.",
      menu: {
        Monday: { breakfast: "Oats, Fresh Fruits, Milk", lunch: "Brown Rice, Grilled Chicken, Salad", dinner: "Whole Wheat Roti, Vegetable Stir Fry" },
        Tuesday: { breakfast: "Cornflakes, Yogurt", lunch: "Quinoa, Fish, Steamed Vegetables", dinner: "Multigrain Bread, Lentil Soup" },
        Wednesday: { breakfast: "Smoothie Bowl, Nuts", lunch: "Brown Rice, Tofu Curry, Salad", dinner: "Grilled Paneer, Quinoa Salad" },
        Thursday: { breakfast: "Eggs, Whole Wheat Toast", lunch: "Pasta, Turkey Meatballs", dinner: "Salmon, Steamed Broccoli" },
        Friday: { breakfast: "Yogurt Parfait, Granola", lunch: "Brown Rice, Chickpea Curry", dinner: "Veggie Burger, Sweet Potato" },
        Saturday: { breakfast: "Avocado Toast, Juice", lunch: "Grilled Chicken Salad", dinner: "Turkey Stir Fry, Brown Rice" },
        Sunday: { breakfast: "Pancakes, Berries", lunch: "Fish Tacos, Salad", dinner: "Vegetable Lasagna, Garlic Bread" },
      },
    },
    {
      id: 3,
      name: "South Campus Mess",
      description: "Specialized mess for international students with global cuisine.",
      rating: 4.0,
      facilities: ["Vegetarian", "Non-Veg", "International", "Halal", "Kosher Options"],
      capacity: 200,
      operatingHours: "8:00 AM - 8:00 PM",
      universityPolicy: "Catering to diverse cultural and dietary needs.",
      menu: {
        Monday: { breakfast: "Croissant, Coffee, Fruits", lunch: "Pasta Carbonara, Salad", dinner: "Sushi, Miso Soup, Rice" },
        Tuesday: { breakfast: "Bagel, Cream Cheese", lunch: "Thai Green Curry, Jasmine Rice", dinner: "Mexican Tacos, Salsa" },
        Wednesday: { breakfast: "French Toast, Maple Syrup", lunch: "Greek Salad, Feta Cheese", dinner: "Butter Chicken, Naan" },
        Thursday: { breakfast: "Smoothie, Granola Bar", lunch: "Pizza Margherita, Salad", dinner: "Chinese Stir Fry, Rice" },
        Friday: { breakfast: "Waffles, Syrup", lunch: "Falafel Wrap, Hummus", dinner: "Italian Risotto, Bread" },
        Saturday: { breakfast: "Egg Benedict, Toast", lunch: "Burger, Fries, Salad", dinner: "Korean Bibimbap, Kimchi" },
        Sunday: { breakfast: "Brunch Platter, Juice", lunch: "Roast Chicken, Vegetables", dinner: "Dessert Buffet, Coffee" },
      },
    },
  ]);

  const [formData, setFormData] = useState({
    currentMess: "",
    requestedMess: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    alert("Mess change request submitted!");
    setFormData({ currentMess: "", requestedMess: "", reason: "" });
  };

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">College Dining Services</div>
        </div>

        <h1 className="section-title">🍽️ Mess Change Requests</h1>
        <div className="mess-list">
          {messChangeRequests.map((request, index) => (
            <div key={request.id} className="mess-card-modern" style={{'--i': index}}>
              <div className="card-header">
                <h3>🔄 Mess Change Request</h3>
                <span className={`status-badge ${request.status.toLowerCase().replace(' ', '')}`}>{request.status}</span>
              </div>
              <div className="card-body">
                <p><strong>Current Mess:</strong> {request.currentMess}</p>
                <p><strong>Requested Mess:</strong> {request.requestedMess}</p>
                <p><strong>Reason:</strong> {request.reason}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Available Messes */}
        <h3 className="subsection-title">🏠 Available Messes</h3>
        <div className="available-messes-grid">
          {availableMesses.map((mess, index) => (
            <div key={mess.id} className="mess-option-card-modern" style={{'--i': index}}>
              <div className="mess-image-placeholder">
                <span>🍲</span>
              </div>
              <div className="mess-content">
                <div className="mess-header-modern">
                  <h4>{mess.name}</h4>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(mess.rating) ? 'star filled' : 'star'}>★</span>
                    ))}
                    <span className="rating-text">({mess.rating})</span>
                  </div>
                </div>
                <p className="mess-description">{mess.description}</p>
                <div className="mess-facilities-modern">
                  {mess.facilities.map((facility, index) => (
                    <span key={index} className="facility-badge tooltip">
                      {facility}
                      <span className="tooltip-text">Premium {facility} facility available</span>
                    </span>
                  ))}
                </div>

                {/* Weekly Menu */}
                <div className="mess-menu">
                  <h5>📅 Weekly Menu</h5>
                  <div className="menu-grid">
                    {Object.entries(mess.menu).map(([day, meals]) => (
                      <div key={day} className="menu-day">
                        <h6>{day}</h6>
                        <div className="meals">
                          <p><strong>Breakfast:</strong> {meals.breakfast}</p>
                          <p><strong>Lunch:</strong> {meals.lunch}</p>
                          <p><strong>Dinner:</strong> {meals.dinner}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Mess Change Form */}
        <div className="mess-change-form-modern">
          <h3 className="form-title">📝 Request Mess Change</h3>
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-row">
              <div className="form-group-modern">
                <label htmlFor="currentMess">Current Mess:</label>
                <select
                  id="currentMess"
                  name="currentMess"
                  value={formData.currentMess}
                  onChange={handleInputChange}
                  required
                  className="modern-select"
                >
                  <option value="">Select Current Mess</option>
                  {availableMesses.map((mess) => (
                    <option key={mess.id} value={mess.name}>{mess.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group-modern">
                <label htmlFor="requestedMess">Requested Mess:</label>
                <select
                  id="requestedMess"
                  name="requestedMess"
                  value={formData.requestedMess}
                  onChange={handleInputChange}
                  required
                  className="modern-select"
                >
                  <option value="">Select Requested Mess</option>
                  {availableMesses.map((mess) => (
                    <option key={mess.id} value={mess.name}>{mess.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group-modern">
              <label htmlFor="reason">Reason for Change:</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Please provide a detailed reason for your mess change request..."
                required
                className="modern-textarea"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn-modern">🚀 Submit Request</button>
          </form>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default MessChange;
