import React from  'react';
import * as THREE from 'three';
import { SpotLight } from 'three';
import Orbitcontrols from 'three-orbitcontrols';

export default class ThreeApp extends React.Component {

  

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, group, spotLight;
    let container = document.getElementById('scene');

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x696969);
      group = new THREE.Group();
      scene.add(group);
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.set(-10, 15, 500);
      
      //添加鼠标控制效果
      let orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加光源
      addSpotLight();

      //添加物体
      // group.add(createCube(50,50,50, { x: 30, y: 30, z: 30 }));
      let earth = createSphere(150, 15, 15, { x: 0, y: 0, z: 0 });
      let ground = createPlane(200, 200, 10, 5, {x: 0, y: -200, z: 0})
      // group.add(createPlane(20, 50, 1, 2,  { x: -30, y: 30, z: 30 }));
      scene.add(ground);
      group.add(earth)


      //创建渲染器
      renderer = new THREE.WebGLRenderer();
      // renderer.setClearColor(0x000000, 1); // 设置默认背景色
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      //动画效果
      requestAnimationFrame(animate);
      earth.rotation.x += 0.05;
      renderer.render( scene, camera);
    }

    function createCube(x, y, z, position) {
      let geometry = new THREE.BoxGeometry(x, y, z); //create BoxGeometry object
      let material = new THREE.MeshPhongMaterial({ color: 0xffffff}); //set the material of the cube
      let cube = new THREE.Mesh( geometry, material); //Mesh contains the cube and the material, we can push the mesh object into our scenerio, and make it moves freely in the scene
      cube.receiveShadow = true;
      cube.position.set(position.x, position.y, position.z)
      return cube;
    }

    function createPlane(width, height, widthSegment, heightSegment, position) {
      let planeGeometry = new THREE.PlaneGeometry(width, height, widthSegment, heightSegment);
      let planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
      plane.position.set(position.x, position.y, position.z);
      return plane;
    }

    function createSphere(radius, widthSegment, heightSegment, position) {
      let sphereGeometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
      let texture = new THREE.TextureLoader().load(require('./assets/Earth.png'));
      let sphereMaterial = new THREE.MeshStandardMaterial({map: texture});
      // let sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.position.set(position.x, position.y, position.z);
      return sphere;
    }
    
    function addSpotLight() {
      spotLight = new SpotLight(0xffffff);
      spotLight.position.set(300,200,300);
      spotLight.castShadow = true;
      // spotLight.shadow.mapSize.width = 2048;
      // spotLight.shadow.mapSize.height = 2048;
      scene.add(spotLight)
    }
    
    function animate () {
      requestAnimationFrame(animate);
      group.rotation.x += 0.005;
      group.rotation.y += 0.005;
      renderer.render( scene, camera);
    }
  }

  render () {
    return (
      <div style={{width: '100%', height: '100vh'}} id='scene'/>
    )
  }
}
