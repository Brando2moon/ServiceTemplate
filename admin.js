/* Service admin loader with project photo upload, replace, and remove controls. */
(async()=>{
  try{
    const installProjectPhotoUI=()=>{
      const section=document.querySelector('[data-view="projects"]');
      if(!section)return;
      section.innerHTML=`
        <div class="panel-head page-head">
          <div><span class="eyebrow">Before and after</span><h2>Projects</h2><p>Upload, replace, or remove project photos. A project stays hidden until it has both photos.</p></div>
        </div>
        <div class="editor-grid">
          <form class="admin-panel editor-form" data-project-form>
            <h3>Add or edit project</h3>
            <input name="id" type="hidden">
            <label>Project title<input name="title" required></label>
            <div class="form-two"><label>Service category<input name="service_category"></label><label>Location label<input name="location_label"></label></div>
            <label>Description<textarea name="description" rows="4"></textarea></label>
            <input name="before_image_url" type="hidden">
            <input name="after_image_url" type="hidden">
            <div class="project-photo-fields">
              <section class="project-photo-field">
                <strong>Before photo</strong>
                <div class="project-photo-preview"><img data-before-photo-preview alt="Current before project photo" hidden><span data-before-photo-empty>No photo added</span></div>
                <label>Upload before photo<input name="before_photo" type="file" accept="image/jpeg,image/png,image/webp"></label>
                <button class="small-button danger-button" type="button" data-remove-before-photo hidden>Remove before photo</button>
              </section>
              <section class="project-photo-field">
                <strong>After photo</strong>
                <div class="project-photo-preview"><img data-after-photo-preview alt="Current after project photo" hidden><span data-after-photo-empty>No photo added</span></div>
                <label>Upload after photo<input name="after_photo" type="file" accept="image/jpeg,image/png,image/webp"></label>
                <button class="small-button danger-button" type="button" data-remove-after-photo hidden>Remove after photo</button>
              </section>
            </div>
            <small class="upload-help">JPG, PNG, or WebP. Maximum 8 MB per photo.</small>
            <div class="form-two">
              <label>Completion date<input name="completed_on" type="date"></label>
              <label>Display order<input name="sort_order" type="number" value="0"></label>
              <label class="inline-check"><input name="featured" type="checkbox"> Featured</label>
              <label class="inline-check"><input name="published" type="checkbox"> Published</label>
            </div>
            <button class="btn primary" type="submit">Save project</button>
            <button class="btn" type="button" data-clear-project-form>Clear form</button>
            <p class="form-status" data-project-status></p>
          </form>
          <section class="admin-panel"><div class="content-list" data-project-list></div></section>
        </div>`;
      if(!document.querySelector('[data-project-photo-styles]')){
        const style=document.createElement('style');
        style.dataset.projectPhotoStyles='true';
        style.textContent=`
          .project-photo-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .project-photo-field{display:grid;gap:10px;padding:14px;border:1px solid var(--line);border-radius:14px;background:#081725}
          .project-photo-preview{height:180px;display:grid;place-items:center;overflow:hidden;border:1px dashed #35536b;border-radius:12px;background:#06111e;color:var(--muted);text-align:center}
          .project-photo-preview img{width:100%;height:100%;object-fit:cover}
          .project-photo-field input[type=file]{padding:10px;background:#071522}
          .upload-help{color:var(--muted)}
          .danger-button{color:#f0a2aa!important;border-color:#6e3841!important}
          .project-admin-item{grid-template-columns:150px 1fr auto;align-items:center}
          .project-admin-images{display:grid;grid-template-columns:1fr 1fr;gap:6px}
          .project-admin-images span{height:64px;display:grid;place-items:center;overflow:hidden;border:1px solid var(--line);border-radius:8px;background:#071522;color:var(--muted);font-size:9px;text-align:center}
          .project-admin-images img{width:100%;height:100%;object-fit:cover}
          @media(max-width:800px){.project-photo-fields{grid-template-columns:1fr}.project-admin-item{grid-template-columns:1fr}.project-admin-images{max-width:220px}}
        `;
        document.head.append(style);
      }
    };

    installProjectPhotoUI();
    const files=[
      'admin-code-v2/part01.txt','admin-code-v2/part02.txt','admin-code-v2/part03.txt','admin-code-v2/part04.txt','admin-code-v2/part05.txt',
      'admin-code-v2/part06.txt','admin-code-v2/part07.txt','admin-code-v2/part08.txt','admin-code-v2/part09.txt','admin-code-v2/part10.txt'
    ];
    const source=(await Promise.all(files.map(async file=>{
      const response=await fetch(file);
      if(!response.ok)throw new Error('Unable to load admin module.');
      return response.text();
    }))).join('');
    (0,eval)(source);
    if(document.readyState!=='loading')document.dispatchEvent(new Event('DOMContentLoaded'));
  }catch(error){
    console.error(error);
    document.body.insertAdjacentHTML('afterbegin','<div class="admin-alert">The admin code could not load. Refresh the page.</div>');
  }
})();
