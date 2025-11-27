import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function HackerRoomScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,                                  // 1: FOV (field of view)
      container.clientWidth / container.clientHeight, // 2: aspect ratio
      0.1,                                 // 3: near plane
      200                                  // 4: far plane
    );

    camera.position.set(60, 30, 60)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Luci forti per risolvere modelli scuri
    scene.add(new THREE.AmbientLight(0xffffff, 0.01))
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.05))

    const dirLight1 = new THREE.DirectionalLight(0xBF40BF, 0.15)
    dirLight1.position.set(60, 30, 0)
    scene.add(dirLight1)
    const dirLight2 = new THREE.DirectionalLight(0xBF40BF, 0.15)
    dirLight2.position.set(0, 30, 60)
    scene.add(dirLight2)

    const controls = new OrbitControls(camera, renderer.domElement)

    const clock = new THREE.Clock();
    let mixer = null;

    const loader = new GLTFLoader();
    loader.load(
      '/portfolioMartons/models/hacker_room.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(0.2, 0.2, 0.2);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        scene.add(model);

        // NEW: imposta il mixer e avvia la prima animazione
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]); // o per nome clip
          action.play();
        }

        console.log('Modello bounds:', box, gltf.animations);
      },
      undefined,
      (error) => console.error('Errore caricamento modello:', error)
    );


    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);   // NEW: fa avanzare l’animazione
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();


    return () => {
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '300px' }}   // <── invece di 100vw/100vh
    />
  );
}
