document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  if (!header) return;
  const branding = header.querySelector('.site-branding');

  const DELTA = 24;
  const COMPACT_AT = 140;
  const EXPAND_AT  = 80;
  let lastY = window.scrollY || 0;
  let isCompact = false;
  let ticking = false;

  const setExpanded = (expanded) => {
    isCompact = !expanded;
    if (expanded) {
      header.classList.remove('is-compact');
      header.setAttribute('aria-expanded', 'true');
      if (branding) branding.removeAttribute('aria-hidden');
    } else {
      header.classList.add('is-compact');
      header.setAttribute('aria-expanded', 'false');
      if (branding) branding.setAttribute('aria-hidden', 'true');
    }
  };

  const init = () => {
    const y = window.scrollY || 0;
    if (y > COMPACT_AT) setExpanded(false);
    else setExpanded(true);
  };
  init();

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const y = window.scrollY || 0;

      if (!isCompact && y > COMPACT_AT && (y - lastY) > DELTA) {
        setExpanded(false);
      }
      else if (isCompact && ((lastY - y) > DELTA || y < EXPAND_AT)) {
        setExpanded(true);
      }

      lastY = y;
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', init);
});
