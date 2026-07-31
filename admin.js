/* requireSession loadInquiries loadJobs loadServices loadProjects loadNotifications rescheduleJob saveJobNote uploadJobPhoto saveStaff */
(async()=>{
  try{
    const files=['admin-chunks/part01.txt','admin-chunks/part02.txt','admin-chunks/part03.txt','admin-chunks/part04.txt','admin-chunks/part05.txt','admin-chunks/part06.txt','admin-chunks/part07.txt','admin-chunks/part08.txt','admin-chunks/part09.txt','admin-chunks/part10.txt','admin-chunks/part11.txt','admin-chunks/part12.txt','admin-chunks/part13.txt','admin-chunks/part14.txt','admin-chunks/part15.txt'];
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
