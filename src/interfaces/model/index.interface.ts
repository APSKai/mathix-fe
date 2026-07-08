import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export type ViewState = {
    useHeightColor: boolean
    contourEnabled: boolean
    showTexture: boolean
    showMesh: boolean
    isRotating: boolean
    paletteMax: number
    fps: number
    showFps: boolean
}

export type SceneBundle = {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
}
