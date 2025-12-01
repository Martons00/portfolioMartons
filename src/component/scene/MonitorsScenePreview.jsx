import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function MonitorsScenePreview() {
  const mountRef = useRef(null)

  const posBase = {
    posCam: [0, 0.5, 2.5],
    lookat: [0, 0.5, 0]
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
    camera.position.set(...posBase.posCam)
    camera.lookAt(new THREE.Vector3(...posBase.lookat))

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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // luce ambiente morbida, leggermente fredda
    scene.add(new THREE.AmbientLight(0xffffff, 5))

    // fill dall'alto, neutra
    const hemi = new THREE.HemisphereLight(0xdde4ff, 0x0b0b0e, 6)
    scene.add(hemi)

    // key light laterale calda
    const keyLight = new THREE.DirectionalLight(0x820101, 2)
    keyLight.position.set(0, 3, -1)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    keyLight.shadow.bias = -0.0005
    scene.add(keyLight)

    // spot tipo cono di luce dall'alto
    const spotLight = new THREE.SpotLight(0xffffff, 10, 5, Math.PI / 8, 0.3, 1)
    spotLight.position.set(0, 3, -1)
    spotLight.target.position.set(0, 0, 0)
    scene.add(spotLight)
    scene.add(spotLight.target)

    spotLight.castShadow = true
    spotLight.shadow.mapSize.set(1024, 1024)
    spotLight.shadow.bias = -0.0005

    const clock = new THREE.Clock()
    let mixer = null

    // ========= LOADER =========
    const loader = new GLTFLoader()
    loader.load(
      '/portfolioMartons/models/monitors.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        model.scale.set(1, 1, 1)

        const box = new THREE.Box3().setFromObject(model)
        model.castShadow = true
        scene.add(model)

        // ======= STANZA SEMPLIFICATA =======
        const dim_floor = 4

        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0x181818,
          roughness: 0.65,
          metalness: 0.3,
          side: THREE.DoubleSide
        })

        const room = new THREE.Group()
        scene.add(room)

        // ========== FLOOR ==========
        const floorGeometry = new THREE.PlaneGeometry(dim_floor, dim_floor)
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.position.y = 0
        floor.receiveShadow = true
        room.add(floor)

        // ========== MURI LATERALI ==========
        const wallLeft = new THREE.Mesh(floorGeometry, floorMaterial)
        wallLeft.position.set(0, dim_floor / 2, -dim_floor / 2)
        wallLeft.receiveShadow = true
        room.add(wallLeft)

        const wallRight = new THREE.Mesh(floorGeometry, floorMaterial)
        wallRight.position.set(dim_floor / 2, dim_floor / 2, 0)
        wallRight.rotation.y = -Math.PI / 2
        wallRight.receiveShadow = true
        room.add(wallRight)

        // ========== ROTAZIONE A 45° ==========
        room.rotation.y = Math.PI / 4
        room.position.y = box.min.y

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }
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
      if (mixer) mixer.update(delta)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}