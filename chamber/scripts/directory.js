(() => {
  'use strict';

  // --- State ---
  const state = {
    members: [],
    filtered: [],
    layout: 'grid'
  };

  // --- DOM refs with guards ---
  const container = document.getElementById('directory-container');
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');
  const searchInput = document.getElementById('member-search');

  // --- Utilities ---
  const escapeHTML = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  const getBadgeClass = (level) => {
    const normalized = (level || '').toLowerCase();
    if (normalized === 'gold') return 'membership-gold';
    if (normalized === 'silver') return 'membership-silver';
    return 'membership-bronze';
  };

  const getBadgeLabel = (level) => {
    const normalized = (level || '').toLowerCase();
    if (normalized === 'gold') return 'Gold Member';
    if (normalized === 'silver') return 'Silver Member';
    return 'Bronze Member';
  };

  const formatLastModified = () => {
    if (!document.lastModified) return 'Unknown';
    return new Date(document.lastModified).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // --- Data Layer ---
  async function loadMembers() {
    try {
      const response = await fetch('./members.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      state.members = (data.members || []).map(normalizeMember);
      applyFilter();
    } catch (error) {
      console.error('Directory load failed:', error);
      if (container) {
        container.innerHTML = `<p class="loading-text">Error loading directory. Please try again later.</p>`;
      }
    }
  }

  function normalizeMember(member) {
    return {
      name: member.name || 'Unknown Business',
      address: member.address || 'Address not provided',
      phone: member.phone || 'Phone not provided',
      website: member.website || '#',
      logo: member.logo || '',
      membershipLevel: member.membershipLevel || 'Bronze'
    };
  }

  // --- Rendering ---
  function applyFilter() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    state.query = query;
    if (!query) {
      state.filtered = [...state.members];
    } else {
      state.filtered = state.members.filter((m) =>
        m.name.toLowerCase().includes(query) ||
        m.address.toLowerCase().includes(query) ||
        m.membershipLevel.toLowerCase().includes(query)
      );
    }
    render();
  }

  function render() {
    if (!container) return;
    container.innerHTML = '';

    if (state.filtered.length === 0) {
      container.innerHTML = `<p class="loading-text">No members found.</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    state.filtered.forEach((member) => {
      const card = document.createElement('article');
      card.className = 'business-card';

      const badgeClass = getBadgeClass(member.membershipLevel);
      const badgeLabel = getBadgeLabel(member.membershipLevel);
      const safeName = escapeHTML(member.name);
      const safeAddress = escapeHTML(member.address);
      const safePhone = escapeHTML(member.phone);
      const safeWebsite = escapeHTML(member.website.replace(/^https?:\/\//, ''));
      const websiteHref = escapeHTML(member.website);
      const nameId = `member-name-${member.name.replace(/\s+/g, '-').toLowerCase()}`;

      card.innerHTML = `
        <div class="card-header">
          <h3 id="${nameId}">${safeName}</h3>
          <span class="membership-badge ${badgeClass}" aria-label="${badgeLabel}">${badgeLabel}</span>
        </div>
        <div class="card-content">
          <img
            src="${escapeHTML(member.logo)}"
            alt="${safeName} logo"
            class="card-logo"
            loading="lazy"
            onerror="this.src='images/placeholder.svg'; this.alt='Placeholder logo';"
          >
          <div class="card-details">
            <p><strong>ADDRESS:</strong> ${safeAddress}</p>
            <p><strong>PHONE:</strong> ${safePhone}</p>
            <p>
              <strong>URL:</strong>
              <a href="${websiteHref}" target="_blank" rel="noopener noreferrer">
                ${safeWebsite}
                <span class="visually-hidden">(opens in new tab)</span>
              </a>
            </p>
          </div>
        </div>
      `;

      card.setAttribute('aria-labelledby', nameId);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  }

  // --- Events ---
  function setLayout(layout) {
    state.layout = layout;
    if (layout === 'grid') {
      container.classList.add('grid-layout');
      container.classList.remove('list-layout');
      gridBtn.classList.add('active-toggle');
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.classList.remove('active-toggle');
      listBtn.setAttribute('aria-pressed', 'false');
    } else {
      container.classList.add('list-layout');
      container.classList.remove('grid-layout');
      listBtn.classList.add('active-toggle');
      listBtn.setAttribute('aria-pressed', 'true');
      gridBtn.classList.remove('active-toggle');
      gridBtn.setAttribute('aria-pressed', 'false');
    }
    render();
  }

  if (gridBtn) gridBtn.addEventListener('click', () => setLayout('grid'));
  if (listBtn) listBtn.addEventListener('click', () => setLayout('list'));

  let debounceTimer;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => applyFilter(), 200);
    });
  }

  // --- Footer metadata (guarded) ---
  try {
    const yearEl = document.getElementById('current-year');
    const modEl = document.getElementById('last-modified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = formatLastModified();
  } catch (e) {
    console.warn('Footer metadata injection failed:', e);
  }

  // --- Init: data fetch happens FIRST ---
  loadMembers();
})();
