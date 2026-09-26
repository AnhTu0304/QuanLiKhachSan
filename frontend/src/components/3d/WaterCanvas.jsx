import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaterCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom Shader Material for 3D Water Wave Ripple (Adapted for Light Sand Theme)
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScrollY: { value: 0 }
    };

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScrollY;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Wave synthesis
        float wave1 = sin(pos.x * 2.0 + uTime * 1.2) * 0.25;
        float wave2 = cos(pos.y * 2.5 + uTime * 1.5) * 0.20;
        float wave3 = sin((pos.x + pos.y) * 3.0 + uTime * 2.0) * 0.15;
        
        // Mouse influence
        float distToMouse = distance(uv, uMouse);
        float mouseWave = sin(distToMouse * 10.0 - uTime * 4.0) * exp(-distToMouse * 3.0) * 0.3;

        // Scroll influence
        float scrollEffect = sin(pos.y * 1.5 + uScrollY * 0.002) * 0.1;

        float elevation = wave1 + wave2 + wave3 + mouseWave + scrollEffect;
        pos.z += elevation;

        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Bright natural ocean turquoise & warm sand gold palette
        vec3 seaTurquoise = vec3(0.30, 0.65, 0.75); // Bright coastal sea
        vec3 sunlitSand = vec3(0.94, 0.86, 0.70);   // Warm sand gold
        vec3 crestHighlight = vec3(1.0, 0.95, 0.80); // Sparkling sunlight

        // Mix colors based on wave height
        float mixFactor = smoothstep(-0.4, 0.4, vElevation);
        vec3 waterColor = mix(sunlitSand, seaTurquoise, mixFactor);

        // Add specular gold highlight on crests
        float highlight = pow(smoothstep(0.2, 0.45, vElevation), 3.0);
        waterColor += crestHighlight * highlight * 0.4;

        // Vignette effect
        float distFromCenter = distance(vUv, vec2(0.5));
        float alpha = smoothstep(0.8, 0.2, distFromCenter) * 0.45; // Soft opacity overlay

        gl_FragColor = vec4(waterColor, alpha);
      }
    `;

    // Plane geometry
    const geometry = new THREE.PlaneGeometry(16, 12, 96, 96);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.35;
    scene.add(mesh);

    // Event listeners
    const handleMouseMove = (e) => {
      uniforms.uMouse.value.x = e.clientX / window.innerWidth;
      uniforms.uMouse.value.y = 1.0 - (e.clientY / window.innerHeight);
    };

    const handleScroll = () => {
      uniforms.uScrollY.value = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
};

export default WaterCanvas;
