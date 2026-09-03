import nairobi from "../assets/images/nairobi.jpg";
import mombasa from "../assets/images/mombasa.jpg";
import kisumu from "../assets/images/kisumu.jpg";
import eldoret from "../assets/images/eldoret.jpg";
import malindi from "../assets/images/malindi.jpg";
import diani from "../assets/images/diani.jpg";
import wilson from "../assets/images/wilson.jpg";
import lamu from "../assets/images/lamu.jpg";
import wajir from "../assets/images/wajir.jpg";

const flights = [
  {
    id: "1",
    flightNumber: "KQ-100",
    destination: "Nairobi (JKIA)",
    price: 120,
    seats: 14,
    class: "Economy",
    image: nairobi
  },

  {
    id: "2",
    flightNumber: "KQ-204",
    destination: "Mombasa (Moi Int.)",
    price: 150,
    seats: 8,
    class: "Business",
    image: mombasa
  },

  {
    id: "3",
    flightNumber: "JM-852",
    destination: "Kisumu International",
    price: 95,
    seats: 4,
    class: "Economy",
    image: kisumu
  },

  {
    id: "4",
    flightNumber: "GL-401",
    destination: "Eldoret International",
    price: 110,
    seats: 8,
    class: "Economy",
    image: eldoret
  },

  {
    id: "5",
    flightNumber: "9W-302",
    destination: "Malindi Airport",
    price: 135,
    seats: 6,
    class: "Economy",
    image: malindi
  },

  {
    id: "6",
    flightNumber: "SF-112",
    destination: "Diani (Ukunda Air)",
    price: 180,
    seats: 4,
    class: "Business",
    image: diani
  },

  {
    id: "7",
    flightNumber: "KQ-044",
    destination: "Nairobi (Wilson Air)",
    price: 85,
    seats: 19,
    class: "Economy",
    image: wilson
  },

  {
    id: "8",
    flightNumber: "JM-701",
    destination: "Lamu (Manda Airport)",
    price: 165,
    seats: 2,
    class: "Business",
    image: lamu
  },

  {
    id: "9",
    flightNumber: "GL-23",
    destination: "Wajir International",
    price: 234,
    seats: 200,
    class: "Business",
    image: wajir
  }
];

export default flights;