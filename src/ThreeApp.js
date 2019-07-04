import React from  'react';
import * as THREE from 'three';
import './three.scss';
import Orbitcontrols from 'three-orbitcontrols';
import TWEEN from '@tweenjs/tween.js';

export default class ThreeApp extends React.Component {

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, group, orbitControls, labelRenderer;
    let container = document.getElementById('scene');

    let cloud, backgroundCloud;

    let particles;

    initScene();
    animate();

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
      orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加辅助坐标轴
      let axes = new THREE.AxesHelper(300);
      scene.add(axes);

      //添加光源
      addSpotLight();

      //改变浏览器大小重置camera和renderer
      window.addEventListener('resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, false);
      
      // createParticles;
      cloud = createParticles(1, true, 0.7, 0xffffff, true, 0xffffff, 50);
      scene.add(cloud);
      

      //渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      requestAnimationFrame(animate);
    }

    //创造粒子
    function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color, num) {
      let geometry = new THREE.Geometry();
      // let geometry = new THREE.BoxGeometry(2, 2, 2, 100, 100)
      let material = new THREE.PointsMaterial({ 
        size: size, 
        transparent: transparent, 
        opacity: opacity, 
        vertexColors: vertexColors, 
        sizeAttenuation: sizeAttenuation, 
        color: color 
      });
      let range = 30;
      for (let i = 0; i < num; i++) {
        //创建随机粒子并添加到geometry中
        let particle = new THREE.Vector3(Math.random() *range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        geometry.vertices.push(particle);

        //创建颜色数组geometry.colors
        let color = new THREE.Color(0xffffff);
        geometry.colors.push(color);
      }
      return (new THREE.Points(geometry, material));
    }

    function animate() {
      // 星空效果
      // var vertices = cloud.geometry.vertices;
      // vertices.forEach(function (v) {
      //   particleAnimate(v);
      // });
      //设置实时更新网格的顶点信息
      // cloud.geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    //星空动画
    function particleAnimate(vertice) {
      return new Promise( resolve => {
        let originalPosition = {x: vertice.x, y: vertice.y, z: vertice.z};
        let targetPosition = {x: vertice.x, y: vertice.y, z: -500};
        new TWEEN.Tween(originalPosition)
        .to(targetPosition, 100)
        .onUpdate( object => { 
          vertice.x = object.x;
          vertice.y = object.y;
          vertice.z = object.z;
        })
        .easing( TWEEN.Easing.Linear.None )
        .start();
        
        let timer = setTimeout(() => {
          resolve('success');
          clearTimeout(timer);
        }, 100)
      })
    }

    function addSpotLight() {
      let ambient = new THREE.AmbientLight(0x999999);
      scene.add(ambient);
    }
  }
  
  render () {
    return (
        <div id='scene' style={{width: '100%', height: '100vh'}}/>
    )
  }
}
