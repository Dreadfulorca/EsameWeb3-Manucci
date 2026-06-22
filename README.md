# Looply — Progetto esame Web 3

Looply è una web application sviluppata come progetto finale per il corso **Web 3**. L'applicazione implementa un piccolo social network universitario partendo dallo starter Angular fornito dal docente in `Progetto/web3-unibook-starter-main` e completando i requisiti funzionali descritti in `requisiti.md`.

Nel repository sono presenti più esercitazioni/progetti. Il social network completo si trova in:

```text
Progetto/web3-unibook-starter-main/
```

La cartella `rubricaContatti/` contiene invece un progetto separato realizzato con Vite/TypeScript. Per questo i comandi di avvio sono diversi: ogni cartella ha il proprio `package.json` e quindi i propri script npm.

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

## Funzionalità implementate con riferimenti al codice

### 1. Libreria UI e layout principale

- Adozione di **Angular Material** come libreria UI: il progetto usa moduli Material per toolbar, bottoni, icone, input, card e dialog. Riferimenti principali: [`package.json`](Progetto/web3-unibook-starter-main/package.json), [`src/app/layouts/protected-layout/protected-layout.html`](Progetto/web3-unibook-starter-main/src/app/layouts/protected-layout/protected-layout.html), [`src/app/shared/post-card/post-card.ts`](Progetto/web3-unibook-starter-main/src/app/shared/post-card/post-card.ts).
- Layout protetto responsive con navigazione verso pubblicazione post, home, profilo, ricerca e logout. Su mobile è presente un menu apribile/chiudibile con attributi ARIA (`aria-expanded`, `aria-controls`) per migliorare l'accessibilità. Riferimenti: [`src/app/layouts/protected-layout/protected-layout.ts`](Progetto/web3-unibook-starter-main/src/app/layouts/protected-layout/protected-layout.ts), [`src/app/layouts/protected-layout/protected-layout.html`](Progetto/web3-unibook-starter-main/src/app/layouts/protected-layout/protected-layout.html), [`src/app/layouts/protected-layout/protected-layout.css`](Progetto/web3-unibook-starter-main/src/app/layouts/protected-layout/protected-layout.css).
- Layout separato per le pagine pubbliche di login e registrazione. Riferimenti: [`src/app/layouts/auth-layout/auth-layout.ts`](Progetto/web3-unibook-starter-main/src/app/layouts/auth-layout/auth-layout.ts), [`src/app/pages/login/login.ts`](Progetto/web3-unibook-starter-main/src/app/pages/login/login.ts), [`src/app/pages/register/register.ts`](Progetto/web3-unibook-starter-main/src/app/pages/register/register.ts).

### 2. Rotte, guard e lazy loading

- Rotte pubbliche per login e registrazione, protette da `publicOnlyChildGuard` per evitare l'accesso quando l'utente è già autenticato. Riferimenti: [`src/app/app.routes.ts`](Progetto/web3-unibook-starter-main/src/app/app.routes.ts), [`src/app/core/auth/auth.guard.ts`](Progetto/web3-unibook-starter-main/src/app/core/auth/auth.guard.ts).
- Rotte protette per feed, creazione post, profilo personale, modifica profilo, ricerca utenti e profili pubblici, protette da `authChildGuard`. Riferimenti: [`src/app/app.routes.ts`](Progetto/web3-unibook-starter-main/src/app/app.routes.ts), [`src/app/core/auth/auth.guard.ts`](Progetto/web3-unibook-starter-main/src/app/core/auth/auth.guard.ts).
- Lazy loading delle pagine principali tramite `loadComponent: () => import(...)`, così il caricamento iniziale resta più leggero e le schermate vengono caricate quando servono. Riferimento: [`src/app/app.routes.ts`](Progetto/web3-unibook-starter-main/src/app/app.routes.ts).

### 3. Autenticazione e gestione sessione

