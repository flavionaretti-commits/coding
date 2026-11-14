# CODING LAB · Scratch

Webapp/PWA in italiano per catalogare, assegnare e riutilizzare 24 progetti Scratch nella scuola secondaria di primo grado. Versione autonoma per GitHub Pages, derivata dall’app Sites originale.

## Apri l’app

Dopo l’attivazione di GitHub Pages: **https://flavionaretti-commits.github.io/coding/**.

I file pronti all’uso sono già nella radice: `index.html`, `assets/`, `icons/`, `manifest.webmanifest`, `service-worker.js` e `.nojekyll`. Non serve compilare per pubblicare questa versione.

Se Pages non è attivo: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Attendere il completamento della pubblicazione prima di aprire il collegamento. GitHub Pages deve essere abilitato dal proprietario della repository.

## Funzioni

- 24 progetti, sei percorsi tematici, quattro livelli e spazio per nuove schede.
- Schede modificabili con obiettivi, concetti, prerequisiti, istruzioni progressive, materiali, tempi, personalizzazioni, estensioni, errori frequenti e criteri descrittivi.
- Vista alunno con checklist e riflessione; vista docente con note, tracce di soluzione e revisione.
- Ricerca, filtri combinati, preferiti, duplicazione indipendente, archiviazione e ripristino di revisioni.
- Assegnazioni a classi o gruppi e raccolta dei feedback.
- Backup completo JSON, importazione del formato precedente Sites e annullamento dell’ultima importazione.
- Layout adattivo, stampa delle schede e pulsante Proietta.
- Installazione come PWA e consultazione offline dopo il primo caricamento completo.


## Aspetto e leggibilità

La barra superiore include **giorno/notte** (preferenza salvata nel browser) e **informazioni**. Il foglio `enhancements.css` aumenta la dimensione dei testi piccoli e contiene il tema scuro e le regole responsive; `enhancements.js` gestisce i due pulsanti e la finestra informativa. Entrambi vengono caricati dopo il bundle originale, precache dal service worker e copiati anche in `dist/` dai successivi `npm run build`. Questa funzionalità non modifica l'archivio locale o cloud.

## Dove rimangono i dati

**Modalità iniziale: questo dispositivo.** Schede, revisioni e checklist sono salvate in IndexedDB, nel browser. Non vengono pubblicate nella repository. La stessa app aperta su un altro dispositivo inizia da un archivio separato. Usare **Dati → Esporta / Importa** per trasferirlo.

**Modalità cloud facoltativa:** il codice pronto per Google Apps Script è in [`cloud/Code.gs`](cloud/Code.gs). L’archivio viene conservato in un file JSON nel proprio Google Drive. La distribuzione dello script e il collegamento nell’app richiedono la configurazione descritta in [`cloud/README.md`](cloud/README.md); non sono attivi automaticamente. Locale e cloud rimangono archivi distinti e si possono trasferire tramite backup.

Non sono stati copiati dati personali o attività dal database del Site pubblico/privato originale. L’app parte dalle 24 schede originali nel codice sorgente. La versione Sites continua a esistere separatamente.

Le viste alunno/docente locali sono modalità didattiche, non account separati. I materiali standard, incluse le tracce delle soluzioni nel sorgente, fanno parte di questa repository pubblica. In modalità cloud la chiave docente autorizza le modifiche condivise; i codici alunno identificano percorsi e non sono password.

## Installazione

**iPad/iPhone:** aprire il collegamento in Safari → Condividi → Aggiungi alla schermata Home.

**Computer/Android:** usare il comando Installa del browser, quando disponibile. L’app segnala gli aggiornamenti; l’aggiornamento conserva l’archivio locale. Per lavorare con l’editor Scratch resta necessario aprire Scratch, online oppure con l’app Scratch installata.

## Sviluppo

```sh
npm ci
npm run typecheck
npm run build
npm test
```

Il comando build aggiorna i file pronti nella radice, la copia `dist/` per l’anteprima e il backend `cloud/Code.gs`. Gli asset hanno nomi basati sul contenuto; il service worker mantiene cache separate per il percorso della PWA.

- `src/data.ts`: 24 schede iniziali; sei riprendono i materiali operativi di livello 1, diciotto sono guide proposte da sperimentare.
- `src/lab.tsx`, `src/art.tsx`, `src/style.css`: interfaccia e illustrazioni originali.
- `src/state.ts`: motore condiviso locale/cloud, convalida, revisioni, importazione e backup.
- `src/storage.ts`: transazioni IndexedDB e collegamento cloud.
- `cloud/server-template.gs`: adattatore Apps Script; `cloud/Code.gs` è generato con dati e motore inclusi.
- `tests/engine.test.mjs`: verifiche del motore, del backend Apps Script simulato e dei file PWA.

I test del backend verificano il codice con servizi Google simulati; la distribuzione Apps Script va poi verificata con l’account Google che la ospiterà. Non sono inclusi credenziali, token o chiavi reali.
