// === Datos ===
const restaurants = [
  { id:"diverxo", name:"DiverXO", barrio:"Tetuán", cocina:"Alta cocina", precio:4, rating:5, img:"https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop", desc:"La propuesta más creativa de Dabiz Muñoz.", lat:40.4639, lng:-3.6895 },
  { id:"botin", name:"Sobrino de Botín", barrio:"Centro", cocina:"Tradicional", precio:2, rating:4, img:"https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop", desc:"El asador más antiguo del mundo.", lat:40.4155, lng:-3.7089 },
  { id:"tuktuk", name:"Tuk Tuk", barrio:"Chamberí", cocina:"Asiática", precio:1, rating:4, img:"https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop", desc:"Street food asiático: currys, baos y noodles.", lat:40.4380, lng:-3.7050 },
  { id:"streetxo", name:"StreetXO", barrio:"Salamanca", cocina:"Fusión", precio:3, rating:5, img:"https://images.unsplash.com/photo-1557872933-39f7052582b4?q=80&w=1200&auto=format&fit=crop", desc:"Alta cocina pasada por el wok.", lat:40.4245, lng:-3.6880 },
  { id:"bibo", name:"BiBo Madrid", barrio:"Salamanca", cocina:"Andaluza moderna", precio:2, rating:4, img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop", desc:"Fritura fina, atunes y cócteles.", lat:40.4267, lng:-3.6886 },
  // 👇 puedes añadir más aquí fácilmente
];

// === Estado ===
let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

// === DOM ===
const searchInput = document.getElementById("searchInput");
const filterBarrio = document.getElementById("filterBarrio");
const filterCocina = document.getElementById("filterCocina");
const filterPrecio = document.getElementById("filterPrecio");
const filterValoracion = document.getElementById("filterValoracion");
const restaurantList = document.getElementById("restaurantList");
const favoritesList = document.getElementById("favoritesList");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalMap = document.getElementById("modalMap");

// === Filtros dinámicos ===
function llenarSelect(select, values) {
  select.innerHTML = `<option value="Todos">${select.id.includes("Barrio")?"Barrio":"Cocina"}</option>`;
  values.forEach(v => {
    const option = document.createElement("option");
    option.value = v;
    option.textContent = v;
    select.appendChild(option);
  });
}
llenarSelect(filterBarrio, [...new Set(restaurants.map(r => r.barrio))]);
llenarSelect(filterCocina, [...new Set(restaurants.map(r => r.cocina))]);

// === Renderizado ===
function renderRestaurantes(lista, destino) {
  destino.innerHTML = "";
  lista.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}">
      <div class="card-body">
        <div class="card-header">
          <h3>${r.name}</h3>
          <button class="star ${favoritos.includes(r.id)?"active":""}" data-id="${r.id}">★</button>
        </div>
        <p>${r.barrio} • ${r.cocina} • ${"€".repeat(r.precio)} • ⭐ ${r.rating}</p>
        <button class="btn ghost verDetalles">Ver detalles</button>
      </div>
    `;
    card.querySelector(".star").addEventListener("click", e => toggleFavorito(r.id, e.target));
    card.querySelector(".verDetalles").addEventListener("click", () => abrirModal(r));
    destino.appendChild(card);
  });
}

function aplicarFiltros() {
  const q = searchInput.value.toLowerCase();
  const b = filterBarrio.value;
  const c = filterCocina.value;
  const p = filterPrecio.value;
  const v = Number(filterValoracion.value);

  const filtrados = restaurants.filter(r => {
    return (r.name.toLowerCase().includes(q) ||
            r.barrio.toLowerCase().includes(q) ||
            r.cocina.toLowerCase().includes(q)) &&
           (b === "Todos" || r.barrio === b) &&
           (c === "Todos" || r.cocina === c) &&
           (p === "Todos" || r.precio == p) &&
           (v === 0 || r.rating >= v);
  });
  renderRestaurantes(filtrados, restaurantList);
}

// === Favoritos ===
function toggleFavorito(id, btn) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    btn.classList.remove("active");
  } else {
    favoritos.push(id);
    btn.classList.add("active");
  }
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  renderFavoritos();
}

function renderFavoritos() {
  const favs = restaurants.filter(r => favoritos.includes(r.id));
  renderRestaurantes(favs, favoritesList);
}

// === Modal ===
function abrirModal(r) {
  modalImg.src = r.img;
  modalTitle.textContent = r.name;
  modalMeta.textContent = `${r.barrio} • ${r.cocina} • ${"€".repeat(r.precio)} • ⭐ ${r.rating}`;
  modalDesc.textContent = r.desc;
  modalMap.src = `https://www.google.com/maps?q=${r.lat},${r.lng}&z=15&output=embed`;
  modal.showModal();
}
document.querySelector(".modalClose").addEventListener("click", () => modal.close());

// === Tabs ===
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".tabContent").forEach(t => t.classList.remove("active"));
    document.getElementById(`${btn.dataset.tab}Tab`).classList.add("active");
  });
});

// === Tema claro/oscuro ===
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// === Eventos ===
searchInput.addEventListener("input", aplicarFiltros);
[filterBarrio, filterCocina, filterPrecio, filterValoracion].forEach(el => el.addEventListener("change", aplicarFiltros));

// === Inicial ===
aplicarFiltros();
renderFavoritos();
