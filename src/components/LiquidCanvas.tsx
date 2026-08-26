import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types/portfolio';

interface LiquidCanvasProps {
  theme: ThemeMode;
  viscosity?: number; // 0.1 to 1.0
  dispersion?: number; // 0.0 to 0.1
  interactive?: boolean;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uTime;
  uniform float uTheme; // 0.0 = dark, 1.0 = light, 2.0 = obsidian
  uniform float uViscosity;
  uniform float uDispersion;

  // Simplex 2D noise helpers
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / min(uResolution.x, uResolution.y), uResolution.y / min(uResolution.x, uResolution.y));
    vec2 uv = (vUv - 0.5) * aspect;
    vec2 mouse = (uMouse - 0.5) * aspect;
    
    // Slow, serene liquid flow
    float t = uTime * 0.25;
    
    // Dynamic distance to pointer
    float distMouse = length(uv - mouse);
    float mouseInfluence = smoothstep(0.65, 0.0, distMouse);
    
    // Multi-octave organic liquid displacement
    float n1 = snoise(uv * 1.8 + vec2(t * 0.4, t * 0.3));
    float n2 = snoise(uv * 3.2 - vec2(t * 0.2, -t * 0.35));
    float n3 = snoise(uv * 5.0 + vec2(n1, n2) * (1.2 - uViscosity * 0.4));
    
    // Liquid ripple wave from mouse
    float wave = sin(distMouse * 22.0 - uTime * 4.0) * exp(-distMouse * 3.5) * mouseInfluence;
    
    vec2 distortion = vec2(n1, n2) * 0.12 + vec2(wave) * 0.08;
    
    // Base colors matching theme - calibrated for ultra-crisp typography contrast
    vec3 baseColor;
    vec3 tintPrimary;
    vec3 tintSecondary;
    vec3 specularLight;
    
    if (uTheme > 1.5) {
      // Obsidian deep mode
      baseColor = vec3(0.0, 0.0, 0.0);
      tintPrimary = vec3(0.02, 0.15, 0.22); // Deep subtle cyan
      tintSecondary = vec3(0.12, 0.05, 0.20); // Subdued violet
      specularLight = vec3(0.4, 0.6, 0.8);
    } else if (uTheme > 0.5) {
      // Light crystal mode
      baseColor = vec3(0.97, 0.98, 0.99);
      tintPrimary = vec3(0.85, 0.92, 0.98); // Frosted soft sky
      tintSecondary = vec3(0.95, 0.88, 0.96); // Soft pearl
      specularLight = vec3(0.8, 0.8, 0.8);
    } else {
      // Dark Sleek Mode (Default)
      baseColor = vec3(0.027, 0.027, 0.035);
      tintPrimary = vec3(0.02, 0.20, 0.28); // Subtle deep aqua
      tintSecondary = vec3(0.08, 0.06, 0.22); // Subtle midnight indigo
      specularLight = vec3(0.5, 0.7, 0.9);
    }
    
    // Chromatic dispersion offsets
    float disp = uDispersion;
    float r = snoise((uv + distortion + vec2(disp, 0.0)) * 2.0 + t * 0.15);
    float g = snoise((uv + distortion) * 2.0 + t * 0.15);
    float b = snoise((uv + distortion - vec2(disp, 0.0)) * 2.0 + t * 0.15);
    
    vec3 liquid = mix(tintPrimary, tintSecondary, (r + g + b) * 0.333 + 0.5);
    
    // Specular glass highlight calculation
    vec2 normal = normalize(vec2(r - g, g - b) + distortion * 2.0);
    vec2 lightDir = normalize(vec2(0.5, 0.8) + (mouse - uv) * 0.5);
    float spec = pow(max(dot(normal, lightDir), 0.0), 32.0) * 0.15;
    
    // Final blend with backdrop - gentle, non-intrusive intensity
    float intensity = smoothstep(-0.3, 0.9, n3) * 0.18 + mouseInfluence * 0.12;
    vec3 finalColor = mix(baseColor, liquid, intensity) + specularLight * spec;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const LiquidCanvas: React.FC<LiquidCanvasProps> = ({
  theme,
  viscosity = 0.5,
  dispersion = 0.035,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const targetMousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      antialias: false,
      powerPreference: 'high-performance'
    });

    if (!gl) {
      console.warn('WebGL not supported, falling back gracefully.');
      return;
    }

    // Compile Shaders
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionLocation = gl.getAttribLocation(program, 'position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uTheme = gl.getUniformLocation(program, 'uTheme');
    const uViscosity = gl.getUniformLocation(program, 'uViscosity');
    const uDispersion = gl.getUniformLocation(program, 'uDispersion');

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Render at half-res for ultra high 120fps smoothness then upscale via CSS
      canvas.width = Math.floor(width * dpr * 0.75);
      canvas.height = Math.floor(height * dpr * 0.75);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      targetMousePos.current = {
        x: clientX / window.innerWidth,
        y: 1.0 - (clientY / window.innerHeight) // WebGL y-flipped
      };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Smooth dampening towards cursor
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.08;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.08;

      gl.useProgram(program);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mousePos.current.x, mousePos.current.y);

      const themeVal = theme === 'obsidian' ? 2.0 : theme === 'light' ? 1.0 : 0.0;
      gl.uniform1f(uTheme, themeVal);
      gl.uniform1f(uViscosity, viscosity);
      gl.uniform1f(uDispersion, dispersion);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animFrameId.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [theme, viscosity, dispersion, interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="liquid-optical-canvas"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: theme === 'light' ? 0.4 : 0.3 }}
    />
  );
};
