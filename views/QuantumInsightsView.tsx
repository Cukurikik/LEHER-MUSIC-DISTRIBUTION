
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = (ReactRouterDOM as any).default ?? ReactRouterDOM;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>);

const worldCities = [
  { name: 'Tokyo', country: 'Japan', lat: 35.6895, lon: 139.6917 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lon: 106.8456 },
  { name: 'Delhi', country: 'India', lat: 28.7041, lon: 77.1025 },
  { name: 'Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842 },
  { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
  { name: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.9780 },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
  { name: 'Shanghai', country: 'China', lat: 31.2304, lon: 121.4737 },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
  { name: 'New York City', country: 'United States', lat: 40.7128, lon: -74.0060 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125 },
  { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
  { name: 'Kolkata', country: 'India', lat: 22.5726, lon: 88.3639 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784 },
  { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lon: 3.3792 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lon: 67.0011 },
  { name: 'Kinshasa', country: 'DR Congo', lat: -4.4419, lon: 15.2663 },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173 },
  { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437 },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'Lima', country: 'Peru', lat: -12.0464, lon: -77.0428 },
  { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
  { name: 'Bogotá', country: 'Colombia', lat: 4.7110, lon: -74.0721 },
  { name: 'Tehran', country: 'Iran', lat: 35.6892, lon: 51.3890 },
  { name: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.8231, lon: 106.6297 },
  { name: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
  { name: 'Baghdad', country: 'Iraq', lat: 33.3152, lon: 44.3661 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753 },
  { name: 'Santiago', country: 'Chile', lat: -33.4489, lon: -70.6693 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
  { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lon: 101.6869 },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lon: 28.0473 },
  { name: 'Bangalore', country: 'India', lat: 12.9716, lon: 77.5946 },
  { name: 'Guangzhou', country: 'China', lat: 23.1291, lon: 113.2644 },
  { name: 'Shenzhen', country: 'China', lat: 22.5431, lon: 114.0579 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5204, lon: 74.3587 },
  { name: 'Chennai', country: 'India', lat: 13.0827, lon: 80.2707 },
  { name: 'Chicago', country: 'United States', lat: 41.8781, lon: -87.6298 },
  { name: 'Houston', country: 'United States', lat: 29.7604, lon: -95.3698 },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
];

export const QuantumInsightsView: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('monthly');

  const hotspots = useMemo(() => {
    return worldCities.map((city, index) => {
        const streams = Math.floor(Math.random() * 5000000) + 50000;
        const revenue = Math.floor(streams * (0.002 + Math.random() * 0.002));
        const demographics = ['Pop', 'Hip-Hop', 'Electronic', 'Indie', 'Rock', 'Dangdut', 'J-Pop', 'Sertanejo', 'Bollywood', 'Techno'];
        const topReleases = ['Urban Anthem', 'Sakura Dreams', 'Senja di Ibu Kota', 'London Calling', 'Ritmo Brasileiro', 'Underground Beat', 'Ocean Breeze', 'Desi Vibes', 'Amour Fou'];
        const colors = ['#FF69B4', '#00BFFF', '#FFD700', '#18D59C', '#FF4500', '#9C27B0', '#00FFFF', '#FF1493', '#FF6347'];

        return {
            id: city.name.toLowerCase().replace(/\s/g, '_'),
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            streams,
            revenue,
            demographics: `${demographics[index % demographics.length]}, ${demographics[(index + 3) % demographics.length]}`,
            topRelease: topReleases[index % topReleases.length],
            pulseColor: colors[index % colors.length]
        };
    });
  }, []);

  const latLonToCartesian = useCallback((lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const y = ((radius) * Math.sin(phi) * Math.sin(theta));
    const z = ((radius) * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  }, []);

  const makeTextSprite = useCallback((message: string, parameters: any) => {
    if (parameters === undefined) parameters = {};
    const fontface = parameters.fontface || 'Inter';
    const fontsize = parameters.fontsize || 24;
    const textColor = parameters.textColor || { r: 255, g: 255, b: 255, a: 1.0 };
    const strokeColor = parameters.strokeColor || { r: 0, g: 0, b: 0, a: 0.8 };

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = "Bold " + fontsize + "px " + fontface;
    
    const metrics = context.measureText(message);
    const textWidth = metrics.width;
    const textHeight = fontsize * 1.2;

    canvas.width = textWidth + 10;
    canvas.height = textHeight + 10;
    
    context.font = "Bold " + fontsize + "px " + fontface;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.strokeStyle = "rgba(" + strokeColor.r + "," + strokeColor.g + "," + strokeColor.b + "," + strokeColor.a + ")";
    context.lineWidth = 4;
    context.strokeText(message, canvas.width / 2, canvas.height / 2);

    context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + "," + textColor.b + "," + textColor.a + ")";
    context.fillText(message, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(canvas.width * 0.015, canvas.height * 0.015, 1); 
    return sprite;
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let globe: THREE.Mesh | null = null;
    let controls: OrbitControls | null = null;
    let animationId: number;
    
    // Store references for cleanup
    let cleanupMeshes: THREE.Object3D[] = [];
    let cleanupMaterials: THREE.Material[] = [];
    let cleanupGeometries: THREE.BufferGeometry[] = [];

    const onWindowResize = () => {
        if (!currentMount || !renderer || !camera) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    
    // Pointer interaction vars
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pulseMeshes: THREE.Mesh[] = [];
    let camera: THREE.PerspectiveCamera | null = null;

    const onPointerDown = (event: PointerEvent) => {
        if (!currentMount || !camera) return;
        const rect = currentMount.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pulseMeshes);

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object as THREE.Mesh;
            if (intersectedObject.userData.type === 'hotspot') {
                setSelectedRegion(intersectedObject.userData);
                setTooltipPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
            }
        } else {
            setSelectedRegion(null);
        }
    };


    try {
        const isMobile = currentMount.clientWidth < 768;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        scene.background = null;

        const globeRadius = isMobile ? 4 : 5;
        const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
        cleanupGeometries.push(globeGeometry);
        
        const textureLoader = new THREE.TextureLoader();
        const globeTexture = textureLoader.load(
        'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
        );

        const globeMaterial = new THREE.MeshPhongMaterial({
        map: globeTexture,
        color: 0xffffff,
        specular: 0x222222,
        shininess: 10,
        transparent: true,
        opacity: 0.95,
        });
        cleanupMaterials.push(globeMaterial);

        globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);
        cleanupMeshes.push(globe);

        const ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
        cleanupMeshes.push(ambientLight as any); // Type cast for cleanup convenience

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        cleanupMeshes.push(directionalLight as any);

        camera.position.z = isMobile ? 10 : 10;

        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = isMobile ? 6 : 7;
        controls.maxDistance = isMobile ? 15 : 20;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Add Hotspots
        hotspots.forEach(hotspot => {
            const position = latLonToCartesian(hotspot.lat, hotspot.lon, globeRadius + 0.05);

            const pulseGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            cleanupGeometries.push(pulseGeometry);
            const pulseMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(hotspot.pulseColor), transparent: true, opacity: 0.8 });
            cleanupMaterials.push(pulseMaterial);
            
            const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
            pulseMesh.position.copy(position);
            pulseMesh.userData = { ...hotspot, type: 'hotspot' };
            scene.add(pulseMesh);
            cleanupMeshes.push(pulseMesh);
            pulseMeshes.push(pulseMesh);

            const projectionHeight = 0.5 + (hotspot.streams / 7000000) * 2;
            const projectionGeometry = new THREE.CylinderGeometry(0.02, 0.02, projectionHeight, 8);
            cleanupGeometries.push(projectionGeometry);
            const projectionMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(hotspot.pulseColor), transparent: true, opacity: 0.6 });
            cleanupMaterials.push(projectionMaterial);
            
            const projectionMesh = new THREE.Mesh(projectionGeometry, projectionMaterial);
            projectionMesh.position.copy(position);
            if(globe) projectionMesh.lookAt(globe.position);
            projectionMesh.rotateX(Math.PI / 2);
            scene.add(projectionMesh);
            cleanupMeshes.push(projectionMesh);

            const sprite = makeTextSprite(hotspot.name, { textColor: { r: 255, g: 255, b: 255, a: 1.0 }, strokeColor: { r: 0, g: 0, b: 0, a: 0.8 } });
            sprite.position.copy(position);
            sprite.position.y += 0.5;
            scene.add(sprite);
            cleanupMeshes.push(sprite);
        });

        // Add Background Stars
        const numHotPoints = isMobile ? 1000 : 2000;
        for (let i = 0; i < numHotPoints; i++) {
            const lat = Math.random() * 180 - 90;
            const lon = Math.random() * 360 - 180;
            const streams = Math.random(); 

            const hotPointPosition = latLonToCartesian(lat, lon, globeRadius + 0.01);
            const hotPointGeometry = new THREE.SphereGeometry(0.01 + streams * 0.02, 8, 8);
            cleanupGeometries.push(hotPointGeometry);
            const hotPointMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6 - streams * 0.6, 1, 0.5 + streams * 0.3),
                transparent: true,
                opacity: 0.3 + streams * 0.7,
                blending: THREE.AdditiveBlending
            });
            cleanupMaterials.push(hotPointMaterial);

            const hotPointMesh = new THREE.Mesh(hotPointGeometry, hotPointMaterial);
            hotPointMesh.position.copy(hotPointPosition);
            scene.add(hotPointMesh);
            cleanupMeshes.push(hotPointMesh);
        }

        currentMount.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('resize', onWindowResize);

        const animate = () => {
            if (!renderer || !scene || !camera) return;
            animationId = requestAnimationFrame(animate);
            if (globe) globe.rotation.y += 0.001;
            
            pulseMeshes.forEach(mesh => {
                mesh.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.2);
                if (mesh.material instanceof THREE.MeshBasicMaterial) {
                   mesh.material.opacity = 0.6 + Math.sin(Date.now() * 0.005) * 0.2;
                }
            });
            
            if (controls) controls.update();
            renderer.render(scene, camera);
        };
        animate();

    } catch (error) {
        console.error("Failed to initialize WebGL context in QuantumInsightsView:", error);
    }


    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (currentMount) currentMount.removeEventListener('pointerdown', onPointerDown);
      if (animationId) cancelAnimationFrame(animationId);

      if (renderer) {
        if (currentMount && renderer.domElement.parentNode === currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        renderer.forceContextLoss();
      }

      if (controls) controls.dispose();
      
      // Cleanup Three.js resources
      cleanupGeometries.forEach(g => g.dispose());
      cleanupMaterials.forEach(m => m.dispose());
      cleanupMeshes.forEach(m => {
         if (scene) scene.remove(m);
      });
      
      if (scene) {
          scene.clear();
      }
    };
  }, [latLonToCartesian, makeTextSprite, hotspots]);

  const filteredHotspots = hotspots.filter(hotspot => {
    if (filter === 'all') return true;
    if (filter === 'pop' && hotspot.demographics.includes('Pop')) return true;
    if (filter === 'electronic' && hotspot.demographics.includes('Electronic')) return true;
    if (filter === 'hiphop' && hotspot.demographics.includes('Hip-Hop')) return true;
    return false;
  });

  return (
    <div className="w-full bg-ui-bg rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[600px] border border-ui-border">
      {/* Control Panel */}
      <div className={`
        absolute md:relative top-0 left-0 h-full w-72 md:w-72 
        bg-ui-surface/80 backdrop-blur-lg border-r border-ui-border 
        transition-transform duration-300 ease-in-out z-20 
        flex-shrink-0 flex flex-col space-y-6 p-6
        ${isPanelOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
         <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                Quantum Reach
             </h2>
             <Link to="/toolkit" className="text-ui-text-subtle hover:text-white"><ArrowLeftIcon className="w-6 h-6"/></Link>
        </div>
        <p className="text-ui-text-body text-sm">
          Explore your music's performance across the globe in real-time.
        </p>
        <div>
          <label htmlFor="filter-genre" className="block text-sm font-medium text-ui-text-subtle mb-2">Filter by Genre:</label>
          <select id="filter-genre" className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white focus:ring-cyan-500 focus:border-cyan-500 form-input-glow" value={filter} onChange={(e) => setFilter(e.target.value)} >
            <option value="all">All Genres</option>
            <option value="pop">Pop</option>
            <option value="electronic">Electronic</option>
            <option value="hiphop">Hip-Hop</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-timeframe" className="block text-sm font-medium text-ui-text-subtle mb-2">Timeframe:</label>
          <select id="filter-timeframe" className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white focus:ring-cyan-500 focus:border-cyan-500 form-input-glow" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Annual</option>
          </select>
        </div>
        <div className="mt-4 p-4 bg-ui-bg rounded-lg border border-ui-border flex-grow overflow-y-auto">
          <h3 className="text-lg font-semibold text-ui-text-heading mb-2">Top Hotspots</h3>
          <ul className="space-y-2 text-sm text-ui-text-body">
            {filteredHotspots.length > 0 ? (
              filteredHotspots.sort((a, b) => b.streams - a.streams).map(hotspot => (
                <li key={hotspot.id} className="flex justify-between items-center">
                  <span>{hotspot.name}</span>
                  <span className="text-cyan-400">{hotspot.streams.toLocaleString()}</span>
                </li>
              ))
            ) : ( <li>No hotspot data for this filter.</li> )}
          </ul>
        </div>
      </div>
      
      {/* Globe View */}
      <div className="flex-1 relative bg-transparent" ref={mountRef}>
         <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="md:hidden absolute top-4 left-4 z-30 p-2 bg-ui-surface/50 backdrop-blur-md rounded-full text-white">
            <MenuIcon className="w-6 h-6" />
        </button>
        {selectedRegion && (
            <div 
                className="absolute p-3 rounded-lg pointer-events-none transform -translate-x-1/2 -translate-y-full glass-surface-quantum shadow-2xl shadow-primary/20 min-w-[200px]"
                style={{ top: tooltipPosition.y - 10, left: tooltipPosition.x }}
            >
              <h4 className="text-lg font-bold text-cyan-300 mb-1">{selectedRegion.name}</h4>
              <p className="text-sm">Streams: <span className="font-semibold text-white">{selectedRegion.streams.toLocaleString()}</span></p>
              <p className="text-sm">Revenue (Est.): <span className="font-semibold text-white">${selectedRegion.revenue.toLocaleString()}</span></p>
            </div>
        )}
      </div>
    </div>
  );
};
