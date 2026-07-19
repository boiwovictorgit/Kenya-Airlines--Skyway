const API_URL = "https://kenya-airlines-skyway.onrender.com";

let flights = [];
let bookings = [];
let selectedFlight = null;

const flightsContainer = document.getElementById("flights-container");
const bookingHistoryList = document.getElementById("booking-history-list");
const searchInput = document.getElementById("search-input");
const filterClass = document.getElementById("filter-class");


// Initialize App


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


// Render Booking History


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


// Search Flights


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
// ======================
// Footer Popup
// ======================

const footerInfo = {

about: `
<h3>About Kenya Airways</h3>

<p>
Kenya Airways, the flag carrier of Kenya, plays a crucial role in the country's
socio-economic landscape. Headquartered in Nairobi, the airline is not only a
leading aviation company but also a significant contributor to Kenya's national
development and global connectivity.
</p>

<p>
Kenya, like many countries across Africa, continues to face challenges related
to poverty and economic inequality. Approximately <strong>36.1%</strong> of Kenya's
population lives below the poverty line. Kenya Airways contributes to economic
growth by creating jobs, supporting tourism, facilitating trade, and connecting
Kenya to the rest of the world.
</p>

<p>
The airline connects diverse regions, promotes economic integration, and
supports sustainable development by improving access to international markets
and business opportunities.
</p>

<p>
Despite these achievements, Kenya Airways continues to operate in an environment
marked by unequal infrastructure development, varying education levels, income
disparities, and unequal access to air transport across Africa.
</p>

<p>
As <strong>The Pride of Africa</strong>, Kenya Airways remains committed to safe,
reliable, and world-class aviation services while supporting the economic
prosperity of Kenya and the African continent.
</p>
`,

awards:`<h3>Awards</h3><p>Kenya Airways has received several international awards for excellence in aviation, customer service, safety, and operational performance.</p>`,

careers:`<h3>Careers</h3><p>Explore career opportunities for pilots, cabin crew, engineers, IT professionals, finance teams, and customer service staff.</p>`,

partners:`<h3>Our Partners</h3><p>Kenya Airways partners with SkyTeam and leading global airlines to connect passengers to hundreds of destinations worldwide.</p>`,

holidays:`<h3>KQ Holidays</h3><p>Discover holiday packages, hotels, safaris, and travel experiences with KQ Holidays.</p>`,

cargo:`<h3>KQ Cargo</h3><p>Reliable cargo and freight services connecting Kenya with Africa and the rest of the world.</p>`,

pride:`<h3>KQ Pride Centre</h3><p>A leading aviation training academy offering pilot, engineering, and cabin crew training.</p>`,

fahari:`<h3>Fahari Aviation</h3><p>Specialists in drone technology, aerial services, and aviation innovation.</p>`,

map:`<h3>Route Map</h3><p>Explore our growing network of destinations across Africa, Europe, Asia, and America.</p>`,

africa:`<h3>Africa</h3><p>Serving major cities including Nairobi, Kigali, Entebbe, Johannesburg, Lagos, Accra, Lusaka, and Harare.</p>`,

asia:`<h3>Asia</h3><p>Travel conveniently to destinations such as Mumbai, Bangkok, Guangzhou, and more.</p>`,

america:`<h3>America</h3><p>Connect to New York and many other destinations through Kenya Airways partner airlines.</p>`,

feedback:`<h3>Feedback / Complaint</h3><p>We value your feedback and continuously work to improve our customer experience.</p>`,

contact:`<h3>Contact Us</h3>
<p><strong>Email:</strong> customer.relations@kenya-airways.com</p>
<p><strong>Phone:</strong> +254 0797179296</p>
<p><strong>Head Office:</strong> Embakasi, Nairobi, Eldoret, Mombasa, Malindi, ETC</p>`,

rules:`<h3>Name Change Rules</h3><p>Passenger names must match travel documents. Minor corrections may be permitted according to fare rules.</p>`,

requirements:`<h3>Travel Requirements</h3><p>Ensure you have a valid passport, visa (where applicable), and meet all destination health and entry requirements before travel.</p>`

};

const popup = document.getElementById("footerPopup");
const popupTitle = document.getElementById("popupTitle");
const popupBody = document.getElementById("popupBody");
const closePopup = document.getElementById("closePopup");

document.querySelectorAll(".footer-link").forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const page = this.dataset.page;

        popupTitle.textContent = this.textContent;

        popupBody.innerHTML = footerInfo[page];

        popup.style.display = "block";

    });

});

closePopup.onclick = () => popup.style.display = "none";

window.onclick = (e) => {

    if(e.target === popup){

        popup.style.display = "none";

    }

};
// ======================
// Subscribe Popup
// ======================

function openSubscribeModal() {

    document.getElementById("subscribeModal").style.display = "flex";

}

function closeSubscribeModal() {

    document.getElementById("subscribeModal").style.display = "none";

}

document.getElementById("subscribeForm").addEventListener("submit", function(e){

    e.preventDefault();

    alert("✅ Thank you for subscribing to Kenya Airways!");

    this.reset();

    closeSubscribeModal();

});

window.addEventListener("click", function(e){

    const modal = document.getElementById("subscribeModal");

    if(e.target === modal){

        closeSubscribeModal();

    }

});