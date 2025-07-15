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
          <p class="text-start mx-2">${color.hex}</p>
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
  console.log(hex);


  const listView = document.getElementById('list-view');
  const detailView = document.getElementById('detail-view');

  listView.style.display = 'none';
  detailView.style.display = 'block';

  detailView.innerHTML = `
          <div class="d-flex flex-wrap justify-content-center">
            <div class="card mx-3 border-dark rounded-3" style="width: 810px;">
              <div class="card-top large-swatch" style= "background-color: ${hex}"></div>
              <div class="card-body my-2">${hex}</div>
            </div>
          </div>
      <div class="d-flex flex-wrap justify-content-center">
      ${[1, 0.8, 0.6, 0.4, 0.2].map(alpha => {
        return `<div class="card m-1 shadow-sm">
              <div class="card-top small-swatch p-0" style="background-color: ${hexToRgba(hex, alpha)}"></div>
              <p class="card-body text-center mr-5 ml-1 p-0">${hex} alpha:${alpha}</p>
            </div>`;
      }).join('')}
      </div>
    <div class="d-flex justify-content-center my-3">
            <button id="clearView" class="btn px-5" style="background-color: white; border-color: black;">
              <b>Clear</b>
            </button>
          </div>
  `;
  const clearButton = document.getElementById("clearView");
  clearButton.addEventListener("click", () => {
  // Set initial button text and view states
    detailView.style.display ="none";
    listView.style.display = "block";
    clearButton.style.display ="none";
});

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

  const detailView = document.getElementById("detail-view");
  const listView = document.getElementById("color-container");



window.addEventListener("DOMContentLoaded", () => {
  detailView.style.display = "none";
  listView.style.display = "block";
});

