(() => {
  const phone = document.documentElement.dataset.whatsappPhone || '5517981012405';
  document.querySelectorAll('[data-wa]').forEach((link) => {
    const message = link.dataset.message || 'Olá, Ricardo! Gostaria de agendar uma corrida pelo Táxi Aeroporto.';
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });

  document.querySelectorAll('.mobile-nav nav a').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = link.closest('details');
      if (menu && !link.hasAttribute('data-wa')) menu.open = false;
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
