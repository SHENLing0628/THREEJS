import React from  'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';

export default class Machine extends React.Component {

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, spotLight;
    let container = document.getElementById('scene');

    let torus1, balls, scatterTorus, scatterTorus2;

    let originalZ = 0;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      // scene.rotateY(Math.PI / 4)
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.set(1000, 1000, 1000)
      camera.lookAt(new THREE.Vector3(0, 0, 0))
      
      //添加鼠标控制效果
      let orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //改变浏览器大小重置camera和renderer
      window.addEventListener('resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, false);

      //添加光源
      light();

      //添加辅助坐标轴
      let axes = new THREE.AxisHelper(2000);
      scene.add(axes);

      
      let points = getPoint(200, 0, 0, 3);
      balls = new THREE.Group();
      points.forEach(item => {  
        balls.add(createBall(20, 0.7, item.x, item.y, originalZ, 0x4AFFFE))
      })
      scene.add(balls);

      //普通圆环
      torus1 = createNormalTorus(150, 5, 0.7, 0, 0, originalZ - 100, 0x4AFFFE);
      scene.add(torus1)

      //散点圆环
      scatterTorus = new THREE.Group();
      let points2 = getPoint(200, 0, 0, 80);
      points2.forEach(item => {
        scatterTorus.add(createBall(5, 0.4, item.x, item.y, originalZ-200, 0xCC0001))
      })
      scene.add(scatterTorus)

      scatterTorus2 = new THREE.Group();
      points2.forEach(item => {
        scatterTorus2.add(createBall(5, 0.3, item.x, item.y, originalZ-230, 0xFF5500))
      })
      scene.add(scatterTorus2)

      //创建渲染器
      renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      //动画效果
      animate();
    }

    function createNormalTorus(radius, tube, opacity, x, y, z, color) {
      let geometry = new THREE.TorusBufferGeometry(radius, tube, 300, 200);
      let material = new THREE.MeshPhongMaterial({ color: color, opacity: opacity, transparent: true});
      let torus = new THREE.Mesh(geometry, material);
      torus.position.set(x, y, z);
      return torus
    }

    function createBall (radius, opacity, x,y,z, color) {
      let geometry = new THREE.SphereBufferGeometry(radius, 100, 100);
      let material = new THREE.MeshPhongMaterial({ color: color, opacity: opacity, transparent: true});
      let ball = new THREE.Mesh(geometry, material);
      ball.position.set(x, y, z);
      return ball;
    }

    function createCube (width, height, depth, opacity, x, y, z, color) {
      let geometry = new THREE.BoxBufferGeometry(width, height, depth);
      let material = new THREE.MeshPhongMaterial({ color: color, opacity: opacity, transparent: true});
      let cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      return cube;
    }

    

    //@param: 半径， 圆心x位置，圆心y位置，切割数量
    function getPoint(radius, ox, oy, count) {
      let points = [];
      let radians = (Math.PI / 180) * Math.round(360 / count); //弧度
      for (let i = 0; i < count; i++) {
        let x = ox + radius * Math.sin(radians * i);
        let y = oy + radius * Math.cos(radians * i);
        points.unshift({x:x, y:y}); //保持数据顺时针
      }
      return points;
    }

    function animate() {
      balls.rotation.z += Math.PI / 2 * 0.01;
      scatterTorus.rotation.z += Math.PI / 2 * 0.002;
      scatterTorus2.rotation.z -= Math.PI / 2 * 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    function light() {
      let sunLight = new THREE.PointLight(0xffffff,1.5,500);
      scene.add(sunLight);
      let light = new THREE.AmbientLight(0xffffff);
      scene.add(light);
    }
  }

  render () {
    return (
      <div style={{width: '100%', height: '100vh'}} id='scene'/>
    )
  }
}
