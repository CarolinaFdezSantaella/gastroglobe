// ======== Datos base Madrid (ampliados) ========
let restaurants = [
  { id:"diverxo", name:"DiverXO", barrio:"Tetuán", cocina:"Alta cocina", priceLevel:4, rating:5,
    img:"https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    desc:"La propuesta más creativa de Dabiz Muñoz: viaje global con técnica bestial.",
    url:"https://www.diverxo.com/", lat:40.4639, lng:-3.6895, tags:["Degustación","Creativo","Experiencia"] },
  { id:"ravioxo", name:"RavioXO", barrio:"Chamartín", cocina:"Fusión", priceLevel:3, rating:5,
    img:"https://images.unsplash.com/photo-1541542684-4a6e2237874d?q=80&w=1200&auto=format&fit=crop",
    desc:"Pasta al límite: dumplings, raviolis y masa con imaginación XO.",
    url:"https://www.ravioxo.com/", lat:40.4511, lng:-3.6905, tags:["Pasta","Dumplings","Creativo"] },
  { id:"saladedespiece", name:"Sala de Despiece", barrio:"Chamberí", cocina:"Moderna", priceLevel:2, rating:4,
    img:"https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    desc:"Producto y técnica al detalle en una barra vibrante.",
    url:"https://www.saladedespiece.com/", lat:40.4357, lng:-3.7022, tags:["Producto","Barra","Reservas"] },
  { id:"botin", name:"Sobrino de Botín", barrio:"Centro", cocina:"Tradicional", priceLevel:2, rating:4,
    img:"https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    desc:"El asador más clásico: cochinillo y cordero asado en horno de leña.",
    url:"https://botin.es/", lat:40.4155, lng:-3.7089, tags:["Clásico","Asador","Horno de leña"] },
  { id:"casalucio", name:"Casa Lucio", barrio:"La Latina", cocina:"Tradicional", priceLevel:2, rating:4,
    img:"https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",
    desc:"Famoso por sus huevos rotos y platos castizos.",
    url:"https://www.casalucio.es/", lat:40.4115, lng:-3.7081, tags:["Castizo","Huevos rotos"] },
  { id:"cisneazul", name:"El Cisne Azul", barrio:"Chueca", cocina:"Producto", priceLevel:2, rating:5,
    img:"https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1200&auto=format&fit=crop",
    desc:"Templo de las setas y caza. Sencillez que emociona.",
    url:"#", lat:40.4234, lng:-3.6980, tags:["Setas","Caza"] },
  { id:"lhardy", name:"Lhardy", barrio:"Centro", cocina:"Tradicional", priceLevel:3, rating:4,
    img:"https://images.unsplash.com/photo-1543352634-8730a9a57064?q=80&w=1200&auto=format&fit=crop",
    desc:"Historia viva y cocido elegante en el corazón de Madrid.",
    url:"https://lhardy.com/", lat:40.4187, lng:-3.7057, tags:["Cocido","Histórico"] },
  { id:"bibo", name:"BiBo Madrid", barrio:"Salamanca", cocina:"Andaluza moderna", priceLevel:2, rating:4,
    img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    desc:"Dani García en clave divertida: fritura fina, atunes y cócteles.",
    url:"https://www.grupodanigarcia.com/restaurantes/bibo-madrid/", lat:40.4267, lng:-3.6886, tags:["Cócteles","Andaluz","Divertido"] },
  { id:"streetxo", name:"StreetXO", barrio:"Salamanca", cocina:"Fusión callejera", priceLevel:3, rating:5,
    img:"https://images.unsplash.com/photo-1557872933-39f7052582b4?q=80&w=1200&auto=format&fit=crop",
    desc:"Alta cocina pasada por el wok: cañera, ácida y picante.",
    url:"https://www.streetxo.com/", lat:40.4245, lng:-3.6880, tags:["Wok","Picante","Show"] },
  { id:"tuktuk", name:"Tuk Tuk", barrio:"Chamberí", cocina:"Asiática", priceLevel:1, rating:4,
    img:"https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    desc:"Street food asiático: currys, baos y noodles viajeros.",
    url:"https://www.tuktukstreetfood.es/", lat:40.4380, lng:-3.7050, tags:["Street food","Baos","Curry"] },
  { id:"coque", name:"Coque", barrio:"Chamberí", cocina:"Alta cocina", priceLevel:4, rating:5,
    img:"https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1200&auto=format&fit=crop",
    desc:"La experiencia de los hermanos Sandoval: bodega, cocina y sala.",
    url:"https://restaurantecoque.com/", lat:40.4388, lng:-3.6999, tags:["Degustación","Bodega","Técnica"] },
  { id:"lakasa", name:"Lakasa", barrio:"Chamberí", cocina:"De mercado", priceLevel:2, rating:5,
    img:"https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=1200&auto=format&fit=crop",
    desc:"Producto de temporada con mucho sabor y cocina honesta.",
    url:"#", lat:40.4389, lng:-3.7052, tags:["Mercado","Temporada"] },
  { id:"arroceria", name:"St. James", barrio:"Chamartín", cocina:"Arrocería", priceLevel:2, rating:4,
    img:"https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop",
    desc:"Arroces secos y caldosos de referencia.",
    url:"#", lat:40.4505, lng:-3.6760, tags:["Arroces"] },
  { id:"pizzalolo", name:"Lolo Pollo & Pizza", barrio:"Malasaña", cocina:"Italiana", priceLevel:1, rating:4,
    img:"https://images.unsplash.com/photo-1548365328-9f547fb095f4?q=80&w=1200&auto=format&fit=crop",
    desc:"Pizza artesana con masa lenta y ambiente informal.",
    url:"#", lat:40.4269, lng:-3.7058, tags:["Pizza","Casual"] },
  { id:"xiongzai", name:"Xiongzai", barrio:"Usera", cocina:"China Sichuan", priceLevel:1, rating:4,
    img:"https://images.unsplash.com/photo-1604908554027-8d2c2b3a4a4e?q=80&w=1200&auto=format&fit=crop",
    desc:"Picantes y numbing auténticos de Sichuan.",
    url:"#", lat:40.385, lng:-3.700, tags:["Sichuan","Picante"] },
  { id:"goikogrill", name:"Goiko", barrio:"Centro", cocina:"Hamburguesas", priceLevel:1, rating:4,
    img:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop",
    desc:"Burgers potentes y combos.",
    url:"#", lat:40.419, lng:-3.703, tags:["Burger"] },
  { id:"barriooeste", name:"Fismuler", barrio:"Chamberí", cocina:"Nórdica/Moderna", priceLevel:2, rating:5,
    img:"https://images.unsplash.com/photo-1541542684-bc6d6b6c2b83?q=80&w=1200&auto=format&fit=crop",
    desc:"Platos con verdura, fermentados y postres memorables.",
    url:"#", lat:40.435, lng:-3.699, tags:["Moderno","Postres"] },
  { id:"nakeima", name:"Nakeima", barrio:"Argüelles", cocina:"Fusión", priceLevel:2, rating:5,
    img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1200&auto=format&fit=crop",
    desc:"Barra canalla con pases sorpresa.",
    url:"#", lat:40.431, lng:-3.717, tags:["Barra","Sorpresa"] },
  { id:"tatel", name:"TATEL", barrio:"Salamanca", cocina:"Internacional", priceLevel:3, rating:4,
    img:"https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",
    desc:"Ambiente elegante, noche y clásicos revisados.",
    url:"#", lat:40.427, lng:-3.689, tags:["Noche","Clásicos"] },
  { id:"bocadillo", name:"El Brillante", barrio:"Atocha", cocina:"Castiza", priceLevel:1, rating:3,
    img:"https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    desc:"Bocata de calamares icónico.",
    url:"#", lat:40.406, lng:-3.691, tags:["Calamares","Icono"] }
];

