import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1, 3)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Luci forti per risolvere modelli scuri
    scene.add(new THREE.AmbientLight(0xffffff, 2))
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2))
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1)
    dirLight1.position.set(3, 5, 2)
    scene.add(dirLight1)
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 2)
    dirLight2.position.set(6, 6, 6)
    scene.add(dirLight2)

    const controls = new OrbitControls(camera, renderer.domElement)

    const loader = new GLTFLoader()
    loader.load(
      '/portfolioMartons/models/laptop.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        model.scale.set(50, 50, 50) // Aumenta la scala per modelli piccoli

        // Centra il modello nella scena
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        scene.add(model)
        console.log('Modello bounds:', box)
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

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}
