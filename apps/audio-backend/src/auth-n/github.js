const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  console.log("Request Type:", req.method, req.url);
  console.log("Time:", Date.now());
  next();
});

/**
 * FIXME this will currently only deserialize the user for the github route
 *
 * we will have to move serializeUser and deserializeUser to the server.js
 *
 * fetch("http://localhost:8080/api/auth/github/me").then(r=>r.json()).then(console.log)
 */
router.get("/me", (req, res) => {
  if (req.user) res.send(req.user);
  else if (req.headers["x-forwarded-user"])
    res.send({ email: req.headers["x-forwarded-user"] });
  else res.status(401).send();
});

module.exports = { router };
