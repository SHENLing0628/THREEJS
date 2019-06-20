import React from  'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';

export default class RubiksCube extends React.Component {

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, spotLight;
    let container = document.getElementById('scene');

    let cube, cubeGroup;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      cubeGroup = new THREE.Group();
      scene.add(cubeGroup);
      // scene.rotateY(Math.PI * 0.25);
      // scene.rotateX(-Math.PI * 0.1)
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.set(100, 100, 100)
      camera.lookAt(new THREE.Vector3(-10, 0, 0))
      
      //添加鼠标控制效果
      let orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加光源
      addSpotLight();

      //添加辅助坐标轴
      let axes = new THREE.AxisHelper(150);
      scene.add(axes);

      //添加地面网格
      var gridHelper = new THREE.GridHelper( 300, 10, 'red', 'gray' );
      gridHelper.position.y = 0;
      gridHelper.position.x = 0;
      scene.add( gridHelper );

      let cubeDepth = 15;
      //添加物体
      for (let k = 0; k < 3; k++) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let cubeItem = addCube(cubeDepth, cubeDepth, cubeDepth, {x: cubeDepth * j + cubeDepth / 2 , y: cubeDepth * i + cubeDepth / 2, z: cubeDepth * k + cubeDepth / 2});
            cubeGroup.add(cubeItem);
            let edges = new THREE.BoxHelper( cubeItem, 0xffffff);
            cubeGroup.add(edges);
          }
        }
      }
      

      //创建渲染器
      renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      //动画效果
      requestAnimationFrame(draw);
    }

    function draw() {

      renderer.render(scene, camera);
      requestAnimationFrame(draw);
    }

    function addCube(x, y, z, position) {
      let geometry = new THREE.BoxGeometry(x, y, z);
      // let texture = new THREE.Texture(faces(colors[i]));
      // texture.needsUpdate = true;
      // // let material = new THREE.MeshPhongMaterial({ color: 0xFF6461}); 
      // let material = new THREE.MeshLambertMaterial({map: texture})
      // let cube = new THREE.Mesh( geometry, material); 
      cube.receiveShadow = true;
      cube.position.set(position.x, position.y, position.z)
      return cube;
    }

    function faces(rgbaColor) {
      let canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      // let context
    }
    
    function addSpotLight() {
      spotLight = new THREE.DirectionalLight (0xffffff)
      spotLight.position.set(150,100,50);
      spotLight.castShadow = true;
      scene.add(spotLight)
    }
  }

  render () {
    return (
      <div style={{width: '100%', height: '100vh'}} id='scene'/>
    )
  }
}
