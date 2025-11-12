document.addEventListener('DOMContentLoaded', function(){
  // Simple interactions: clicking cards logs the selection and adds a focus state
  function makeSelectable(containerSelector){
    const container = document.querySelector(containerSelector);
    if(!container) return;
    container.addEventListener('click', function(e){
      const card = e.target.closest('.card');
      if(!card) return;
      // visual
      container.querySelectorAll('.card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected');
      // data
      const name = card.dataset.name || card.querySelector('.card-label')?.textContent || 'unknown';
      console.log('Card clicked:', name);
    });
  }

  makeSelectable('#new-games');
  makeSelectable('#popular-games');

  // Make the card rows horizontally scrollable with snapping on touch
  document.querySelectorAll('.card-row').forEach(row=>{
    row.style.scrollSnapType = 'x mandatory';
    row.querySelectorAll('.card').forEach(card=>card.style.scrollSnapAlign = 'start');
  });
});
