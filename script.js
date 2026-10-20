// Script for Team Portal - Thất Nghiệp Đại Tội

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('memberSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const role = (card.getAttribute('data-role') || '').toLowerCase();

      const matchesStatus = (activeFilter === 'all') || (status === activeFilter);
      const matchesSearch = !searchTerm || name.includes(searchTerm) || role.includes(searchTerm);

      if (matchesStatus && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('noResults');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
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
});
