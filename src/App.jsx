import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { SpriteAnimator, DragControls } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
import './App.css'

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Sprej(props) {
  const frontTexture = useTexture('./assets/PP.png')
  const meshRef2 = useRef()
  return (
    <DragControls>
      <mesh {...props} ref={meshRef2}>

        {/* <planeBufferGeometry attach="geometry" /> */}
        <planeGeometry args={[1, 2]} />
        {/* <meshBasicMaterial color="#fff8eb" /> */}
        <meshBasicMaterial transparent='true' attach="material" map={frontTexture} />
      </mesh>
    </DragControls>
  )
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Canvas orthographic camera={{ zoom: 50, near: 0.1, far: 1000, position: [0, 0, 100] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

          <Sprej position={[6, 0, 0]} />

          <SpriteAnimator
            position={[2, 0, 0]}
            startFrame={0}
            meshProps={{ frustumCulled: false, scale: 2.5 }}
            autoPlay={true}
            loop={true}

            numberOfFrames={6}
            textureImageURL={'./flame.png'}
            textureDataURL={'./flame.json'}

          />



          <Box position={[-1.2, 0, 0]} />
        </Suspense>

        {/*<Box position={[1.2, 0, 0]} /> */}
      </Canvas>
    </>
  )
}

export default App
