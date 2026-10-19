// CV Interactive Script - Nguyễn Đắc Hoàng

document.addEventListener('DOMContentLoaded', () => {
  const btnPrint = document.getElementById('btnPrint');
  const btnCopyContact = document.getElementById('btnCopyContact');
  const btnToggleEdit = document.getElementById('btnToggleEdit');
  const toast = document.getElementById('toastMessage');
  const toastText = document.getElementById('toastText');
  const cvContent = document.getElementById('cvContent');
  
  let isEditing = false;

  // Show Toast Helper
  function showToast(message, duration = 3000) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 1. Print / Save as PDF
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      // If in editing mode, disable before print
      if (isEditing) {
        toggleEditable(false);
      }
      window.print();
    });
  }

  // 2. Copy Contact Info
  if (btnCopyContact) {
    btnCopyContact.addEventListener('click', async () => {
      const contactInfo = `Nguyễn Đắc Hoàng - Trợ giảng Tin Học
SĐT: 0986511102
Email: dtc235200306@ictu.edu.vn
Facebook: facebook.com/nguyenhoang2905
Địa chỉ: Phường Quyết Thắng, Thái Nguyên`;

      try {
        await navigator.clipboard.writeText(contactInfo);
        showToast('✓ Đã sao chép toàn bộ thông tin liên hệ!');
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = contactInfo;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✓ Đã sao chép thông tin liên hệ!');
      }
    });
  }

  // 3. Toggle Editable Mode (Cho phép người dùng bấm vào sửa nội dung trực tiếp trên CV)
  function toggleEditable(forceState) {
    isEditing = typeof forceState === 'boolean' ? forceState : !isEditing;

    const editableElements = cvContent.querySelectorAll(
      '.header-name, .header-title-badge, .info-value, .edu-school, .edu-period, .edu-major, .edu-bullets li, .skill-card, .ref-item, .section-text, .item-main-title, .item-date, .item-subtitle, .content-list li, .project-title, .meta-link, .interest-item span'
    );

    editableElements.forEach((el) => {
      el.contentEditable = isEditing ? 'true' : 'false';
    });

    if (btnToggleEdit) {
      if (isEditing) {
        btnToggleEdit.classList.add('active');
        btnToggleEdit.querySelector('span').textContent = 'Đang bật sửa';
        showToast('✎ Chế độ sửa: Bạn có thể bấm vào chữ bất kỳ để chỉnh sửa!');
      } else {
        btnToggleEdit.classList.remove('active');
        btnToggleEdit.querySelector('span').textContent = 'Chỉnh sửa nhanh';
        showToast('✓ Đã tắt chế độ sửa. Thay đổi chỉ có trong lần xem này; hãy in PDF để giữ lại.');
      }
    }
  }

  if (btnToggleEdit) {
    btnToggleEdit.addEventListener('click', () => toggleEditable());
  }

  // 4. Avatar Upload & Preview (Tùy chọn tải ảnh khi cần)
  const avatarContainer = document.getElementById('avatarContainer');
  const avatarFileInput = document.getElementById('avatarFileInput');
  const avatarPlaceholder = document.getElementById('avatarPlaceholder');
  const avatarImg = document.getElementById('cvAvatar');

  if (avatarContainer && avatarFileInput) {
    avatarContainer.addEventListener('click', (e) => {
      // Don't trigger if clicked directly on input
      if (e.target !== avatarFileInput) {
        avatarFileInput.click();
      }
    });

    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('⚠️ Vui lòng chọn đúng file hình ảnh');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          if (avatarImg) {
            avatarImg.src = event.target.result;
            avatarImg.style.display = 'block';
          }
          if (avatarPlaceholder) {
            avatarPlaceholder.style.display = 'none';
          }
          showToast('✓ Đã cập nhật ảnh đại diện mới!');
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
