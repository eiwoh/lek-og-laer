# Lek & Lær! 🦊

Et morsomt lærespill for barn (ca. 6–8 år) med matte- og leseutfordringer på norsk bokmål.
Bygget som en helt vanlig statisk nettside — ingen byggeverktøy, ingen avhengigheter.

## Spill

**🗺️ Eventyr**

Et kart som slynger seg gjennom fem land: 🌲 Eventyrskogen, 🏖️ Solstranda,
⛰️ Trollfjellet, ❄️ Isriket og 🌌 Stjernehimmelen. Reven står på neste post —
klar posten (minst halvparten riktig), så vandrer reven videre og neste post
låses opp. Hvert land avsluttes med en boss-post 👑, og den aller siste blander
spørsmål fra alle spillene. Postene bruker oppgaver fra de andre spillene med
stigende vanskelighet, og stjerner per post lagres i nettleseren.

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

**💰 Butikk-leken**

Lær om penger og priser i en liten butikk. Ting vises med prislapp i kroner.

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | To ting – hva koster mest? |
| 🐰 Middels | Tre ting – hva koster mest eller minst? |
| 🦉 Vanskelig | Har du råd? Legg sammen priser, og hvor mye får du igjen? |

**🎨 Tegne-leken**

Mal over en stor stiplet bokstav eller et tall med regnbuepensel (fungerer med
finger, mus og pekepenn). Runden på 4 tegninger fullføres når nesten hele
sjablongen er dekket; stjerne hvis man holder seg sånn passe innenfor streken.

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Store bokstaver (A–Å) |
| 🐰 Middels | Tallene 0–9 |
| 🦉 Vanskelig | Små bokstaver |

**✏️ Prikk til prikk**

Trykk på tallene i riktig rekkefølge, så tegnes strekene og et bilde dukker opp
(stjerne, hus, rakett, sommerfugl …). Stjerne hvis man ikke bommer på rekkefølgen.

| Nivå | Innhold |
|------|---------|
| 🐣 Lett | Tell 1, 2, 3 … (6–10 prikker, enkle figurer) |
| 🐰 Middels | Tell 1, 2, 3 … (10–16 prikker, vanskeligere figurer) |
| 🦉 Vanskelig | Hopptelling med 2, 5 og 10 |

Hver runde har 10 spørsmål (Tegne-leken og Prikk til prikk har 4, Regne-racer varer
ett minutt). Riktig svar på første forsøk gir en stjerne — feil svar er ufarlig, man
bare prøver igjen. Beste resultat per nivå lagres i nettleseren (localStorage).

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
