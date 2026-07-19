# Hvor går vi videre? 💡

Idébank for **Lek & Lær!** — hvor spillet kan vokse. Sortert etter hvor stor
verdi det gir barnet vs. hvor mye jobb det er. Alt her holder seg til premisset:
statisk nettside, ingen byggeverktøy, ingen avhengigheter, alt lagres lokalt.

Statusen i dag: 10 leker + Eventyr-kart, fem vanskelighetsnivåer, «Mitt utseende»
(tema + figur), stjerner per nivå. Nyeste tillegg: **Min samling** 🏆 — alle
stjerner du noen gang har fått teller sammen, låser opp pokaler og bonusfigurer.

---

## 🎁 Motivasjon & progresjon (høy verdi, gjenbruker det vi har)

Barnet har allerede stjerner overalt — vi kan få mye mer ut av dem.

- **Min samling 🏆 — GJORT.** Totalt stjernetall, pokal-milepæler og
  bonusfigurer som låses opp. Dette er motoren; alt under kan hekte seg på den.
- **Låse opp temaer og figurer med stjerner.** Bonusfigurene er på plass; gjør
  det samme med nye bakgrunner (f.eks. 🌈 Regnbue, 🎪 Sirkus, 🏰 Slott) som
  dukker opp når man passerer en milepæl.
- **Dagens oppdrag.** Én liten daglig utfordring («Klar 3 stjerner i Klokke-spillet
  i dag»). Enkelt å lage med en dato-seed i localStorage, gir en grunn til å
  komme tilbake hver dag.
- **Serie / «streak».** Tell dager på rad barnet har spilt — en liten 🔥-teller
  på menyen. Barn elsker å ikke miste serien.
- **Klistremerkebok.** Hver gang man fullfører noe perfekt, får man et
  klistremerke å lime inn på en side. Ren belønning, ingen læringskrav.

## 🕹️ Nye leker (høy verdi, mer arbeid)

Passer aldersgruppen 6–8 og lener seg på systemet som finnes.

- **Hukommelse / Memory.** Snu kort og finn par. Kan pares smart:
  bilde↔ord, tall↔antall prikker, norsk↔engelsk. Egen skjerm (rutenett med
  snubare kort), men selvstendig og veldig populær hos barn.
- **Stavelek.** Et bilde vises, og barnet bygger ordet ved å trykke bokstaver
  i riktig rekkefølge. Gjenbruker `WORDS` fra data.js rett av.
- **Former & mønster.** Dra/trykk for å fullføre et mønster (🔺🟦🔺🟦 → ?).
  Bra for de yngste og et nytt slag oppgave.
- **Rim-maskin / motsetninger.** «Stor ↔ liten», «varm ↔ kald». Enkelt
  spørsmål/svar-format som passer eksisterende motor.
- **Lyder & første bokstav.** «Hvilket ord starter på S?» med lyd. Kobler
  bokstav til lyd — verdifullt for lesestart.
- **Sortering.** Dra ting i riktig bøtte (dyr/mat/kjøretøy, oddetall/partall,
  stor/liten). Introduserer dra-og-slipp som ny mekanikk.

## 🎨 Flere tilpasninger (medium verdi, lite arbeid)

- **Navn & alder.** Spør om fornavn én gang; bruk det i bobler («Bra jobba,
  Ella!»). Liten endring, stor «dette er MITT spill»-følelse.
- **Egen figur-farge / tilbehør.** Hatt, sløyfe, briller oppå figuren.
- **Lydtema.** Velg mellom et par sett med lydeffekter (piano, romskip, dyr).
- **Bakgrunnsmusikk av/på** ved siden av lyd-knappen — rolig loop mange barn
  liker, men som må kunne skrus av.
- **Vanskelighet som husker deg.** Foreslå nivået barnet sist spilte, eller la
  det gå automatisk opp et hakk etter nok stjerner.

## 👪 For foreldre (medium verdi)

- **Foreldreskjerm.** Liten oversikt (bak en «hold inne»-knapp) over hva barnet
  har øvd på og hvor det stopper opp. `Min samling` er halvveis dit allerede.
- **Skjermtid-vennlig økt.** Valgfri «5 oppgaver så pause»-modus.

## ✨ Finpuss (lav risiko, gjør alt hyggeligere)

- **Feiring når man låser opp noe.** Konfetti + fanfare når en pokal eller figur
  åpnes (konfetti-motoren finnes allerede i `confetti.js`).
- **Mer variasjon i ros.** Utvid `PRAISE`/`NUDGE` og la figuren reagere ulikt.
- **Årstidstema automatisk.** Snø om vinteren, gresskar i oktober.
- **Offline / «Legg til på Hjem-skjerm».** En liten `manifest.json` + service
  worker gjør det til en app-ikon-app på nettbrett. Rein gevinst for barne-bruk.
- **Tilgjengelighet.** Litt større trykkflater, respekter `prefers-reduced-motion`.

---

## Anbefalt rekkefølge

1. **Min samling 🏆** — gjort. Belønningsmotoren er på plass.
2. **Fest på opplåsing** (konfetti/fanfare) + **låsbare temaer** — bygger rett
   videre og gir umiddelbar wow.
3. **Én ny lek** — *Hukommelse* gir mest glede for innsatsen.
4. **Dagens oppdrag + serie** — får barnet til å komme tilbake.
5. **Navn** og **PWA/hjem-skjerm** — små grep, stor «ekte app»-følelse.
