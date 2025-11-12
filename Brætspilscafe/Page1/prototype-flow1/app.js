document.addEventListener('DOMContentLoaded', function(){
  // Simple navigation between screens
  function showScreen(n){
    document.querySelectorAll('.screen').forEach(s=>{
      s.hidden = s.dataset.screen !== String(n);
    });
  }

  document.body.addEventListener('click', function(e){
    const next = e.target.closest('[data-next]');
    const prev = e.target.closest('[data-prev]');
    if(next){
      showScreen(next.getAttribute('data-next'));
    }
    if(prev){
      showScreen(prev.getAttribute('data-prev'));
    }
  });

  // simple card logging
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', function(e){
      e.stopPropagation();
      const name = card.dataset.name || card.querySelector('.card-label')?.textContent;
      console.log('Card select:', name);
    });
  });

  // initial
  showScreen(1);
});
