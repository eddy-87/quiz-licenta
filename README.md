# Quiz Licență 🎓

Aplicație web de tip quiz pentru pregătirea examenului de licență.
**216 întrebări** grilă hardcodate (Sisteme de Operare, Tehnologii Web, Baze de Date, Rețele),
generate din materia de examen. Funcționează **offline**, fără API-uri externe, cu progresul
salvat local în browser.

## Cum o pornești

Ai nevoie de Node.js (deja instalat portabil în `%LOCALAPPDATA%\node-portable` și adăugat în PATH).

```powershell
cd C:\Users\busoi\Desktop\exam-licenta
npm install      # doar prima dată (deja făcut)
npm run dev      # pornește serverul de dezvoltare
```

Apoi deschide adresa afișată în terminal (ex. http://localhost:5173).

Pentru o versiune finală, statică:

```powershell
npm run build    # generează folderul dist/
npm run preview  # servește build-ul de producție local
```

## Moduri de joc

- **Mod Normal** — întrebări în ordine aleatorie, variante amestecate, feedback imediat +
  explicații, animație la răspuns corect (confetti) și shake la răspuns greșit.
- **Mod Examen** — timp limitat (30/60/90 min), fără feedback până la final, scor detaliat pe capitole.
- **Mod Slab** — doar întrebările greșite de cel puțin 2 ori (recapitulare țintită).
- **Statistici** — cunoaștere pe capitole, streak, top 5 greșeli, grafic de progres în timp.

## Învățare (spaced repetition)

- Întrebările greșite apar de 2× mai des; cele greșite de 3+ ori, de 3× mai des.
- Întrebările corecte de 3+ ori consecutive apar mai rar.
- Progresul (istoric, streak, statistici) se păstrează în `localStorage` între sesiuni.

## Tehnologii

React + Vite · Tailwind CSS · Framer Motion · canvas-confetti. Zero API-uri externe, zero bază de date.

## Cazuri tratate

- `localStorage` plin/indisponibil → sesiune temporară cu avertisment vizibil.
- Progres corupt → detectare + resetare automată, cu mesaj către utilizator.
- Toate întrebările epuizate → continuă cu reluare ponderată (prioritizează greșelile).
- Ecrane foarte mici (<320px) → un element pe rând.
- Întrebări ambigue → câmp intern „de verificat" + indicator vizual subtil (momentan niciuna marcată).
