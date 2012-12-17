# Web Worker Demo

Simple demo of HTML5 Web Workers. A worker is used to compute primes from 2 to 10 million, reporting its status every 1 million checked numbers. While this computation is happening, the Web page remains interactive. The user can press arrow keys which cause the blue square to animate using ```requestAnimationFrame```.

This demonstrates:

* How to start up a worker, and send messages between the worker and the main JavaScript
* How to break computation into blocks so that the worker has a chance to respond to messages on its message queue.

## To try it out:

1. Install [node](http://nodejs.org/)
2. Clone the repo
3. Run ```npm install``` in the root directory of your clone
4. Run ```node server``` in the root directory of your clone
5. Go to http://localhost:3000/worker.html
