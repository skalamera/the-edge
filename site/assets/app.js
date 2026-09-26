(() => {
  const root = document.body.dataset.root || '';
  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(`edge.${key}`);
        return v == null ? fallback : JSON.parse(v);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`edge.${key}`, JSON.stringify(value));
      } catch {}
    },
  };

  // Theme toggle
  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    const current =
      document.documentElement.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('edge.theme', next);
    } catch {}
  });

  // Header hairline + reading progress
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.progress span');
  const article = document.querySelector('.chapter, .update');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 8);
    if (bar && article) {
      const rect = article.getBoundingClientRect();
      const total = rect.height - innerHeight;
      const pct = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.style.width = `${pct * 100}%`;
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Chapter: track last read, finish button, active TOC item
  const chapter = document.querySelector('.chapter');
  const read = store.get('read', {});
  if (chapter) {
    const slug = chapter.dataset.slug;
    store.set('last', slug);
    const btn = document.querySelector('.finish');
    const paint = () => {
      const done = !!store.get('read', {})[slug];
      btn?.classList.toggle('done', done);
      if (btn) btn.querySelector('span').textContent = done ? 'Finished' : 'Mark chapter as finished';
    };
    btn?.addEventListener('click', () => {
      const r = store.get('read', {});
      r[slug] ? delete r[slug] : (r[slug] = Date.now());
      store.set('read', r);
      paint();
    });
    paint();

    const links = [...document.querySelectorAll('.chapter-toc a')];
    const heads = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if (heads.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
            }
          }
        },
        { rootMargin: '-20% 0px -70% 0px' },
      );
      heads.forEach((h) => io.observe(h));
    }
  }

  // Home: continue reading + progress
  const cont = document.querySelector('[data-continue]');
  if (cont) {
    const tocLinks = [...document.querySelectorAll('.toc-list a[data-slug]')];
    tocLinks.forEach((a) => a.classList.toggle('done', !!read[a.dataset.slug]));
    const last = store.get('last', null);
    const doneCount = Object.keys(read).length;
    if (last || doneCount) {
      const next = tocLinks.find((a) => !read[a.dataset.slug]) || tocLinks.find((a) => a.dataset.slug === last);
      if (next) {
        cont.href = next.getAttribute('href');
        cont.querySelector('span').textContent = doneCount ? 'Continue reading' : 'Pick up where you left off';
      }
      const rp = document.querySelector('.reading-progress');
      if (rp) {
        const total = Number(rp.dataset.total) || tocLinks.length;
        rp.hidden = false;
        rp.querySelector('.rp-bar span').style.width = `${(doneCount / total) * 100}%`;
        rp.querySelector('.rp-text').textContent = `${doneCount} of ${total} chapters finished`;
      }
    }
  }

  // Copy buttons on code blocks (prompts)
  document.querySelectorAll('.prose pre').forEach((pre) => {
    const b = document.createElement('button');
    b.className = 'copy-btn';
    b.type = 'button';
    b.textContent = 'Copy';
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector('code')?.innerText ?? pre.innerText);
        b.textContent = 'Copied';
        setTimeout(() => (b.textContent = 'Copy'), 1500);
      } catch {}
    });
    pre.appendChild(b);
  });

  // Glossary popovers
  const dataEl = document.getElementById('term-data');
  if (dataEl) {
    const terms = JSON.parse(dataEl.textContent);
    const pop = document.createElement('div');
    pop.className = 'term-pop';
    pop.setAttribute('role', 'tooltip');
    document.body.appendChild(pop);
    let current = null;
    let hideTimer;
    const show = (a) => {
      const t = terms[a.dataset.term];
      if (!t) return;
      clearTimeout(hideTimer);
      current = a;
      pop.innerHTML = '';
      const s = document.createElement('strong');
      s.textContent = t.term;
      const p = document.createElement('div');
      p.textContent = t.short;
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = 'Full entry →';
      pop.append(s, p, link);
      const r = a.getBoundingClientRect();
      const w = pop.offsetWidth || 320;
      const left = Math.min(Math.max(16, r.left + scrollX + r.width / 2 - w / 2), scrollX + innerWidth - w - 16);
      pop.style.left = `${left}px`;
      pop.style.top = `${r.bottom + scrollY + 10}px`;
      pop.classList.add('show');
    };
    const hide = () => {
      hideTimer = setTimeout(() => {
        pop.classList.remove('show');
        current = null;
      }, 120);
    };
    const hoverable = matchMedia('(hover: hover)').matches;
    document.querySelectorAll('a.term').forEach((a) => {
      if (hoverable) {
        a.addEventListener('mouseenter', () => show(a));
        a.addEventListener('mouseleave', hide);
        a.addEventListener('focus', () => show(a));
        a.addEventListener('blur', hide);
      } else {
        a.addEventListener('click', (e) => {
          if (current !== a) {
            e.preventDefault();
            show(a);
          }
        });
      }
    });
    pop.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    pop.addEventListener('mouseleave', hide);
    document.addEventListener('click', (e) => {
      if (current && !pop.contains(e.target) && !e.target.closest('a.term')) {
        pop.classList.remove('show');
        current = null;
      }
    });
  }

  // Filterable lists (glossary, players)
  const list = document.querySelector('.gloss-list, .page-players .prose-wide');
  if (list) {
    const items = [...document.querySelectorAll('.gloss, .player')];
    const search = document.querySelector('.search');
    const buttons = [...document.querySelectorAll('.chip-btn, .layer-btn')];
    const empty = document.querySelector('.empty');
    let filter = 'all';
    const apply = () => {
      const q = (search?.value || '').trim().toLowerCase();
      let shown = 0;
      for (const el of items) {
        const cat = el.dataset.category || el.dataset.layer;
        const ok = (filter === 'all' || cat === filter) && (!q || el.dataset.search.includes(q));
        el.hidden = !ok;
        if (ok) shown++;
      }
      document.querySelectorAll('.letter-group, .player-group').forEach((g) => {
        g.hidden = ![...g.querySelectorAll('.gloss, .player')].some((el) => !el.hidden);
      });
      const letters = document.querySelector('.letters');
      if (letters) letters.hidden = !!q || filter !== 'all';
      if (empty) empty.hidden = shown > 0;
    };
    search?.addEventListener('input', apply);
    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        filter = b.dataset.filter;
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        apply();
      }),
    );
    const flash = () => {
      const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el && el.matches('.gloss, .player')) {
        if (el.hidden) {
          filter = 'all';
          if (search) search.value = '';
          buttons.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.filter === 'all')));
          apply();
          el.scrollIntoView();
        }
        el.classList.remove('flash');
        void el.offsetWidth;
        el.classList.add('flash');
      }
    };
    addEventListener('hashchange', flash);
    flash();
  }

  // Offline support
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register(`${root}sw.js`).catch(() => {});
  }
})();
