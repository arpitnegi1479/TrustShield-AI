import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Eye, 
  Fingerprint, 
  Network, 
  LogIn, 
  Cpu, 
  UserCheck, 
  Wallet, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Terminal, 
  Shield, 
  Globe 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // WebGL shader background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Sync drawing-buffer size with layout size
    const syncSize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
      }

      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
          
          // Deep Obsidian Base with slight indigo shift
          vec3 color = vec3(0.04, 0.04, 0.05);
          
          // Atmospheric "Signal Aurora"
          float aurora = noise(p * 0.5 + u_time * 0.05) * 0.5 + 0.5;
          color += vec3(0.05, 0.15, 0.1) * aurora * 0.2; // Faint green glow
          
          // Moving Signal Paths
          for(float i = 0.0; i < 4.0; i++) {
              float t = u_time * (0.05 + i * 0.02);
              float y = noise(vec2(p.x * 0.4, t + i * 15.0)) * 1.5 - 0.75;
              float dist = abs(p.y - y);
              float line = smoothstep(0.01, 0.0, dist);
              
              // Pulses along the line
              float pulse = smoothstep(0.2, 0.0, abs(fract(p.x * 0.15 - t * 2.0 + i * 0.5) - 0.5));
              
              vec3 signalColor = vec3(0.13, 0.77, 0.37); // Living Green
              color += signalColor * line * pulse * 0.3;
              color += signalColor * line * 0.03; // Static path faint glow
          }
          
          // Floating "Data Particles"
          for(float i = 0.0; i < 15.0; i++) {
              vec2 pos = vec2(
                  hash(vec2(i, 1.0)) * 2.0 - 1.0,
                  hash(vec2(i, 2.0)) * 2.0 - 1.0
              );
              pos.x += sin(u_time * 0.1 + i) * 0.1;
              pos.y += cos(u_time * 0.1 + i) * 0.1;
              float size = 0.002 + hash(vec2(i, 3.0)) * 0.003;
              float glow = smoothstep(size * 10.0, 0.0, length(p - pos));
              color += vec3(0.8, 1.0, 0.9) * glow * 0.15;
          }
          
          // Vignette for depth
          color *= 1.0 - length(p) * 0.4;
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    const loadShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      return;
    }

    gl['useProgram'](program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const render = (time: number) => {
      if (!canvas || !gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, time * 0.001);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseUniformLocation, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  // Intersection observers and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('nav-scrolled');
        } else {
          nav.classList.remove('nav-scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Simple Parallax for Floating Windows
    const handleWindowScroll = () => {
      const windows = document.querySelectorAll('.floating-window');
      const scrollY = window.scrollY;
      
      windows.forEach((win, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = -(scrollY * speed);
        (win as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleWindowScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="obsidian-texture font-body-md selection:bg-primary/30 min-h-screen text-[#e5e2e1] bg-[#050505]">
      {/* 1. Navigation */}
      <nav 
        id="main-nav" 
        className="fixed top-0 left-0 right-0 h-20 z-[1000] flex items-center justify-between px-12 transition-all duration-500"
      >
        <div className="text-2xl font-black tracking-tighter text-white font-display-lg uppercase">
          TrustShield AI
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a className="text-xs font-semibold uppercase tracking-widest text-[#c4c7c7] hover:text-primary transition-colors font-label-mono" href="#">Platform</a>
          <a className="text-xs font-semibold uppercase tracking-widest text-[#c4c7c7] hover:text-primary transition-colors font-label-mono" href="#">AI Agents</a>
          <a className="text-xs font-semibold uppercase tracking-widest text-[#c4c7c7] hover:text-primary transition-colors font-label-mono" href="#">Integrations</a>
          <a className="text-xs font-semibold uppercase tracking-widest text-[#c4c7c7] hover:text-primary transition-colors font-label-mono" href="#">Intelligence</a>
        </div>
        <button 
          onClick={() => navigate('/intelligence-center')}
          className="bg-primary text-[#313030] px-8 py-3 rounded-full font-bold text-xs uppercase tracking-tight shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all font-display-lg"
        >
          Enter Terminal
        </button>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Hero WebGL Shader Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mt-20">
          <div className="inline-block px-5 py-2 rounded-full border border-primary/30 bg-primary/10 mb-10 backdrop-blur-xl">
            <span className="font-label-mono text-[11px] text-primary tracking-[0.25em] uppercase font-bold">
              Architecture v4.2 Deployment Active
            </span>
          </div>
          <h1 className="font-display-lg text-7xl md:text-9xl text-white mb-10 uppercase leading-[0.85] tracking-tighter max-w-7xl mx-auto font-extrabold">
            TrustShield AI
          </h1>
          <p className="font-body-md text-xl md:text-2xl text-[#c4c7c7]/80 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
            The multi-agent operating system for high-stakes banking. <br className="hidden md:block" />
            Engineering certainty into the heart of every transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => navigate('/intelligence-center')}
              className="magnetic-btn w-full sm:w-auto bg-primary text-[#313030] px-14 py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all font-display-lg"
            >
              Launch Platform
            </button>
            <button className="w-full sm:w-auto glass-card text-white px-14 py-6 rounded-full font-bold text-xl hover:bg-white/5 border border-white/10 group font-display-lg flex items-center justify-center gap-2">
              System Overview <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce cursor-pointer">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* 3. Foundation Chapter */}
      <section className="relative py-48 px-12 z-10 bg-gradient-to-b from-transparent to-[#0e0e0f]/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-start reveal-on-scroll">
          <div>
            <div className="font-label-mono text-primary mb-8 tracking-[0.4em] uppercase font-bold text-xs">
              Foundation
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-14 font-display-lg">
              The AI Operating <br /> System for Banking.
            </h2>
            <div className="space-y-8 text-xl text-[#c4c7c7]/70 leading-relaxed max-w-xl font-light">
              <p>
                TrustShield is not a tool; it is a protagonist. In an era where legacy systems are buckling under complexity, we provide a unified intelligence layer designed for zero-trust environments.
              </p>
              <p>
                Our architecture deploys specialized agent networks that collaborate in real-time, simulating millions of outcomes per second to ensure that every decision is backed by explainable logic.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Capability Cards */}
            <div className="glass-card p-10 rounded-2xl group border-l-4 border-l-primary/30">
              <ShieldCheck className="text-primary w-12 h-12 mb-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight font-display-lg">Fraud Intelligence</h3>
              <p className="text-sm text-[#c4c7c7]/60 leading-relaxed font-light">Proactive anomaly detection using deep behavioral mapping and real-time telemetry.</p>
            </div>
            <div className="glass-card p-10 rounded-2xl group border-l-4 border-l-[#ffb95f]/30">
              <Eye className="text-[#ffb95f] w-12 h-12 mb-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight font-display-lg">Explainable AI</h3>
              <p className="text-sm text-[#c4c7c7]/60 leading-relaxed font-light">Human-readable audit trails for every automated action, ensuring full compliance.</p>
            </div>
            <div className="glass-card p-10 rounded-2xl group border-l-4 border-l-[#ffb4ae]/30">
              <Fingerprint className="text-[#ffb4ae] w-12 h-12 mb-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight font-display-lg">Zero Trust</h3>
              <p className="text-sm text-[#c4c7c7]/60 leading-relaxed font-light">Continuous verification across the entire lifecycle with cryptographic proofs.</p>
            </div>
            <div className="glass-card p-10 rounded-2xl group border-l-4 border-l-primary/30">
              <Network className="text-primary w-12 h-12 mb-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight font-display-lg">Multi-Agent Core</h3>
              <p className="text-sm text-[#c4c7c7]/60 leading-relaxed font-light">Orchestrated intelligence solving complex risk vectors through swarm collaboration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Agent Core Visual */}
      <section className="py-56 bg-[#0e0e0f]/10 relative overflow-hidden reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-12 text-center mb-40">
          <span className="font-label-mono text-primary uppercase tracking-[0.5em] mb-8 block font-bold text-xs">Intelligence Topography</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter font-display-lg">The Agent Core</h2>
        </div>
        <div className="relative max-w-6xl mx-auto min-h-[800px] flex items-center justify-center">
          {/* Connection SVGs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <filter id="glow-p">
                <feGaussianBlur result="blur" stdDeviation="4" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="lineGradCore" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path className="signal-path" d="M 50,400 L 400,400" fill="none" filter="url(#glow-p)" stroke="url(#lineGradCore)" strokeWidth="2.5" />
            <path className="signal-path" d="M 650,400 Q 800,200 950,200" fill="none" filter="url(#glow-p)" stroke="url(#lineGradCore)" strokeWidth="2.5" />
            <path className="signal-path" d="M 650,400 Q 800,400 950,400" fill="none" filter="url(#glow-p)" stroke="url(#lineGradCore)" strokeWidth="2.5" />
            <path className="signal-path" d="M 650,400 Q 800,600 950,600" fill="none" filter="url(#glow-p)" stroke="url(#lineGradCore)" strokeWidth="2.5" />
          </svg>

          {/* User Request */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center agent-node cursor-help">
            <div className="w-24 h-24 glass-card rounded-3xl flex items-center justify-center mb-6 shadow-signal-glow border-primary/40 relative">
              <LogIn className="text-primary w-10 h-10" />
              <div className="absolute -bottom-8 font-label-mono text-[9px] text-white/40 tracking-widest">[NODE_01]</div>
            </div>
            <span className="font-label-mono text-[11px] text-white uppercase tracking-widest font-bold">User Request</span>
            <div className="agent-tooltip absolute -top-16 bg-[#201f20] p-3 rounded-lg border border-white/10 text-[10px] w-48 text-center backdrop-blur-md">
              Entry point for all financial transaction telemetry.
            </div>
          </div>

          {/* Orchestrator */}
          <div className="relative z-20 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full glass-card flex flex-col items-center justify-center shadow-[0_0_100px_rgba(34,197,94,0.15)] border-primary/30 p-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-ping opacity-20" />
            <div className="absolute inset-8 rounded-full border-4 border-primary/5 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl opacity-30" />
            <Cpu className="w-24 h-24 text-primary mb-8" />
            <h4 className="font-bold text-white tracking-[0.3em] text-2xl uppercase font-display-lg">Orchestrator</h4>
            <div className="mt-6 px-6 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="font-label-mono text-xs text-primary font-bold">CORE_SYSTEM_READY</span>
            </div>
            <div className="mt-4 font-label-mono text-[10px] text-white/30">[AGENT_AUTH_ROOT]</div>
          </div>

          {/* Distributed Agents */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between items-end gap-16 py-10">
            {/* Fraud Agent */}
            <div className="agent-node group relative cursor-help">
              <div className="glass-card p-8 rounded-2xl w-72 flex items-center gap-8 border-l-4 border-l-primary shadow-2xl translate-x-12 group-hover:translate-x-0 transition-transform">
                <UserCheck className="text-primary w-10 h-10 shrink-0" />
                <div>
                  <h5 className="text-white font-bold uppercase text-base tracking-tight font-display-lg">Fraud Agent</h5>
                  <p className="text-[10px] text-[#c4c7c7] font-label-mono mt-1">[AGENT_FR_V2]</p>
                </div>
              </div>
              <div className="agent-tooltip absolute -left-52 top-1/2 -translate-y-1/2 bg-[#201f20] p-4 rounded-lg border border-white/10 text-[10px] w-48 text-left backdrop-blur-md">
                <span className="text-primary font-bold block mb-1">Anomaly Verification</span>
                Analyzes deep behavioral patterns and multi-hop transaction history.
              </div>
            </div>

            {/* Relationship Agent */}
            <div className="agent-node group relative cursor-help">
              <div className="glass-card p-8 rounded-2xl w-72 flex items-center gap-8 border-l-4 border-l-[#ffb95f] shadow-2xl">
                <Network className="text-[#ffb95f] w-10 h-10 shrink-0" />
                <div>
                  <h5 className="text-white font-bold uppercase text-base tracking-tight font-display-lg">Relationship</h5>
                  <p className="text-[10px] text-[#c4c7c7] font-label-mono mt-1">[AGENT_REL_09]</p>
                </div>
              </div>
              <div className="agent-tooltip absolute -left-52 top-1/2 -translate-y-1/2 bg-[#201f20] p-4 rounded-lg border border-white/10 text-[10px] w-48 text-left backdrop-blur-md">
                <span className="text-[#ffb95f] font-bold block mb-1">Graph Analysis</span>
                Maps entity relationships to detect synthetic identity clusters.
              </div>
            </div>

            {/* Credit Agent */}
            <div className="agent-node group relative cursor-help">
              <div className="glass-card p-8 rounded-2xl w-72 flex items-center gap-8 border-l-4 border-l-[#ffb4ae] shadow-2xl translate-x-12 group-hover:translate-x-0 transition-transform">
                <Wallet className="text-[#ffb4ae] w-10 h-10 shrink-0" />
                <div>
                  <h5 className="text-white font-bold uppercase text-base tracking-tight font-display-lg">Credit Risk</h5>
                  <p className="text-[10px] text-[#c4c7c7] font-label-mono mt-1">[AGENT_CR_EX]</p>
                </div>
              </div>
              <div className="agent-tooltip absolute -left-52 top-1/2 -translate-y-1/2 bg-[#201f20] p-4 rounded-lg border border-white/10 text-[10px] w-48 text-left backdrop-blur-md">
                <span className="text-[#ffb4ae] font-bold block mb-1">Exposure Check</span>
                Real-time liquidity and risk exposure calculations across assets.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Timeline */}
      <section className="py-56 px-12 relative z-10 bg-gradient-to-b from-transparent via-[#1c1b1c]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-32 reveal-on-scroll">
            <span className="font-label-mono text-primary uppercase tracking-[0.5em] mb-6 block font-bold text-xs">Process Architecture</span>
            <h2 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter font-display-lg">The Lifecycle</h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[47px] md:left-1/2 top-0 bottom-0 w-[4px] md:w-[6px] -translate-x-1/2 timeline-line-glow opacity-20 rounded-full" />
            
            {/* Step 1 */}
            <div className="relative flex items-center gap-16 md:gap-0 py-32 reveal-on-scroll group">
              <div className="flex-1 text-right hidden md:block pr-24">
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight mb-4 font-display-lg">Transaction Ingest</h3>
                <p className="text-lg text-[#c4c7c7]/60 font-light">Deep packet inspection and telemetry ingestion from global financial endpoints.</p>
              </div>
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center z-10 border-primary bg-[#050505] flex-shrink-0 shadow-[0_0_50px_rgba(34,197,94,0.3)] relative">
                <Radio className="text-primary w-10 h-10" />
              </div>
              <div className="flex-1 pl-16 md:pl-24">
                <div className="md:hidden mb-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display-lg">Transaction</h3>
                </div>
                <div className="font-label-mono text-xs text-primary mb-4 uppercase tracking-[0.2em] font-bold">Input Stream</div>
                <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center gap-16 md:gap-0 py-32 flex-row-reverse reveal-on-scroll group">
              <div className="flex-1 text-left hidden md:block pl-24">
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight mb-4 font-display-lg">Identity Proofing</h3>
                <p className="text-lg text-[#c4c7c7]/60 font-light">Biometric and cryptographic proofing using decentralized identity protocols.</p>
              </div>
              <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center z-10 border-[#ffb95f] bg-[#050505] flex-shrink-0 shadow-[0_0_50px_rgba(255,185,95,0.2)] relative">
                <Fingerprint className="text-[#ffb95f] w-10 h-10" />
              </div>
              <div className="flex-1 pr-16 md:pr-24 text-right md:text-left">
                <div className="md:hidden mb-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display-lg">Identity</h3>
                </div>
                <div className="font-label-mono text-xs text-[#ffb95f] mb-4 uppercase tracking-[0.2em] font-bold">Authentication</div>
                <div className="w-full h-2 bg-[#ffb95f]/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ffb95f] w-2/3 ml-auto md:ml-0 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center gap-16 md:gap-0 py-32 reveal-on-scroll group">
              <div className="flex-1 text-right hidden md:block pr-24">
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight mb-4 font-display-lg">Certainty Decision</h3>
                <p className="text-lg text-[#c4c7c7]/60 font-light">Instant execution with human-readable explanation attached to the payload.</p>
              </div>
              <div className="w-28 h-28 rounded-full glass-card flex items-center justify-center z-10 border-primary bg-primary/10 flex-shrink-0 shadow-signal-glow relative">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1 pl-16 md:pl-24">
                <div className="md:hidden mb-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-display-lg">Decision</h3>
                </div>
                <div className="font-label-mono text-primary text-2xl font-black tracking-tighter">14ms LATENCY</div>
                <div className="text-[#c4c7c7]/40 font-label-mono text-[10px] mt-2 uppercase tracking-[0.1em]">Verified_Outcome_Gen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Command Terminal */}
      <section className="py-56 bg-[#0e0e0f]/5 relative overflow-hidden reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-12 text-center mb-48">
          <span className="font-label-mono text-primary uppercase tracking-[0.5em] mb-8 block font-bold text-xs">Unified Interface</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter font-display-lg">Command Terminal</h2>
        </div>
        <div className="relative h-[900px] max-w-7xl mx-auto perspective-2000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%] z-30 floating-window" style={{ transform: 'translate3d(-50%, -50%, 0) rotateX(5deg)' }}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.9)] border-primary/20 bg-background/90 backdrop-blur-3xl flex h-[600px]">
              {/* Sidebar */}
              <div className="w-16 md:w-64 bg-[#0e0e0f] border-r border-white/5 flex flex-col p-4">
                <div className="flex gap-1.5 mb-10 px-2">
                  <div className="w-3 h-3 rounded-full bg-[#f43f5e]" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                </div>
                <div className="space-y-6 hidden md:block">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest font-label-mono">Active_Agents</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-primary text-xs font-label-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Fraud_V2
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-xs font-label-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Rel_Graph
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-xs font-label-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Credit_X
                    </div>
                  </div>
                </div>
                <div className="mt-auto hidden md:block border-t border-white/5 pt-4">
                  <div className="text-[10px] text-primary/60 font-label-mono">SECURE_SHELL v4.2</div>
                </div>
              </div>

              {/* Main Terminal */}
              <div className="flex-1 flex flex-col">
                <div className="h-10 bg-[#0e0e0f]/50 border-b border-white/5 flex items-center px-6">
                  <span className="text-[11px] font-label-mono text-white/40 uppercase tracking-widest">trustshield_command_orchestrator.sh</span>
                </div>
                <div className="flex-1 p-8 font-label-mono text-sm md:text-base space-y-4 overflow-y-auto">
                  <div className="flex gap-4">
                    <span className="text-primary font-bold">❯</span>
                    <span className="text-white">Analyze transaction <span className="text-[#ffb95f]">#TX-48392</span></span>
                  </div>
                  <div className="text-white/60 pl-8 space-y-2">
                    <div className="flex justify-between w-full md:w-96">
                      <span>Checking identity...</span>
                      <span className="text-primary">[DONE]</span>
                    </div>
                    <div className="flex justify-between w-full md:w-96">
                      <span>Running fraud detection...</span>
                      <span className="text-[#ffb95f]">[98.2% TRUST]</span>
                    </div>
                    <div className="flex justify-between w-full md:w-96">
                      <span>Analyzing customer relationship...</span>
                      <span className="text-white/30">[CALCULATING]</span>
                    </div>
                  </div>
                  <div className="pt-6 animate-pulse">
                    <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg inline-block">
                      <span className="text-primary font-bold">Decision Generated: </span>
                      <span className="text-white uppercase font-black tracking-widest">VERIFIED</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-primary font-bold">❯</span>
                    <span className="w-2 h-5 bg-primary cursor-blink" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Previews */}
          <div className="absolute -top-20 -left-20 w-[55%] z-20 floating-window opacity-40 hover:opacity-100 hover:z-40 transition-all duration-700" style={{ transform: 'rotateY(20deg) rotateX(10deg)' }}>
            <div className="glass-card rounded-2xl p-2 border-white/10 shadow-2xl">
              <img 
                alt="Investigation Workspace" 
                className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGs1neo_GJ1Hrs6WZTUq8DwZjqj80j0kbgwiIY_0WAgSP4lt0KETo01D7h1Gfj0_fjB5P1JI5gRfaYru1wCFOieq5huwVs8w4-uKl7qzRcX8hJYHLg5kX808VWo03O6JHBcUDYbmoZ9d7RswDuNRYnCeybgPhOQOTQMYST7E_D2-GuW_bexvlXGA1gARQRxZA3NFZsTgN2Gakouxu9nKQfyvg5ydUUm4JtaxU77w2WNy7LE3wkR1xkztLvSZAJ5BausbaTMioB4jk" 
              />
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-[50%] z-40 floating-window" style={{ transform: 'rotateY(-20deg) rotateX(-5deg)' }}>
            <div className="glass-card rounded-2xl p-2 border-[#ffb95f]/30 shadow-2xl bg-[#141313]/90">
              <img 
                alt="AI Copilot" 
                className="w-full h-auto rounded-xl border border-white/5" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaRwOe971drsKJRI2RrCdWXgfnFtWwQJXYHzGNnGQKgtIL41Rhb9kSpF5W_zP4OM_2NzA83U57CXMIm9lKUJe_ibW0EZHbQUwK-WWATFhGLSw1UCTnZhSeppt900eTgJ8lCojUvJrJGiQ3kodgdeeaEmXTll2XcE_jkRUIWWPD-3-M7fnVLi_ufz1WZRHVgeBDCwY3lyJCOln5fk7V5edt2G-T4grykO4Lzf9qVE67X5rQzJ-tIi3CMBQ0Tr2uXd4bfcspQIQKtsY" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-64 px-12 text-center reveal-on-scroll relative">
        <div className="absolute inset-0 bg-primary/5 blur-[200px] rounded-full pointer-events-none opacity-40" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="font-label-mono text-primary mb-16 tracking-[0.6em] uppercase font-bold text-xs">
            Deployment Status: System Ready
          </div>
          <h2 className="font-display-lg text-7xl md:text-[140px] text-white uppercase tracking-tighter mb-16 leading-[0.8] font-black">
            Engineered <br /> Certainty.
          </h2>
          <p className="text-xl md:text-3xl text-[#c4c7c7]/80 max-w-3xl mx-auto mb-20 font-light leading-relaxed">
            Secure trillions in global transactions with the world's first multi-agent financial OS.
          </p>
          <button 
            onClick={() => navigate('/intelligence-center')}
            className="magnetic-btn bg-primary text-[#313030] px-24 py-10 rounded-full font-bold text-3xl shadow-[0_30px_80px_rgba(34,197,94,0.4)] hover:scale-105 transition-all font-display-lg"
          >
            Launch Platform
          </button>
          <div className="mt-24 text-[#c4c7c7]/30 text-xl font-light italic">
            "TrustShield AI — Building Trust. One Decision at a Time."
          </div>
        </div>
      </section>

      {/* 8. Enterprise Footer */}
      <footer className="py-32 px-12 border-t border-white/5 bg-[#0e0e0f]/60 reveal-on-scroll">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2">
            <div className="text-3xl font-black text-white mb-8 tracking-tighter font-display-lg">TrustShield AI</div>
            <p className="text-[#c4c7c7]/50 max-w-xs leading-relaxed mb-8">
              The next-generation intelligence layer for global financial institutions. Engineered for zero-trust, built for scale.
            </p>
            <div className="flex gap-6">
              <a className="text-[#c4c7c7]/40 hover:text-primary transition-colors" href="#"><Terminal className="w-5 h-5" /></a>
              <a className="text-[#c4c7c7]/40 hover:text-primary transition-colors" href="#"><Shield className="w-5 h-5" /></a>
              <a className="text-[#c4c7c7]/40 hover:text-primary transition-colors" href="#"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 font-label-mono">Product</h4>
            <ul className="space-y-4 text-sm font-light text-[#c4c7c7]/60">
              <li><a className="hover:text-primary transition-colors" href="#">Platform</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">AI Agents</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Command Terminal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 font-label-mono">Resources</h4>
            <ul className="space-y-4 text-sm font-light text-[#c4c7c7]/60">
              <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Security Whitepaper</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">API Reference</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">System Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 font-label-mono">Company</h4>
            <ul className="space-y-4 text-sm font-light text-[#c4c7c7]/60">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 gap-8">
          <div className="font-label-mono text-[11px] tracking-widest text-[#c4c7c7]/30 uppercase">
            © 2024 TRUSTSHIELD AI. ALL_SYSTEMS_OPERATIONAL_V4.2
          </div>
          <div className="flex gap-12 font-label-mono text-[10px] tracking-widest text-[#c4c7c7]/50 uppercase">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Protocol</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
