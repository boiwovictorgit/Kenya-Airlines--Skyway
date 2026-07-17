# ✈️ Kenya Airlines Booking System

A modern airline booking web application built using **HTML**, **CSS**, and **JavaScript**. The application allows users to browse available domestic flights, search destinations, filter flights by class, and book tickets through an interactive interface.

---

## 📖 Project Description

The Kenya Airlines Booking System simulates an online airline reservation platform inspired by Kenya Airways. It provides users with a clean and responsive interface for exploring flights, making bookings, and viewing booking history.

The project demonstrates JavaScript DOM manipulation, Fetch API, asynchronous programming, event handling, and responsive web design.

---

## 🚀 Features

- Display available domestic flights
- Search flights by destination
- Filter flights by travel class
- Book flights
- View booking history
- Live flight statistics dashboard
- Responsive user interface
- Dynamic data loaded from `db.json`

---



- HTML5
- CSS3
- JavaScript (ES6)
- JSON Server
- Fetch API
- DOM Manipulation
- Git & GitHub

---

## 📂 Project Structure

```
Kenya-Airlines/
│
├── index.html
├── style.css
├── script.js
├── db.json
├── README.md
└── .vscode/
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone git@github.com:boiwovictorgit/Kenya-Airlines.git
```

### 2. Open the project

```bash
cd Kenya-Airlines
```

### 3. Install JSON Server

```bash
npm install -g json-server
```

### 4. Start the JSON Server

```bash
json-server --watch db.json --port 3000
```

### 5. Run the project

Open `index.html` using Live Server or any local web server.

Example:

```
http://127.0.0.1:5500
```

---

## 📡 API

The application fetches flight information from:

```
http://localhost:3000/flights
```

Example:

```javascript
fetch("http://localhost:3000/flights")
```

---

## 💻 Main JavaScript Concepts Used

- Variables
- Arrays
- Objects
- Functions
- Arrow Functions
- Callback Functions
- Fetch API
- Promises
- Async Programming
- DOM Manipulation
- Event Listeners
- Array Methods
  - map()
  - filter()
  - find()
  - forEach()
  - reduce()



## 🎯 Learning Objectives

This project demonstrates the ability to:

- Build interactive web applications
- Consume data using Fetch API
- Manipulate the DOM dynamically
- Handle user events
- Work with JSON data
- Organize JavaScript code effectively
- Implement responsive layouts

---

## 📸 Application Sections

- Navigation Bar
- Hero Section
- Flight Search
- Flight Cards
- Booking Section
- Booking History
- Travel Planning Section
- Newsletter Subscription
- Footer

---

## 👨‍💻 Future Improvements

- User Authentication
- Payment Integration (M-Pesa/Card)
- Flight Cancellation
- Seat Selection
- Passenger Profiles
- Email Ticket Generation
- Flight Status Tracking
- Admin Dashboard
- Booking Confirmation PDF

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

## 📜 License

This project is developed for educational purposes at **Moringa School**.

---

## 👤 Author

**Boiwo Victor**

GitHub: https://github.com/boiwovictorgit

---

## ⭐ Acknowledgements

- Moringa School
- Kenya Airways
- JSON Server
- JavaScript Documentation (MDN)