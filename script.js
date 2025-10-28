// --- Datos de Madrid (demo curada) ---
const restaurants = [
  {
    id: "diverxo",
    name: "DiverXO",
    barrio: "Tetuán",
    cocina: "Alta cocina",
    priceLevel: 4,
    rating: 5,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    desc: "La propuesta más creativa de Dabiz Muñoz: viaje global con técnica bestial.",
    url: "https://www.diverxo.com/",
    lat: 40.4639, lng: -3.6895,
    tags: ["Degustación", "Creativo", "Experiencia"]
  },
  {
    id: "ravioxo",
    name: "RavioXO",
    barrio: "Chamartín",
    cocina: "Fusión",
    priceLevel: 3,
    rating: 5,
    img: "https://images.unsplash.com/photo-1541542684-4a6e2237874d?q=80&w=1200&auto=format&fit=crop",
    desc: "Pasta al límite: dumplings, raviolis y masa con imaginación XO.",
    url: "https://www.ravioxo.com/",
    lat: 40.4511, lng: -3.6905,
    tags: ["Pasta", "Dumplings", "Creativo"]
  },
  {
    id: "saladedespiece",
    name: "Sala de Despiece",
    barrio: "Chamberí",
    cocina: "Moderna",
    priceLevel: 2,
    rating: 4,
    img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    desc: "Producto y técnica al detalle en una barra vibrante.",
    url: "https://www.saladedespiece.com/",
    lat: 40.4357, lng: -3.7022,
    tags: ["Producto", "Barra", "Reservas"]
  },
  {
    id: "botin",
    name: "Sobrino de Botín",
    barrio: "Centro",
    cocina: "Tradicional",
    priceLevel: 2,
    rating: 4,
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    desc: "El asador más clásico: cochinillo y cordero asado en horno de leña.",
    url: "https://botin.es/",
    lat: 40.4155, lng: -3.7089,
    tags: ["Clásico", "Asador", "Horno de leña"]
  },
  {
    id: "casalucio",
    name: "Casa Lucio",
    barrio: "La Latina",
    cocina: "Tradicional",
    priceLevel: 2,
    rating: 4,
    img: "https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",
    desc: "Famoso por sus huevos rotos y platos castizos.",
    url: "https://www.casalucio.es/",
    lat: 40.4115, lng: -3.7081,
    tags: ["Castizo", "Huevos rotos"]
  },
  {
    id: "cisneazul",
    name: "El Cisne Azul",
    barrio: "Chueca",
    cocina: "Producto",
    priceLevel: 2,
    rating: 5,
    img: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1200&auto=format&fit=crop",
    desc: "Templo de las setas y caza. Sencillez que emociona.",
    url: "https://example.com/cisneazul",
    lat: 40.4234, lng: -3.6980,
    tags: ["Setas", "Caza"]
  },
  {
    id: "lhardy",
    name: "Lhardy",
    barrio: "Centro",
    cocina: "Tradicional",
    priceLevel: 3,
    rating: 4,
    img: "https://images.unsplash.com/photo-1543352634-8730a9a57064?q=80&w=1200&auto=format&fit=crop",
    desc: "Historia viva y cocido elegante en el corazón de Madrid.",
    url: "https://lhardy.com/",
    lat: 40.4187, lng: -3.7057,
    tags: ["Cocido", "Histórico"]
  },
  {
    id: "bibo",
    name: "BiBo Madrid",
    barrio: "Salamanca",
    cocina: "Andaluza moderna",
    priceLevel: 2,
    rating: 4,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    desc: "Dani García en clave divertida: fritura fina, atunes y cócteles.",
    url: "https://www.grupodanigarcia.com/restaurantes/bibo-madrid/",
    lat: 40.4267, lng: -3.6886,
    tags: ["Cócteles", "Andaluz", "Divertido"]
  }
];

// --- Helpers ---
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const euro = n => "€".repeat(n);

// LS Notas
const NOTES_KEY = "ggm_notas";
const loadNotes = () => JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
const saveNotes = (obj) => localStorage.setItem(NOTES_KEY, JSON.stringify(obj));
let notes = loadNotes();

// DOM refs
const listEl = $("#restaurantList");
const searchInput = $("#searchInput");
const selectBarrio = $("#selectBarrio");
const selectCocina = $("#selectCocina");
const selectPrecio = $("#selectPrecio");
const selectRating = $("#selectRating");
const selectSort = $("#selectSort");
const chipCuisines = $("#chipCuisines");

// Modal refs
const modal = $("#modal");
const mImg = $("#mImg");
const mTitle = $("#mTitle");
const mMeta = $("#mMeta");
const mDesc = $("#mDesc");
const mTags = $("#mTags");
const mMap = $("#mMap");
const mLink = $("#mLink");
const mNote = $("#mNote");
const mSaveNote = $("#mSaveNote");

