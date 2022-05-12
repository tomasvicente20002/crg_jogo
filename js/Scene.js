class BasicScene {
	// constructor 
	constructor(args) {
		// Create a scene, a camera, a light and a WebGL renderer with Three.JS
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
		this.scene.add(this.camera);this.light = new THREE.PointLight();
		this.light.position.set(-256, 256, -256);
		this.scene.add(this.light);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.user = new Character({
			color: 0x7A43B6
		});
		this.scene.add(this.user.mesh);

		// Create the "world" : a3D representation of the 
		this.world = new World({
			color: 0xF5F5F5
		});
		this.scene.add(this.world.mesh);

		document.getElementById(args.elementId).appendChild(this.renderer.domElement);   
		this.setFocus(this.user.mesh);
		this.orbitControls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
		
		// We use the arrow keys for the movement of the character, so disable them for orbitcontrol
		this.orbitControls.enableKeys = false;

		// Start the events handlers
		this.Controls();
	}


	// Event handlersset
	Controls() {
		var user = this.user,
		// State of the different controls
		controls = {left: false,up: false,right: false,down: false};
		// When the user presses a key 
		document.onkeydown = function(e) {
			var prevent = true;
			// Update the state of the attached control to "true"
			switch (e.keyCode) {
				case 37:
					controls.left = true;
					break;
				case 38:
					controls.up = true;
					break;
				case 39:
					controls.right = true;
					break;
				case 40:
					controls.down = true;
					break;
				default:
					prevent = false;
			}
			// Avoid the browser to react unexpectedly
			if (prevent) {
				e.preventDefault();
			} else {
				return;
			}
			// Update the character's direction
			user.setDirection(controls);
		};
		// When the user releases a key
		document.onkeyup = function(e) {
			var prevent = true;
			// Update the state of the attached control to "false"
			switch (e.keyCode) {
				case 37:
					controls.left = false;
					break;
				case 38:
					controls.up = false;
					break;
				case 39:controls.right = false;
					break;
				case 40:
					controls.down = false;
					break;
				default:
					prevent = false;
			}
			// Avoid the browser to react unexpectedly
			if (prevent) {
				e.preventDefault();
			} else {
				return;
			}
			// Update the character's direction
			user.setDirection(controls);
		};
	}





	// Updating the camera to follow and look at a given Object3D / Mesh
	setFocus(object) {
		'use strict';
		this.camera.position.set(object.position.x, object.position.y + 128, object.position.z -256);
		this.camera.lookAt(object.position);}
		// Update and draw the scene
	frame() {
		'use strict';
		this.orbitControls.update();
		// Run a new step of the user's motions
		this.user.motion();
		// And draw !
		this.renderer.render(this.scene, this.camera);
	}
};


function animate() {
	requestAnimationFrame(animate);
	basicScene.frame();
}

var startAnimation = function(elementId) {
	basicScene = new BasicScene({elementId: elementId});
	animate()
;}