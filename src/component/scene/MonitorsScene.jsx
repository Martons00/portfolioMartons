import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default function MonitorsScene() {
  const mountRef = useRef(null)
  const posBall = [0, 0, 1]


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


    camera.position.set(0, 0, 2.5)
    camera.lookAt(0, 0, 0)


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
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowShadowMap
    container.appendChild(renderer.domElement)


    // Luci scure e tenebroso
    scene.add(new THREE.AmbientLight(0x1a1a1a, 0.2))
    scene.add(new THREE.HemisphereLight(0x111111, 0x0a0a0a, 0.3))

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight1.position.set(2, 3, 2)
    scene.add(dirLight1)
    
    const dirLight2 = new THREE.DirectionalLight(0x0066ff, 0.4)
    dirLight2.position.set(-2, -1, 1)
    scene.add(dirLight2)


    const controls = new OrbitControls(camera, renderer.domElement)


    // ========== PALLINA ROSSA ==========
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000, // Rosso
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x330000 // Leggero glow
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(...posBall) // Posiziona la pallina
    sphere.castShadow = true
    sphere.receiveShadow = true
    scene.add(sphere)
    // ===================================


    // ========== ANIMAZIONE CAMERA ==========
    let animationTarget = null
    let animationStart = null
    let isAnimating = false
    const animationDuration = 1000


    const animateCamera = (preset) => {
      if (isAnimating) return

      isAnimating = true
      controls.enabled = false

      animationTarget = {
        position: new THREE.Vector3(...preset.position),
        lookAt: new THREE.Vector3(...preset.lookAt)
      }
      animationStart = Date.now()
    }

    const lerp = (start, end, t) => {
      return start + (end - start) * t
    }
    // =====================================


    const clock = new THREE.Clock()
    let mixer = null


    // ========== AUTO-CAMERA DOPO 5 SECONDI ==========
    let sceneLoadedTime = null
    const cameraPresets = [
      { position: [0, 0, 2.5], lookAt: [0, 0, 0] },
      { position: [3.0, 0, 0], lookAt: [0, 0, 0] },
      { position: [2.0, 2.0, 2.0], lookAt: [0, 0, 0] },
      { position: [0, 3.0, 0], lookAt: [0, 0, 0] }
    ]
    let currentPresetIndex = 0
    // =======================================


    const loader = new GLTFLoader()
    loader.load(
      '/portfolioMartons/models/monitors.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        model.scale.set(1, 1, 1)


        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)


        console.log("Model size:", box.getSize(new THREE.Vector3()))


        scene.add(model)


        // ========== PAVIMENTO RIFLETTENTE ==========
        const floorGeometry = new THREE.PlaneGeometry(20, 20)
        
        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          roughness: 0.4,
          metalness: 0.7
        })
        
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        
        floor.rotation.x = -Math.PI / 2
        floor.position.y = box.min.z - 0.01
        
        scene.add(floor)
        console.log("Floor position:", floor.position.y, "Model min:", box.min.y)
        // ===========================================


        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }


        console.log('Modello bounds:', box, gltf.animations)
        
        sceneLoadedTime = Date.now()
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

      // ========== ANIMA PALLINA ROSSA ==========
      sphere.rotation.x += 0.005
      sphere.rotation.y += 0.008
      sphere.position.y += Math.sin(Date.now() * 0.001) * 0.002 // Movimento su/giù
      // ========================================


      // ========== AUTO-CAMERA ANIMATION ==========
      if (sceneLoadedTime && Date.now() - sceneLoadedTime > 5000) {
        const timeSinceLoad = Date.now() - sceneLoadedTime
        const cameraChangeInterval = 4000

        if (!isAnimating && timeSinceLoad % cameraChangeInterval < animationDuration) {
          const presetToUse = cameraPresets[(currentPresetIndex) % cameraPresets.length]
          animateCamera(presetToUse)
          currentPresetIndex++
        }
      }


      // // Update animazione camera
      // if (animationTarget && animationStart) {
      //   const elapsed = Date.now() - animationStart
      //   const progress = Math.min(elapsed / animationDuration, 1)

      //   const easeProgress = progress < 0.5 
      //     ? 2 * progress * progress 
      //     : -1 + (4 - 2 * progress) * progress

      //   camera.position.x = lerp(camera.position.x, animationTarget.position.x, easeProgress)
      //   camera.position.y = lerp(camera.position.y, animationTarget.position.y, easeProgress)
      //   camera.position.z = lerp(camera.position.z, animationTarget.position.z, easeProgress)

      //   camera.lookAt(animationTarget.lookAt)

      //   if (progress >= 1) {
      //     animationTarget = null
      //     animationStart = null
      //     isAnimating = false
      //     controls.enabled = true
      //   }
      // }
      // // ==========================================


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
