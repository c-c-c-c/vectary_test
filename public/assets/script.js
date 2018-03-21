'use strict';

var vm = new Vue({
  el: '#mycounter',
  data: {
    count: 0
  },
  methods: {
    countUp: function countUp() {
      this.count++;
      changeRotateSpeed();
    }
  }
});

var vm_stop = new Vue({
  el: '#mystop',
  methods: {
    hsStop: function hsStop() {
      Speed_0();
    }
  }
});

var howManySpinners = 200;
var scene = new THREE.Scene();
var box = void 0;
var controls = void 0;
var renderer = void 0;
var camera = void 0;
var model = [];
//let model = {};
var model2 = {};
var model3 = {};
var rotate_speed = 0.05;
var r_radian = 0;
var c_radian = 0;
var geometry = void 0;
var material = void 0;

function renderSpinner() {
  'use strict';

  var light = void 0;
  var ambient = void 0;
  var gridHelper = void 0;
  var axisHelper = void 0;
  var lightHelp = void 0;
  var width = 1200;
  var height = 1200;
  var modelPath = void 0;

  //light
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 200, 80);
  scene.add(light);
  ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);

  //camera
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 400, 300);
  camera.lookAt(scene.position);

  // helper 現在は非表示
  //gridHelper = new THREE.GridHelper(200, 50);
  //scene.add(gridHelper);
  //axisHelper = new THREE.AxisHelper(1000);
  //scene.add(axisHelper);
  //lightHelper = new THREE.DirectionalLightHelper(light , 20)
  //scene.add(lightHelper);

  //controls
  controls = new THREE.OrbitControls(camera);
  //cameraの自動回転
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);

  //modelPath = 'src/bear.json';
  //modelPath = 'src/handspiner_3d.json';
  //modelPath = '../src/data/handspiner_3d_geo.json';
  modelPath = './public/assets/glass_spiral_light_fitting.dae';
  // modelPath = './public/assets/elf/elf.dae';
  //modelPath = '/Users/yoshimurahiroyuki/workspace/threejs/src/handspiner.json';

  // let loader = new THREE.JSONLoader();　

  var loader = new THREE.ColladaLoader();
  loader.load(modelPath, function (collada) {
    // 読み込み後に3D空間に追加
    var cModel = collada.scene;
    cModel.scale.set(0.07, 0.07, 0.07);
    // console.log(model);
    // model.mscale.set(1000, 1000, 1000);

    console.log(cModel);
    for (var i = 0; i < howManySpinners; i++) {
      // let phongMat = new THREE.MeshPhongMaterial(mat);

      model[i] = cModel.clone();

      var randX = 600 * Math.random() - 300;
      var randY = 600 * Math.random() - 300;
      var randZ = 400 * Math.random() - 200;

      if (i == 0) {
        model[i].position.set(0, 20, 0);
      } else {
        model[i].position.set(randX, randY, randZ);
      }

      // model[i].scale.set(0.5, 0.5, 0.5);　
      var randColor = Math.random() * 0xffffff;
      // model[i].material.color = new THREE.Color(randColor);
      scene.add(model[i]);
    }
  });
  render();
}

//
//   loader.load(modelPath, function(geo, mat) {　　　
//     //let phongMat = new THREE.MeshPhongMaterial(mat);
//     //let phongMat2 = new THREE.MeshPhongMaterial(mat);
//     //let phongMat3 = new THREE.MeshPhongMaterial(mat);
//     //for (let mt of faceMat.materials) {
//     //  mt.color = new THREE.Color(0xffcc88);
//   	//}
//     geometry = geo;
//     material = mat;
//

//     render();
//   });　
// }

function addSpinner() {
  var phongMat = new THREE.MeshPhongMaterial(material);
  model = new THREE.Mesh(geometry, phongMat);
  var randX = 800 * Math.random();
  var randY = 800 * Math.random();
  var randZ = 800 * Math.random();

  var size = Math.random();
  model.scale.set(size, size, size);
  model.position.set(randX, randY, randZ);
  var randColor = Math.random() * 0xffffff;
  model.material.color = new THREE.Color(randColor);
  camera.position.set(0, 1, 1);
  scene.add(model);
}

function render() {
  // console.log("coming");

  requestAnimationFrame(render);
  r_radian += 0.01;

  // for (let i=0; i < howManySpinners; i++ ) {
  // 	model[i].rotation.y += rotate_speed;
  //   model[i].position.y += (Math.sin(r_radian) - Math.sin(r_radian-0.01))*150 ;
  // 	console.log("hoge");
  // }

  // c_radian += 0.007;
  // let cameraZ = 150 * (Math.sin(c_radian)) +150;
  // let cameraZ = 0;
  // camera.position.set(0, 600, cameraZ);


  controls.update();
  renderer.render(scene, camera);
}
//
// function changeRotateSpeed () {
//   //controls.autoRotateSpeed = vm.count*10;
//  	rotate_speed += vm.count*0.01;
//   for (let i=0 ; i < howManySpinners; i++) {
//
// 		model[i].rotation.y = 1.8*vm.count;
//   }
// }
//
// function Speed_0 () {
//   vm.count = 0;
//   rotate_speed = 0;
//  	//addSpinner();
// }

window.addEventListener('load', renderSpinner);

// renderSpinner();
//# sourceMappingURL=script.js.map