// ============================================================================
//  SUBIECTE DESCHISE / APLICATE — în formatul examenului real de licență.
//  (teorie, SQL, cod HTML/JS, algoritmică, POO). Fiecare are o rezolvare model
//  pe care o dezvălui după ce te gândești singur (flashcard cu auto-evaluare).
//
//  Soluția e stocată ca „blocuri" ca să randăm corect text + cod + liste:
//    { t:'p', v:'paragraf' } | { t:'h', v:'subtitlu' }
//    { t:'ul', v:['item', ...] } | { t:'code', v:`cod multi-linie` }
// ============================================================================

export const SECTIONS = [
  { id: 'SO', name: 'Sisteme de Operare', color: '#b39ddb' },
  { id: 'BD', name: 'Baze de Date', color: '#82c79b' },
  { id: 'Retele', name: 'Rețele', color: '#d6a45c' },
  { id: 'Web', name: 'Tehnologii Web', color: '#6fb7c9' },
  { id: 'Algo', name: 'Algoritmi & POO', color: '#d28fa6' },
]

export const TYPE_LABEL = {
  theory: 'Teorie',
  sql: 'SQL',
  code: 'Cod',
  algo: 'Algoritmică',
  oop: 'POO',
}

export const EXERCISES = [
  // ===================== SISTEME DE OPERARE =====================
  {
    id: 'EX-SO-1', section: 'SO', type: 'theory',
    title: 'Conceptul de proces (și diferența față de program)',
    prompt: 'Definiți conceptul de proces. Care sunt factorii necesari creării unui proces și care este diferența dintre proces și program?',
    blocks: [
      { t: 'p', v: 'Un proces (task) este un program în execuție — un calcul ce poate fi executat concurent cu alte calcule.' },
      { t: 'h', v: 'Factorii necesari creării unui proces:' },
      { t: 'ul', v: ['un set de instrucțiuni (algoritmul de executat);', 'un procesor care să execute instrucțiunile;', 'un mediu (memorie, periferice) asupra căruia acționează procesorul.'] },
      { t: 'h', v: 'Proces vs. program:' },
      { t: 'ul', v: ['Procesul are caracter DINAMIC — o secvență de activități în curs de execuție.', 'Programul are caracter STATIC — doar descrie acea secvență de activități.'] },
    ],
  },
  {
    id: 'EX-SO-2', section: 'SO', type: 'theory',
    title: 'Reprezentarea în memorie a unui proces cu 2 fire de execuție',
    prompt: 'Construiți schema de reprezentare în memorie a unui proces cu două thread-uri și descrieți rolul fiecărei zone.',
    blocks: [
      { t: 'p', v: 'Zone comune procesului: cod, date globale, heap. Zone proprii FIECĂRUI thread: stivă + context.' },
      { t: 'code', v: `+-----------------------------+
|  Context proces             |
+-----------------------------+
|  Cod (instrucțiuni mașină)  |  <- comun
+-----------------------------+
|  Date globale (statice)     |  <- comun
+-----------------------------+
|  Heap (alocare dinamică)    |  <- comun
+-----------------------------+
|  Stiva thread 1 | Context 1 |  <- propriu thread-ului 1
|  Stiva thread 2 | Context 2 |  <- propriu thread-ului 2
+-----------------------------+` },
      { t: 'ul', v: [
        'Cod: instrucțiunile mașină ale programului; PC indică următoarea instrucțiune.',
        'Date globale: constantele și variabilele globale (vizibile peste tot).',
        'Heap: variabile alocate dinamic, cu durată de viață controlată de programator.',
        'Stivă (per thread): parametrii, adresa de revenire și variabilele locale la apeluri de funcții.',
        'Context (per thread): starea execuției (registre PC, SP etc.), comun parțial cu procesul părinte.',
      ] },
    ],
  },
  {
    id: 'EX-SO-3', section: 'SO', type: 'theory',
    title: 'Semafor: definiție + wait (P) și signal (V) în pseudocod',
    prompt: 'Definiți conceptul de semafor și scrieți implementarea în pseudocod a operațiilor indivizibile wait (P) și signal (V).',
    blocks: [
      { t: 'p', v: 'Un semafor s = pereche (v(s), c(s)): v(s) este o valoare întreagă, c(s) este coada de procese care așteaptă. Operațiile P și V sunt indivizibile (atomice).' },
      { t: 'code', v: `wait(s):              // P(s)
    v(s) = v(s) - 1
    if v(s) < 0 then
        blochează procesul curent
        adaugă-l în coada c(s)

signal(s):            // V(s)
    v(s) = v(s) + 1
    if v(s) <= 0 then
        scoate un proces P din c(s)
        deblochează (trezește) procesul P` },
    ],
  },
  {
    id: 'EX-SO-4', section: 'SO', type: 'theory',
    title: 'Problema secțiunii critice (rezolvare cu semafor)',
    prompt: 'Enunțați problema secțiunii critice și rezolvați excluderea mutuală cu ajutorul unui semafor.',
    blocks: [
      { t: 'p', v: 'Secțiunea critică = secvență de instrucțiuni ce nu poate fi executată simultan de mai multe procese. Cerințe: la un moment dat cel mult un proces în SC; un proces care cere o SC ocupată o primește doar după eliberare; niciun proces nu așteaptă indefinit.' },
      { t: 'p', v: 'Soluție cu un semafor de excludere mutuală s, inițializat cu v0(s) = 1:' },
      { t: 'code', v: `semafor s = 1

Proces Pi (i = 1..n):
    repetă
        P(s)              // intrare în secțiunea critică
        < secțiune critică >
        V(s)              // ieșire din secțiunea critică
        < secțiune ne-critică >
    până la infinit` },
      { t: 'p', v: 'Deoarece v(s) ≤ 1, un singur proces trece de P(s) fără a fi blocat; restul așteaptă în coadă până la V(s).' },
    ],
  },
  {
    id: 'EX-SO-5', section: 'SO', type: 'theory',
    title: 'Problema producător–consumator (cu semafoare)',
    prompt: 'Enunțați problema producătorului și consumatorului și dați rezolvarea cu semafoare (buffer de N poziții).',
    blocks: [
      { t: 'p', v: 'Un producător adaugă elemente într-un buffer comun de N poziții, un consumator le scoate. Trebuie sincronizat accesul: consumatorul nu consumă din buffer gol, producătorul nu produce în buffer plin, iar accesul la buffer este exclusiv.' },
      { t: 'code', v: `semafor mutex = 1     // excludere mutuală la buffer
semafor gol   = N     // poziții libere
semafor plin  = 0     // poziții ocupate

Producător:               Consumator:
  repetă                    repetă
    produce element           P(plin)
    P(gol)                    P(mutex)
    P(mutex)                  scoate element din buffer
    pune element în buffer    V(mutex)
    V(mutex)                  V(gol)
    V(plin)                   consumă element` },
    ],
  },
  {
    id: 'EX-SO-6', section: 'SO', type: 'theory',
    title: 'Politici de plasare — aplicație (First/Best/Worst-Fit)',
    prompt: 'Un program necesită 1MB. Zonele libere sunt: Z1 = 2MB, Z2 = 5MB, Z3 = 1.5MB. Unde se plasează programul după First-Fit, Best-Fit și Worst-Fit?',
    blocks: [
      { t: 'ul', v: [
        'First-Fit (prima potrivire): prima zonă suficient de mare → Z1 (2MB). Rămân 1MB liber.',
        'Best-Fit (cea mai bună potrivire): zona care lasă cel mai puțin spațiu liber → Z3 (1.5MB). Rămân 0.5MB.',
        'Worst-Fit (cea mai rea potrivire): zona care lasă cel mai mult spațiu liber → Z2 (5MB). Rămân 4MB.',
      ] },
      { t: 'p', v: 'Politicile de plasare rezolvă întrebarea UNDE? se încarcă programul, în cazul alocării cu partiții variabile.' },
    ],
  },
  {
    id: 'EX-SO-7', section: 'SO', type: 'theory',
    title: 'Sistemul de întreruperi',
    prompt: 'Explicați conceptul de întrerupere, modul de tratare și clasificarea întreruperilor.',
    blocks: [
      { t: 'p', v: 'O întrerupere este un semnal care suspendă temporar execuția programului curent pentru a trata un eveniment, după care execuția se reia din punctul întrerupt.' },
      { t: 'h', v: 'Tratare (pe scurt):' },
      { t: 'ul', v: ['se salvează contextul (registre, PC);', 'se identifică sursa și se execută rutina de tratare (handler);', 'se restaurează contextul și se reia execuția.'] },
      { t: 'h', v: 'Clasificare:' },
      { t: 'ul', v: ['Hardware (externe) — de la periferice/echipamente;', 'Software — provocate intenționat de program (apeluri sistem);', 'Excepționale — erori în execuție (împărțire la 0, acces invalid).'] },
    ],
  },

  // ===================== BAZE DE DATE =====================
  {
    id: 'EX-BD-1', section: 'BD', type: 'sql',
    title: 'SELECT cu filtrare și ordonare (ANGAJATI)',
    prompt: 'Tabela ANGAJATI(id_angajat, Nume, Functie, Departament, Salariu, Data_angajare). Scrieți comanda SQL care afișează toți angajații din departamentul "IT" cu salariul peste 5000, ordonați descrescător după salariu.',
    blocks: [
      { t: 'code', v: `SELECT *
FROM ANGAJATI
WHERE Departament = 'IT' AND Salariu > 5000
ORDER BY Salariu DESC;` },
    ],
  },
  {
    id: 'EX-BD-2', section: 'BD', type: 'sql',
    title: 'INSERT corect (cu listă de coloane)',
    prompt: 'Inserați un angajat nou: Nume "Ion Popescu", Functie "Programator", Departament "IT", Salariu 8500, Data_angajare 01.06.2024 (id_angajat este auto-increment).',
    blocks: [
      { t: 'code', v: `INSERT INTO ANGAJATI (Nume, Functie, Departament, Salariu, Data_angajare)
VALUES ('Ion Popescu', 'Programator', 'IT', 8500, '2024-06-01');` },
      { t: 'p', v: 'Nu se trece id_angajat (este auto-increment). Lista de coloane trebuie să corespundă, ca ordine, listei de valori.' },
    ],
  },
  {
    id: 'EX-BD-3', section: 'BD', type: 'sql',
    title: 'Agregare cu SUM și filtrare pe lună (REALIZARI)',
    prompt: 'Tabela REALIZARI(cod_masina, cod_produs, produs, cant, pret, nr_bon, data_realiz, angajat). Aflați cantitatea totală realizată din produsul "pivot" în luna februarie.',
    blocks: [
      { t: 'code', v: `SELECT SUM(cant) AS cantitate_totala
FROM REALIZARI
WHERE produs = 'pivot' AND MONTH(data_realiz) = 2;` },
    ],
  },
  {
    id: 'EX-BD-4', section: 'BD', type: 'sql',
    title: 'GROUP BY pe mai multe coloane (REALIZARI)',
    prompt: 'În tabela REALIZARI, aflați numărul de produse "pivot" executate pe fiecare mașină în ziua de 28/02/2017, împreună cu numele angajatului.',
    blocks: [
      { t: 'code', v: `SELECT cod_masina, angajat, SUM(cant) AS nr_produse
FROM REALIZARI
WHERE produs = 'pivot' AND data_realiz = '2017-02-28'
GROUP BY cod_masina, angajat;` },
    ],
  },
  {
    id: 'EX-BD-5', section: 'BD', type: 'theory',
    title: 'Securitatea datelor + 4 mecanisme',
    prompt: 'Explicați ce înseamnă securitatea datelor într-o bază de date și descrieți patru mecanisme concrete prin care este realizată.',
    blocks: [
      { t: 'p', v: 'Securitatea datelor = protejarea bazei de date împotriva accesului neautorizat, a modificărilor/ștergerilor accidentale sau rău-intenționate și asigurarea confidențialității, integrității și disponibilității datelor.' },
      { t: 'h', v: 'Patru mecanisme concrete:' },
      { t: 'ul', v: [
        'Autentificare — verificarea identității utilizatorului (utilizator + parolă).',
        'Autorizare / drepturi de acces — roluri și privilegii prin GRANT / REVOKE (cine ce poate face).',
        'Criptarea datelor — la stocare și/sau în tranzit, ca să nu poată fi citite dacă sunt interceptate.',
        'Backup și jurnalizare (log) — copii de siguranță + istoricul operațiilor pentru recuperare și audit.',
      ] },
      { t: 'p', v: 'Bonus: constrângeri de integritate (PRIMARY KEY, FOREIGN KEY, CHECK) și gestiunea tranzacțiilor (ACID).' },
    ],
  },

  // ===================== REȚELE =====================
  {
    id: 'EX-RET-1', section: 'Retele', type: 'theory',
    title: 'Switch: definiție, rol, avantaje față de hub',
    prompt: 'Pentru un dispozitiv de tip Switch precizați: definiția, rolul într-o rețea și avantajele folosirii unui switch în locul unui hub.',
    blocks: [
      { t: 'p', v: 'Definiție: un switch este un dispozitiv de rețea de nivel 2 (legătură de date) care conectează mai multe dispozitive într-o rețea locală (LAN) și comută cadrele folosind adresele MAC.' },
      { t: 'p', v: 'Rol: primește cadrele, citește adresa MAC destinație și le transmite DOAR către portul corect, gestionând eficient traficul în LAN.' },
      { t: 'h', v: 'Avantaje față de hub:' },
      { t: 'ul', v: [
        'Trimite cadrul doar către destinatar (hub-ul îl trimite la toate porturile) → mai puțină congestie.',
        'Fiecare port are propriul domeniu de coliziune → elimină coliziunile.',
        'Folosește lățimea de bandă mai eficient și permite full-duplex.',
        'Securitate mai bună (datele nu ajung la toate dispozitivele).',
      ] },
    ],
  },
  {
    id: 'EX-RET-2', section: 'Retele', type: 'theory',
    title: 'Modelul OSI — cele 7 niveluri',
    prompt: 'Enumerați cele 7 niveluri ale modelului OSI (de jos în sus) și precizați pe scurt rolul fiecăruia.',
    blocks: [
      { t: 'ul', v: [
        '1. Fizic (Physical) — transmiterea biților prin mediul fizic (cabluri, semnale).',
        '2. Legătură de date (Data Link) — încapsularea în cadre, adrese MAC, Ethernet, switch-uri.',
        '3. Rețea (Network) — rutarea între rețele, adrese IP, routere.',
        '4. Transport — TCP/UDP, porturi, controlul fluxului și al erorilor.',
        '5. Sesiune (Session) — stabilirea/întreținerea sesiunilor de comunicație.',
        '6. Prezentare (Presentation) — formatarea, criptarea, codificarea datelor.',
        '7. Aplicație (Application) — serviciile pentru aplicații (HTTP, DNS, FTP).',
      ] },
    ],
  },
  {
    id: 'EX-RET-3', section: 'Retele', type: 'theory',
    title: 'IP public vs IP privat + NAT',
    prompt: 'Care este diferența dintre o adresă IP publică și una privată? Ce rol are NAT?',
    blocks: [
      { t: 'ul', v: [
        'IP public — unic la nivel global, rutabil pe internet, gestionat de IANA, costă bani la înregistrare.',
        'IP privat — folosit în rețele locale, nerutabil direct pe internet; aceleași IP-uri pot fi reutilizate în rețele diferite; gestionat de administratorul rețelei.',
      ] },
      { t: 'p', v: 'NAT (Network Address Translation) traduce adresele private în adresa publică a routerului, permițând mai multor dispozitive dintr-o rețea privată să acceseze internetul folosind o singură adresă IP publică.' },
    ],
  },
  {
    id: 'EX-RET-4', section: 'Retele', type: 'theory',
    title: 'Topologii de rețea',
    prompt: 'Descrieți topologiile magistrală (bus), stea (star), inel (ring) și plasă (mesh), cu un avantaj/dezavantaj pentru fiecare.',
    blocks: [
      { t: 'ul', v: [
        'Magistrală (bus): un cablu comun cu terminatori. + simplă, ieftină; − o defecțiune pe cablu afectează toată rețeaua.',
        'Stea (star): nod central (switch/router). + ușor de administrat, o stație picată nu afectează restul; − dependentă de nodul central.',
        'Inel (ring): stații legate în cerc, token passing. + acces ordonat; − defectarea unui nod afectează întreaga rețea.',
        'Plasă (mesh): fiecare nod legat de toate. + redundanță mare (rezistă la legături picate); − cost și cablare ridicate.',
      ] },
    ],
  },

  // ===================== TEHNOLOGII WEB =====================
  {
    id: 'EX-WEB-1', section: 'Web', type: 'code',
    title: 'Formular HTML (cu label și semantic)',
    prompt: 'Realizați un formular HTML care conține cel puțin: un câmp nume (text), un câmp e-mail, o listă de selecție (ex. oraș) și un buton de trimitere (submit). Folosiți etichete <label> pentru accesibilitate.',
    blocks: [
      { t: 'code', v: `<form action="/trimite" method="post">
  <label for="nume">Nume:</label>
  <input type="text" id="nume" name="nume">

  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email">

  <label for="oras">Oraș:</label>
  <select id="oras" name="oras">
    <option value="sb">Sibiu</option>
    <option value="cj">Cluj</option>
    <option value="bv">Brașov</option>
  </select>

  <button type="submit">Trimite</button>
</form>` },
      { t: 'p', v: 'Fiecare câmp are <label for="..."> legat de id-ul controlului → accesibilitate și click pe etichetă activează câmpul.' },
    ],
  },
  {
    id: 'EX-WEB-2', section: 'Web', type: 'code',
    title: 'Cod JavaScript: writeln, alert, getElementById + innerHTML',
    prompt: 'Scrieți cod JavaScript care: (1) afișează în pagină rezultatul unei operații matematice cu document.writeln; (2) afișează un mesaj într-un alert; (3) modifică textul unui element existent folosind getElementById și innerHTML. Explicați ce face fiecare.',
    blocks: [
      { t: 'code', v: `<p id="mesaj">Text inițial</p>

<script>
  // (1) scrie rezultatul în pagină
  document.writeln("Suma: " + (5 + 3));   // afișează: Suma: 8

  // (2) fereastră de alertă
  alert("Bun venit la examen!");

  // (3) modifică conținutul elementului cu id="mesaj"
  document.getElementById("mesaj").innerHTML = "Text modificat din JS";
</script>` },
      { t: 'ul', v: [
        'document.writeln scrie "Suma: 8" direct în documentul HTML.',
        'alert(...) deschide o cutie de dialog cu mesajul.',
        'getElementById("mesaj") selectează paragraful, iar innerHTML îi înlocuiește conținutul cu „Text modificat din JS".',
      ] },
    ],
  },
  {
    id: 'EX-WEB-3', section: 'Web', type: 'code',
    title: 'Definirea funcțiilor în JavaScript (cu exemplu)',
    prompt: 'Explicați cum se definește o funcție în JavaScript și dați un exemplu de funcție cu parametri care returnează o valoare și este apelată.',
    blocks: [
      { t: 'p', v: 'O funcție se definește cu cuvântul cheie function, urmat de nume, lista de parametri și corpul între acolade. Poate returna o valoare cu return.' },
      { t: 'code', v: `// definire
function aduna(a, b) {
  return a + b;
}

// apel
var rezultat = aduna(5, 3);   // 8
document.writeln(rezultat);

// funcție anonimă atașată unui eveniment
document.getElementById("btn").onclick = function() {
  alert("Ai apăsat butonul!");
};` },
    ],
  },
  {
    id: 'EX-WEB-4', section: 'Web', type: 'code',
    title: 'Tabel HTML cu antet',
    prompt: 'Scrieți codul HTML pentru un tabel cu un antet (Nume, Vârstă) și două rânduri de date.',
    blocks: [
      { t: 'code', v: `<table border="1">
  <caption>Persoane</caption>
  <tr>
    <th>Nume</th>
    <th>Vârstă</th>
  </tr>
  <tr>
    <td>Ana</td>
    <td>22</td>
  </tr>
  <tr>
    <td>Bogdan</td>
    <td>24</td>
  </tr>
</table>` },
      { t: 'p', v: '<th> = cap de tabel (afișat îngroșat), <tr> = rând, <td> = celulă de date, <caption> = titlul tabelului.' },
    ],
  },

  // ===================== ALGORITMI & POO =====================
  {
    id: 'EX-ALG-1', section: 'Algo', type: 'oop',
    title: 'Modelare POO: ContBancar și ContEconomii',
    prompt: 'Modelați o clasă ContBancar (IBAN, titular, sold) cu metodele Depune(suma), Retrage(suma) -> bool, Detalii() -> string. Apoi o clasă derivată ContEconomii care adaugă rataDobanda și metodele AplicaDobanda(), RetragerePermisa(suma) -> bool (permisă doar dacă soldul rămâne ≥ 100) și DetaliiExtinse().',
    blocks: [
      { t: 'code', v: `class ContBancar {
    protected string IBAN;
    protected string titular;
    protected double sold;

    public void Depune(double suma) {
        sold += suma;
    }

    public bool Retrage(double suma) {
        if (suma > sold) return false;   // sold insuficient
        sold -= suma;
        return true;
    }

    public string Detalii() {
        return "IBAN: " + IBAN + ", titular: " + titular + ", sold: " + sold;
    }
}

class ContEconomii : ContBancar {       // extinde ContBancar
    private double rataDobanda;

    public void AplicaDobanda() {
        sold += sold * rataDobanda;
    }

    public bool RetragerePermisa(double suma) {
        if (sold - suma >= 100) {        // soldul rămâne >= 100
            sold -= suma;
            return true;
        }
        return false;
    }

    public string DetaliiExtinse() {
        return Detalii() + ", rata dobânzii: " + rataDobanda;
    }
}` },
      { t: 'p', v: 'ContEconomii moștenește IBAN/titular/sold și metodele de bază (Depune/Retrage/Detalii) și le extinde cu comportament specific.' },
    ],
  },
  {
    id: 'EX-ALG-2', section: 'Algo', type: 'oop',
    title: 'POO: clasă vs obiect, abstract vs interfață, genericitate',
    prompt: 'Explicați și exemplificați: (a) diferența dintre o clasă și un obiect; (b) diferența dintre o clasă abstractă și o interfață; (c) genericitatea.',
    blocks: [
      { t: 'h', v: '(a) Clasă vs obiect' },
      { t: 'p', v: 'Clasa este tiparul/definiția; obiectul este o instanță concretă a clasei. Ex: clasa Masina; obiectul masina1 = new Masina().' },
      { t: 'h', v: '(b) Clasă abstractă vs interfață' },
      { t: 'ul', v: [
        'Clasă abstractă: poate avea stare (câmpuri) și metode parțial implementate; nu poate fi instanțiată direct; o clasă moștenește o singură clasă abstractă.',
        'Interfață: doar un contract (semnături de metode, fără implementare/stare); o clasă poate implementa mai multe interfețe.',
      ] },
      { t: 'h', v: '(c) Genericitate' },
      { t: 'p', v: 'Permite scrierea de cod parametrizat cu tipuri, reutilizabil și sigur la tipuri.' },
      { t: 'code', v: `class Stiva<T> {
    private List<T> elemente = new List<T>();
    public void Push(T x) { elemente.Add(x); }
    public T Pop() { /* ... */ }
}
// folosire: Stiva<int>, Stiva<string> — același cod, tipuri diferite` },
    ],
  },
  {
    id: 'EX-ALG-3', section: 'Algo', type: 'algo',
    title: 'Castel (matrice): camere libere izolate',
    prompt: 'Un castel este o matrice n×n: 0 = cameră blocată, 1 = cameră liberă. Scrieți o funcție care numără camerele libere care au ca vecini (sus/jos/stânga/dreapta) doar camere blocate.',
    blocks: [
      { t: 'code', v: `int numaraIzolate(int[][] M, int n) {
    int dx[] = {-1, 1, 0, 0};
    int dy[] = {0, 0, -1, 1};
    int count = 0;

    for (int i = 0; i < n; i++)
      for (int j = 0; j < n; j++) {
        if (M[i][j] != 1) continue;        // ne interesează doar camerele libere
        bool izolata = true;
        for (int k = 0; k < 4; k++) {
            int ni = i + dx[k], nj = j + dy[k];
            if (ni >= 0 && ni < n && nj >= 0 && nj < n && M[ni][nj] == 1)
                izolata = false;           // are un vecin liber
        }
        if (izolata) count++;
      }
    return count;
}` },
      { t: 'p', v: 'Pentru fiecare cameră liberă verificăm cei (max) 4 vecini; dacă niciunul nu e liber, e izolată.' },
    ],
  },
  {
    id: 'EX-ALG-4', section: 'Algo', type: 'algo',
    title: 'Castel: există drum de evadare? (BFS/DFS)',
    prompt: 'Pentru aceeași matrice (0 = blocat, 1 = liber), verificați dacă există un drum de la (0,0) la (n-1,n-1), deplasându-vă sus/jos/stânga/dreapta doar prin camere libere.',
    blocks: [
      { t: 'code', v: `bool existaDrum(int[][] M, int n) {
    if (M[0][0] != 1 || M[n-1][n-1] != 1) return false;
    bool[][] vizitat = new bool[n][n];
    Queue<(int,int)> q = new Queue();
    q.enqueue((0,0)); vizitat[0][0] = true;
    int dx[] = {-1,1,0,0}, dy[] = {0,0,-1,1};

    while (!q.empty()) {
        (i, j) = q.dequeue();
        if (i == n-1 && j == n-1) return true;
        for (int k = 0; k < 4; k++) {
            int ni = i+dx[k], nj = j+dy[k];
            if (ni>=0 && ni<n && nj>=0 && nj<n
                && M[ni][nj]==1 && !vizitat[ni][nj]) {
                vizitat[ni][nj] = true;
                q.enqueue((ni,nj));
            }
        }
    }
    return false;
}` },
      { t: 'p', v: 'Folosim BFS (coadă) pornind din (0,0); dacă ajungem la (n-1,n-1), drumul există. DFS (recursiv) ar fi echivalent.' },
    ],
  },
  {
    id: 'EX-ALG-5', section: 'Algo', type: 'algo',
    title: 'Castel: cel mai scurt drum între două camere (BFS)',
    prompt: 'Scrieți o funcție care primește coordonatele a două camere libere și returnează lungimea celui mai scurt drum dintre ele (sau -1 dacă nu există).',
    blocks: [
      { t: 'code', v: `int celMaiScurtDrum(int[][] M, int n, (int,int) start, (int,int) stop) {
    bool[][] vizitat = new bool[n][n];
    Queue<(int,int,int)> q = new Queue();   // (i, j, distanță)
    q.enqueue((start.i, start.j, 0));
    vizitat[start.i][start.j] = true;
    int dx[] = {-1,1,0,0}, dy[] = {0,0,-1,1};

    while (!q.empty()) {
        (i, j, d) = q.dequeue();
        if (i == stop.i && j == stop.j) return d;
        for (int k = 0; k < 4; k++) {
            int ni = i+dx[k], nj = j+dy[k];
            if (ni>=0 && ni<n && nj>=0 && nj<n
                && M[ni][nj]==1 && !vizitat[ni][nj]) {
                vizitat[ni][nj] = true;
                q.enqueue((ni, nj, d+1));
            }
        }
    }
    return -1;   // nu există drum
}` },
      { t: 'p', v: 'BFS garantează că prima dată când atingem destinația avem distanța minimă (graf neponderat).' },
    ],
  },
  {
    id: 'EX-ALG-6', section: 'Algo', type: 'algo',
    title: 'Sortare prin interschimbare (Bubble Sort) + complexitate',
    prompt: 'Descrieți și scrieți algoritmul Bubble Sort pentru sortarea crescătoare a unui tablou. Care este complexitatea lui?',
    blocks: [
      { t: 'code', v: `void bubbleSort(int[] a, int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j+1]) {
                int tmp = a[j];
                a[j] = a[j+1];
                a[j+1] = tmp;       // interschimbare
            }
}` },
      { t: 'ul', v: [
        'Idee: la fiecare trecere, elementele mari „urcă" spre final prin interschimbări succesive.',
        'Complexitate: O(n²) în cazul mediu și cel mai rău; O(n) cu optimizare (flag) dacă tabloul e deja sortat.',
      ] },
    ],
  },
  {
    id: 'EX-ALG-7', section: 'Algo', type: 'algo',
    title: 'Recursivitate: factorial și Fibonacci',
    prompt: 'Scrieți, recursiv, funcția factorial(n) și funcția fibonacci(n). Marcați cazul de bază.',
    blocks: [
      { t: 'code', v: `int factorial(int n) {
    if (n <= 1) return 1;          // caz de bază
    return n * factorial(n - 1);   // pas recursiv
}

int fibonacci(int n) {
    if (n < 2) return n;           // caz de bază: fib(0)=0, fib(1)=1
    return fibonacci(n-1) + fibonacci(n-2);
}` },
      { t: 'p', v: 'Orice funcție recursivă are nevoie de un caz de bază (oprire) și de un pas care se apropie de el. Fibonacci recursiv naiv are complexitate exponențială O(2^n) — se poate optimiza cu memoizare.' },
    ],
  },

  // ===== SUBIECTE REALE adăugate din PDF-ul cu examene 2017–2022 (OCR/citire imagini) =====

  // --- Rețele (definiții/clasificări reale) ---
  {
    id: 'EX-RET-5', section: 'Retele', type: 'theory',
    title: 'Clasificarea rețelelor de calculatoare',
    prompt: 'Clasificați rețelele de calculatoare după: topologie, întinderea geografică și arhitectura pe niveluri de protocoale (TCP/IP). Dați exemple de 2 servicii Internet bazate pe TCP. (Februarie 2017)',
    blocks: [
      { t: 'ul', v: [
        'După topologie: magistrală (bus), stea, inel, plasă (mesh), mixtă.',
        'După întinderea geografică: PAN, LAN, MAN, WAN.',
        'După mediul de transmisie: cupru (cabluri torsadate/coaxiale), fibră optică, wireless.',
        'După arhitectura pe niveluri: modelul TCP/IP — 4 niveluri (Acces la rețea, Internet, Transport, Aplicație).',
      ] },
      { t: 'p', v: 'Servicii Internet bazate pe TCP (orientat pe conexiune): HTTP/HTTPS (web), FTP (transfer de fișiere), SMTP (e-mail). Exemple cerute: HTTP și FTP.' },
    ],
  },
  {
    id: 'EX-RET-6', section: 'Retele', type: 'theory',
    title: 'Definiții de rețea (bridge, router, MAC, IP, DNS, DHCP)',
    prompt: 'Definiți: (a) bridge și router; (b) adresa MAC și adresa IP; (c) server DNS și server DHCP. (Iulie 2017 / 2018)',
    blocks: [
      { t: 'ul', v: [
        'Bridge: dispozitiv de nivel 2 care leagă două segmente LAN și filtrează traficul după adrese MAC. Router: dispozitiv de nivel 3 care interconectează rețele diferite și rutează pachetele după adresa IP.',
        'Adresa MAC: adresă fizică unică pe 48 de biți a plăcii de rețea (nivel 2). Adresa IP: adresă logică (nivel 3) care identifică un dispozitiv într-o rețea/Internet.',
        'Server DNS: traduce nume de domeniu în adrese IP. Server DHCP: atribuie automat adrese IP (și alți parametri) dispozitivelor din rețea.',
      ] },
    ],
  },

  // --- POO teorie (real) ---
  {
    id: 'EX-ALG-8', section: 'Algo', type: 'theory',
    title: 'Constructori și destructori',
    prompt: 'Prezentați și exemplificați rolul constructorilor și destructorilor în programarea orientată pe obiect. (Februarie 2017 / Iulie 2018)',
    blocks: [
      { t: 'ul', v: [
        'Constructorul: metodă specială apelată automat la crearea obiectului; inițializează datele membre. Poate fi implicit (fără parametri), cu parametri sau de copiere.',
        'Destructorul: metodă specială apelată automat la distrugerea obiectului; eliberează resursele (memorie alocată dinamic, fișiere etc.).',
      ] },
      { t: 'code', v: `class Punct {
    double x, y;
public:
    Punct(double a = 0, double b = 0) { x = a; y = b; }   // constructor cu parametri impliciți
    ~Punct() { /* eliberează resurse, dacă există */ }     // destructor
};` },
    ],
  },
  {
    id: 'EX-ALG-9', section: 'Algo', type: 'theory',
    title: 'Polimorfism și funcții virtuale',
    prompt: 'Explicați și exemplificați conceptele de polimorfism și funcții virtuale. (Iulie 2017 / 2019, Februarie 2022)',
    blocks: [
      { t: 'p', v: 'Polimorfismul permite ca același apel de metodă să se comporte diferit în funcție de tipul concret al obiectului. În C++, se realizează prin funcții virtuale și pointeri/referințe la clasa de bază (legare dinamică).' },
      { t: 'code', v: `class Figura {
public:
    virtual double arie() = 0;   // funcție virtuală pură (abstractă)
};
class Cerc : public Figura {
    double r;
public:
    double arie() { return 3.14159 * r * r; }   // redefinire (override)
};
// Figura* f = new Cerc(); f->arie();  -> se apelează arie() din Cerc (polimorfism)` },
    ],
  },
  {
    id: 'EX-ALG-10', section: 'Algo', type: 'theory',
    title: 'Moștenirea simplă',
    prompt: 'Definiți conceptul de moștenire simplă: structura ierarhică a procesului de moștenire și controlul accesului la membrii moșteniți. (Iulie 2021)',
    blocks: [
      { t: 'p', v: 'Moștenirea simplă: o clasă derivată preia membrii unei singure clase de bază și îi poate extinde/redefini. Formează o ierarhie (bază → derivată).' },
      { t: 'ul', v: [
        'Membrii public: rămân accesibili în derivată și din exterior.',
        'Membrii protected: accesibili în derivată, dar nu din exterior.',
        'Membrii private: NU sunt accesibili direct în clasa derivată (doar prin metode publice/protejate ale bazei).',
      ] },
    ],
  },

  // --- POO ierarhii (real) ---
  {
    id: 'EX-ALG-11', section: 'Algo', type: 'oop',
    title: 'Ierarhie StrBuffer → StrStiva (stivă de stringuri)',
    prompt: 'Construiți: clasa de bază StrBuffer (cu un tablou de stringuri) cu metodele protected adaugaString(s, poz) și elimString(poz); și clasa StrStiva derivată, cu push(s) și pop() (pop returnează null dacă stiva e vidă). (Februarie 2017)',
    blocks: [
      { t: 'code', v: `class StrBuffer {
protected:
    String[] t;  int n = 0;            // tablou de stringuri + nr. elemente
    void adaugaString(String s, int poz) {
        for (int i = n; i > poz; i--) t[i] = t[i-1];
        t[poz] = s; n++;
    }
    String elimString(int poz) {
        String s = t[poz];
        for (int i = poz; i < n-1; i++) t[i] = t[i+1];
        n--;
        return s;
    }
}

class StrStiva extends StrBuffer {
    public void push(String s) { adaugaString(s, n); }   // adaugă în vârf
    public String pop() {
        if (n == 0) return null;                         // stivă vidă
        return elimString(n - 1);                        // scoate din vârf
    }
}` },
    ],
  },
  {
    id: 'EX-ALG-12', section: 'Algo', type: 'oop',
    title: 'Ierarhie Monom → Polinom',
    prompt: 'Construiți clasa Monom (coeficient real, grad întreg) cu MulCu(cst), Suma(m), Produs(m); și clasa Polinom (derivată) cu AdaugaMonom(m) — însumează coeficienții dacă gradul există deja — și Suma(p). (Iulie 2017)',
    blocks: [
      { t: 'code', v: `class Monom {
protected:
    double coef;  int grad;
public:
    Monom(double c = 0, int g = 0) { coef = c; grad = g; }
    Monom MulCu(double cst)  { return Monom(coef * cst, grad); }
    Monom Suma(Monom m)      { return Monom(coef + m.coef, grad); }   // același grad
    Monom Produs(Monom m)    { return Monom(coef * m.coef, grad + m.grad); }
};

class Polinom : public Monom {
    Monom[] m;  int nr = 0;
public:
    Polinom AdaugaMonom(Monom x) {
        for (int i = 0; i < nr; i++)
            if (m[i].grad == x.grad) { m[i] = m[i].Suma(x); return *this; }
        m[nr++] = x;                 // grad nou
        return *this;
    }
    Polinom Suma(Polinom p) {
        Polinom r = *this;
        for (int i = 0; i < p.nr; i++) r.AdaugaMonom(p.m[i]);
        return r;
    }
};` },
    ],
  },
  {
    id: 'EX-ALG-13', section: 'Algo', type: 'oop',
    title: 'Pereche → NrComplex (cu supraîncărcarea operatorilor)',
    prompt: 'Construiți clasa Pereche (două valori reale protejate, constructori cu parametri, două funcții care returnează prin referință câte un element); apoi clasa NrComplex derivată, cu supraîncărcarea operatorului + (adunarea a două numere complexe) și a operatorului = (atribuire). (Iulie 2021 / Februarie 2022)',
    blocks: [
      { t: 'code', v: `class Pereche {
protected:
    double a, b;
public:
    Pereche(double x = 0, double y = 0) { a = x; b = y; }
    double& Prima()  { return a; }      // returnează prin referință
    double& Adoua()  { return b; }
};

class NrComplex : public Pereche {
public:
    NrComplex(double re = 0, double im = 0) : Pereche(re, im) {}

    NrComplex operator+(const NrComplex& z) {           // adunare
        return NrComplex(a + z.a, b + z.b);
    }
    NrComplex& operator=(const NrComplex& z) {          // atribuire
        a = z.a; b = z.b;
        return *this;
    }
};` },
    ],
  },
  {
    id: 'EX-ALG-14', section: 'Algo', type: 'oop',
    title: 'Figuri geometrice (clase abstracte + polimorfism)',
    prompt: 'Folosind polimorfismul și clasele abstracte, construiți o ierarhie de clase pentru determinarea ariei și perimetrului figurilor geometrice în plan: cerc, dreptunghi și triunghi. (Februarie 2022)',
    blocks: [
      { t: 'code', v: `class Figura {                       // clasă abstractă
public:
    virtual double arie() = 0;
    virtual double perimetru() = 0;
};

class Cerc : public Figura {
    double r;
public:
    Cerc(double r) { this->r = r; }
    double arie()      { return 3.14159 * r * r; }
    double perimetru() { return 2 * 3.14159 * r; }
};

class Dreptunghi : public Figura {
    double L, l;
public:
    Dreptunghi(double L, double l) { this->L = L; this->l = l; }
    double arie()      { return L * l; }
    double perimetru() { return 2 * (L + l); }
};

class Triunghi : public Figura {       // laturile a, b, c
    double a, b, c;
public:
    Triunghi(double a, double b, double c) { this->a=a; this->b=b; this->c=c; }
    double perimetru() { return a + b + c; }
    double arie() {                    // formula lui Heron
        double s = (a + b + c) / 2;
        return sqrt(s*(s-a)*(s-b)*(s-c));
    }
};` },
      { t: 'p', v: 'Un pointer Figura* poate referi orice figură; apelul f->arie() se rezolvă polimorfic la metoda clasei concrete.' },
    ],
  },

  // --- Algoritmi & structuri de date (real) ---
  {
    id: 'EX-ALG-15', section: 'Algo', type: 'algo',
    title: 'Matrice de vecinătate a țărilor + colorarea hărții (backtracking)',
    prompt: 'O matrice V (n×n, simetrică, 0/1) memorează vecinătatea a n țări: V[i][j]=1 dacă țara i este vecină cu j (V[i][i]=0). (a) Construiți X[i] = numărul de vecini ai țării i. (b) Colorați harta cu maxim 4 culori a.î. două țări vecine să aibă culori diferite (backtracking). (Februarie 2017)',
    blocks: [
      { t: 'code', v: `// (a) numărul de vecini ai fiecărei țări
void vecini(int V[][N], int n, int X[]) {
    for (int i = 0; i < n; i++) {
        X[i] = 0;
        for (int j = 0; j < n; j++) X[i] += V[i][j];
    }
}

// (b) colorare cu max 4 culori (backtracking)
int col[N];                          // col[i] = culoarea țării i (1..4)

bool valid(int V[][N], int i, int c) {
    for (int j = 0; j < i; j++)
        if (V[i][j] == 1 && col[j] == c) return false;  // vecin cu aceeași culoare
    return true;
}

bool coloreaza(int V[][N], int n, int i) {
    if (i == n) return true;         // toate țările colorate -> soluție
    for (int c = 1; c <= 4; c++)
        if (valid(V, i, c)) {
            col[i] = c;
            if (coloreaza(V, n, i + 1)) return true;
            col[i] = 0;              // backtrack
        }
    return false;
}` },
      { t: 'p', v: 'Backtracking: se atribuie o culoare validă țării i și se continuă recursiv; dacă nu se poate completa, se revine (backtrack) și se încearcă altă culoare.' },
    ],
  },
  {
    id: 'EX-ALG-16', section: 'Algo', type: 'algo',
    title: 'Arbore binar de căutare: inserare + parcurgere în inordine',
    prompt: 'Definiți un arbore binar de căutare cu elemente numere naturale. Scrieți funcția de inserare a unui element și construiți arborele din elementele unui șir X. Apoi afișați elementele în ordine crescătoare (parcurgere în inordine). (Iulie 2017 / 2019)',
    blocks: [
      { t: 'code', v: `struct Nod {
    int val;
    Nod *st, *dr;
};

Nod* insereaza(Nod* rad, int x) {
    if (rad == NULL) {
        Nod* n = new Nod{ x, NULL, NULL };
        return n;
    }
    if (x < rad->val) rad->st = insereaza(rad->st, x);
    else              rad->dr = insereaza(rad->dr, x);
    return rad;
}

void inordine(Nod* rad) {            // afișare crescătoare
    if (rad == NULL) return;
    inordine(rad->st);
    afiseaza(rad->val);
    inordine(rad->dr);
}

// construire din șirul X: for (i) rad = insereaza(rad, X[i]);` },
    ],
  },
  {
    id: 'EX-ALG-17', section: 'Algo', type: 'algo',
    title: 'PuncteSpatiu: distanța maximă + sortare după x, y, z',
    prompt: 'Matricea PuncteSpatiu (n linii × 3 coloane) memorează coordonatele (x,y,z) ale unor puncte. (a) Determinați distanța maximă între două puncte. (b) Sortați crescător punctele după x, apoi (la x egal) după y, apoi după z. (Februarie 2019)',
    blocks: [
      { t: 'code', v: `// (a) distanța maximă
double distMax(double P[][3], int n) {
    double maxd = 0;
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++) {
            double d = sqrt(pow(P[i][0]-P[j][0],2)
                          + pow(P[i][1]-P[j][1],2)
                          + pow(P[i][2]-P[j][2],2));
            if (d > maxd) maxd = d;
        }
    return maxd;
}

// (b) sortare multi-cheie (x, apoi y, apoi z)
int compara(double a[3], double b[3]) {
    if (a[0] != b[0]) return a[0] - b[0];
    if (a[1] != b[1]) return a[1] - b[1];
    return a[2] - b[2];
}
// se folosește compara() într-un algoritm de sortare (ex. bubble/quick sort)` },
      { t: 'p', v: 'Sortarea folosește o comparație ierarhică: întâi x; la egalitate, y; la egalitate, z.' },
    ],
  },
  {
    id: 'EX-ALG-18', section: 'Algo', type: 'algo',
    title: 'Divide et Impera: căutare binară + suma numerelor prime',
    prompt: 'Explicați tehnica Divide et Impera. (a) Scrieți o funcție Divide-et-Impera care caută un element într-un șir ordonat (căutare binară). (b) Pentru un vector de întregi, calculați suma numerelor prime. (Februarie 2022)',
    blocks: [
      { t: 'p', v: 'Divide et Impera: se împarte problema în subprobleme de același tip, se rezolvă (recursiv) și se combină rezultatele.' },
      { t: 'code', v: `// (a) căutare binară (Divide et Impera) într-un șir ordonat
int cautBinar(int a[], int st, int dr, int x) {
    if (st > dr) return -1;            // nu există
    int m = (st + dr) / 2;
    if (a[m] == x) return m;
    if (x < a[m]) return cautBinar(a, st, m-1, x);
    else          return cautBinar(a, m+1, dr, x);
}

// (b) suma numerelor prime din vector
bool prim(int x) {
    if (x < 2) return false;
    for (int d = 2; d*d <= x; d++) if (x % d == 0) return false;
    return true;
}
int sumaPrime(int a[], int n) {
    int s = 0;
    for (int i = 0; i < n; i++) if (prim(a[i])) s += a[i];
    return s;
}` },
    ],
  },
  {
    id: 'EX-ALG-19', section: 'Algo', type: 'algo',
    title: 'Stivă dinamică (definire + inserare)',
    prompt: 'Definiți structura unei stive dinamice cu elemente numere naturale și principiul ei de funcționare. Scrieți o funcție care inserează (push) un element în stivă. (Februarie 2017)',
    blocks: [
      { t: 'p', v: 'Stiva (LIFO – Last In, First Out): ultimul element introdus este primul scos. Implementată dinamic ca listă înlănțuită, cu un pointer către vârf.' },
      { t: 'code', v: `struct Nod {
    int val;
    Nod* urm;
};

// push: inserează x în vârful stivei (varf = pointer către vârf)
void push(Nod*& varf, int x) {
    Nod* n = new Nod;
    n->val = x;
    n->urm = varf;     // noul nod arată spre vechiul vârf
    varf = n;          // vârful devine noul nod
}

// construire stivă din șirul X
// Nod* varf = NULL;  for (i) push(varf, X[i]);` },
    ],
  },

  // ===== LOT 2 — subiecte suplimentare (compuse, din materie) =====

  {
    id: 'EX-SO-8', section: 'SO', type: 'theory',
    title: 'Mecanisme de concurență: FORK-JOIN-QUIT vs PARBEGIN-PAREND',
    prompt: 'Descrieți cele două mecanisme de specificare a concurenței: FORK-JOIN-QUIT și PARBEGIN-PAREND. Care e avantajul/dezavantajul fiecăruia?',
    blocks: [
      { t: 'h', v: 'FORK-JOIN-QUIT' },
      { t: 'ul', v: [
        'FORK label — creează un proces fiu care rulează în paralel cu părintele.',
        'JOIN n, label — recombină n procese; la a n-a execuție sare la label.',
        'QUIT — termină procesul curent.',
        'Foarte puternic, dar intră în conflict cu programarea structurată (salturi de tip GOTO).',
      ] },
      { t: 'h', v: 'PARBEGIN-PAREND' },
      { t: 'ul', v: [
        'Instrucțiunile S1..Sn sunt lansate simultan și executate concurent; grupul se termină după cea mai lungă.',
        'Clar și lizibil (se potrivește limbajelor cu structură de bloc), dar mai puțin flexibil decât FORK-JOIN.',
      ] },
    ],
  },
  {
    id: 'EX-SO-9', section: 'SO', type: 'theory',
    title: 'Alocarea virtuală: paginată vs segmentată',
    prompt: 'Explicați alocarea paginată și alocarea segmentată: cum arată adresa, ce tabelă folosesc, avantaje și dezavantaje.',
    blocks: [
      { t: 'h', v: 'Paginată' },
      { t: 'ul', v: [
        'Adresa relocabilă = (p, d): p = nr. paginii virtuale, d = deplasament.',
        'Fiecare proces are o tabelă de pagini (TP); paginile au lungime fixă, putere a lui 2.',
        'Evită fragmentarea internă, permite cod reentrant.',
      ] },
      { t: 'h', v: 'Segmentată' },
      { t: 'ul', v: [
        'Adresa = (s, d): s = nr. segmentului, d = deplasament.',
        'Fiecare proces are o tabelă de segmente (TS); segmentele au lungimi diferite.',
        'Avantaj: segmente reentrante + protecție. Dezavantaj: fragmentare.',
      ] },
      { t: 'p', v: 'Soluția mixtă (segmentată și paginată) alocă fiecare segment paginat, eliminând fragmentarea.' },
    ],
  },
  {
    id: 'EX-SO-10', section: 'SO', type: 'theory',
    title: 'Politici de înlocuire a paginilor (NRU, FIFO, LRU)',
    prompt: 'Descrieți cele trei politici de înlocuire a paginilor: NRU, FIFO și LRU.',
    blocks: [
      { t: 'ul', v: [
        'NRU (Not Recently Used): folosește biții R (referire) și M (modificare) → 4 clase; se evacuează din clasa cea mai mică.',
        'FIFO (First In First Out): se evacuează cea mai veche pagină. Variantă: „a doua șansă" (testează bitul R).',
        'LRU (Least Recently Used): se evacuează pagina cel mai puțin recent folosită (prin numărător de accese sau matrice de referințe).',
      ] },
    ],
  },
  {
    id: 'EX-BD-6', section: 'BD', type: 'sql',
    title: 'UPDATE cu condiție',
    prompt: 'În tabela Reparatii, modificați tariful la 1500 pentru toate reparațiile la obiectul „calculator".',
    blocks: [
      { t: 'code', v: `UPDATE Reparatii
SET tarif = 1500
WHERE reparatie = 'calculator';` },
    ],
  },
  {
    id: 'EX-BD-7', section: 'BD', type: 'sql',
    title: 'Ștergere cu subcerere',
    prompt: 'Ștergeți din tabela Angajati angajații care au participat la reparațiile cu numerele 1 și 3 (id_reparatie = 1 sau 3).',
    blocks: [
      { t: 'p', v: 'Întâi verificăm cu SELECT, apoi ștergem folosind o subcerere:' },
      { t: 'code', v: `DELETE FROM Angajati
WHERE id_angajat IN (
    SELECT id_angajat FROM Reparatii
    WHERE id_reparatie = 1 OR id_reparatie = 3
);` },
    ],
  },
  {
    id: 'EX-BD-8', section: 'BD', type: 'theory',
    title: 'Tipuri de baze de date',
    prompt: 'Enumerați și descrieți pe scurt principalele tipuri de baze de date.',
    blocks: [
      { t: 'ul', v: [
        'Relaționale — date în tabele (rânduri/coloane), interogate cu SQL; cele mai răspândite.',
        'Non-relaționale (NoSQL) — date nestructurate/semi-structurate, modele flexibile.',
        'Orientate pe obiecte — informația sub formă de obiecte (ca în POO).',
        'Distribuite — fișiere în site-uri/locații diferite.',
        'Grafice — entități și relațiile dintre ele.',
        'OLTP — rapide, pentru un număr mare de tranzacții.',
        'Depozite de date (data warehouse) — depozit central pentru interogări și analize.',
      ] },
    ],
  },
  {
    id: 'EX-RET-7', section: 'Retele', type: 'theory',
    title: 'Modelul TCP/IP și comparația cu OSI',
    prompt: 'Descrieți cele 4 niveluri ale modelului TCP/IP și comparați-l cu modelul OSI.',
    blocks: [
      { t: 'ul', v: [
        '1. Acces la rețea — combină nivelurile Fizic și Legătură de date din OSI.',
        '2. Internet — transmiterea pachetelor și determinarea căii optime (protocolul IP).',
        '3. Transport — performanță, control flux, corectare erori (TCP orientat pe conexiune; UDP fără conexiune).',
        '4. Aplicație — combină nivelurile Aplicație, Prezentare și Sesiune din OSI.',
      ] },
      { t: 'p', v: 'Comparație: TCP/IP are mai puține niveluri (4 vs 7). Cu UDP, nivelul transport TCP/IP nu garantează livrarea, pe când nivelul transport OSI oferă încredere. OSI e folosit mai ales ca model didactic.' },
    ],
  },
  {
    id: 'EX-RET-8', section: 'Retele', type: 'theory',
    title: 'Pașii pentru Remote Desktop',
    prompt: 'Enumerați pașii necesari pentru a accesa un computer prin Remote Desktop din exterior.',
    blocks: [
      { t: 'ul', v: [
        '1. Activezi Remote Desktop pe computer (Proprietăți → fila „La distanță").',
        '2. Deschizi portul 3389 în Windows Firewall (reguli de intrare pentru Remote Desktop).',
        '3. Configurezi Port Forwarding în router pentru portul TCP 3389 (afli IP-ul/gateway-ul cu ipconfig).',
        '4. Mapezi IP-ul dinamic la un nume gazdă (DNS dinamic).',
        '5. Folosești o aplicație de Remote Desktop pentru a te conecta.',
      ] },
    ],
  },
  {
    id: 'EX-WEB-5', section: 'Web', type: 'code',
    title: 'Liste HTML (ordonată, neordonată, definiții)',
    prompt: 'Scrieți exemple de listă ordonată, listă neordonată și listă de definiții în HTML.',
    blocks: [
      { t: 'code', v: `<!-- Listă ordonată (numerotată) -->
<ol type="1">
  <li>Primul</li>
  <li>Al doilea</li>
</ol>

<!-- Listă neordonată -->
<ul type="circle">
  <li>Element</li>
  <li>Element</li>
</ul>

<!-- Listă de definiții -->
<dl>
  <dt>HTML</dt>
  <dd>Limbaj de marcare pentru pagini web.</dd>
</dl>` },
    ],
  },
  {
    id: 'EX-WEB-6', section: 'Web', type: 'code',
    title: 'CSS: selector de clasă și de ID',
    prompt: 'Arătați diferența dintre un selector de clasă și unul de ID în CSS, cu exemple de aplicare în HTML.',
    blocks: [
      { t: 'code', v: `<style>
  /* selector de clasă: se aplică oricăror elemente cu class="..." */
  .evidentiat { color: #d29e34; font-weight: bold; }

  /* selector de ID: se aplică UNUI element cu id="..." (unic) */
  #titlu { font-size: 24px; }
</style>

<h1 id="titlu">Titlu</h1>
<p class="evidentiat">Text evidențiat</p>
<span class="evidentiat">și acesta</span>` },
      { t: 'p', v: 'Clasa (.) se poate reutiliza pe mai multe elemente; ID-ul (#) e unic pe pagină.' },
    ],
  },
  {
    id: 'EX-WEB-7', section: 'Web', type: 'code',
    title: 'Cadre HTML (frameset cu două cadre)',
    prompt: 'Scrieți o pagină HTML cu două cadre verticale (20% și 80%), cu alternativă pentru browserele fără suport.',
    blocks: [
      { t: 'code', v: `<html>
<head><title>Exemplu cadre</title></head>
<frameset cols="20%,80%">
  <frame src="meniu.html" name="stanga">
  <frame src="continut.html" name="dreapta">
  <noframes>
    <body>Browserul folosit nu suportă cadre.</body>
  </noframes>
</frameset>
</html>` },
      { t: 'p', v: 'cols împarte pe verticală; <noframes> oferă conținut alternativ. O ancoră poate ținti un cadru cu target="dreapta".' },
    ],
  },
  {
    id: 'EX-ALG-20', section: 'Algo', type: 'algo',
    title: 'Căutare liniară și căutare binară',
    prompt: 'Scrieți funcția de căutare liniară (într-un șir oarecare) și funcția de căutare binară (într-un șir sortat). Precizați complexitățile.',
    blocks: [
      { t: 'code', v: `// căutare liniară — O(n)
int cautLiniar(int a[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (a[i] == x) return i;
    return -1;
}

// căutare binară (șir sortat) — O(log n)
int cautBinar(int a[], int n, int x) {
    int st = 0, dr = n - 1;
    while (st <= dr) {
        int m = (st + dr) / 2;
        if (a[m] == x) return m;
        if (x < a[m]) dr = m - 1;
        else          st = m + 1;
    }
    return -1;
}` },
    ],
  },
  {
    id: 'EX-ALG-21', section: 'Algo', type: 'oop',
    title: 'Încapsulare: clasă cu câmpuri private',
    prompt: 'Definiți o clasă Persoana cu câmpuri private (nume, vârstă) și metode publice de acces (get/set), respectând încapsularea.',
    blocks: [
      { t: 'code', v: `class Persoana {
private:
    string nume;
    int varsta;
public:
    Persoana(string n, int v) { nume = n; setVarsta(v); }

    string getNume() { return nume; }

    int getVarsta() { return varsta; }
    void setVarsta(int v) {
        if (v >= 0) varsta = v;   // validare — încapsulare
    }
};` },
      { t: 'p', v: 'Câmpurile sunt private (ascunse); accesul se face controlat prin metode publice, cu validare în setter.' },
    ],
  },
]

// Marcăm proveniența fiecărui subiect:
//   'real'   = dat la examene reale (pozele tale + PDF-ul cu examene 2017–2022)
//   'compus' = compus de mine, în același format, pentru acoperirea materiei
const REAL_IDS = new Set([
  'EX-SO-1', 'EX-SO-2', 'EX-SO-3', 'EX-SO-4', 'EX-SO-5', 'EX-SO-6', 'EX-SO-7',
  'EX-BD-3', 'EX-BD-4', 'EX-BD-5',
  'EX-RET-1', 'EX-RET-5', 'EX-RET-6',
  'EX-WEB-1', 'EX-WEB-2', 'EX-WEB-3',
  'EX-ALG-1', 'EX-ALG-2', 'EX-ALG-3', 'EX-ALG-4', 'EX-ALG-5',
  'EX-ALG-8', 'EX-ALG-9', 'EX-ALG-10', 'EX-ALG-11', 'EX-ALG-12', 'EX-ALG-13', 'EX-ALG-14',
  'EX-ALG-15', 'EX-ALG-16', 'EX-ALG-17', 'EX-ALG-18', 'EX-ALG-19',
])
for (const e of EXERCISES) e.source = REAL_IDS.has(e.id) ? 'real' : 'compus'
