(()=>{
  'use strict';
  const C=window.SERVICE_CONFIG||{};
  const supa=(window.supabase&&C.supabaseUrl&&C.supabasePublishableKey)
    ? window.supabase.createClient(C.supabaseUrl,C.supabasePublishableKey)
    : null;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=(value='')=>String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  const fallbackSettings={
    company_name:'Northstar Service Co.',
    tagline:'Reliable work. Clear communication. Results that last.',
    phone:'(555) 014-2200',
    email:'hello@example.com',
    address:'Serving your local area',
    service_area:'Local homes and businesses',
    business_hours:'Monday–Friday, 8:00 AM–6:00 PM',
    primary_color:'#07111f',accent_color:'#3aaef5',
    hero_title:'Professional service when your home needs it most.',
    hero_text:'A reusable service-business website for trusted local teams.'
  };
  const fallbackServices=[
    {name:'Electrical Service',short_description:'Troubleshooting, repairs, upgrades, and dependable power solutions.',image_url:'assets/service-1.svg'},
    {name:'Property Repairs',short_description:'Responsive repairs and maintenance for homes and small businesses.',image_url:'assets/service-2.svg'},
    {name:'Installation Work',short_description:'Clean, careful installation with clear communication from start to finish.',image_url:'assets/service-3.svg'},
    {name:'Preventive Maintenance',short_description:'Scheduled service that helps prevent breakdowns and costly surprises.',image_url:'assets/service-4.svg'}
  ];
  const fallbackProjects=[{
    title:'Power Restoration',service_category:'Electrical Service',location_label:'Local service project',
    description:'A damaged panel was repaired, tested, and returned to safe working condition.',
    before_image_url:'assets/project-before.svg',after_image_url:'assets/project-after.svg'
  }];

  function headerMarkup(){
    const page=document.body.dataset.page||'';
    const link=(href,label,key)=>`<a href="${href}" ${page===key?'aria-current="page"':''}>${label}</a>`;
    return `<header class="site-header"><a class="brand" href="index.html" aria-label="Home"><span class="brand-mark">S</span><span><strong data-company-name>Northstar Service Co.</strong><small>Service business template</small></span></a><button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open navigation">Menu</button><nav class="site-nav" aria-label="Primary navigation">${link('index.html','Home','home')}${link('services.html','Services','services')}${link('about.html','About','about')}${link('contact.html','Contact','contact')}<a class="nav-cta" href="contact.html#request">Request service</a></nav></header>`;
  }
  function footerMarkup(){
    return `<footer class="site-footer"><div><a class="brand footer-brand" href="index.html"><span class="brand-mark">S</span><span><strong data-company-name>Northstar Service Co.</strong><small data-tagline>Reliable work. Clear communication.</small></span></a><p>Built as a reusable service-business website and operations template.</p></div><div><strong>Contact</strong><a data-phone-link href="tel:+15550142200"><span data-phone>(555) 014-2200</span></a><a data-email-link href="mailto:hello@example.com"><span data-email>hello@example.com</span></a><span data-service-area>Local homes and businesses</span></div><div><strong>Pages</strong><a href="services.html">Services</a><a href="about.html">About</a><a href="contact.html">Contact</a></div><div><strong>Hours</strong><span data-hours>Monday–Friday, 8:00 AM–6:00 PM</span></div><small class="footer-bottom">© <span data-year></span> <span data-company-name>Northstar Service Co.</span>. All rights reserved.</small></footer>`;
  }

  async function getSettings(){
    if(!supa)return fallbackSettings;
    const {data,error}=await supa.from('svc_site_settings').select('*').eq('id',1).maybeSingle();
    return error||!data?fallbackSettings:{...fallbackSettings,...data};
  }
  function applySettings(settings){
    document.documentElement.style.setProperty('--page-bg',settings.primary_color||fallbackSettings.primary_color);
    document.documentElement.style.setProperty('--accent',settings.accent_color||fallbackSettings.accent_color);
    $$('[data-company-name]').forEach(el=>el.textContent=settings.company_name);
    $$('[data-tagline]').forEach(el=>el.textContent=settings.tagline);
    $$('[data-phone]').forEach(el=>el.textContent=settings.phone);
    $$('[data-email]').forEach(el=>el.textContent=settings.email);
    $$('[data-service-area]').forEach(el=>el.textContent=settings.service_area);
    $$('[data-hours]').forEach(el=>el.textContent=settings.business_hours);
    $$('[data-hero-title]').forEach(el=>el.textContent=settings.hero_title);
    $$('[data-hero-text]').forEach(el=>el.textContent=settings.hero_text);
    $$('[data-phone-link]').forEach(el=>el.href=`tel:${String(settings.phone||'').replace(/[^+\d]/g,'')}`);
    $$('[data-email-link]').forEach(el=>el.href=`mailto:${settings.email}`);
    if(settings.logo_url){
      $$('[data-logo]').forEach(el=>{el.src=settings.logo_url;el.hidden=false;});
      $$('.brand-mark').forEach(el=>el.hidden=true);
    }
  }
  async function getServices(){
    if(!supa)return fallbackServices;
    const {data,error}=await supa.from('svc_services').select('*').eq('active',true).order('sort_order').order('name');
    return error||!data?.length?fallbackServices:data;
  }
  async function getProjects(){
    if(!supa)return fallbackProjects;
    const {data,error}=await supa.from('svc_projects').select('*').eq('published',true).order('sort_order').order('created_at',{ascending:false});
    return error||!data?.length?fallbackProjects:data;
  }
  function renderServices(services){
    $$('[data-services-grid]').forEach(grid=>{
      const limit=grid.dataset.limit?Number(grid.dataset.limit):services.length;
      grid.innerHTML=services.slice(0,limit).map((service,index)=>`<article class="service-card"><div class="service-media"><img src="${esc(service.image_url||`assets/service-${(index%4)+1}.svg`)}" alt="" loading="lazy"></div><span class="card-number">0${index+1}</span><h3>${esc(service.name)}</h3><p>${esc(service.short_description||service.long_description||'Professional local service.')}</p><a href="contact.html#request">Request this service <span aria-hidden="true">→</span></a></article>`).join('');
    });
  }
  function renderProjects(projects){
    $$('[data-project-grid]').forEach(grid=>{
      grid.innerHTML=projects.map(project=>`<article class="project-card"><button class="restore-card" type="button" aria-pressed="false" data-restore-card><span class="restore-stage"><img class="before-image" src="${esc(project.before_image_url||'assets/project-before.svg')}" alt="Before: ${esc(project.title)}"><img class="after-image" src="${esc(project.after_image_url||'assets/project-after.svg')}" alt="After: ${esc(project.title)}"><span class="power-trace" aria-hidden="true"></span><span class="restore-flash" aria-hidden="true"></span><span class="restore-label" data-restore-label>Before — click to restore power</span></span></button><div class="project-copy"><span>${esc(project.service_category||'Completed project')} · ${esc(project.location_label||'Local area')}</span><h3>${esc(project.title)}</h3><p>${esc(project.description||'Professional service completed with care.')}</p></div></article>`).join('');
      initRestorationCards(grid);
    });
  }
  function initRestorationCards(root=document){
    $$('[data-restore-card]',root).forEach(button=>{
      if(button.dataset.ready)return;
      button.dataset.ready='true';
      button.addEventListener('click',()=>{
        const restored=button.classList.toggle('restored');
        button.setAttribute('aria-pressed',String(restored));
        const label=$('[data-restore-label]',button);
        if(label)label.textContent=restored?'After — power restored. Click for before':'Before — click to restore power';
      });
    });
  }
  function initNavigation(){
    const toggle=$('.nav-toggle'),nav=$('.site-nav');
    toggle?.addEventListener('click',()=>{
      const open=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!open));
      nav?.classList.toggle('open',!open);
    });
  }
  function initContactForm(){
    const form=$('[data-contact-form]');
    if(!form)return;
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      const status=$('[data-contact-status]');
      if(form.elements.website.value){status.textContent='Thank you.';form.reset();return;}
      const payload={
        p_name:form.elements.name.value.trim(),p_email:form.elements.email.value.trim(),p_phone:form.elements.phone.value.trim(),
        p_service:form.elements.service.value.trim(),p_message:form.elements.message.value.trim()
      };
      const submit=form.querySelector('button[type="submit"]');
      submit.disabled=true;status.textContent='Sending your request…';
      if(!supa){status.textContent='The contact system is not configured yet.';submit.disabled=false;return;}
      const {error}=await supa.rpc('submit_service_inquiry',payload);
      submit.disabled=false;
      if(error){console.error(error);status.textContent='Your request could not be sent. Please call the business directly.';return;}
      status.textContent='Your request was sent. A team member will contact you soon.';
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded',async()=>{
    $('[data-site-header]')?.insertAdjacentHTML('afterbegin',headerMarkup());
    $('[data-site-footer]')?.insertAdjacentHTML('afterbegin',footerMarkup());
    $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
    initNavigation();initContactForm();initRestorationCards();
    const [settings,services,projects]=await Promise.all([getSettings(),getServices(),getProjects()]);
    applySettings(settings);renderServices(services);renderProjects(projects);
  });
})();
