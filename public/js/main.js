// Fake Loader
var moriReady = false;
var moriLoading = 0;
var $mL = $('#loader-progress');

function moriLoad(){
    if(moriLoading < 100){
        moriLoading ++;
    }

    $mL.html(moriLoading);

    if(!moriReady){
        setInterval(function(){moriLoad();}, 20);
    }
}

function moriLoaded(){
    console.log('== connected to Mori ==')
    moriReady = true;

    setTimeout(function(){
        $("#loader").fadeOut('slow');
    }, 1000);
}


// OPTIONS
var REQCOUNT = 1;
var INTERVAL = 5000;

// MAP
var svService;
var panorama;

function initMap(){
    sv = new google.maps.StreetViewService();
    panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
    console.log('** Loading Street View...');

    getLocation();
}


var addressText = document.getElementById('info-address');

function getLocation(){
  $.get('/getLocation', {}, function(res, resp){
    // Init Panorama
    if(!moriReady){
        sv.getPanorama({location: {lat: res.lat, lng: res.lng}, radius: 50}, processSVData);
    }else{
        panorama.setPosition({lat: res.lat, lng: res.lng});
    }

    if(res.tripDestName != null) {
        addressText.innerHTML = res.tripDestName;
    }
    else{
        addressText.innerHTML = "Mori is lost somewhere in the dark universe...";
        console.log('Mori is lost');
    }

    if(!moriReady){
        $("#loader-location").html(res.Address);
    }
    // RECURSIVE
    window.setTimeout(getLocation, INTERVAL);
  });
}


function processSVData(data, status) {
    console.log(data);
  if (status === 'OK') {

    panorama.setPano(data.location.pano);
    panorama.setPov({
      heading: 100,
      pitch: 0
    });

    panorama.setOptions({
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        motionTrackingControl: false,
        fullscreenControl: false,
        addressControl: false,
        disableDefaultUI: true
    }); 

  } else {
    addressText.innerHTML = "Mori is lost somewhere in the dark universe...";
    console.error('Street View data not found for this location.');
  }
}



/*
=============
Disable WEBGL for selfies
=============
*/
function webglAvailable() {
    try {
        var canvas = document.createElement( 'canvas' );
        return !!( window.WebGLRenderingContext && (
            canvas.getContext( 'webgl' ) ||
            canvas.getContext( 'experimental-webgl' ) )
        );
    } catch ( e ) {
        return false;
    }
}

/*
=============
THREE.JS
=============
*/
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0;
var mouseY = 0;

var controls;
var camera, scene, renderer;
var mesh;
var eyeMesh, eyeMesh2;
var glasses;
var objGroup;
var mixer, clip, animation;

var prevCamX, prevCamY;

var clock = new THREE.Clock();

function initThree(){
    console.log('** Loading ThreeJS...');

    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.z = 4;
    camera.position.y = 1;
    prevCamX = camera.rotation.x;
    prevCamY = camera.rotation.y;

    // Light
    scene.add( new THREE.HemisphereLight( 0x111111, 0x444444 ) );

    var light = new THREE.DirectionalLight( 0xf0f0f0, 1.5 );
    light.position.set( 0, 350, -400 ).multiplyScalar( 1.1 );
    scene.add( light );

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    var d = 100;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d * 2;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 4000;


    // RENDERER
    if ( webglAvailable() ) {
        renderer = new THREE.WebGLRenderer({alpha:true, antialias:true });
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    document.body.appendChild(renderer.domElement);


    // Glasses and Eyes
    objGroup = new THREE.Object3D();

    var objLoader = new THREE.OBJLoader();
    objLoader.load('src/model/glasses.obj', function(obj){
        obj.traverse(function(child){
            // child.material = new THREE.MeshNormalMaterial({shading: THREE.SmoothShading});
            child.material = new THREE.MeshPhongMaterial( {
                color: 0x937153,
                emissive: 0xff3030,
                specular: 0x0f0f0f,
                shininess: 100
            });
        });

        glasses = obj;
        glasses.scale.set(.18,.18,.18);
        glasses.position.set(0.3,0.26,-.8);
        glasses.rotation.set(1.6,3.15,0.1);
        glasses.castShadow = true;

        objGroup.add(glasses);
    })

    var eyeG = new THREE.SphereGeometry( .1, 32, 32 );
    var eyeM = new THREE.MeshPhongMaterial( {
        color: 0x010101,
        specular: 0x0f0f0f,
        shininess: 100
    });
    eyeMesh = new THREE.Mesh( eyeG, eyeM );
    eyeMesh.position.set(.32,.26,-.7);
    eyeMesh2 = new THREE.Mesh( eyeG, eyeM );
    eyeMesh2.position.set(-.42,.26,-.66);

    objGroup.add( eyeMesh );
    objGroup.add( eyeMesh2 );

    scene.add(objGroup);

    // Mori
    var loader = new THREE.JSONLoader();
    loader.load( "src/model/mori.json", function(geometry, materials){

        geometry.computeBoundingBox();

        // Materials (Override)
        materials[0] = new THREE.MeshPhongMaterial({
            color: 0x009ae8,
            emissive: 0x5074a7,
            specular: 0xd200ff,
            shininess: 5,
            shading: THREE.SmoothShading,
            morphTargets: true,
            visible: true,
            needsUpdate: true,
            skinning: true,
            wireframe:false
        });
        
        // Mesh
        mesh = new THREE.SkinnedMesh( geometry, materials[0] , true);
        mesh.name = "Mori Mesh";
        mesh.position.set(0,-0.5,0);
        mesh.scale.set(.7,.7,.7);
        mesh.rotation.set(0,-1.5,0);
        scene.add( mesh );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Skin Morph Animation
        mixer = new THREE.AnimationMixer( mesh );
        clip = geometry.animations[0];
        action = mixer.clipAction(clip, mesh);
        action.setEffectiveWeight(1);
        action.setEffectiveTimeScale( 2 );
        action.zeroSlopeAtStart = false;
        action.zeroSlopeAtEnd = false;
        action.play();


        // CONTROLS
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        window.addEventListener( 'resize', onWindowResize, false );

        // Load Complete
        moriLoaded();
        animate();
    });
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate(){
    requestAnimationFrame( animate );

    controls.update();
    render();
}

function render() {
    camera.lookAt(scene.position);

    // Sync SV Camera rotation with threejs controls
    if(prevCamX != camera.rotation.x){
      var newPitch = panorama.pov.pitch + (camera.rotation.x - prevCamX) * -100;
      var newHeading = panorama.pov.heading + (camera.rotation.y - prevCamY) * 200;
      prevCamX = camera.rotation.x;
      prevCamY = camera.rotation.y;

      panorama.setPov({heading: newHeading, zoom: 1, pitch:newPitch});
    }

    // Animation update
    if(mixer){
        mixer.update(0.75 * clock.getDelta());
    }

    // Render
    renderer.render( scene, camera );
}

// Init
moriLoad();
initMap();
initThree();