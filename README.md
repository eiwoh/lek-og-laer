# Lek & Lær! 🦊

Et morsomt lærespill for barn (ca. 6–8 år) med matte- og leseutfordringer på norsk bokmål.
Bygget som en helt vanlig statisk nettside — ingen byggeverktøy, ingen avhengigheter.

## Spill

**🔢 Matte-moro**

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Pluss og minus opp til 10, telling 3–8 |
| 🐰 Middels | Pluss og minus opp til 20, telling, tall som mangler (7 + _ = 12) |
| 🦉 Vanskelig | Tosifrede tall, hele tiere, gangetabellen for 2/5/10, tall som mangler |
| 🦁 Ekspert | Hele gangetabellen (2–10), deling (24 : 6), tosifret pluss/minus, faktor som mangler |
| 🚀 Superhjerne | Tre tall på rad (12 + 5 − 3), deling, dobbelt/halvparten, hele hundrere |

**⚡ Regne-racer**

Samme regnestykker som Matte-moro (alle 5 nivåer), men mot klokka: svar på så
mange du klarer på ett minutt. Feil svar koster bare tid. Beste antall lagres som rekord.

**🧩 Tall-mønster**

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Tell videre: +1, +2 og nedover −1 |
| 🐰 Middels | Hopp med 3, 5 og 10 — opp og ned |
| 🦉 Vanskelig | Dobling (3, 6, 12, 24), +4, oddetall, −5 og −10 |

**📖 Lese-leken**

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Korte ord: match bilde → ord og ord → bilde |
| 🐰 Middels | Lengre ord, bokstav som mangler |
| 🦉 Vanskelig | Lange ord, rimord og lesesetninger med spørsmål |

**🧠 Quiz-tid**

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Dyr, farger og hverdagsting |
| 🐰 Middels | Natur, kropp og kalender |
| 🦉 Vanskelig | Norge, verden og verdensrommet |

**🕐 Klokke-spillet**

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Hele timer («Klokka tre») |
| 🐰 Middels | Hele og halve timer («Halv fire») |
| 🦉 Vanskelig | Halve timer og kvarter («Kvart på fire») |

**🇬🇧 Engelsk**

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Bilde → engelsk ord (dyr og hverdagsting) |
| 🐰 Middels | Norsk ord → engelsk ord, farger og tall |
| 🦉 Vanskelig | Enkle quizspørsmål på engelsk |

Hver runde har 10 spørsmål (unntatt Regne-racer, som varer ett minutt). Riktig svar på
første forsøk gir en stjerne — feil svar er ufarlig, man bare prøver igjen. Beste resultat
per nivå lagres i nettleseren (localStorage).

## Kjøre spillet

Åpne `index.html` direkte i nettleseren (dobbeltklikk), eller kjør en liten server:

```bash
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Prosjektstruktur

```
index.html          Siden og bakgrunnsscenen
css/style.css       Alt av utseende og animasjoner
js/data.js          Ord, rim, setninger og tekster (legg til mer innhold her!)
js/questions.js     Spørsmålsgeneratorer per spill og nivå
js/game.js          Skjermer, spilltilstand og rendering
js/audio.js         Lydeffekter (WebAudio, ingen lydfiler)
js/confetti.js      Konfetti og gullregn på canvas
assets/fonts/       Baloo 2 (lokal font, ingen eksterne kall)
```

## Legge til innhold

Alt innhold ligger i `js/data.js`:

- **Nye ord**: legg til `{ w: 'ORD', e: '🐙' }` i `WORDS` — ordlengden avgjør automatisk
  hvilke nivåer som bruker ordet.
- **Nye rim**: legg til `{ q: 'SOL', a: 'STOL', d: ['KATT', 'FISK'] }` i `RHYMES`.
- **Nye setninger**: legg til `{ s: 'Setningen.', q: 'Spørsmål?', a: '🍎', d: ['🍌', '🎂'] }`
  i `SENTENCES`.
- **Nye quizspørsmål**: legg til `{ q: 'Spørsmål?', a: 'Riktig svar', d: ['Feil', 'Feil'], e: '🐋' }`
  i `TRIVIA[1]`, `TRIVIA[2]` eller `TRIVIA[3]` (nivået spørsmålet hører til).

## Publisering

Siden er statisk og kan legges rett ut på GitHub Pages, Netlify, Cloudflare Pages e.l. —
last opp hele mappen som den er.
