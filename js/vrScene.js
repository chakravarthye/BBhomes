(function () {
  window.game = window.game || {};

  var vrScene = function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 1130/1130, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(1130, 826);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "vrCanvas";

    //create geometry
    var geometry = new THREE.SphereGeometry(10,50,50);

    //create material and create sphere
    var material = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("assets/pano_01.jpg",THREE.UVMapping), side: THREE.DoubleSide, wireframe:false});
    var sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);

    //controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);

    //create sprite
    var spriteMap = new THREE.TextureLoader().load("assets/cam_icon.png");
    var spriteMaterial = new THREE.SpriteMaterial({map:spriteMap, color:0xFFFFFF});
    var camSprite = new THREE.Sprite(spriteMaterial);
    camSprite.name = "sprite1";
    scene.add(camSprite);
    camSprite.scale.x = 0.5; camSprite.scale.y = 0.5; camSprite.scale.z = 0.5;
    camSprite.position.x = -8;
    camSprite.position.z = -3;
    camSprite.position.y = -3;

    camera.position.z = 1;

    //click event handling
    var isMouseDown = false;

    var mouse = new THREE.Vector2();
    var onMouseDownPosition = new THREE.Vector2();

    var raycaster = new THREE.Raycaster();
    document.addEventListener('mousedown', onDocumentMouseDown, false);


    function onDocumentMouseDown(event) {
      isMouseDown = true;
      onMouseDownPosition.x = event.clientX;
      onMouseDownPosition.y = event.clientY;
      mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children, 1); //if mouse intersects a cube
      if (intersects.length > 0) {
        if(intersects[0].object.name == "sprite1"){
          material.map = new THREE.TextureLoader().load("assets/pano_02.jpg",THREE.UVMapping);
          scene.remove(camSprite);
        }
      }
    }

    function closeVR(){
      var customEvent1 = new Event('endPano');
      document.getElementById("controlDiv").dispatchEvent(customEvent1);
    }


    //updat function
    var update = function(){
      //sphere.rotation.y += 0.001;
    };

    //render function
    var render = function(){
      renderer.render(scene, camera);
    };

    //gameloop function
    var GameLoop = function(){
      requestAnimationFrame(GameLoop);
      update();
      render();
    };

    GameLoop();
  }
  window.game.vrScene = vrScene;
})();
