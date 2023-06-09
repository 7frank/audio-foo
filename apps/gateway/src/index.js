const redbird = require("redbird");

const proxy = redbird({
  port: 8080,
  // letsencrypt: {
  //   production: false,
  //   path: __dirname + "/certs",
  //   port: 9999, // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
  // },
  // ssl: {
  //   http2: true,
  //   port: 443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
  // },
  xfwd: true,
});
proxy.register("localhost/socket.io", "http://localhost:8000/socket.io");
proxy.register("localhost/api", "http://localhost:8000/");

proxy.register("localhost", "http://localhost:5100");
proxy.register(
  "localhost/payment-module",
  "http://localhost:5200/payment-module"
);

console.log("local-application-gateway running as port: ", proxy.opts.port);
