# EsameWeb3-Manucci
# Looply — Progetto esame Web 3

Looply è una web application sviluppata come progetto finale per il corso **Web 3**. L'applicazione implementa un piccolo social network universitario partendo dallo starter Angular fornito dal docente in `Progetto/web3-unibook-starter-main` e completando i requisiti funzionali descritti in `requisiti.md`.

Il codice dell'applicazione si trova in:

```text
Progetto/web3-unibook-starter-main/
```

## Obiettivo del progetto

L'obiettivo è realizzare un client social completo, collegato al backend Supabase già predisposto dallo starter, in cui un utente possa:

- registrarsi, autenticarsi e mantenere la sessione;
- consultare e aggiornare il proprio profilo;
- cercare altri utenti e visitarne il profilo pubblico;
- seguire o smettere di seguire altri utenti;
- pubblicare post testuali con immagine opzionale;
- visualizzare feed e profili con post ordinati dal più recente al meno recente;
- mettere e togliere like;
- eliminare i propri post;
- caricare immagini per avatar e post.

## Tecnologie utilizzate

- **Angular 21** con componenti standalone e lazy loading delle pagine protette.
- **TypeScript** in modalità strict.
- **Angular Signals** per stato locale, stato derivato e gestione dei dati di UI.
- **Angular Material** come libreria di componenti grafici.
- **RxJS** per la comunicazione HTTP e la gestione delle risposte asincrone.
- **Supabase Edge Functions** come backend remoto, tramite gli endpoint già indicati nello starter.
- **Vitest**, **Angular Testing Utilities** e **axe-core** per test funzionali e controlli di accessibilità.

## Funzionalità implementate

### Autenticazione e sessione

- Registrazione con nome, cognome, email, password e data di nascita.
- Login tramite email e password.
- Salvataggio della sessione in `localStorage`.
- Interceptor HTTP che aggiunge `apikey` e `Authorization: Bearer <token>` alle richieste protette.
- Route guard per impedire l'accesso alle pagine protette senza sessione valida.
- Logout con pulizia della sessione locale e redirect al login.
- Refresh automatico del token dopo risposte `401`, con logout automatico se il refresh fallisce.

### Profili utente

- Pagina profilo personale con dati anagrafici, email, bio, avatar, conteggio follower e seguiti.
- Pagina di modifica profilo per aggiornare bio e foto profilo, lasciando invariati nome, cognome e data di nascita.
- Upload dell'avatar tramite endpoint dedicato, con validazione del tipo file e della dimensione massima.
- Dialog fullscreen per visualizzare l'immagine profilo.
- Pagina profilo pubblico con informazioni dell'utente, stato follow e post pubblicati.

### Ricerca e following

- Ricerca utenti per nome o cognome.
- Risultati con avatar, nome completo e link al profilo pubblico.
- Follow e unfollow dal profilo pubblico.
- Aggiornamento immediato del numero di follower e del conteggio dei seguiti dell'utente corrente.
- Gestione dello stato corrente: utente già seguito/non seguito.

### Post, feed e like

- Creazione di post con testo obbligatorio, limite massimo di 500 caratteri e immagine opzionale.
- Upload dell'immagine del post tramite endpoint media dedicato.
- Feed personale con i post propri e degli utenti seguiti.
- Ordinamento dei post in ordine cronologico inverso.
- Card riutilizzabile per mostrare autore, avatar, testo, immagine, data di pubblicazione, numero di like e stato del like.
- Like e unlike sui post.
- Eliminazione dei propri post con dialog di conferma.
- Gestione di stati di caricamento, errore, vuoto e azioni in corso.

### Interfaccia e accessibilità

- Layout autenticato responsive con toolbar desktop e menu mobile.
- Layout pubblico per login e registrazione.
- Componenti Angular Material per bottoni, input, card, icone e dialog.
- Stati `loading`, `empty` ed `error` mostrati esplicitamente all'utente.
- Attributi ARIA su navigazione, menu mobile, messaggi di stato, form e dialog.
- Test axe-core sulle schermate principali per verificare l'assenza di violazioni di accessibilità rilevabili in ambiente jsdom.

