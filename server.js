//Install express server
const express = require("express");
const path = require("path");

const app = express();

// port sur lequel le serveur va tourner
let port = process.env.PORT || 8081;

// Serve only the static files form the dist directory
// __dirname est le répertoire courant
app.use(express.static(__dirname + "/dist/assignment-app/browser"));

app.get("/*", function (req, res) {
 res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});
// Start the app by listening on the default Heroku port
app.listen(port);

console.log('Serveur démarré sur le port : ' + port);
