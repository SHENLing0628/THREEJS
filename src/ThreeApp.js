import React from  'react';
import * as THREE from 'three';
import './three.scss';
import Orbitcontrols from 'three-orbitcontrols';
import TWEEN from '@tweenjs/tween.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export default class ThreeApp extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      starCount: 0
    }
  }
  componentDidMount() {
    // this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, group, orbitControls, labelRenderer;
    let container = document.getElementById('scene');

    let cloud, backgroundCloud;

    let raycaster, mouse, intersects;

    let stepOne, stepTwo, stepThree;

    let cube;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      group = new THREE.Group();
      scene.add(group);

      scene.rotateY(Math.PI * 0.25);
      
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
      
      // createParticles;
      backgroundCloud = createParticles(2, true, 0.7, 0xffffff, false, 0xffffff, 800);
      cloud = createParticles(3, true, 0.8, 0xffffff, false, 0xffffff, 50);
      scene.add(cloud);
      scene.add(backgroundCloud)

      // stepOne = createNumber(12, '1.资源层', 1, {x: 0, y: 20, z: 0}, 30);
      // stepTwo = createNumber(12, '2.数据元', 1, {x: 0, y: 0, z: 0}, 30);
      // stepThree = createNumber(12, '3.资产层', 1, {x: 0, y: -20, z: 0}, 30);
      // scene.add(stepOne);
      // scene.add(stepTwo);
      // scene.add(stepThree);

      //渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      labelRenderer = new CSS3DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = 1 + 'px'
      container.appendChild(labelRenderer.domElement)


      //点击步骤
      // raycaster = new THREE.Raycaster();
      // mouse = new THREE.Vector2();
      // document.addEventListener('click', event => {
      //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      //   clickStep(raycaster, scene, camera, mouse);
      // }, false)

      requestAnimationFrame(animate);
    }

    function createNumber(iconSize, stepText, stepNum, position, textOffset) {
      let iconGeometry = new THREE.PlaneGeometry(iconSize, iconSize);
      let iconTexture = new THREE.TextureLoader().load(require('./assets/1.png'));
      let iconMaterial = new THREE.MeshPhongMaterial({ map: iconTexture, color: 0xffffff, side: THREE.DoubleSide });
      let step = new THREE.Mesh(iconGeometry, iconMaterial);
      
      let labelDiv = document.createElement('div')
      labelDiv.className = 'label'
      labelDiv.textContent = stepText
      let labelObj = new CSS3DObject(labelDiv)
      labelObj.position.set(step.position.x + textOffset, step.position.y, step.position.z)

      step.add(labelObj);
      step.name = stepNum;
      step.position.set(position.x, position.y, position.z);

      return step;
    }

    function clickStep(raycaster, scene, camera, mouse) {
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects([stepOne, stepTwo, stepThree]);
      console.log(intersects);
      if (intersects.length > 0) {
        intersects[0].object.material.map.opacity = 0.1;
        window.alert(intersects[0].object.name)
      }
    }

    function animate() {
      //星空效果
      // var vertices = cloud.geometry.vertices;
      // vertices.forEach(function (v) {
      //   particleAnimate(v);
      // });
      // //设置实时更新网格的顶点信息
      // cloud.geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    //星空动画
    function particleAnimate(vertice) {
      return new Promise( resolve => {
        let originalPosition = {x: vertice.x, y: vertice.y, z: vertice.z};
        let targetPosition = {x: 0, y: 0, z: 0};
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

    //创造星空
    function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color, num) {
      let geometry = new THREE.Geometry();
      let material = new THREE.PointsMaterial({ size: size, transparent: transparent, opacity: opacity, vertexColors: vertexColors, sizeAttenuation: sizeAttenuation, color: color });
      let range = 500;
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



    function addSpotLight() {
      let sunLight = new THREE.PointLight(0xddddaa,1.5,500);
      scene.add(sunLight);
      let ambient = new THREE.AmbientLight(0xfc7f4f4);
      scene.add(ambient);
    }
  }

  onClickStep = (stepNum) => {
    window.alert(stepNum);
  }

  
  render () {
    const operationBar = (
      <div className='operationBar'>
        <button onClick={this.onClickStep.bind(this, 1)}>
          <div className='buttonDiv'>
            <img src={require('./assets/1.svg')} className='opr_icon'/>
            <span>1. 数据资源</span>
          </div>
        </button>

        <img src={require('./assets/arrow.svg')} className='opr_arrow'/>
        <img src={require('./assets/arrow.svg')} className='opr_arrow'/>

        <button onClick={this.onClickStep.bind(this, 2)}>
          <div className='buttonDiv'>
            <img src={require('./assets/1.svg')} className='opr_icon'/>
            <span>2. 数据元</span>
          </div>
        </button>

        <img src={require('./assets/arrow.svg')} className='opr_arrow'/>
        <img src={require('./assets/arrow.svg')} className='opr_arrow'/>

        <button onClick={this.onClickStep.bind(this, 3)}>
          <div className='buttonDiv'>
            <img src={require('./assets/1.svg')} className='opr_icon'/>
            <span>3. 数据资产</span>
          </div>
        </button>
      </div>
    )
    
    return (
      <div>
        {operationBar}
        <div id='scene'/>
      </div>
    )
  }
}