## Corrispondenza con i requisiti del docente

| Area | Requisiti | Stato |
| --- | --- | --- |
| Autenticazione e account | RF-01 → RF-07 | Implementati, incluso refresh token opzionale. |
| Profilo utente | RF-08 → RF-13 | Implementati: profilo personale, modifica bio/avatar, profili pubblici e ricerca utenti. |
| Following | RF-14 → RF-16 | Implementati: follow, unfollow e stato follow sul profilo pubblico. |
| Post | RF-17 → RF-20 | Implementati: creazione, immagine opzionale, cancellazione, ordinamento e visualizzazione dati post. |
| Like | RF-21 → RF-23 | Implementati: like/unlike, conteggio totale e stato like corrente. |
| Feed | RF-24 → RF-25 | Implementati: feed personale con post propri e degli utenti seguiti. |
| UI library richiesta dallo starter | Libreria componenti | Implementata con Angular Material. |
| Upload immagini richiesto dallo starter | Avatar e post | Implementato tramite `MediaApiService`. |

## Struttura principale del progetto

```text
Progetto/web3-unibook-starter-main/
├── src/app/core/                 # Configurazione API, servizi HTTP, auth, guard e interceptor
├── src/app/layouts/              # Layout pubblico e layout autenticato
├── src/app/pages/                # Pagine applicative: home, profili, ricerca, login, registrazione, creazione post
├── src/app/shared/               # Componenti condivisi: post card e dialog immagine profilo
├── src/app/accessibility.spec.ts # Test di accessibilità con axe-core
├── src/app/social-behavior.spec.ts # Test dei comportamenti social principali
├── requisiti.md                  # Requisiti funzionali del progetto
└── README.md                     # README dello starter e indicazioni del docente
```

## Pagine e rotte principali

| Rotta | Descrizione |
| --- | --- |
| `/login` | Login utente. |
| `/register` | Registrazione nuovo account. |
| `/home` | Feed personale. |
| `/posts/new` | Creazione di un nuovo post. |
| `/profile` | Profilo personale dell'utente autenticato. |
| `/profile/edit` | Modifica bio e avatar. |
| `/users/search` | Ricerca utenti. |
| `/users/:id` | Profilo pubblico di un altro utente. |

Le rotte applicative protette sono caricate tramite lazy loading e sono accessibili solo con sessione valida.

## Installazione e avvio

Dalla root del repository:

```bash
cd Progetto/web3-unibook-starter-main
npm install
npm start
```

L'applicazione sarà disponibile all'indirizzo:

```text
http://localhost:4200/
```

## Script disponibili

Eseguire i comandi dalla cartella `Progetto/web3-unibook-starter-main`.

```bash
npm start
```

Avvia il server di sviluppo Angular.

```bash
npm run build
```

Compila il progetto.

```bash
npm run lint
```

Esegue ESLint sul codice TypeScript e sui template Angular.

```bash
npm test
```

Esegue la suite di test con Vitest.

## Note sul backend

Lo starter del docente include già la configurazione verso il backend remoto Supabase. Il client usa gli endpoint per:

- autenticazione e refresh sessione;
- gestione utenti e profili;
- ricerca utenti;
- follow/unfollow;
- CRUD dei post;
- like/unlike;
- feed;
- upload media.

La configurazione dell'URL base e dell'`apikey` è presente nei file di environment del progetto Angular.

## Qualità del codice

Durante lo sviluppo sono stati seguiti i pattern suggeriti dallo starter:

- servizi API tipizzati separati dalla logica di presentazione;
- servizi di stato e signals per le schermate con caricamento dati;
- `computed()` per stati derivati come liste vuote, ownership del post e link del profilo autore;
- componenti standalone piccoli e riutilizzabili;
- route protette tramite guard;
- form con validazioni dichiarative;
- gestione esplicita di errori e azioni asincrone;
- controlli di accessibilità automatizzati sulle schermate principali.

## Autore

Progetto realizzato da **Alessandro Manucci** mat. 366193 per l'esame di Laboratorio di Programmazione Web 3.
