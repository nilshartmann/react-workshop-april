const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");

const createCards = require("./data").createCards;

let cards = createCards();

const app = express();

const slowEnabled = process.env.USE_SLOW === "true";

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req, _res, next) => {
  if (req.query.slow !== undefined || slowEnabled) {
    const timeout = parseInt(req.query.slow) || 1200;
    console.log(`Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

app.get("/cards", (req, res) => {
  let result = [...cards];

  const orderBy = req.query.orderBy || "date";

  if (orderBy === "date") {
    result.sort((a, b) => b.id.localeCompare(a.id));
  } else if (orderBy === "likes") {
    result.sort((a, b) => b.likes - a.likes);
  }

  if (req.query.fail !== undefined) {
    result = result.map((a, ix) =>
      ix === 1
        ? {
          ...a,
          message: null
        }
        : a
    );
  }

  res.status(200).json(result);
});


const getCardById = (cardId) => cards.find(c => c.id === cardId);

// Return card with specified id (or 404)
app.get("/cards/:id", (req, res) => {
  const card = getCardById(req.params.id);

  if (!card) {
    return res.status(404).json({ error: `Card '${req.params.id}' not found` });
  }

  return res.status(200).json(card);
});

app.post("/cards", (req, res) => {
  const card = req.body;
  if (!card) {
    return res.status(400).json({ error: "Card must be defined" });
  }

  if (!card.message) {
    return res.status(400).json({ error: "card.message must be defined and not empty" });
  }

  if (card.message.startsWith("fail")) {
    return res.status(400).json({ error: "card.message should not start with 'fail'" });
  }

  if (card.message.length < 5) {
    return res.status(400).json({ error: "card.message must have at least five chars" });
  }

  if (!card.imageName) {
    return res.status(400).json({ error: "card.imageName must be defined and not empty" });
  }

  if (typeof card.imageDecoration !== "boolean") {
    return res.status(400).json({ error: "card.imageDecoration must be a boolean" });
  }

  const newCard = {
    id: `C${cards.length + 1}`,
    message: card.message,
    image: {
      name: card.imageName,
      caption: card.imageCaption,
      decoration: card.imageDecoration
    },
    likes: 0
  }

  cards = [...cards, newCard];

  res.status(201).json(newCard);
});

app.post("/cards/:id/likes", (req, res) => {
  const card = getCardById(req.params.id);

  if (!card) {
    return res.status(404).json({ error: `Card '${req.params.id}' not found` });
  }

  if (card.id === "C5") {
    // simluation: error in processing
    return res.status(400).json({ error: "Could not handle request"});
  }

  const likedCard = {...card, likes: card.likes + 1};

  cards = cards.map(c => c.id === card.id ? likedCard : c);

  res.status(200).json(likedCard);
});

const port = process.env.SERVER_PORT || 7100;

app.listen(port, () => {

  console.log(`
    📞    Card API Server listening on port ${port}
    👉    Try http://localhost:${port}/cards
`);
});
