import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.173.0/examples/jsm/controls/OrbitControls.js";

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("#0a192f");

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("scene-container").appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 3, 8);

// Lighting
const hemiLight = new THREE.HemisphereLight(0x88ccff, 0x223344, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(dirLight);

// Load Flamingo Model
const loader = new GLTFLoader();
let flamingo;

loader.load("assets/Flamingo.glb", (gltf) => {
    flamingo = gltf.scene;
    flamingo.scale.set(0.02, 0.02, 0.02);
    flamingo.position.set(0, 1, 0);
    flamingo.traverse((child) => {
        if (child.isMesh) child.castShadow = true;
    });
    scene.add(flamingo);
    animate();
}, undefined, (error) => {
    console.error("Error loading GLB:", error);
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if (flamingo) {
        flamingo.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 1;
        flamingo.rotation.y += 0.005;
    }
    controls.update();
    renderer.render(scene, camera);
}

// Responsive Resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
