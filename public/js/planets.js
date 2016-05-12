
var world = (function() {
  var engine, canvas, scene, skybox, galacticlight;
  var system = {
    sun: {
      mesh: null, name: 'sun', emissive: true,  
      map: 'sun.jpg', diameter: 4, xpos: 0, 
      rotation: {
        speed: 0,
        angle: 0
      },
      orbit: {
        radius: 0,
        speed: 0,
        angle: 0
      }
    },
    mercury: {
      mesh: null, name: 'mercury', emissive: false, 
      map: 'mercury.jpg', diameter: 1, xpos: 4, 
      rotation: {
        speed: 0.4,
        angle: 1
      },
      orbit: {
        radius: 4,
        speed: 0.01,
        angle: 0.1
      }
    },
    venus: {
      mesh:null, name: 'venus', emmissive: false,
      map: 'venus.jpg', 'diameter': 1.5, xpos: 7,
      rotation: {
        speed: 0.0001,
        angle: 0.1
      },
      orbit: {
        radius: 7,
        speed: 0.005,
        angle: 0.1
      }
    },
    earth: {
      mesh: null, name: 'earth', emissive: false,
      map: 'earth.jpg', 'diameter': 1.55, xpos: 10,
      rotation: {
        speed: 0.1,
        angle: 0.1
      },
      orbit: {
        radius: 14,
        speed: 0.002,
        angle: 0.1
      }
    }
  };

  //var sun;
  var cameraType = {
    STANDARD: 'standard',
    ARCROTATE: 'arcrotate',
    VR: 'vr'
  };

  /** 
   * show errors in web console
   */
  var showError = function (errorMessage) {
    console.error(errorMessage);
  };

  /** 
   * Getter for BABYLON engine (used for resizing)
   */
  var getEngine = function () {
    return engine;
  };

  /**
   * create a planet from data
   */
   var createPlanet = function (planetData) {

      planetData.mesh = BABYLON.Mesh.CreateSphere(planetData.name, 16, planetData.diameter, scene);
      planetData.mesh.position.x = planetData.xpos;

      // Wrap planetary map texture
      var planetMaterial = new BABYLON.StandardMaterial(planetData.name, scene);
      var materialPath = 'img/textures/' + planetData.map;
      //var materialPath = 'img/textures/' + 'sand.jpg';

      console.log('materialPath:' + materialPath);
      if(planetData.emissive) {
        planetMaterial.emissiveTexture = new BABYLON.Texture(materialPath, scene);
        planetMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      } else {
        planetMaterial.diffuseTexture = new BABYLON.Texture(materialPath, scene);
      }
      // Remove specular highlight
      planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0); //gets rid of highlight
      planetData.mesh.material = planetMaterial;
  };

  /**
   * create scene, camera, lighting, objects
   */
   var createScene = function (cameraType) {

    // Create the scene
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Have the Camera orbit the sun (third value moves camera away from center)
    camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 25, BABYLON.Vector3.Zero(), scene);
    camera.upperRadiusLimit = 100;
    camera.attachControl(canvas);

    // Add a backlight for Planet 'dark sides'
    galacticlight = new BABYLON.HemisphericLight('galacticlight', new BABYLON.Vector3(0, 1, 0), scene);
    galacticlight.intensity = 0.5;
    galacticlight.groundColor = new BABYLON.Color3(0.5, 0.5, 1.0);

    // skybox
    skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
    skybox.infiniteDistance = true;

    // skybox material
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('img/textures/skybox/skybox', scene, ['_px.png', '_py.png', '_pz.png', '_nx.png', '_ny.png', '_nz.png']);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.material = skyboxMaterial;

    // Create the sun
    createPlanet(system.sun);
    var sunLight = new BABYLON.PointLight('sunlight', BABYLON.Vector3.Zero(), scene);
    sunLight.intensity = 1.7;

    // First Planet
    createPlanet(system.mercury);

    // Second Planet
    createPlanet(system.venus);

    createPlanet(system.earth);

    return scene;
  };

  /**
   * initialize webgl canvas, engine, scene + camera, renderLoop
   */
  var init = function () {
    try {

      //fire these immediately
      if (!BABYLON.Engine.isSupported()) {
  			showError("Your browser does not support WebGL");
  			return;
  		}

      //webgl canvas
      canvas = document.getElementById("renderCanvas");
      if(!canvas) {
        showError("could not find HTML5 canvas in document, exiting");
        return;
      }

      //create engine
      if(engine) {
        engine.dispose();
        engine = null;
      }
      engine = new BABYLON.Engine(canvas, true);
      if(!engine) {
        showError("Could not create Babylon engine");
        return;
      }

      // create a scene.
      scene = createScene(cameraType.ARCROTATE);
      if (!scene) {
        showError("createScene function must return a scene.");
        return;
      }
      
      // define the object update function, before the scene renders
      engine.scenes[0].beforeRender = function () {
        for (var i in system) {
          var planet = system[i];
          if (planet.orbit.angle != 0) {
            planet.mesh.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.mesh.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
            planet.orbit.angle += planet.orbit.speed;
          }
        }
      };

      // Confirm scene was added to engine
      if (engine.scenes.length === 0) {
        showError("You must at least create a scene.");
        return;
      }

      //confirm the scene has at least one camera
      if (engine.scenes[0].activeCamera === null) {
        showError("You must at least create a camera.");
        return;
      }

      // start the gameloop.
      engine.runRenderLoop(function () {
  			if (engine.scenes.length === 0) {
  				return;
  			}

        // detect window resize event.  
  			//if (canvas.width !== canvas.clientWidth) {
  			//	engine.resize();
  			//}
        
  			var scene = engine.scenes[0];

  			if (scene.activeCamera || scene.activeCameras.length > 0) {
          //console.log('rendering...')
  				scene.render();
  			}

  		});

    } catch (e) {
      showError(e);
      return false;
    }
    return true;
  };

  // Run the game engine.
  var run = function () {
    if (init()) {
      console.log('BabylonJS running');
    }
  };

  return {
    showError: showError,
    getEngine: getEngine,
    createScene: createScene,
    run: run
  }

})();
