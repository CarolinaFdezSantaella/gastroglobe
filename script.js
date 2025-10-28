// === utilidades y estado ===
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const euro = n => "€".repeat(n);
const TOP_KEY = "ggm_top";
const NOTES_KEY = "ggm_notes";
const PAL_KEY = "ggm_palette";
const load = k => JSON.parse(localStorage.getItem(k) || (k === TOP_KEY ? "[]" : "{}"));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let favorites = load(TOP_KEY);
let notes = load(NOTES_KEY);

// === DOM ===
const restaurantList = $("#restaurantList");
const favoritesList = $("#favoritesList");
const searchInput = $("#searchInput");
const selectBarrio = $("#selectBarrio");
const selectCocina = $("#selectCocina");
const selectPrecio = $("#selectPrecio");
const selectRating = $("#selectRating");
const selectSort = $("#selectSort");
const chipPrice = $("#chipPrice");
const chipCuisines = $("#chipCuisines");
const resultCount = $("#resultCount");
const clearBtn = $("#clearBtn");
const themeToggle = $("#themeToggle");
const paletteBtn = $("#paletteBtn");

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

// === Datos de ejemplo ===
let restaurants = [
  {id:"diverxo",name:"DiverXO",barrio:"Tetuán",cocina:"Alta cocina",priceLevel:4,rating:5,img:"https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",desc:"La propuesta más creativa de Dabiz Muñoz.",url:"https://www.diverxo.com/",lat:40.4639,lng:-3.6895,tags:["Degustación","Creativo"]},
  {id:"bibo",name:"BiBo Madrid",barrio:"Salamanca",cocina:"Andaluza moderna",priceLevel:2,rating:4,img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",desc:"Fritura fina, atunes y cócteles.",url:"https://www.grupodanigarcia.com/restaurantes/bibo-madrid/",lat:40.4267,lng:-3.6886,tags:["Andaluz","Cócteles"]},
  {id:"botin",name:"Sobrino de Botín",barrio:"Centro",cocina:"Tradicional",priceLevel:2,rating:4,img:"https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",desc:"El asador más antiguo del mundo.",url:"https://botin.es/",lat:40.4155,lng:-3.7089,tags:["Castizo","Asador"]},
  {id:"tuktuk",name:"Tuk Tuk",barrio:"Chamberí",cocina:"Asiática",priceLevel:1,rating:4,img:"https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",desc:"Street food asiático: currys, baos y noodles.",url:"https://www.tuktukstreetfood.es/",lat:40.4380,lng:-3.7050,tags:["Street food","Curry"]},
  {id:"fismuler",name:"Fismuler",barrio:"Chamberí",cocina:"Moderna",priceLevel:3,rating:5,img:"https://images.unsplash.com/photo-1541542684-bc6d6b6c2b83?q=80&w=1200&auto=format&fit=crop",desc:"Platos con verdura y postres top.",url:"#",lat:40.435,lng:-3.699,tags:["Moderno","Postres"]},
  {id:"casaLucio",name:"Casa Lucio",barrio:"La Latina",cocina:"Tradicional",priceLevel:2,rating:4,img:"https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",desc:"Famoso por sus huevos rotos y platos castizos.",url:"https://www.casalucio.es/",lat:40.4115,lng:-3.7081,tags:["Castizo","Huevos rotos"]},
  {id:"streetxo",name:"StreetXO",barrio:"Salamanca",cocina:"Fusión callejera",priceLevel:3,rating:5,img:"https://images.unsplash.com/photo-1557872933-39f7052582b4?q=80&w=1200&auto=format&fit=crop",desc:"Alta cocina pasada por el wok.",url:"https://www.streetxo.com/",lat:40.4245,lng:-3.6880,tags:["Wok","Picante","Show"]},
  {id:"coque",name:"Coque",barrio:"Chamberí",cocina:"Alta cocina",priceLevel:4,rating:5,img:"https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1200&auto=format&fit=crop",desc:"La experiencia Sandoval: bodega, cocina y sala.",url:"https://restaurantecoque.com/",lat:40.4388,lng:-3.6999,tags:["Degustación","Bodega","Técnica"]}
];

// === filtros dinámicos ===
function uniq(arr){ return ["Todos",...Array.from(new Set(arr))]; }
function fillSelect(el, items){ el.innerHTML=""; items.forEach(v=>{ const o=document.createElement("option"); o.value=v; o.textContent=v; el.appendChild(o); }); }
fillSelect(selectBarrio, uniq(restaurants.map(r=>r.barrio)));
fillSelect(selectCocina, uniq(restaurants.map(r=>r.cocina)));

uniq(restaurants.map(r=>r.cocina)).filter(c=>c!=="Todos").slice(0,8).forEach(c=>{
  const b=document.createElement("button");
  b.className="chip";
  b.textContent=c;
  b.addEventListener("click", ()=>{
    const active = b.classList.toggle("active");
    $$("#chipCuisines .chip").forEach(x=>x!==b && x.classList.remove("active"));
    selectCocina.value = active ? c : "Todos";
    renderRestaurants();
  });
  chipCuisines.appendChild(b);
});

chipPrice.addEventListener("click",(e)=>{
  const btn = e.target.closest(".chip");
  if(!btn) return;
  const val = btn.dataset.price;
  $$("#chipPrice .chip").forEach(c=>c.classList.remove("active"));
  btn.classList.add("active");
  selectPrecio.value = val;
  renderRestaurants();
});

// === render ===
function renderRestaurants(){
  restaurantList.innerHTML="";
  const q=(searchInput.value||"").toLowerCase();
  const fBarrio=selectBarrio.value;
  const fCocina=selectCocina.value;
  const fPrecio=selectPrecio.value;
  const fRating=Number(selectRating.value);
  const sort=selectSort.value;

  let items=restaurants.filter(r=>{
    const matchesQ=[r.name,r.barrio,r.cocina].join(" ").toLowerCase().includes(q);
    const okBarrio=(fBarrio==="Todos"||r.barrio===fBarrio);
    const okCocina=(fCocina==="Todos"||r.cocina===fCocina);
    const okPrecio=(fPrecio==="Todos"||r.priceLevel===Number(fPrecio));
    const okRating=(r.rating>=fRating);
    return matchesQ && okBarrio && okCocina && okPrecio && okRating;
  });

  if (sort==="rating") items.sort((a,b)=>b.rating - a.rating);
  else if (sort==="precioAsc") items.sort((a,b)=>a.priceLevel - b.priceLevel);
  else if (sort==="precioDesc") items.sort((a,b)=>b.priceLevel - a.priceLevel);
  else if (sort==="az") items.sort((a,b)=>a.name.localeCompare(b.name));

  resultCount.textContent = `${items.length} resultado${items.length!==1?"s":""}`;
  if(items.length===0){ restaurantList.innerHTML=`<div class="muted">No hay resultados.</div>`; return; }

  items.forEach(r=>{
    const card=document.createElement("article");
    card.className="card";
    card.innerHTML=`
      <img src="${r.img}" alt="${r.name}" loading="lazy">
      <div class="body">
        <div style="display:flex;gap:8px;align-items:center">
          <div class="title">${r.name}</div>
          <button class="starBtn ${favorites.includes(r.id)?"active":""}">★</button>
        </div>
        <div class="muted">${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}</div>
        <div class="tags">${r.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn primary">Ver detalles</button>
          <a class="btn ghost" href="${r.url}" target="_blank">Web</a>
        </div>
      </div>`;
    card.querySelector(".btn.primary").addEventListener("click",()=>openModal(r));
    card.querySelector(".starBtn").addEventListener("click",()=>{
      toggleFavorite(r.id);
      card.querySelector(".starBtn").classList.toggle("active");
      renderFavorites();
    });
    restaurantList.appendChild(card);
  });
}

function renderFavorites(){
  favoritesList.innerHTML="";
  if(favorites.length===0){
    favoritesList.innerHTML=`<div class="muted" style="padding:1rem;">Aún no tienes favoritos.</div>`;
    return;
  }
  favorites.forEach(id=>{
    const r=restaurants.find(x=>x.id===id);
    if(!r) return;
    const card=document.createElement("article");
    card.className="card";
    card.innerHTML=`
      <img src="${r.img}" alt="${r.name}">
      <div class="body">
        <div style="display:flex;gap:8px;align-items:center">
          <div class="title">${r.name}</div>
          <button class="starBtn active">★</button>
        </div>
        <div class="muted">${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}</div>
        <div class="tags">${r.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn primary">Ver detalles</button>
          <a class="btn ghost" href="${r.url}" target="_blank">Web</a>
        </div>
      </div>`;
    card.querySelector(".btn.primary").addEventListener("click",()=>openModal(r));
    card.querySelector(".starBtn").addEventListener("click",()=>{
      toggleFavorite(r.id);
      renderFavorites();
      renderRestaurants();
    });
    favoritesList.appendChild(card);
  });
}

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites = favorites.filter(x=>x!==id);
  } else {
    favorites.push(id);
  }
  save(TOP_KEY,favorites);
}

