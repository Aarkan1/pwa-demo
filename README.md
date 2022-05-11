# Progressive Web Apps Demo

A project to demonstrate PWA capabilities.

Try the live demo here: https://pwa-demo.wiren.app/

## Installation

You'll need to have [Node.js](https://nodejs.org/en/) installed to use this project.

-   `git clone https://github.com/Aarkan1/pwa-demo.git`
-   or [download as zip](https://github.com/Aarkan1/pwa-demo/archive/refs/heads/master.zip)
-   open the pwa-demo folder
-   cd backend
-   npm install
-   npm start
-   open http://localhost:7000

## Demo

This is just a webapp, and we'll have to add a Service Worker to handle offline caching.

-   Create a script called `serviceWorker.js` in the root of the frontend folder
-   Register the Service Worker in `main.js`
-   Add a fetch handler to the Service Worker

## Solution

You can find the finished solution in the solution branch:

https://github.com/Aarkan1/pwa-demo/tree/solution
