window.SERVICE_CONFIG = {
  supabaseUrl: 'https://vhxmczybvvsolbgmprzk.supabase.co',
  supabasePublishableKey: 'sb_publishable_O6WBgLoE1qYltTi7Z5qveQ_PNbv7KDN'
};

// Add the reusable Gallery link after app.js builds the shared header and footer.
document.addEventListener('DOMContentLoaded',()=>{
  window.setTimeout(()=>{
    const galleryHref='gallery.html';
    const page=document.body.dataset.page||'';
    const makeGalleryLink=()=>{
      const link=document.createElement('a');
      link.href=galleryHref;
      link.textContent='Gallery';
      if(page==='gallery')link.setAttribute('aria-current','page');
      return link;
    };

    const nav=document.querySelector('.site-nav');
    if(nav&&!nav.querySelector(`a[href='${galleryHref}']`)){
      const contact=nav.querySelector("a[href='contact.html']");
      nav.insertBefore(makeGalleryLink(),contact||nav.querySelector('.nav-cta'));
    }

    const footerSections=[...document.querySelectorAll('.site-footer>div')];
    const pagesSection=footerSections.find(section=>section.querySelector('strong')?.textContent.trim()==='Pages');
    if(pagesSection&&!pagesSection.querySelector(`a[href='${galleryHref}']`)){
      const about=pagesSection.querySelector("a[href='about.html']");
      pagesSection.insertBefore(makeGalleryLink(),about||null);
    }

    if(page==='home'){
      const grid=document.querySelector('[data-project-grid]');
      if(grid&&!document.querySelector('.gallery-link-row')){
        grid.insertAdjacentHTML('afterend',`<div class="hero-actions gallery-link-row"><a class="btn" href='${galleryHref}'>View full project gallery</a></div>`);
      }
    }
  },0);
});
