import * as THREE from 'three';
import "./style.css";
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const earthTexture = 'model/1_earth_16k.jpg';

//scene
const scene = new THREE.Scene();

//create a Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const texture = new THREE.TextureLoader().load(earthTexture);
const material = new THREE.MeshStandardMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0,10,20);
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1);
camera.position.z = 10;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

//conrtols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotate = 5;

//resize
window.addEventListener('resize', () =>{
  //update size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update();
  sphere.rotation.x += 0.0002;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop()

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(sphere.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});


