const mongoose = require ("mongoose");
const express = require ("express");
const path = require ("path");

const mainRoute = require ("./routes/main.route.js");

const LISTEN_PORT = 8080;
const LISTEN_ADDR = "0.0.0.0";
const MONGODB_URI = "mongodb://localhost:27017/camping_maaszooi";

class Main {
	/*********************************************************
	 * Classy Stuff
	 *********************************************************/

	constructor (port, addr) {
		this._port = port;
		this._addr = addr;

		this._app = express ();

		this._app_configure ();
		this._app_register_routes ();
		this._app_listen ();
	}

	/*********************************************************
	 * Instance Methods
	 *********************************************************/

	_app_configure = () => {
		this._app.set ("view engine", "ejs");
		this._app.set ("views", path.join (__dirname, "views"));
	};

	_app_register_routes = () => {
		this._app.use (express.static (path.join (__dirname, "public")));

		this._app.use ("/", mainRoute);
	};

	_app_listen = () => {
		this._app.listen (this._port, this._addr, () => {
			console.info(`Main listening on ${this._addr}:${this._port}`);
		});
	};
}

(async () => {
	mongoose.connect (LISTEN_ADDR, { useNewUrlParser: true });

	const main = new Main (LISTEN_PORT, LISTEN_ADDR);
})();
