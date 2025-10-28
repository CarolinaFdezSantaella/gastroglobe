// Lista de centros predeterminados
const centros = [
  { id:"1", nombre:"The Pilates Room", direccion:"Calle Serrano 45, Madrid", valoracion:4.8, img:"https://images.unsplash.com/photo-1594737625785-c0f3c9f5c4c7?q=80&w=1200", link:"https://www.thepilatesroommadrid.com" },
  { id:"2", nombre:"Pilates Studio Madrid", direccion:"Calle Alcalá 120, Madrid", valoracion:4.6, img:"https://images.unsplash.com/photo-1571019613578-2b193e7d3d8d?q=80&w=1200", link:"https://www.pilatesstudiomadrid.com" },
  { id:"3", nombre:"Pure Pilates", direccion:"Calle Goya 55, Madrid", valoracion:4.9, img:"https://images.unsplash.com/photo-1540206276207-3af25c08abc4?q=80&w=1200", link:"https://www.purepilatesmadrid.com" }
];

let favoritos = JSON.parse(localStorage.getItem("pilatesFav") || "[]");

// DOM
const centrosList = document.getElementById("centrosList");
const favoritosList = document.getElementById("favoritosList");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDireccion = document.getElementById("modalDireccion");
const modalValoracion = document.getElementById("modalValoracion");
const modalLink = document.getElementById("modalLink");

// Render centros
function renderCentros(list, container) {
  container.innerHTML = "";
  list.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${c.img}" alt="${c.nombre}">
      <div class="card-body">
        <div class="card-header">
          <h3>${c.nombre}</h3>
          <button class="star ${favoritos.includes(c.id)?"active":""}" data-id="${c.id}">★</button>
        </div>
        <p>${c.direccion}</p>
        <p>⭐ ${c.valoracion}</p>
        <button class="btn primary verDetalles">Ver más</button>
      </div>
    `;
    card.querySelector(".star").addEventListener("click",()=>toggleFavorito(c.id));
    card.querySelector(".verDetalles").addEventListener("click",()=>abrirModal(c));
    container.appendChild(card);
  });
}

function toggleFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem("pilatesFav", JSON.stringify(favoritos));
  renderCentros(centros, centrosList);
  renderFavoritos();
}

function abrirModal(c) {
  modalImg.src = c.img;
  modalTitle.textContent = c.nombre;
  modalDireccion.textContent = c.direccion;
  modalValoracion.textContent = `⭐ ${c.valoracion}`;
  modalLink.href = c.link;
  modal.showModal();
}
document.querySelector(".modalClose").addEventListener("click",()=>modal.close());

function renderFavoritos() {
  const favs = centros.filter(c => favoritos.includes(c.id));
  renderCentros(favs, favoritosList);
}

// Tabs
document.querySelectorAll(".tabBtn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tabBtn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tabContent").forEach(t=>t.classList.remove("active"));
    document.getElementById(`${btn.dataset.tab}Tab`).classList.add("active");
  });
});

// Inicial
renderCentros(centros, centrosList);
renderFavoritos();
