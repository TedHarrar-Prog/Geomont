(function () {
  'use strict';

  const ids = window.GEOMONT_TRACKING_IDS || {};
  const consentKey = 'geomont-cookie-preferences-v1';
  let marketingAllowed = false;
  let metaReady = false;
  let linkedinReady = false;

  function consentAllowsMarketing() {
    try {
      const choice = JSON.parse(localStorage.getItem(consentKey) || 'null');
      return Boolean(choice && choice.version === 1 && choice.marketing === true);
    } catch (error) { return false; }
  }

  function installMetaPixel() {
    if (!ids.metaPixelId || metaReady) return;
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'));
    window.fbq('init', ids.metaPixelId);
    window.fbq('consent', 'grant');
    window.fbq('track', 'PageView');
    metaReady = true;
  }

  function installLinkedInTag() {
    if (!ids.linkedinPartnerId || linkedinReady) return;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(ids.linkedinPartnerId);
    window.lintrk = window.lintrk || function (a, b) { window.lintrk.q.push([a, b]); };
    window.lintrk.q = window.lintrk.q || [];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);
    linkedinReady = true;
  }

  function applyConsent(allowed) {
    marketingAllowed = allowed;
    if (allowed) {
      installMetaPixel();
      installLinkedInTag();
      return;
    }
    // Meta supports pausing pixel activity after a visitor withdraws marketing consent.
    if (window.fbq && metaReady) window.fbq('consent', 'revoke');
  }

  // Keep Meta paused by default, including on pages reached after previously granting consent.
  if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
  applyConsent(consentAllowsMarketing());
  window.addEventListener('geomont:consent-change', function (event) {
    applyConsent(Boolean(event.detail && event.detail.marketing));
  });
  window.addEventListener('pageshow', function (event) {
    if (event.persisted && marketingAllowed && window.fbq) window.fbq('track', 'PageView');
  });
}());
