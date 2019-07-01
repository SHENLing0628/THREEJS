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

    let threeBallRotate, 
    normalTorus, 
    redBlueSmallGroup, 
    redCircle, 
    transparentCircleGroup, 
    orangeCircle, 
    specialGroup1, 
    gear,
    rings,
    specialGroup2,
    normalTorus2,
    scatterRing;

    let originalZ = 500;

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
      // let axes = new THREE.AxisHelper(2000);
      // scene.add(axes);

      //1. 三球环绕旋转
      threeBallRotate = new THREE.Group();
      getPoint(200, 0, 0, 3).forEach(item => {
        threeBallRotate.add(createBall(20, 0.7, item.x, item.y, originalZ, 0x4AFFFE));
      })
      scene.add(threeBallRotate);

      //2.红蓝小圈组合
      redBlueSmallGroup = new THREE.Group();
      let redBlueSmallGroupPoints = getPoint(70, 0, 0, 80);
      redBlueSmallGroupPoints.forEach(item => {
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ, 0xCC0001))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 10, 0x4AFFFE))
      })

      //3. 红色点阵圈
      redCircle = new THREE.Group();
      getPoint(120, 0, 0, 100).forEach(item => {
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 50, 0xCC0001))
      })
      scene.add(redCircle)

      //4. 圆环
      normalTorus = createNormalTorus(150, 3, 0.7, 0, 0, originalZ - 100, 0x4AFFFE);
      scene.add(normalTorus)

      //5.红蓝小圈组合
      redBlueSmallGroupPoints.forEach(item => {
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 150, 0x4AFFFE))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 160, 0xCC0001))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 180, 0x4AFFFE))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 190, 0xCC0001))
      })
      scene.add(redBlueSmallGroup);

      //6. 半透明圆圈组合（红、蓝、红、蓝）
      transparentCircleGroup = new THREE.Group();
      getPoint(150, 0, 0, 100).forEach(item => {
        transparentCircleGroup.add(createBall(2, 0.3, item.x, item.y, originalZ - 220, 0xCC0001));
        transparentCircleGroup.add(createBall(2, 0.3, item.x, item.y, originalZ - 250, 0x4AFFFE));
        transparentCircleGroup.add(createBall(2, 0.3, item.x, item.y, originalZ - 280, 0xCC0001));
        transparentCircleGroup.add(createBall(2, 0.3, item.x, item.y, originalZ - 310, 0x4AFFFE));
      })
      scene.add(transparentCircleGroup)

      //7.多层半透明嵌套
      getPoint(180, 0, 0, 100).forEach(item=>{
        transparentCircleGroup.add(createBall(2, 0.3, item.x, item.y, originalZ - 250, 0xCC0001));
      })
      getPoint(200, 0, 0, 100).forEach(item=>{
        transparentCircleGroup.add(createBall(2, 0.3, item.x, item.y, originalZ - 250, 0x4AFFFE));
      })

      //8. 橙色圈
      orangeCircle = new THREE.Group();
      getPoint(250, 0, 0, 150).forEach(item => {
        orangeCircle.add(createCube(2, 2, 3, 0.4, item.x, item.y, originalZ - 340, 0xFF5500))
      })
      scene.add(orangeCircle)

      //9. 特殊组合一：圆环、方块、圆环
      specialGroup1 = new THREE.Group();
      getPoint(240, 0, 0, 40).forEach(item => {
        specialGroup1.add(createCube(15, 40, 3, 0.5, item.x, item.y, originalZ - 380, 0x4AFFFE))
      })
      specialGroup1.add(createNormalTorus(220, 3, 0.5, 0, 0, originalZ - 380, 0x4AFFFE))
      specialGroup1.add(createNormalTorus(260, 3, 0.5, 0, 0, originalZ - 380, 0x4AFFFE))

      getPoint(240, 0, 0, 3).forEach(item => {
        specialGroup1.add(createCube(80, 100, 20, 0.9, item.x, item.y, originalZ - 380, 0x4AFFFE))
      })
      scene.add(specialGroup1);

      //10. 齿轮
      gear = new THREE.Group();
      getPoint(350, 0, 0, 100).forEach(item => {
        gear.add(createCube(10, 20, 15, 0.5, item.x, item.y, originalZ - 420, 0x4AFFFE))
      })
      gear.add(createNormalTorus(350, 10, 0.5, 0, 0, originalZ - 430, 0x4AFFFE))
      scene.add(gear);

      //11. 6个同心圆
      rings = new THREE.Group();
      let ringsRadius = 500;
      rings.add(createNormalTorus(ringsRadius, 1, 0.5, 0, 0, originalZ - 550, 0x4AFFFE))
      rings.add(createNormalTorus(ringsRadius + 10, 1, 0.5, 0, 0, originalZ - 550, 0x4AFFFE))
      rings.add(createNormalTorus(ringsRadius + 20, 1, 0.5, 0, 0, originalZ - 550, 0x4AFFFE))
      rings.add(createNormalTorus(ringsRadius + 30, 1, 0.5, 0, 0, originalZ - 550, 0x4AFFFE))
      rings.add(createNormalTorus(ringsRadius + 40, 1, 0.5, 0, 0, originalZ - 550, 0x4AFFFE))
      rings.add(createNormalTorus(ringsRadius + 50, 1, 0.5, 0, 0, originalZ - 550, 0x4AFFFE))
      scene.add(rings)

      //12. 特殊组合
      specialGroup2 = new THREE.Group();
      let sg2_cube, sg2_leftSlice, sg2_rightSlice;
      sg2_cube = new THREE.Group();
      sg2_leftSlice = new THREE.Group();;
      sg2_rightSlice = new THREE.Group();
      getPoint(350, 0, 0, 8).forEach(item => {
        sg2_cube.add(createCube(80, 100, 200, 0.8, item.x, item.y, originalZ - 750, 0x4AFFFE))
        sg2_leftSlice.add(createCube(10, 100, 200, 0.8, item.x, item.y, originalZ - 750, 0x4AFFFE))
        sg2_rightSlice.add(createCube(10, 100, 200, 0.8, item.x, item.y, originalZ - 750, 0x4AFFFE))
      })
      sg2_leftSlice.rotateOnAxis(new THREE.Vector3(0,0,750).normalize(), 120);
      sg2_rightSlice.rotateOnAxis(new THREE.Vector3(0,0,750).normalize(), 30);
      specialGroup2.add(sg2_cube);
      specialGroup2.add(sg2_leftSlice);
      specialGroup2.add(sg2_rightSlice);
      scene.add(specialGroup2)

      //12. 圆环2
      normalTorus2 = createNormalTorus(250, 50, 0.9, 0, 0, originalZ - 1000, 0x4AFFFE);
      scene.add(normalTorus2)

      //13.散点圆
      scatterRing = new THREE.Group();
      getPoint(550, 0, 0, 40).forEach(item => {
        scatterRing.add(createCube(20, 10, 25, 0.5, item.x, item.y, originalZ - 750, 0x4AFFFE))
      })
      scene.add(scatterRing)

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
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true});
      let torus = new THREE.Mesh(geometry, material);
      torus.position.set(x, y, z);
      return torus
    }

    function createBall (radius, opacity, x,y,z, color) {
      let geometry = new THREE.SphereBufferGeometry(radius, 100, 100);
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true});
      let ball = new THREE.Mesh(geometry, material);
      ball.position.set(x, y, z);
      return ball;
    }

    function createCube (width, height, depth, opacity, x, y, z, color) {
      let geometry = new THREE.BoxBufferGeometry(width, height, depth);
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true});
      let cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      cube.rotation.z = - Math.atan(x/y)
      return cube;
    }

    function createCubeGroup (width, height, depth, R, opacity, x, y, z, color) {
      let cubeGeometry = new THREE.BoxBufferGeometry(width, height, depth);
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true});
      let cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(x, y, z);

      let arc = Math.atan(x/y)

      let sliceGeometry = new THREE.BoxBufferGeometry(8, height, depth);
      let slice = new THREE.Mesh(sliceGeometry, material);
      let x1, y1;
      y1 = R * Math.sin(Math.atan(x / y) - 30);
      x1 = R * Math.cos(Math.atan(x / y) - 30);
      slice.position.set(x1, y1, z);
      console.log(x1, y1)

      let sliceGeometry2 = new THREE.BoxBufferGeometry(8, height, depth);
      let slice2 = new THREE.Mesh(sliceGeometry2, material);

      slice2.position.set(R * Math.atan())
      
      cube.rotation.z = - Math.atan(x/y)
      slice.rotation.z = -Math.atan(slice.position.x / slice.position.y)
      // slice2.rotation.z = -Math.atan((x+width/2+20)/y)

      let group = new THREE.Group();
      group.add(cube)
      group.add(slice)
      group.add(slice2)

      // group.rotation.z = - Math.atan(x/y);
      // group.rotation.z = -Math.atan(group.position.x / group.position.y)

      return group;
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
      threeBallRotate.rotation.z -= Math.PI / 2 * 0.01;
      normalTorus.rotation.z += Math.PI / 2 * 0.01;
      redBlueSmallGroup.rotation.z += Math.PI / 2 * 0.01;
      gear.rotation.z -= Math.PI / 2 * 0.01;
      transparentCircleGroup.rotation.z += Math.PI / 2 * 0.01;
      specialGroup2.rotation.z -= Math.PI / 2 * 0.01;
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
