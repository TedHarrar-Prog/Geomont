(function () {
  const headerMount = document.querySelector('[data-site-header]');
  const footerMount = document.querySelector('[data-site-footer]');
  const currentPage = document.body.dataset.page || '';

  const header = [
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
        '<a class="top-cta" href="/nous-joindre/">Parler à un expert</a>',
        '<button class="menu-button" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><span></span></button>',
      '</div>',
      '<nav class="mobile-menu" hidden aria-label="Navigation mobile">',
        '<a href="/services/">Services</a>',
        '<a href="/donnees-cartes/">Données &amp; cartes</a>',
        '<a href="/projets/">Projets</a>',
        '<a href="/ressources/">Ressources</a>',
        '<a href="/nouvelles/">Nouvelles</a>',
        '<a href="/a-propos/">À propos</a>',
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

  const footer = [
    '<footer class="site-footer">',
      '<div class="shell footer-main">',
        '<div><a class="footer-brand" href="/">Géo<b>Mont</b></a><p class="footer-intro">Données, analyses et cartes pour mieux comprendre et décider sur votre territoire.</p></div>',
        '<div class="footer-col"><h2>Explorer</h2><a href="/services/">Services</a><a href="/donnees-cartes/">Données &amp; cartes</a><a href="/projets/">Projets</a><a href="/domaines/">Domaines</a></div>',
        '<div class="footer-col"><h2>Ressources</h2><a href="/ressources/">Formations &amp; soutien</a><a href="/faq/">FAQ géomatique</a><a href="/a-propos/">À propos</a><a href="https://info-sols.ca/" target="_blank" rel="noopener">Info-Sols</a></div>',
        '<div class="footer-col"><h2>Nous joindre</h2><a href="tel:+14509561036">450 956-1036</a><a href="mailto:info@geomont.qc.ca">info@geomont.qc.ca</a><a href="/nous-joindre/">Demander une soumission</a></div>',
      '</div>',
      '<div class="shell footer-bottom"><span>© 2026 Géomont. Maquette V5.</span><span>Français d’abord · Anglais en phase 2</span></div>',
    '</footer>'
  ].join('');

  if (headerMount) headerMount.innerHTML = header;
  if (footerMount) footerMount.innerHTML = footer;

  const clientLogos = {
    brome: { name: 'MRC de Brome-Missisquoi', kind: 'MRC · Estrie', file: 'MRC_Brome-Missisquoi-2022-RVB.svg' },
    sources: { name: 'MRC des Sources', kind: 'MRC · Estrie', file: 'mrc-des-sources.svg' },
    roussillon: { name: 'MRC de Roussillon', kind: 'MRC · Montérégie', file: 'mrc-roussillon.svg' },
    marguerite: { name: 'MRC de Marguerite-D’Youville', kind: 'MRC · Montérégie', file: 'mrc-marguerite-dyouville.svg' },
    vaudreuil: { name: 'MRC de Vaudreuil-Soulanges', kind: 'MRC · Montérégie', file: 'mrc-vaudreuil-soulanges.png' },
    granby: { name: 'Ville de Granby', kind: 'Municipalité', file: 'ville-granby.svg' },
    crem: { name: 'CRE de la Montérégie', kind: 'Organisme environnemental', file: 'cre-monteregie.png' },
    maska: { name: 'Agri Conseils Maska', kind: 'Organisation agricole', file: 'agri-conseils-maska.png' },
    fusion: { name: 'Agri-Fusion', kind: 'Organisation agricole', file: 'agri-fusion.png' }
  };

  const partnerGroups = {
    home: {
      eyebrow: 'Ils nous font confiance',
      title: 'Des organisations qui font progresser la géomatique.',
      intro: 'Géomont accompagne des MRC, municipalités, organismes environnementaux et organisations agricoles dans la compréhension et la mise en valeur du territoire.',
      marks: [clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.granby, clientLogos.crem, clientLogos.maska, clientLogos.fusion]
    },
    mrc: {
      eyebrow: 'MRC clientes',
      title: 'Des collaborations régionales concrètes.',
      intro: 'Ces MRC font partie des organisations qui s’appuient sur des données territoriales, des cartes et des analyses pour mieux planifier et décider.',
      marks: [clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil]
    },
    municipalites: {
      eyebrow: 'Municipalités et partenaires régionaux',
      title: 'Des données utiles aux équipes municipales.',
      intro: 'Les mandats de géomatique municipale s’inscrivent dans un écosystème de villes et de MRC qui partagent les mêmes enjeux d’aménagement et de services aux citoyens.',
      marks: [clientLogos.granby, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.brome]
    },
    urbanistes: {
      eyebrow: 'Collaborations territoriales',
      title: 'Des données qui soutiennent les démarches d’urbanisme.',
      intro: 'En attendant l’ajout de logos de firmes d’urbanisme clientes, ce bandeau présente les organisations clientes les plus proches de ces mandats.',
      marks: [clientLogos.granby, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.brome]
    },
    promoteurs: {
      eyebrow: 'Collaborations territoriales',
      title: 'La préanalyse de terrain, appuyée par des données fiables.',
      intro: 'Ces organisations clientes illustrent le contexte territorial dans lequel des données géospatiales solides accélèrent l’analyse de contraintes et d’occasions.',
      marks: [clientLogos.granby, clientLogos.brome, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil]
    },
    arpenteurs: {
      eyebrow: 'Collaborations territoriales',
      title: 'Une base de données utile aux relevés et aux dossiers fonciers.',
      intro: 'En attendant l’ajout de logos de cabinets d’arpenteurs-géomètres clients, ce bandeau présente les organisations clientes qui évoluent dans les mêmes territoires.',
      marks: [clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite, clientLogos.granby]
    },
    genie: {
      eyebrow: 'Génie, environnement et territoire',
      title: 'Des repères concrets pour les études de terrain.',
      intro: 'Les données LiDAR, les orthophotos et les analyses thématiques relient les besoins des organisations environnementales, municipales et régionales.',
      marks: [clientLogos.crem, clientLogos.granby, clientLogos.brome, clientLogos.sources, clientLogos.roussillon]
    },
    agriculture: {
      eyebrow: 'Agriculture et agroenvironnement',
      title: 'Des données pour mieux comprendre les sols et les parcelles.',
      intro: 'En attendant l’ajout de logos de producteurs agricoles clients, ce bandeau présente les organisations les plus proches de l’écosystème agricole de Géomont.',
      marks: [clientLogos.maska, clientLogos.fusion, clientLogos.vaudreuil, clientLogos.brome, clientLogos.crem]
    },
    reseaux: {
      eyebrow: 'Infrastructures et territoires',
      title: 'Des données cohérentes pour les actifs et les corridors.',
      intro: 'Les organisations clientes ci-dessous illustrent le contexte municipal et régional dans lequel la qualité des données facilite la gestion des réseaux.',
      marks: [clientLogos.granby, clientLogos.roussillon, clientLogos.marguerite, clientLogos.vaudreuil, clientLogos.brome]
    },
    obnl: {
      eyebrow: 'Milieux naturels et environnement',
      title: 'Des données au service de la protection du territoire.',
      intro: 'Les cartes et analyses de Géomont aident les organisations environnementales, les MRC et les municipalités à communiquer et à agir sur des enjeux concrets.',
      marks: [clientLogos.crem, clientLogos.brome, clientLogos.sources, clientLogos.roussillon, clientLogos.marguerite]
    }
  };

  function buildPartnerBand(group) {
    const section = document.createElement('section');
    section.className = 'partner-band';
    section.setAttribute('aria-label', 'Logos des organisations partenaires');
    const logoItems = group.marks.map(function (mark) {
      return '<div class="partner-logo"><img src="/assets/logos/' + mark.file + '" alt="' + mark.name + '" loading="eager" decoding="async"></div>';
    }).join('');
    section.innerHTML = [
      '<div class="shell">',
        '<div class="partner-marquee" role="region" aria-label="Logos des organisations partenaires" tabindex="0">',
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
        output.textContent = 'Aperçu seulement : aucune information n’a été transmise. Le site final acheminera cette demande à la bonne personne.';
      }
    });
  });

  const consent = document.querySelector('[data-consent]');
  if (consent && sessionStorage.getItem('geomont-consent-preview') === 'accepted') consent.hidden = true;
  document.querySelectorAll('[data-consent-accept]').forEach(function (button) {
    button.addEventListener('click', function () {
      sessionStorage.setItem('geomont-consent-preview', 'accepted');
      if (consent) consent.hidden = true;
    });
  });
  document.querySelectorAll('[data-consent-options]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (consent) {
        consent.innerHTML = '<strong>Préférences de confidentialité</strong><p>La version finale offrira des choix séparés pour les témoins nécessaires, de mesure d’audience et de marketing.</p><div class="consent-actions"><button class="button primary" type="button" data-consent-accept>Fermer</button></div>';
        consent.querySelector('[data-consent-accept]').addEventListener('click', function () { consent.hidden = true; });
      }
    });
  });
}());
