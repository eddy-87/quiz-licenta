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
]
