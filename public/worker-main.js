/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global Worker */

(function () {
    "use strict";

    var SQUARE_SIZE = 75;
    var MOVEMENT_STEP = 3;

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    
    // Set up the worker
    var running = false;
    var statusDiv = document.getElementById('status');
    var button = document.getElementById('toggleWorker');
    var worker = new Worker('worker-cruncher.js');  // path is relative to HTML document
    worker.addEventListener('message', function (event) {
        var currentStatus = statusDiv.innerHTML;
        statusDiv.innerHTML = "<p>" + event.data + "</p>" + currentStatus;
        if (event.data === "Done!") {
            running = false;
            button.value = "start worker";
        }
    });

    button.onclick = function () {
        running = !running;
        if (running) {
            statusDiv.innerHTML = "";
            button.value = "stop worker";
        } else {
            button.value = "start worker";
        }
        worker.postMessage('');

    };

    
    // Set up the animated square
    var square = document.getElementById('square');
    var direction = 39; // right
    
    square.style.top = 0;
    square.style.left = 20;
    square.style.height = SQUARE_SIZE;
    square.style.width = SQUARE_SIZE;
    
    function moveSquare() {
        var left = parseInt(square.style.left, 10);
        var top = parseInt(square.style.top, 10);
        var right = left + SQUARE_SIZE;
        var bottom = top + SQUARE_SIZE;
        
        switch (direction) {
        case 37: // left
            if (left > 0) {
                square.style.left = left - MOVEMENT_STEP;
            }
            break;
        case 38: // up
            if (top > 0) {
                square.style.top = top - MOVEMENT_STEP;
            }
            break;
        case 39: //right
            if (right < document.documentElement.clientWidth) {
                square.style.left = left + MOVEMENT_STEP;
            }
            break;
        case 40: // down
            if (bottom < document.documentElement.clientHeight) {
                square.style.top = top + MOVEMENT_STEP;
            }
            break;
        default:
            break;
        }
        requestAnimationFrame(moveSquare);
    }
    
    window.onkeydown = function (event) {
        if (event.keyCode >= 37 && event.keyCode <= 40) { // is an arrow key
            direction = event.keyCode;
        }
    };

    // start the square animating
    requestAnimationFrame(moveSquare);
    
}());