/**
 * THẤT NGHIỆP ĐẠI TỘI — THE SEVEN DEADLY SINS
 * Dark Gothic Horror, Ethereal Particles & 3D Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Dynamic Canvas: Floating Embers, Abyssal Mist & Bling Stars
  // =========================================================================
  const canvas = document.getElementById('horrorCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const mousePos = { x: width / 2, y: height / 2, active: false };
    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mousePos.active = true;
    });

    // Particle Palette
    const emberColors = [
      'rgba(212, 175, 55, ',  // Antique Gold
      'rgba(244, 63, 94, ',   // Blood Crimson
      'rgba(249, 115, 22, ',  // Magma Amber
      'rgba(168, 85, 247, ',  // Abyssal Violet
      'rgba(255, 240, 200, '  // Diamond Bling
    ];

    // Generate Floating Embers
    const emberCount = Math.min(85, Math.floor(window.innerWidth / 15));
    const embers = [];

    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + 0.6,
        baseColor: emberColors[Math.floor(Math.random() * emberColors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speedY: Math.random() * 0.9 + 0.3,
        speedX: (Math.random() - 0.5) * 0.6,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        isBling: Math.random() > 0.75, // Twinkling cross sparkle
        pulse: Math.random() * Math.PI
      });
    }

    function drawSparkle(ctx, x, y, size, alpha, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color + alpha + ')';
      ctx.shadowBlur = size * 3;
      ctx.shadowColor = '#d4af37';

      // Draw 4-point Diamond Star
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(size * 2, 0);
        ctx.lineTo(size * 0.4, size * 0.4);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Demonic Eyes Lurking in the Void ("Nhãn Ma Hắc Ám")
    const demonicEyes = [];
    const eyeColors = [
      { glow: 'rgba(244, 63, 94, 0.9)', iris: '#ff1744', pupil: '#1a0006' }, // Crimson Blood
      { glow: 'rgba(234, 179, 8, 0.9)', iris: '#ffd600', pupil: '#1a1400' },  // Molten Gold
      { glow: 'rgba(168, 85, 247, 0.9)', iris: '#d500f9', pupil: '#12001a' }, // Abyssal Violet
      { glow: 'rgba(16, 185, 129, 0.9)', iris: '#00e676', pupil: '#001a0e' }  // Toxic Emerald
    ];

    let lastEyeSpawn = Date.now();
    function maybeSpawnDemonicEye() {
      const now = Date.now();
      if (now - lastEyeSpawn < 2500 || demonicEyes.length >= 3) return;
      if (Math.random() > 0.05) return;
      lastEyeSpawn = now;

      const palette = eyeColors[Math.floor(Math.random() * eyeColors.length)];
      const spacing = 36 + Math.random() * 24;
      demonicEyes.push({
        x: 80 + Math.random() * (width - 160),
        y: 80 + Math.random() * (height - 160),
        spacing: spacing,
        width: 24 + Math.random() * 10,
        height: 11 + Math.random() * 6,
        openProgress: 0,
        state: 'opening',
        holdTimer: 100 + Math.floor(Math.random() * 100),
        color: palette,
        glintPhase: Math.random() * Math.PI
      });
    }

    function renderDemonicEyes(ctx) {
      maybeSpawnDemonicEye();

      for (let i = demonicEyes.length - 1; i >= 0; i--) {
        const eye = demonicEyes[i];

        if (eye.state === 'opening') {
          eye.openProgress += 0.025;
          if (eye.openProgress >= 1) {
            eye.openProgress = 1;
            eye.state = 'holding';
          }
        } else if (eye.state === 'holding') {
          eye.holdTimer--;
          if (eye.holdTimer <= 0) {
            eye.state = 'closing';
          }
        } else if (eye.state === 'closing') {
          eye.openProgress -= 0.02;
          if (eye.openProgress <= 0) {
            demonicEyes.splice(i, 1);
            continue;
          }
        }

        const currentH = Math.max(0.5, eye.height * eye.openProgress);
        const currentAlpha = Math.min(1, eye.openProgress * 0.95);

        // Draw left and right eye pair
        [-eye.spacing / 2, eye.spacing / 2].forEach((offset) => {
          const eyeX = eye.x + offset;
          const eyeY = eye.y;

          ctx.save();
          ctx.translate(eyeX, eyeY);

          // Slit eye glow
          ctx.shadowBlur = 18 * eye.openProgress;
          ctx.shadowColor = eye.color.glow;

          ctx.beginPath();
          ctx.moveTo(-eye.width / 2, 0);
          ctx.quadraticCurveTo(0, -currentH, eye.width / 2, 0);
          ctx.quadraticCurveTo(0, currentH, -eye.width / 2, 0);
          ctx.closePath();

          ctx.fillStyle = eye.color.iris;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();

          // Slit vertical pupil
          if (eye.openProgress > 0.3) {
            let pupilShiftX = 0;
            if (mousePos.active) {
              const dx = mousePos.x - eyeX;
              pupilShiftX = Math.max(-eye.width * 0.2, Math.min(eye.width * 0.2, dx * 0.02));
            }

            ctx.beginPath();
            ctx.ellipse(pupilShiftX, 0, 2.2, currentH * 0.85, 0, 0, Math.PI * 2);
            ctx.fillStyle = eye.color.pupil;
            ctx.fill();

            // Diamond star glint on pupil ("Bling-Bling")
            if (eye.state === 'holding' && eye.openProgress > 0.8) {
              eye.glintPhase += 0.08;
              const glintAlpha = 0.5 + 0.5 * Math.sin(eye.glintPhase);
              ctx.shadowColor = '#ffffff';
              ctx.shadowBlur = 8;
              drawSparkle(ctx, pupilShiftX + 2, -currentH * 0.35, 2.5, glintAlpha * currentAlpha, 'rgba(255, 255, 255, ');
            }
          }

          ctx.restore();
        });
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Render Embers & Bling Stars
      embers.forEach((ember) => {
        ember.y -= ember.speedY;
        ember.swayOffset += ember.swaySpeed;
        ember.x += Math.sin(ember.swayOffset) * 0.45 + ember.speedX;
        ember.pulse += 0.03;

        // Mouse avoidance/deflection
        if (mousePos.active) {
          const dx = ember.x - mousePos.x;
          const dy = ember.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            ember.x += (dx / dist) * force * 1.5;
            ember.y += (dy / dist) * force * 1.5;
          }
        }

        // Reset if drifted past top or off screen
        if (ember.y < -20) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
        }
        if (ember.x < -20) ember.x = width + 10;
        if (ember.x > width + 20) ember.x = -10;

        const currentAlpha = Math.max(0.08, ember.alpha * (0.6 + 0.4 * Math.sin(ember.pulse)));

        if (ember.isBling) {
          drawSparkle(ctx, ember.x, ember.y, ember.radius * 1.5, currentAlpha, ember.baseColor);
        } else {
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
          ctx.fillStyle = ember.baseColor + currentAlpha + ')';
          ctx.shadowBlur = ember.radius * 4;
          ctx.shadowColor = ember.baseColor + '0.8)';
          ctx.fill();
        }
      });

      // Render Lurking Demonic Eyes
      renderDemonicEyes(ctx);

      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
  }

  // =========================================================================
  // 2. Cursor Sparkle Trail System ("Bling-Bling Bay Bổng")
  // =========================================================================
  let lastSparkleTime = 0;
  const sparkleSymbols = ['✦', '✧', '•', '✨'];

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < 35) return; // Throttle to prevent DOM clutter
    lastSparkleTime = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'mouse-sparkle';
    sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    const driftX = (Math.random() - 0.5) * 36;
    const driftY = -Math.random() * 32 - 12;
    sparkle.style.setProperty('--drift-x', `${driftX}px`);
    sparkle.style.setProperty('--drift-y', `${driftY}px`);

    // Occult Colors
    const colors = ['#f5e08b', '#fda4af', '#e9d5ff', '#a7f3d0', '#fed7aa'];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  });

  // =========================================================================
  // 3. 3D Perspective Card Tilt & Dynamic Specular Reflection
  // =========================================================================
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Position radial halo
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // =========================================================================
  // 4. Filtering & Realtime Search Logic
  // =========================================================================
  const searchInput = document.getElementById('memberSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const noResults = document.getElementById('noResults');

  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const sinType = card.getAttribute('data-sin-type') || '';
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const role = (card.getAttribute('data-role') || '').toLowerCase();
      const sin = (card.getAttribute('data-sin') || '').toLowerCase();

      const matchesFilter = activeFilter === 'all' || sinType === activeFilter;
      const matchesSearch =
        !searchTerm ||
        name.includes(searchTerm) ||
        role.includes(searchTerm) ||
        sin.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter click handlers
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // =========================================================================
  // 5. Procedural Dark Gothic Sound Synthesizer (Web Audio API)
  //    (Zero audio files needed, pure synthesizer)
  // =========================================================================
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const audioIcon = document.getElementById('audioIcon');
  const audioText = document.getElementById('audioText');

  let audioCtx = null;
  let isAudioPlaying = false;
  let droneOsc1 = null;
  let droneOsc2 = null;
  let droneGain = null;
  let lfo = null;
  let bellInterval = null;

  function initDarkAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function startDarkDrone() {
    if (!audioCtx) initDarkAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Master Drone Gain
    droneGain = audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.001, now);
    droneGain.gain.exponentialRampToValueAtTime(0.2, now + 2.5);

    // Filter for muffled dark cellar acoustics
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    // Deep Sub-Bass Drone 1 (D1 ~ 36.7Hz)
    droneOsc1 = audioCtx.createOscillator();
    droneOsc1.type = 'sawtooth';
    droneOsc1.frequency.setValueAtTime(36.7, now);

    // Secondary Minor Drone 2 (A1 ~ 55Hz, dark fifth)
    droneOsc2 = audioCtx.createOscillator();
    droneOsc2.type = 'sine';
    droneOsc2.frequency.setValueAtTime(55, now);

    // Ethereal LFO for breathing drone effect
    lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.12, now); // Slow pulse every 8 seconds
    lfoGain.gain.setValueAtTime(60, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Routing
    droneOsc1.connect(filter);
    droneOsc2.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(audioCtx.destination);

    droneOsc1.start(now);
    droneOsc2.start(now);
    lfo.start(now);

    // Play initial resonant bell chime
    triggerGothicBell(146.8); // D3

    // Periodic eerie church bell toll (every 18s)
    bellInterval = setInterval(() => {
      if (isAudioPlaying && audioCtx) {
        const tones = [146.8, 174.6, 220.0]; // D, F, A (D minor)
        const tone = tones[Math.floor(Math.random() * tones.length)];
        triggerGothicBell(tone);
      }
    }, 18000);
  }

  function triggerGothicBell(freq) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    const bellOsc = audioCtx.createOscillator();
    const bellGain = audioCtx.createGain();
    const bellFilter = audioCtx.createBiquadFilter();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(freq, now);

    bellFilter.type = 'bandpass';
    bellFilter.frequency.setValueAtTime(freq * 1.5, now);
    bellFilter.Q.setValueAtTime(3, now);

    bellGain.gain.setValueAtTime(0.001, now);
    bellGain.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);

    bellOsc.connect(bellFilter);
    bellFilter.connect(bellGain);
    bellGain.connect(audioCtx.destination);

    bellOsc.start(now);
    bellOsc.stop(now + 6.5);
  }

  function stopDarkDrone() {
    if (droneGain && audioCtx) {
      const now = audioCtx.currentTime;
      droneGain.gain.setValueAtTime(droneGain.gain.value, now);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        try {
          if (droneOsc1) droneOsc1.stop();
          if (droneOsc2) droneOsc2.stop();
          if (lfo) lfo.stop();
        } catch (e) {}
      }, 1600);
    }
    if (bellInterval) clearInterval(bellInterval);
  }

  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      if (!isAudioPlaying) {
        startDarkDrone();
        isAudioPlaying = true;
        btnAudioToggle.classList.add('active');
        audioIcon.textContent = '🔊';
        audioText.textContent = 'Đang Phát Âm Hưởng';
      } else {
        stopDarkDrone();
        isAudioPlaying = false;
        btnAudioToggle.classList.remove('active');
        audioIcon.textContent = '🔮';
        audioText.textContent = 'Âm Hưởng U Tối';
      }
    });
  }

  // =========================================================================
  // 6. Occult Lightning Strobe System ("Lôi Điện U Minh")
  // =========================================================================
  const lightningFlash = document.getElementById('lightningFlash');
  function triggerOccultLightning() {
    if (!lightningFlash) return;
    lightningFlash.classList.remove('lightning-active');
    void lightningFlash.offsetWidth; // Force DOM reflow to restart animation
    lightningFlash.classList.add('lightning-active');
    setTimeout(() => {
      lightningFlash.classList.remove('lightning-active');
    }, 550);
  }

  // Periodic random strike every 16 - 32 seconds
  function scheduleNextLightning() {
    const delay = 16000 + Math.random() * 16000;
    setTimeout(() => {
      triggerOccultLightning();
      scheduleNextLightning();
    }, delay);
  }
  scheduleNextLightning();

  // Trigger lightning when clicking the occult seal
  const occultSeal = document.querySelector('.hero-occult-seal');
  if (occultSeal) {
    occultSeal.addEventListener('click', () => {
      triggerOccultLightning();
    });
  }

  // =========================================================================
  // 7. Horror Click Shockwave & Cursed Diamond Burst ("Bling-Bling Kinh Dị")
  // =========================================================================
  const burstSymbols = ['✦', '✧', '⬩', '⬥', '⸸', '✨', '⚡'];
  const defaultColors = ['#f5e08b', '#ff2a5f', '#c084fc', '#ffffff', '#eab308'];

  window.addEventListener('click', (e) => {
    // Determine color from sin card if clicked inside one
    const card = e.target.closest('.card');
    let shockColor = '#f5e08b';
    let burstPalette = defaultColors;

    if (card) {
      const sinType = card.dataset.sinType;
      const sinMap = {
        lust: { shock: '#f43f5e', palette: ['#f43f5e', '#fda4af', '#ffffff', '#e11d48'] },
        pride: { shock: '#a855f7', palette: ['#a855f7', '#e9d5ff', '#ffffff', '#c084fc'] },
        gluttony: { shock: '#f97316', palette: ['#f97316', '#fed7aa', '#ffffff', '#ea580c'] },
        wrath: { shock: '#ef4444', palette: ['#ef4444', '#fecaca', '#ffffff', '#b91c1c'] },
        envy: { shock: '#10b981', palette: ['#10b981', '#a7f3d0', '#ffffff', '#059669'] },
        greed: { shock: '#eab308', palette: ['#eab308', '#fef08a', '#ffffff', '#ca8a04'] },
        sloth: { shock: '#38bdf8', palette: ['#38bdf8', '#bae6fd', '#ffffff', '#0284c7'] }
      };
      if (sinMap[sinType]) {
        shockColor = sinMap[sinType].shock;
        burstPalette = sinMap[sinType].palette;
      }
    }

    // 1. Shockwave ring
    const shockwave = document.createElement('div');
    shockwave.className = 'click-shockwave';
    shockwave.style.left = `${e.clientX}px`;
    shockwave.style.top = `${e.clientY}px`;
    shockwave.style.setProperty('--shockwave-color', shockColor);
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 700);

    // 2. 18 Explosive burst particles
    const particleCount = 18;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'burst-spark';
      p.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];
      p.style.left = `${e.clientX}px`;
      p.style.top = `${e.clientY}px`;

      const angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.4;
      const distance = 45 + Math.random() * 85;
      const bx = Math.cos(angle) * distance;
      const by = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;
      const color = burstPalette[Math.floor(Math.random() * burstPalette.length)];

      p.style.setProperty('--burst-x', `${bx}px`);
      p.style.setProperty('--burst-y', `${by}px`);
      p.style.setProperty('--burst-rot', `${rot}deg`);
      p.style.color = color;
      p.style.textShadow = `0 0 10px ${color}, 0 0 20px #ffffff`;
      p.style.fontSize = `${11 + Math.random() * 11}px`;

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 780);
    }
  });

  // =========================================================================
  // 8. Real-life Sin Drawer Accordion System ("Bản Luận Giải Đời Thực")
  // =========================================================================
  const sinToggleBtns = document.querySelectorAll('.btn-sin-toggle');

  sinToggleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering full-page click bursts on toggle
      const actionsContainer = btn.closest('.card-actions');
      if (!actionsContainer) return;
      const drawer = actionsContainer.querySelector('.card-sin-drawer');
      if (!drawer) return;

      const isOpen = drawer.classList.contains('open');

      if (isOpen) {
        drawer.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        const textSpan = btn.querySelector('.sin-toggle-left span:last-child');
        if (textSpan) textSpan.textContent = 'Luận Giải Đời Thực';
      } else {
        drawer.classList.add('open');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        const textSpan = btn.querySelector('.sin-toggle-left span:last-child');
        if (textSpan) textSpan.textContent = 'Thu Gọn Luận Giải';
      }
    });
  });
});