- Registrazione e login collegati al backend tramite `AuthService`, con persistenza della sessione in `localStorage`. Riferimenti: [`src/app/core/auth/auth.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/auth/auth.service.ts), [`src/app/pages/login/login.ts`](Progetto/web3-unibook-starter-main/src/app/pages/login/login.ts), [`src/app/pages/register/register.ts`](Progetto/web3-unibook-starter-main/src/app/pages/register/register.ts).
- Interceptor API che aggiunge automaticamente `apikey` e `Authorization: Bearer <token>` alle richieste verso il backend configurato. Riferimenti: [`src/app/core/http/api.interceptor.ts`](Progetto/web3-unibook-starter-main/src/app/core/http/api.interceptor.ts), [`src/app/core/config/app-api.config.ts`](Progetto/web3-unibook-starter-main/src/app/core/config/app-api.config.ts), [`src/environments/environment.ts`](Progetto/web3-unibook-starter-main/src/environments/environment.ts).
- Refresh automatico della sessione dopo risposte `401`, retry della richiesta originale e logout automatico se il refresh non riesce. Riferimenti: [`src/app/core/http/auth-refresh.interceptor.ts`](Progetto/web3-unibook-starter-main/src/app/core/http/auth-refresh.interceptor.ts), [`src/app/core/http/auth-refresh.interceptor.spec.ts`](Progetto/web3-unibook-starter-main/src/app/core/http/auth-refresh.interceptor.spec.ts).
- Logout con revoca del refresh token lato backend, pulizia dello stato locale e redirect alla pagina di login. Riferimento: [`src/app/core/auth/auth.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/auth/auth.service.ts).

### 4. Feed personale e stato reattivo

- Pagina home con feed personale composto dai post propri e da quelli degli utenti seguiti. Riferimenti: [`src/app/pages/home/home.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/home.ts), [`src/app/pages/home/home.html`](Progetto/web3-unibook-starter-main/src/app/pages/home/home.html), [`src/app/core/api/feed-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/feed-api.service.ts).
- `FeedService` centralizza lo stato del feed con Angular Signals: lista post, caricamento, errore, stato vuoto, post su cui è in corso un'azione e messaggi di errore sulle azioni. Riferimento: [`src/app/pages/home/feed.service.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/feed.service.ts).
- Ordinamento dei post in ordine cronologico inverso tramite utility condivisa. Riferimenti: [`src/app/core/api/models/post.utils.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/models/post.utils.ts), [`src/app/pages/home/feed.service.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/feed.service.ts).
- Aggiornamento manuale del feed con pulsante “Aggiorna” e gestione esplicita degli stati `loading`, `empty` ed `error`. Riferimenti: [`src/app/pages/home/home.html`](Progetto/web3-unibook-starter-main/src/app/pages/home/home.html), [`src/app/pages/home/feed.service.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/feed.service.ts).

### 5. Card dei post, like e cancellazione

- Componente riutilizzabile `PostCard` per mostrare autore, link al profilo, testo, immagine opzionale, data formattata, conteggio like e stato like corrente. Riferimenti: [`src/app/shared/post-card/post-card.ts`](Progetto/web3-unibook-starter-main/src/app/shared/post-card/post-card.ts), [`src/app/shared/post-card/post-card.html`](Progetto/web3-unibook-starter-main/src/app/shared/post-card/post-card.html), [`src/app/core/api/models/post.types.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/models/post.types.ts).
- Il pulsante di eliminazione è disponibile solo per l'autore del post, calcolando la proprietà `canRemove` in base all'id dell'utente corrente. Riferimento: [`src/app/shared/post-card/post-card.ts`](Progetto/web3-unibook-starter-main/src/app/shared/post-card/post-card.ts).
- Eliminazione dei post con dialog di conferma prima della cancellazione definitiva. Riferimento: [`src/app/shared/post-card/post-card.ts`](Progetto/web3-unibook-starter-main/src/app/shared/post-card/post-card.ts).
- Like/unlike con aggiornamento immediato dello stato locale della lista: il conteggio like e `isLiked` vengono aggiornati dopo la risposta positiva dell'API. Riferimenti: [`src/app/pages/home/feed.service.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/feed.service.ts), [`src/app/pages/profile/profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/profile/profile.ts), [`src/app/pages/public-profile/public-profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/public-profile/public-profile.ts), [`src/app/core/api/posts-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/posts-api.service.ts).

