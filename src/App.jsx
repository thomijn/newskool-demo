import { Canvas } from '@react-three/fiber'
import { Environment, Float, Lightformer, OrbitControls, Text } from '@react-three/drei'
import { Model } from './Model'
import { Leva } from 'leva'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

export default function App() {
  return (
    <main className='container'>
      <nav>
        <img style={{ filter: 'invert(1)' }} src="https://assets-global.website-files.com/64f1b0a9e8a78298d182e9a9/650d5b0746fbf5b70f7cd40e_Frame%20903.svg" alt="React Logo" />
      </nav>
      <Canvas style={{ borderRadius: 20 }} camera={{ position: [0, 0, 9], fov: 35 }}>
        <color attach="background" args={['#000']} />
        <Float
          enabled={false}
          speed={2}
          rotationIntensity={2}
          floatIntensity={0.5}
        >
          <Model rotation={[0, -Math.PI * 0.5, 0]} />
        </Float>
        <Environment resolution={4096}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
            <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
          </group>
        </Environment>
        <NewSkoolText />
      </Canvas>
      <Leva collapsed hidden />
    </main>
  )
}

const NewSkoolText = () => {
  const ref = useRef();

  useEffect(() => {
    // animate opacity and z position of text
    gsap.fromTo(ref.current.material, { opacity: 0 }, { opacity: 1, ease: 'power4.inOut', duration: 1, delay: 2.5 })
    gsap.fromTo(ref.current.position, { z: -1.5 }, { z: -1, ease: 'power4.inOut', duration: 1, delay: 2.5 })
  }, [])


  return (
    <Text ref={ref} letterSpacing={0.08} fontSize={2} position={[0, 0, -1.5]} rotation={[0, Math.PI * 0, 0]} font={'/BebasNeue-Regular.ttf'}>
      NEWSKOOL
    </Text>
  )
}

