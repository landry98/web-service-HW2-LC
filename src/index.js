/*
This web service determines the 
distance between two points on Earth. 
The input are 2 sets of coordinates 
and the output is the distance between those points in kilometers.

Input URL:
https://5f99o.sse.codesandbox.io/ ?latA=31.35540208121741&lonA= -89.43649211428662&latB=28.339503497826755&lonB=-80.61672316571183
Location names: Hattiesburg, MS and Cocoa Beach, FL
Output distance: 913.97 km
*/

var http = require("http");
http
  .createServer(function (request, response) {
    // Read the URL used to contact the web service and extract the latitude and longitude values, saving them each to a variable
    var requestUrl = new URL("http://" + request.headers.host + request.url);
    var latA = requestUrl.searchParams.get("latA");
    var lonA = requestUrl.searchParams.get("lonA");
    var latB = requestUrl.searchParams.get("latB");
    var lonB = requestUrl.searchParams.get("lonB");

    // Use the spherical law of cosines formula to calculate distance along the surface of a sphere. It is not the most accurate method for Earth, but it is good enough. Source: https://www.movable-type.co.uk/scripts/latlong.html
    const φ1 = (latA * Math.PI) / 180;
    const φ2 = (latB * Math.PI) / 180;
    const Δλ = ((lonB - lonA) * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const d =
      Math.acos(
        Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
      ) * R;

    // Output the calculated distance value to the client and complete the execution of the program.
    response.write("{distance: " + d + "}");
    response.end();
  })
  .listen(8080);
