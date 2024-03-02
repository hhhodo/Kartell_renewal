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
            model.position.y = -15;
            
            // Material 설정
            const meshPhongMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xFEF7F2,
                clearcoat: 0.2,
                clearcoatRoughness: 0.01,
                emissive: 0xffffff,
                emissiveIntensity: 0.3
            });

            //spotlight추가
            this._addSpotLight(1.5,24,-1, 0x000000, model);

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

        camera.position.set(0, 20, 60);
        this._camera = camera;
    }

    _addPointLight(x, y, z, helperColor) {
        const color = 0xffffff;
        const intensity = 50;
    
        const pointLight = new THREE.PointLight(color, intensity, 200);
        pointLight.position.set(x, y, z);
    
        this._scene.add(pointLight);
    
        const pointLightHelper = new THREE.PointLightHelper(pointLight, 10, helperColor);
    }

    _addSpotLight(x, y, z, helperColor, target) {
        const color = 0xFF8C39;
        const intensity = 70;
        const distance = 100;
        const angle = Math.PI*2;
        const penumbra = 1;
        const decay = 2;

        const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
        spotLight.position.set(x, y, z);

        spotLight.castShadow = false;
        spotLight.receiveShadow = false;

        this._scene.add(spotLight);

        const spotLightHelper = new THREE.SpotLightHelper(spotLight, 10, helperColor);

        if(target){
            spotLight.target = target;
        }
    }

    _setupLight() {
        
    const AmbientLight = new THREE.AmbientLight( 0xffffff, 1); // 주변 조명 강도를 높임
    this._scene.add(AmbientLight);

        this._addPointLight(50, 40, 50, 0xff0000);
        this._addPointLight(-50, 40, 50, 0xffff00);
        this._addPointLight(-50, 40, -50, 0x00ff00);
        this._addPointLight(50, 40, -50, 0x0000ff);

        const shadowLight = new THREE.DirectionalLight(0xffffff, 2.6);
        shadowLight.position.set(100, 300, 200);
        shadowLight.target.position.set(0, -10, 0);
        
        this._scene.add(shadowLight);
        this._scene.add(shadowLight.target);

        shadowLight.castShadow = true;
        shadowLight.shadow.mapSize.width = 2048*2;
        shadowLight.shadow.mapSize.height = 2048*2;
        shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 500;
        shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -500;
        shadowLight.shadow.camera.near = 10;
        shadowLight.shadow.camera.far = 500;
        shadowLight.shadow.bias = -0.001;
        shadowLight.shadow.radius = 1;
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