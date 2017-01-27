
    // loader.load( "src/model/mori.json", function(geometry){
    //     console.log('** Loading ThreeJS SkinnedMesh...');


    //     mesh = new THREE.SkinnedMesh(geometry, material);
    //     // mesh.material.map = myTexture;
    //     // mesh.material.needsUpdate = true;
        
    //     mesh.name = "Mori Mesh";
    //     mesh.position.set(0,-0.5,0);
    //     mesh.scale.set(.7,.7,.7);
    //     mesh.rotation.set(0,-1.5,0);
    //     scene.add( mesh );

    //     moriLoaded();
    // });


// TODO
// Create a texture from sv image
// var myTexture;
// var textureLoader;
// textureLoader = new THREE.TextureLoader();
// function UpdateTexture(lat, lng){
//     var svUrl = "https://maps.googleapis.com/maps/api/streetview?size=1000x800&location=" + lat + "," + lng + "&fov=90&heading=" + 270 + "&pitch=" + 0 + "&key=" + "AIzaSyCOcKaGI5XfYwkoynVbLVLHBv4cp-gQ5i0";
    
//     convertFunction(svUrl, function(base64Img){
//         textureLoader.load(base64Img, function(texture){
//             console.log('texture loaded');
//             myTexture = texture;
//             if(!moriReady){
//                 initThree();
//                 animate();
//             }
//         });
//     });
// }

// function convertFunction (url, callback){
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = function() {
//         var reader  = new FileReader();
//         reader.onloadend = function () {
//             callback(reader.result);
//         }
//         reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.send();
// }
