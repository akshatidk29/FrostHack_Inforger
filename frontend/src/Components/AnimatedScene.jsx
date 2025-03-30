import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Set size based on parent container
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Set camera position
    camera.position.z = 10;

    // Create main particles field
    const particleCount = 800;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Random positions and colors for particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Create cyan/blue/purple color scheme
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Cyan
        colors[i3] = 0;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else if (colorChoice < 0.66) {
        // Purple
        colors[i3] = 0.5 + Math.random() * 0.5;
        colors[i3 + 1] = 0;
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        // Blue
        colors[i3] = 0;
        colors[i3 + 1] = 0.3 + Math.random() * 0.3;
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create particle material with custom color support
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create digital grid
    const gridSize = 20;
    const gridDivisions = 20;
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0088ff,
      transparent: true,
      opacity: 0.3,
    });
    
    const gridGeometry = new THREE.BufferGeometry();
    const gridPositions = [];
    
    // Create horizontal lines
    for (let i = 0; i <= gridDivisions; i++) {
      const y = (i / gridDivisions) * gridSize - gridSize / 2;
      gridPositions.push(-gridSize / 2, y, 0);
      gridPositions.push(gridSize / 2, y, 0);
    }
    
    // Create vertical lines
    for (let i = 0; i <= gridDivisions; i++) {
      const x = (i / gridDivisions) * gridSize - gridSize / 2;
      gridPositions.push(x, -gridSize / 2, 0);
      gridPositions.push(x, gridSize / 2, 0);
    }
    
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPositions, 3));
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    grid.position.z = -5;
    scene.add(grid);

    // Create floating clocks
    const clockGroup = new THREE.Group();
    scene.add(clockGroup);
    
    const clockCount = 25;
    const clockFaces = [];
    const clockHands = [];
    const clockTimes = [];
    const clockSpeeds = [];
    
    for (let i = 0; i < clockCount; i++) {
      // Create clock face
      const clockRadius = 0.3 + Math.random() * 0.3;
      const clockGeometry = new THREE.CircleGeometry(clockRadius, 32);
      const clockMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x88ccff,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const clockFace = new THREE.Mesh(clockGeometry, clockMaterial);
      
      // Position clock randomly in space
      clockFace.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16
      );
      
      // Random rotation
      clockFace.rotation.x = Math.random() * Math.PI;
      clockFace.rotation.y = Math.random() * Math.PI;
      
      // Add clock markings (hour marks)
      const markingsMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      
      for (let h = 0; h < 12; h++) {
        const angle = (h / 12) * Math.PI * 2;
        const innerRadius = clockRadius * 0.8;
        const outerRadius = clockRadius * 0.95;
        
        const markGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius, 0.001,
          Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 0.001
        ]);
        markGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        
        const mark = new THREE.Line(markGeometry, markingsMaterial);
        clockFace.add(mark);
      }
      
      // Create clock hands
      const handsMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      
      // Hour hand
      const hourHandGeometry = new THREE.BufferGeometry();
      const hourHandVertices = new Float32Array([
        0, 0, 0.002,
        0, clockRadius * 0.5, 0.002
      ]);
      hourHandGeometry.setAttribute('position', new THREE.BufferAttribute(hourHandVertices, 3));
      const hourHand = new THREE.Line(hourHandGeometry, handsMaterial);
      
      // Minute hand
      const minuteHandGeometry = new THREE.BufferGeometry();
      const minuteHandVertices = new Float32Array([
        0, 0, 0.003,
        0, clockRadius * 0.7, 0.003
      ]);
      minuteHandGeometry.setAttribute('position', new THREE.BufferAttribute(minuteHandVertices, 3));
      const minuteHand = new THREE.Line(minuteHandGeometry, handsMaterial);
      
      // Second hand
      const secondHandGeometry = new THREE.BufferGeometry();
      const secondHandVertices = new Float32Array([
        0, 0, 0.004,
        0, clockRadius * 0.8, 0.004
      ]);
      secondHandGeometry.setAttribute('position', new THREE.BufferAttribute(secondHandVertices, 3));
      const secondHandMaterial = new THREE.LineBasicMaterial({ color: 0xff5555 });
      const secondHand = new THREE.Line(secondHandGeometry, secondHandMaterial);
      
      // Add hands to the clock face
      clockFace.add(hourHand);
      clockFace.add(minuteHand);
      clockFace.add(secondHand);
      
      // Add to scene
      clockGroup.add(clockFace);
      
      // Store references for animation
      clockFaces.push(clockFace);
      clockHands.push({
        hour: hourHand,
        minute: minuteHand,
        second: secondHand
      });
      
      // Set random starting time
      clockTimes.push({
        hour: Math.random() * 12,
        minute: Math.random() * 60,
        second: Math.random() * 60
      });
      
      // Set random clock speed (some run faster, some slower, some backwards)
      clockSpeeds.push((Math.random() * 2 - 0.5) * 5); // -2.5x to 7.5x normal speed
    }
    
    // Create digital time displays
    const timeDisplays = [];
    const timeValues = [];
    
    // Create binary time fragments (floating numbers)
    const createNumberFragments = () => {
      const fragmentGroup = new THREE.Group();
      
      const binaryDigits = Math.floor(Math.random() * 30) + 10;
      const fragmentMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
      });
      
      for (let i = 0; i < binaryDigits; i++) {
        const digit = Math.round(Math.random());
        const digitGeometry = new THREE.PlaneGeometry(0.1, 0.1);
        const digitMesh = new THREE.Mesh(digitGeometry, fragmentMaterial);
        
        // Position randomly in a flattened cube shape
        digitMesh.position.set(
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 0.2
        );
        
        // Add text
        digitMesh.userData = {
          value: digit,
          changeTime: Math.random() * 2
        };
        
        fragmentGroup.add(digitMesh);
      }
      
      // Position the entire fragment group
      fragmentGroup.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16
      );
      
      return fragmentGroup;
    };
    
    // Add several fragment groups
    const fragmentsCount = 8;
    const fragmentGroups = [];
    
    for (let i = 0; i < fragmentsCount; i++) {
      const fragments = createNumberFragments();
      scene.add(fragments);
      fragmentGroups.push(fragments);
    }

    // Create broken screen effect elements
    const brokenScreenGroup = new THREE.Group();
    scene.add(brokenScreenGroup);
    
    // Function to create a broken screen shard
    const createBrokenScreenShard = (position, size) => {
      // Create a random polygon shape for the shard
      const shardGeometry = new THREE.BufferGeometry();
      const vertices = [];
      
      // Create a center point
      const centerX = 0;
      const centerY = 0;
      
      // Create points around the center to form a polygon
      const pointCount = Math.floor(Math.random() * 4) + 3; // 3-6 points
      for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2;
        const radius = size * (0.5 + Math.random() * 0.5);
        vertices.push(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius,
          0
        );
      }
      
      shardGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      shardGeometry.setIndex([...Array(pointCount - 2).keys()].map(i => [0, i + 1, i + 2]).flat());
      
      // Create material with glitch effect
      const shardMaterial = new THREE.MeshBasicMaterial({ 
        color: Math.random() < 0.5 ? 0x00ffff : 0xff00ff, // Cyan or magenta
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const shard = new THREE.Mesh(shardGeometry, shardMaterial);
      shard.position.copy(position);
      
      // Add some jitter lines
      const jitterLinesCount = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < jitterLinesCount; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const lineVertices = [];
        
        const startX = -size * 0.5 + Math.random() * size;
        const startY = -size * 0.5 + Math.random() * size;
        lineVertices.push(startX, startY, 0.001);
        
        // Add jitter points
        const jitterPoints = Math.floor(Math.random() * 3) + 2;
        for (let j = 0; j < jitterPoints; j++) {
          lineVertices.push(
            startX + (Math.random() - 0.5) * size * 1.5,
            startY + (Math.random() - 0.5) * size * 1.5,
            0.001
          );
        }
        
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        shard.add(line);
      }
      
      // Add noise texture effect
      const noiseSize = Math.floor(Math.random() * 5) + 5;
      for (let i = 0; i < noiseSize; i++) {
        const noiseGeometry = new THREE.PlaneGeometry(size * 0.1, size * 0.1);
        const noiseMaterial = new THREE.MeshBasicMaterial({
          color: Math.random() < 0.5 ? 0xffffff : 0x00ffff,
          transparent: true,
          opacity: Math.random() * 0.5 + 0.2
        });
        
        const noise = new THREE.Mesh(noiseGeometry, noiseMaterial);
        noise.position.set(
          (Math.random() - 0.5) * size,
          (Math.random() - 0.5) * size,
          0.002
        );
        
        shard.add(noise);
      }
      
      return shard;
    };
    
    // Function to create a broken screen effect
    const createBrokenScreen = () => {
      // Clear previous broken screen effects
      while (brokenScreenGroup.children.length > 0) {
        const child = brokenScreenGroup.children[0];
        brokenScreenGroup.remove(child);
        
        // Dispose of geometries and materials
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
      
      // Create new broken screen effect
      const shardCount = Math.floor(Math.random() * 5) + 3; // 3-7 shards
      
      for (let i = 0; i < shardCount; i++) {
        // Random position in the scene
        const position = new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8
        );
        
        // Random size
        const size = Math.random() * 2 + 0.5;
        
        // Create shard
        const shard = createBrokenScreenShard(position, size);
        shard.userData = {
          lifespan: Math.random() * 0.5 + 0.5, // How long it will live
          originalPosition: position.clone(),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
          ),
          rotation: new THREE.Vector3(
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05
          )
        };
        
        brokenScreenGroup.add(shard);
      }
      
      // Create horizontal scan lines
      const scanLinesCount = Math.floor(Math.random() * 3) + 1; // 1-3 scan lines
      
      for (let i = 0; i < scanLinesCount; i++) {
        const scanWidth = Math.random() * 10 + 5;
        const scanHeight = Math.random() * 0.3 + 0.1;
        
        const scanGeometry = new THREE.PlaneGeometry(scanWidth, scanHeight);
        const scanMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending
        });
        
        const scanLine = new THREE.Mesh(scanGeometry, scanMaterial);
        
        // Position somewhere random in the scene
        scanLine.position.set(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8
        );
        
        scanLine.userData = {
          lifespan: Math.random() * 0.3 + 0.3,
          speed: (Math.random() - 0.5) * 0.5
        };
        
        brokenScreenGroup.add(scanLine);
      }
    };

    // Time variables for animation
    let time = 0;
    let lastGlitchTime = 0;
    let isGlitching = false;
    let glitchDuration = 0;
    let glitchIntensity = 0;
    let timeFlowDirection = 1;
    let timeJump = false;
    let nextBrokenScreenTime = Math.random()  + 1;

    // Animate scene
    const animate = () => {
      time += 0.01;
      
      // Time control variables
      const timeFlow = time * timeFlowDirection;
      
      // Glitch effect timing
      if (!isGlitching && Math.random() < 0.005) {
        isGlitching = true;
        glitchDuration = 0.2 + Math.random() * 0.8; // Random duration
        glitchIntensity = 0.3 + Math.random() * 0.7; // Random intensity
        lastGlitchTime = time;
        
        // Time glitch effects
        if (Math.random() < 0.5) {
          timeFlowDirection = -timeFlowDirection; // Reverse time
        }
        
        if (Math.random() < 0.3) {
          timeJump = true; // Make clocks jump
        }
        
        // Create broken screen effect during glitch
        createBrokenScreen();
        nextBrokenScreenTime = time + Math.random() * 0.5 + 0.2;
      }
      
      // Add additional broken screen effects during longer glitches
      if (isGlitching && time > nextBrokenScreenTime) {
        createBrokenScreen();
        nextBrokenScreenTime = time + Math.random() * 0.5 + 0.2;
      }
      
      if (isGlitching && time - lastGlitchTime > glitchDuration) {
        isGlitching = false;
        timeJump = false;
        timeFlowDirection = 1; // Reset time direction after glitching
      }

      // Animate particles
      const positions = particlesGeometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Normal movement - affected by time direction
        positions[i3] += velocities[i3] * timeFlowDirection;
        positions[i3 + 1] += velocities[i3 + 1] * timeFlowDirection;
        positions[i3 + 2] += velocities[i3 + 2] * timeFlowDirection;
        
        // Periodic boundary
        if (positions[i3] > 10) positions[i3] = -10;
        if (positions[i3] < -10) positions[i3] = 10;
        if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
        if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
        if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
        if (positions[i3 + 2] < -10) positions[i3 + 2] = 10;
        
        // Apply glitch effect
        if (isGlitching && Math.random() < 0.1) {
          positions[i3] += (Math.random() - 0.5) * glitchIntensity;
          positions[i3 + 1] += (Math.random() - 0.5) * glitchIntensity;
        }
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Animate grid
      grid.rotation.x = Math.sin(time * 0.2) * 0.1;
      grid.rotation.y = time * 0.1;
      
      // Apply camera glitch during glitch events
      if (isGlitching) {
        camera.position.x = (Math.random() - 0.5) * glitchIntensity * 0.2;
        camera.position.y = (Math.random() - 0.5) * glitchIntensity * 0.2;
        grid.material.opacity = 0.3 + Math.random() * 0.5;
      } else {
        camera.position.x *= 0.9; // Smoothly return to center
        camera.position.y *= 0.9;
        grid.material.opacity = 0.3;
      }
      
      // Animate clocks
      for (let i = 0; i < clockCount; i++) {
        // Update clock time
        let speedMultiplier = clockSpeeds[i];
        
        // During glitches, some clocks may run extremely fast or in reverse
        if (isGlitching) {
          if (Math.random() < 0.05) {
            speedMultiplier = Math.random() * 20 - 10; // Much faster/slower during glitches
          }
        }
        
        // Update time
        if (timeJump && Math.random() < 0.1) {
          // Random time jump during glitch
          clockTimes[i].hour = Math.random() * 12;
          clockTimes[i].minute = Math.random() * 60;
          clockTimes[i].second = Math.random() * 60;
        } else {
          // Normal time update
          clockTimes[i].second += 0.1 * speedMultiplier;
          
          // Roll over seconds to minutes
          if (clockTimes[i].second >= 60) {
            clockTimes[i].second -= 60;
            clockTimes[i].minute += 1;
          } else if (clockTimes[i].second < 0) {
            clockTimes[i].second += 60;
            clockTimes[i].minute -= 1;
          }
          
          // Roll over minutes to hours
          if (clockTimes[i].minute >= 60) {
            clockTimes[i].minute -= 60;
            clockTimes[i].hour += 1;
          } else if (clockTimes[i].minute < 0) {
            clockTimes[i].minute += 60;
            clockTimes[i].hour -= 1;
          }
          
          // Roll over hours
          if (clockTimes[i].hour >= 12) {
            clockTimes[i].hour -= 12;
          } else if (clockTimes[i].hour < 0) {
            clockTimes[i].hour += 12;
          }
        }
        
        // Set hand rotations
        const hourAngle = (clockTimes[i].hour + clockTimes[i].minute / 60) / 12 * Math.PI * 2 - Math.PI / 2;
        const minuteAngle = clockTimes[i].minute / 60 * Math.PI * 2 - Math.PI / 2;
        const secondAngle = clockTimes[i].second / 60 * Math.PI * 2 - Math.PI / 2;
        
        clockHands[i].hour.rotation.z = hourAngle;
        clockHands[i].minute.rotation.z = minuteAngle;
        clockHands[i].second.rotation.z = secondAngle;
        
        // Animate the clock faces
        clockFaces[i].rotation.x += Math.sin(time * 0.1) * 0.001;
        clockFaces[i].rotation.y += Math.cos(time * 0.1) * 0.001;
        
        // During glitches, some clocks may flicker or distort
        if (isGlitching && Math.random() < 0.1) {
          clockFaces[i].visible = Math.random() < 0.5;
          clockFaces[i].scale.set(
            1 + (Math.random() - 0.5) * 0.2,
            1 + (Math.random() - 0.5) * 0.2,
            1
          );
        } else {
          clockFaces[i].visible = true;
          clockFaces[i].scale.set(1, 1, 1);
        }
      }
      
      // Animate binary fragments
      fragmentGroups.forEach(group => {
        // Slow rotation of the fragment group
        group.rotation.x += 0.001;
        group.rotation.y += 0.002;
        
        // Animate each digit in the group
        group.children.forEach(digit => {
          digit.userData.changeTime -= 0.01;
          
          // Flicker and change more during glitches
          if (isGlitching || digit.userData.changeTime <= 0) {
            // Change binary value
            digit.userData.value = Math.round(Math.random());
            
            // Reset change timer
            digit.userData.changeTime = isGlitching ? 
              Math.random() * 0.5 : // Change rapidly during glitches
              Math.random() * 3; // Change less frequently normally
            
            // Flicker opacity
            digit.material.opacity = 0.5 + Math.random() * 0.5;
          }
          
          // Update appearance based on binary value
          if (digit.userData.value === 1) {
            digit.material.color.setRGB(0, 1, 1); // Cyan for 1
          } else {
            digit.material.color.setRGB(0, 0.5, 1); // Blue for 0
          }
        });
      });
      
      // Animate broken screen elements
      if (brokenScreenGroup.children.length > 0) {
        brokenScreenGroup.children.forEach((child, index) => {
          if (child.userData.lifespan !== undefined) {
            child.userData.lifespan -= 0.01;
            
            // If it's a shard
            if (child.userData.originalPosition) {
              // Move and rotate the shard
              child.position.add(child.userData.velocity);
              child.rotation.x += child.userData.rotation.x;
              child.rotation.y += child.userData.rotation.y;
              child.rotation.z += child.userData.rotation.z;
              
              // Fade out as lifespan decreases
              if (child.material) {
                child.material.opacity = Math.max(0, child.userData.lifespan);
              }
            }
            // If it's a scan line
            else if (child.userData.speed !== undefined) {
              child.position.y += child.userData.speed;
              
              // Fade out as lifespan decreases
              if (child.material) {
                child.material.opacity = Math.max(0, child.userData.lifespan);
              }
            }
            
            // Remove if lifespan is over
            if (child.userData.lifespan <= 0) {
              brokenScreenGroup.remove(child);
              
              // Dispose of geometries and materials
              if (child.geometry) child.geometry.dispose();
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(material => material.dispose());
                } else {
                  child.material.dispose();
                }
              }
            }
          }
        });
      }
      
      // Slow rotation of the entire particle system
      particles.rotation.y += 0.001 * timeFlowDirection;
      particles.rotation.x += 0.0005 * timeFlowDirection;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default AnimatedScene;