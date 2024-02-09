import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color('white');

const light = new THREE.HemisphereLight("#b0d8f5", "#bb7a1c", 1)


const loader = new GLTFLoader();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

loader.load("/kartell_kabuki/scene.gltf", function (gltf) {
	
	scene.add(gltf.scene, light);
	renderer.render( scene, camera );
	gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            console.log(child.material); // 해당 메쉬의 재질 출력
        }
    });

  });

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update()는 카메라 변환설정을 수동으로 변경한 후에 호출해야 합니다.
camera.position.set( 0, 1, 10 );
controls.update();

function animate() {

	requestAnimationFrame( animate );

	// 만약 controls.enableDamping, controls.autoRotate 둘 중 하나라도 true로 설정될 경우 필수로 호출되어야 합니다.
	controls.update();

	renderer.render( scene, camera );

}
// init
/*
loader.load("/path/to/your/model.gltf", function (gltf) {
    gltf.scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            console.log(child.material); // 해당 메쉬의 재질 출력
        }
    });
});

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