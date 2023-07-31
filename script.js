// Initialize Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adjust the camera position
camera.position.z = 8;

// Create a disco ball (multiple small mirrored spheres)
const discoBall = new THREE.Group();
scene.add(discoBall);

const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0 });

for (let i = 0; i < 200; i++) {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  const phi = Math.acos(-1 + (2 * i) / 200);
  const theta = Math.sqrt(200 * Math.PI) * phi;
  sphere.position.setFromSphericalCoords(3, phi, theta);
  discoBall.add(sphere);
}


// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the disco ball
  discoBall.rotation.y += 0.005;

  // Rotate the point light around the disco ball
  const time = Date.now() * 0.001;
  pointLight.position.x = Math.sin(time * 0.7) * 4;
  pointLight.position.z = Math.cos(time * 0.3) * 4;

  renderer.render(scene, camera);
}

// Start the animation loop
animate();