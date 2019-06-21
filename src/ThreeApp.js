import React from  'react';
import * as THREE from 'three';
import './three.scss';
import Orbitcontrols from 'three-orbitcontrols';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class ThreeApp extends React.Component {

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, group, spotLight, labelRenderer, label3Renderer;
    let container = document.getElementById('scene');
    let ball;
    let v, a;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      group = new THREE.Group();
      scene.add(group);
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000);
      // camera.position.set(141, 80, 0);
      camera.position.set(100, 30, 100)
      
      //添加鼠标控制效果
      let orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加光源
      addSpotLight();

      //添加物体
      let ground = createCube(110,1,110, { x: 0, y: -25, z: 0 });
      let ground1 = createPlane(110, 100, 1, 1, {x: 0, y: -25, z: 0});
      ball = createSphere(5, 50, 50, {x: 30, y: 15, z: 30});
      scene.add(ball);
      ground1.rotateX( -Math.PI * 0.5);
      scene.add(ground1);

      let text = createText();
      ball.add(text);

      let text2 = create3DText();
      ball.add(text2);

      // 2d渲染器
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = 20 + 'px'
      container.appendChild(labelRenderer.domElement)

      //3d渲染器
      label3Renderer = new CSS3DRenderer();
      label3Renderer.setSize(window.innerWidth, window.innerHeight)
      label3Renderer.domElement.style.position = 'absolute'
      label3Renderer.domElement.style.top = 20 + 'px'
      container.appendChild(label3Renderer.domElement)

      v = 0;
      a = -0.1;

      //创建渲染器
      renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      //label renderer


      //动画效果
      requestAnimationFrame(draw);
    }

    function draw() {
      ball.position.y += v;
      v += a;

      if (ball.position.y <= -20) {
        v = -v * 0.9;
      }

      if (Math.abs(v) < 0.0005) {
        ball.position.y = -20;
      }
      labelRenderer.render(scene, camera)
      label3Renderer.render(scene, camera)
      renderer.render(scene, camera);
      requestAnimationFrame(draw);
    }

    function createText() {
      let labelDiv = document.createElement('div');
      labelDiv.className = 'label';
      labelDiv.textContent = 'test';
      labelDiv.style.marginTop = '-1em';
      let modelLabel = new CSS2DObject(labelDiv);
      modelLabel.position.set(30,15,30);
      return modelLabel;
    }

    function create3DText() {
      let labelDiv = document.createElement('div');
      labelDiv.className = 'label';
      labelDiv.textContent = 'test2';
      labelDiv.style.marginTop = '-1em';
      let object = new CSS3DObject(labelDiv);
      object.position.set(50,15,50);
      return object;
    }

    function createCube(x, y, z, position) {
      let geometry = new THREE.BoxGeometry(x, y, z); //create BoxGeometry object
      let material = new THREE.MeshStandardMaterial({ color: 0xffffff}); //set the material of the cube
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
      // let sphereMaterial = new THREE.MeshStandardMaterial({map: texture});
      let sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.position.set(position.x, position.y, position.z);
      return sphere;
    }
    
    function addSpotLight() {
      spotLight = new THREE.SpotLight(0xffffff)
      
      spotLight.position.set(400,400,200);
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
