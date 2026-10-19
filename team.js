'use strict';
async function loadMembers() {
  const container = document.getElementById('members');
  try {
    const response = await fetch('members.json');
    if (!response.ok) throw new Error('Không tải được danh sách');
    const members = await response.json();
    if (!Array.isArray(members) || members.length !== 7) throw new Error('Cần 7 thành viên');
    let published = 0;
    members.forEach((member, index) => {
      // Chỉ chấp nhận đường dẫn HTML trong cùng website.
      const ready = typeof member.url === 'string' && /^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.html$/.test(member.url);
      if (ready) published++;
      const card = document.createElement('article');
      card.className = ready ? 'card' : 'card pending';
      const top = document.createElement('div'); top.className = 'card-top';
      const initials = document.createElement('span'); initials.className = 'monogram'; initials.textContent = member.initials;
      const number = document.createElement('span'); number.className = 'number'; number.textContent = `THÀNH VIÊN / ${String(index + 1).padStart(2, '0')}`;
      top.append(initials, number);
      const name = document.createElement('h3'); name.textContent = member.name;
      const role = document.createElement('p'); role.textContent = member.role;
      const action = document.createElement(ready ? 'a' : 'span');
      if (ready) { action.href = member.url; action.textContent = 'Xem hồ sơ →'; action.setAttribute('aria-label', `Xem hồ sơ ${member.name}`); }
      else { action.className = 'pending-label'; action.textContent = 'Chờ bổ sung CV'; }
      card.append(top, name, role, action); container.append(card);
    });
    document.getElementById('summary').textContent = `${published}/7 hồ sơ đã công khai`;
  } catch (error) {
    container.replaceChildren();
    document.getElementById('summary').textContent = 'Danh sách tạm thời chưa khả dụng';
    document.getElementById('load-error').hidden = false;
  }
}
loadMembers();
