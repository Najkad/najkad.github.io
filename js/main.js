(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const IMG='assets/img/', VID='assets/video/';
const WA_NUM='2349027450918';
const waLink=t=>`https://wa.me/${WA_NUM}?text=${encodeURIComponent(t)}`;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ic=(id,c='')=>`<svg class="${c}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const im=(n,alt)=>({t:'img',n,alt});
const vd=(f,p,alt)=>({t:'vid',f,p,alt});

/* ---------- Service data ---------- */
const CATS=[
{id:'interior',no:'01',title:'Interior Design & Transformation',short:'Interior Design & Transformation',
 intro:'From a single room that needs a fresh perspective to a whole environment, we decorate, style and transform spaces around the people who use them.',
 offers:[['Interior Decoration','Complete décor for homes and businesses.'],['Home Styling','Layering colour, texture and detail.'],['Office Decoration','Workspaces that feel considered and comfortable.'],['Interior Makeovers','Giving an existing space a new life.'],['Interior Consultation','Talk through your space, ideas and budget.']],
 groups:[{l:'Interiors',i:[im('office-after','Completed office interior with a long workstation desk, wooden detailing and warm lighting'),im('curtain-dining-room','Dining area decorated by NAJKAD with floor-length taupe curtains and a marble floor')]}]},
{id:'window',no:'02',title:'Window Treatments',short:'Window Treatments',
 intro:'Made-to-measure curtains and a wide choice of blinds, fitted so they hang and operate as they should.',
 offers:[['Curtain Making and Installation','Pleated and tied-back styles, made and fitted.'],['Window Blinds','Venetian, zebra and roller blinds in many finishes.']],
 groups:[{l:'Curtains',i:[im('curtain-taupe-pinch-pleat','Taupe pinch-pleat curtains with matching sheers'),im('curtain-black-marble','Black and gold marble-print curtains in a hallway'),im('curtain-tieback-details','Curtain tie-back detail and fabric close-ups')]},
  {l:'Blinds',i:[im('blind-black-venetian','Black venetian blind fitted on a window'),im('blind-wood-venetian','Wood-tone venetian blind above a table'),im('blind-orange-roller','Terracotta slatted blind over a kitchen sink'),im('blind-navy-zebra','Navy and white zebra blind'),im('blind-brown-zebra','Brown zebra blind against patterned tiles'),im('blind-geometric-print','Geometric print blind sample'),im('blind-white-slat','White slatted blind being fitted')]}]},
{id:'furniture',no:'03',title:'Furniture & Furnishings',short:'Furniture & Furnishings',
 intro:'Furniture chosen for the space and finished properly: supplied, upholstered and installed.',
 offers:[['Furniture Supply','Pieces selected to suit your room and budget.'],['Furniture Upholstery','Fabric and finish refreshed or made to order.'],['Furniture Installation','Delivered, placed and set up.']],
 groups:[{l:'Furniture',i:[im('lounge-blue-sectional','Royal-blue velvet sectional with a white accent chair and round bolsters')]}]},
{id:'walls',no:'04',title:'Walls & Decorative Finishes',short:'Walls & Decorative Finishes',
 intro:'Feature walls, wallpaper, panelling and lighting details that give a room its character.',
 offers:[['Wallpaper Installation','Pattern and texture, fitted cleanly.'],['Wall Decoration','Panels, textures and lit feature walls.']],
 groups:[{l:'Walls',i:[im('wall-feature-tv-panel','Illuminated marble-effect TV wall with a tiered ceiling'),im('wall-feature-blue-led','Dark slatted feature wall with built-in shelving and blue LED lighting'),vd('studio-after','studio-after-poster-540','Acoustic wall panels and an LED ceiling line in a finished studio (video)')]}]},
{id:'rugs',no:'05',title:'Rugs, Bedding & Accessories',short:'Rugs, Bedding & Accessories',
 intro:'The soft layer that finishes a room: rugs, bedding, blankets, pillows and accessories, supplied to suit your space.',
 offers:[['Rug Supply','Rugs supplied to suit your space. Ask us what is available.'],['Bedding Supply','Duvet and bed-linen sets in a range of prints.'],['Home Accessories','Pillows, blankets and finishing touches.']],
 groups:[{l:'Bedsheets',i:[im('bedding-blue-print','Blue patterned bedding set on a styled bed'),im('bedding-floral-white','White floral bedding set in a bedroom'),im('bedding-purple-floral','Purple floral bedding set')]},
  {l:'Blankets',i:[im('blanket-cream','Cream ribbed blanket'),im('blanket-pink','Pink ribbed blanket'),im('blanket-blue','Blue ribbed blanket'),im('blanket-green','Green ribbed blanket'),im('blanket-grey','Grey ribbed blanket'),im('blanket-charcoal','Charcoal ribbed blanket'),vd('blankets','blankets-poster-540','Ribbed blankets shown on a sofa (video)')]},
  {l:'Pillows',i:[im('pillow-pleated-round','Pleated round pillows in jewel colours on a white sofa'),im('pillow-boucle-spheres','Round bouclé pillows in grey, blue, cream and mustard'),im('pillow-knot-bed','Knot pillows in assorted colours on a white bed'),im('pillow-ribbed-velvet','Ribbed plush pillows in assorted colours on a white sofa'),im('pillow-knot-box','Box of colourful knot pillows'),im('pillow-white-inserts','White pillow inserts stacked on a bed'),im('pillow-fibre-bags','Bags of fibre pillow filling')]}]}
];
const src=(m,w)=>m.t==='img'?`${IMG}${m.n}-${w}.webp`:`${IMG}${m.p}.webp`;

/* ---------- Viewer ---------- */
const vw=$('#vw'),vf=$('#vf'),vc=$('#vc'),vp=$('#vp'),vn=$('#vn');
let vItems=[],vi=0,vFrom=null,vY=0;
function vShow(){
  const m=vItems[vi]; vf.innerHTML='';
  let el;
  if(m.t==='vid'){el=document.createElement('video');el.src=VID+m.f+'.mp4';el.poster=src(m);el.controls=true;el.playsInline=true;el.autoplay=true;el.loop=true;el.setAttribute('aria-label',m.alt)}
  else{el=document.createElement('img');el.src=IMG+m.n+'-1280.webp';el.alt=m.alt}
  const cap=document.createElement('figcaption');cap.textContent=m.alt;vf.append(el,cap);
  const multi=vItems.length>1;vp.hidden=vn.hidden=!multi;vc.textContent=multi?`${vi+1} / ${vItems.length}`:'';
}
function vOpen(items,i,from){vItems=items;vi=i;vFrom=from||document.activeElement;vY=scrollY;vw.hidden=false;vw.classList.add('open');document.body.style.overflow='hidden';vShow();$('#vx').focus()}
function vClose(){if(!vw.classList.contains('open'))return;vw.classList.remove('open');vw.hidden=true;vf.innerHTML='';document.body.style.overflow='';scrollTo(0,vY);vFrom&&vFrom.focus({preventScroll:true})}
const vStep=d=>{if(vItems.length>1){vi=(vi+d+vItems.length)%vItems.length;vShow()}};
$('#vx').onclick=vClose;vp.onclick=()=>vStep(-1);vn.onclick=()=>vStep(1);
vw.addEventListener('click',e=>{if(e.target===vw)vClose()});
addEventListener('keydown',e=>{if(!vw.classList.contains('open'))return;if(e.key==='Escape')vClose();else if(e.key==='ArrowLeft')vStep(-1);else if(e.key==='ArrowRight')vStep(1);else if(e.key==='Tab'){const f=$$('button:not([hidden])',vw);const a=document.activeElement,i=f.indexOf(a);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}});
let tx=null;vw.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
vw.addEventListener('touchend',e=>{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)vStep(d<0?1:-1);tx=null});

/* project galleries */
const G={
 living:[im('wall-feature-tv-panel','Living room with an illuminated marble-effect TV wall and tiered ceiling'),im('lounge-blue-sectional','Lounge with a royal-blue sectional, white accent chair and framed art'),im('wall-feature-blue-led','Dark feature wall with built-in shelving and blue LED lighting')]
};
$$('.pic[data-g]').forEach(b=>b.addEventListener('click',()=>vOpen(G[b.dataset.g],+b.dataset.i,b)));

/* ---------- Services ---------- */
const tabs=$('#tabs'),panels=$('#panels');
CATS.forEach((c,k)=>{
  tabs.insertAdjacentHTML('beforeend',`<button class="tab" role="tab" id="tab-${c.id}" aria-controls="pn-${c.id}" aria-selected="${k===0}" tabindex="${k===0?0:-1}"><span>${c.no}</span><b>${c.short}</b></button>`);
  const multi=c.groups.length>1;
  panels.insertAdjacentHTML('beforeend',`<div class="panel" role="tabpanel" id="pn-${c.id}" aria-labelledby="tab-${c.id}" ${k?'hidden':''}>
   <div><p class="label">Category ${c.no}</p><h3>${c.title}</h3><p class="intro">${c.intro}</p>
    <ul class="offers">${c.offers.map((o,i)=>`<li><i>${c.no}.${i+1}</i><div>${o[0]}<span>${o[1]}</span></div></li>`).join('')}</ul>
    <a class="btn" href="${waLink(`Hello NAJKAD, I'd like to enquire about ${c.title}.`)}" target="_blank" rel="noopener">Enquire about ${c.short} ${ic('arrow')}</a></div>
   <div class="gal" data-cat="${c.id}"><div class="gal-frame"></div>
    <div class="gal-bar"><div class="chips" ${multi?'':'hidden'} role="group" aria-label="${c.short} media"></div><div class="arrows" hidden><button class="ico-btn" data-d="-1" aria-label="Previous image">${ic('l')}</button><span class="cnt"></span><button class="ico-btn" data-d="1" aria-label="Next image">${ic('r')}</button></div></div>
    <div class="thumbs" hidden></div></div></div>`);
});
function initGal(c){
  const root=$(`.gal[data-cat="${c.id}"]`),frame=$('.gal-frame',root),chips=$('.chips',root),arr=$('.arrows',root),th=$('.thumbs',root);
  let g=0,i=0,els=[],play=null;
  const items=()=>c.groups[g].i;
  function render(){
    frame.innerHTML='';els=[];
    items().forEach((m,k)=>{
      let e;
      if(m.t==='img'){e=new Image();e.src=`${IMG}${m.n}-1280.webp`;e.alt=m.alt;e.loading=k?'lazy':'eager'}
      else{e=document.createElement('video');e.poster=`${IMG}${m.p}.webp`;e.src=VID+m.f+'.mp4';e.preload='none';e.muted=true;e.loop=true;e.playsInline=true;e.setAttribute('aria-label',m.alt)}
      frame.append(e);els.push(e);
    });
    const z=document.createElement('button');z.className='zoom';z.setAttribute('aria-label','Open larger view');z.onclick=()=>{const m=items()[i];if(m.t==='img')vOpen(items(),i,z);};frame.append(z);
    play=document.createElement('button');play.className='play';play.innerHTML=ic('play');play.setAttribute('aria-label','Play video');frame.append(play);
    play.onclick=()=>{const v=els[i];v.controls=true;v.muted=false;v.play();play.hidden=true};
    chips.innerHTML=c.groups.length>1?c.groups.map((x,k)=>`<button class="chip" aria-pressed="${k===g}" data-g="${k}">${x.l}</button>`).join(''):'';
    const n=items().length;arr.hidden=th.hidden=n<2;
    th.innerHTML=n>1?items().map((m,k)=>`<button aria-label="Show item ${k+1}" data-k="${k}"><img src="${m.t==='img'?`${IMG}${m.n}-640.webp`:`${IMG}${m.p}.webp`}" alt="" width="58" height="72" loading="lazy"></button>`).join(''):'';
    show(0);
  }
  function show(k){
    i=(k+items().length)%items().length;
    els.forEach((e,j)=>{e.classList.toggle('on',j===i);if(j!==i&&e.pause){e.pause();e.controls=false}});
    const isV=items()[i].t==='vid';play.hidden=!isV;frame.querySelector('.zoom').style.display=isV?'none':'';
    $('.cnt',root).textContent=`${i+1} / ${items().length}`;
    $$('.thumbs button',root).forEach((b,j)=>b.toggleAttribute('aria-current',j===i)&&0);
    $$('.thumbs button',root).forEach((b,j)=>b.setAttribute('aria-current',j===i));
  }
  chips.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;g=+b.dataset.g;render()};
  arr.onclick=e=>{const b=e.target.closest('[data-d]');if(b)show(i+ +b.dataset.d)};
  th.onclick=e=>{const b=e.target.closest('[data-k]');if(b)show(+b.dataset.k)};
  render();
}
const inited=new Set();const ensure=c=>{if(!inited.has(c.id)){inited.add(c.id);initGal(c)}};
ensure(CATS[0]);
$$('.panel[hidden]').forEach(()=>{});
function selectCat(id,focus){
  ensure(CATS.find(c=>c.id===id));
  CATS.forEach(c=>{const on=c.id===id,t=$('#tab-'+c.id),p=$('#pn-'+c.id);t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;
    if(on){p.hidden=false;p.classList.remove('enter');void p.offsetWidth;if(!reduce)p.classList.add('enter')}else{p.hidden=true;$$('video',p).forEach(v=>v.pause())}});
  const t=$('#tab-'+id);t.scrollIntoView({block:'nearest',inline:'center',behavior:reduce?'auto':'smooth'});if(focus)t.focus();
}
tabs.addEventListener('click',e=>{const t=e.target.closest('.tab');if(t)selectCat(t.id.slice(4))});
tabs.addEventListener('keydown',e=>{const k=CATS.findIndex(c=>'tab-'+c.id===document.activeElement.id);if(k<0)return;let n=k;
  if(e.key==='ArrowRight')n=(k+1)%CATS.length;else if(e.key==='ArrowLeft')n=(k-1+CATS.length)%CATS.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=CATS.length-1;else return;
  e.preventDefault();selectCat(CATS[n].id,true)});

/* ---------- Audience ---------- */
const AUD=[
 ['Homes & Families','Homeowners, tenants, newlyweds and new homeowners.','bedding-floral-white','Bedroom styled with white floral bedding and soft furnishings','rugs','See bedding & accessories'],
 ['Workplaces','Offices and corporate environments.','blind-wood-venetian','Wood-tone venetian blind fitted above a table','window','See window treatments'],
 ['Hospitality','Hotels, short-let apartments and Airbnb operators.','bedding-blue-print','Hotel-style bedroom with blue patterned bedding and a chandelier','rugs','See bedding supply'],
 ['Industry Professionals','Interior designers, contractors and property developers.','curtain-black-marble','Black and gold marble-print curtains fitted in a hallway','furniture','See furniture supply']
];

/* Audience image collections (supplied images only; captions describe what is shown, not projects) */
const AUD_SETS=[
 [im('bedding-floral-white','White floral bedding set in a styled bedroom'),im('bedding-purple-floral','Purple floral bedding set'),im('lounge-blue-sectional','Lounge with a royal-blue sectional sofa'),im('living-room-wall-unit','Living room with a shelving wall and grey seating'),im('wall-feature-tv-panel','Living room with an illuminated TV wall'),im('curtain-taupe-pinch-pleat','Taupe pinch-pleat curtains with sheers'),im('pillow-pleated-round','Pleated round pillows'),im('blanket-cream','Cream ribbed blanket')],
 [im('office-after','Completed office interior (After 01)'),im('office-before','The same office before the work (Before 01)'),im('blind-wood-venetian','Wood-tone venetian blind'),im('blind-black-venetian','Black venetian blind')],
 [im('bedding-blue-print','Blue patterned bedding set (bedding supply)'),im('bedding-purple-floral','Purple floral bedding set (bedding supply)'),im('pillow-knot-bed','Knot pillows on a white bed (home accessories)'),im('blanket-cream','Cream ribbed blanket (home accessories)'),im('curtain-dining-room','Dining area with floor-length curtains'),im('blind-navy-zebra','Navy zebra blind (window blinds)')],
 [im('blind-white-slat','White slatted blind being fitted (installation)'),im('curtain-black-marble','Marble-print curtains fitted in a hallway'),im('blind-geometric-print','Geometric print blind sample'),im('curtain-tieback-details','Curtain tie-back details'),im('wall-feature-blue-led','Feature wall with shelving and LED lighting (wall decoration)'),im('lounge-blue-sectional','Sectional sofa (furniture supply)')]
];
$('#aud').innerHTML=AUD.map((a,k)=>`<div class="card"><img src="${IMG}${a[2]}-640.webp" alt="${a[3]}" loading="lazy"><button class="tog" aria-expanded="false" aria-label="${a[0]}: show details"></button><div class="ct"><span class="no">0${k+1}</span><h3>${a[0]}</h3><div class="more"><p>${a[1]}</p><a class="link" href="#services" data-cat="${a[4]}">${a[5]} ${ic('arrow')}</a><button type="button" class="link set-btn" data-set="${k}" aria-haspopup="dialog">Explore related images ${ic('arrow')}</button></div></div></div>`).join('');
$('#aud').addEventListener('click',e=>{
  const l=e.target.closest('a[data-cat]');if(l){selectCat(l.dataset.cat);return}
  const s=e.target.closest('.set-btn');if(s){vOpen(AUD_SETS[+s.dataset.set],0,s);return}
  const b=e.target.closest('.tog');if(!b)return;const c=b.parentElement,o=c.classList.toggle('open');b.setAttribute('aria-expanded',o)});

/* ---------- Before / After ---------- */
$$('[data-ba]').forEach(ba=>{
  const r=$('input',ba),set=v=>ba.style.setProperty('--pos',v+'%');
  r.addEventListener('input',()=>set(r.value));
  $('.reset',ba.closest('figure')).onclick=()=>{r.value=50;set(50)};
  r.addEventListener('keydown',e=>{if(e.key==='Home'){r.value=0;set(0);e.preventDefault()}if(e.key==='End'){r.value=100;set(100);e.preventDefault()}});
});


/* ---------- Studio video comparison ---------- */
(()=>{
  const vb=$('#vb'),va=$('#va'),btn=$('#vplay'),rs=$('#vrestart'),vs=[vb,va];
  if(!vb||!va)return;
  vs.forEach(v=>{v.muted=true;v.loop=false;v.removeAttribute('controls')});
  const label=on=>{btn.setAttribute('aria-pressed',on);btn.querySelector('span').textContent=on?'Pause both':(vs.every(v=>v.ended)?'Replay both':'Play both');btn.querySelector('use').setAttribute('href',on?'#i-pause':'#i-play')};
  const playing=()=>vs.some(v=>!v.paused&&!v.ended);
  const start=()=>{ /* a finished video holds its last frame unless both have finished */
    if(vs.every(v=>v.ended))vs.forEach(v=>{v.currentTime=0});
    vs.forEach(v=>{v.preload='auto';if(!v.ended)v.play().catch(()=>{})});label(true)};
  btn.onclick=()=>{if(playing()){vs.forEach(v=>v.pause());label(false)}else start()};
  rs.onclick=()=>{vs.forEach(v=>{v.pause();v.currentTime=0});start()};
  vs.forEach(v=>v.addEventListener('ended',()=>{if(vs.every(x=>x.ended))label(false)}));
  new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting&&playing()){vs.forEach(v=>v.pause());label(false)}}),{threshold:.1}).observe($('#vcmp'));
})();

/* ---------- Header, menu, scroll ---------- */
const hdr=$('#hdr'),fab=$('#fab'),burger=$('#burger');
function onScroll(){hdr.classList.toggle('solid',scrollY>60);fab.classList.toggle('show',scrollY>innerHeight*.9)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
const mm=$('#mmenu');mm.setAttribute('aria-hidden','true');mm.inert=true;
function menu(o,ret=true){document.body.classList.toggle('menu-open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':'';
  mm.setAttribute('aria-hidden',!o);mm.inert=!o;[$('#main'),$('.ftr'),fab].forEach(e=>e&&(e.inert=o));
  if(o)setTimeout(()=>$('a',mm).focus(),60);else if(ret)burger.focus()}
burger.onclick=()=>menu(!document.body.classList.contains('menu-open'));
addEventListener('keydown',e=>{if(e.key!=='Tab'||!document.body.classList.contains('menu-open'))return;const f=[burger,...$$('a',mm)];const i=f.indexOf(document.activeElement);
  if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}});
$$('#mmenu a').forEach(a=>a.addEventListener('click',()=>menu(false,false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){menu(false);burger.focus()}});
addEventListener('resize',()=>{if(innerWidth>1100&&document.body.classList.contains('menu-open'))menu(false,false)});
$('#totop').onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});
$('#yr').textContent=new Date().getFullYear();

const links=$$('.nav a[href^="#"]:not(.btn)'),map={top:'#top',about:'#about',services:'#services',projects:'#projects',contact:'#contact'};
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id&&e.target.id!=='top'))}}),{rootMargin:'-45% 0px -50% 0px'});
Object.keys(map).forEach(k=>{const el=document.getElementById(k);el&&so.observe(el)});

/* reveals */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('.rv,.mk').forEach(el=>ro.observe(el));

/* hero */
const hv=$('#heroVid');
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('ready')));
const saver=navigator.connection&&navigator.connection.saveData;
if(reduce||saver){hv.removeAttribute('autoplay');hv.pause()}
else{hv.play().catch(()=>{});document.addEventListener('visibilitychange',()=>document.hidden?hv.pause():hv.play().catch(()=>{}))}
new IntersectionObserver(es=>es.forEach(e=>{if(!reduce){e.isIntersecting?hv.play().catch(()=>{}):hv.pause()}})).observe(hv);
})();
