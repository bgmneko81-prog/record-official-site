(() => {
  document.querySelectorAll('.dossier-asset img').forEach(img => {
    const slot = img.closest('.asset-slot');
    const update = () => slot.classList.toggle('has-image', img.complete && img.naturalWidth > 0);
    img.addEventListener('load', update);
    img.addEventListener('error', update);
    update();
  });
})();
