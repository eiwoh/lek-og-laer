/* Lek & Lær! — game content (all Norwegian bokmål)
   Add more words, rhymes and sentences here — the generators
   in questions.js pick from these lists automatically. */

var LekData = {

  // Words with matching picture. Length decides which levels use them.
  WORDS: [
    { w: 'KU', e: '🐮' },      { w: 'IS', e: '🍦' },      { w: 'SOL', e: '☀️' },
    { w: 'BIL', e: '🚗' },     { w: 'BOK', e: '📖' },     { w: 'TRE', e: '🌳' },
    { w: 'EGG', e: '🥚' },     { w: 'SKO', e: '👟' },     { w: 'MUS', e: '🐭' },
    { w: 'HUS', e: '🏠' },     { w: 'BÅT', e: '⛵' },     { w: 'KATT', e: '🐱' },
    { w: 'HUND', e: '🐶' },    { w: 'FISK', e: '🐟' },    { w: 'EPLE', e: '🍎' },
    { w: 'BALL', e: '⚽' },    { w: 'MELK', e: '🥛' },    { w: 'FUGL', e: '🐦' },
    { w: 'HEST', e: '🐴' },    { w: 'KAKE', e: '🎂' },    { w: 'LØVE', e: '🦁' },
    { w: 'FROSK', e: '🐸' },   { w: 'BANAN', e: '🍌' },   { w: 'SKOLE', e: '🏫' },
    { w: 'TIGER', e: '🐯' },   { w: 'PIZZA', e: '🍕' },   { w: 'DRAGE', e: '🐉' },
    { w: 'ROBOT', e: '🤖' },   { w: 'BLOMST', e: '🌸' },  { w: 'SYKKEL', e: '🚲' },
    { w: 'STJERNE', e: '⭐' }, { w: 'PINGVIN', e: '🐧' }, { w: 'ELEFANT', e: '🐘' },
    { w: 'SJIRAFF', e: '🦒' }, { w: 'JORDBÆR', e: '🍓' },
    { w: 'REV', e: '🦊' },     { w: 'AND', e: '🦆' },     { w: 'BIE', e: '🐝' },
    { w: 'APE', e: '🐵' },     { w: 'HAI', e: '🦈' },     { w: 'TOG', e: '🚂' },
    { w: 'FLY', e: '✈️' },     { w: 'LØK', e: '🧅' },     { w: 'OST', e: '🧀' },
    { w: 'MÅNE', e: '🌙' },    { w: 'UGLE', e: '🦉' },    { w: 'GEIT', e: '🐐' },
    { w: 'SOPP', e: '🍄' },    { w: 'BRØD', e: '🍞' },    { w: 'SKIP', e: '🚢' },
    { w: 'GAVE', e: '🎁' },    { w: 'STOL', e: '🪑' },    { w: 'DRUE', e: '🍇' },
    { w: 'MAUR', e: '🐜' },    { w: 'HVAL', e: '🐋' },    { w: 'BJØRN', e: '🐻' },
    { w: 'KANIN', e: '🐰' },   { w: 'PANDA', e: '🐼' },   { w: 'SLANGE', e: '🐍' },
    { w: 'KRABBE', e: '🦀' },  { w: 'DELFIN', e: '🐬' },  { w: 'EKORN', e: '🐿️' },
    { w: 'GULROT', e: '🥕' },  { w: 'SITRON', e: '🍋' },  { w: 'RAKETT', e: '🚀' },
    { w: 'GITAR', e: '🎸' },   { w: 'NØKKEL', e: '🔑' },  { w: 'KLOKKE', e: '⏰' },
    { w: 'BALLONG', e: '🎈' }, { w: 'KYLLING', e: '🐤' }, { w: 'APPELSIN', e: '🍊' },
    { w: 'SKILPADDE', e: '🐢' }, { w: 'SOMMERFUGL', e: '🦋' }, { w: 'KROKODILLE', e: '🐊' }
  ],

  // Rhyme pairs: q rhymes with a; d are non-rhyming distractors.
  RHYMES: [
    { q: 'SOL',  a: 'STOL', d: ['KATT', 'FISK'] },
    { q: 'KATT', a: 'HATT', d: ['HUND', 'BOK'] },
    { q: 'MUS',  a: 'HUS',  d: ['BIL', 'TRE'] },
    { q: 'BIL',  a: 'PIL',  d: ['SKO', 'EGG'] },
    { q: 'GRIS', a: 'IS',   d: ['KU', 'SOL'] },
    { q: 'KAKE', a: 'BAKE', d: ['MELK', 'FUGL'] },
    { q: 'HUND', a: 'RUND', d: ['KAKE', 'MUS'] },
    { q: 'BÅT',  a: 'GRÅT', d: ['EPLE', 'BALL'] },
    { q: 'HEST', a: 'FEST', d: ['IS', 'BOK'] },
    { q: 'TRE',  a: 'KNE',  d: ['BALL', 'HUS'] },
    { q: 'NESE', a: 'LESE', d: ['HUND', 'BIL'] },
    { q: 'TOG',  a: 'SKOG', d: ['KATT', 'IS'] },
    { q: 'FOT',  a: 'ROT',  d: ['SOL', 'EGG'] },
    { q: 'HÅR',  a: 'ÅR',   d: ['MUS', 'TRE'] },
    { q: 'BRØD', a: 'RØD',  d: ['FISK', 'KAKE'] },
    { q: 'STEIN', a: 'BEIN', d: ['HUS', 'SKO'] },
    { q: 'DØR',  a: 'SMØR', d: ['BALL', 'FUGL'] },
    { q: 'FLY',  a: 'SKY',  d: ['HEST', 'KU'] },
    { q: 'TANN', a: 'MANN', d: ['EPLE', 'SOL'] },
    { q: 'MÅL',  a: 'BÅL',  d: ['BOK', 'FISK'] },
    { q: 'BOK',  a: 'KROK', d: ['KATT', 'HEST'] },
    { q: 'SKO',  a: 'KLO',  d: ['IS', 'TRE'] }
  ],

  // Small reading-comprehension sentences. Answer and distractors are pictures.
  SENTENCES: [
    { s: 'Mia har en rød ball.',           q: 'Hva har Mia?',            a: '⚽', d: ['🚗', '📖'] },
    { s: 'Per spiser et eple.',            q: 'Hva spiser Per?',         a: '🍎', d: ['🍌', '🎂'] },
    { s: 'Katten drikker melk.',           q: 'Hva drikker katten?',     a: '🥛', d: ['🍦', '🥚'] },
    { s: 'Emma leser en bok.',             q: 'Hva leser Emma?',         a: '📖', d: ['⚽', '👟'] },
    { s: 'Hunden løper i hagen.',          q: 'Hvem løper i hagen?',     a: '🐶', d: ['🐱', '🐮'] },
    { s: 'Bestemor baker en kake.',        q: 'Hva baker bestemor?',     a: '🎂', d: ['🍎', '🥛'] },
    { s: 'Fisken svømmer i vannet.',       q: 'Hvem svømmer i vannet?',  a: '🐟', d: ['🐦', '🐴'] },
    { s: 'Lars sykler til skolen.',        q: 'Hva sykler Lars på?',     a: '🚲', d: ['🚗', '⛵'] },
    { s: 'Fuglen synger i treet.',         q: 'Hvem synger i treet?',    a: '🐦', d: ['🐭', '🐸'] },
    { s: 'Solen skinner på himmelen.',     q: 'Hva skinner på himmelen?', a: '☀️', d: ['⭐', '🏠'] },
    { s: 'Anna fant en frosk ved vannet.', q: 'Hva fant Anna?',          a: '🐸', d: ['🐟', '🐭'] },
    { s: 'Pappa kjører en stor bil.',      q: 'Hva kjører pappa?',       a: '🚗', d: ['🚲', '⛵'] },
    { s: 'Ola har en gul drage.',          q: 'Hva har Ola?',            a: '🐉', d: ['🚗', '🎂'] },
    { s: 'Kari klapper hesten sin.',       q: 'Hvilket dyr klapper Kari?', a: '🐴', d: ['🐶', '🐟'] },
    { s: 'Sofie plukker en blomst.',       q: 'Hva plukker Sofie?',      a: '🌸', d: ['🍎', '⭐'] },
    { s: 'Jonas ser en stjerne på himmelen.', q: 'Hva ser Jonas?',       a: '⭐', d: ['☀️', '🌸'] },
    { s: 'Nora leker med en ball.',        q: 'Hva leker Nora med?',      a: '⚽', d: ['📖', '👟'] },
    { s: 'Even mater en liten fugl.',      q: 'Hvilket dyr mater Even?',  a: '🐦', d: ['🐭', '🐸'] },
    { s: 'Thea spiser en banan.',          q: 'Hva spiser Thea?',        a: '🍌', d: ['🍎', '🍓'] },
    { s: 'Isak bygger et hus av klosser.', q: 'Hva bygger Isak?',        a: '🏠', d: ['🚗', '🚲'] },
    { s: 'Selma seiler med en båt.',       q: 'Hva seiler Selma med?',    a: '⛵', d: ['🚗', '🚲'] },
    { s: 'Oskar liker å spise pizza.',     q: 'Hva liker Oskar å spise?', a: '🍕', d: ['🎂', '🍌'] },
    { s: 'Ingrid har en søt liten mus.',   q: 'Hvilket dyr har Ingrid?',  a: '🐭', d: ['🐱', '🐮'] },
    { s: 'Elias fanget en stor fisk.',     q: 'Hva fanget Elias?',       a: '🐟', d: ['🐸', '🐦'] },
    { s: 'Frida sitter under et tre.',     q: 'Hva sitter Frida under?',  a: '🌳', d: ['🏠', '🏫'] },
    { s: 'Aksel drikker et glass melk.',   q: 'Hva drikker Aksel?',      a: '🥛', d: ['🍦', '🥚'] }
  ],

  // Trivia per level: 1 = animals & colours, 2 = nature & body, 3 = Norway & the world
  TRIVIA: {
    1: [
      { q: 'Hvilken farge har en banan?',            a: 'Gul',          d: ['Blå', 'Rød'],            e: '🍌' },
      { q: 'Hva sier kua?',                          a: 'Mø',           d: ['Voff', 'Mjau'],          e: '🐮' },
      { q: 'Hva sier katten?',                       a: 'Mjau',         d: ['Mø', 'Kvakk'],           e: '🐱' },
      { q: 'Hvor bor fisken?',                       a: 'I vannet',     d: ['I treet', 'I fjellet'],  e: '🐟' },
      { q: 'Hvilken farge har gresset?',             a: 'Grønn',        d: ['Lilla', 'Oransje'],      e: '🌱' },
      { q: 'Hva bruker vi på føttene?',              a: 'Sko',          d: ['Hatt', 'Votter'],        e: '👟' },
      { q: 'Hvor mange øyne har du?',                a: 'To',           d: ['Fire', 'Seks'],          e: '👀' },
      { q: 'Hva sier hunden?',                       a: 'Voff',         d: ['Mjau', 'Pip'],           e: '🐶' },
      { q: 'Hvilken farge har solen?',               a: 'Gul',          d: ['Grønn', 'Svart'],        e: '☀️' },
      { q: 'Hva spiser kaninen aller helst?',        a: 'Gulrot',       d: ['Pizza', 'Fisk'],         e: '🐰' },
      { q: 'Når på døgnet sover vi mest?',           a: 'Om natten',    d: ['Midt på dagen', 'Om morgenen'], e: '🌙' },
      { q: 'Hva faller fra himmelen om vinteren?',   a: 'Snø',          d: ['Blader', 'Epler'],       e: '❄️' },
      { q: 'Hvilket dyr sier «kvakk»?',              a: 'Anda',         d: ['Hesten', 'Grisen'],      e: '🦆' },
      { q: 'Når bruker vi paraply?',                 a: 'Når det regner', d: ['Når solen skinner', 'Når vi sover'], e: '☔' },
      { q: 'Hvor mange fingre har du på én hånd?',   a: 'Fem',          d: ['Tre', 'Ti'],             e: '✋' },
      { q: 'Hva sier sauen?',                        a: 'Bæ',           d: ['Mø', 'Voff'],            e: '🐑' },
      { q: 'Hvilken farge har et jordbær?',          a: 'Rød',          d: ['Blå', 'Grønn'],          e: '🍓' },
      { q: 'Hva liker hesten å spise?',              a: 'Høy',          d: ['Pizza', 'Is'],           e: '🐴' },
      { q: 'Hvor mange bein har en hund?',           a: 'Fire',         d: ['To', 'Seks'],            e: '🐶' },
      { q: 'Hva sier grisen?',                       a: 'Nøff',         d: ['Mø', 'Pip'],             e: '🐷' },
      { q: 'Hvilken farge har himmelen når det er finvær?', a: 'Blå',   d: ['Grønn', 'Rosa'],         e: '🌤️' },
      { q: 'Hva liker musa å spise?',                a: 'Ost',          d: ['Sko', 'Stein'],          e: '🐭' },
      { q: 'Hva bruker vi for å høre?',              a: 'Ørene',        d: ['Øynene', 'Munnen'],      e: '👂' },
      { q: 'Hvor mange tær har du på én fot?',       a: 'Fem',          d: ['Tre', 'Ti'],             e: '🦶' },
      { q: 'Hva drikker en liten baby?',             a: 'Melk',         d: ['Kaffe', 'Brus'],         e: '🍼' },
      { q: 'Hvilket dyr har en lang snabel?',        a: 'Elefanten',    d: ['Katten', 'Kaninen'],     e: '🐘' },
      { q: 'Hvilken farge har en moden tomat?',      a: 'Rød',          d: ['Blå', 'Svart'],          e: '🍅' },
      { q: 'Hva bruker vi beina til?',               a: 'Å gå',         d: ['Å se', 'Å høre'],        e: '🦵' },
      { q: 'Hvilken farge har snøen?',               a: 'Hvit',         d: ['Svart', 'Grønn'],        e: '⛄' },
      { q: 'Hvilket dyr liker å jage mus?',          a: 'Katten',       d: ['Fisken', 'Fuglen'],      e: '🐱' },
      { q: 'Hvor mange bein har en katt?',           a: 'Fire',         d: ['To', 'Åtte'],            e: '🐱' },
      { q: 'Hvilken farge har en sitron?',           a: 'Gul',          d: ['Blå', 'Rød'],            e: '🍋' },
      { q: 'Hvilken farge har en gulrot?',           a: 'Oransje',      d: ['Blå', 'Grønn'],          e: '🥕' },
      { q: 'Hva sier anda?',                         a: 'Kvakk',        d: ['Mø', 'Nøff'],            e: '🦆' },
      { q: 'Hva sier hanen om morgenen?',            a: 'Kykeliky',     d: ['Mø', 'Voff'],            e: '🐓' },
      { q: 'Hvor mange vinger har en fugl?',         a: 'To',           d: ['Fire', 'Én'],            e: '🐦' },
      { q: 'Hva bruker vi til å se med?',            a: 'Øynene',       d: ['Ørene', 'Nesa'],         e: '👀' },
      { q: 'Hvor mange armer har du?',               a: 'To',           d: ['Fire', 'Én'],            e: '💪' },
      { q: 'Hvilket dyr gir oss ull?',               a: 'Sauen',        d: ['Fisken', 'Fuglen'],      e: '🐑' },
      { q: 'Hva liker bjørnen aller best?',          a: 'Honning',      d: ['Sko', 'Stein'],          e: '🐻' },
      { q: 'Hvilken farge har en moden appelsin?',   a: 'Oransje',      d: ['Lilla', 'Svart'],        e: '🍊' },
      { q: 'Hva bruker vi munnen til?',              a: 'Å spise',      d: ['Å høre', 'Å se'],        e: '👄' },
      { q: 'Hvilket dyr hopper og bor ved vannet?',  a: 'Frosken',      d: ['Hesten', 'Kua'],         e: '🐸' },
      { q: 'Hva har fisken som hjelper den å svømme?', a: 'Finner',     d: ['Bein', 'Vinger'],        e: '🐟' }
    ],
    2: [
      { q: 'Hvor mange bein har en edderkopp?',      a: 'Åtte',         d: ['Seks', 'Fire'],          e: '🕷️' },
      { q: 'Hvilken årstid kommer etter sommeren?',  a: 'Høsten',       d: ['Våren', 'Vinteren'],     e: '🍂' },
      { q: 'Hva lager biene?',                       a: 'Honning',      d: ['Melk', 'Syltetøy'],      e: '🐝' },
      { q: 'Hvor mange dager er det i en uke?',      a: 'Sju',          d: ['Fem', 'Ti'],             e: '📅' },
      { q: 'Hva trenger planter for å vokse?',       a: 'Vann og sol',  d: ['Godteri', 'Leker'],      e: '🌻' },
      { q: 'Hvilket dyr har veldig lang hals?',      a: 'Sjiraffen',    d: ['Grisen', 'Katten'],      e: '🦒' },
      { q: 'Hva blir vann til når det fryser?',      a: 'Is',           d: ['Damp', 'Saft'],          e: '🧊' },
      { q: 'Hvor mange måneder er det i et år?',     a: 'Tolv',         d: ['Åtte', 'Tjue'],          e: '🗓️' },
      { q: 'Hvilket dyr sover nesten hele vinteren?', a: 'Bjørnen',     d: ['Hunden', 'Fuglen'],      e: '🐻' },
      { q: 'Hva bruker fuglene for å fly?',          a: 'Vingene',      d: ['Beina', 'Nebbet'],       e: '🐦' },
      { q: 'Hvilken dag kommer etter lørdag?',       a: 'Søndag',       d: ['Mandag', 'Fredag'],      e: '📅' },
      { q: 'Hva heter babyen til en katt?',          a: 'Kattunge',     d: ['Valp', 'Føll'],          e: '🐱' },
      { q: 'Hva heter babyen til en hund?',          a: 'Valp',         d: ['Kattunge', 'Lam'],       e: '🐶' },
      { q: 'Hvor kommer melken fra?',                a: 'Kua',          d: ['Høna', 'Fisken'],        e: '🥛' },
      { q: 'Hva pumper blodet rundt i kroppen?',     a: 'Hjertet',      d: ['Magen', 'Hjernen'],      e: '❤️' },
      { q: 'Hva blir det når du blander blå og gul maling?', a: 'Grønn', d: ['Rød', 'Lilla'],        e: '🎨' },
      { q: 'Hvor mange årstider har vi?',            a: 'Fire',         d: ['To', 'Seks'],            e: '🍂' },
      { q: 'Hvilken årstid kommer etter vinteren?',  a: 'Våren',        d: ['Høsten', 'Sommeren'],    e: '🌷' },
      { q: 'Hva heter den første måneden i året?',   a: 'Januar',       d: ['Desember', 'Juli'],      e: '📅' },
      { q: 'Hva kalles vann som faller fra skyene?', a: 'Regn',         d: ['Sand', 'Sukker'],        e: '🌧️' },
      { q: 'Hvor mange bein har et insekt?',         a: 'Seks',         d: ['Fire', 'Åtte'],          e: '🐜' },
      { q: 'Hvilket organ bruker vi til å tenke?',   a: 'Hjernen',      d: ['Hjertet', 'Magen'],      e: '🧠' },
      { q: 'Hva puster en fisk med?',                a: 'Gjeller',      d: ['Lunger', 'Nesa'],        e: '🐟' },
      { q: 'Hvilken farge får bladene om høsten?',   a: 'Gule og røde', d: ['Blå', 'Svarte'],         e: '🍁' },
      { q: 'Hva heter babyen til en hest?',          a: 'Føll',         d: ['Valp', 'Lam'],           e: '🐴' },
      { q: 'Hva heter babyen til en ku?',            a: 'Kalv',         d: ['Føll', 'Kylling'],       e: '🐄' },
      { q: 'Hvor mange timer er det i ett døgn?',    a: 'Tjuefire',     d: ['Tolv', 'Seksti'],        e: '🕐' },
      { q: 'Hva heter babyen til en frosk?',         a: 'Rumpetroll',   d: ['Valp', 'Kalv'],          e: '🐸' },
      { q: 'Hvilken kroppsdel bruker vi til å lukte?', a: 'Nesa',       d: ['Øret', 'Håret'],         e: '👃' },
      { q: 'Hva vokser det på et epletre?',          a: 'Epler',        d: ['Bananer', 'Poteter'],    e: '🍎' },
      { q: 'Hvor mange bein har en maur?',           a: 'Seks',         d: ['Fire', 'Åtte'],          e: '🐜' },
      { q: 'Hva heter babyen til en høne?',          a: 'Kylling',      d: ['Valp', 'Lam'],           e: '🐤' },
      { q: 'Hva heter den kaldeste årstiden?',       a: 'Vinteren',     d: ['Sommeren', 'Våren'],     e: '❄️' },
      { q: 'Hva heter den varmeste årstiden?',       a: 'Sommeren',     d: ['Vinteren', 'Høsten'],    e: '☀️' },
      { q: 'Hvilket dyr lager et spindelvev?',       a: 'Edderkoppen',  d: ['Bien', 'Mauren'],        e: '🕷️' },
      { q: 'Hva blir en larve til slutt?',           a: 'En sommerfugl', d: ['En bie', 'En fugl'],     e: '🦋' },
      { q: 'Hva heter dagen etter mandag?',          a: 'Tirsdag',      d: ['Onsdag', 'Søndag'],      e: '📅' },
      { q: 'Hva heter dagen før søndag?',            a: 'Lørdag',       d: ['Fredag', 'Mandag'],      e: '📅' },
      { q: 'Hva heter babyen til en gris?',          a: 'Grisunge',     d: ['Lam', 'Føll'],           e: '🐷' },
      { q: 'Hva kommer på himmelen etter regn og sol?', a: 'Regnbue',   d: ['Snø', 'Torden'],         e: '🌈' },
      { q: 'Hvor mange fingre har du til sammen?',   a: 'Ti',           d: ['Fem', 'Tjue'],           e: '🙌' },
      { q: 'Hvilken farge får du når du blander rødt og hvitt?', a: 'Rosa', d: ['Grønn', 'Brun'],     e: '🎨' },
      { q: 'Hva heter babyen til en løve?',          a: 'Løveunge',     d: ['Valp', 'Kalv'],          e: '🦁' },
      { q: 'Hvilket dyr surrer og lager honning?',   a: 'Bien',         d: ['Mauren', 'Fluen'],       e: '🐝' }
    ],
    3: [
      { q: 'Hva heter hovedstaden i Norge?',         a: 'Oslo',         d: ['Bergen', 'Stockholm'],   e: '🇳🇴' },
      { q: 'Hvilken planet bor vi på?',              a: 'Jorden',       d: ['Mars', 'Månen'],         e: '🌍' },
      { q: 'Hva heter det største dyret i havet?',   a: 'Blåhvalen',    d: ['Haien', 'Selen'],        e: '🐋' },
      { q: 'Hvor mange bokstaver er det i alfabetet vårt?', a: '29',    d: ['26', '24'],              e: '🔤' },
      { q: 'Hva heter kongen i Norge?',              a: 'Harald',       d: ['Olav', 'Magnus'],        e: '👑' },
      { q: 'Hvilket land er nabo til Norge?',        a: 'Sverige',      d: ['Spania', 'Kina'],        e: '🗺️' },
      { q: 'Hva går jorden rundt?',                  a: 'Solen',        d: ['Månen', 'Mars'],         e: '☀️' },
      { q: 'Hvilke farger har det norske flagget?',  a: 'Rødt, hvitt og blått', d: ['Gult og grønt', 'Bare rødt'], e: '🇳🇴' },
      { q: 'Hva kalles stor is som flyter i havet?', a: 'Isfjell',      d: ['Snøball', 'Istapp'],     e: '🧊' },
      { q: 'Hvor mange minutter er det i en time?',  a: 'Seksti',       d: ['Tretti', 'Hundre'],      e: '⏰' },
      { q: 'Hva heter verdens største land?',        a: 'Russland',     d: ['Norge', 'Danmark'],      e: '🗺️' },
      { q: 'Hva heter babyen til en sau?',           a: 'Lam',          d: ['Kalv', 'Kylling'],       e: '🐑' },
      { q: 'Hva lyser på himmelen om natten?',       a: 'Månen og stjernene', d: ['Solen', 'Regnbuen'], e: '🌙' },
      { q: 'Hvor mange sekunder er det i ett minutt?', a: 'Seksti',     d: ['Ti', 'Tusen'],           e: '⏱️' },
      { q: 'Hva trenger vi for å puste?',            a: 'Luft',         d: ['Vann', 'Mat'],           e: '💨' },
      { q: 'Hvilken planet er nærmest solen?',       a: 'Merkur',       d: ['Jorden', 'Mars'],        e: '🪐' },
      { q: 'Hvor mange planeter er det i solsystemet vårt?', a: 'Åtte', d: ['Fem', 'Ti'],             e: '🌌' },
      { q: 'Hva heter det høyeste fjellet i Norge?', a: 'Galdhøpiggen', d: ['Gaustatoppen', 'Mount Everest'], e: '⛰️' },
      { q: 'Hva heter havet mellom Norge og England?', a: 'Nordsjøen',  d: ['Middelhavet', 'Stillehavet'], e: '🌊' },
      { q: 'Hvor mange verdensdeler finnes det?',    a: 'Sju',          d: ['Fem', 'Tre'],            e: '🌏' },
      { q: 'Hvor bor pingviner i naturen?',          a: 'På Sydpolen',  d: ['I Norge', 'I ørkenen'],  e: '🐧' },
      { q: 'Hvilken dato er Norges nasjonaldag?',    a: '17. mai',      d: ['1. januar', '24. desember'], e: '🇳🇴' },
      { q: 'Hva kalles et stort, tørt sted med mye sand?', a: 'Ørken',  d: ['Skog', 'Hav'],           e: '🏜️' },
      { q: 'Hvilket dyr kalles «kongen av jungelen»?', a: 'Løven',      d: ['Tigeren', 'Bjørnen'],    e: '🦁' },
      { q: 'Hva heter det største havet i verden?',  a: 'Stillehavet',  d: ['Nordsjøen', 'Middelhavet'], e: '🌊' },
      { q: 'Hvor lang tid bruker jorden på å gå rundt solen?', a: 'Ett år', d: ['Én dag', 'Én måned'], e: '🌍' },
      { q: 'Hva kalles en stjerne med hale som suser gjennom rommet?', a: 'Komet', d: ['Planet', 'Måne'], e: '☄️' },
      { q: 'Hvilket land er kjent for Eiffeltårnet?', a: 'Frankrike',   d: ['Norge', 'Japan'],        e: '🗼' },
      { q: 'Hvor mange dager er det i et vanlig år?', a: '365',         d: ['100', '30'],             e: '📅' },
      { q: 'Hva må astronauter ha på seg i rommet?', a: 'Romdrakt',     d: ['Badebukse', 'Pysjamas'], e: '👨‍🚀' },
      { q: 'Hva heter den nest største byen i Norge?', a: 'Bergen',     d: ['Tromsø', 'Trondheim'],   e: '🏙️' },
      { q: 'Hva heter hovedstaden i Sverige?',       a: 'Stockholm',    d: ['Oslo', 'København'],     e: '🇸🇪' },
      { q: 'Hva heter hovedstaden i Danmark?',       a: 'København',    d: ['Oslo', 'Bergen'],        e: '🇩🇰' },
      { q: 'Hvilken planet kalles «den røde planeten»?', a: 'Mars',     d: ['Jorden', 'Venus'],       e: '🪐' },
      { q: 'Hva heter planeten med store ringer rundt seg?', a: 'Saturn', d: ['Jorden', 'Mars'],      e: '🪐' },
      { q: 'Hvilket land er formet som en støvel?',  a: 'Italia',       d: ['Norge', 'Kina'],         e: '🥾' },
      { q: 'Hvilket land er kjent for Eiffeltårnet?', a: 'Frankrike',   d: ['Sverige', 'Japan'],      e: '🗼' },
      { q: 'Hva bruker vi et termometer til å måle?', a: 'Temperatur',  d: ['Tid', 'Vekt'],           e: '🌡️' },
      { q: 'Hva bruker vi en klokke til å måle?',    a: 'Tid',          d: ['Vekt', 'Lengde'],        e: '⏰' },
      { q: 'Hvilke farger har det svenske flagget?', a: 'Blått og gult', d: ['Rødt og hvitt', 'Grønt'], e: '🇸🇪' },
      { q: 'Hvilket dyr er størst på land?',         a: 'Elefanten',    d: ['Løven', 'Sjiraffen'],    e: '🐘' },
      { q: 'Hva kalles forskere som studerer verdensrommet?', a: 'Astronomer', d: ['Kokker', 'Snekkere'], e: '🔭' },
      { q: 'Hvor lang tid bruker månen omtrent rundt jorden?', a: 'Én måned', d: ['Én dag', 'Ett år'], e: '🌙' },
      { q: 'Hva heter det kaldeste stedet på jorden?', a: 'Sydpolen',   d: ['Ørkenen', 'Norge'],      e: '🧊' }
    ]
  },

  // English for Norwegian kids. VOCAB items: no = Norwegian word shown,
  // en = English answer, e = matching picture. TRIVIA = simple questions in English.
  ENGLISH: {
    VOCAB: {
      // Level 1: everyday animals & things — picture to English word.
      1: [
        { no: 'KATT', en: 'CAT',   e: '🐱' }, { no: 'HUND', en: 'DOG',    e: '🐶' },
        { no: 'FISK', en: 'FISH',  e: '🐟' }, { no: 'FUGL', en: 'BIRD',   e: '🐦' },
        { no: 'HEST', en: 'HORSE', e: '🐴' }, { no: 'KU',   en: 'COW',    e: '🐮' },
        { no: 'GRIS', en: 'PIG',   e: '🐷' }, { no: 'SAU',  en: 'SHEEP',  e: '🐑' },
        { no: 'LØVE', en: 'LION',  e: '🦁' }, { no: 'ELEFANT', en: 'ELEPHANT', e: '🐘' },
        { no: 'SOL',  en: 'SUN',   e: '☀️' }, { no: 'HUS',  en: 'HOUSE',  e: '🏠' },
        { no: 'BIL',  en: 'CAR',   e: '🚗' }, { no: 'BOK',  en: 'BOOK',   e: '📖' },
        { no: 'EPLE', en: 'APPLE', e: '🍎' }, { no: 'BALL', en: 'BALL',   e: '⚽' },
        { no: 'MUS',  en: 'MOUSE', e: '🐭' }, { no: 'BJØRN', en: 'BEAR',  e: '🐻' },
        { no: 'FROSK', en: 'FROG', e: '🐸' }, { no: 'AND',  en: 'DUCK',   e: '🦆' },
        { no: 'KANIN', en: 'RABBIT', e: '🐰' }, { no: 'TIGER', en: 'TIGER', e: '🐯' },
        { no: 'SLANGE', en: 'SNAKE', e: '🐍' }, { no: 'BANAN', en: 'BANANA', e: '🍌' },
        { no: 'SKO',  en: 'SHOE',  e: '👟' }, { no: 'HATT', en: 'HAT',    e: '🎩' }
      ],
      // Level 2: colours, numbers and more words — added to level-1 pool.
      2: [
        { no: 'RØD',   en: 'RED',    e: '🔴' }, { no: 'BLÅ',    en: 'BLUE',   e: '🔵' },
        { no: 'GRØNN', en: 'GREEN',  e: '🟢' }, { no: 'GUL',    en: 'YELLOW', e: '🟡' },
        { no: 'EN',    en: 'ONE',    e: '1️⃣' }, { no: 'TO',     en: 'TWO',    e: '2️⃣' },
        { no: 'FIRE',  en: 'FOUR',   e: '4️⃣' }, { no: 'FEM',    en: 'FIVE',   e: '5️⃣' },
        { no: 'MÅNE',  en: 'MOON',   e: '🌙' }, { no: 'STJERNE', en: 'STAR',  e: '⭐' },
        { no: 'TRE',   en: 'TREE',   e: '🌳' }, { no: 'BLOMST', en: 'FLOWER', e: '🌸' },
        { no: 'KAKE',  en: 'CAKE',   e: '🎂' }, { no: 'MELK',   en: 'MILK',   e: '🥛' },
        { no: 'BÅT',   en: 'BOAT',   e: '⛵' },
        { no: 'SVART', en: 'BLACK',  e: '⚫' }, { no: 'HVIT',   en: 'WHITE', e: '⚪' },
        { no: 'SEKS',  en: 'SIX',    e: '6️⃣' }, { no: 'SJU',    en: 'SEVEN', e: '7️⃣' },
        { no: 'REGN',  en: 'RAIN',   e: '🌧️' }, { no: 'SNØ',    en: 'SNOW',  e: '⛄' },
        { no: 'HJERTE', en: 'HEART', e: '❤️' }, { no: 'FOT',    en: 'FOOT',  e: '🦶' },
        { no: 'VANN',  en: 'WATER',  e: '💧' }, { no: 'BRØD',   en: 'BREAD', e: '🍞' },
        { no: 'NØKKEL', en: 'KEY',   e: '🔑' }
      ]
    },
    // Level 3: simple quiz questions, asked and answered in English.
    TRIVIA: [
      { q: 'What sound does a cat make?',   a: 'Meow',  d: ['Woof', 'Moo'],      e: '🐱' },
      { q: 'What sound does a dog make?',   a: 'Woof',  d: ['Meow', 'Quack'],    e: '🐶' },
      { q: 'What colour is the sky on a sunny day?', a: 'Blue', d: ['Green', 'Pink'], e: '🌤️' },
      { q: 'What colour is grass?',         a: 'Green', d: ['Blue', 'Red'],      e: '🌱' },
      { q: 'What colour is a banana?',      a: 'Yellow', d: ['Blue', 'Red'],     e: '🍌' },
      { q: 'What colour is snow?',          a: 'White', d: ['Black', 'Green'],   e: '⛄' },
      { q: 'How many legs does a dog have?', a: 'Four', d: ['Two', 'Six'],       e: '🐶' },
      { q: 'How many fingers are on one hand?', a: 'Five', d: ['Three', 'Ten'],  e: '✋' },
      { q: 'How many days are in a week?',  a: 'Seven', d: ['Five', 'Ten'],      e: '📅' },
      { q: 'Which animal says "moo"?',      a: 'Cow',   d: ['Cat', 'Dog'],       e: '🐮' },
      { q: 'What do we call a baby dog?',   a: 'Puppy', d: ['Kitten', 'Calf'],   e: '🐶' },
      { q: 'What do bees make?',            a: 'Honey', d: ['Milk', 'Bread'],    e: '🐝' },
      { q: 'What do we use to see?',        a: 'Eyes',  d: ['Ears', 'Nose'],     e: '👀' },
      { q: 'Which big grey animal has a long nose?', a: 'Elephant', d: ['Mouse', 'Cat'], e: '🐘' },
      { q: 'What sound does a cow make?',   a: 'Moo',   d: ['Meow', 'Woof'],     e: '🐮' },
      { q: 'What sound does a duck make?',  a: 'Quack', d: ['Moo', 'Woof'],      e: '🦆' },
      { q: 'What colour is the sun?',       a: 'Yellow', d: ['Blue', 'Black'],   e: '☀️' },
      { q: 'What colour is an apple?',      a: 'Red',   d: ['Blue', 'Purple'],   e: '🍎' },
      { q: 'What colour is a strawberry?',  a: 'Red',   d: ['Blue', 'Green'],    e: '🍓' },
      { q: 'How many legs does a cat have?', a: 'Four', d: ['Two', 'Eight'],     e: '🐱' },
      { q: 'How many months are in a year?', a: 'Twelve', d: ['Ten', 'Six'],     e: '📅' },
      { q: 'What do we call a baby cat?',   a: 'Kitten', d: ['Puppy', 'Foal'],   e: '🐱' },
      { q: 'What do we use to hear?',       a: 'Ears',  d: ['Eyes', 'Nose'],     e: '👂' },
      { q: 'Which animal says "baa"?',      a: 'Sheep', d: ['Cow', 'Pig'],       e: '🐑' },
      { q: 'What do we call frozen water?', a: 'Ice',   d: ['Steam', 'Milk'],    e: '🧊' }
    ]
  },

  // Hour names for the clock game: index 1..12
  CLOCK_NUM: ['', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'],

  // Butikk-leken: things to buy, with a price in kroner. The generators
  // compare prices ("Hva koster mest?"), check if you can afford something
  // and work out totals and change. Prices are kid-friendly and distinct
  // enough that comparisons have a clear answer.
  MONEY: {
    ITEMS: [
      // Billige ting (småpenger)
      { e: '⭐', w: 'Klistremerke', p: 3 },
      { e: '🍌', w: 'Banan',       p: 4 },
      { e: '🍬', w: 'Godteri',     p: 5 },
      { e: '🍎', w: 'Eple',        p: 6 },
      { e: '🧽', w: 'Viskelær',    p: 7 },
      { e: '✏️', w: 'Blyant',      p: 8 },
      { e: '🍪', w: 'Kjeks',       p: 9 },
      { e: '🍭', w: 'Slikkepinne', p: 10 },
      { e: '🎈', w: 'Ballong',     p: 12 },
      { e: '🧃', w: 'Juice',       p: 14 },
      { e: '🍫', w: 'Sjokolade',   p: 15 },
      { e: '🥨', w: 'Kringle',     p: 18 },
      // Mellomting
      { e: '🥤', w: 'Brus',        p: 20 },
      { e: '🍦', w: 'Iskrem',      p: 25 },
      { e: '🌭', w: 'Pølse',       p: 30 },
      { e: '🪀', w: 'Jojo',        p: 35 },
      { e: '🖍️', w: 'Fargestifter', p: 39 },
      { e: '🍕', w: 'Pizza',       p: 45 },
      { e: '🚗', w: 'Lekebil',     p: 59 },
      { e: '🍔', w: 'Burger',      p: 65 },
      { e: '🧢', w: 'Caps',        p: 79 },
      { e: '📖', w: 'Bok',         p: 89 },
      { e: '🎁', w: 'Gave',        p: 99 },
      { e: '⚽', w: 'Fotball',     p: 129 },
      { e: '🧸', w: 'Kosedyr',     p: 149 },
      // Dyre ting
      { e: '⌚', w: 'Klokke',      p: 299 },
      { e: '🎒', w: 'Sekk',        p: 349 },
      { e: '👟', w: 'Joggesko',    p: 399 },
      { e: '🛼', w: 'Rulleskøyter', p: 499 },
      { e: '🎮', w: 'Spill',       p: 599 },
      { e: '🛴', w: 'Sparkesykkel', p: 799 },
      { e: '🎸', w: 'Gitar',       p: 899 },
      { e: '🚲', w: 'Sykkel',      p: 1200 }
    ]
  },

  // Kode-roboten: a tiny "learn to code" game. A robot 🤖 sits on a grid and
  // the child picks the command(s) that drive it onto the goal. GOALS are the
  // treasures the robot drives toward; one is chosen at random per question.
  ROBOT: {
    GOALS: ['⭐', '🍎', '🎁', '🍌', '🍓', '🧀', '🍩', '🏆', '💎', '🍪', '🔋', '🌟']
  },

  // Eventyr: a winding map through themed lands. The fox walks from post
  // to post; clearing a post unlocks the next one. Each post is a short
  // round from an existing mode. The last post of a land is a boss (👑).
  ADVENTURE: {
    AREAS: [
      { name: 'Eventyrskogen',   emoji: '🌲', sky: '#DDF3D4', decor: ['🌲', '🍄', '🦔', '🦉', '🌳', '🐿️'] },
      { name: 'Solstranda',      emoji: '🏖️', sky: '#FFF0C4', decor: ['🌴', '🐚', '🦀', '⛱️', '🐬', '🏝️'] },
      { name: 'Trollfjellet',    emoji: '⛰️', sky: '#E4E9F1', decor: ['🏔️', '🦅', '🐐', '🪨', '🌫️', '🧌'] },
      { name: 'Isriket',         emoji: '❄️', sky: '#DFF2FB', decor: ['⛄', '🧊', '🐧', '❄️', '🦭', '🏔️'] },
      { name: 'Stjernehimmelen', emoji: '🌌', sky: '#28285A', dark: true, decor: ['⭐', '🪐', '🌟', '🛸', '☄️', '🌙'] },
      { name: 'Regnbueslottet',  emoji: '🏰', sky: '#F5E1FB', decor: ['🌈', '🏰', '🦄', '✨', '👑', '🍭'] }
    ],
    NODES: [
      // Eventyrskogen
      { area: 0, mode: 'matte',   level: 1 },
      { area: 0, mode: 'lesing',  level: 1 },
      { area: 0, mode: 'prikk',   level: 1 },
      { area: 0, mode: 'quiz',    level: 1, boss: true },
      // Solstranda
      { area: 1, mode: 'matte',   level: 2 },
      { area: 1, mode: 'klokke',  level: 1 },
      { area: 1, mode: 'monster', level: 1 },
      { area: 1, mode: 'lesing',  level: 2, boss: true },
      // Trollfjellet
      { area: 2, mode: 'engelsk', level: 1 },
      { area: 2, mode: 'matte',   level: 3 },
      { area: 2, mode: 'tegne',   level: 2 },
      { area: 2, mode: 'quiz',    level: 2, boss: true },
      // Isriket
      { area: 3, mode: 'klokke',  level: 2 },
      { area: 3, mode: 'monster', level: 2 },
      { area: 3, mode: 'engelsk', level: 2 },
      { area: 3, mode: 'lesing',  level: 3, boss: true },
      // Stjernehimmelen
      { area: 4, mode: 'matte',   level: 4 },
      { area: 4, mode: 'monster', level: 3 },
      { area: 4, mode: 'engelsk', level: 3 },
      { area: 4, mode: 'quiz',    level: 3, boss: true },
      // Regnbueslottet — den store finalen
      { area: 5, mode: 'klokke',  level: 3 },
      { area: 5, mode: 'lesing',  level: 3 },
      { area: 5, mode: 'matte',   level: 5 },
      { area: 5, boss: true, emoji: '👑',
        mix: [['matte', 3], ['quiz', 3], ['lesing', 3], ['engelsk', 3], ['klokke', 3], ['monster', 3]] }
    ]
  },

  // Prikk til prikk: dot coordinates in a 0–100 viewBox, in tap order.
  // close: the last dot connects back to the first when done.
  SHAPES: {
    1: [
      { name: 'Lyn', emoji: '⚡', close: true,
        pts: [[60,6],[28,54],[45,54],[40,94],[74,40],[56,40]] },
      { name: 'Hus', emoji: '🏠', close: true,
        pts: [[50,10],[90,42],[78,42],[78,88],[22,88],[22,42],[10,42]] },
      { name: 'Krone', emoji: '👑', close: true,
        pts: [[18,78],[14,36],[32,54],[50,22],[68,54],[86,36],[82,78]] },
      { name: 'Fisk', emoji: '🐟', close: true,
        pts: [[8,50],[30,28],[58,28],[76,44],[94,28],[94,72],[76,56],[58,72],[30,72]] },
      { name: 'Stjerne', emoji: '⭐', close: true,
        pts: [[50,12],[61,39],[90,41],[67,60],[75,88],[50,72],[25,88],[33,60],[10,41],[39,39]] },
      { name: 'Hjerte', emoji: '❤️', close: true,
        pts: [[50,88],[20,55],[12,34],[22,18],[37,16],[50,28],[63,16],[78,18],[88,34],[80,55]] },
      { name: 'Diamant', emoji: '💎', close: true,
        pts: [[50,8],[72,30],[84,44],[50,92],[16,44],[28,30]] },
      { name: 'Sol', emoji: '☀️', close: true,
        pts: [[50,6],[57,33],[81,19],[67,43],[94,50],[67,57],[81,81],[57,67],[50,94],[43,67],[19,81],[33,57],[6,50],[33,43],[19,19],[43,33]] },
      { name: 'Ballong', emoji: '🎈', close: true,
        pts: [[50,6],[72,16],[80,38],[70,58],[54,70],[54,80],[46,80],[46,70],[30,58],[20,38],[28,16]] }
    ],
    2: [
      { name: 'Katt', emoji: '🐱', close: true,
        pts: [[28,14],[40,28],[60,28],[72,14],[80,34],[78,56],[64,72],[36,72],[22,56],[20,34]] },
      { name: 'Rakett', emoji: '🚀', close: true,
        pts: [[50,4],[63,20],[66,52],[78,68],[78,86],[62,74],[38,74],[22,86],[22,68],[34,52],[37,20]] },
      { name: 'Juletre', emoji: '🎄', close: true,
        pts: [[50,6],[68,28],[58,28],[76,50],[64,50],[84,72],[56,72],[56,88],[44,88],[44,72],[16,72],[36,50],[24,50],[42,28],[32,28]] },
      { name: 'Sommerfugl', emoji: '🦋', close: true,
        pts: [[50,36],[62,22],[80,10],[92,26],[84,44],[90,62],[78,78],[60,66],[50,58],[40,66],[22,78],[10,62],[16,44],[8,26],[20,10],[38,22]] },
      { name: 'Bil', emoji: '🚗', close: true,
        pts: [[10,64],[10,48],[26,48],[36,32],[64,32],[76,48],[90,48],[90,64]] },
      { name: 'Blomst', emoji: '🌸', close: true,
        pts: [[50,8],[59,37],[90,37],[65,55],[75,84],[50,66],[25,84],[35,55],[10,37],[41,37]] },
      { name: 'Måne', emoji: '🌙', close: true,
        pts: [[54,8],[36,14],[24,30],[22,52],[32,72],[52,84],[44,66],[40,46],[44,26]] }
    ]
  },

  // Tegne-leken: characters to paint over, per level.
  TRACE: {
    upper: 'ABCDEFGHKLMNOPRSTUVYÆØÅ'.split(''),
    digits: '0123456789'.split(''),
    lower: 'abdefghkmnprstuy'.split('')
  },

  LETTERS: 'ABDEFGHIJKLMNOPRSTUVYÆØÅ'.split(''),

  COUNT_EMOJI: ['🍓', '🐞', '🎈', '⭐', '🐠', '🦋', '🍪', '🚀',
                '🐥', '🌻', '🍩', '🐢', '🎁', '🦄', '🍄', '🐬'],

  PRAISE: ['Supert! 🌟', 'Kjempebra! 🎉', 'Riktig! 🥳', 'Wow, så flink! 🤩',
           'Helt riktig! ⭐', 'Knallbra! 💪', 'Juhu! 🎈', 'Du er rå! 🦖'],

  NUDGE: ['Prøv igjen! 🙂', 'Nesten! Prøv en gang til 💪', 'Du klarer det! 🍀', 'Hmm… prøv igjen! 🤔'],

  // Modes list how many of these levels they use (MODES[..].levels).
  LEVELS: [
    { n: 1, name: 'Lett',        icon: '🐣', desc: 'Fin start' },
    { n: 2, name: 'Middels',     icon: '🐰', desc: 'Litt mer å bryne seg på' },
    { n: 3, name: 'Vanskelig',   icon: '🦉', desc: 'For kloke ugler!' },
    { n: 4, name: 'Ekspert',     icon: '🦁', desc: 'Ganging og deling' },
    { n: 5, name: 'Superhjerne', icon: '🚀', desc: 'For ekte mattemestere!' },
    { n: 6, name: 'Forvandling', icon: '🦾', desc: 'Bli stor og liten!' }
  ],

  MODES: {
    matte:   { title: 'Matte-moro',     icon: '🔢', levels: 5 },
    racer:   { title: 'Regne-racer',    icon: '⚡', levels: 5 },
    monster: { title: 'Tall-mønster',   icon: '🧩', levels: 3 },
    lesing:  { title: 'Lese-leken',     icon: '📖', levels: 3 },
    quiz:    { title: 'Quiz-tid',       icon: '🧠', levels: 3 },
    klokke:  { title: 'Klokke-spillet', icon: '🕐', levels: 3 },
    engelsk: { title: 'Engelsk',        icon: '🇬🇧', levels: 3 },
    penger:  { title: 'Butikk-leken',   icon: '💰', levels: 3 },
    tegne:   { title: 'Tegne-leken',    icon: '🎨', levels: 3 },
    prikk:   { title: 'Prikk til prikk', icon: '✏️', levels: 3 },
    kode:    { title: 'Kode-roboten',   icon: '🤖', levels: 6,
               levelDesc: { 4: 'Løkker og hindre! 🧱', 5: 'Bygg programmet selv! 🛠️',
                            6: 'Bli liten 🔽 og stor 🔼 forbi hindre!' } }
  }
};
