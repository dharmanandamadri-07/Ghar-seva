const paths = {
  home:'<path d="m3 11 9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
  pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:'<path d="M7 3H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3l-5-2-2 2a13 13 0 0 1-7-7l2-2-2-5Z"/>',
  arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>', diagonal:'<path d="M6 18 18 6M6 6h12v12"/>', chevron:'<path d="m6 9 6 6 6-6"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  snow:'<path d="M12 2v20M3.4 7l17.2 10m0-10L3.4 17M8 4l4 4 4-4M8 20l4-4 4 4"/>',
  drop:'<path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z"/>',
  hammer:'<path d="m13 10-8 10-2-2 8-10m-1-3 3-3 7 6-3 3-2-2-2 2-4-4 1-2Z"/>',
  paint:'<rect x="3" y="4" width="13" height="6" rx="1"/><path d="M16 7h4v5l-8 2v3"/><rect x="10" y="17" width="4" height="5" rx="1"/>',
  tiles:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18M3 12h18"/>',
  filter:'<path d="M4 4h16l-6 8v6l-4 2v-8L4 4Z"/>',
  box:'<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Zm0 0 9 4 9-4m-9 4v10M7 5l10 4"/>',
  scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8 8 12 12M8 16 20 4"/>',
  book:'<path d="M12 6v15M3 4c4 0 7 0 9 3 2-3 5-3 9-3v14c-4 0-7 0-9 3-2-3-5-3-9-3Z"/>',
  bag:'<path d="M5 8h14l2 13H3L5 8Zm4 2V6a3 3 0 0 1 6 0v4"/>',
  medical:'<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M8 6V3h8v3m-4 4v7m-3.5-3.5h7"/>',
  check:'<path d="m5 12 4 4L19 6"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield:'<path d="m12 2 8 4v6c0 4-3 7-8 10-5-3-8-6-8-10V6l8-4Z"/><path d="m8 12 3 3 5-5"/>',
  sparkle:'<path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z"/>',
  spark:'<path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>'
};
const icon=(name, size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.home}</svg>`;
const store = {
  get(key, fallback){ try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
  set(key, value){ try { localStorage.setItem(key, value); } catch {} }
};
const demo = { phone:'+91 00000 00000', email:'hello@gharseva.example' };
let language=store.get('gs-language','en');
let area=store.get('gs-area','Jeypore');
if (!['Jeypore','Koraput','Sunabeda','Damanjodi'].includes(area)) area='Jeypore';
let signedIn=store.get('gs-preview-account','')==='active';
let activeGroup='all';
let query='';
let latestRequest;
let showAllPopular=false;
const t=(en,od)=>language==='or'?od:en;
const pick=pair=>t(pair[0],pair[1]);
const inr=value=>'₹'+value.toLocaleString('en-IN');
const safe=value=>String(value).replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const loc=()=>({Jeypore:t('Jeypore','ଜୟପୁର'),Koraput:t('Koraput','କୋରାପୁଟ'),Sunabeda:t('Sunabeda','ସୁନାବେଡ଼ା'),Damanjodi:t('Damanjodi','ଦାମନଯୋଡ଼ି')})[area];
const category=id=>categories.find(entry=>entry.id===id);
const cover=(id, index)=>`assets/${id}${id==='appliance' && [2,3,4].includes(index)?'-'+index:''}.webp`;
const duration=minutes=>minutes>=60?`${Math.floor(minutes/60)}h${minutes%60?' '+minutes%60+'m':''}`:`${minutes} min`;
const areaList=['Jeypore','Koraput','Sunabeda','Damanjodi'];
const featured=[['appliance',0],['plumber',0],['barber',0],['purifier',0],['electrician',0],['carpentry',0],['moving',1],['grocery',0]];
const brand=()=>`<a class="brand" href="#home"><img src="assets/mark.svg" alt="" width="41" height="41"><span>Ghar<span class="brand-accent">Seva</span><small>KORAPUT · ODISHA</small></span></a>`;
const button=(label, data, type='primary', symbol='arrow')=>`<button class="btn ${type}" ${data}>${label}${symbol?icon(symbol,17):''}</button>`;
const linkButton=(label, href, type='primary')=>`<a class="btn ${type}" href="${href}">${label}${icon('arrow',17)}</a>`;
const search=(id, cls)=>`<form class="search ${cls}" data-search role="search"><label class="sr" for="${id}">${t('Search services','ସେବା ଖୋଜନ୍ତୁ')}</label>${icon('search',19)}<input id="${id}" type="search" name="q" placeholder="${t('Electrician, AC repair…','ଇଲେକ୍ଟ୍ରିସିଆନ୍, ଏସି…')}" value="${safe(query)}"><button aria-label="${t('Search','ଖୋଜନ୍ତୁ')}" type="submit"><span>${t('Search','ଖୋଜନ୍ତୁ')}</span>${icon('arrow',17)}</button></form>`;
const eyebrow=(label)=>`<div class="eyebrow"><span></span>${label}</div>`;
const sectionHead=(label,title,desc='')=>`${eyebrow(label)}<h2>${title}</h2>${desc?`<p class="section-description">${desc}</p>`:''}`;
function header(){
  document.getElementById('header').innerHTML=`
  <div class="topline"><div class="wrap top-inner"><span>${icon('pin',14)} ${t('Local home services in Koraput district, Odisha','କୋରାପୁଟ ଜିଲ୍ଲା, ଓଡ଼ିଶାରେ ଘରୋଇ ସେବା')}</span><button data-modal="support">${icon('phone',14)} ${demo.phone} <small>${t('Demo contact','ଡେମୋ ଯୋଗାଯୋଗ')}</small></button></div></div>
  <header class="nav-shell"><div class="wrap nav-inner">${brand()}
  <nav aria-label="Main navigation"><a href="#services">${t('Services','ସେବା')}</a><a href="#how">${t('How it works','କିପରି କାମ କରେ')}</a><a href="#membership">${t('Membership','ସଦସ୍ୟତା')}</a></nav>
  <div class="nav-actions">
    <button class="loc" data-modal="location">${icon('pin',17)} <span>${loc()}</span> ${icon('chevron',13)}</button>
    <div class="language" aria-label="Language"><button data-lang="en" aria-pressed="${language==='en'}">EN</button><button data-lang="or" aria-pressed="${language==='or'}">ଓଡ଼ିଆ</button></div>
    ${button(signedIn?t('Account','ଆକାଉଣ୍ଟ'):t('Sign in','ସାଇନ୍ ଇନ୍'),'data-modal="account"','nav-sign','user')}
    <button class="mobile-menu" data-modal="menu" aria-label="Open menu">${icon('menu',23)}</button>
  </div></div></header>`;
}
function footer(){
  document.getElementById('footer').innerHTML=`<footer><div class="wrap foot-grid"><div>${brand()}<p>${t('Local help for everyday life. Explore home repairs, at-home care and deliveries across Jeypore and Koraput, Odisha.','ଜୟପୁର ଓ କୋରାପୁଟରେ ଘର ମରାମତି, ଘରୋଇ ଯତ୍ନ ଓ ଡେଲିଭରି ସେବା।')}</p></div>
  <div><h3>${t('Explore','ଦେଖନ୍ତୁ')}</h3><a href="#services">${t('All services','ସମସ୍ତ ସେବା')}</a><a href="#how">${t('How it works','କିପରି କାମ କରେ')}</a><a href="#membership">${t('Membership plans','ସଦସ୍ୟତା ପ୍ଲାନ୍')}</a><a href="#faq">${t('FAQs','ପ୍ରଶ୍ନ ଓ ଉତ୍ତର')}</a><button data-modal="about">${t('About Ghar Seva','ଘର ସେବା ବିଷୟରେ')}</button><button data-modal="partners">${t('Become a partner','ସେବା ସହଭାଗୀ ହୁଅନ୍ତୁ')}</button></div>
  <div><h3>${t('Service groups','ସେବା ବର୍ଗ')}</h3>${groups.map(g=>`<a href="#group/${g.id}">${pick(g.title)}</a>`).join('')}</div>
  <div><h3>${t('Contact · demo','ଡେମୋ ଯୋଗାଯୋଗ')}</h3><button data-modal="support">${icon('phone',17)}${demo.phone}</button><button data-modal="support">${icon('mail',17)}${demo.email}</button><button data-modal="location">${icon('pin',17)}${t('Jeypore, Koraput, Odisha','ଜୟପୁର, କୋରାପୁଟ, ଓଡ଼ିଶା')}</button></div></div>
  <div class="wrap foot-bottom"><span>© 2026 Ghar Seva Koraput</span><span>${t('Demo pricing, photos and contact details','ଡେମୋ ମୂଲ୍ୟ, ଫଟୋ ଓ ଯୋଗାଯୋଗ')}</span><div><button data-modal="privacy">${t('Privacy','ଗୋପନୀୟତା')}</button><button data-modal="terms">${t('Terms','ନିୟମ')}</button></div></div></footer>`;
}
const card=(entry,index)=>`<a class="category-card reveal" style="--delay:${index%4*55}ms" href="#service/${entry.id}"><div class="card-image"><img loading="lazy" src="${cover(entry.id)}" alt=""><span class="card-icon">${icon(entry.icon,21)}</span></div><div class="card-text"><div><h4>${pick(entry.title)}</h4><p>${pick(entry.blurb)}</p></div><span class="card-arrow">${icon('diagonal',17)}</span></div></a>`;
function catalog(){
  const filtered=groups.filter(g=>activeGroup==='all'||g.id===activeGroup);
  const needle=query.trim().toLowerCase();
  const matches=entry=>!needle||[...entry.title,...entry.blurb,...entry.items.flat(),...groups.find(g=>g.id===entry.group).title].some(value=>String(value).toLowerCase().includes(needle));
  const matching=categories.filter(matches);
  return `${query?`<div class="result-line" role="status">${matching.length} ${t('matching categories for','ବର୍ଗ ମିଳିଲା')}  <strong>“${safe(query)}”</strong> <button data-clear>${t('Clear search','ସନ୍ଧାନ ହଟାନ୍ତୁ')}</button></div>`:''}
  ${filtered.filter(g=>matching.some(e=>e.group===g.id)).map(g=>`<div class="catalog-group"><div class="group-head reveal"><span class="group-icon">${icon(g.icon,22)}</span><div><h3>${pick(g.title)}</h3><p>${pick(g.description)}</p></div></div><div class="card-grid">${matching.filter(e=>e.group===g.id).map(card).join('')}</div></div>`).join('')||`<div class="nothing"><h3>${t('No services match this search','କୌଣସି ସେବା ମିଳିଲା ନାହିଁ')}</h3><p>${t('Try a different name or choose another category.','ଅନ୍ୟ ନାମ କିମ୍ବା ବର୍ଗ ବାଛନ୍ତୁ।')}</p>${button(t('Show all services','ସମସ୍ତ ସେବା'),'data-clear')}</div>`}`;
}
function tabs(){
  const buttons=[{id:'all',title:[t('All services','ସମସ୍ତ ସେବା')],icon:'tiles'},...groups];
  return buttons.map(g=>`<button data-group="${g.id}" aria-pressed="${activeGroup===g.id}">${icon(g.icon,17)} ${g.id==='all'?g.title[0]:pick(g.title)}</button>`).join('');
}
function popular(){
  return featured.slice(0,showAllPopular?featured.length:4).map(([id,index],i)=>{
    const item=category(id).items[index];
    return `<a class="popular-card reveal" style="--delay:${i%4*55}ms" href="#service/${id}/${index}"><img src="${cover(id,index)}" loading="lazy" alt=""><div><small>${pick(category(id).title)}</small><h3>${item[0]}</h3><p><strong>${inr(item[1])}</strong><span>${icon('clock',15)}${duration(item[3])}</span></p></div></a>`;
  }).join('');
}
function stepCard(symbol,title,description,action,index){
  const content=`<span class="step-icon">${icon(symbol,23)}</span>
    <span class="step-title">${title}</span>
    <span class="step-description">${description}</span>
    <span class="step-arrow">${icon('arrow',17)}</span>`;
  const styling=`class="step reveal" style="--delay:${index*75}ms"`;
  return action==='services'?`<a ${styling} href="#services">${content}</a>`
    :`<button type="button" ${styling} data-modal="${action}">${content}</button>`;
}
const plans=[
  ['Essential',299,'month','One standard visit credit','Priority support'],
  ['Plus',599,'month','Two standard visit credits','Priority scheduling'],
  ['Annual',3999,'year','Twelve standard visit credits','Priority scheduling']
];
const stories=[
  ['“I could see what the visit covered before picking a time.”','Plumbing · Jeypore','“ସମୟ ବାଛିବା ପୂର୍ବରୁ ସେବା ବିବରଣୀ ଦେଖିପାରିଲି।”','ପ୍ଲମ୍ବିଂ · ଜୟପୁର'],
  ['“It was easy to find a tutor for a first maths session.”','Home tutoring · Koraput','“ପ୍ରଥମ ଗଣିତ କ୍ଲାସ୍ ପାଇଁ ଶିକ୍ଷକ ବାଛିବା ସହଜ ଥିଲା।”','ଘରୋଇ ଟ୍ୟୁସନ୍ · କୋରାପୁଟ'],
  ['“The listing made it clear what the RO service included.”','Water purifier service · Sunabeda','“ପାଣି ଫିଲ୍ଟର ସେବାରେ କ’ଣ ଅଛି ସ୍ପଷ୍ଟ ଥିଲା।”','ପାଣି ଫିଲ୍ଟର · ସୁନାବେଡ଼ା']
];
const faqs=[
  ['Where can I request a service?','This demo covers Jeypore, Koraput, Sunabeda and Damanjodi. Use the location selector to change your area.','କେଉଁଠି ସେବା ପାଇପାରିବି?','ଏହି ଡେମୋରେ ଜୟପୁର, କୋରାପୁଟ, ସୁନାବେଡ଼ା ଓ ଦାମନଯୋଡ଼ି ଅଛି।'],
  ['Are parts and materials included?','Listed prices are demo labour or visit fees. Any parts, materials and purchases would be quoted separately.','ସାମଗ୍ରୀ ମୂଲ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ କି?','ଦର୍ଶାଯାଇଥିବା ମୂଲ୍ୟ ଡେମୋ ସେବା ଶୁଳ୍କ। ସାମଗ୍ରୀ ମୂଲ୍ୟ ଅଲଗା।'],
  ['What happens when I submit a booking?','You’ll see a demo confirmation with your selected service and slot. There is no payment or dispatch in this preview.','ବୁକିଂ ପରେ କ’ଣ ହେବ?','ଆପଣ ବାଛିଥିବା ସେବା ଓ ସମୟର ଡେମୋ ନିଶ୍ଚିତକରଣ ଦେଖିବେ।']
];
function homePage(){
  return `<section class="hero wrap">
  <div class="hero-copy">${eyebrow(t('At your doorstep in Koraput','କୋରାପୁଟରେ ଆପଣଙ୍କ ଦୁଆରେ'))}<h1>${t('Home help.<br><em>Close to home.</em>','ଘର କାମ ପାଇଁ<br><em>ସ୍ଥାନୀୟ ସେବା।</em>')}</h1>
  <p>${t('From fixing a leaky tap to picking up groceries, find everyday help in Jeypore and across Koraput district.','ଟ୍ୟାପ୍ ମରାମତିଠାରୁ କିରାଣା ଡେଲିଭରି ପର୍ଯ୍ୟନ୍ତ, ଜୟପୁର ଓ କୋରାପୁଟରେ ସ୍ଥାନୀୟ ସେବା ପାଆନ୍ତୁ।')}</p>
  ${search('hero-search','hero-search')}
  <div class="hero-quick"><span>${t('Popular','ଲୋକପ୍ରିୟ')}</span><a href="#service/electrician">${pick(category('electrician').title)}</a><a href="#service/plumber">${pick(category('plumber').title)}</a><a href="#service/appliance">${t('AC repair','ଏସି ମରାମତି')}</a></div></div>
  <div class="hero-photo"><img src="assets/hero.webp" alt="Home maintenance technician arriving at a house"><div class="photo-note"><span>${icon('pin',20)}</span><div><strong>${loc()}, ${t('Odisha','ଓଡ଼ିଶା')}</strong><small>${t('Explore services near you','ନିକଟରେ ସେବା ଦେଖନ୍ତୁ')}</small></div><button data-modal="location" aria-label="Change location">${icon('diagonal',19)}</button></div></div></section>
  <div class="wrap trust"><div>${icon('pin',23)}<span><strong>${t('Locally focused','ସ୍ଥାନୀୟ ସେବା')}</strong><small>${t('Jeypore & Koraput district','ଜୟପୁର ଓ କୋରାପୁଟ ଜିଲ୍ଲା')}</small></span></div><div>${icon('tiles',23)}<span><strong>${t('12 service categories','୧୨ ସେବା ବର୍ଗ')}</strong><small>${t('Repairs, learning, care & delivery','ମରାମତି, ଶିକ୍ଷା, ଯତ୍ନ ଓ ଡେଲିଭରି')}</small></span></div><div>${icon('calendar',23)}<span><strong>${t('Flexible scheduling','ସୁବିଧାଜନକ ସମୟ')}</strong><small>${t('Choose a visit time that works','ଆପଣଙ୍କ ସମୟ ବାଛନ୍ତୁ')}</small></span></div></div>
  <section class="wrap catalog" id="services"><div class="reveal from-left">${sectionHead(t('Service directory','ସେବା ତାଲିକା'),t('What can we help you with?','କେଉଁ ସେବା ଆବଶ୍ୟକ?'),t('Browse by category, then choose the service you need.','ବର୍ଗ ଅନୁଯାୟୀ ଆପଣଙ୍କ ସେବା ବାଛନ୍ତୁ।'))}</div>
  <div class="tabs" id="tabs" role="group" aria-label="Filter service groups">${tabs()}</div><div id="catalog-results">${catalog()}</div></section>
  <section class="popular section-tint" id="popular"><div class="wrap"><div class="section-top"><div class="reveal from-left">${sectionHead(t('Popular picks','ଲୋକପ୍ରିୟ ସେବା'),t('Everyday favourites','ପସନ୍ଦର ସେବା'),t('Find a starting price and see what the visit includes.','ମୂଲ୍ୟ ଓ ସେବା ବିବରଣୀ ଦେଖନ୍ତୁ।'))}</div><button class="text-button" data-popular>${showAllPopular?t('Show fewer','କମ୍ ଦେଖନ୍ତୁ'):t('See all picks','ସବୁ ଦେଖନ୍ତୁ')} ${icon('arrow',17)}</button></div><div class="card-grid" id="popular-grid">${popular()}</div></div></section>
  <section class="wrap quick-panel reveal from-right"><div><span class="quick-icon">${icon('bolt',25)}</span><div><h2>${t('Need help today?','ଆଜି ସାହାଯ୍ୟ ଦରକାର?')}</h2><p>${t('Tell us what you need and choose a preferred time for a visit.','ଆବଶ୍ୟକ ସେବା ଓ ପସନ୍ଦର ସମୟ ବାଛନ୍ତୁ।')}</p></div></div>${button(t('Request quick help','ଶୀଘ୍ର ସହାୟତା'),'data-modal="quick"')}</section>
  <section class="wrap stories" id="stories"><div class="reveal from-left">${sectionHead(t('Illustrative feedback','ନମୁନା ମତାମତ'),t('What a visit could look like','ସେବା ଅନୁଭୂତି'))}</div><div class="story-grid">${stories.map(([quote,service,oq,os],i)=>`<figure class="reveal" style="--delay:${i*75}ms"><span aria-hidden="true">✦</span><blockquote>${t(quote,oq)}</blockquote><figcaption>${t(service,os)}</figcaption></figure>`).join('')}</div></section>
  <section class="wrap how" id="how"><div class="reveal from-left">${sectionHead(t('Booking','ବୁକିଂ'),t('How Ghar Seva works','ଘର ସେବା କିପରି କାମ କରେ'))}</div>
  <div class="step-grid">
    ${stepCard('search',t('Choose a service','ସେବା ବାଛନ୍ତୁ'),t('Pick what you need and see the price and what’s included.','ସେବାର ମୂଲ୍ୟ ଓ ବିବରଣୀ ଦେଖନ୍ତୁ।'),'services',0)}
    ${stepCard('calendar',t('Pick a time','ସମୟ ବାଛନ୍ତୁ'),t('Select your area and a convenient time to visit.','ଆପଣଙ୍କ ଅଞ୍ଚଳ ଓ ସୁବିଧାଜନକ ସମୟ ବାଛନ୍ତୁ।'),'schedule',1)}
    ${stepCard('home',t('Get help at home','ଘରେ ସେବା ପାଆନ୍ତୁ'),t('Review your requested service, area and time.','ଅନୁରୋଧ କରିଥିବା ସେବା, ଅଞ୍ଚଳ ଓ ସମୟ ଦେଖନ୍ତୁ।'),'request-status',2)}
  </div></section>
  <section class="membership" id="membership"><div class="wrap member-grid"><div class="member-copy reveal from-left">${sectionHead(t('Demo membership','ଡେମୋ ସଦସ୍ୟତା'),t('Home care on repeat.','ନିୟମିତ ଘରୋଇ ସେବା।'),t('Explore plans for the repairs and upkeep you need throughout the year.','ନିୟମିତ ମରାମତି ଓ ରକ୍ଷଣାବେକ୍ଷଣ ପାଇଁ ପ୍ଲାନ୍ ଦେଖନ୍ତୁ।'))}<a href="#services" class="inline-link">${t('Explore services','ସେବା ଦେଖନ୍ତୁ')} ${icon('arrow',17)}</a></div>
  <div class="plans reveal from-right">${plans.map(([name,price,period,first,second],i)=>`<button data-plan="${i}" class="plan"><span><strong>${name}</strong><small>${first} · ${second}</small></span><span class="plan-price"><b>${inr(price)}</b><small>/${period}</small></span>${icon('arrow',18)}</button>`).join('')}</div></div></section>
  <section class="wrap faq" id="faq"><div class="reveal from-left">${sectionHead(t('Help centre','ସହାୟତା'),t('Questions, answered.','ପ୍ରଶ୍ନ ଓ ଉତ୍ତର'))}</div><div class="faq-list reveal from-right">${faqs.map(([q,a,oq,oa])=>`<details><summary>${t(q,oq)}${icon('chevron',18)}</summary><p>${t(a,oa)}</p></details>`).join('')}</div></section>`;
}
function servicePage(entry, index){
  const group=groups.find(g=>g.id===entry.group);
  return `<div class="detail"><div class="wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#home">${t('Home','ମୁଖ୍ୟ ପୃଷ୍ଠା')}</a><span>/</span><a href="#group/${group.id}">${pick(group.title)}</a><span>/</span><span aria-current="page">${pick(entry.title)}</span></nav>
  <section class="detail-hero"><img src="${cover(entry.id)}" alt=""><div class="detail-copy"><span class="detail-icon">${icon(entry.icon,31)}</span>${eyebrow(`${entry.items.length} ${t('service options','ସେବା ବିକଳ୍ପ')}`)}<h1>${pick(entry.title)}</h1><p>${pick(entry.blurb)} · ${loc()}, ${t('Odisha','ଓଡ଼ିଶା')}</p></div></section>
  <div class="detail-perks"><span>${icon('pin',18)}${t('Local service area','ସ୍ଥାନୀୟ ଅଞ୍ଚଳ')}</span><span>${icon('check',18)}${t('Itemised service details','ସେବା ବିବରଣୀ')}</span><span>${icon('calendar',18)}${t('Choose your time','ସମୟ ବାଛନ୍ତୁ')}</span><span>${icon('shield',18)}${t('Demo rates shown','ଡେମୋ ମୂଲ୍ୟ')}</span></div>
  <section class="item-list"><div class="section-top"><div>${sectionHead(t('Service options','ସେବା ବିକଳ୍ପ'),t('Choose your service','ସେବା ବାଛନ୍ତୁ'))}</div>${search('detail-search','detail-search')}</div>
  ${entry.items.map(([name,price,old,minutes,summary,...included],i)=>`<article class="service-item reveal${index===i?' selected':''}" id="item-${i}"><img src="${cover(entry.id,i)}" alt=""><div class="item-copy"><h3>${name}</h3><p>${summary}</p><ul>${included.map(line=>`<li>${icon('check',14)}${line}</li>`).join('')}</ul></div><div class="item-book"><div><del>${inr(old)}</del><span class="discount">${Math.round((1-price/old)*100)}% OFF</span></div><strong>${inr(price)}</strong><span>${icon('clock',14)} ${duration(minutes)}</span>${button(t('Book now','ବୁକ୍ କରନ୍ତୁ'),`data-book="${entry.id}/${i}"`)}</div></article>`).join('')}</section>
  <section class="detail-support reveal"><span class="group-icon">${icon('phone',23)}</span><div><h2>${t('Need help choosing a service?','ସେବା ବାଛିବାକୁ ସାହାଯ୍ୟ ଦରକାର?')}</h2><p>${t('Tell us what you need so we can help you find the right option.','ସଠିକ୍ ବିକଳ୍ପ ପାଇଁ ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଜଣାନ୍ତୁ।')}</p></div>${button(t('Talk to support','ସହାୟତା ନିଅନ୍ତୁ'),'data-modal="support"','outline')}</section>
  </div></div>`;
}
const main=document.getElementById('main');
const dialog=document.getElementById('dialog');
let observer;
function prepareReveals(){
  observer?.disconnect();
  if (!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:0.07,rootMargin:'0px 0px 12px 0px'});
  document.querySelectorAll('.reveal').forEach(node=>{
    if(node.classList.contains('visible')) return;
    if(node.getBoundingClientRect().top<innerHeight-12) node.classList.add('visible');
    else {node.classList.add('motion');observer.observe(node);}
  });
}
function moveTo(id, smooth=false){
  requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:smooth?'smooth':'instant'}));
}
function render(keepPosition=false){
  const [page,id,no]=location.hash.slice(1).split('/');
  if (page==='search') {
    try { query=decodeURIComponent(id||''); } catch { query=''; }
    if (!keepPosition) activeGroup='all';
  }
  if (page==='services'&&!keepPosition) {activeGroup='all';query='';}
  const chosen=page==='service'?category(id):undefined;
  if (page==='group'&&!keepPosition&&groups.some(g=>g.id===id)) {activeGroup=id;query='';}
  if (page==='home'||!page) {activeGroup='all';query='';}
  const itemIndex=no===undefined?undefined:Number(no);
  document.documentElement.lang=language;
  document.title=chosen?`${pick(chosen.title)} | Ghar Seva Koraput`:'Ghar Seva Koraput | Home Services';
  header(); footer();
  main.innerHTML=chosen?servicePage(chosen,itemIndex):homePage();
  if (!keepPosition) {
    if(chosen && chosen.items[itemIndex]) moveTo('item-'+itemIndex);
    else if(['services','group','search','how','membership','faq','popular','main'].includes(page)) moveTo(['group','search'].includes(page)?'services':page);
    else window.scrollTo({top:0,behavior:'instant'});
  }
  requestAnimationFrame(prepareReveals);
}
function refreshCatalog(){
  document.getElementById('tabs').innerHTML=tabs();
  document.getElementById('catalog-results').innerHTML=catalog();
  requestAnimationFrame(prepareReveals);
}
function showDialog(title, contents){
  dialog.innerHTML=`<div class="dialog-shell"><button type="button" class="dialog-close" data-dismiss aria-label="Close">${icon('close',23)}</button><h2 id="dialog-title">${title}</h2>${contents}</div>`;
  if(!dialog.open) dialog.showModal();
  else dialog.querySelector('.dialog-close').focus();
}
const opts=(list,selected)=>list.map(value=>`<option ${value===selected?'selected':''}>${value}</option>`).join('');
function localDate(offset){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const byType=Object.fromEntries(parts.map(part=>[part.type,part.value]));
  const day=new Date(Date.UTC(+byType.year,+byType.month-1,+byType.day+offset));
  return day.toISOString().slice(0,10);
}
function modal(type){
  if(type==='location') {
    showDialog(t('Choose your area','ଅଞ୍ଚଳ ବାଛନ୍ତୁ'),`<p>${t('Select a demo service area in Koraput district.','କୋରାପୁଟ ଜିଲ୍ଲାରେ ଅଞ୍ଚଳ ବାଛନ୍ତୁ।')}</p><div class="location-list">${areaList.map(place=>`<button data-area="${place}" aria-pressed="${area===place}">${icon('pin',20)}${place}<span>${area===place?icon('check',19):icon('arrow',17)}</span></button>`).join('')}</div>`);
  }
  if(type==='support') {
    showDialog(t('Ghar Seva support','ଘର ସେବା ସହାୟତା'),`<p>${t('These are placeholder contact details for the client preview.','କ୍ଲାଏଣ୍ଟ ଡେମୋ ପାଇଁ ଏହି ଯୋଗାଯୋଗ ବିବରଣୀ।')}</p><div class="contact-box"><span>${icon('phone',19)} ${demo.phone}</span><span>${icon('mail',19)} ${demo.email}</span><span>${icon('pin',19)} ${t('Jeypore, Koraput, Odisha','ଜୟପୁର, କୋରାପୁଟ, ଓଡ଼ିଶା')}</span></div>${button(t('Copy demo details','ବିବରଣୀ କପି କରନ୍ତୁ'),'data-copy','outline','')}`);
  }
  if(type==='account') {
    showDialog(signedIn?t('Your demo account','ଡେମୋ ଆକାଉଣ୍ଟ'):t('Sign in to the demo','ଡେମୋ ସାଇନ୍ ଇନ୍'),signedIn?`<p>You’re signed in on this browser for the preview.</p>${button('Sign out','data-signout','outline','')}`:`<p>Preview the account experience with a sample profile.</p>${button('Continue as demo user','data-signin')}`);
  }
  if(type==='menu') {
    showDialog(t('Explore Ghar Seva','ଘର ସେବା ଦେଖନ୍ତୁ'),`<div class="mobile-links"><a data-dismiss href="#services">${t('Services','ସେବା')}</a><a data-dismiss href="#how">${t('How it works','କିପରି କାମ କରେ')}</a><a data-dismiss href="#membership">${t('Membership','ସଦସ୍ୟତା')}</a><button data-modal="support">${t('Contact','ଯୋଗାଯୋଗ')}</button><button data-modal="account">${signedIn?t('Account','ଆକାଉଣ୍ଟ'):t('Sign in','ସାଇନ୍ ଇନ୍')}</button></div>`);
  }
  if(type==='quick') book();
  if(type==='schedule') book(undefined,undefined,t('Pick a time','ସମୟ ବାଛନ୍ତୁ'));
  if(type==='request-status') {
    if(latestRequest) showRequest(t('Your demo request','ଆପଣଙ୍କ ଡେମୋ ଅନୁରୋଧ'));
    else showDialog(t('Get help at home','ଘରେ ସେବା ପାଆନ୍ତୁ'),`<p>${t('Start a demo request to choose your service and visit time. Your request summary will appear here after you confirm.','ସେବା ଓ ସମୟ ବାଛିବା ପାଇଁ ଡେମୋ ଅନୁରୋଧ ଆରମ୍ଭ କରନ୍ତୁ। ନିଶ୍ଚିତ କରିବା ପରେ ଅନୁରୋଧର ବିବରଣୀ ଏଠାରେ ଦେଖାଯିବ।')}</p>${button(t('Start a demo request','ଡେମୋ ଅନୁରୋଧ ଆରମ୍ଭ କରନ୍ତୁ'),'data-modal="schedule"')}`);
  }
  if(type==='about') showDialog(t('About Ghar Seva','ଘର ସେବା ବିଷୟରେ'),`<p>${t('Ghar Seva brings home repairs, personal care, tutoring and everyday deliveries into one local service directory for Koraput district.','କୋରାପୁଟ ଜିଲ୍ଲାରେ ଘର ମରାମତି, ଯତ୍ନ, ଟ୍ୟୁସନ୍ ଓ ଡେଲିଭରି ପାଇଁ ଘର ସେବା।')}</p>${linkButton(t('Browse services','ସେବା ଦେଖନ୍ତୁ'),'#services','outline').replace('<a ','<a data-dismiss ')}`);
  if(type==='partners') showDialog(t('Become a service partner','ସେବା ସହଭାଗୀ ହୁଅନ୍ତୁ'),`<p>${t('Local technicians, tutors, delivery partners and other service professionals can use the demo contact screen to preview the enquiry process.','ସ୍ଥାନୀୟ ସେବା ପ୍ରଦାନକାରୀ ଡେମୋ ଯୋଗାଯୋଗ ଦେଖିପାରିବେ।')}</p>${button(t('View demo contact','ଡେମୋ ଯୋଗାଯୋଗ'),'data-modal="support"')}`);
  if(type==='privacy') showDialog(t('Privacy','ଗୋପନୀୟତା'),'<p>This preview stores language, area and demo sign-in preferences in your browser. Booking details are used only to display the on-screen demo confirmation.</p>');
  if(type==='terms') showDialog(t('Demo terms','ଡେମୋ ନିୟମ'),'<p>Service availability, prices, promotions and contact details are illustrative. Demo requests do not schedule a visit or take a payment.</p>');
}
function book(id,index,dialogTitle){
  const entry=category(id);
  const item=entry?.items[index];
  const title=dialogTitle??(item?t('Book a service','ସେବା ବୁକ୍ କରନ୍ତୁ'):t('Request quick help','ଶୀଘ୍ର ସହାୟତା ମାଗନ୍ତୁ'));
  const serviceField=item?`<div class="order-line"><strong>${item[0]}</strong><b>${inr(item[1])}</b></div><input type="hidden" name="service" value="${safe(item[0])}">`:`<label>${t('Service','ସେବା')}<select name="service" required>${opts(categories.map(value=>pick(value.title)))}</select></label>`;
  showDialog(title,`<p>${t('Try the booking flow with sample details.','ନମୁନା ବିବରଣୀ ସହ ବୁକିଂ ଦେଖନ୍ତୁ।')}</p><form class="booking-form" id="booking">${serviceField}
  <label>${t('Area','ଅଞ୍ଚଳ')}<select name="area" required>${opts(areaList,area)}</select></label>
  <div class="form-pair"><label>${t('Preferred date','ପସନ୍ଦର ତାରିଖ')}<input name="date" type="date" min="${localDate(0)}" value="${localDate(1)}" required></label>
  <label>${t('Time window','ସମୟ')}<select name="time" required>${opts(['9 am – 11 am','11 am – 1 pm','2 pm – 4 pm','4 pm – 6 pm'])}</select></label></div>
  <label>${t('Address','ଠିକଣା')}<input name="address" maxlength="140" placeholder="e.g. 12, Main Road (demo)" required></label>
  <label>${t('Contact number','ଫୋନ୍ ନମ୍ବର')}<input name="phone" type="tel" inputmode="tel" pattern="[0-9]{10}" placeholder="0000000000" required></label>
  <button type="submit" class="btn primary">${t('Confirm demo request','ଡେମୋ ଅନୁରୋଧ ନିଶ୍ଚିତ କରନ୍ତୁ')} ${icon('arrow',17)}</button></form>`);
}
function showRequest(title){
  const {service,area,date,time}=latestRequest;
  const formattedDate=new Intl.DateTimeFormat(language==='or'?'or-IN':'en-IN',{dateStyle:'medium',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
  showDialog(title,`<div class="confirmation"><span>${icon('check',25)}</span><strong>${safe(service)}</strong><p>${safe(area)} · ${safe(formattedDate)} · ${safe(time)}</p></div><p>${t('This confirmation is for the preview. Your details have stayed on this page.','ଏହା ଡେମୋ ନିଶ୍ଚିତକରଣ। ଆପଣଙ୍କ ବିବରଣୀ ଏହି ପୃଷ୍ଠାରେ ରହିଛି।')}</p>${button(t('Done','ସମାପ୍ତ'),'data-dismiss','primary','check')}`);
}
function planDialog(i){
  const [name,price,period,first,second]=plans[i];
  showDialog(name+' membership',`<div class="order-line"><strong>${inr(price)} /${period}</strong></div><ul class="plan-list"><li>${first}</li><li>${second}</li></ul><p>Explore the membership selection in this demo.</p>${button('Select demo plan',`data-plan-select="${i}"`)}`);
}
let toastTimer;
function toast(message) {
  const note=document.getElementById('toast');
  note.textContent=message; note.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>note.classList.remove('show'),2600);
}
document.addEventListener('click', async event=>{
  const control=event.target.closest('button,a');
  if(!control) return;
  const d=control.dataset;
  if ('dismiss' in d) dialog.close();
  if(d.modal) modal(d.modal);
  if(d.lang && d.lang!==language){language=d.lang;store.set('gs-language',language);render(true);}
  if(d.group){activeGroup=d.group;refreshCatalog();document.querySelector(`[data-group="${d.group}"]`)?.focus();}
  if('clear' in d){query='';activeGroup='all';if(location.hash==='#services') refreshCatalog();else location.hash='services';}
  if('popular' in d){showAllPopular=!showAllPopular;document.getElementById('popular-grid').innerHTML=popular();control.innerHTML=(showAllPopular?t('Show fewer','କମ୍ ଦେଖନ୍ତୁ'):t('See all picks','ସବୁ ଦେଖନ୍ତୁ'))+' '+icon('arrow',17);prepareReveals();}
  if(d.area){area=d.area;store.set('gs-area',area);dialog.close();render(true);toast(t('Service area updated','ଅଞ୍ଚଳ ଅପଡେଟ୍ ହେଲା'));}
  if(d.book){const [id,i]=d.book.split('/');book(id,Number(i));}
  if(d.plan!==undefined) planDialog(Number(d.plan));
  if(d.planSelect!==undefined) showDialog('Demo plan selected',`<p>You selected the <strong>${plans[Number(d.planSelect)][0]}</strong> plan for this preview.</p>${button('Done','data-dismiss','primary','check')}`);
  if('signin' in d||'signout' in d){signedIn='signin' in d;store.set('gs-preview-account',signedIn?'active':'inactive');dialog.close();header();toast(signedIn?'Signed in to the demo':'Signed out');}
  if('copy' in d){try {await navigator.clipboard.writeText(`${demo.phone}\n${demo.email}`);toast('Demo contact details copied');}catch{toast('Select the details above to copy them.');}}
  if(event.target===dialog) dialog.close();
});
dialog.addEventListener('click',event=>{if(event.target===dialog) dialog.close();});
document.addEventListener('submit',event=>{
  const form=event.target;
  if(form.matches('[data-search]')){
    event.preventDefault();query=new FormData(form).get('q').trim();activeGroup='all';
    const target=query?'search/'+encodeURIComponent(query):'services';
    if(location.hash!=='#'+target) location.hash=target;
    else {refreshCatalog();moveTo('services',true);}
  }
  if(form.id==='booking'){
    event.preventDefault();
    const values=new FormData(form);
    latestRequest={service:values.get('service'),area:values.get('area'),date:values.get('date'),time:values.get('time')};
    showRequest(t('Demo request confirmed','ଡେମୋ ଅନୁରୋଧ ନିଶ୍ଚିତ ହେଲା'));
  }
});
window.addEventListener('hashchange',()=>render());
render();
