class World {
	// constructor 
	constructor(args) {
	// Set the different geometries composing the room
	let obstacles = [new THREE.BoxGeometry(64, 64, 64)];
	// Set and add the ground
	let material = new THREE.MeshLambertMaterial(args);
	let ground = new THREE.PlaneGeometry(512, 1024);
	this.ground = new THREE.Mesh(ground, material);
	this.ground.rotation.x = -Math.PI / 2;
	// Set the "world" modelisation object
	this.mesh = new THREE.Object3D();
	this.mesh.add(this.ground);
	// Set and add the obstacles
	this.obstacles = [];
	for (let i = 0; i < obstacles.length; i += 1) {
		this.obstacles[i] = new THREE.Mesh(obstacles[i], material);
		this.mesh.add(this.obstacles[i]);
	}
	this.obstacles[0].position.set(0, 32, 128);
	}

	getObstacles() {
		return this.obstacles;
	}



};
