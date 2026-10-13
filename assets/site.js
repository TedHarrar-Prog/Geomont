(function () {
  const headerMount = document.querySelector('[data-site-header]');
  const footerMount = document.querySelector('[data-site-footer]');
  const currentPage = document.body.dataset.page || '';
  const isEnglish = document.body.dataset.locale === 'en';
  const currentFrenchPath = isEnglish ? (document.body.dataset.frPath || '/') : location.pathname;

  let header = [
    '<a class="skip-link" href="#main">Passer au contenu</a>',
    '<header class="site-header">',
      '<div class="shell nav-wrap">',
        '<a class="brand" href="/" aria-label="GéoMont — Accueil">Géo<b>Mont</b></a>',
        '<nav class="nav-links" aria-label="Navigation principale">',
          '<div class="services-drop">',
            '<a class="services-link" data-nav="services" href="/services/">Services</a>',
            '<button class="mega-toggle" type="button" aria-label="Ouvrir le menu Services" aria-controls="megaMenu" aria-expanded="false"><svg viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="m1 1 5 5 5-5" stroke="currentColor" stroke-width="1.5"/></svg></button>',
          '</div>',
          '<a class="nav-link" data-nav="donnees" href="/donnees-cartes/">Données &amp; cartes</a>',
          '<a class="nav-link" data-nav="projets" href="/projets/">Projets</a>',
          '<a class="nav-link" data-nav="ressources" href="/ressources/">Ressources</a>',
          '<a class="nav-link" data-nav="nouvelles" href="/nouvelles/">Nouvelles</a>',
          '<a class="nav-link" data-nav="apropos" href="/a-propos/">À propos</a>',
        '</nav>',
        '<div class="header-actions"><a class="lang-switch" data-language-switch href="#" aria-label="English">EN</a><a class="top-cta" href="/nous-joindre/">Parler à un expert</a></div>',
        '<button class="menu-button" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><span></span></button>',
      '</div>',
      '<nav class="mobile-menu" hidden aria-label="Navigation mobile">',
        '<a href="/services/">Services</a>',
        '<a href="/donnees-cartes/">Données &amp; cartes</a>',
        '<a href="/projets/">Projets</a>',
        '<a href="/ressources/">Ressources</a>',
        '<a href="/nouvelles/">Nouvelles</a>',
        '<a href="/a-propos/">À propos</a>',
        '<a class="mobile-language-link" data-language-switch href="#">English (EN)</a>',
        '<a class="button yellow" href="/nous-joindre/">Parler à un expert</a>',
      '</nav>',
      '<div id="megaMenu" class="mega-menu" aria-label="Services">',
        '<div class="mega-grid">',
          '<div class="mega-column"><p class="mega-heading">Par secteur</p>',
            '<a class="mega-item" href="/domaines/mrc/"><strong>MRC</strong><span>Acquisitions régionales, analyses et cartes web.</span></a>',
            '<a class="mega-item" href="/domaines/municipalites/"><strong>Municipalités</strong><span>Règlements, permis et priorités environnementales.</span></a>',
            '<a class="mega-item" href="/domaines/urbanistes-conseils/"><strong>Urbanistes-conseils</strong><span>Portrait territorial d’un lot et préanalyse.</span></a>',
            '<a class="mega-item" href="/domaines/promoteurs-acquisitions/"><strong>Promoteurs &amp; acquisitions</strong><span>Contraintes d’un terrain avant une offre.</span></a>',
            '<a class="mega-item" href="/domaines/arpenteurs-geometres/"><strong>Arpenteurs-géomètres</strong><span>Contexte topographique et historique.</span></a>',
            '<a class="mega-item" href="/domaines/"><strong>Voir tous les secteurs →</strong></a>',
          '</div>',
          '<div class="mega-column"><p class="mega-heading">Par expertise</p>',
            '<a class="mega-item" href="/services/acquisition-de-donnees/"><strong>Acquisition de données</strong><span>LiDAR, orthophotos et partenariats.</span></a>',
            '<a class="mega-item" href="/services/traitement-de-donnees/"><strong>Traitement de données</strong><span>Des jeux propres et documentés.</span></a>',
            '<a class="mega-item" href="/services/analyses-thematiques/"><strong>Analyses thématiques</strong><span>Répondre à une question territoriale précise.</span></a>',
            '<a class="mega-item" href="/services/cartographie-plateformes-web/"><strong>Cartographie &amp; plateformes web</strong><span>Partager les bonnes informations.</span></a>',
            '<a class="mega-item" href="/services/formation-soutien/"><strong>Formation &amp; soutien</strong><span>Rendre les équipes plus autonomes.</span></a>',
          '</div>',
          '<aside class="mega-column"><div class="mega-promo"><div><p class="mega-heading">Info-Sols</p><h2>La donnée territoriale, transformée en décision.</h2><p>Une ressource publique, des données et un accompagnement adapté à votre projet.</p></div><a class="button primary" href="/donnees-cartes/">Découvrir les données</a></div></aside>',
        '</div>',
      '</div>',
    '</header>'
  ].join('');

  let footer = [
    '<footer class="site-footer">',
      '<div class="shell footer-main">',
        '<div><a class="footer-brand" href="/">Géo<b>Mont</b></a><p class="footer-intro">Données, analyses et cartes pour mieux comprendre et décider sur votre territoire.</p></div>',
        '<div class="footer-col"><h2>Explorer</h2><a href="/services/">Services</a><a href="/donnees-cartes/">Données &amp; cartes</a><a href="/projets/">Projets</a><a href="/domaines/">Domaines</a></div>',
        '<div class="footer-col"><h2>Ressources</h2><a href="/ressources/">Formations &amp; soutien</a><a href="/faq/">FAQ géomatique</a><a href="/a-propos/">À propos</a><a href="https://info-sols.ca/" target="_blank" rel="noopener">Info-Sols</a></div>',
        '<div class="footer-col"><h2>Nous joindre</h2><a href="tel:+14509561036">450 956-1036</a><a href="mailto:info@geomont.qc.ca">info@geomont.qc.ca</a><a href="/nous-joindre/">Demander une soumission</a></div>',
      '</div>',
      '<div class="shell footer-bottom"><span>© 2026 GéoMont</span><button class="footer-cookie-settings" type="button" data-consent-reopen>Paramètres des témoins</button></div>',
    '</footer>'
  ].join('');

  const routes = {
    '/':'/en/','/a-propos/':'/en/about/','/domaines/':'/en/sectors/',
    '/domaines/agriculture/':'/en/sectors/agriculture/','/domaines/arpenteurs-geometres/':'/en/sectors/land-surveyors/',
    '/domaines/genie-environnement/':'/en/sectors/engineering-environment/','/domaines/mrc/':'/en/sectors/rmcs/',
    '/domaines/municipalites/':'/en/sectors/municipalities/','/domaines/obnl-organismes-environnementaux/':'/en/sectors/nonprofits-environment/',
    '/domaines/promoteurs-acquisitions/':'/en/sectors/developers-acquisitions/','/domaines/services-publics-reseaux/':'/en/sectors/utilities-networks/',
    '/domaines/urbanistes-conseils/':'/en/sectors/planning-consultants/','/donnees-cartes/':'/en/data-maps/',
    '/faq/':'/en/faq/','/nous-joindre/':'/en/contact/','/nouvelles/':'/en/news/','/projets/':'/en/projects/',
    '/ressources/':'/en/resources/','/services/':'/en/services/','/services/acquisition-de-donnees/':'/en/services/data-acquisition/',
    '/services/analyses-thematiques/':'/en/services/thematic-analysis/','/services/cartographie-plateformes-web/':'/en/services/mapping-web-platforms/',
    '/services/formation-soutien/':'/en/services/training-support/','/services/traitement-de-donnees/':'/en/services/data-processing/'
  };
  const englishChrome = [
    ['Passer au contenu','Skip to content'],['Navigation principale','Main navigation'],['Ouvrir le menu Services','Open the Services menu'],['Services','Services'],
    ['Données &amp; cartes','Data &amp; maps'],['Projets','Projects'],['Ressources','Resources'],['Nouvelles','News'],['À propos','About'],
    ['Parler à un expert','Speak with an expert'],['Ouvrir le menu','Open menu'],['Navigation mobile','Mobile navigation'],
    ['Par secteur','By sector'],['Par expertise','By expertise'],['MRC','MRCs'],['Municipalités','Municipalities'],
    ['Acquisitions régionales, analyses et cartes web.','Regional acquisitions, analysis and web maps.'],
    ['Règlements, permis et priorités environnementales.','Bylaws, permits and environmental priorities.'],
    ['Urbanistes-conseils','Planning consultants'],['Portrait territorial d’un lot et préanalyse.','Site context and preliminary analysis.'],
    ['Promoteurs &amp; acquisitions','Developers &amp; acquisitions'],['Contraintes d’un terrain avant une offre.','Site constraints before an offer.'],
    ['Arpenteurs-géomètres','Land surveyors'],['Contexte topographique et historique.','Topographic and historical context.'],
    ['Voir tous les secteurs →','View all sectors →'],['Acquisition de données','Data acquisition'],['LiDAR, orthophotos et partenariats.','LiDAR, orthophotos and partnerships.'],
    ['Traitement de données','Data processing'],['Des jeux propres et documentés.','Clean, documented datasets.'],['Analyses thématiques','Thematic analysis'],
    ['Répondre à une question territoriale précise.','Answer a specific land-use question.'],['Cartographie &amp; plateformes web','Mapping &amp; web platforms'],
    ['Partager les bonnes informations.','Share the right information.'],['Formation &amp; soutien','Training &amp; support'],['Rendre les équipes plus autonomes.','Help teams work more independently.'],
    ['La donnée territoriale, transformée en décision.','Geospatial data turned into decisions.'],
    ['Une ressource publique, des données et un accompagnement adapté à votre projet.','A public resource, data and support tailored to your project.'],
    ['Découvrir les données','Explore the data'],['Explorer','Explore'],['Domaines','Sectors'],['Formations &amp; soutien','Training &amp; support'],
    ['FAQ géomatique','Geomatics FAQ'],['Nous joindre','Contact'],['Demander une soumission','Request a quote'],
    ['Données, analyses et cartes pour mieux comprendre et décider sur votre territoire.','Data, analysis and maps to help you understand your region and make informed decisions.'],
    ['Paramètres des témoins','Cookie settings']
  ];
  function englishCopy(markup) {
    englishChrome.forEach(function (pair) { markup = markup.split(pair[0]).join(pair[1]); });
    return markup;
  }
  if (isEnglish) { header = englishCopy(header); footer = englishCopy(footer); }
  if (headerMount) headerMount.innerHTML = header;
  if (footerMount) footerMount.innerHTML = footer;

  const englishPath = routes[currentFrenchPath] || '/en/';
  document.querySelectorAll('[data-language-switch]').forEach(function (link) {
    link.href = isEnglish ? currentFrenchPath : englishPath;
    link.textContent = isEnglish ? (link.classList.contains('mobile-language-link') ? 'Français (FR)' : 'FR') : (link.classList.contains('mobile-language-link') ? 'English (EN)' : 'EN');
    link.setAttribute('aria-label', isEnglish ? 'Français' : 'English');
  });
  if (isEnglish) {
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (link.matches('[data-language-switch]')) return;
      const target = routes[link.getAttribute('href')];
      if (target) link.setAttribute('href', target);
    });
  }

  const clientLogos = {
    brome: { name: 'MRC de Brome-Missisquoi', kind: 'MRC · Estrie', file: 'MRC_Brome-Missisquoi-2022-RVB.svg' },
    sources: { name: 'MRC des Sources', kind: 'MRC · Estrie', file: 'mrc-des-sources.svg' },
    roussillon: { name: 'MRC de Roussillon', kind: 'MRC · Montérégie', file: 'mrc-roussillon.svg' },
    marguerite: { name: 'MRC de Marguerite-D’Youville', kind: 'MRC · Montérégie', file: 'mrc-marguerite-dyouville.svg' },
    vaudreuil: { name: 'MRC de Vaudreuil-Soulanges', kind: 'MRC · Montérégie', file: 'mrc-vaudreuil-soulanges-banner.png' },
    granby: { name: 'Ville de Granby', kind: 'Municipalité', file: 'ville-granby.svg' },
    crem: { name: 'CRE de la Montérégie', kind: 'Organisme environnemental', file: 'cre-monteregie-banner.png' },
    maska: { name: 'Agri Conseils Maska', kind: 'Organisation agricole', file: 'agri-conseils-maska.png' },
    fusion: { name: 'Agri-Fusion', kind: 'Organisation agricole', file: 'agri-fusion.png' }
  };

  const partnerGroups = {
    home: {
      marks: [clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.granby, clientLogos.crem, clientLogos.maska, clientLogos.fusion]
    },
    mrc: {
      marks: [clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil]
    },
    municipalites: {
      marks: [clientLogos.granby, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.brome]
    },
    urbanistes: {
      marks: [clientLogos.granby, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.brome]
    },
    promoteurs: {
      marks: [clientLogos.granby, clientLogos.brome, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil]
    },
    arpenteurs: {
      marks: [clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite, clientLogos.granby]
    },
    genie: {
      marks: [clientLogos.crem, clientLogos.granby, clientLogos.brome, clientLogos.sources, clientLogos.roussillon]
    },
    agriculture: {
      marks: [clientLogos.maska, clientLogos.fusion, clientLogos.vaudreuil, clientLogos.brome, clientLogos.crem]
    },
    reseaux: {
      marks: [clientLogos.granby, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.brome]
    },
    obnl: {
      marks: [clientLogos.crem, clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite]
    }
  };

  function buildPartnerBand(group) {
    const section = document.createElement('section');
    section.className = 'partner-band';
    section.setAttribute('aria-label', isEnglish ? 'Partner organization logos' : 'Logos des organisations partenaires');
    const logoItems = group.marks.map(function (mark) {
      return '<div class="partner-logo"><img src="/assets/logos/' + mark.file + '" alt="' + mark.name + '" loading="eager" decoding="async"></div>';
    }).join('');
    section.innerHTML = [
      '<div class="shell">',
        '<div class="partner-marquee" role="region" aria-label="' + (isEnglish ? 'Partner organization logos' : 'Logos des organisations partenaires') + '" tabindex="0">',
          '<div class="partner-track"><div class="partner-group">', logoItems, '</div><div class="partner-group" aria-hidden="true">', logoItems, '</div></div>',
        '</div>',
      '</div>'
    ].join('');
    return section;
  }

  const partnerSet = document.body.dataset.partnerSet || 'home';
  const main = document.querySelector('main');
  if (main && partnerGroups[partnerSet]) {
    const band = buildPartnerBand(partnerGroups[partnerSet]);
    const hero = main.querySelector('.hero');
    if (hero) hero.insertAdjacentElement('afterend', band);
  }

  const navName = currentPage === 'domaines' || currentPage === 'sector' || currentPage === 'service-detail' ? 'services' : currentPage;
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    link.classList.toggle('active', link.dataset.nav === navName);
  });

  const megaToggle = document.querySelector('.mega-toggle');
  const megaMenu = document.querySelector('.mega-menu');
  const mobileToggle = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  function closeMenus() {
    if (megaMenu) megaMenu.classList.remove('open');
    if (megaToggle) megaToggle.setAttribute('aria-expanded', 'false');
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.hidden = true;
    }
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  if (megaToggle) {
    megaToggle.addEventListener('click', function () {
      const isOpen = megaMenu.classList.toggle('open');
      megaToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('open');
      mobileMenu.hidden = !isOpen;
      mobileMenu.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenus();
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.site-header')) closeMenus();
  });

  document.querySelectorAll('[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const output = form.querySelector('[data-form-result]');
      if (output) {
        output.hidden = false;
        output.textContent = isEnglish ? 'Preview only: no information has been sent. The final site will route your request to the right person.' : 'Aperçu seulement : aucune information n’a été transmise. Le site final acheminera cette demande à la bonne personne.';
      }
    });
  });

  const consentStorageKey = 'geomont-cookie-preferences-v1';
  const consentPanel = document.createElement('aside');
  consentPanel.className = 'consent';
  consentPanel.dataset.consent = '';
  consentPanel.setAttribute('role', 'dialog');
  consentPanel.setAttribute('aria-modal', 'false');
  consentPanel.setAttribute('aria-labelledby', 'consent-title');
  consentPanel.hidden = true;
  document.body.appendChild(consentPanel);

  const consentLabels = isEnglish ? {
    aria: 'Cookie preferences', title: 'Your privacy choices',
    intro: 'Choose whether GéoMont may use optional cookies. Essential cookies keep the site working and remember your choice.',
    details: 'Cookie preferences', detailCopy: 'Essential cookies are always on. Optional categories remain off unless you choose to enable them.',
    essential: 'Essential cookies', essentialDesc: 'Required for site operation and saving your preferences.',
    analytics: 'Analytics cookies', analyticsDesc: 'Help us understand how visitors use the site.',
    marketing: 'Marketing cookies', marketingDesc: 'Used to measure and tailor marketing.',
    always: 'Always active', all: 'Accept all', detailButton: 'Details', accept: 'Accept', deny: 'Deny',
    settings: 'Cookie settings'
  } : {
    aria: 'Préférences des témoins', title: 'Vos choix de confidentialité',
    intro: 'Choisissez si GéoMont peut utiliser des témoins facultatifs. Les témoins nécessaires assurent le fonctionnement du site et mémorisent votre choix.',
    details: 'Préférences des témoins', detailCopy: 'Les témoins nécessaires sont toujours actifs. Les catégories facultatives restent désactivées jusqu’à votre choix.',
    essential: 'Témoins nécessaires', essentialDesc: 'Requis pour le fonctionnement du site et la sauvegarde de vos préférences.',
    analytics: 'Témoins de mesure d’audience', analyticsDesc: 'Aident à comprendre l’utilisation du site.',
    marketing: 'Témoins de marketing', marketingDesc: 'Servent à mesurer et à personnaliser les communications marketing.',
    always: 'Toujours actifs', all: 'Tout accepter', detailButton: 'Détails', accept: 'Accepter', deny: 'Refuser',
    settings: 'Paramètres des témoins'
  };
  consentPanel.setAttribute('aria-label', consentLabels.aria);

  function readConsentPreferences() {
    try {
      const raw = localStorage.getItem(consentStorageKey);
      if (!raw) return null;
      const saved = JSON.parse(raw);
      if (saved.version !== 1 || typeof saved.analytics !== 'boolean' || typeof saved.marketing !== 'boolean') return null;
      return { necessary: true, analytics: saved.analytics, marketing: saved.marketing };
    } catch (error) { return null; }
  }

  function notifyConsent(preferences, decision) {
    const record = { version: 1, necessary: true, analytics: preferences.analytics, marketing: preferences.marketing, decision: decision, updatedAt: new Date().toISOString() };
    try { localStorage.setItem(consentStorageKey, JSON.stringify(record)); } catch (error) { /* Keep the choice active for this page even if storage is unavailable. */ }
    consentPanel.hidden = true;
    window.dispatchEvent(new CustomEvent('geomont:consent-change', { detail: record }));
  }

  function renderConsent(view, preferences) {
    const prefs = preferences || { necessary: true, analytics: false, marketing: false };
    consentPanel.hidden = false;
    if (view === 'details') {
      consentPanel.innerHTML = [
        '<div class="consent-heading"><h2 id="consent-title" tabindex="-1">', consentLabels.details, '</h2><p>', consentLabels.detailCopy, '</p></div>',
        '<div class="consent-categories">',
          '<label class="consent-category"><span><strong>', consentLabels.essential, '</strong><small>', consentLabels.essentialDesc, '</small></span><span class="consent-category-state"><small>', consentLabels.always, '</small><input type="checkbox" checked disabled aria-label="', consentLabels.essential, ' — ', consentLabels.always, '"></span></label>',
          '<label class="consent-category"><span><strong>', consentLabels.analytics, '</strong><small>', consentLabels.analyticsDesc, '</small></span><input type="checkbox" data-consent-analytics', prefs.analytics ? ' checked' : '', '></label>',
          '<label class="consent-category"><span><strong>', consentLabels.marketing, '</strong><small>', consentLabels.marketingDesc, '</small></span><input type="checkbox" data-consent-marketing', prefs.marketing ? ' checked' : '', '></label>',
        '</div>',
        '<div class="consent-actions consent-detail-actions"><button class="button primary" type="button" data-consent-accept-all>', consentLabels.all, '</button><button class="button line" type="button" data-consent-accept-selection>', consentLabels.accept, '</button><button class="button line" type="button" data-consent-deny>', consentLabels.deny, '</button></div>'
      ].join('');
      const heading = consentPanel.querySelector('#consent-title');
      if (heading) heading.focus();
      const updateDenyAvailability = function () {
        const anyOptionalSelected = Boolean(consentPanel.querySelector('[data-consent-analytics]')?.checked || consentPanel.querySelector('[data-consent-marketing]')?.checked);
        const denyButton = consentPanel.querySelector('[data-consent-deny]');
        if (denyButton) denyButton.disabled = !anyOptionalSelected;
      };
      consentPanel.querySelectorAll('[data-consent-analytics], [data-consent-marketing]').forEach(function (input) {
        input.addEventListener('change', updateDenyAvailability);
      });
      updateDenyAvailability();
      return;
    }
    consentPanel.innerHTML = [
      '<div class="consent-heading"><h2 id="consent-title">', consentLabels.title, '</h2><p>', consentLabels.intro, '</p></div>',
      '<div class="consent-actions"><button class="button primary" type="button" data-consent-accept-all>', consentLabels.all, '</button><button class="button line" type="button" data-consent-options>', consentLabels.detailButton, '</button></div>'
    ].join('');
  }

  consentPanel.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches('[data-consent-options]')) {
      renderConsent('details', readConsentPreferences() || { necessary: true, analytics: false, marketing: false });
    } else if (button.matches('[data-consent-accept-all]')) {
      consentPanel.querySelectorAll('[data-consent-analytics], [data-consent-marketing]').forEach(function (input) { input.checked = true; });
      notifyConsent({ analytics: true, marketing: true }, 'accept_all');
    } else if (button.matches('[data-consent-accept-selection]') || button.matches('[data-consent-deny]')) {
      const selected = {
        analytics: Boolean(consentPanel.querySelector('[data-consent-analytics]')?.checked),
        marketing: Boolean(consentPanel.querySelector('[data-consent-marketing]')?.checked)
      };
      notifyConsent(selected, button.matches('[data-consent-deny]') ? 'accept_selected_reject_unselected' : 'custom');
    }
  });

  document.querySelectorAll('[data-consent-reopen]').forEach(function (button) {
    button.addEventListener('click', function () {
      renderConsent('details', readConsentPreferences() || { necessary: true, analytics: false, marketing: false });
    });
  });
  const consentPanelSeenKey = 'geomont-cookie-panel-seen-v1';
  let consentPanelSeen = false;
  try { consentPanelSeen = sessionStorage.getItem(consentPanelSeenKey) === '1'; } catch (error) { /* Session storage can be unavailable in private browsing. */ }
  if (readConsentPreferences() || consentPanelSeen) {
    consentPanel.hidden = true;
  } else {
    try { sessionStorage.setItem(consentPanelSeenKey, '1'); } catch (error) { /* The panel remains usable without session storage. */ }
    renderConsent('notice');
  }
}());
