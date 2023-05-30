const express = require("express");
const session = require("express-session");

const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const router = express.Router();

router.use((req, res, next) => {
  console.log("Request Type:", req.method, req.url);
  console.log("Time:", Date.now());
  next();
});

router.use(
  session({ secret: "cats", resave: false, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  console.log("serializeUser", user);
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (obj, done) {
  console.log("deserializeUser", obj);
  done(null, obj);
});

function authenticateServer(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET) {
  // Configure GitHub strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "/api/auth/github/callback", // Define your callback URL
        scope: "user:email",
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log("FOOOO", accessToken, refreshToken, profile);

        const { id, nodeId, displayName, username, profileUrl, emails } =
          profile;
        const user = {
          id,
          nodeId,
          displayName,
          username,
          profileUrl,
          email: emails[0].value,
        };
        done(null, user);
        // Handle the authentication callback
        // Retrieve user information from the profile object
        // Perform necessary actions and call `done()` to finish authentication
      }
    )
  );
}

// Define the route for initiating the GitHub authentication
router.get("/", passport.authenticate("github"));

// Define the route for the GitHub authentication callback
router.get(
  "/callback",
  passport.authenticate("github", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

/**
 * FIXME this will currently only deserialize the user for the github route
 *
 * we will have to move serializeUser and deserializeUser to the server.js
 *
 * fetch("http://localhost:8080/api/auth/github/me").then(r=>r.json()).then(console.log)
 */
router.get("/me", (req, res) => {
  if (req.user) res.send(req.user);
  else res.status(401).send();
});

module.exports = { router, authenticateServer };