### 6. Creazione post con immagine opzionale

- Pagina dedicata `/posts/new` per pubblicare un nuovo post e tornare al feed dopo la creazione. Riferimenti: [`src/app/pages/create-post/create-post.ts`](Progetto/web3-unibook-starter-main/src/app/pages/create-post/create-post.ts), [`src/app/pages/create-post/create-post.html`](Progetto/web3-unibook-starter-main/src/app/pages/create-post/create-post.html).
- Form riutilizzabile `CreatePostForm` con validazione dichiarativa tramite `@angular/forms/signals`: testo obbligatorio e limite massimo di 500 caratteri. Riferimenti: [`src/app/pages/home/create-post-form.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/create-post-form.ts), [`src/app/pages/home/create-post-form.html`](Progetto/web3-unibook-starter-main/src/app/pages/home/create-post-form.html).
- Selezione immagine locale opzionale con validazione del tipo MIME e dimensione massima di 5 MB. Riferimento: [`src/app/pages/home/create-post-form.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/create-post-form.ts).
- Upload dell'immagine prima della creazione del post tramite `MediaApiService.uploadPostImage()`, poi invio del post con `PostsApiService.create()`. Riferimenti: [`src/app/pages/home/create-post-form.ts`](Progetto/web3-unibook-starter-main/src/app/pages/home/create-post-form.ts), [`src/app/core/api/media-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/media-api.service.ts), [`src/app/core/api/posts-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/posts-api.service.ts).

### 7. Profilo personale e modifica profilo

- Profilo personale con nome, cognome, email, data di nascita, bio, avatar, follower, seguiti e lista dei propri post. Riferimenti: [`src/app/pages/profile/profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/profile/profile.ts), [`src/app/pages/profile/profile.html`](Progetto/web3-unibook-starter-main/src/app/pages/profile/profile.html).
- I post del profilo personale sono caricati dall'API utenti e ordinati dal più recente al meno recente. Riferimenti: [`src/app/pages/profile/profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/profile/profile.ts), [`src/app/core/api/users-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/users-api.service.ts), [`src/app/core/api/models/post.utils.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/models/post.utils.ts).
- Pagina `/profile/edit` per modificare soltanto bio e avatar, lasciando non modificabili nome, cognome e data di nascita come richiesto dai requisiti. Riferimenti: [`src/app/pages/profile-edit/profile-edit.ts`](Progetto/web3-unibook-starter-main/src/app/pages/profile-edit/profile-edit.ts), [`src/app/pages/profile-edit/profile-edit.html`](Progetto/web3-unibook-starter-main/src/app/pages/profile-edit/profile-edit.html).
- Upload asincrono dell'avatar tramite `MediaApiService.uploadAvatar()` con validazione MIME e limite di 5 MB; dopo il salvataggio viene aggiornato anche l'utente corrente in sessione. Riferimenti: [`src/app/pages/profile-edit/profile-edit.ts`](Progetto/web3-unibook-starter-main/src/app/pages/profile-edit/profile-edit.ts), [`src/app/core/api/media-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/media-api.service.ts), [`src/app/core/auth/auth.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/auth/auth.service.ts).
- Dialog fullscreen per aprire la foto profilo a dimensione maggiore. Riferimenti: [`src/app/shared/profile-image-dialog/profile-image-dialog.ts`](Progetto/web3-unibook-starter-main/src/app/shared/profile-image-dialog/profile-image-dialog.ts), [`src/app/pages/profile/profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/profile/profile.ts).

### 8. Profilo pubblico, follow e unfollow

- Profilo pubblico con nome, avatar, bio, numero di follower, numero di seguiti e post pubblicati dall'utente. Riferimenti: [`src/app/pages/public-profile/public-profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/public-profile/public-profile.ts), [`src/app/pages/public-profile/public-profile.html`](Progetto/web3-unibook-starter-main/src/app/pages/public-profile/public-profile.html), [`src/app/core/api/users-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/users-api.service.ts).
- Caricamento parallelo di dati profilo e post tramite `Promise.all`, con gestione di caricamento, errore e profilo vuoto. Riferimento: [`src/app/pages/public-profile/public-profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/public-profile/public-profile.ts).
- Follow/unfollow con aggiornamento dello stato `isFollowing`, del conteggio follower del profilo visualizzato e del conteggio `followingCount` dell'utente corrente. Riferimenti: [`src/app/pages/public-profile/public-profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/public-profile/public-profile.ts), [`src/app/core/api/users-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/users-api.service.ts).
- Nasconde il pulsante follow quando il profilo pubblico corrisponde all'utente autenticato. Riferimento: [`src/app/pages/public-profile/public-profile.ts`](Progetto/web3-unibook-starter-main/src/app/pages/public-profile/public-profile.ts).

