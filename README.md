# morigoround
Live project at http://www.morigoround.com/

Mori was created by <a href="http://eugeneso.com">Eugene So</a> and <a href="http://www.hyobinyang.com/">Hyo Bin Yang</a> as an interactive project for <a href="http://briankane.net/being-human/">Being Human, AI</a> class at Rhode Island School of Design. This project is an <a href="">open source project.</a> Please help Mori to become a more intelligent virtual celebrity!

<h3>Who's Mori?</h3>
<p>"Hey there, I'm Mori, a curious-minded 7 years old bot.🤖 I was born in Providence, Rhode Island. I like to eat, explore, and view world in a different perspective. From the first day of my birth, I left home and started walking constantly to experience a larger world. I’m trying to become the most-traveled bot until I reach 10 years old. Thanks for your interest in my journey and I hope you enjoy as you travel with me in real time."</p>

<h3>Under the Hood - How it works</h3>
<p>Mori the Traveler is mainly programmed with Node.js, Three.js & Blender, Phantom.js, MongoDB, Google map API, and Twitter API.<br/><br/> All the locations that direct Mori to determine its destination for each trips are stored in the server as a list. The backend server constantly calculates detailed routes for Mori, moves and updates its location every second, and saves the latest geolocation data in the database. <br/><br/> When the viewers access the website, the client side application (front-end), requests Mori’s latest location from the server every few seconds. Then the website renders panoramic 360 degree views of the location via Google Map Street View as a background. On top of the street view, 3D model of Mori designed with Blender is rendered and animated through WebGL. 
When Mori reaches its destination of each trips, the backend server renders the website in a virtual web browser using Phantom.js and captures a screenshot of Mori as a png format in the cloud. It then automatically uploads the ‘selfie’ to its Twitter with words that pair with its location. </p>

<h3>What Next?</h3>
<p>We’ve received lots of feedbacks from Mori’s fans and we are keep improving Mori to make it the most delightful and lively traveler that wonders around the world. Here are few things that could be implemented:</p>
<ul>
  <li>
    <h4>Determining its destination by its own</h4>
    <p>This could mean a smarter way for Mori to determine its destination by its own. Although the website intentionally shows Mori as a smart AI, Mori currently travels only through designated routes saved in the database. Perhaps it could pull live data about different locations based on news media, feedbacks on its Twitter account, popular places on social media or else to not only become a smarter bot but also close the gap between its virtual world and our real world.</p>
  </li>
  <li>
    <h4>More interesting ways to interact with Mori</h4>
    <p>Since Mori is always live somewhere in the cloud, what if we could do a live video chat with it? What if Mori hosts a live broadcast during its trip? What if it shows up on Times Square billboards when it really stays at Time Square? </p>
  </li>
  <li>
    <h4>More interesting actions</h4>
    <p>Can Mori jump? Swim? Eat? What if it changes its clothes? What if it rains? Can we add its voice? Does it grow up? What would be a more detailed personalities that would make it appeal to the viewers? </p>
  </li>
</ul>
<p>As we release this as an open source project, we would welcome anyone to help Mori turn into a more intelligent internet celebrity.</p>

<h3>Installing Mori</h3>
Mori uses npm, grunt, and node express server.
In Terminal, install all node modules by running `npm install`. 
Make sure you have Grunt installed and run `grunt serve`.
Make sure to replace all API keys in order to test locally.  