// === modal ===
let currentId=null;
function openModal(r){
  currentId=r.id;
  mImg.src=r.img;
  mTitle.textContent=r.name;
  mMeta.textContent=`${r.barrio} • ${r.cocina} • ${euro(r.priceLevel)} • ⭐ ${r.rating}`;
  mDesc.textContent=r.desc;
  mTags.innerHTML=r.tags.map(t=>`<span class="tag">${t}</span>`).join("");
  mMap.src=`https://www.google.com/maps?q=${encodeURIComponent(r.lat+","+r.lng)}&hl=es&z=15&output=embed`;
  mLink.href=r.url;
  mNote.value=notes[r.id]||"";
  modal.showModal();
}

$(".modal__close").addEventListener("click",()=>modal.close());
mSaveNote.addEventListener("click",()=>{
  if(!currentId) return;
  notes[currentId]=mNote.value;
  save(NOTES_KEY,notes);
  mSaveNote.textContent="Guardado ✓";
  setTimeout(()=>mSaveNote.textContent="Guardar nota",1200);
});

// === tabs ===
$$(".tabBtn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    $$(".tabBtn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const tab=btn.dataset.tab;
    $$(".tabContent").forEach(t=>t.classList.remove("active"));
    $(`#${tab}Tab`).classList.add("active");
  });
});

