// ============================================================================
//  Răspuns SCRIS (type-in) — active recall: scrii răspunsul din cap, nu alegi.
//  `answers` = variante acceptate (potrivire „iertătoare": fără diacritice,
//  fără punctuație, spații normalizate, potrivire parțială în ambele sensuri).
//  Există și buton de „am avut dreptate" pentru cazurile aproape-corecte.
//  Secțiunile (SO/BD/Retele/Web/Algo) corespund celor din exercises.js.
// ============================================================================

export const TYPEIN = [
  // --- Sisteme de Operare ---
  { id: 'TI-SO-1', section: 'SO', prompt: 'Cum se numește un program aflat în execuție?', answers: ['proces', 'task'], exp: 'Procesul = program în execuție (caracter dinamic).' },
  { id: 'TI-SO-2', section: 'SO', prompt: 'Componenta esențială a SO, care gestionează resursele?', answers: ['nucleul', 'nucleu', 'kernel'], exp: 'Nucleul (kernel) gestionează resursele și controlează echipamentele.' },
  { id: 'TI-SO-3', section: 'SO', prompt: 'Cine a introdus conceptul de semafor?', answers: ['dijkstra', 'edsger dijkstra'], exp: 'Conceptul de semafor a fost introdus de Edsger Dijkstra.' },
  { id: 'TI-SO-4', section: 'SO', prompt: 'În ce zonă de memorie sunt alocate variabilele dinamice?', answers: ['heap', 'zona heap'], exp: 'Heap = zona variabilelor alocate dinamic.' },
  { id: 'TI-SO-5', section: 'SO', prompt: 'Politica de înlocuire care evacuează cea mai veche pagină (acronim)?', answers: ['fifo'], exp: 'FIFO = First In, First Out.' },
  { id: 'TI-SO-6', section: 'SO', prompt: 'Politica de înlocuire „cel mai puțin folosită recent" (acronim)?', answers: ['lru'], exp: 'LRU = Least Recently Used.' },
  { id: 'TI-SO-7', section: 'SO', prompt: 'Cum se numește evacuarea unei pagini în memoria secundară?', answers: ['swapping', 'swap'], exp: 'Swapping = mutarea unei pagini pe disc pentru a face loc.' },

  // --- Baze de Date ---
  { id: 'TI-BD-1', section: 'BD', prompt: 'Comanda SQL care creează un tabel?', answers: ['create table'], exp: 'CREATE TABLE nume (...).' },
  { id: 'TI-BD-2', section: 'BD', prompt: 'Comanda SQL care adaugă înregistrări?', answers: ['insert into', 'insert'], exp: 'INSERT INTO tabel (...) VALUES (...).' },
  { id: 'TI-BD-3', section: 'BD', prompt: 'Comanda SQL care extrage/selectează date?', answers: ['select'], exp: 'SELECT ... FROM ...' },
  { id: 'TI-BD-4', section: 'BD', prompt: 'Comanda SQL care șterge înregistrări?', answers: ['delete from', 'delete'], exp: 'DELETE FROM tabel WHERE ...' },
  { id: 'TI-BD-5', section: 'BD', prompt: 'Clauza care filtrează rândurile într-un SELECT?', answers: ['where'], exp: 'WHERE filtrează rândurile după o condiție.' },
  { id: 'TI-BD-6', section: 'BD', prompt: 'Clauza pentru filtrarea după funcții agregate?', answers: ['having'], exp: 'HAVING filtrează grupuri (funcții agregate).' },
  { id: 'TI-BD-7', section: 'BD', prompt: 'Funcția agregată SQL pentru medie?', answers: ['avg'], exp: 'AVG() = media valorilor.' },
  { id: 'TI-BD-8', section: 'BD', prompt: 'Ce înseamnă SQL? (în engleză)', answers: ['structured query language'], exp: 'Structured Query Language.' },

  // --- Rețele ---
  { id: 'TI-RET-1', section: 'Retele', prompt: 'Acronimul rețelei locale?', answers: ['lan'], exp: 'LAN = Local Area Network.' },
  { id: 'TI-RET-2', section: 'Retele', prompt: 'Acronimul rețelei extinse (ex. Internetul)?', answers: ['wan'], exp: 'WAN = Wide Area Network.' },
  { id: 'TI-RET-3', section: 'Retele', prompt: 'Câte niveluri are modelul OSI?', answers: ['7', 'sapte'], exp: 'Modelul OSI are 7 niveluri.' },
  { id: 'TI-RET-4', section: 'Retele', prompt: 'Portul HTTP?', answers: ['80'], exp: 'HTTP folosește portul 80.' },
  { id: 'TI-RET-5', section: 'Retele', prompt: 'Portul HTTPS?', answers: ['443'], exp: 'HTTPS folosește portul 443.' },
  { id: 'TI-RET-6', section: 'Retele', prompt: 'Portul FTP?', answers: ['21'], exp: 'FTP folosește portul 21.' },
  { id: 'TI-RET-7', section: 'Retele', prompt: 'Ce dispozitiv interconectează rețele diferite?', answers: ['router', 'ruter'], exp: 'Routerul (Layer 3) interconectează rețele.' },
  { id: 'TI-RET-8', section: 'Retele', prompt: 'Tehnologia care permite partajarea unei adrese IP publice (acronim)?', answers: ['nat'], exp: 'NAT = Network Address Translation.' },
  { id: 'TI-RET-9', section: 'Retele', prompt: 'DNS traduce un nume de domeniu într-o ...?', answers: ['adresa ip', 'ip'], exp: 'DNS traduce numele de domeniu în adresă IP.' },

  // --- Tehnologii Web ---
  { id: 'TI-WEB-1', section: 'Web', prompt: 'Tagul HTML pentru text îngroșat (bold)?', answers: ['b', '<b>'], exp: '<b>...</b> = bold.' },
  { id: 'TI-WEB-2', section: 'Web', prompt: 'Tagul HTML pentru o legătură (ancoră)?', answers: ['a', '<a>'], exp: '<a> = ancoră/legătură.' },
  { id: 'TI-WEB-3', section: 'Web', prompt: 'Tagul HTML pentru o imagine?', answers: ['img', '<img>'], exp: '<img src="..."> inserează o imagine.' },
  { id: 'TI-WEB-4', section: 'Web', prompt: 'Tagul în care se include cod JavaScript?', answers: ['script', '<script>'], exp: '<script>...</script>.' },
  { id: 'TI-WEB-5', section: 'Web', prompt: 'Proprietatea CSS pentru culoarea textului?', answers: ['color'], exp: 'color = culoarea textului.' },
  { id: 'TI-WEB-6', section: 'Web', prompt: 'Metoda JS care selectează un element după id?', answers: ['getelementbyid', 'document.getelementbyid'], exp: 'document.getElementById("id").' },

  // --- Algoritmi & POO ---
  { id: 'TI-ALG-1', section: 'Algo', prompt: 'Principiul de funcționare a stivei (acronim, engleză)?', answers: ['lifo'], exp: 'LIFO = Last In, First Out.' },
  { id: 'TI-ALG-2', section: 'Algo', prompt: 'Principiul de funcționare a cozii (acronim, engleză)?', answers: ['fifo'], exp: 'FIFO = First In, First Out.' },
  { id: 'TI-ALG-3', section: 'Algo', prompt: 'Complexitatea căutării binare?', answers: ['o(log n)', 'log n', 'logaritmica'], exp: 'Căutarea binară = O(log n).' },
  { id: 'TI-ALG-4', section: 'Algo', prompt: 'Tehnica „împarte problema în subprobleme" (în latină)?', answers: ['divide et impera', 'divide and conquer', 'divide si stapaneste'], exp: 'Divide et Impera.' },
  { id: 'TI-ALG-5', section: 'Algo', prompt: 'Proprietatea POO de ascundere a datelor interne?', answers: ['incapsulare', 'incapsularea', 'encapsulation'], exp: 'Încapsularea = ascunderea stării interne, acces prin metode.' },
  { id: 'TI-ALG-6', section: 'Algo', prompt: 'Parcurgerea unui graf folosind o coadă (acronim)?', answers: ['bfs'], exp: 'BFS = Breadth-First Search (parcurgere în lățime).' },

  // ===== LOT 2 — type-in suplimentar =====

  // --- Sisteme de Operare ---
  { id: 'TI-SO-8', section: 'SO', prompt: 'Cele două componente ale unui sistem de operare?', answers: ['nucleul si interfata', 'nucleu si interfata', 'nucleul, interfata'], exp: 'Componentele SO: nucleul și interfața.' },
  { id: 'TI-SO-9', section: 'SO', prompt: 'Setul de funcții predefinite oferite aplicațiilor (acronim)?', answers: ['api'], exp: 'API = Application Program Interface.' },
  { id: 'TI-SO-10', section: 'SO', prompt: 'Entitatea de execuție din interiorul unui proces?', answers: ['thread', 'fir de executie', 'fir'], exp: 'Thread = fir de execuție din interiorul unui proces.' },
  { id: 'TI-SO-11', section: 'SO', prompt: 'Registrul care indică adresa următoarei instrucțiuni (acronim)?', answers: ['pc', 'program counter'], exp: 'PC = Program Counter.' },
  { id: 'TI-SO-12', section: 'SO', prompt: 'Operația P pe un semafor se mai numește?', answers: ['wait'], exp: 'P = wait (așteptare).' },
  { id: 'TI-SO-13', section: 'SO', prompt: 'Operația V pe un semafor se mai numește?', answers: ['signal'], exp: 'V = signal (semnalizare).' },
  { id: 'TI-SO-14', section: 'SO', prompt: 'Metoda de plasare „prima zonă liberă potrivită" (engleză)?', answers: ['first-fit', 'first fit'], exp: 'First-Fit = prima potrivire.' },
  { id: 'TI-SO-15', section: 'SO', prompt: 'Memoria mică și rapidă interpusă între CPU și memoria operativă?', answers: ['cache', 'memoria cache'], exp: 'Memoria cache conține informațiile recent utilizate.' },
  { id: 'TI-SO-16', section: 'SO', prompt: 'Codul partajabil între mai multe procese se numește cod ...?', answers: ['reentrant', 'cod reentrant'], exp: 'Codul reentrant poate fi folosit în comun de mai multe procese.' },

  // --- Baze de Date ---
  { id: 'TI-BD-9', section: 'BD', prompt: 'Clauza SQL care ordonează rezultatele?', answers: ['order by'], exp: 'ORDER BY ordonează (ASC/DESC).' },
  { id: 'TI-BD-10', section: 'BD', prompt: 'Clauza SQL care grupează rândurile?', answers: ['group by'], exp: 'GROUP BY grupează rândurile pentru funcții agregate.' },
  { id: 'TI-BD-11', section: 'BD', prompt: 'Cuvântul cheie SQL care elimină duplicatele?', answers: ['distinct'], exp: 'SELECT DISTINCT elimină rândurile duplicate.' },
  { id: 'TI-BD-12', section: 'BD', prompt: 'Cel mai răspândit tip de bază de date?', answers: ['relationala', 'relational', 'baze de date relationale'], exp: 'Cel mai răspândit tip este cel relațional (date în tabele).' },
  { id: 'TI-BD-13', section: 'BD', prompt: 'Sistem de gestiune a bazelor de date (acronim, engleză)?', answers: ['dbms', 'sgbd'], exp: 'DBMS = Database Management System (SGBD).' },
  { id: 'TI-BD-14', section: 'BD', prompt: 'Cheia care referă cheia primară a altui tabel?', answers: ['cheie straina', 'foreign key', 'cheia straina'], exp: 'Cheia străină (foreign key) asigură integritatea referențială.' },

  // --- Rețele ---
  { id: 'TI-RET-10', section: 'Retele', prompt: 'Acronimul rețelei metropolitane (la nivel de oraș)?', answers: ['man'], exp: 'MAN = Metropolitan Area Network.' },
  { id: 'TI-RET-11', section: 'Retele', prompt: 'Portul serviciului DNS?', answers: ['53'], exp: 'DNS folosește portul 53.' },
  { id: 'TI-RET-12', section: 'Retele', prompt: 'Portul Remote Desktop (RDP)?', answers: ['3389'], exp: 'RDP = portul TCP 3389.' },
  { id: 'TI-RET-13', section: 'Retele', prompt: 'La ce nivel OSI lucrează switch-ul?', answers: ['2', 'layer 2', 'nivelul 2', 'legatura de date'], exp: 'Switch-ul = nivelul 2 (legătură de date), folosește MAC.' },
  { id: 'TI-RET-14', section: 'Retele', prompt: 'La ce nivel OSI lucrează routerul?', answers: ['3', 'layer 3', 'nivelul 3', 'retea'], exp: 'Routerul = nivelul 3 (rețea), folosește IP.' },
  { id: 'TI-RET-15', section: 'Retele', prompt: 'Standardul IEEE pentru Ethernet?', answers: ['802.3', 'ieee 802.3'], exp: 'Ethernet = IEEE 802.3.' },
  { id: 'TI-RET-16', section: 'Retele', prompt: 'Tipul de adresă folosit de switch?', answers: ['mac', 'adresa mac'], exp: 'Switch-ul folosește adresa MAC.' },
  { id: 'TI-RET-17', section: 'Retele', prompt: 'Câte niveluri are modelul TCP/IP?', answers: ['4', 'patru'], exp: 'Modelul TCP/IP are 4 niveluri.' },
  { id: 'TI-RET-18', section: 'Retele', prompt: 'Variația latenței se numește?', answers: ['jitter', 'fluctuatie', 'fluctuatia'], exp: 'Jitter = variația latenței.' },
  { id: 'TI-RET-19', section: 'Retele', prompt: 'Dimensiunea fixă a unei celule ATM (octeți)?', answers: ['53'], exp: 'ATM folosește celule fixe de 53 de octeți.' },

  // --- Tehnologii Web ---
  { id: 'TI-WEB-7', section: 'Web', prompt: 'Tagul pentru o listă ordonată?', answers: ['ol', '<ol>'], exp: '<OL> = listă ordonată.' },
  { id: 'TI-WEB-8', section: 'Web', prompt: 'Tagul pentru o listă neordonată?', answers: ['ul', '<ul>'], exp: '<UL> = listă neordonată.' },
  { id: 'TI-WEB-9', section: 'Web', prompt: 'Tagul pentru un tabel?', answers: ['table', '<table>'], exp: '<table> = tabel.' },
  { id: 'TI-WEB-10', section: 'Web', prompt: 'Tagul care înlocuiește <body> când se folosesc cadre?', answers: ['frameset', '<frameset>'], exp: '<frameset> împarte fereastra în cadre.' },
  { id: 'TI-WEB-11', section: 'Web', prompt: 'Proprietatea CSS pentru mărimea fontului?', answers: ['font-size'], exp: 'font-size = dimensiunea fontului.' },
  { id: 'TI-WEB-12', section: 'Web', prompt: 'Metoda JS care afișează o fereastră de alertă?', answers: ['alert', 'alert()'], exp: 'alert("mesaj").' },
  { id: 'TI-WEB-13', section: 'Web', prompt: 'Proprietatea JS pentru conținutul HTML al unui element?', answers: ['innerhtml'], exp: 'element.innerHTML.' },
  { id: 'TI-WEB-14', section: 'Web', prompt: 'Atributul <form> care dă URL-ul scriptului de prelucrare?', answers: ['action'], exp: 'action = URL-ul scriptului.' },
  { id: 'TI-WEB-15', section: 'Web', prompt: 'Cele 6 niveluri de titlu HTML se scriu cu tagurile H1 ... ?', answers: ['h6'], exp: '<Hn> cu n de la 1 la 6.' },

  // --- Algoritmi & POO ---
  { id: 'TI-ALG-7', section: 'Algo', prompt: 'Parcurgerea unui graf cu stivă/recursivitate (acronim)?', answers: ['dfs'], exp: 'DFS = Depth-First Search (în adâncime).' },
  { id: 'TI-ALG-8', section: 'Algo', prompt: 'Tiparul (șablonul) după care se creează obiecte?', answers: ['clasa', 'clasa (class)', 'class'], exp: 'Clasa = tiparul din care se creează obiecte.' },
  { id: 'TI-ALG-9', section: 'Algo', prompt: 'Instanța concretă a unei clase?', answers: ['obiect', 'object'], exp: 'Obiectul = instanță a unei clase.' },
  { id: 'TI-ALG-10', section: 'Algo', prompt: 'Complexitatea medie a algoritmului Quicksort?', answers: ['o(n log n)', 'n log n', 'nlogn'], exp: 'Quicksort = O(n log n) în medie.' },
  { id: 'TI-ALG-11', section: 'Algo', prompt: 'O funcție care se apelează pe sine se numește ...?', answers: ['recursiva', 'recursivitate', 'recursive'], exp: 'Funcție recursivă (cu un caz de bază).' },
  { id: 'TI-ALG-12', section: 'Algo', prompt: 'Arborele binar de căutare (acronim, engleză)?', answers: ['bst'], exp: 'BST = Binary Search Tree.' },
  { id: 'TI-ALG-13', section: 'Algo', prompt: 'Proprietatea POO: același apel se comportă diferit după tip?', answers: ['polimorfism', 'polimorfismul', 'polymorphism'], exp: 'Polimorfismul.' },
]
