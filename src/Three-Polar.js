import React from  'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import { Sphere } from 'three';

export default class ThreePolar extends React.Component {

  

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, spotLight;
    let container = document.getElementById('scene');
    
    let Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune;
    let MercuryTrack, VenusTrack, EarthTrack, MarsTrack, JupiterTrack, SaturnTrack, UranusTrack, NeptuneTrack;
    let MercuryGroup, VenusGroup, EarthGroup, MarsGroup, JupiterGroup, SaturnGroup, UranusGroup, NeptuneGroup;

    initScene();
    // animate();

    function initScene() {
      //创建场景
      scene = new THREE.Scene();
      MercuryGroup = new THREE.Group();
      VenusGroup = new THREE.Group();
      EarthGroup = new THREE.Group();
      MarsGroup = new THREE.Group();
      JupiterGroup = new THREE.Group();
      SaturnGroup = new THREE.Group();
      UranusGroup = new THREE.Group();
      NeptuneGroup = new THREE.Group();

      scene.rotateY(Math.PI * 0.25);
      scene.rotateX(-Math.PI * 0.1)

      let sceneTexture = new THREE.TextureLoader().load(require('./assets/background.jpg'));
      scene.background = sceneTexture;
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.set(380, 380, 380)
      camera.lookAt(new THREE.Vector3(0, 0, 0))
      
      //添加鼠标控制效果
      let orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加光源
      addSpotLight();

      //添加辅助坐标轴
      // let axes = new THREE.AxisHelper(300);
      // scene.add(axes);

      //添加物体

      let mercuryTexture = new THREE.TextureLoader().load(require('./assets/Mercury.jpg'));
      let venusTexture = new THREE.TextureLoader().load(require('./assets/Venus.jpg'));
      let earthTexture = new THREE.TextureLoader().load(require('./assets/Earth.png'));
      let marsTexture = new THREE.TextureLoader().load(require('./assets/Mars.jpg'));
      let jupiterTexture = new THREE.TextureLoader().load(require('./assets/Jupiter.jpg'));
      let saturnTexture = new THREE.TextureLoader().load(require('./assets/Saturn.jpg'));
      let uranusTexture = new THREE.TextureLoader().load(require('./assets/Uranus.jpg'));
      let neptuneTexture = new THREE.TextureLoader().load(require('./assets/Nepture.jpg'));

      Sun = addSun(50, {x: 0, y: 0, z: 0});

      Mercury = addPlanet(10, {x: 70, y: 0, z: 0}, mercuryTexture);
      MercuryTrack = addTrack(70, {x: 0, y: 0, z: 0});
      MercuryGroup.add(Mercury);
      MercuryGroup.add(MercuryTrack);

      Venus = addPlanet(15, {x: 110, y: 0, z: 0}, venusTexture);
      VenusTrack = addTrack(110, {x: 0, y: 0, z: 0});
      VenusGroup.add(Venus);
      VenusGroup.add(VenusTrack);

      Earth = addPlanet(17, {x: 160, y: 0, z: 0}, earthTexture);
      EarthTrack = addTrack(160, {x: 0, y: 0, z: 0});
      EarthGroup.add(Earth);
      EarthGroup.add(EarthTrack);

      Mars = addPlanet(14, {x: 200, y: 0, z: 0}, marsTexture);
      MarsTrack = addTrack(200, {x: 0, y: 0, z: 0});
      MarsGroup.add(Mars);
      MarsGroup.add(MarsTrack);

      Jupiter = addPlanet(25, {x: 250, y: 0, z: 0}, jupiterTexture);
      JupiterTrack = addTrack(250, {x: 0, y: 0, z: 0});
      JupiterGroup.add(Jupiter);
      JupiterGroup.add(JupiterTrack);

      Saturn = addPlanet(25, {x: 320, y: 0, z: 0}, saturnTexture);
      SaturnTrack = addTrack(320, {x: 0, y: 0, z: 0});
      SaturnGroup.add(Saturn);
      SaturnGroup.add(SaturnTrack);
      
      Uranus = addPlanet(17, {x: 380, y: 0, z: 0}, uranusTexture);
      UranusTrack = addTrack(380, {x: 0, y: 0, z: 0});
      UranusGroup.add(Uranus);
      UranusGroup.add(UranusTrack);

      Neptune = addPlanet(17, {x: 430, y: 0, z: 0}, neptuneTexture);
      NeptuneTrack = addTrack(430, {x: 0, y: 0, z: 0});
      NeptuneGroup.add(Neptune);
      NeptuneGroup.add(NeptuneTrack);

      scene.add(Sun);
      scene.add(MercuryGroup);
      scene.add(VenusGroup);
      scene.add(EarthGroup);
      scene.add(MarsGroup);
      scene.add(JupiterGroup);
      scene.add(SaturnGroup);
      scene.add(UranusGroup);
      scene.add(NeptuneGroup);
      

      //创建渲染器
      renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
      renderer.setSize( window.innerWidth, window.innerHeight);//渲染器大小尺寸
      container.appendChild( renderer.domElement );

      //动画效果
      requestAnimationFrame(draw);
    }

