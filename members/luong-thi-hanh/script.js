/**
 * CV LƯỜNG HẠNH - Interactive Features
 * Theme switch, print PDF, copy to clipboard, and project filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const printBtn = document.getElementById('btn-print-cv');
  const copyPhoneBtn = document.getElementById('btn-copy-phone');
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const backToTopBtn = document.getElementById('back-to-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // ---------- 1. THEME SWITCHER ----------
  const STORAGE_KEY = 'cv_theme_preference';
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    if (savedTheme === 'light') {
      document.body.classList.remove('theme-dark');
      updateThemeIcon(false);
    } else {
      document.body.classList.add('theme-dark');
      updateThemeIcon(true);
    }
  } else {
    // Default to dark mode as requested for modern tech look
    document.body.classList.add('theme-dark');
    updateThemeIcon(true);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('theme-dark');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
    showToast(isDark ? '🌙 Đã chuyển sang giao diện Tối' : '☀️ Đã chuyển sang giao diện Sáng');
  });

  function updateThemeIcon(isDark) {
    if (isDark) {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Chuyển sang giao diện Sáng';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Chuyển sang giao diện Tối';
    }
  }

  // ---------- 2. PRINT / EXPORT PDF ----------
  printBtn.addEventListener('click', () => {
    showToast('📄 Đang chuẩn bị bản in / PDF chuẩn A4...');
    setTimeout(() => {
      window.print();
    }, 350);
  });

  // ---------- 3. COPY TO CLIPBOARD & TOAST ----------
  let toastTimer = null;

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  async function copyToClipboard(text, successMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or file:// protocol
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      showToast(successMsg);
    } catch (err) {
      showToast('Sao chép: ' + text);
    }
  }

  copyPhoneBtn.addEventListener('click', () => {
    copyToClipboard('0343686332', '📞 Đã sao chép SĐT: 0343 686 332');
  });

  copyEmailBtn.addEventListener('click', () => {
    copyToClipboard('luonghanh.dev@gmail.com', '✉️ Đã sao chép Email: luonghanh.dev@gmail.com');
  });

  // ---------- 4. PROJECT FILTERING ----------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          // Smooth fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------- 5. BACK TO TOP BUTTON ----------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hotkey support: Ctrl/Cmd + P opens print, Escape closes toast
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toast.classList.remove('show');
    }
  });
});
