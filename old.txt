import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

window.addEventListener( 'resize', onWindowResize );


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);


renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(15, 4, 25, 100);
const material = new THREE.MeshStandardMaterial( { color: 0x0077b6 } );
const torus = new THREE.Mesh( geometry, material);

scene.add(torus);

const sphereGeo = new THREE.SphereGeometry(5);
const sphereMat = new THREE.MeshStandardMaterial( { color: 0xf72585 } );

const sphere = new THREE.Mesh( sphereGeo, sphereMat );

scene.add(sphere);


const squareGeo = new THREE.BoxGeometry(7,7,7);
const squareMat = new THREE.MeshStandardMaterial( { color: 0xf48c06 } );

const square = new THREE.Mesh( squareGeo, squareMat );

scene.add(square);

square.position.z = 30;
square.position.setX(-50);


const squareGeo2 = new THREE.BoxGeometry(40,40,40);
const squareMat2 = new THREE.MeshStandardMaterial( { color: 0x9d0208 } );

const square2 = new THREE.Mesh( squareGeo2, squareMat2 );

scene.add(square2);

square2.position.z = 200;
square2.position.setX(50);
square2.position.setY(-20);


const pointLight = new THREE.PointLight(0xcaf0f8);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
/*
const spaceTexture = new THREE.TextureLoader().load('a.webp');
scene.background = spaceTexture;
*/

function addStar(){
  const geometry = new THREE.OctahedronGeometry(.5,0);
  const material = new THREE.MeshStandardMaterial({color: 0x48cae4});
  const star = new THREE.Mesh(geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 500 ));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  
  camera.position.z = 50 + (t * -0.2);
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.003;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  sphere.rotation.y += 0.01;

  square.rotation.z += 0.004;
  square.rotation.x += 0.004;

  square2.rotation.z += 0.001;



  controls.update();

  renderer.render( scene, camera);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();