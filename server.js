const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Advert = require("./models/Advert");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const errorsHelper = require("./helpers/errors");
const advertsHelper = require("./helpers/adverts");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.auth = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const app = express();

mongoose.connect("mongodb://localhost:27017/avito", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

app.get("/", (req, res) => {
  res.send("Backend for project Abito");
});

app.listen(3000, () => {
  console.log(`Сервер запущен на порту 3000`);
});

app.use(express.json()); // for parsing application/json

// Получение всех объявлений
app.get("/adverts", async (req, res) => {
  const adverts = await Advert.find();
  const formattedAdverts = adverts.map(advertsHelper.formatAdvert);
  res.send(formattedAdverts);
});

// Получение одного объявления по id
app.get("/adverts/:id", async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id).populate(
      "user",
      "firstName lastName reviews rating"
    );
    if (!advert) {
      res.status(404).send({ error: "Объявления не существует" });
      return;
    }
    res.send(advert);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Создание нового объявления
app.post("/adverts", authenticate, async (req, res) => {
  const advert = new Advert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    user: req.auth._id,
    location: req.body.location,
    date: new Date(),
    photos: req.body.photos,
  });

  try {
    await advert.save();
    res.send(advert);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        error: {
          message: err.message,
          fields: errorsHelper.getErrorFields(err),
        },
      });
    } else {
      res.status(500).send({ error: err.message });
    }
  }
});

// Удаление объявления
app.delete("/adverts/:id", authenticate, async (req, res) => {
  await Advert.findByIdAndDelete(req.params.id);
  res.status(204).send;
});

// Обновление объявления
app.put("/adverts/:id", async (req, res) => {
  const advert = await Advert.findById(req.params.id);
  advert.title = req.body.title;
  advert.description = req.body.description;
  advert.price = req.body.price;
  advert.user = req.body.user;
  await advert.save();
  res.send(advert);
});

// Регистрация нового пользователя
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: req.body.avatar,
      // reviews и rating автоматически установятся на [] и 0
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send({
      error: {
        message: err.message,
        fields: errorsHelper.getErrorFields(err),
      },
    });
  }
});

// Аутентификация пользователя
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(400).send("Пользователь не существует");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken: accessToken });
    } else {
      res.status(403).send("Неверный пароль");
    }
  } catch {
    res.status(500).send("Что-то пошло не так. Попробуйте позже");
  }
});