// --- Inicialización de filtros dinámicos ---
const barrios = ["Todos", ...new Set(restaurants.map(r => r.barrio))];
const cocinas = ["Todos", ...new Set(restaurants.map(r => r.cocina))];

function fillSelect(el, items){
  items.forEach(v=>{
    const o=document.createElement("option");
    o.value=v; o.textContent=v; el.appendChild(o);
  });
}
fillSelect(selectBarrio, barrios);
fillSelect(selectCocina, cocinas);

// Chips de cocina destacadas
cocinas.filter(c=>c!=="Todos").slice(0,6).forEach(c=>{
  const b=document.createElement("button");
  b.className="chip";
  b.textContent=c;
  b.addEventListener("click", ()=>{
    // Toggle
    const active = b.classList.toggle("active");
    // Desactivar otros chips
    $$(".chip").forEach(x=>{ if(x!==b) x.classList.remove("active"); });
    // Aplicar al select
    selectCocina.value = active ? c : "Todos";
    render();
  });
  chipCuisines.appendChild(b);
});

// --- Render cards ---
function render(){
  listEl.innerHTML = "";

  const q = (searchInput.value || "").toLowerCase();
  const fBarrio = selectBarrio.value;
  const fCocina = selectCocina.value;
  const fPrecio = selectPrecio.value;
  const fRating = Number(selectRating.value);
  const sort = selectSort.value;

  let items = restaurants.filter(r=>{
    const matchesQ = [r.name, r.barrio, r.cocina].join(" ").toLowerCase().includes(q);
    const okBarrio = (fBarrio==="Todos" || r.barrio===fBarrio);
    const okCocina = (fCocina==="Todos" || r.cocina===fCocina);
    const okPrecio = (fPrecio==="Todos" || r.priceLevel===Number(fPrecio));
    const okRating = (r.rating >= fRating);
    return matchesQ && okBarrio && okCocina && okPrecio && okRating;
  });

  if (sort==="rating") items.sort((a,b)=>b.rating - a.rating);
  else if (sort==="precioAsc") items.sort((a,b)=>a.priceLevel - b.priceLevel);
  else if (sort==="precioDesc") items.sort((a,b)=>b.priceLevel - a.priceLevel);
  else if (sort==="az") items.sort((a,b)=>a.name.localeCompare(b.name));

  if(items.length===0){
    listEl.innerHTML = `<div class="muted">No hay resultados con esos filtros.</div>`;
    return;
  }

  items.forEach(r=>{
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}">
      <div class="body">
        <div class="title">${r.name}</div>
        <div class="muted">${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}</div>
        <div class="tags">${r.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn primary">Ver detalles</button>
          <a class="btn ghost" href="${r.url}" target="_blank" rel="noreferrer">Web</a>
        </div>
      </div>
    `;
    card.querySelector(".btn.primary").addEventListener("click", ()=>openModal(r));
    listEl.appendChild(card);
  });
}

// --- Modal ---
let currentId = null;
function openModal(r){
  currentId = r.id;
  mImg.src = r.img;
  mImg.alt = r.name;
  mTitle.textContent = r.name;
  mMeta.textContent = `${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}`;
  mDesc.textContent = r.desc;
  mTags.innerHTML = r.tags.map(t=>`<span class="tag">${t}</span>`).join("");
  const q = encodeURIComponent(`${r.lat},${r.lng}`);
  mMap.src = `https://www.google.com/maps?q=${q}&hl=es&z=15&output=embed`;
  mLink.href = r.url;
  mNote.value = (notes[r.id] || "");
  modal.showModal();
}
$(".modal__close").addEventListener("click", ()=>modal.close());
mSaveNote.addEventListener("click", ()=>{
  if(!currentId) return;
  notes[currentId] = mNote.value.trim();
  saveNotes(notes);
  mSaveNote.textContent = "Guardado ✓";
  setTimeout(()=> mSaveNote.textContent = "Guardar nota", 1200);
});

// --- Theme ---
const themeToggle = $("#themeToggle");
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙 Oscuro" : "☀️ Claro";
});

// --- Random ---
$("#randomBtn").addEventListener("click", ()=>{
  const pool = restaurants;
  const r = pool[Math.floor(Math.random()*pool.length)];
  openModal(r);
});

// --- Eventos ---
searchInput.addEventListener("input", render);
[selectBarrio, selectCocina, selectPrecio, selectRating, selectSort].forEach(el=> el.addEventListener("change", render));

// --- Arranque ---
render();
