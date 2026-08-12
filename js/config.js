// ---------------------------------------------------------------------------
// Pretty Weird Apparel Co. — site config
// Edit the values below once you've picked your storefront/contact channels.
// Every "Shop Now" / "Buy" / contact link on the site pulls from here.
// ---------------------------------------------------------------------------
window.PW_CONFIG = {
  // TODO: replace with your storefront link once you pick a platform
  // (Shopify, Etsy, Big Cartel, Square, etc.) — this powers every "Shop Now" / "Buy" button.
  shopUrl: '#',

  // TODO: replace with the real inbox you want custom-order requests sent to
  // (make sure it's actually set up / forwarding before this goes live).
  email: 'hello@prettyweirdapparel.com',

  // TODO: fill in / remove any socials you don't use.
  instagram: '',
  tiktok: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.PW_CONFIG;

  document.querySelectorAll('[data-shop-link]').forEach((el) => {
    el.setAttribute('href', cfg.shopUrl);
    if (cfg.shopUrl === '#') el.setAttribute('title', 'Storefront link coming soon');
  });

  document.querySelectorAll('[data-mailto]').forEach((el) => {
    const subject = el.getAttribute('data-subject') || '';
    const mailto = `mailto:${cfg.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
    el.setAttribute('href', mailto);
    el.textContent = el.textContent.replace('EMAIL_PLACEHOLDER', cfg.email);
  });

  document.querySelectorAll('[data-email-text]').forEach((el) => {
    el.textContent = cfg.email;
  });

  const igLink = document.querySelector('[data-instagram]');
  if (igLink) {
    if (cfg.instagram) {
      igLink.setAttribute('href', cfg.instagram);
    } else {
      igLink.style.display = 'none';
    }
  }

  const ttLink = document.querySelector('[data-tiktok]');
  if (ttLink) {
    if (cfg.tiktok) {
      ttLink.setAttribute('href', cfg.tiktok);
    } else {
      ttLink.style.display = 'none';
    }
  }
});