// ====== utilidades / estado ======
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const euro = n => "€".repeat(n);

const NOTES_KEY = "ggm_notas";
const TOP_KEY = "ggm_top";
const PAL_KEY = "ggm_palette";

const load = k => JSON.parse(localStorage.getItem(k) || (k===TOP_KEY?"[]":"{}"));
const save = (k,v) => localStorage.setItem(k, JSON.stringify(v));

let notes = load(NOTES_KEY);
let topList = load(TOP_KEY);

// DOM
const listEl = $("#restaurantList");
const searchInput = $("#searchInput");
const selectBarrio = $("#selectBarrio");
const selectCocina = $("#selectCocina");
const selectPrecio = $("#selectPrecio");
const selectRating = $("#selectRating");
const selectSort = $("#selectSort");
const chipCuisines = $("#chipCuisines");
const priceChipsWrap = $("#chipPrice");
const resultCount = $("#resultCount");
const clearBtn = $("#clearBtn");
const topListEl = $("#topList");
const fileInput = $("#fileInput");
const loadMoreBtn = $("#loadMoreBtn");

// Modal
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

// Paleta
const paletteBtn = $("#paletteBtn");
const savedPal = localStorage.getItem(PAL_KEY);
if(savedPal){ document.body.setAttribute("data-palette", savedPal); }

// ===== Inicialización de selects y chips =====
function uniq(arr){ return ["Todos", ...Array.from(new Set(arr))]; }
function fillSelect(el, items){ items.forEach(v=>{ const o=document.createElement("option"); o.value=v; o.textContent=v; el.appendChild(o); }); }

fillSelect(selectBarrio, uniq(restaurants.map(r=>r.barrio)));
fillSelect(selectCocina, uniq(restaurants.map(r=>r.cocina)));

