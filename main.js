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

//Graph setup
let vertices = [];
let edges = [];

function createVertices(numVertices, spread){
  for(let i = 0; i < numVertices; i++){
    vertices.push([THREE.MathUtils.randFloatSpread(spread), THREE.MathUtils.randFloatSpread(spread), THREE.MathUtils.randFloatSpread(spread)]);
  }
}

//Creates a fully connected graph
function createFullyConnectedEdges(){
  for(let i = 0; i < vertices.length; i++){
    for(let j = 0; j < vertices.length; j++){
      if(i != j){
        edges.push([i, j]);
      }
    }
  }
}

function CreatePath(){
  for(let i = 0; i < vertices.length; i++){
    if(i == vertices.length - 1){
      edges.push([i, 0]);
    }else{
      edges.push([i, i + 1]);
    }
  }

}

//Create Vertices
createVertices(30, 30);

//Create edges
// createFullyConnectedEdges();
CreatePath();

//Visualization of graph

//draw vertices as spheres
function drawVertices(){
  for(let i = 0; i < vertices.length; i++){
    let geometry = new THREE.SphereGeometry(0.5, 8, 8);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff});
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(vertices[i][0], vertices[i][1], vertices[i][2]);
    scene.add(sphere);
  } 
}

var points = [];

function drawEdges(){
  for(let i = 0; i < edges.length; i++){
    points.push(new THREE.Vector3(vertices[edges[i][0]][0], vertices[edges[i][0]][1], vertices[edges[i][0]][2]));
    points.push(new THREE.Vector3(vertices[edges[i][1]][0], vertices[edges[i][1]][1], vertices[edges[i][1]][2]));
  }
}

drawVertices();
drawEdges();

var geometry = new THREE.BufferGeometry().setFromPoints( points );
// CREATE THE LINE
var line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: 0x0000ff
        }));

scene.add(line);

scene.background = new THREE.Color(0x333333);

const pointLight = new THREE.PointLight(0xcaf0f8);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 50 + (t * -0.2);
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );
  // shapes.forEach(shape => gravity(shape));
  line.geometry.verticesNeedUpdate = true;
  controls.update();
  renderer.render( scene, camera);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();