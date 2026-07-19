const API_URL = "https://kenya-airlines-skyway.onrender.com";

let flights = [];
let bookings = [];
let selectedFlight = null;

const flightsContainer = document.getElementById("flights-container");
const bookingHistoryList = document.getElementById("booking-history-list");
const searchInput = document.getElementById("search-input");
const filterClass = document.getElementById("filter-class");

// ======================
// Initialize App
// ======================

async function initApp() {

    try {

        flightsContainer.innerHTML = "<h3>✈ Loading flights...</h3>";

        const flightsRes = await fetch(`${API_URL}/flights`);
        flights = await flightsRes.json();

        const bookingsRes = await fetch(`${API_URL}/bookings`);
        bookings = await bookingsRes.json();

        renderFlights(flights);
        renderBookings();

    } catch (error) {

        console.error(error);

        flightsContainer.innerHTML = `
            <h2 style="color:red;text-align:center;">
                Failed to connect to server.
            </h2>
        `;

    }

}

// ======================
// Render Flights
// ======================

function renderFlights(flightsList) {

    flightsContainer.innerHTML = "";

    if (!flightsList.length) {

        flightsContainer.innerHTML = "<p>No flights found.</p>";
        return;

    }

    flightsList.forEach(flight => {

        const card = document.createElement("div");

        card.className = "flight-card";

        card.innerHTML = `

            <img src="${flight.image}"
                 alt="${flight.destination}"
                 style="width:100%;height:220px;object-fit:cover;border-radius:10px;">

            <h3>${flight.flightNumber}</h3>

            <p><strong>Destination:</strong> ${flight.destination}</p>

            <p><strong>Class:</strong> ${flight.class}</p>

            <p><strong>Seats:</strong> ${flight.seats}</p>

            <p><strong>Price:</strong> $${flight.price}</p>

            <div class="card-buttons">

                <button class="book-btn" onclick="bookFlight('${flight.id}')">
                    Book Flight
                </button>

                <button class="view-btn" onclick="viewFlight('${flight.id}')">
                    View Details
                </button>

            </div>

        `;

        flightsContainer.appendChild(card);

    });

}

// ======================
// View Flight
// ======================

function viewFlight(id) {

    const flight = flights.find(f => String(f.id) === String(id));

    if (!flight) return;

    alert(`

Flight Number: ${flight.flightNumber}

Destination: ${flight.destination}

Class: ${flight.class}

Seats Available: ${flight.seats}

Price: $${flight.price}

`);

}

// ======================
// Open Booking Popup
// ======================

function bookFlight(id) {

    selectedFlight = flights.find(f => String(f.id) === String(id));

    if (!selectedFlight) return;

    document.getElementById("bookingImage").src = selectedFlight.image;
    document.getElementById("bookingFlight").textContent = selectedFlight.flightNumber;
    document.getElementById("bookingDestination").textContent = selectedFlight.destination;
    document.getElementById("bookingClass").textContent = selectedFlight.class;
    document.getElementById("bookingPrice").textContent = selectedFlight.price;

    document.getElementById("bookingModal").style.display = "flex";

}

// ======================
// Close Popup
// ======================

function closeBooking() {

    document.getElementById("bookingModal").style.display = "none";

}

// ======================
// Confirm Booking
// ======================

async function confirmBooking() {

    if (!selectedFlight) return;

    const booking = {

        flightId: selectedFlight.id,
        flightNumber: selectedFlight.flightNumber,
        destination: selectedFlight.destination,
        class: selectedFlight.class,
        price: selectedFlight.price,
        image: selectedFlight.image,
        bookedAt: new Date().toLocaleString()

    };

    try {

        const response = await fetch(`${API_URL}/bookings`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(booking)

        });

        if (!response.ok) {

            throw new Error("Booking failed");

        }

        const savedBooking = await response.json();

        bookings.push(savedBooking);

        renderBookings();

        closeBooking();

        alert("✅ Booking Successful!");

    }

    catch(error){

        console.error(error);

        alert("Booking failed.");

    }

}

// ======================
// Render Booking History
// ======================

function renderBookings() {

    bookingHistoryList.innerHTML = "";

    if (!bookings.length) {

        bookingHistoryList.innerHTML = "<li>No bookings yet.</li>";

        return;

    }

    bookings.forEach(booking => {

        const li = document.createElement("li");

        li.innerHTML = `

            <strong>${booking.flightNumber}</strong><br>

            ${booking.destination}<br>

            ${booking.class}<br>

            $${booking.price}<br>

            <small>${booking.bookedAt}</small>

        `;

        bookingHistoryList.appendChild(li);

    });

}

// ======================
// Search Flights
// ======================

searchInput.addEventListener("input", filterFlights);

filterClass.addEventListener("change", filterFlights);

function filterFlights(){

    let filtered = [...flights];

    const search = searchInput.value.toLowerCase();

    const flightClass = filterClass.value;

    if(search){

        filtered = filtered.filter(f =>

            f.destination.toLowerCase().includes(search)

        );

    }

    if(flightClass !== "all"){

        filtered = filtered.filter(f =>

            f.class === flightClass

        );

    }

    renderFlights(filtered);

}

// ======================
// Start App
// ======================

document.addEventListener("DOMContentLoaded", initApp);