// Chips de cocina destacadas
uniq(restaurants.map(r=>r.cocina)).filter(c=>c!=="Todos").slice(0,8).forEach(c=>{
  const b=document.createElement("button");
  b.className="chip";
  b.textContent=c;
  b.addEventListener("click", ()=>{
    const active = b.classList.toggle("active");
    $$(".chips .chip").forEach(x=>{
      if(x.parentElement.id==="chipCuisines" && x!==b) x.classList.remove("active");
    });
    selectCocina.value = active ? c : "Todos";
    render();
  });
  chipCuisines.appendChild(b);
});

// Chips de precio (sincronizados con el select)
priceChipsWrap.addEventListener("click",(e)=>{
  const btn = e.target.closest(".chip");
  if(!btn) return;
  const val = btn.dataset.price;
  // activar solo uno
  $$("#chipPrice .chip").forEach(c=>c.classList.remove("active"));
  btn.classList.add("active");
  // sincroniza select
  selectPrecio.value = val;
  render();
});

// ====== Top render ======
function renderTop(){
  topListEl.innerHTML = "";
  if(topList.length===0){ topListEl.innerHTML = `<span class="muted">Aún no has marcado favoritos.</span>`; return; }
  topList.map(id => restaurants.find(r=>r.id===id)).filter(Boolean).forEach(r=>{
    const el = document.createElement("div");
    el.className = "topItem";
    el.innerHTML = `<img src="${r.img}" alt=""><span>${r.name}</span>`;
    topListEl.appendChild(el);
  });
}

// ====== Render cards ======
let currentResults = [];
function render(){
  listEl.innerHTML = "";

  const q = (searchInput.value || "").toLowerCase();
  const fBarrio = selectBarrio.value;
  const fCocina = selectCocina.value;
  const fPrecio = selectPrecio.value; // "Todos" | "1" | "2" | "3" | "4"
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

  currentResults = items;
  resultCount.textContent = `${items.length} resultado${items.length!==1?"s":""}`;

  if(items.length===0){
    listEl.innerHTML = `<div class="muted">No hay resultados con esos filtros. Prueba “Todos” en € o baja el rating.</div>`;
    return;
  }

  items.forEach(r=>{
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}" loading="lazy">
      <div class="body">
        <div style="display:flex; gap:8px; align-items:center">
          <div class="title">${r.name}</div>
          <button class="starBtn ${topList.includes(r.id)?"active":""}" title="Añadir a Mi TOP">★</button>
        </div>
        <div class="muted">${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}</div>
        <div class="tags">${r.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn primary">Ver detalles</button>
          <a class="btn ghost" href="${r.url}" target="_blank" rel="noreferrer">Web</a>
        </div>
      </div>
    `;
    card.querySelector(".btn.primary").addEventListener("click", ()=>openModal(r));
    const star = card.querySelector(".starBtn");
    star.addEventListener("click", ()=>{
      if(topList.includes(r.id)){
        topList = topList.filter(x=>x!==r.id);
        star.classList.remove("active");
      } else {
        topList.push(r.id);
        star.classList.add("active");
      }
      save(TOP_KEY, topList);
      renderTop();
    });
    listEl.appendChild(card);
  });
}

// ====== Modal ======
let currentId = null;
function openModal(r){
  currentId = r.id;
  mImg.src = r.img; mImg.alt = r.name;
  mTitle.textContent = r.name;
  mMeta.textContent = `${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}`;
  mDesc.textContent = r.desc;
  mTags.innerHTML = r.tags.map(t=>`<span class="tag">${t}</span>`).join("");
  const q = encodeURIComponent(`${r.lat},${r.lng}`);
  mMap.src = `https://www.google.com/maps?q=${q}&hl=es&z=15&output=embed`;
  mLink.href = r.url || "#";
  mNote.value = (notes[r.id] || "");
  modal.showModal();
}
$(".modal__close").addEventListener("click", ()=>modal.close());
mSaveNote.addEventListener("click", ()=>{
  if(!currentId) return;
  notes[currentId] = mNote.value.trim();
  save(NOTES_KEY, notes);
  mSaveNote.textContent = "Guardado ✓";
  setTimeout(()=> mSaveNote.textContent = "Guardar nota", 1200);
});

// ====== Theme + Palette ======
const themeToggle = $("#themeToggle");
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙 Oscuro" : "☀️ Claro";
});
paletteBtn.addEventListener("click", ()=>{
  const now = document.body.getAttribute("data-palette")==="coral" ? "" : "coral";
  if(now) document.body.setAttribute("data-palette", now);
  else document.body.removeAttribute("data-palette");
  localStorage.setItem(PAL_KEY, now);
});

