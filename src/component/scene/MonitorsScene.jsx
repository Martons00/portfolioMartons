import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



export default function MonitorsScene() {
  const mountRef = useRef(null)
  const posBall = [0.25, 0.80, 0.1]
  // centro 1* tv [0.2, 1.05, 0] 
  // X Asse nella direzione degli schermi > a dx
  // Y Altezza da terra
  // Z Profondità > avanti 
  const posCamera = [0, 0.20, 0.6]
  const lookAtCamera = [0.25, 0, 0.1]

  const posMonitor = {
    m_0: {
      poscam : [0.2, 1.05, 0.5],
      lookat : [0.2, 1.05, 0]
    },
    m_1: {
      poscam : [0, 0.70, 0.6],
      lookat : [0.25, 0.80, 0.1]
    }
  }


  useEffect(() => {
    const container = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )



    camera.position.set(...posCamera)
    camera.lookAt(new THREE.Vector3(...lookAtCamera))



    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp'
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    
    // ========== MODALITÀ BAKED ==========
    renderer.shadowMap.enabled = true // Disabilita shadow realtime
    // =====================================


    container.appendChild(renderer.domElement)



    // ========== LUCI PER BAKED ==========
    // Solo ambient light - le ombre sono già nella texture
    scene.add(new THREE.AmbientLight(0xffffff, 1.0))
    
    // Opzionale: light leggero per uniformare
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.4))
    
    // Rimuovi o disabilita le directional lights
    // perché con baked non servono a molto
    // =====================================


    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(...lookAtCamera)
    controls.update()




    // ========== PALLINA ROSSA ==========
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x330000
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(...posBall)
    sphere.castShadow = false // Disabilita per baked
    sphere.receiveShadow = false // Disabilita per baked
    scene.add(sphere)
    // ===================================



    const clock = new THREE.Clock()
    let mixer = null



    const loader = new GLTFLoader()
    loader.load(
      '/portfolioMartons/models/monitors.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        model.scale.set(1, 1, 1)

        const box = new THREE.Box3().setFromObject(model)

        console.log("Model size:", box.getSize(new THREE.Vector3()))

        scene.add(model)



        // ========== PAVIMENTO BAKED ==========
        const floorGeometry = new THREE.PlaneGeometry(20, 20)
        
        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff, // Bianco per mostrare texture baked
          roughness: 0.5,
          metalness: 0.0,
          side: THREE.DoubleSide
        })
        
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        
        floor.rotation.x = -Math.PI / 2
        floor.position.y = 0
        floor.receiveShadow = true // Disabilita per baked
        
        scene.add(floor)
        console.log("Floor position:", floor.position.y, "Model min:", box.min.y)
        // =====================================



        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }



        console.log('Modello bounds:', box, gltf.animations)
      },
      undefined,
      (error) => console.error('Errore caricamento modello:', error)
    )



    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)



    const animate = () => {
      requestAnimationFrame(animate)
      const delta = clock.getDelta()
      
      if (mixer) {
        mixer.update(delta)
      }


      controls.update()
      renderer.render(scene, camera)
    }
    animate()



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
      style={{ width: '100%', height: '300px' }}
    />
  )
}
