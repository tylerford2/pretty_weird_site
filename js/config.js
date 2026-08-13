// ---------------------------------------------------------------------------
// Pretty Weird Apparel Co. — site config
// Edit the values below once you've picked your storefront/contact channels.
// Every "Shop Now" / "Buy" / contact link on the site pulls from here.
// ---------------------------------------------------------------------------
window.PW_CONFIG = {
  // Shopify storefront — powers every "Shop Now" / "Buy" button site-wide.
  shopUrl: 'https://shop.prettyweirdapparel.com/',

  // The specific Custom DTF Print Quote product — powers the "Request A
  // Custom Quote" CTA on custom.html, separate from the general shopUrl above.
  customQuoteUrl: 'https://shop.prettyweirdapparel.com/products/custom-dtf-print-quote-upload-your-design?variant=45953643642924',

  // Not a custom-domain inbox yet, so we never display this address as text —
  // "Email Us" buttons open a Gmail compose window instead (see data-email-link below).
  email: 'tyler.prettyweird@gmail.com',

  // TODO: fill in / remove any socials you don't use.
  facebook: 'https://www.facebook.com/profile.php?id=61585029376531',
  instagram: '',
  tiktok: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.PW_CONFIG;

  document.querySelectorAll('[data-shop-link]').forEach((el) => {
    el.setAttribute('href', cfg.shopUrl);
  });

  document.querySelectorAll('[data-custom-quote-link]').forEach((el) => {
    el.setAttribute('href', cfg.customQuoteUrl);
  });

  document.querySelectorAll('[data-email-link]').forEach((el) => {
    const subject = el.getAttribute('data-subject') || '';
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: cfg.email });
    if (subject) params.set('su', subject);
    el.setAttribute('href', `https://mail.google.com/mail/?${params.toString()}`);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  const fbLink = document.querySelector('[data-facebook]');
  if (fbLink) {
    if (cfg.facebook) {
      fbLink.setAttribute('href', cfg.facebook);
    } else {
      fbLink.style.display = 'none';
    }
  }

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