// ====== Random ======
$("#randomBtn").addEventListener("click", ()=>{
  const r = restaurants[Math.floor(Math.random()*restaurants.length)];
  openModal(r);
});

// ====== Limpiar filtros ======
clearBtn.addEventListener("click", ()=>{
  searchInput.value = "";
  selectBarrio.value = "Todos";
  selectCocina.value = "Todos";
  selectPrecio.value = "Todos";
  selectRating.value = "0";
  selectSort.value = "relevancia";
  // chips
  $$("#chipPrice .chip").forEach(c=>c.classList.remove("active"));
  $$("#chipPrice .chip[data-price='Todos']").classList.add("active");
  $$("#chipCuisines .chip").forEach(c=>c.classList.remove("active"));
  render();
});

// ====== Importar CSV/JSON ======
fileInput.addEventListener("change", async (e)=>{
  const file = e.target.files[0]; if(!file) return;
  const text = await file.text();
  try{
    let extra = [];
    if(file.name.endsWith(".json")){
      extra = JSON.parse(text);
    } else {
      // CSV simple
      extra = csvToObjects(text);
    }
    addRestaurants(extra);
  } catch(err){
    alert("Archivo no válido: " + err.message);
  }
  fileInput.value = "";
});
function csvToObjects(csv){
  const lines = csv.trim().split(/\r?\n/);
  const headers = lines.shift().split(",").map(h=>h.trim());
  return lines.map(line=>{
    const cols = line.split(",").map(c=>c.trim());
    const obj = {};
    headers.forEach((h,i)=> obj[h] = cols[i] || "");
    obj.id = (obj.id || (obj.name+"-"+Math.random().toString(36).slice(2))).toLowerCase();
    obj.priceLevel = Number(obj.priceLevel||1);
    obj.rating = Number(obj.rating||0);
    obj.tags = (obj.tags||"").split("|").filter(Boolean);
    obj.lat = Number(obj.lat||0); obj.lng = Number(obj.lng||0);
    return obj;
  });
}
function addRestaurants(arr){
  if(!Array.isArray(arr)) return;
  // merge evitando duplicados por id
  const byId = new Map(restaurants.map(r=>[r.id,r]));
  arr.forEach(r=>{
    const id = (r.id || (r.name+"-"+Math.random().toString(36).slice(2))).toLowerCase();
    byId.set(id, { ...byId.get(id), ...r, id });
  });
  restaurants = Array.from(byId.values());
  // refrescar selects con nuevos valores
  selectBarrio.innerHTML=""; selectCocina.innerHTML="";
  fillSelect(selectBarrio, uniq(restaurants.map(r=>r.barrio)));
  fillSelect(selectCocina, uniq(restaurants.map(r=>r.cocina)));
  renderTop(); render();
  alert(`Se han añadido ${arr.length} restaurantes.`);
}

// ====== Cargar más (demo) ======
loadMoreBtn.addEventListener("click", ()=>{
  const more = [
    { id:"sacha", name:"Sacha", barrio:"Chamartín", cocina:"Clásicos creativos", priceLevel:3, rating:5,
      img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      desc:"Casa de culto madrileña con platos míticos.", url:"#", lat:40.451, lng:-3.686, tags:["Clásicos","Autor"] },
    { id:"arallo", name:"Arallo", barrio:"Centro", cocina:"Gallega fusión", priceLevel:2, rating:4,
      img:"https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
      desc:"Cocina atlántica con guiños asiáticos.", url:"#", lat:40.421, lng:-3.706, tags:["Gallego","Fusión"] },
    { id:"tandoori", name:"Tandoori Station", barrio:"Salamanca", cocina:"India", priceLevel:2, rating:5,
      img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
      desc:"Currys finos y horno tandoor impecable.", url:"#", lat:40.429, lng:-3.675, tags:["India","Curry"] },
    { id:"kabuki", name:"Kabuki Wellington", barrio:"Salamanca", cocina:"Japo fusión", priceLevel:4, rating:5,
      img:"https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop",
      desc:"Nigiris finísimos y producto top.", url:"#", lat:40.427, lng:-3.686, tags:["Nigiri","Alta cocina"] },
    { id:"sandoval", name:"Smoked Room", barrio:"Salamanca", cocina:"Brasas alta cocina", priceLevel:4, rating:5,
      img:"https://images.unsplash.com/photo-1544025162-8c05f0f6f2ee?q=80&w=1200&auto=format&fit=crop",
      desc:"Degustación a la brasa de altísimo nivel.", url:"#", lat:40.437, lng:-3.686, tags:["Brasas","Degustación"] }
  ];
  addRestaurants(more);
});

// ====== Eventos ======
searchInput.addEventListener("input", render);
[selectBarrio, selectCocina, selectPrecio, selectRating, selectSort].forEach(el=> el.addEventListener("change", render));

// ====== Arranque ======
renderTop();
render();
