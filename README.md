
### WebVR solar system model using BabylonJS engine.

## Adapted from tutorial
- https://stackskills.com/courses/webgl-tutorial/lectures/397789

## image sources
- http://home.arcor-online.de/axel.mellinger/licenses.html
- http://laps.noaa.gov/albers/sos/sos.html
- http://www.johnstonsarchive.net/spaceart/cylmaps.html
- http://www.solarsystemscope.com/textures/
- http://paulbourke.net/miscellaneous/starfield/


## Data 
 - http://nineplanets.org
 Dwarf planets in detail
 - http://web.gps.caltech.edu/~mbrown/dps.html



## Distances used from sun (planets and dwarf planets)
Planet	distance (AU)	revolution	eccentricity	inclination (deg)
Sun				
Mercury			0.387	87.969 d		0.2056		7.005
Venus			0.723	224.701 d		0.0068		3.3947
Earth			1.000	365.256 d		0.0167		0.0000
Mars			1.524	686.98 d		0.0934		1.851
Jupiter			5.203	11.862 y		0.0484		1.305
Saturn			9.537	29.457 y		0.0542		2.484
Uranus			19.191	84.011 y		0.0472		0.770
Neptune			30.069	164.79 y		0.0086		1.769
Planet 9

Dwarf planets
Pluto			39.482	248.54 y		0.2488		17.16
*Charon
Ceres			2.76	4.559 y			0.07976 	10.587
Eris			67.67 	557 y			0.44177 	44.187
*Dysnomia
Haumea			43.33 	285.4 y			0.18874 	
*Hi'iaka and Namaka
MakeMake		45.80 	309.88 y		0.44177 	
*MK 2			.000129

Distance is from parent 
Moon			0.00257	27.32 d			0.055 		5.1
Phobos
Deimos
Amalthea
Io
Europa
Ganymede
Callisto

Titan
Enceladus

Oberon

Triton

Charon

Planet		Mass	Diameter Earth=1	density	oblateness	rotation	axis tilt	mag. field
Sun					111.66
Mercury		0.0553	0.382				5.427	0.000		58.785 d	~0			0.0006
Venus		0.815	0.949				5.243	0.000		243.686 d	177.36		0.00
Earth		1.000	1.0					5.515	0.00335		23.9345 h	23.45		1.000
Mars		0.107	0.532				3.933	0.00648		24.6229 h	25.19		0.00
Jupiter		317.83	11.19 10.47 polar	1.326	0.06487		9.9250 h	3.13		19,519
Saturn		95.159	9.26 8.27 polar		0.687	0.09796		10.656 h	26.73		578
Uranus		14.536	4.01				1.270	0.02293		17.24 h		97.77		47.9
Neptune		17.147	3.88				1.638	0.01708		16.11 h		28.32		27.0

Dwarf Planets
Pluto		0.0021	2390				1.750	0.000		6.405 d		122.53		0.0000
Ceres		??									0.378 		0.378 d 	
Eris		??		0.235									0.3 d 		
Haumea		??		1960 x 1518 x 996 						0.163 d		
MakeMake	??		1300 - 1900										?
* MK 2 				0.007 (100mi)

Moon				0.2724 												6.7 
Phobos
Deimos
Amalthea
Io
Europa
Ganymede
Callisto

Titan
Enceladus

Oberon

Triton

Charon

Planet	g (×gE)	vesc(km/s)	distance (A.U.)	albedo (%)	temperature (K)	atm. press. (× Earth's)	atm. comp.
Mercury	0.378	4.3	0.387	11.9	100 night, 590–725 day	10-15	42% O2, 29% Na, 22% H2, 6% He, 0.5% K (note that it is essentially a vacuum)
Venus	0.905	10.36	0.723	75	737	92	96.5% CO2, 3.5% N2,
0.015% SO2, 0.007% Ar, 0.002% H2O, 0.002% CO, 0.001% He, 0.001% Ne
Earth	1.000	11.186	1.000	30.6	283 night, 293 day	1.000	78.08% N2, 20.95% O2, 
0.934% Ar, 0.038% CO2, 
H2O highly variable ( <1%)
Mars	0.379	5.03	1.524	25.0	184 night, 242 day	0.004–0.009	95.32% CO2, 2.7% N2, 1.6% Ar, 
0.13% O2, 0.08% CO, 0.021% H2O, 0.01% NO
Jupiter	2.530	59.5	5.203	34.3	165	>>1000	89.8% H2, 10.2% He, 
0.3% CH4, 0.026% NH3. Clouds made of ammonia ice, water ice, ammonium hydrosulfide
Saturn	1.065	35.5	9.537	34.2	134	>>1000	96.3% H2, 3.25% He, 
0.45% CH4, 0.0125% NH3, 0.0110% HD, 0.0007% C2H6. Clouds made of ammonia ice, water ice, ammonium hydrosulfide
Uranus	0.905	21.3	19.191	30.0	76	>>1000	82.5% H2, 15.2% He, 2.3% CH4, 
0.0148% HD. Clouds made of ammonia ice, water ice, ammonium hydrosulfide, methane ice
Neptune	1.14	23.5	30.069	29.0	72	>>1000	80.0% H2, 19.0% He, 1.5% CH4, 
0.0192% HD, 0.0002% C2H6. Clouds made of ammonia ice, water ice, ammonium hydrosulfide, methane ice
Pluto	0.059	1.2	39.482	40 to 60	~50	3 x 10-6	CH4, N2

## CDN
- http://cdn.babylonjs.com/2-2/babylon.js
- http://cdn.babylonjs.com/2-2/babylon.max.js
- http://cdn.babylonjs.com/2-2/babylon.noworker.js


## Documentation
- [Documentation](http://doc.babylonjs.com)
- [Roadmap](http://doc.babylonjs.com/generals/Roadmap)
- [Samples](https://github.com/BabylonJS/Samples)
- [Video overview (1 hour) of BabylonJS features](http://www.youtube.com/watch?v=z80TYMqsdEM)
- [Complete course (8 hours)](http://www.microsoftvirtualacademy.com/training-courses/introduction-to-webgl-3d-with-html5-and-babylon-js)

## Useful links

 - Official web site: [www.babylonjs.com](http://www.babylonjs.com/)
 - Official [forum](http://www.html5gamedevs.com/forum/16-babylonjs/) on www.html5gamedevs.com
 - Online [sandbox](http://www.babylonjs.com/sandbox) where you can test your .babylon scenes with a simple drag'n'drop
 - Online [shader creation tool](http://www.babylonjs.com/cyos/) where you can learn how to create GLSL shaders
 - 3DS Max [exporter](https://github.com/BabylonJS/Babylon.js/tree/master/Exporters/3ds%20Max) can be used to generate a .babylon file from 3DS Max
 - Blender [exporter](https://github.com/BabylonJS/Babylon.js/tree/master/Exporters/Blender) can be used to generate a .babylon file from Blender 3d
 - Unity 5 [exporter](https://github.com/BabylonJS/Babylon.js/tree/master/Exporters/Unity%205) can be used to export your geometries from Unity 5 scene editor
 - FBX command line [exporter](https://github.com/BabylonJS/Babylon.js/tree/master/Exporters/FBX) can be used to generate a .babylon file from .FBX file (animations are supported)

## Apache License 2.0 (Apache)

Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/


=======
# webvr-planets-babylon
babylonjs planet simulation in WebVR
