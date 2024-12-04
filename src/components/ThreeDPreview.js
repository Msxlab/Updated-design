
// components/ThreeDPreview.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useSelector } from 'react-redux';

export const ThreeDPreview = () => {
    const canvasRef = useRef();
    const { countertops } = useSelector(state => state.counterTop);
    
    useEffect(() => {
        // Three.js kurulumu
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        renderer.setClearColor(0xf0f0f0);
        
        // Işıklandırma
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Kamera pozisyonu
        camera.position.z = 5;
        camera.position.y = 3;
        camera.position.x = 3;
        
        // Kontroller
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // Tezgahları oluştur
        const createCountertop = (countertop) => {
            const geometry = new THREE.BoxGeometry(
                countertop.width / 10,
                countertop.depth / 10,
                countertop.height / 10
            );
            
            const material = new THREE.MeshPhongMaterial({
                color: 0xe0e0e0,
                specular: 0x111111,
                shininess: 30,
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                countertop.x / 100,
                0,
                countertop.y / 100
            );
            mesh.rotation.y = THREE.MathUtils.degToRad(countertop.rotation || 0);
            
            return mesh;
        };
        
        // Tezgahları scene'e ekle
        countertops.forEach(countertop => {
            scene.add(createCountertop(countertop));
        });
        
        // Grid helper
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
        
        // Animasyon döngüsü
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Cleanup
        return () => {
            scene.clear();
            renderer.dispose();
        };
    }, [countertops]);
    
    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                className="w-full h-full rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
                <p className="text-sm text-gray-600">
                    Mouse ile döndür ve yakınlaştır
                </p>
            </div>
        </div>
    );
};
