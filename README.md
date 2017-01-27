# Mori Go Round

Live project at http://www.morigoround.com/

Twitter account https://twitter.com/morithetraveler

Mori was created by two artists, <a href="http://eugeneso.com">Eugene So</a> and <a href="http://www.hyobinyang.com/">Hyo Bin Yang</a> as an interactive project for <a href="http://briankane.net/being-human/">Being Human, AI</a> class at Rhode Island School of Design. This project is an <a href="">open source project.</a> Please help Mori to become a more intelligent virtual celebrity!

## Who's Mori? ##

<img src="https://github.com/sojoonsup/morigoround/blob/master/selfie.png?raw=true"/>

"Hey there, I'm Mori, a curious-minded 7 years old bot.🤖 I was born in Providence, Rhode Island. I like to eat, explore, and view world in a different perspective. From the first day of my birth, I left home and started walking constantly to experience a larger world. I’m trying to become the most-traveled bot until I reach 10 years old. Thanks for your interest in my journey and I hope you enjoy as you travel with me in real time."

## Under the Hood - How it works ##

Mori the Traveler is mainly programmed with <a href="https://nodejs.org">Node.js</a>, <a href="https://threejs.org/">Three.js</a> &amp; <a href="https://www.blender.org/">Blender</a>, <a href="http://phantomjs.org/">Phantom.js</a> &amp; <a href="https://github.com/brenden/node-webshot">Node Webshot</a>, <a href="https://www.mongodb.com/">MongoDB</a>, Google map API, and Twitter API.
All the locations that direct Mori to determine its destination for each trips are stored in the server as a list. The backend server constantly calculates detailed routes for Mori, moves and updates its location every second, and saves the latest geolocation data in the database.
When the viewers access the website, the client side application (front-end), requests Mori’s latest location from the server every few seconds. Then the website renders panoramic 360 degree views of the location via Google Map Street View as a background. On top of the street view, 3D model of Mori designed with Blender is rendered and animated through WebGL <a href="https://github.com/mrdoob/three.js/blob/dev/examples/webgl_animation_skinning_morph.html">(example)</a>. 
When Mori reaches its destination of each trips, the backend server renders the website in a virtual web browser with Phantom.js and captures a screenshot of Mori as a png format in the cloud. It then automatically uploads the ‘selfie’ to its Twitter with words that pair with its location.

## What Next? ##

We’ve received lots of feedbacks from Mori’s fans and we are keep improving Mori to make it the most delightful and lively traveler that wonders around the world. Here are few things that could be implemented:</p>

  * __Determining its destination by its own__
  
    This could mean a smarter way for Mori to determine its destination by its own. Although the website intentionally shows Mori as a smart AI, Mori currently travels only through designated routes saved in the database. Perhaps it could pull live data about different locations based on news media, feedbacks on its Twitter account, popular places on social media or else to not only become a smarter bot but also close the gap between its virtual world and our real world.

  * __More interesting ways to interact with Mori__
  
    Since Mori is always live somewhere in the cloud, what if we could do a live video chat with it? What if Mori hosts a live broadcast during its trip? What if it shows up on Times Square billboards when it really stays at Time Square? </p>

  * __More interesting actions__
  
    Can Mori jump? Swim? Eat? What if it changes its clothes? What if it rains? Can we add its voice? Does it grow up? What would be a more detailed personalities that would make it appeal to the viewers?

As we release this as an open source project, we would welcome anyone to help Mori turn into a more intelligent internet celebrity. Please feel free to jump in if you have any ideas or codes!

## Installing Mori ##

Mori uses <a href="https://www.npmjs.com/">npm</a>, <a href="http://gruntjs.com/">grunt</a>, and <a href="http://expressjs.com/">node express server</a>.
In Terminal, install all node modules by running `npm install`. 
Replace all API keys in both backend and frontend codes to test locally.
Make sure you have Grunt installed, run `grunt serve`.
