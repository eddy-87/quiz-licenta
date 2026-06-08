// ============================================================================
//  Explicații per VARIANTĂ ("de ce e greșit fiecare răspuns").
//  Cheie = id-ul întrebării. Valoare = array cu 4 note, în ORDINEA ORIGINALĂ
//  a opțiunilor din questions.js. Slotul răspunsului corect se lasă '' (gol).
//  La rulare, notele sunt remapate automat la ordinea amestecată a variantelor.
//
//  E un set „de bază", extensibil. Întrebările fără intrare aici afișează doar
//  explicația generală (exp). Se poate completa progresiv, pe capitole.
// ============================================================================

export const WHY = {
  // --- Sisteme de Operare ---
  'SO-2': ['', 'CPU și memoria sunt componente hardware, nu părți software ale SO.', 'Sunt dispozitive de intrare/ieșire, nu componente ale SO.', 'Sunt unelte de dezvoltare, nu componente ale SO.'],
  'SO-8': ['Aceasta CHIAR este o funcție a SO — deci nu e răspunsul căutat.', 'Și aceasta este o funcție reală a SO.', '', 'Și aceasta este o funcție reală a SO (operații I/O).'],
  'SO-22': ['Există o diferență clară: dinamic vs. static.', '', 'Viteza nu definește diferența proces/program.', 'Incorect: procesul e program ÎN execuție, programul e descrierea statică.'],
  'SO-24': ['Zona de cod conține instrucțiuni mașină, nu variabile dinamice.', '', 'Stiva ține variabile locale și apeluri de funcții, nu alocări dinamice.', 'Zona globală ține variabile statice/globale, încărcate la pornire.'],
  'SO-37': ['READ/WRITE sunt operații de fișier/IO, nu pe semafoare.', '', 'OPEN/CLOSE sunt operații pe fișiere.', 'PUSH/POP sunt operații pe stivă.'],
  'SO-45': ['', 'Ștergerea proceselor nu rezolvă accesul concurent.', 'Memoria în plus nu garantează acces exclusiv.', 'Nu poți „dezactiva CPU" pentru sincronizare.'],
  'SO-67': ['', 'Aceea e tendința Best-Fit (lasă cel mai puțin spațiu), nu Worst-Fit.', 'Worst-Fit alocă — doar alege zona cea mai mare.', 'Aceea descrie First-Fit.'],
  'SO-70': ['FIFO scoate cea mai VECHE pagină, nu cea mai recentă.', '', 'Dimensiunea paginii nu contează la FIFO.', 'FIFO nu e aleator — urmează ordinea încărcării.'],
  'SO-72': ['LRU scoate cea mai PUȚIN folosită recent, nu cea mai des folosită.', '', 'Aceea e FIFO (prima încărcată).', 'La varianta cu contor se scoate valoarea cea mai MICĂ, nu cea mai mare.'],

  // --- Tehnologii Web ---
  'WEB-2': ['<I> = italic.', '', '<U> = text subliniat.', '<P> = paragraf nou.'],
  'WEB-7': ['// este comentariu în JavaScript/C, nu în HTML.', '', '/* */ este comentariu în CSS/JS.', '# este comentariu în alte limbaje (ex. Python).'],
  'WEB-42': ['Inline (style="...") este un loc VALID pentru CSS.', 'În <style>, în pagină, este valid.', 'Fișierul extern .css este chiar metoda recomandată.', ''],
  'WEB-51': ['<span> e inline; <div> NU e inline.', '', '<div> nu e o imagine.', '<div> nu e un formular.'],

  // --- Baze de Date ---
  'BD-2': ['BD orientate pe obiecte sunt o nișă.', '', 'BD grafice sunt o nișă (relații complexe).', '„Distribuită" se referă la amplasare, nu la model; cel mai răspândit model e cel relațional.'],
  'BD-3': ['Nu „Simple" — S vine de la Structured.', '', 'Nu e despre „Quality".', 'Nu „Sequential Logic".'],
  'BD-22': ['Nu viteza este motivul.', '', 'Nu sunt identice: WHERE filtrează rânduri, HAVING filtrează grupuri.', 'Ordonarea se face cu ORDER BY, nu cu HAVING.'],

  // --- Rețele ---
  'RET-14': ['Layer 2 este switch-ul (folosește MAC), nu routerul.', '', 'Layer 1 e fizic (cabluri/hub).', 'Layer 7 e aplicație (ex. DNS).'],
  'RET-15': ['Layer 3 este routerul (folosește IP).', '', 'Layer 4 e transport (TCP/UDP).', 'Layer 1 e fizic.'],
  'RET-31': ['4 niveluri are modelul TCP/IP, nu OSI.', '', 'Nu 5.', 'Nu 6.'],
  'RET-61': ['80 = HTTP.', '443 = HTTPS.', '', '110 = POP3.'],

  // --- Algoritmi & POO ---
  'ALG-7': ['Există diferențe clare între ele.', '', 'Interfața NU poate fi instanțiată.', 'Clasa abstractă SE poate (și trebuie) moșteni.'],
  'ALG-9': ['FIFO este coada, nu stiva.', '', 'Stiva nu permite acces aleator.', 'Stiva nu este sortată.'],
  'ALG-10': ['LIFO este stiva, nu coada.', '', 'Coada nu e acces direct.', 'Coada nu e aleatoare.'],
  'ALG-17': ['O(n) este căutarea liniară.', '', 'O(n²) e prea mult (ex. sortări naive).', 'O(1) ar fi acces direct, nu căutare.'],
}
