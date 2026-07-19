
const API_URL = "https://kenya-airlines-skyway.onrender.com";

let flights = [];
let bookings = [];

const flightsContainer = document.getElementById("flights-container");
const bookingHistoryList = document.getElementById("booking-history-list");
const searchInput = document.getElementById("search-input");
const filterClass = document.getElementById("filter-class");
const statsDashboard = document.getElementById("stats-dashboard");

async function initApp() {
    try {
        flightsContainer.innerHTML = `
            <p style="padding:20px;color:#0284c7;font-weight:bold;">
                ✈️ Loading flights...
            </p>
        `;

        const [flightsRes, bookingsRes] = await Promise.all([
            fetch(`${API_URL}/flights`),
            fetch(`${API_URL}/bookings`)
        ]);

        if (!flightsRes.ok) {
            throw new Error(`Flights API Error: ${flightsRes.status}`);
        }

        if (!bookingsRes.ok) {
            throw new Error(`Bookings API Error: ${bookingsRes.status}`);
        }

        flights = await flightsRes.json();
        bookings = await bookingsRes.json();

        renderFlights(flights);

    } catch (error) {
        console.error(error);

        flightsContainer.innerHTML = `
            <div style="padding:20px;border:2px solid red;border-radius:8px;">
                <h3>Unable to connect to the backend.</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function renderFlights(flights) {
    flightsContainer.innerHTML = "";

    if (!flights.length) {
        flightsContainer.innerHTML = "<p>No flights available.</p>";
        return;
    }

    flights.forEach(flight => {
        const card = document.createElement("div");
        card.className = "flight-card";

        card.innerHTML = `
            <img src="${flight.image}" alt="${flight.destination}" style="width:100%;height:220px;object-fit:cover;border-radius:8px;">
            <h3>${flight.flightNumber}</h3>
            <p><strong>Destination:</strong> ${flight.destination}</p>
            <p><strong>Class:</strong> ${flight.class}</p>
            <p><strong>Seats:</strong> ${flight.seats}</p>
            <p><strong>Price:</strong> $${flight.price}</p>
            <button class="book-btn">Book Flight</button>
        `;

        flightsContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", initApp);