    function draw() {
      //自传
      Sun.rotation.y += Math.PI / 2 * 0.001;
      Mercury.rotation.y += Math.PI / 2 * 0.0008;
      Venus.rotation.y += Math.PI / 2 * 0.002;
      Earth.rotation.y += Math.PI / 2 * 0.0033;
      Mars.rotation.y += Math.PI / 2 * 0.0062;
      Jupiter.rotation.y += Math.PI / 2 * 0.0001;
      Saturn.rotation.y += Math.PI / 2 * 0.0003;
      Uranus.rotation.y += Math.PI / 2 * 0.00766;
      Neptune.rotation.y += Math.PI / 2 * 0.0015;

      // 公转
      MercuryGroup.rotation.y += Math.PI / 2 * 0.0008;
      VenusGroup.rotation.y += Math.PI / 2 * 0.002;
      EarthGroup.rotation.y += Math.PI / 2 * 0.0033;
      MarsGroup.rotation.y += Math.PI / 2 * 0.0062;
      JupiterGroup.rotation.y += Math.PI / 2 * 0.0001;
      SaturnGroup.rotation.y += Math.PI / 2 * 0.0003;
      UranusGroup.rotation.y += Math.PI / 2 * 0.00066;
      NeptuneGroup.rotation.y += Math.PI / 2 * 0.0015;

      // //地球自转
      // Earth.rotation.y -= 0.002;

      // //月亮绕地球转动
      // MoonGroup.rotation.y += Math.PI / 2 * 0.001;

      renderer.render(scene, camera);
      requestAnimationFrame(draw);
    }

    function addSun(radius, position) {
      let sunGeometry = new THREE.SphereGeometry(radius, 100, 100);
      let sunTexture = new THREE.TextureLoader().load(require('./assets/sun.jpg'));
      let sunMaterial = new THREE.MeshPhongMaterial({ map: sunTexture});
      let sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.set(position.x, position.y, position.z);
      return sun;
    }

    function addPlanet(radius, position, texture) {
      let planetGeometry = new THREE.SphereGeometry(radius, 50, 50);
      let planetMaterial = new THREE.MeshPhongMaterial({ map: texture});
      let planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.castShadow = true;
      planet.position.set(position.x, position.y, position.z);
      return planet;
    }

    function addTrack(radius, position) {
      let trackGeometry = new THREE.RingGeometry(radius,radius + 0.5 ,500);
      let trackMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      let track = new THREE.Mesh(trackGeometry, trackMaterial);
      track.position.set(position.x, position.y, position.z);
      track.rotation.x = - Math.PI / 2;
      return(track);
    }
    
    function addSpotLight() {
      spotLight = new THREE.AmbientLight (0xffffff)
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
