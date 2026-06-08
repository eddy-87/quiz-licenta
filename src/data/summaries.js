// ============================================================================
//  Rezumate scurte pe lecție pentru modul „Învață" (citește → testează).
//  Cheia = id-ul lecției (vezi LESSONS din questions.js).
//  Blocurile sunt randate cu componenta Markup ({t:'p'|'h'|'ul'|'code'}).
// ============================================================================

export const SUMMARIES = {
  // ===== Sisteme de Operare =====
  '1.1': { blocks: [
    { t: 'ul', v: [
      'SO = colecție de programe de sistem care gestionează resursele și controlează activitatea calculatorului.',
      'Două componente: NUCLEUL (gestionează resurse, oferă interfețe aplicațiilor) și INTERFAȚA (comunicarea utilizator↔calculator).',
      'Funcții: control execuție programe, operații I/O, gestiune fișiere, protecție, tratare erori, interfață cu utilizatorul.',
      'API = set de funcții predefinite oferite aplicațiilor.',
    ] },
  ] },
  '1.2': { blocks: [
    { t: 'ul', v: [
      'Clasificare după: configurații hard, partajabilitate (mono/multi-utilizator), interacțiuni, organizare internă.',
      'După interacțiuni: seriale (batch — loturi, fără intervenție), interactive, timp-real.',
      'Timp-real: in-line și tranzacționale.',
      'Organizare internă: monolitice, cu nucleu, stratificate (MULTICS), mașini virtuale.',
    ] },
  ] },
  '1.3': { blocks: [
    { t: 'ul', v: [
      'Proces = program în execuție (caracter DINAMIC); programul e STATIC.',
      'Creare proces: set de instrucțiuni + procesor + mediu.',
      'Reprezentare în memorie: cod, date globale, heap (dinamic), stivă (apeluri), context (stare: PC, SP).',
      'Thread = entitate de execuție în proces; are stivă și context proprii.',
    ] },
  ] },
  '1.4': { blocks: [
    { t: 'ul', v: [
      'FORK (creează proces fiu), JOIN (recombină n procese), QUIT (termină) — în conflict cu programarea structurată.',
      'PARBEGIN-PAREND: instrucțiunile rulează simultan; grupul se termină după cea mai lungă.',
      'Semafor (Dijkstra) = (valoare v(s), coadă c(s)). Operații INDIVIZIBILE: P/wait și V/signal.',
      'v(s) = v0(s) + nv(s) − np(s). Dacă v(s) < 0 → |v(s)| procese blocate în coadă.',
    ] },
  ] },
  '1.5': { blocks: [
    { t: 'ul', v: [
      'Secțiune critică = cod ce NU poate fi executat simultan de mai multe procese. Resursă critică = acces neexclusiv interzis.',
      'Cerință: cel mult un proces în SC; nimeni nu așteaptă indefinit.',
      'Excludere mutuală cu semafor (v ≤ 1): P(s); secțiune critică; V(s).',
      'Sincronizare: semafor cu valoare inițială 0. Regiuni critice condiționate: region r [when B] do S.',
    ] },
  ] },
  '1.6': { blocks: [
    { t: 'ul', v: [
      'Ierarhie: cache (info recente, hit > 90%) + memorie operativă = memorie INTERNĂ; secundară + arhivare = EXTERNĂ.',
      'Calcul de adresă: compilare → linkeditare → încărcare.',
      'Alocare paginată: pagini egale (putere a lui 2). Segmentată: lungimi diferite (poate apărea fragmentare). Segmentată+paginată.',
      'Cod reentrant = cod partajabil între procese.',
    ] },
  ] },
  '1.7': { blocks: [
    { t: 'ul', v: [
      'Întrebări: CÂT (cantitate), UNDE (politici de plasare), CÂND, CARE (politici de înlocuire).',
      'Plasare: First-Fit (prima potrivită), Best-Fit (cel mai puțin rămas), Worst-Fit (cel mai mult rămas).',
      'Înlocuire: NRU (biți R și M → 4 clase), FIFO (cea mai veche), LRU (cea mai puțin folosită recent).',
      'Evacuarea unei pagini pe disc = swapping.',
    ] },
  ] },
  '1.8': { blocks: [
    { t: 'ul', v: [
      'Moduri de adresare: absolută t(x)=x; bazată t(x)=(Rb)+x; indexată AF2=AF1+(Ri); relativă AF2=AF1+d; indirectă AF2=(AF1).',
      'Graf de precedență = model matematic pentru ordinea/concurența operațiilor.',
      'Fragmentare internă = spațiu nefolosit într-o zonă deja alocată.',
      'Memoria externă = secundară + arhivare (CPU nu o accesează direct).',
    ] },
  ] },
  '1.9': { blocks: [
    { t: 'ul', v: [
      'Întrerupere = semnal care suspendă execuția curentă pentru a trata un eveniment.',
      'Clasificare: hardware (externe), software (apeluri sistem), excepționale (erori).',
      'Producător-consumator: buffer comun sincronizat cu semafoare (mutex, gol, plin).',
      'P/wait scade v(s) (blochează dacă < 0); V/signal crește v(s) (deblochează un proces).',
    ] },
  ] },

  // ===== Tehnologii Web =====
  '2.1': { blocks: [
    { t: 'ul', v: [
      'URL = protocol://nume_gazdă/cale_fișier. Structură HTML: <html><head><title>…</head><body>…</body></html>.',
      'Text: <b> bold, <i> italic, <u> subliniat, <p> paragraf (align: left/right/center).',
      'Titluri <h1>…<h6>. Comentariu: <!-- … -->. Spațiu: &nbsp;. Preformatare: <pre>.',
    ] },
  ] },
  '2.2': { blocks: [
    { t: 'ul', v: [
      'Liste: <ol> ordonată (atribut type), <ul> neordonată, <dl>/<dt>/<dd> definiții.',
      'Legături: <a href="…">; e-mail cu href="mailto:…".',
      'Imagini: <img src="…" width height alt>. Hartă imagine: <map>/<area> (shape: rect/circle/poly).',
    ] },
  ] },
  '2.3': { blocks: [
    { t: 'ul', v: [
      'Tabel: <table>, <tr> rând, <th> antet (bold), <td> celulă, <caption> titlu.',
      'Secțiuni: <thead>, <tbody>, <tfoot>. cellspacing = distanța dintre celule.',
      'Formular: <form action="…" method="post/get">. Controale: input, textarea (rows/cols), select (multiple).',
    ] },
  ] },
  '2.4': { blocks: [
    { t: 'ul', v: [
      '<frameset> (rows/cols) înlocuiește <body> și împarte fereastra.',
      '<frame src="…">: noresize, scrolling (auto/yes/no), name, frameborder.',
      'target="nume_cadru" în <a> deschide pagina în acel cadru. <noframes> = conținut alternativ.',
    ] },
  ] },
  '2.5': { blocks: [
    { t: 'ul', v: [
      'Sintaxă: selector { proprietate : valoare }. Comentariu CSS: /* … */.',
      'Unde: inline (style="…"), în pagină (<style>), fișier extern .css.',
      'Selectori: tag (p{}), clasă (.nume), id (#nume). Moștenire de la elementul părinte.',
    ] },
  ] },
  '2.6': { blocks: [
    { t: 'ul', v: [
      '<div> = element bloc (rând nou); <span> = inline (în flux).',
      '<meta> (keywords, description, http-equiv="Refresh"). <iframe>/<object> includ pagini externe.',
      '<marquee> (text în mișcare), <bgsound>, <embed>. position: static/relative/fixed/absolute.',
    ] },
  ] },
  '2.7': { blocks: [
    { t: 'ul', v: [
      'Text: letter-spacing (litere), word-spacing (cuvinte), text-indent, vertical-align, text-decoration, font-weight/variant.',
      'Fundal: background-color, -image, -repeat, -position, -attachment.',
      'Liste: list-style-type, -image, -position.',
    ] },
  ] },
  '2.8': { blocks: [
    { t: 'ul', v: [
      'Cod JS între <script>…</script>. function nume(parametri) { … }.',
      'document.write/writeln scriu în pagină; alert("…") afișează o fereastră.',
      'document.getElementById("id") selectează un element; .innerHTML citește/modifică conținutul lui.',
      'Evenimente (ex. onclick) execută cod la o acțiune.',
    ] },
  ] },

  // ===== Baze de Date =====
  '3.1': { blocks: [
    { t: 'ul', v: [
      'BD = colecție organizată de date structurate. Cel mai răspândit model: relațional (tabele).',
      'Tipuri: relațional, NoSQL (nestructurat), obiecte, grafice, OLTP, distribuite, depozite de date.',
      'Relații între entități: 1-1, 1-N, M-N, unară. SGBD/DBMS gestionează BD.',
      'SQL = Structured Query Language. MySQL = SGBD relațional open-source.',
    ] },
  ] },
  '3.2': { blocks: [
    { t: 'ul', v: [
      'Definire: CREATE DATABASE / CREATE TABLE. Date: INSERT INTO, SELECT, DELETE FROM, UPDATE … SET.',
      'WHERE filtrează rândurile; ORDER BY (ASC/DESC) ordonează.',
      'GROUP BY grupează; HAVING filtrează grupuri; funcții agregate: AVG, SUM, COUNT, MAX. Operator IN.',
    ] },
  ] },
  '3.3': { blocks: [
    { t: 'ul', v: [
      'Cheie primară: PRIMARY KEY AUTO_INCREMENT. Cheie străină = referă PK din alt tabel.',
      'JOIN: leagă tabele prin egalitatea cheilor (FK = PK).',
      'DISTINCT elimină duplicatele. Subcerere = SELECT în interiorul altui SELECT (… IN (SELECT …)).',
    ] },
  ] },

  // ===== Rețele =====
  '4.1': { blocks: [
    { t: 'ul', v: [
      'Rețea = dispozitive interconectate care comunică. LAN (locală), MAN (oraș), WAN (Internet), WLAN (wireless).',
      'Componente: end-device, switch (în aceeași rețea), router (între rețele), firewall.',
      'Medii de transmisie: cupru, fibră optică, wireless.',
    ] },
  ] },
  '4.2': { blocks: [
    { t: 'ul', v: [
      'Adresa IP identifică unic dispozitive. IP public (unic global, gestionat de IANA) vs privat (reutilizabil, admin local).',
      'NAT = mai multe dispozitive partajează o adresă IP publică.',
      'Router = Layer 3 (folosește IP). Switch = Layer 2 (folosește MAC).',
    ] },
  ] },
  '4.3': { blocks: [
    { t: 'ul', v: [
      'Magistrală (bus): cablu comun + terminatori; o defecțiune afectează tot.',
      'Stea: nod central; inel: token passing, defectarea unui nod cade rețeaua.',
      'Plasă (mesh): fiecare legat de toți — redundanță mare.',
    ] },
  ] },
  '4.4': { blocks: [
    { t: 'ul', v: [
      'OSI = 7 niveluri: Fizic, Legătură de date (MAC), Rețea (IP), Transport (TCP/UDP), Sesiune, Prezentare, Aplicație.',
      'TCP/IP = 4 niveluri (comprimă nivelurile OSI). TCP = orientat pe conexiune.',
    ] },
  ] },
  '4.5': { blocks: [
    { t: 'ul', v: [
      'Mască de subrețea: 32 biți (1 = rețea, 0 = stație); subnetare prin operația ȘI (AND); notație CIDR (ex. /24).',
      'DNS: traduce nume de domeniu în adresă IP (nivel 7).',
      'ping: testează accesibilitatea (ICMP). Termeni: packet loss, latency, jitter (variația latenței).',
    ] },
  ] },
  '4.6': { blocks: [
    { t: 'ul', v: [
      'Ethernet: standard IEEE 802.3 (viteze mari + adrese MAC). Token Ring: topologie inel, token passing.',
      'WAN: deseori prin VPN; protocoale PPP, HDLC; ATM (celule fixe de 53 octeți).',
      'Wireless: peer-to-peer / punct de acces. Avantaj: cost redus; dezavantaj: bandă și stabilitate scăzute.',
    ] },
  ] },
  '4.7': { blocks: [
    { t: 'ul', v: [
      'Porturi: FTP 21, HTTP 80, HTTPS 443, DNS 53, RDP 3389. HTTPS = HTTP criptat (TLS/SSL).',
      'Switch > hub: trimite cadrul doar către destinatar (după MAC), elimină coliziunile.',
      'Hub = Layer 1, repetă semnalul către toate porturile.',
    ] },
  ] },

  // ===== Algoritmi & POO =====
  '5.1': { blocks: [
    { t: 'ul', v: [
      'Clasă = tipar; obiect = instanță concretă a clasei.',
      'Încapsulare (ascunderea datelor), moștenire (derivata preia baza), polimorfism (comportament după tip, funcții virtuale).',
      'Clasă abstractă (stare + implementare parțială) vs interfață (doar contract). Genericitate: cod parametrizat cu tipuri (List<T>).',
    ] },
  ] },
  '5.2': { blocks: [
    { t: 'ul', v: [
      'Stivă = LIFO; coadă = FIFO; listă înlănțuită = noduri legate prin pointeri.',
      'Arbore binar de căutare: stânga < nod < dreapta. Graf = noduri + muchii. Hash table ≈ O(1).',
      'BFS folosește o coadă; DFS folosește o stivă / recursivitate.',
    ] },
  ] },
  '5.3': { blocks: [
    { t: 'ul', v: [
      'Căutare: liniară O(n); binară O(log n) (necesită tablou sortat).',
      'Sortare: quicksort O(n log n) în medie; bubble sort O(n²).',
      'Recursivitate (necesită caz de bază), backtracking (explorare cu revenire), divide et impera.',
      'Cel mai scurt drum într-un graf neponderat = BFS.',
    ] },
  ] },
}
