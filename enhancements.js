/* CODING LAB · Preferenze visuali v1.1 - indipendenti dall'archivio didattico */
(() => {
  'use strict';
  const KEY = 'coding-lab-appearance-v1';
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const sun = '<svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
  const moon = '<svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
  const infoIcon = '<svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/></svg>';
  let theme = 'light';
  try { theme = localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch {}
  let themeButton;

  function applyTheme(next) {
    theme = next === 'dark' ? 'dark' : 'light';
    root.classList.toggle('coding-dark', theme === 'dark');
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#191624' : '#7353ae');
    if (themeButton) {
      const dark = theme === 'dark';
      themeButton.innerHTML = dark ? sun : moon;
      themeButton.setAttribute('aria-label', dark ? 'Attiva il tema giorno' : 'Attiva il tema notte');
      themeButton.setAttribute('title', dark ? 'Tema giorno' : 'Tema notte');
      themeButton.setAttribute('aria-pressed', String(dark));
    }
    try { localStorage.setItem(KEY, theme); } catch {}
  }
  applyTheme(theme);

  function createInfo() {
    if (document.getElementById('coding-about-dialog')) return document.getElementById('coding-about-dialog');
    const dialog = document.createElement('dialog');
    dialog.id = 'coding-about-dialog';
    dialog.className = 'coding-about-dialog';
    dialog.setAttribute('aria-labelledby', 'coding-about-title');
    dialog.innerHTML = `
      <div class="coding-about-header">
        <div><span class="coding-about-kicker">IL TUO LABORATORIO SCRATCH</span><h2 id="coding-about-title">CODING LAB</h2><p>Impara, costruisci, personalizza.</p></div>
        <button type="button" class="coding-about-close" aria-label="Chiudi informazioni" title="Chiudi">×</button>
      </div>
      <div class="coding-about-body">
        <p><strong>24 progetti Scratch</strong> per la scuola secondaria di primo grado, organizzati per percorsi e livelli di difficoltà. Una breve guida iniziale lascia spazio alla sperimentazione e alle idee personali.</p>
        <section><h3>Come si usa</h3>
          <p><strong>Alunno:</strong> scegli un progetto, segui le istruzioni passo passo, spunta la checklist e prova a inventare una variante.</p>
          <p><strong>Docente:</strong> consulta le schede, adatta gli obiettivi, assegna progetti e gestisci revisioni e feedback.</p>
        </section>
        <section><h3>Salvataggio e dispositivi</h3>
          <p>Le schede si salvano sul dispositivo oppure nell'archivio cloud configurato dal docente. In <strong>Dati</strong> trovi connessione, esportazione e ripristino dei backup. L'app può essere installata e consultata anche offline, usando i dati già disponibili.</p>
        </section>
        <section><h3>Aspetto</h3>
          <p>Usa il pulsante sole/luna nella barra superiore per passare tra giorno e notte. La preferenza resta memorizzata sul dispositivo.</p>
        </section>
        <div class="coding-about-links">
          <a href="https://scratch.mit.edu/" target="_blank" rel="noopener noreferrer">Apri Scratch ↗</a>
          <a href="https://github.com/flavionaretti-commits/coding" target="_blank" rel="noopener noreferrer">Repository CODING ↗</a>
        </div>
        <p class="coding-about-credit">Progetto didattico indipendente realizzato per sperimentare e imparare con Scratch. Scratch è sviluppato dalla Scratch Foundation ed è disponibile gratuitamente. CODING LAB non è un prodotto ufficiale Scratch.</p>
      </div>`;
    const close = () => dialog.close();
    dialog.querySelector('.coding-about-close').addEventListener('click', close);
    dialog.addEventListener('click', e => {
      if (e.target === dialog) close();
    });
    document.body.appendChild(dialog);
    return dialog;
  }

  function mount() {
    const top = document.querySelector('.topbar .top-actions');
    if (!top) return false;
    if (document.getElementById('coding-theme-toggle')) return true;
    const controls = document.createElement('div');
    controls.className = 'coding-quick-controls';
    themeButton = document.createElement('button');
    themeButton.type = 'button';
    themeButton.id = 'coding-theme-toggle';
    themeButton.className = 'coding-quick-button';
    themeButton.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
    const infoButton = document.createElement('button');
    infoButton.type = 'button';
    infoButton.className = 'coding-quick-button coding-info-button';
    infoButton.id = 'coding-info-toggle';
    infoButton.setAttribute('aria-label', 'Informazioni su CODING LAB');
    infoButton.setAttribute('title', 'Informazioni');
    infoButton.innerHTML = infoIcon;
    infoButton.addEventListener('click', () => {
      const dialog = createInfo();
      if (!dialog.open) dialog.showModal();
    });
    controls.append(themeButton, infoButton);
    // Prima dell'avatar: pulsanti sempre raggiungibili e raggruppati nella barra.
    const avatar = top.querySelector('.avatar');
    top.insertBefore(controls, avatar || null);
    applyTheme(theme);
    return true;
  }
  if (!mount()) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(document.getElementById('root') || document.body, {childList:true, subtree:true});
    document.addEventListener('DOMContentLoaded', () => { if (mount()) observer.disconnect(); }, {once:true});
  }
})();
