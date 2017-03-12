
var world = ( function() {

    var engine, canvas, scene, camera, skybox, galacticlight;

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

    var cameraType = {

        STANDARD: 'standard',

        ARCROTATE: 'arcrotate',

        WEBVR: 'vr',

        WEBVR_DISTORTION: 'webvrdistort',

        NO_WEBVR: 'nowebvr'

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
     * @param {Object} planetData custom data object holding relevant information to create a planet 
     * and its orbit.
     */
    var createPlanet = function ( planetData ) {

        planetData.mesh = BABYLON.Mesh.CreateSphere( planetData.name, 16, planetData.diameter, scene );

        planetData.mesh.position.x = planetData.xpos;

        // Wrap planetary map texture.

        var planetMaterial = new BABYLON.StandardMaterial( planetData.name, scene );

        var materialPath = 'img/textures/' + planetData.map;

        //console.log('materialPath:' + materialPath);

        if ( planetData.emissive ) {

            planetMaterial.emissiveTexture = new BABYLON.Texture( materialPath, scene );

            planetMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

            planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

        } else {

            planetMaterial.diffuseTexture = new BABYLON.Texture( materialPath, scene );

        }

      // Remove specular highlight.

      planetMaterial.specularColor = new BABYLON.Color3( 0, 0, 0 ); //gets rid of highlight

      planetData.mesh.material = planetMaterial;

    };

    /** 
     * Set scaling low res vs. high-res
     */
    var setRatio = function ( factor ) {

        engine._hardwareScalingLevel *= factor;

        engine._hardwareScalingLevel = Math.max( engine._hardwareScalingLevel, 1 / window.devicePixelRatio );

        engine.resize();

    };


    /** 
     * switch the camera type.
     * @param {cameraType} type the type of BabylonJS camera to switch to.
     */
    var switchCamera = function ( type ) {

        scene.activeCamera && scene.activeCamera.detachControl( canvas );

        switch ( type ) {

            case cameraType.ARCROTATE:

                    camera = new BABYLON.ArcRotateCamera( 'camera', 0, 0, 25, BABYLON.Vector3.Zero(), scene );

                    break;

            case cameraType.WEBVR_DISTORTION:

                    // Barrel distortion turned on

                    camera = new BABYLON.WebVRFreeCamera( "VR-With-Dist", new BABYLON.Vector3( 0, 0, -10 ), scene, true );

                    break;

            case cameraType.WEBVR:

                    // Barrel distortion turned off

                    camera = new BABYLON.WebVRFreeCamera( "VR-No-Dist", new BABYLON.Vector3( 0, 0, -10 ), scene, false);

            case cameraType.NO_WEBVR:

                    // For smartphones without WebVR (native or polyfill)

                    camera = new BABYLON.VRDeviceOrientationFreeCamera( "VR-Dev-Orientation", new BABYLON.Vector3( 0, 0, -10), scene );

            default:

                break;

        }

        camera.upperRadiusLimit = 100;

        camera.attachControl( canvas );

    };

    /**
     * create scene, camera, lighting, objects
     * @param {cameraType} cameraType the type of camera to switch to.
     */
    var createScene = function ( type ) {

        // Create the scene.

        scene = new BABYLON.Scene( engine );

        scene.clearColor = new BABYLON.Color3( 0, 0, 0 );

        // Have the Camera orbit the sun (third value moves camera away from center).

        switchCamera( type );

        // Add a backlight for Planet 'dark sides'.

        galacticlight = new BABYLON.HemisphericLight( 'galacticlight', new BABYLON.Vector3( 0, 1, 0 ), scene);

        galacticlight.intensity = 0.5;

        galacticlight.groundColor = new BABYLON.Color3( 0.5, 0.5, 1.0 );

        // skybox.

        skybox = BABYLON.Mesh.CreateBox( 'skybox', 1000, scene );

        skybox.infiniteDistance = true;

        // skybox material.

        var skyboxMaterial = new BABYLON.StandardMaterial( "skyBox", scene );

        skyboxMaterial.backFaceCulling = false;

        skyboxMaterial.diffuseColor = new BABYLON.Color3( 0, 0, 0 );

        skyboxMaterial.specularColor = new BABYLON.Color3( 0, 0, 0 );

        // Cubemap.

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture( 'img/textures/skybox/skybox', 
            scene, ['_px.png', '_py.png', '_pz.png', '_nx.png', '_ny.png', '_nz.png'] );

        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

        skybox.material = skyboxMaterial;

        // Create the Sun.

        createPlanet( system.sun );

        var sunLight = new BABYLON.PointLight( 'sunlight', BABYLON.Vector3.Zero(), scene );

        sunLight.intensity = 2.2;

        // First Planet.

        createPlanet( system.mercury );

        // Second Planet.

        createPlanet( system.venus );

        // Third Planet.

        createPlanet( system.earth );

        return scene;

    };

  /**
   * initialize webgl canvas, engine, scene + camera, renderLoop
   */
    var init = function () {

        try {

            //fire these immediately.

            if ( ! BABYLON.Engine.isSupported() ) {

                showError( "Your browser does not support WebGL and/or the BabylonJS engine" );

                return;

            }

            // WebGL canvas.

            canvas = document.getElementById( "renderCanvas" );

            if( ! canvas ) {

                showError( "could not find HTML5 canvas in document, exiting" );

            return;

            }

            // Create the BabylonJS engine.

            if ( engine ) {

                engine.dispose();

                engine = null;

            }

            engine = new BABYLON.Engine( canvas, true );

            if( ! engine ) {

                showError("Could not create Babylon engine");

                return;

            }

            // create a scene.

            //scene = createScene( cameraType.ARCROTATE );
            scene = createScene( cameraType.WEBVR );

            if ( ! scene ) {

                showError("createScene function must return a scene.");

                return;

            }

            // define the object update function, before the scene renders.

            engine.scenes[ 0 ].beforeRender = function () {

                for ( var i in system ) {

                    var planet = system[ i ];

                    if ( planet.orbit.angle != 0 ) {

                        planet.mesh.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);

                        planet.mesh.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);

                        planet.orbit.angle += planet.orbit.speed;

                    }

                    //TODO: individual rotations for each Planet in this range.

                    planet.mesh.rotate(new BABYLON.Vector3(0, 1, 0), 0.01);

                }

            };

            // Confirm scene was added to engine.

            if ( engine.scenes.length === 0 ) {

                showError( "You must at least create a scene." );

                return;

            }

            // Confirm the scene has at least one camera.

            if ( engine.scenes[ 0 ].activeCamera === null ) {

                showError( "You must at least create a camera." );

                return;

            }

            // Start the gameloop.

            engine.runRenderLoop( function () {

                if ( engine.scenes.length === 0 ) {

                    return;

                }

                // Window resize handled in index.html bootstrap script.

                var scene = engine.scenes[ 0 ];

                if ( scene.activeCamera || scene.activeCameras.length > 0 ) {

                    scene.render();

                }

        } ); // End of try... block

    } catch ( e ) {

        showError( e );

        return false;

    }

        return true;

    };

    // Run the game engine.

    var run = function () {

        if ( init() ) {

        console.log('BabylonJS running');

        }

    };

  // Return relevant methods.

    return {

        showError: showError,

        getEngine: getEngine,

        createScene: createScene,

        run: run

    };

} )();
