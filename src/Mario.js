import React from  'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';

export default class ThreePolar extends React.Component {
  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, spotLight;
    let container = document.getElementById('scene');

    let Earth, Moon, MoonGroup;
    let moonTrack;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      MoonGroup = new THREE.Group();
      scene.add(MoonGroup);
      scene.rotateY(Math.PI * 0.25);
      scene.rotateX(-Math.PI * 0.1)
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.set(100, 100, 100)
      camera.lookAt(new THREE.Vector3(-10, 0, 0))
      
      //添加鼠标控制效果
      let orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加光源
      addSpotLight();

      //添加物体
      

      //创建渲染器
      renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      //动画效果
      requestAnimationFrame(draw);
    }

    function draw() {
      //地球自转
      Earth.rotation.y -= 0.002;

      //月亮绕地球转动
      MoonGroup.rotation.y += Math.PI / 2 * 0.001;

      renderer.render(scene, camera);
      requestAnimationFrame(draw);
    }

    function addEarth() {
      let earthGeometry = new THREE.SphereGeometry(30, 50, 50);
      let earthTexture = new THREE.TextureLoader().load(require('./assets/Earth.png'));
      let earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture});
      let earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.castShadow = true;
      earth.position.set(-10, 0, 0);
      return earth;
    }

    function addMoon() {
      let moonGeometory = new THREE.SphereGeometry(10, 50, 50);
      let moonTexture = new THREE.TextureLoader().load(require('./assets/moon.jpg'));
      let moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture});
      let moon = new THREE.Mesh(moonGeometory, moonMaterial);
      moon.castShadow = true;
      moon.position.set(70, 0, 0);
      return moon;
    }

    function addTrack() {
      let trackGeometry = new THREE.RingGeometry(70,70.5,500);
      let trackMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      let track = new THREE.Mesh(trackGeometry, trackMaterial);
      track.position.set(0,0,0);
      track.rotation.x = - Math.PI / 2;
      return(track);
    }
    
    function addSpotLight() {
      spotLight = new THREE.SpotLight (0xffffff)
      spotLight.position.set(800,1000,1000);
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
