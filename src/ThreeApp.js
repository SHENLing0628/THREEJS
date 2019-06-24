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
    let camera, scene, renderer, group, orbitControls;
    let container = document.getElementById('scene');

    let cloud, vertices;

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
      orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加辅助坐标轴
      let axes = new THREE.AxisHelper(300);
      scene.add(axes);

      //添加光源
      addSpotLight();
      
      // createParticles();
      cloud = createParticles(2, true, 0.9, 0xffffff, false, 0xffffff);
      vertices = cloud.geometry.vertices;
      scene.add(cloud);

      console.log(vertices);

      //渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );
      animate();

    }

    function renderFunc() {
      //产生雨滴动画效果
      var vertices = cloud.geometry.vertices;
      vertices.forEach(function (v) {
        particleAnimate(v);
          // v.y = v.y - (v.velocityY);
          // v.x = v.x - (v.velocityX)*.5;

          // if (v.y <= -60) v.y = 60;
          // if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
      });

      //设置实时更新网格的顶点信息
      cloud.geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
    }

    function particleAnimate(vertice) {
      let tween = new TWEEN.Tween({
        x: vertice.x,
        y: vertice.y,
        z: vertice.z
      });
      tween.to({
        x: 0,
        y: 0,
        z: 0
      }, 1000);
      tween.onUpdate( object => {
        vertice.y = object.y;
        vertice.x = object.x;
        vertice.z = object.z;
      });
      tween.start();
    }

    function animate() {
      // orbitControls.update();
      TWEEN.update();
      renderFunc();
      requestAnimationFrame(animate);
    }

    function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
      let geometry = new THREE.Geometry();
      let material = new THREE.PointCloudMaterial({ size: size, transparent: transparent, opacity: opacity, vertexColors: vertexColors, sizeAttenuation: sizeAttenuation, color: color });
      let range = 500;
      for (let i = 0; i < 500; i++) {
        //创建随机粒子并添加到geometry中
        let particle = new THREE.Vector3(Math.random() *range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        particle.velocityX = 0.1 + Math.random() / 5;
        particle.velocityY = (Math.random() - 0.5) / 3;
        geometry.vertices.push(particle);

        //创建颜色数组geometry.colors
        let color = new THREE.Color(0xffffff);
        // color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
        geometry.colors.push(color);
      }

      return (new THREE.PointCloud(geometry, material));
    }

    function addSpotLight() {
      let sunLight = new THREE.PointLight(0xddddaa,1.5,500);
      scene.add(sunLight);
      let ambient = new THREE.AmbientLight(0xfc7f4f4);
      scene.add(ambient);
    }
  }

  render () {
    return (
      <div style={{width: '100%', height: '100vh'}} id='scene'/>
    )
  }
}
