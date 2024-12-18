const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/Users.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "g3gfsdG$4gsFGG24gHHsdfsdh$fg4fgrgFgop91cS";

mongoose.connect(process.env.MONOGO_URL);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

function getUserDataFromRequest(request) {
  return new Promise((resolve, reject) => {
    jwt.verify(request.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/test", (request, response) => {
  response.json("test ok");
});

app.post("/register", async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    response.json(userDoc);
  } catch (error) {
    response.status(422).json(error);
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if (passOK) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          response.cookie("token", token).json(userDoc);
        }
      );
    } else {
      response.status(422).json("password not okay");
    }
  } else {
    response.status(422).json("not found");
  }
});

app.get("/profile", (request, response) => {
  const { token } = request.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, tokenData) => {
      if (err) throw err;
      const { email, name, _id } = await User.findById(tokenData.id);
      response.json({ email, name, _id });
    });
  } else {
    response.json(null);
  }
});

app.post("/logout", (request, response) => {
  response.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (request, response) => {
  const { link } = request.body;
  const newName = "media" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  response.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  (request, response) => {
    const uploadedFiles = [];
    for (let i = 0; i < request.files.length; i++) {
      const { path, originalname } = request.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    response.json(uploadedFiles);
  }
);

app.post("/places", (request, response) => {
  const { token } = request.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    prices,
  } = request.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      media: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      prices,
    });

    response.json(placeDoc);
  });
});

app.get("/user-places", (request, response) => {
  const { token } = request.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    response.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (request, response) => {
  const { id } = request.params;
  response.json(await Place.findById(id));
});

app.put("/places", async (request, response) => {
  const { token } = request.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    prices,
  } = request.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        media: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        prices,
      });
      await placeDoc.save();
      response.json("All Good!");
    }
  });
});

app.get("/places", async (request, response) => {
  response.json(await Place.find());
});

app.post("/bookings", async (request, response) => {
  const userData = await getUserDataFromRequest(req);
  const { place, checkIn, checkOut, maxGuests, fullName, mobile, price } =
    request.body;
  Booking.create({
    user: userData.id,
    place,
    checkIn,
    checkOut,
    maxGuests,
    fullName,
    mobile,
    price,
  })
    .then((doc) => {
      response.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (request, response) => {
  const userData = await getUserDataFromRequest(request);
  response.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