// === controles ===
searchInput.addEventListener("input",renderRestaurants);
[selectBarrio,selectCocina,selectPrecio,selectRating,selectSort].forEach(el=>el.addEventListener("change",renderRestaurants));
clearBtn.addEventListener("click",()=>{
  searchInput.value="";
  selectBarrio.value="Todos";
  selectCocina.value="Todos";
  selectPrecio.value="Todos";
  selectRating.value="0";
  selectSort.value="relevancia";
  $$("#chipCuisines .chip").forEach(c=>c.classList.remove("active"));
  $$("#chipPrice .chip").forEach(c=>c.classList.remove("active"));
  $$("#chipPrice .chip[data-price='Todos']").classList.add("active");
  renderRestaurants();
});

$("#randomBtn").addEventListener("click",()=>{
  const r=restaurants[Math.floor(Math.random()*restaurants.length)];
  openModal(r);
});

// === tema ===
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  themeToggle.textContent=document.body.classList.contains("light")?"🌙 Oscuro":"☀️ Claro";
});
const savedPal=localStorage.getItem(PAL_KEY);
if(savedPal){ document.body.setAttribute("data-palette",savedPal); }
paletteBtn.addEventListener("click",()=>{
  const now=document.body.getAttribute("data-palette")==="coral"?"":"coral";
  if(now) document.body.setAttribute("data-palette",now);
  else document.body.removeAttribute("data-palette");
  localStorage.setItem(PAL_KEY,now);
});

// === inicio ===
renderRestaurants();
renderFavorites();
