let currentPage = 1;
const pageSize = 12;

async function renderAllColors(page = 1) {
  try {
    const res = await fetch(`/api/colors?page=${page}&pageSize=${pageSize}`);
    if (!res.ok) throw new Error('Failed to fetch paginated colors');

    const { colors, totalPages } = await res.json();
    const container = document.getElementById('color-container');
    container.innerHTML = '';

    // Render color cards
    colors.forEach(color => {
      const card = document.createElement('div');
      card.className = 'card m-3 rounded';
      card.style = 'flex: 0 0 calc(20% - 1rem);'
      card.innerHTML = `
        <div class="card-top small-swatch shadow-sm" style="background-color: ${color.hex};"></div>
        <div class="card-body text-start">
          <p class="text-start mx-5">${color.hex}</p>
        </div>
      `;
      card.onclick = () => renderColorDetails(color.hex);
      container.appendChild(card);
    });

    // Render pagination bar
    renderPagination(totalPages, page);
  } catch (err) {
    console.error('Error loading colors:', err);
  }
}

function renderPagination(totalPages, activePage) {
  const bar = document.getElementById('pagination-bar');
  bar.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === activePage ? 'btn btn-primary mx-1' : 'btn btn-outline-secondary mx-1';
    btn.onclick = () => {
      currentPage = i;
      renderAllColors(currentPage);
    };
    bar.appendChild(btn);
  }
}
function renderColorDetails(hex) {
  const area = document.getElementById('selected-color-area');
  area.style.display = 'block';
  area.innerHTML = `
    <h5 class="mb-3">Selected Color: ${hex}</h5>
      <div class="large-swatch mx-2 mb-2" style="background-color: ${hex};"></div>
      <div class="d-flex flex-wrap align-items-center">
      ${[1, 0.8, 0.6, 0.4, 0.2].map(alpha => {
        return `<div class="smol-swatch mx-2 mb-2" style="background-color: ${hexToRgba(hex, alpha)};"></div>`;
      }).join('')}
    </div>
  `;
  document.getElementById('color-container').style.display = 'none';
}

function hexToRgba(hex, alpha) {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
  renderAllColors(currentPage);
});
