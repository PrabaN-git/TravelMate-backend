// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Place = require("../models/Place"); // <-- fixed path

const places = [
  { 
    name: "Singapore", 
    desc: "Singapore, officially the Republic of Singapore.", 
    price: "$38,800 • 2 nights • 1500 kms",
    img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/542000/542607-singapore.jpg" 
  },
  { 
    name: "Thailand", 
    desc: "Thailand is known for tropical beaches and culture.", 
    price: "$54,200 • 2 nights • 1500 kms",
    img: "https://lp-cms-production.imgix.net/2020-11/500pxRF_241509159.jpg?auto=format,compress&q=72&fit=crop&ar=1:1" 
  },
  { 
    name: "Paris", 
    desc: "Paris, France's capital, is a major European city.", 
    price: "$45,500 • 2 nights • 1500 kms",
    img: "https://media.istockphoto.com/id/1345426734/photo/eiffel-tower-paris-river-seine-sunset-twilight-france.jpg?s=612x612&w=0&k=20&c=I5rAH5d_-Yyag8F0CKzk9vzMr_1rgkAASGTE11YMh9A=" 
  },
  { 
    name: "New Zealand", 
    desc: "An island country with stunning landscapes.", 
    price: "$24,100 • 1 night • 1500 kms",
    img: "https://cdn.shopify.com/s/files/1/0074/4505/3498/files/Milford_ClassicView_Web.jpg?v=1528437318" 
  },
  { 
    name: "Bora Bora", 
    desc: "A small South Pacific island, famous for resorts.", 
    price: "$95,400 • 2 nights • 1500 kms",
    img: "https://t4.ftcdn.net/jpg/00/91/45/03/360_F_91450375_0ODbAerkYKJiwd5POIxvFtnNfOkrvXFm.jpg" 
  },
  { 
    name: "London", 
    desc: "Capital of England, rich in history and culture.", 
    price: "$38,800 • 3 nights • 1500 kms",
    img: "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/gc-v1/london-pass/blog/london-bridge-non-editorial?_a=BAVAZGE70" 
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to MongoDB, seeding data...");
  await Place.deleteMany({});
  await Place.insertMany(places);
  console.log("✅ Places seeded successfully");
  mongoose.connection.close();
}).catch(err => {
  console.error("❌ Error connecting to MongoDB:", err);
});
