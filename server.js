/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, node: true */
/*global */

(function () {
    "use strict";
    
    var connect = require("connect"),
        http = require("http");

    var app = connect()
        .use(connect.favicon())
        .use(connect.logger("dev"))
        .use(connect["static"]("public"))
        .use(connect.directory("public"));
    
    http.createServer(app).listen(3000);
    console.log("Server listening on http://localhost:3000/");
    
}());