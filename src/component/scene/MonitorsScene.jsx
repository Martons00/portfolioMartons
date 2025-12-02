import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { projects } from '../../data/resumeData.json'


export default function MonitorsScene({ currentIndex, setCurrentIndex }) {
  const mountRef = useRef(null)



  // const posBall = [0, 0, 0]

  const posBase = {
    posCam: [0, 0.5, 2.5],
    lookat: [0, 0.5, 0]
  }

  const projectsTitles = projects.map(project => project.name)

  const posMonitor = {
    0: {
      poscircle: [0.4, 1.15, 0.3],
      poscam: [0.2, 1.05, 0.7],
      lookat: [0.2, 1.05, 0]
    },
    1: {
      poscircle: [0.6, 0.80, 0.3],
      poscam: [0, 0.70, 0.8],
      lookat: [0.25, 0.80, 0.1]
    },
    2: {
      poscircle: [- 0.45, 0.90, -0.1],
      poscam: [- 0.35, 0.80, 0.6],
      lookat: [- 0.2, 0.80, 0]
    },
    3: {
      poscircle: [0.65, 0.45, 0.3],
      poscam: [0.5, 0.45, 0.8],
      lookat: [0.4, 0.45, 0.1]
    },
    4: {
      poscircle: [- 0.78, 0.45, 0],
      poscam: [- 0.8, 0.45, 0.6],
      lookat: [- 0.4, 0.45, 0]
    },
    5: {
      poscircle: [0.75, 0.2, 0.3],
      poscam: [0.5, 0.2, 0.8],
      lookat: [0.4, 0.2, 0.1]
    },
    6: {
      poscircle: [- 0.73, 0.2, 0],
      poscam: [- 0.7, 0.2, 0.7],
      lookat: [- 0.35, 0.2, 0]
    },
    7: {
      poscircle: [0.1, 0.1, 0.4],
      poscam: [- 0.2, 0.2, 0.7],
      lookat: [0.1, 0.2, 0]
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
    camera.position.set(...posBase.posCam)
    camera.lookAt(new THREE.Vector3(...posBase.lookat))

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // limita il pixel ratio
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // luce ambiente morbida, leggermente fredda
    scene.add(new THREE.AmbientLight(0xffffff, 5))

    // fill dall’alto, neutra
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
    // colore, intensità, distanza, angolo, penumbra, decay

    spotLight.position.set(0, 3, -1)      // punto da cui parte il cono
    spotLight.target.position.set(0, 0, 0) // dove punta il cono (centro scena)
    scene.add(spotLight)
    scene.add(spotLight.target)

    // ombre (opzionale)
    spotLight.castShadow = true
    spotLight.shadow.mapSize.set(1024, 1024)
    spotLight.shadow.bias = -0.0005



    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(...posBase.lookat)
    controls.update()

    // ======= PALLINA ROSSA CENTRALE =======
    // const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32)
    // const sphereMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   roughness: 0.3,
    //   metalness: 0.7,
    //   emissive: 0x330000
    // })
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    // sphere.position.set(...posBall)
    // scene.add(sphere)

    const clock = new THREE.Clock()
    let mixer = null

    // ========= ANIMAZIONE CAMERA =========
    let camStartPos = new THREE.Vector3().copy(camera.position)
    let camStartTarget = new THREE.Vector3().copy(controls.target)
    let camEndPos = new THREE.Vector3().copy(camera.position)
    let camEndTarget = new THREE.Vector3().copy(controls.target)
    let camAnimTime = 0
    const camAnimDuration = 0.8
    let camAnimating = false

    const startCameraAnimation = (pos, look) => {
      camStartPos.copy(camera.position)
      camStartTarget.copy(controls.target)
      camEndPos.set(...pos)
      camEndTarget.set(...look)
      camAnimTime = 0
      camAnimating = true
    }
    // =====================================

    // ========= HOTSPOT SETUP =========
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const hotspots = []

    function createHotspot(label, monitorData) {
      const size = 256
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2)
      ctx.fill()

      ctx.lineWidth = size * 0.05
      ctx.strokeStyle = 'rgba(0,0,0,0.9)'
      ctx.stroke()

      ctx.fillStyle = '#000'
      ctx.font = `${size * 0.4}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(parseInt(label) + 1, size / 2, size / 2)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(material)
      sprite.position.set(...monitorData.poscircle)
      sprite.scale.set(0.15, 0.15, 0.15)
      sprite.userData.id = label
      scene.add(sprite)
      hotspots.push(sprite)
    }



    function onClick(event) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(hotspots, true)
      if (intersects.length > 0) {
        const hotspot = intersects[0].object
        const id = hotspot.userData.id
        const data = posMonitor[id]
        if (data) {
          setCurrentIndex(id)
          window.jumpToView?.(id)
          startCameraAnimation(data.poscam, data.lookat)
        }
      }
    }

    renderer.domElement.addEventListener('click', onClick)
    // ==================================

    // ========= LOADER =========
    const loader = new GLTFLoader()
    loader.load(
      'https://cdn.jsdelivr.net/gh/Martons00/portfolioMartons@main/public/models/monitors.glb',
      (gltf) => {
        const model = gltf.scene
        model.position.set(0, 0, 0)
        model.scale.set(1, 1, 1)

        const box = new THREE.Box3().setFromObject(model)
        console.log('Model size:', box.getSize(new THREE.Vector3()))
        model.castShadow = true
        scene.add(model)
        // ======= STANZA SEMPLIFICATA =======
        const dim_floor = 4

        // materiale condiviso
        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0x181818,
          roughness: 0.65,
          metalness: 0.3,
          side: THREE.DoubleSide
        })

        // gruppo stanza
        const room = new THREE.Group()
        scene.add(room)

        // ========== FLOOR ==========
        const floorGeometry = new THREE.PlaneGeometry(dim_floor, dim_floor)
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2   // sdraiato
        floor.position.y = 0
        floor.receiveShadow = true
        room.add(floor)

        // ========== MURI LATERALI ==========
        const wallLeft = new THREE.Mesh(floorGeometry, floorMaterial)
        // bordo sinistro del “cubo”
        wallLeft.position.set(0, dim_floor / 2, - dim_floor / 2)
        wallLeft.receiveShadow = true
        room.add(wallLeft)

        const wallRight = new THREE.Mesh(floorGeometry, floorMaterial)
        // bordo destro del “cubo”
        wallRight.position.set(dim_floor / 2, dim_floor / 2, 0)
        wallRight.rotation.y = -Math.PI / 2
        wallRight.receiveShadow = true
        room.add(wallRight)



        // ========== ROTAZIONE A 45° DI TUTTA LA STANZA ==========
        room.rotation.y = Math.PI / 4    // ora tutto il “cubo” è ruotato di 45°
        room.position.y = box.min.y  // rialza stanza se necessario




        Object.entries(posMonitor).forEach(([key, data]) => {
          createHotspot(key, data)
        })

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
      const elapsedTime = clock.getElapsedTime()
      if (mixer) mixer.update(delta)

      if (camAnimating) {
        camAnimTime += delta
        const t = Math.min(camAnimTime / camAnimDuration, 1)
        const s = t * t * (3 - 2 * t)
        camera.position.lerpVectors(camStartPos, camEndPos, s)
        const target = new THREE.Vector3().lerpVectors(camStartTarget, camEndTarget, s)
        controls.target.copy(target)
        if (t >= 1) camAnimating = false
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // esponi funzione per cambiare camera da React
    window.jumpToView = (key) => {
      if (key === 'base') {
        startCameraAnimation(posBase.posCam, posBase.lookat)
      } else if (posMonitor[key]) {
        startCameraAnimation(posMonitor[key].poscam, posMonitor[key].lookat)
      }
    }

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);

      controls.dispose();
      renderer.dispose();

      // libera geometrie/materiali
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose && m.dispose());
          } else {
            obj.material.dispose && obj.material.dispose();
          }
        }
      });

      container.removeChild(renderer.domElement);
      delete window.jumpToView;
    };

  }, [])

  // UI frecce + base
  const keys = Object.keys(posMonitor) // ["1","2",...]

  const goPrev = () => {
    if (!keys.length) return
    let idx = currentIndex === null ? 0 : keys.indexOf(String(currentIndex))
    idx = (idx - 1 + keys.length) % keys.length
    const k = keys[idx]
    setCurrentIndex(k)
    window.jumpToView?.(k)
  }

  const goNext = () => {
    if (!keys.length) return
    let idx = currentIndex === null ? -1 : keys.indexOf(String(currentIndex))
    idx = (idx + 1) % keys.length
    const k = keys[idx]
    setCurrentIndex(k)
    window.jumpToView?.(k)
  }

  const goBase = () => {
    setCurrentIndex(null)
    window.jumpToView?.('base')
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%' }}
      />
      {/* barra di navigazione tipo viewer */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 8px',
          borderRadius: 20,
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          fontSize: 12
        }}
      >
        <button onClick={goPrev} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          ‹
        </button>
        <span>{currentIndex ? `${projectsTitles[currentIndex]}` : 'Base'}</span>
        <button onClick={goNext} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          ›
        </button>
        <button
          onClick={goBase}
          style={{
            marginLeft: 8,
            padding: '2px 6px',
            borderRadius: 999,
            border: '1px solid #888',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Base
        </button>
      </div>
    </div>
  )
}

// in fondo al file MonitorsScene.jsx
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/portfolioMartons/models/monitors.glb');
