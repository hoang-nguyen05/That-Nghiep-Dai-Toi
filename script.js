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
  // 5. Dark Gothic Audio Player (TikTok Theme: @kame_mono)
  // =========================================================================
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const audioIcon = document.getElementById('audioIcon');
  const audioText = document.getElementById('audioText');

  let bgAudio = document.getElementById('bgThemeAudio');
  if (!bgAudio) {
    bgAudio = new Audio('assets/audio/sin_theme.mp3');
    bgAudio.id = 'bgThemeAudio';
    bgAudio.loop = true;
    bgAudio.preload = 'auto';
  } else {
    bgAudio.loop = true;
  }

  let isAudioPlaying = false;
  let fadeInterval = null;

  function fadeAudioIn(targetVolume = 0.65, step = 0.05, delay = 40) {
    if (!bgAudio) return;
    clearInterval(fadeInterval);
    bgAudio.volume = 0;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        fadeInterval = setInterval(() => {
          if (bgAudio.volume < targetVolume) {
            bgAudio.volume = Math.min(targetVolume, Number((bgAudio.volume + step).toFixed(2)));
          } else {
            clearInterval(fadeInterval);
          }
        }, delay);
      }).catch(err => {
        console.warn('Playback error or blocked by autoplay policy:', err);
      });
    }
  }

  function fadeAudioOut(step = 0.05, delay = 35) {
    if (!bgAudio) return;
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
      if (bgAudio.volume > 0.05) {
        bgAudio.volume = Math.max(0, Number((bgAudio.volume - step).toFixed(2)));
      } else {
        bgAudio.pause();
        bgAudio.volume = 0;
        clearInterval(fadeInterval);
      }
    }, delay);
  }

  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      if (!isAudioPlaying) {
        fadeAudioIn(0.65);
        isAudioPlaying = true;
        btnAudioToggle.classList.add('active');
        if (audioIcon) audioIcon.textContent = '🔊';
        if (audioText) audioText.textContent = 'Đang Phát Âm Hưởng';
      } else {
        fadeAudioOut();
        isAudioPlaying = false;
        btnAudioToggle.classList.remove('active');
        if (audioIcon) audioIcon.textContent = '🔮';
        if (audioText) audioText.textContent = 'Âm Hưởng U Tối';
      }
    });

    if (bgAudio) {
      bgAudio.addEventListener('pause', () => {
        if (!isAudioPlaying) {
          btnAudioToggle.classList.remove('active');
          if (audioIcon) audioIcon.textContent = '🔮';
          if (audioText) audioText.textContent = 'Âm Hưởng U Tối';
        }
      });
    }
  }

  // =========================================================================
  // 6. Occult Seal Manual Strike (Auto-lightning removed per request)
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

  // Trigger lightning ONLY when explicitly clicking the occult seal
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
    // Avoid bursts when clicking inside modals or buttons with stopPropagation
    if (e.target.closest('.cv-modal-window') || e.target.closest('.dossier-modal-window')) {
      return;
    }

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
  // 8. Instant CV Quick-View Modal System
  // =========================================================================
  const cvModalBackdrop = document.getElementById('cvModalBackdrop');
  const cvModalIframe = document.getElementById('cvModalIframe');
  const cvModalLoader = document.getElementById('cvModalLoader');
  const cvModalMemberName = document.getElementById('cvModalMemberName');
  const cvModalSubtitle = document.getElementById('cvModalSubtitle');
  const cvModalSeal = document.getElementById('cvModalSeal');
  const cvModalTabLink = document.getElementById('cvModalTabLink');
  const cvModalClose = document.getElementById('cvModalClose');

  const quickViewBtns = document.querySelectorAll('.btn-cv-quickview');
  let cvCloseTimer;
  let cvReturnFocus;

  function openCvModal(folder, name, role, sin, seal, color) {
    if (!cvModalBackdrop || !cvModalIframe) return;
    clearTimeout(cvCloseTimer);
    cvReturnFocus = document.activeElement;

    if (cvModalSeal) cvModalSeal.textContent = seal || '⸸';
    if (cvModalMemberName) cvModalMemberName.textContent = name || '';
    if (cvModalSubtitle) cvModalSubtitle.textContent = `${sin || ''} • ${role || ''}`;
    
    const memberUrl = `members/${folder}/`;
    if (cvModalTabLink) cvModalTabLink.href = memberUrl;

    // Show loader
    if (cvModalLoader) cvModalLoader.classList.remove('hidden');

    // Load iframe
    cvModalIframe.onload = () => {
      if (cvModalLoader) cvModalLoader.classList.add('hidden');
    };
    cvModalIframe.src = memberUrl;

    cvModalBackdrop.classList.add('active');
    cvModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (cvModalClose) cvModalClose.focus({ preventScroll: true });
  }

  function closeCvModal() {
    if (!cvModalBackdrop || !cvModalBackdrop.classList.contains('active')) return;
    cvModalBackdrop.classList.remove('active');
    cvModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset iframe to release resources & stop any audio/scripts in member CV
    cvCloseTimer = setTimeout(() => {
      if (cvModalIframe) cvModalIframe.src = '';
    }, 300);
    if (cvReturnFocus) cvReturnFocus.focus({ preventScroll: true });
  }

  function openCardCv(card) {
    const btn = card.querySelector('.btn-cv-quickview');
    if (!btn) return;
    openCvModal(btn.dataset.folder, btn.dataset.name, btn.dataset.role,
      btn.dataset.sin, btn.dataset.seal, btn.dataset.color);
  }

  cards.forEach((card) => {
    // Portraits and non-control areas open the same CV as the explicit button.
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button, input, select, textarea')) return;
      if (window.getSelection().toString()) return;
      openCardCv(card);
    });
    card.querySelectorAll('[data-cv-trigger]').forEach((link) => {
      link.addEventListener('click', (e) => {
        // Keep normal link behavior for opening a separate tab.
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        if (!cvModalBackdrop || !cvModalIframe) return;
        e.preventDefault();
        openCardCv(card);
      });
    });
  });

  quickViewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const folder = btn.getAttribute('data-folder');
      const name = btn.getAttribute('data-name');
      const role = btn.getAttribute('data-role');
      const sin = btn.getAttribute('data-sin');
      const seal = btn.getAttribute('data-seal');
      const color = btn.getAttribute('data-color');
      openCvModal(folder, name, role, sin, seal, color);
    });
  });

  if (cvModalClose) {
    cvModalClose.addEventListener('click', closeCvModal);
  }

  if (cvModalBackdrop) {
    cvModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cvModalBackdrop) {
        closeCvModal();
      }
    });
  }

  // =========================================================================
  // 9. Occult Sin Dossier Modal System ("Luận Giải Đời Thực")
  // =========================================================================
  const sinDossierModal = document.getElementById('sinDossierModal');
  const sinDossierClose = document.getElementById('sinDossierClose');
  const dossierModalImg = document.getElementById('dossierModalImg');
  const dossierModalSeal = document.getElementById('dossierModalSeal');
  const dossierModalBadge = document.getElementById('dossierModalBadge');
  const dossierModalTitle = document.getElementById('dossierModalTitle');
  const dossierModalGuardian = document.getElementById('dossierModalGuardian');
  const dossierModalRole = document.getElementById('dossierModalRole');
  const dossierModalReal = document.getElementById('dossierModalReal');
  const dossierModalIt = document.getElementById('dossierModalIt');
  const dossierModalLore = document.getElementById('dossierModalLore');

  const dossierBtns = document.querySelectorAll('.btn-sin-dossier');

  function openSinDossier(data) {
    if (!sinDossierModal) return;

    if (dossierModalImg) dossierModalImg.src = data.img || '';
    if (dossierModalSeal) dossierModalSeal.textContent = data.seal || '⸸';
    if (dossierModalBadge) dossierModalBadge.textContent = data.badge || '';
    if (dossierModalTitle) dossierModalTitle.textContent = data.sinname || '';
    if (dossierModalGuardian) dossierModalGuardian.textContent = data.member || '';
    if (dossierModalRole) dossierModalRole.textContent = `(${data.role || ''})`;
    if (dossierModalReal) dossierModalReal.textContent = data.real || '';
    if (dossierModalIt) dossierModalIt.textContent = data.it || '';
    if (dossierModalLore) dossierModalLore.textContent = data.lore || '';

    sinDossierModal.classList.add('active');
    sinDossierModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSinDossier() {
    if (!sinDossierModal) return;
    sinDossierModal.classList.remove('active');
    sinDossierModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  dossierBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSinDossier({
        member: btn.getAttribute('data-member'),
        role: btn.getAttribute('data-role'),
        sinname: btn.getAttribute('data-sinname'),
        badge: btn.getAttribute('data-badge'),
        seal: btn.getAttribute('data-seal'),
        img: btn.getAttribute('data-img'),
        real: btn.getAttribute('data-real'),
        it: btn.getAttribute('data-it'),
        lore: btn.getAttribute('data-lore')
      });
    });
  });

  if (sinDossierClose) {
    sinDossierClose.addEventListener('click', closeSinDossier);
  }

  if (sinDossierModal) {
    sinDossierModal.addEventListener('click', (e) => {
      if (e.target === sinDossierModal) {
        closeSinDossier();
      }
    });
  }

  // Global ESC Key to close any active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeCvModal();
      closeSinDossier();
    }
  });
});