### 9. Ricerca utenti

- Pagina `/users/search` con form reattivo e validazione del campo di ricerca obbligatorio. Riferimenti: [`src/app/pages/user-search/user-search.ts`](Progetto/web3-unibook-starter-main/src/app/pages/user-search/user-search.ts), [`src/app/pages/user-search/user-search.html`](Progetto/web3-unibook-starter-main/src/app/pages/user-search/user-search.html).
- Ricerca per nome o cognome tramite `UsersApiService.search(query)`. Riferimenti: [`src/app/pages/user-search/user-search.ts`](Progetto/web3-unibook-starter-main/src/app/pages/user-search/user-search.ts), [`src/app/core/api/users-api.service.ts`](Progetto/web3-unibook-starter-main/src/app/core/api/users-api.service.ts).
- Rendering dei risultati con avatar/fallback, nome completo e link al profilo pubblico. Riferimento: [`src/app/pages/user-search/user-search.html`](Progetto/web3-unibook-starter-main/src/app/pages/user-search/user-search.html).
- Gestione degli stati di caricamento, ricerca effettuata e risultati vuoti tramite Signals e `computed()`. Riferimento: [`src/app/pages/user-search/user-search.ts`](Progetto/web3-unibook-starter-main/src/app/pages/user-search/user-search.ts).

### 10. Accessibilità e test

- Attributi ARIA e ruoli semantici su menu, stati di caricamento/errore, dialog e navigazione. Riferimenti: [`src/app/layouts/protected-layout/protected-layout.html`](Progetto/web3-unibook-starter-main/src/app/layouts/protected-layout/protected-layout.html), [`src/app/pages/home/home.html`](Progetto/web3-unibook-starter-main/src/app/pages/home/home.html), [`src/app/shared/post-card/post-card.ts`](Progetto/web3-unibook-starter-main/src/app/shared/post-card/post-card.ts).
- Test axe-core sulle schermate principali e sui componenti più importanti. Riferimento: [`src/app/accessibility.spec.ts`](Progetto/web3-unibook-starter-main/src/app/accessibility.spec.ts).
- Test dei comportamenti social: ordinamento cronologico, follow/unfollow, cancellazione con conferma, menu mobile e dialog immagine profilo. Riferimento: [`src/app/social-behavior.spec.ts`](Progetto/web3-unibook-starter-main/src/app/social-behavior.spec.ts).

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

### Social network Looply

Dalla root del repository:

```bash
cd Progetto/web3-unibook-starter-main
npm install
npm start
```

In questo progetto `npm start` funziona perché lo script `start` del `package.json` esegue `ng serve`, cioè il server di sviluppo di Angular. L'applicazione sarà disponibile all'indirizzo:

```text
http://localhost:4200/
```

### Rubrica contatti

Il progetto `rubricaContatti` è separato dal social network e usa Vite. Per avviarlo dalla root del repository:

```bash
cd rubricaContatti
npm install
npm run dev
```

In questo caso si usa `npm run dev` perché nel suo `package.json` lo script disponibile per il server di sviluppo si chiama `dev` ed esegue `vite`; non è definito uno script `start`.

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

Progetto realizzato da **Alessandro Manucci Mat 366193** per l'esame di Laboratorio Programmazione Web 3.
