import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
let camera = new THREE.PerspectiveCamera(30,1);
const loader = new GLTFLoader();

loader.load("./HIRAY_CHAIR/hiray00.gltf", function (gltf) {
	scene.add(gltf.scene);
  });
// init
/*


const width = window.innerWidth, height = window.innerHeight;
const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

// animation

function animation( time ) {

	mesh.rotation.x = time / 5000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
*/