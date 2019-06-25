import React from  'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import TWEEN from '@tweenjs/tween.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { Color } from 'three';
// import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class ThreePolar extends React.Component {

  componentDidMount() {
    this.initThree();
  }

  initThree = () => {
    let camera, scene, renderer, spotLight, orbitControls, labelRenderer;
    let container = document.getElementById('scene');
    
    let Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune;
    let MercuryTrack, VenusTrack, EarthTrack, MarsTrack, JupiterTrack, SaturnTrack, UranusTrack, NeptuneTrack;
    let MercuryGroup, VenusGroup, EarthGroup, MarsGroup, JupiterGroup, SaturnGroup, UranusGroup, NeptuneGroup;

    let raycaster, mouse, intersects;

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
      // scene.rotateX(-Math.PI * 0.1)

      // let sceneTexture = new THREE.TextureLoader().load(require('./assets/background.jpg'));
      // scene.background = sceneTexture;
      starsBackground();
      
      //创建相机
      camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.set(380,380,380);
      camera.lookAt(new THREE.Vector3(0,0,0));
      
      //添加鼠标控制效果
      orbitControls = new Orbitcontrols(camera);
      orbitControls.autoRotate = true;

      //添加光源
      addSpotLight();

      //添加辅助坐标轴
      let axes = new THREE.AxisHelper(300);
      scene.add(axes);

      //添加物体

      let mercuryTexture = new THREE.TextureLoader().load(require('./assets/Mercury.jpg'));
      let venusTexture = new THREE.TextureLoader().load(require('./assets/Venus.jpg'));
      let earthTexture = new THREE.TextureLoader().load(require('./assets/Earth.png'));
      let marsTexture = new THREE.TextureLoader().load(require('./assets/Mars.jpg'));
      let jupiterTexture = new THREE.TextureLoader().load(require('./assets/Jupiter.jpg'));
      let saturnTexture = new THREE.TextureLoader().load(require('./assets/Saturn.jpg'));
      let uranusTexture = new THREE.TextureLoader().load(require('./assets/Uranus.jpg'));
      let neptuneTexture = new THREE.TextureLoader().load(require('./assets/Nepture.jpg'));

      Sun = addSun(50);
      let Suntitle = createText('Sun', {x: 0, y: 0, z: 0});
      Sun.add(Suntitle);

      Mercury = addPlanet(10, {x: 70, y: 0, z: 0}, mercuryTexture, 'Mercury');
      MercuryTrack = addTrack(70, {x: 0, y: 0, z: 0});
      MercuryGroup.add(Mercury);
      MercuryGroup.add(MercuryTrack);
      MercuryGroup.add(createText('Mercury', {x: 70, y: 0, z: 0}))

      Venus = addPlanet(15, {x: 110, y: 0, z: 0}, venusTexture, 'Venus');
      VenusTrack = addTrack(110, {x: 0, y: 0, z: 0});
      VenusGroup.add(Venus);
      VenusGroup.add(VenusTrack);
      VenusGroup.add(createText('Venus', {x: 110, y: 0, z: 0}))

      Earth = addPlanet(17, {x: 160, y: 0, z: 0}, earthTexture, 'Earth');
      EarthTrack = addTrack(160, {x: 0, y: 0, z: 0});
      EarthGroup.add(Earth);
      EarthGroup.add(EarthTrack);
      EarthGroup.add(createText('Earth', {x: 160, y: 0, z: 0}))

      Mars = addPlanet(14, {x: 200, y: 0, z: 0}, marsTexture, 'Mars');
      MarsTrack = addTrack(200, {x: 0, y: 0, z: 0});
      MarsGroup.add(Mars);
      MarsGroup.add(MarsTrack);
      MarsGroup.add(createText('Mars', {x: 200, y: 0, z: 0}))

      Jupiter = addPlanet(25, {x: 250, y: 0, z: 0}, jupiterTexture, 'Jupiter');
      JupiterTrack = addTrack(250, {x: 0, y: 0, z: 0});
      JupiterGroup.add(Jupiter);
      JupiterGroup.add(JupiterTrack);
      JupiterGroup.add(createText('Jupiter', {x: 250, y: 0, z: 0}))

      Saturn = addPlanet(25, {x: 320, y: 0, z: 0}, saturnTexture, 'Saturn');
      SaturnTrack = addTrack(320, {x: 0, y: 0, z: 0});
      SaturnGroup.add(Saturn);
      SaturnGroup.add(SaturnTrack);
      SaturnGroup.add(createText('Saturn', {x: 320, y: 0, z: 0}))
      
      Uranus = addPlanet(17, {x: 380, y: 0, z: 0}, uranusTexture, 'Uranus');
      UranusTrack = addTrack(380, {x: 0, y: 0, z: 0});
      UranusGroup.add(Uranus);
      UranusGroup.add(UranusTrack);
      UranusGroup.add(createText('Uranus', {x: 380, y: 0, z: 0}))

      Neptune = addPlanet(17, {x: 430, y: 0, z: 0}, neptuneTexture, 'Neptune');
      NeptuneTrack = addTrack(430, {x: 0, y: 0, z: 0});
      NeptuneGroup.add(Neptune);
      NeptuneGroup.add(NeptuneTrack);
      NeptuneGroup.add(createText('Neptune', {x: 430, y: 0, z: 0}))

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

      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight)
      labelRenderer.domElement.style.position = 'absolute'
      labelRenderer.domElement.style.top = 10 + 'px'
      container.appendChild(labelRenderer.domElement)

      //创建光线投射器
      raycaster = new THREE.Raycaster();
      //定义鼠标向量
      mouse = new THREE.Vector2();
      //点击动作
      document.addEventListener('click', function(event){
        // event.preventDefault();
        console.log(event)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        renderRaycasterObj(raycaster, scene, camera, mouse);
      },false);

      //动画效果
      requestAnimationFrame(animate);
    }

    function renderRaycasterObj(raycaster, scene, camera, mouse) {
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects([Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune]);
      console.log(intersects);
      if(intersects.length > 0) {
        switch (intersects[0].object.name) {
          // case 'Sun': camera.position.set(50, 50, 50); camera.lookAt(new THREE.Vector3(50, 50, 0)); orbitControls.target = new THREE.Vector3(50, 50, 50);break;
          case 'Sun': cameraAnimation(camera.position, {x: 50, y: 50, z: 50}, {x: 50, y: 50, z: 0}); break;
          default: break;
        }
      }
      else {
        // camera.position.set(380,380,380);
        // camera.lookAt(new THREE.Vector3(0,0,0));
        cameraAnimation(camera.position, {x: 380, y: 380, z: 380}, {x: 0, y: 0, z: 0})
      }
    }

    function animate() {
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
      
      TWEEN.update();
      requestAnimationFrame(animate);
      labelRenderer.render(scene, camera);
      renderer.render(scene, camera);
    }

    function cameraAnimation(current, target, lookAtTarget) {
      var tween = new TWEEN.Tween({
        x: current.x, // 相机当前位置x
        y: current.y, // 相机当前位置y
        z: current.z, // 相机当前位置z
      });
      tween.to({
        x: target.x, // 新的相机位置x
        y: target.y, // 新的相机位置y
        z: target.z, // 新的相机位置z
      },1000);
      tween.onUpdate(function(object){
        camera.position.set(object.x, object.y, object.z);
        camera.lookAt(new THREE.Vector3(lookAtTarget.x, lookAtTarget.y, 0));
        // orbitControls.target = new THREE.Vector3(object.x, object.y, object.z);
      });
      tween.onComplete(function(){
        // orbitControls.enabled = true;
      });
      tween.start();
    }

    function addSun(radius) {
      let sunGeometry = new THREE.SphereGeometry(radius, 100, 100);
      let sunTexture = new THREE.TextureLoader().load(require('./assets/sun.jpg'));
      let sunMaterial = new THREE.MeshPhongMaterial({ map: sunTexture});
      let sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.name = 'Sun';
      sun.position.set(0,0,0);

      return sun;
    }

    function createText(text, position) {
      let labelDiv = document.createElement('div');
      labelDiv.className = 'label';
      labelDiv.textContent = text;
      labelDiv.style.marginTop = '-1em';
      let modelLabel = new CSS2DObject(labelDiv);
      modelLabel.position.set(position.x, position.y, position.y);
      return modelLabel;
    }

    function addPlanet(radius, position, texture, name) {
      let planetGeometry = new THREE.SphereGeometry(radius, 50, 50);
      let planetMaterial = new THREE.MeshPhongMaterial({ map: texture});
      let planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.name = name;
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
      let sunLight = new THREE.PointLight(0xddddaa,1.5,500);
      scene.add(sunLight);
      let ambient = new THREE.AmbientLight(0xfc7f4f4);
      scene.add(ambient);
    }

    function starsBackground() {
      const particles = 20000; //星星数量
      const bufferGeometry = new THREE.BufferGeometry();

      let positions = new Float32Array(particles * 3);
      let colors = new Float32Array(particles * 3);

      let color = new THREE.Color();

      const gap = 1000;

      for ( let i = 0; i < positions.length; i += 3 ) {
        // positions
      
        /*-2gap < x < 2gap */
        let x = ( Math.random() * gap *2 )* (Math.random()<.5? -1 : 1);
        let y = ( Math.random() * gap *2 )* (Math.random()<.5? -1 : 1);
        let z = ( Math.random() * gap *2 )* (Math.random()<.5? -1 : 1);
      
        /*找出x,y,z中绝对值最大的一个数*/
        let biggest = Math.abs(x) > Math.abs(y) ? Math.abs(x) > Math.abs(z) ?　'x' : 'z' :
          Math.abs(y) > Math.abs(z) ? 'y' : 'z';
      
        let pos = { x, y, z};
      
        /*如果最大值比n要小（因为要在一个距离之外才出现星星）则赋值为n（-n）*/
        if(Math.abs(pos[biggest]) < gap) pos[biggest] = pos[biggest] < 0 ? -gap : gap;
      
        x = pos['x'];
        y = pos['y'];
        z = pos['z'];
      
        positions[ i ]     = x;
        positions[ i + 1 ] = y;
        positions[ i + 2 ] = z;
      
        // colors
        /*70%星星有颜色*/
        let hasColor = Math.random() > 0.3;
        let vx, vy, vz;

        if(hasColor){
            vx = 0 ;
            vy = 0 ;
            vz = 0 ;
        }else{
            vx = 1 ;
            vy = 1 ;
            vz = 1 ;
        }
        color.setRGB( vx, vy, vz );
        colors[ i ]     = color.r;
        colors[ i + 1 ] = color.g;
        colors[ i + 2 ] = color.b;
      }
      bufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
      bufferGeometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
      bufferGeometry.computeBoundingSphere();

      /*星星的material*/
      let material = new THREE.PointsMaterial( { size: 6, vertexColors: THREE.VertexColors } );
      let particleSystem = new THREE.Points( bufferGeometry, material );
      scene.add( particleSystem );

    }
  }

  render () {
    return (
      <div style={{width: '100%', height: '100vh'}} id='scene'/>
    )
  }
}
