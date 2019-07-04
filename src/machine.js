import React from  'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class Machine extends React.Component {

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer,labelRenderer, spotLight;
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
    scatterRing,
    specialGroup3,
    specialGroup4,
    torusWithNail,
    core,
    rightTorus,
    tailPart,
    labelGroup,
    specialGroup5;

    let originalZ = 2000;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      // scene.rotateY(Math.PI / 4)
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.set(2000, 2000, 2000)
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
      getPoint(70, 0, 0, 100).forEach(item => {
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.5, item.x, item.y, originalZ, 0xCC0001))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.5, item.x, item.y, originalZ - 10, 0x4AFFFE))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.5, item.x, item.y, originalZ - 150, 0x4AFFFE))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.5, item.x, item.y, originalZ - 160, 0xCC0001))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.5, item.x, item.y, originalZ - 180, 0x4AFFFE))
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.5, item.x, item.y, originalZ - 190, 0xCC0001))
      })
      scene.add(redBlueSmallGroup);

      //3. 红色点阵圈
      redCircle = new THREE.Group();
      getPoint(120, 0, 0, 100).forEach(item => {
        redBlueSmallGroup.add(createCube(2, 2, 3, 0.3, item.x, item.y, originalZ - 50, 0xCC0001))
      })
      scene.add(redCircle)

      //4. 圆环
      normalTorus = createNormalTorus(150, 3, 0.7, 0, 0, originalZ - 100, 0x4AFFFE);
      scene.add(normalTorus)
      

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
      labelGroup = new THREE.Group();
      getPoint(350, 0, 0, 8).forEach(item => {
        sg2_cube.add(createCube(80, 100, 200, 0.8, item.x, item.y, originalZ - 750, 0x4AFFFE))
        sg2_leftSlice.add(createCube(10, 100, 200, 0.8, item.x, item.y, originalZ - 750, 0x4AFFFE))
        sg2_rightSlice.add(createCube(10, 100, 200, 0.8, item.x, item.y, originalZ - 750, 0x4AFFFE))
        labelGroup.add(createText('test', item.x, item.y, originalZ - 750))
      })
      sg2_leftSlice.rotateOnAxis(new THREE.Vector3(0,0,750).normalize(), 120);
      sg2_rightSlice.rotateOnAxis(new THREE.Vector3(0,0,750).normalize(), 30);
      specialGroup2.add(sg2_cube);
      specialGroup2.add(sg2_leftSlice);
      specialGroup2.add(sg2_rightSlice);
      specialGroup2.add(labelGroup);
      scene.add(specialGroup2)

      //12. 圆环2
      normalTorus2 = createNormalTorus(250, 50, 0.9, 0, 0, originalZ - 1050, 0x4AFFFE);
      scene.add(normalTorus2)

      //13.散点圆
      scatterRing = new THREE.Group();
      getPoint(600, 0, 0, 40).forEach(item => {
        scatterRing.add(createCube(5, 25, 2, 0.5, item.x, item.y, originalZ - 730, 0x4AFFFE))
      })
      getPoint(550, 0, 0, 200).forEach(item => {
        scatterRing.add(createCube(5, 12, 2, 0.5, item.x, item.y, originalZ - 760, 0x4AFFFE))
      })
      getPoint(450, 0, 0, 200).forEach(item => {
        scatterRing.add(createCube(5, 5, 2, 0.3, item.x, item.y, originalZ - 760, 0x4AFFFE))
      })
      getPoint(470, 0, 0, 200).forEach(item => {
        scatterRing.add(createCube(5, 5, 2, 0.3, item.x, item.y, originalZ - 760, 0xCC0001))
      })
      getPoint(490, 0, 0, 200).forEach(item => {
        scatterRing.add(createCube(5, 5, 2, 0.3, item.x, item.y, originalZ - 760, 0x4AFFFE))
      })
      getPoint(500, 0, 0, 200).forEach(item => {
        scatterRing.add(createCube(5, 15, 2, 0.3, item.x, item.y, originalZ - 850, 0xFF5500))
      })
      getPoint(500, 0, 0, 50).forEach(item => {
        scatterRing.add(createCube(10, 5, 25, 0.8, item.x, item.y, originalZ - 930, 0x4AFFFE))
      })
      getPoint(450, 0, 0, 130).forEach(item => {
        scatterRing.add(createCube(5, 15, 2, 0.5, item.x, item.y, originalZ - 1200, 0x4AFFFE))
      })
      scene.add(scatterRing)

      //14. 内部长条立方体圆环
      specialGroup3 = new THREE.Group();
      getPoint(100, 0, 0, 10).forEach(item => {
        specialGroup3.add(createCube(10, 10, 450, 0.6, item.x, item.y, originalZ - 700, 0x4AFFFE))
      })
      scene.add(specialGroup3);

      //15. 特殊水管管道模型
      specialGroup4 = createCylinder(250, 120, 0.5, 0, 0, originalZ - 1300, 0x4AFFFE)
      scene.add(specialGroup4)

      //16.圆环与钉子
      torusWithNail = new THREE.Group();
      let nailPart = new THREE.Group();
      getPoint(170, 0, 0, 3).forEach(item => {
        nailPart.add(createNormalCylinder(10, 40, 0.6, item.x, item.y, originalZ - 1490, 0x4AFFFE ))
        nailPart.add(createNormalCylinder(20, 10, 0.6, item.x, item.y, originalZ - 1470, 0x4AFFFE ))
      })
      let torusPart = createNormalTorus(150, 5, 0.6, 0, 0, originalZ - 1500, 0x4AFFFE)
      torusWithNail.add(torusPart)
      torusWithNail.add(nailPart)
      scene.add(torusWithNail)

      //17. 核心部分
      ////左侧黄色部分
      core = new THREE.Group();
      getPoint(130, 0, 0, 10).forEach(item => {
        core.add(createNormalCylinder(2, 400, 0.8, item.x, item.y, originalZ - 1750, 0xF3D225 ))
      })
      getPoint(106, 0, 0, 10).forEach(item => {
        core.add(createCube(4, 50, 4, 0.6, item.x, item.y, originalZ - 1550, 0xF3D225))
        core.add(createCube(4, 50, 4, 0.6, item.x, item.y, originalZ - 1950, 0xF3D225))
      })
      getPoint(150, 0, 0, 10).forEach(item => {
        core.add(createNormalCylinder(2, 200, 0.8, item.x, item.y, originalZ - 1650, 0x4AFFFE ))
      })
      getPoint(160, 0, 0, 50).forEach(item => {
        core.add(createCube(5, 5, 10, 0.5, item.x, item.y, originalZ - 1600, 0x4AFFFE))
      })
      getPoint(200, 0, 0, 100).forEach(item => {
        core.add(createCube(3, 3, 3, 0.4, item.x, item.y, originalZ - 1550, 0xCC0001))
      })
      getPoint(280, 0, 0, 100).forEach(item => {
        core.add(createCube(3, 3, 3, 0.4, item.x, item.y, originalZ - 1580, 0x4AFFFE))
      })

      ////核心球体放置于-2050处
      core.add(createBall(50, 0.9, 0, 0, originalZ - 2050, 0xF3D225))

      core.add(createNormalTorus(200, 2, 0.5, 0, 0, originalZ - 2050, 0xF3D225))
      core.add(createNormalTorus(190, 2, 0.5, 0, 0, originalZ - 2050, 0xF3D225))
      getPoint(350, 0, 0, 200).forEach(item => {
        core.add(createCube(2, 5, 2, 0.7, item.x, item.y, originalZ - 2050, 0xCC0001))
      })
      getPoint(450, 0, 0, 450).forEach(item => {
        core.add(createCube(2, 2, 2, 0.7, item.x, item.y, originalZ - 2050, 0x4AFFFE))
      })
      getPoint(470, 0, 0, 100).forEach(item => {
        core.add(createCube(2, 10, 2, 0.7, item.x, item.y, originalZ - 2050, 0x4AFFFE))
      })
      getPoint(480, 0, 0, 100).forEach(item => {
        core.add(createCube(3, 3, 2, 0.7, item.x, item.y, originalZ - 2050, 0xCC0001))
      })
      
      ////右侧黄色部分
      getPoint(130, 0, 0, 10).forEach(item => {
        core.add(createNormalCylinder(2, 400, 0.8, item.x, item.y, originalZ - 2350, 0xF3D225 ))
      })
      getPoint(106, 0, 0, 10).forEach(item => {
        core.add(createCube(4, 50, 4, 0.6, item.x, item.y, originalZ - 2150, 0xF3D225))
        core.add(createCube(4, 50, 4, 0.6, item.x, item.y, originalZ - 2550, 0xF3D225))
      })
      getPoint(150, 0, 0, 10).forEach(item => {
        core.add(createNormalCylinder(2, 200, 0.8, item.x, item.y, originalZ - 2450, 0x4AFFFE ))
      })
      getPoint(230, 0, 0, 100).forEach(item => {
        core.add(createCube(3, 3, 3, 0.6, item.x, item.y, originalZ - 2350, 0x4AFFFE))
        core.add(createCube(3, 3, 3, 0.6, item.x, item.y, originalZ - 2380, 0xCC0001))
        core.add(createCube(3, 3, 3, 0.6, item.x, item.y, originalZ - 2520, 0x4AFFFE))
        core.add(createCube(3, 3, 3, 0.6, item.x, item.y, originalZ - 2550, 0xCC0001))
      })
      getPoint(350, 0, 0, 100).forEach(item => {
        core.add(createCube(3, 3, 3, 0.6, item.x, item.y, originalZ - 2450, 0xCC0001))
      })
      scene.add(core);

      //18. 右侧部分圆管组合
      rightTorus = new THREE.Group();
      rightTorus.add(createNormalTorus(250, 8, 0.7, 0, 0, originalZ - 2550, 0x4AFFFE))
      rightTorus.add(createNormalTorus(250, 8, 0.7, 0, 0, originalZ - 2600, 0x4AFFFE))
      rightTorus.add(createNormalTorus(150, 8, 0.7, 0, 0, originalZ - 2650, 0x4AFFFE))
      rightTorus.add(createNormalTorus(350, 8, 0.7, 0, 0, originalZ - 2800, 0x4AFFFE))
      getPoint(350, 0, 0, 80).forEach(item => {
        rightTorus.add(createCube(3, 3, 20, 0.6, item.x, item.y, originalZ - 2780, 0x4AFFFE))
      })
      rightTorus.add(createNormalTorus(150, 20, 0.7, 0, 0, originalZ - 2850, 0x4AFFFE))
      rightTorus.add(createNormalTorus(150, 20, 0.7, 0, 0, originalZ - 2870, 0x4AFFFE))
      rightTorus.add(createNormalTorus(150, 20, 0.7, 0, 0, originalZ - 2890, 0x4AFFFE))
      rightTorus.add(createNormalTorus(150, 20, 0.7, 0, 0, originalZ - 2910, 0x4AFFFE))
      rightTorus.add(createNormalTorus(150, 20, 0.7, 0, 0, originalZ - 2930, 0x4AFFFE))

      rightTorus.add(createNormalTorus(350, 10, 0.7, 0, 0, originalZ - 3050, 0x4AFFFE))
      getPoint(350, 0, 0, 5).forEach(item => {
        rightTorus.add(createCube(20, 20, 80, 0.6, item.x, item.y, originalZ - 3000, 0x4AFFFE))
      })

      // rightTorus.add(createNormalCylinder(100, 30, 0.9, 0, 0, originalZ - 3200, 0x4AFFFE ))
      // getPoint(150, 0, 0, 10).forEach(item => {
      //   rightTorus.add(createCube(30, 30, 150, 0.7, item.x, item.y, originalZ - 3200, 0x4AFFFE))
      // })

      scene.add(rightTorus)

      //收尾带动画部分
      tailPart = new THREE.Group();
      getPoint(350, 0, 0, 8).forEach(item => {
        tailPart.add(createCube(50, 50, 300, 0.8, item.x, item.y, originalZ - 3200, 0x4AFFFE))
      })
      getPoint(300, 0, 0, 8).forEach(item => {
        tailPart.add(createNormalCylinder(2, 300, 1, item.x, item.y, originalZ - 3200, 0xF3D225 ))
      })

      specialGroup5 = new THREE.Group();
      getPoint(360, 0, 0, 8).forEach(item => {
        specialGroup5.add(createTiltObj(2, 1000, 1, item.x, item.y, originalZ - 3800, -1300, 0xF3D225 ))
      })
      // getPoint(300, 0, 0, 8).forEach(item => {
      //   specialGroup5.add(createNormalCylinder(2, 500, 1, item.x, item.y, originalZ - 3900, 0xF3D225 ))
      // })
      console.log(specialGroup5)
      scene.add(specialGroup5)
      //原版本尾部
      // getPoint(250, 0, 0, 10).forEach(item => {
      //   tailPart.add(createCube(20, 20, 200, 0.4, item.x, item.y, originalZ - 3300, 0x4AFFFE))
      // })
      // getPoint(400, 0, 0, 10).forEach(item => {
      //   tailPart.add(createCube(40, 40, 600, 0.8, item.x, item.y, originalZ - 3600, 0x4AFFFE))
      // })
      // getPoint(330, 0, 0, 10).forEach(item => {
      //   tailPart.add(createCube(40, 150, 40, 0.8, item.x, item.y, originalZ - 3880, 0x4AFFFE))
      // })
      // getPoint(200, 0, 0, 100).forEach(item => {
      //   tailPart.add(createCube(5, 5, 5, 0.6, item.x, item.y, originalZ - 3600, 0x4AFFFE))
      // })
      // getPoint(500, 0, 0, 100).forEach(item => {
      //   tailPart.add(createCube(10, 10, 5, 0.4, item.x, item.y, originalZ - 3050, 0xCC0001))
      // })
      // getPoint(550, 0, 0, 100).forEach(item => {
      //   tailPart.add(createCube(10, 10, 5, 0.4, item.x, item.y, originalZ - 3050, 0x4AFFFE))
      // })
      // getPoint(400, 0, 0, 100).forEach(item => {
      //   tailPart.add(createCube(5, 30, 5, 0.4, item.x, item.y, originalZ - 2730, 0xFF5500))
      // })
      scene.add(tailPart)

      //创建渲染器
      renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      labelRenderer = new CSS3DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = 10 + 'px'
      container.appendChild(labelRenderer.domElement)

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

    function createCylinder(radius, height, opacity, x, y, z, color) {
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true, wireframe: true});
      let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 300, 300, true);
      let geometry2 = new THREE.CylinderBufferGeometry(radius-30, radius-30, height, 300, 300, true);
      let cylinder = new THREE.Mesh(geometry, material);
      cylinder.add(new THREE.Mesh(geometry2, material))
      cylinder.position.set(x, y, z);
      cylinder.rotation.x = - Math.PI / 2

      let torus = new THREE.Mesh(new THREE.TorusBufferGeometry(radius, 40, 300, 200), material);
      torus.position.set(x, y, z+height/2)

      let cylinderTorus = new THREE.Group();
      cylinderTorus.add(cylinder);
      cylinderTorus.add(torus)
      return cylinderTorus;
    }

    function createTiltObj(radius, height, opacity, x, y, z, targetZ, color ) {
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true});
      // let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 300, 300);
      // let cylinder = new THREE.Mesh(geometry, material);
      // cylinder.position.set(x, y, z);
      // // cylinder.rotateOnAxis(new THREE.Vector3(x, y, z).normalize(), 60)
      // cylinder.rotateX(Math.atan((z - targetZ) / y))
      // cylinder.rotateY(Math.atan(x / (z - targetZ)) + 90)
      // return cylinder
      let geometry = new THREE.BoxBufferGeometry(50, 50, 800);
      let cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      cube.rotateX(Math.atan((z - targetZ) / y))
      return cube;
      
    }

    function createNormalCylinder(radius, height, opacity, x, y, z, color ) {
      let material = new THREE.MeshToonMaterial({ color: color, opacity: opacity, transparent: true});
      let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 300, 300);
      let cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.set(x, y, z);
      cylinder.rotation.x = - Math.PI / 2
      return cylinder
    }

    function createText(text, x, y, z) {
      let label = document.createElement('div')
      label.className = 'label'
      label.textContent = text
      let object = new CSS3DObject(label)
      object.position.set(x, y, z)
      object.rotation.x = Math.PI / 2
      object.rotation.z = Math.PI / 2
      return object
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
      scatterRing.rotation.z -= Math.PI / 2 * 0.01;
      core.rotation.z += Math.PI / 2 * 0.01;
      tailPart.rotation.z += Math.PI / 2 * 0.01;
      // specialGroup5.rotation.z += Math.PI / 2 * 0.01;

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
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
