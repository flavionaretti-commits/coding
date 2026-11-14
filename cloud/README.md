# Cloud facoltativo · lo stesso archivio su più dispositivi

La PWA funziona già in locale. Per condividere modifiche, assegnazioni e checklist fra PC e iPad occorre distribuire questo backend nel proprio account Google. Non è collegato né attivato automaticamente.

## Configurazione una tantum

1. Apri [Google Apps Script](https://script.google.com/) e crea un progetto denominato **CODING LAB**.
2. Apri il file [`Code.gs`](Code.gs) di questa cartella, usa **Raw** per copiare tutto il codice e incollalo nell’editor, sostituendo il contenuto iniziale. Il file contiene già le 24 schede: non servono file aggiuntivi.
3. Salva. Dal menu delle funzioni scegli **inizializzaCodingLab** ed eseguila con il tuo account. Autorizza gli accessi necessari al file archivio nel tuo Drive.
4. Nel log di esecuzione trovi la **chiave docente** generata. Conservala: non caricarla su GitHub e non inserirla nei link agli alunni. Lo script crea un file `CODING_LAB_ARCHIVIO.json` nel tuo Drive.
5. Scegli **Distribuisci → Nuova distribuzione → App web**. Imposta l’esecuzione come **te stesso** e l’accesso **Chiunque**. Questa disponibilità può essere limitata dall’amministratore del tuo account scolastico.
6. Copia l’indirizzo della distribuzione che termina in **/exec**.
7. Nella PWA apri **Dati**, inserisci indirizzo e chiave docente, quindi **Prova e collega**.
8. Sul secondo dispositivo inserisci gli stessi dati. Per gli alunni usa il collegamento senza chiave creato con **Copia il collegamento per gli alunni**.

Una chiave docente errata viene rifiutata. Se il browser non riceve JSON, verificare l’indirizzo `/exec`, le impostazioni di accesso e l’effettiva distribuzione della versione aggiornata dello script.

## Spostare il lavoro già fatto

Prima di collegare il cloud, esporta l’archivio locale. Dopo il collegamento, importa il backup nel cloud. L’importazione sostituisce l’archivio di destinazione e ne conserva la versione precedente per il comando **Annulla l’ultima importazione**.

Il backup della vecchia app Sites è riconosciuto. Quel formato non includeva lo storico completo: la PWA ricostruisce uno snapshot delle schede presenti nel file. I nuovi backup della PWA includono invece tutte le revisioni.

## Cosa viene condiviso

Il docente con chiave può modificare il catalogo, gestire assegnazioni e feedback e consultare i percorsi. Gli alunni senza chiave possono leggere il catalogo, salvare checklist/preferiti con il proprio codice e inviare feedback. Il servizio verifica le autorizzazioni anche lato server.

I codici alunno identificano il percorso: usare codici personali concordati, senza dati anagrafici. Le tracce di soluzione standard sono anche nel sorgente pubblico della PWA, quindi il selettore delle viste non è un sistema per tenere segreto quel materiale.

La chiave è conservata nelle proprietà private dello script e nel browser in cui viene inserita. Non viene inclusa nei backup o nei collegamenti per gli alunni. Il file archivio rimane nel Drive del proprietario; l’app web serve i contenuti previsti dalla sua API senza rendere pubblico il file Drive.

## Aggiornare lo script

Dopo le modifiche a `Code.gs`: **Distribuisci → Gestisci distribuzioni → Modifica → Nuova versione**. Mantenendo la stessa distribuzione l’indirizzo `/exec` resta utilizzabile dai dispositivi già collegati. Non rieseguire configurazioni che eliminano il file archivio.

## Riferimenti

- [Web app Apps Script](https://developers.google.com/apps-script/guides/web)
- [Servizio Content e risposte JSON](https://developers.google.com/apps-script/guides/content)
