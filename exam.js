import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        //그림자 추가
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        scene.background = new THREE.Color( 0xffffff );

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupControls() {
        this._controls = new OrbitControls(this._camera, this._divContainer);
    }

    _setupModel() {
        //바닥 매쉬
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
        const planeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI/2;
        plane.position.y = -15;
        this._scene.add(plane);
        plane.receiveShadow = true;

        //모델 불러오기
        new GLTFLoader().load("./kartell_kabuki/untitled2.glb", (gltf)=>{
            const model = gltf.scene;
            this._scene.add(model);

            //scale설정
            model.scale.set(20, 20, 20);
            model.position.set(0,-15,0);
            
            // Material 설정
            const meshPhongMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xFEF7F2,
                clearcoat: 0.2,
                clearcoatRoughness: 0.01,
                emissive: 0xffffff,
                emissiveIntensity: 0.3
            });

            //spotlight추가
            this._addSpotLight(1.5,9,-1, 0xff0000, model);

            model.traverse(child => {
                if(child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material = meshPhongMaterial;
                }
            });
        })
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            45, 
            window.innerWidth / window.innerHeight, 
            1, 
            5000
        );

        camera.position.set(0, 20, 55);
        this._camera = camera;
    }

    _addPointLight(x, y, z) {
        const color = 0xffffff;
        const intensity = 100;
    
        const pointLight = new THREE.PointLight(color, intensity, 200);
        pointLight.position.set(x, y, z);
    
        this._scene.add(pointLight);
    }

    _addSpotLight(x, y, z, helperColor, target) {
        const color = 0xFF7A00;
        const intensity = 150;
        const distance = 50;
        const angle = Math.PI;
        const penumbra = 1;
        const decay = 2;

        const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
        spotLight.position.set(x, y, z);
        spotLight.castShadow = true;

        this._scene.add(spotLight);

        if(target){
            spotLight.target = target;
        }
    }

    _setupLight() {
            
        const AmbientLight = new THREE.AmbientLight( 0xffffff, 1.5); // 주변 조명 강도를 높임
        this._scene.add(AmbientLight);

        this._addPointLight(50, 40, 50);
        this._addPointLight(-50, 40, 50);
        this._addPointLight(-50, 40, -50);
        this._addPointLight(50, 40, -50);

        //back light
        const directionalLight = new THREE.DirectionalLight(0xFFFBEF, 0.8);
        directionalLight.position.set(1.5,10,10);
        directionalLight.target.position.set(1.5, 10, 50);
        directionalLight.target.parent = directionalLight.parent;

        this._scene.add(directionalLight);
        this._scene.add(directionalLight.target);
        directionalLight.castShadow = true;

        
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.top = directionalLight.shadow.camera.right = 500;
        directionalLight.shadow.camera.bottom = directionalLight.shadow.camera.left = -500;
        directionalLight.shadow.camera.near = 10;
        directionalLight.shadow.camera.far = 1000;
        directionalLight.shadow.bias = -0.001;
        directionalLight.shadow.radius = 5;

        const shadowLight = new THREE.DirectionalLight(0xffffff, 2);
        shadowLight.position.set(100, 300, 200);
        shadowLight.target.position.set(1.5, -10, 0);
        

        this._scene.add(shadowLight);
        this._scene.add(shadowLight.target);

        shadowLight.castShadow = true;
        shadowLight.shadow.mapSize.width = 2048*2;
        shadowLight.shadow.mapSize.height = 2048*2;
        shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 500;
        shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -500;
        shadowLight.shadow.camera.near = 10;
        shadowLight.shadow.camera.far = 1000;
        shadowLight.shadow.bias = -0.001;
        shadowLight.shadow.radius = 3;
        shadowLight.shadow.blurSamples = 25
    }

    update(time) {
        time *= 0.01; // second unit

        this._controls.update();
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
        console.log(this._renderer.setSize(width, height))
    }
}

window.onload = function () {
    new App();
}