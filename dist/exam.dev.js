"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("three"));

var _GLTFLoader = require("three/addons/loaders/GLTFLoader.js");

var _OrbitControls = require("three/addons/controls/OrbitControls.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    var divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement); //그림자 추가

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    this._renderer = renderer;
    var scene = new THREE.Scene();
    this._scene = scene;
    scene.background = new THREE.Color(0xffffff);

    this._setupCamera();

    this._setupLight();

    this._setupModel();

    this._setupControls();

    window.onresize = this.resize.bind(this);
    this.resize();
    requestAnimationFrame(this.render.bind(this));
  }

  _createClass(App, [{
    key: "_setupControls",
    value: function _setupControls() {
      this._controls = new _OrbitControls.OrbitControls(this._camera, this._divContainer);
    }
  }, {
    key: "_setupModel",
    value: function _setupModel() {
      var _this = this;

      //바닥 매쉬
      var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
      var planeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff
      });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -15;

      this._scene.add(plane);

      plane.receiveShadow = true; //모델 불러오기

      new _GLTFLoader.GLTFLoader().load("./kartell_kabuki/untitled2.glb", function (gltf) {
        var model = gltf.scene;

        _this._scene.add(model); //scale설정


        model.scale.set(20, 20, 20);
        model.position.set(0, -15, 0); // Material 설정

        var meshPhongMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xFEF7F2,
          clearcoat: 0.2,
          clearcoatRoughness: 0.01,
          emissive: 0xffffff,
          emissiveIntensity: 0.3
        }); //spotlight추가

        _this._addSpotLight(1.5, 9, -1, 0xff0000, model);

        model.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = meshPhongMaterial;
          }
        });
      });
    }
  }, {
    key: "_setupCamera",
    value: function _setupCamera() {
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.set(0, 20, 55);
      this._camera = camera;
    }
  }, {
    key: "_addPointLight",
    value: function _addPointLight(x, y, z, helperColor) {
      var color = 0xffffff;
      var intensity = 100;
      var pointLight = new THREE.PointLight(color, intensity, 200);
      pointLight.position.set(x, y, z);

      this._scene.add(pointLight);

      var pointLightHelper = new THREE.PointLightHelper(pointLight, 10, helperColor);
    }
  }, {
    key: "_addSpotLight",
    value: function _addSpotLight(x, y, z, helperColor, target) {
      var color = 0xF00000;
      var intensity = 150;
      var distance = 50;
      var angle = Math.PI;
      var penumbra = 1;
      var decay = 2;
      var spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
      spotLight.position.set(x, y, z);

      this._scene.add(spotLight);

      var spotLightHelper = new THREE.SpotLightHelper(spotLight, 10, helperColor);

      this._scene.add(spotLightHelper);

      if (target) {
        spotLight.target = target;
      }
    }
  }, {
    key: "_setupLight",
    value: function _setupLight() {
      var AmbientLight = new THREE.AmbientLight(0xffffff, 1); // 주변 조명 강도를 높임

      this._scene.add(AmbientLight);

      this._addPointLight(50, 40, 50, 0xff0000);

      this._addPointLight(-50, 40, 50, 0xffff00);

      this._addPointLight(-50, 40, -50, 0x00ff00);

      this._addPointLight(50, 40, -50, 0x0000ff);

      var directionalLight = new THREE.DirectionalLight(0xFFFBEF, 2);
      directionalLight.position.set(1.5, 10, 10);
      directionalLight.target.position.set(1.5, 10, 50);
      directionalLight.target.parent = directionalLight.parent;

      this._scene.add(directionalLight);

      this._scene.add(directionalLight.target);

      directionalLight.castShadow = true;
      var shadowLight = new THREE.DirectionalLight(0xffffff, 2);
      shadowLight.position.set(100, 300, 200);
      shadowLight.target.position.set(1.5, -10, 0); //helper

      var shadowLightHelper = new THREE.DirectionalLightHelper(shadowLight, 10, 0xffff00);

      this._scene.add(shadowLightHelper);

      this._scene.add(shadowLight);

      this._scene.add(shadowLight.target);

      shadowLight.castShadow = true;
      shadowLight.shadow.mapSize.width = 2048 * 2;
      shadowLight.shadow.mapSize.height = 2048 * 2;
      shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 500;
      shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -500;
      shadowLight.shadow.camera.near = 10;
      shadowLight.shadow.camera.far = 1000;
      shadowLight.shadow.bias = -0.001;
      shadowLight.shadow.radius = 1;
    }
  }, {
    key: "update",
    value: function update(time) {
      time *= 0.01; // second unit

      this._controls.update();
    }
  }, {
    key: "render",
    value: function render(time) {
      this._renderer.render(this._scene, this._camera);

      this.update(time);
      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: "resize",
    value: function resize() {
      var width = this._divContainer.clientWidth;
      var height = this._divContainer.clientHeight;
      this._camera.aspect = width / height;

      this._camera.updateProjectionMatrix();

      this._renderer.setSize(width, height);

      console.log(this._renderer.setSize(width, height));
    }
  }]);

  return App;
}();

window.onload = function () {
  new App();
};