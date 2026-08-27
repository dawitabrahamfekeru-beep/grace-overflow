/* ==========================================================================
   GRACE OVERFLOW CHURCH — Content / i18n layer
   --------------------------------------------------------------------------
   ti = Tigrinya (default — this is who actually walks through the door)
   am = Amharic
   en = English

   ⚠️  TRANSLATION NOTICE
   The Tigrinya and Amharic strings below are drafted for design and layout
   purposes. Two of them are verbatim from the church's own channels and are
   confirmed correct:
       ti "ብሩኻት ኢኹም"  ·  am "የተባረካችሁ ናችሁ"   (YouTube channel tagline)
       ti "ኩሉ ግዜ ሮቡዕ፣ ካብ 5:30-7:30"            (Facebook, 26 Aug 2026)
   EVERYTHING ELSE MUST BE PROOFREAD BY A NATIVE SPEAKER FROM THE CHURCH
   BEFORE LAUNCH. Church copy carries doctrinal weight; do not ship machine
   phrasing over a pulpit.

   This object is the single source of truth for all copy. When the site moves
   to a CMS, this file is replaced by the CMS payload — same key shape, so no
   template changes are required.
   ========================================================================== */

window.SITE = {
  /* ---- Facts. Verified where marked. ---- */
  church: {
    nameTi: 'ግሬስ ኦቨርፍሎው',
    nameEn: 'Grace Overflow Church',
    glyph: 'ግ',
    // VERIFIED — Facebook page, Aug 2026
    email: 'graceoverflowug@gmail.com',
    // VERIFIED — Facebook page. NOTE: +256 759 589281 also appears in indexed
    // content elsewhere. Confirm which line is live before launch.
    phone: '+256 704 963575',
    whatsapp: '256704963575',
    // UNCONFIRMED. Indexed third-party content says "Tirupati Mazima Mall,
    // Ggaba Road", but the church's own photographs (Aug 2026) show a large
    // standalone auditorium, not a mall unit — so the mall part has been
    // dropped from the site, the metadata and the structured data rather than
    // propagate a probably-wrong address into Google. Get the real one.
    venue: 'Ggaba Road',
    city: 'Kampala, Uganda',
    tz: 'Africa/Kampala',
    youtube: 'https://www.youtube.com/@GraceOverflowChurch',
    facebook: 'https://www.facebook.com/p/Grace-Overflow-Church-61551832492168/',
    instagram: 'https://www.instagram.com/grace_overflow_church/',
    tiktok: 'https://www.tiktok.com/@grace.overflow.ch'
  },

  /* ---- Weekly rhythm. Times in Africa/Kampala (EAT, UTC+3). ----
     Wednesday is VERIFIED from their own Facebook post.
     Sunday 10:00 is a PLACEHOLDER — must be confirmed with the church.  */
  services: [
    { id: 'sun', dow: 0, start: '10:00', end: '12:30', key: 'svc.sun', confirmed: false },
    { id: 'wed', dow: 3, start: '17:30', end: '19:30', key: 'svc.wed', confirmed: true }
  ],

  /* ---- Sermon archive. Titles and view counts are real, pulled from the
     church's YouTube channel (5.45K subscribers, 174 videos). In production
     this array is populated live from the YouTube Data API. ---- */
  sermons: [
    { id: 'a1', title: { ti: 'ሰንበታዊ ኣገልግሎት፡ 16 ነሓሰ', am: 'የእሁድ አገልግሎት፡ ነሐሴ 16', en: 'Sunday Service, 16 August' }, lang: 'ti', series: 'sunday', date: '2026-08-16', views: '725', live: true, glyph: 'ስ' },
    { id: 'a2', title: { ti: 'ዓወት ብክርስቶስ', am: 'በክርስቶስ ድል', en: 'Victory in Christ' }, lang: 'ti', series: 'word', date: '2026-07-28', views: '538', ref: '1 ቆረንቶስ 15፥57', glyph: 'ዓ' },
    { id: 'a3', title: { ti: 'ህይወት ተዛረቡ', am: 'ሕይወት ተናገሩ', en: 'Speak Life' }, lang: 'ti', series: 'word', date: '2026-07-14', views: '736', ref: '1 ጴጥሮስ 3፥12', glyph: 'ህ' },
    { id: 'a4', title: { ti: 'መፍትሒ', am: 'መፍትሔ', en: 'The Answer' }, lang: 'ti', series: 'word', date: '2026-06-30', views: '477', ref: 'ዮሃንስ 10፥10', glyph: 'መ' },
    { id: 'a5', title: { ti: 'ፍቓድ ኣምላኽ', am: 'የእግዚአብሔር ፈቃድ', en: 'The Will of God' }, lang: 'ti', series: 'word', date: '2026-06-16', views: '578', glyph: 'ፍ' },
    { id: 'a6', title: { ti: 'ተነበዩ', am: 'ትንቢት ተናገሩ', en: 'Prophesy' }, lang: 'ti', series: 'word', date: '2026-06-02', views: '616', glyph: 'ተ' },
    { id: 'a7', title: { ti: 'ለይቲ ኣምልኾ ኣብ ካምፓላ', am: 'የአምልኮ ሌሊት በካምፓላ', en: 'Worship Night in Kampala' }, lang: 'ti', series: 'worship', date: '2026-05-24', views: '2.6k', glyph: 'ለ' },
    { id: 'a8', title: { ti: 'ማራናታ፡ ሓድሽ መዝሙር', am: 'ማራናታ፡ አዲስ መዝሙር', en: 'Maranatha, a New Song' }, lang: 'ti', series: 'worship', date: '2026-05-10', views: '1.9k', glyph: 'ማ' },
    { id: 'a9', title: { ti: 'ግሬስ ኦቨርፍሎው ኣብ በርሚንግሃም', am: 'ግሬስ ኦቨርፍሎው ኣብ በርሚንግሃም', en: 'Grace Overflow in Birmingham' }, lang: 'en', series: 'events', date: '2025-09-27', views: '2.0k', glyph: 'በ' },
    { id: 'a10', title: { ti: 'ሓጐስ ተረኺቡ', am: 'ደስታ አግኝቻለሁ', en: "I've Got Joy" }, lang: 'en', series: 'worship', date: '2025-08-14', views: '1.8k', glyph: 'ሓ' },
    { id: 'a11', title: { ti: 'ውዳሰ ኣብ ግሬስ ኦቨርፍሎው', am: 'ምስጋና በግሬስ ኦቨርፍሎው', en: 'Praise at Grace Overflow' }, lang: 'ti', series: 'worship', date: '2025-06-08', views: '2.6k', glyph: 'ው' },
    { id: 'a12', title: { ti: 'ለይቲ ኣምልኾ 2024', am: 'የአምልኮ ሌሊት 2024', en: 'Worship Night 2024' }, lang: 'ti', series: 'worship', date: '2024-08-01', views: '171', glyph: 'ኣ' }
  ],

  /* ---- ONE clock. The church has ONE building. An earlier version showed six
     city clocks for the diaspora audience, which read as six branches — exactly
     the wrong impression. The single Kampala clock still tells a viewer in
     London or Toronto what time it is in the room. ---- */
  hubs: [
    { city: 'Kampala', tz: 'Africa/Kampala', flag: '🇺🇬', home: true }
  ],

  /* ======================= COPY ======================= */
  t: {
    /* ---------- Navigation & global ---------- */
    'nav.home':    { ti: 'ዋና ገጽ',    am: 'መነሻ',      en: 'Home' },
    'nav.about':   { ti: 'ብዛዕባና',    am: 'ስለ እኛ',    en: 'About' },
    'nav.watch':   { ti: 'ስብከታት',    am: 'ስብከቶች',    en: 'Watch' },
    'nav.visit':   { ti: 'ምብጻሕ',     am: 'ጉብኝት',     en: 'Visit' },
    'nav.give':    { ti: 'ወፈያ',      am: 'ስጦታ',      en: 'Give' },
    'nav.prayer':  { ti: 'ጸሎት',      am: 'ጸሎት',      en: 'Prayer' },
    'nav.contact': { ti: 'ርኸቡና',     am: 'ያግኙን',     en: 'Contact' },
    'nav.menu':    { ti: 'ዝርዝር',     am: 'ዝርዝር',     en: 'Menu' },
    'nav.skip':    { ti: 'ናብ ትሕዝቶ ሕለፍ', am: 'ወደ ይዘቱ ዝለል', en: 'Skip to content' },

    'cta.give':      { ti: 'ወፈያ ሃብ',        am: 'ስጦታ ስጡ',        en: 'Give' },
    'cta.plan':      { ti: 'ምብጻሕካ መደብ ግበር', am: 'ጉብኝትዎን ያቅዱ',    en: 'Plan your visit' },
    'cta.watchlive': { ti: 'ብቐጥታ ተኸታተል',   am: 'በቀጥታ ይመልከቱ',   en: 'Watch live' },
    'cta.watchall':  { ti: 'ኩሎም ስብከታት',    am: 'ሁሉንም ስብከቶች',   en: 'All sermons' },
    'cta.directions':{ ti: 'መገዲ ርአ',        am: 'አቅጣጫ ይመልከቱ',   en: 'Get directions' },
    'cta.whatsapp':  { ti: 'ብዋትስኣፕ ተወከሱና',  am: 'በዋትስአፕ ያግኙን',  en: 'Chat on WhatsApp' },
    'cta.more':      { ti: 'ተወሳኺ',          am: 'ተጨማሪ',          en: 'Learn more' },

    /* ---------- Live status bar ---------- */
    'live.now':    { ti: 'ሕጂ ብቐጥታ ኢና ዘለና',     am: 'አሁን በቀጥታ ላይ ነን',    en: 'We are live right now' },
    'live.join':   { ti: 'ተጸንበረና',              am: 'ይቀላቀሉን',            en: 'Join us' },
    'live.next':   { ti: 'ዝቕጽል ኣገልግሎት',        am: 'ቀጣይ አገልግሎት',        en: 'Next gathering' },
    'live.in':     { ti: 'ኣብ',                   am: 'በ',                  en: 'in' },

    /* ---------- Hero ---------- */
    'hero.eyebrow': { ti: 'ካምፓላ · ኡጋንዳ',  am: 'ካምፓላ · ኡጋንዳ',  en: 'Kampala · Uganda' },
    'hero.title':   { ti: 'ብሩኻት ኢኹም',      am: 'የተባረካችሁ ናችሁ',  en: 'You are blessed' },
    'hero.titleEn': { ti: 'You are blessed', am: 'You are blessed', en: 'ብሩኻት ኢኹም' },
    'hero.sub': {
      ti: 'ኣብ ማእከል ካምፓላ እትርከብ ብትግርኛን ብኣምሓርኛን እትዛረብ ቤተ ክርስቲያን። ኣብ ዝኾነ ኩርናዕ ዓለም ንዘለኹም ድማ ገዛኹም።',
      am: 'በካምፓላ እምብርት የምትገኝ የትግርኛና የአማርኛ ቤተ ክርስቲያን። በዓለም በየትኛውም ጥግ ላላችሁ ሁሉ ደግሞ ቤታችሁ ናት።',
      en: 'A Tigrinya and Amharic speaking church in the heart of Kampala, and a home for our people wherever in the world you are watching from.'
    },
    'hero.hint': { ti: 'ንታሕቲ ውረድ', am: 'ወደ ታች ይሂዱ', en: 'Scroll' },

    /* ---------- Service times ---------- */
    'svc.eyebrow': { ti: 'ሰሙናዊ መደብ',   am: 'ሳምንታዊ መርሃ ግብር', en: 'Every week' },
    'svc.title':   { ti: 'መዓስ ንእከብ',    am: 'መቼ እንሰበሰባለን',    en: 'When we gather' },
    'svc.sub': {
      ti: 'ኣብ ካምፓላ ብኣካል፤ ንዓለም ብምልእታ ድማ ብቐጥታ።',
      am: 'በካምፓላ በአካል፤ ለመላው ዓለም ደግሞ በቀጥታ።',
      en: 'In person in Kampala, and live for the whole world.'
    },
    'svc.sun':      { ti: 'ሰንበታዊ ኣገልግሎት',    am: 'የእሁድ አገልግሎት',    en: 'Sunday Service' },
    'svc.wed':      { ti: 'ናይ ሮቡዕ ጸሎትን ቃልን', am: 'የረቡዕ ጸሎትና ቃል',   en: 'Wednesday Prayer & Word' },
    'svc.inperson': { ti: 'ብኣካልን ብቐጥታን',     am: 'በአካልና በቀጥታ',     en: 'In person + livestream' },
    'svc.yourtime': { ti: 'ኣብ ሰዓትካ',          am: 'በእርስዎ ሰዓት',       en: 'Your local time' },
    'svc.eat':      { ti: 'ናይ ካምፓላ ሰዓት',      am: 'የካምፓላ ሰዓት',      en: 'Kampala time (EAT)' },
    'svc.tzNote': {
      ti: 'ሰዓታት ብኣውቶማቲክ ናብ ናይ መሳርሒኻ ሰዓት ተቐይሮም ኣለዉ።',
      am: 'ሰዓቶች በራስ-ሰር ወደ የመሣሪያዎ ሰዓት ተቀይረዋል።',
      en: 'Times are converted automatically to your device clock, so you never have to do the maths.'
    },

    /* ---------- Three paths ---------- */
    'path.eyebrow': { ti: 'ካበይ ትጅምር', am: 'ከየት ይጀምሩ',  en: 'Start here' },
    'path.title':   { ti: 'ንስኻ ኣበይ ኢኻ ዘለኻ',  am: 'እርስዎ የት ነዎት',  en: 'Where are you today?' },
    'path.new.t':   { ti: 'ሓድሽ ኢየ',  am: 'አዲስ ነኝ',  en: "I'm new" },
    'path.new.d': {
      ti: 'ንመጀመርታ ግዜ ክትመጽእ ትሓስብ ኣለኻ? እንታይ ከም እትጽበ፡ ኣበይ ከም እትኣቱ፡ ኣብ ክንደይ ሰዓት። ኩሉ ኣቐዲምና ክንነግረካ ኢና።',
      am: 'ለመጀመሪያ ጊዜ ሊመጡ አስበዋል? ምን እንደሚጠብቁ፣ የት እንደሚገቡ፣ በስንት ሰዓት። ሁሉንም አስቀድመን እንነግርዎታለን።',
      en: "Thinking of coming for the first time? We'll tell you exactly what to expect, which entrance to use, and how long it runs, all before you arrive."
    },
    'path.abroad.t': { ti: 'ካብ ወጻኢ እኸታተል ኣለኹ', am: 'ከውጭ ሀገር እከታተላለሁ', en: "I'm watching from abroad" },
    'path.abroad.d': {
      ti: 'ካብ ዝኾነ ሃገር ትኸታተል ትህሉ፡ እዛ ቤተ ክርስቲያን ናትካ እያ። ብቐጥታ ተጸንበረና።',
      am: 'ከየትኛውም ሀገር ቢከታተሉ፣ ይህች ቤተ ክርስቲያን የእርስዎ ናት። በቀጥታ ይቀላቀሉን።',
      en: 'Wherever in the world you are watching from, this church is yours too. Join the livestream in your own time zone.'
    },

    /* ---------- Life at Grace Overflow ---------- */
    'min.eyebrow':    { ti: 'ኣገልግሎታት',  am: 'አገልግሎቶች',  en: 'Life here' },
    'min.title':      { ti: 'ኣብዚ ዝርከብ ህይወት', am: 'እዚህ ያለው ሕይወት', en: 'Life at Grace Overflow' },
    'min.sub':        { ti: 'ሓደ ቤት፡ ንኹሉ ዕድመ።', am: 'አንድ ቤት፣ ለሁሉም ዕድሜ።', en: 'One house, every age.' },
    'min.worship.t':  { ti: 'ኣምልኾ',      am: 'አምልኮ',      en: 'Worship' },
    'min.worship.d':  { ti: 'ብትግርኛን ብኣምሓርኛን ዝዝመር ውዳሰ፡ ሰንበት ሰንበት።', am: 'በትግርኛና በአማርኛ የሚዘመር ምስጋና፣ በየእሁዱ።', en: 'Praise in the language you pray in, every Sunday.' },
    'min.kids.t':     { ti: 'ኣገልግሎት ቆልዑ', am: 'የሕፃናት አገልግሎት', en: "Children's ministry" },
    'min.kids.d':     { ti: 'ደቅኻ ናቶም ቦታ ኣለዎም።', am: 'ልጆችዎ የራሳቸው ቦታ አላቸው።', en: 'Your children have a room of their own.' },
    'min.family.t':   { ti: 'ሓንቲ ስድራ',   am: 'አንድ ቤተሰብ',  en: 'One family' },
    'min.family.d':   { ti: 'ሓደ ቤት፡ ሓደ ህዝቢ።', am: 'አንድ ቤት፣ አንድ ሕዝብ።', en: 'One building, one people, and room for you in it.' },
    'clock.label':    { ti: 'ሕጂ ኣብ ካምፓላ', am: 'አሁን በካምፓላ', en: 'Right now in Kampala' },
    'path.prayer.t': { ti: 'ጸሎት የድልየኒ ኣሎ', am: 'ጸሎት ያስፈልገኛል', en: 'I need prayer' },
    'path.prayer.d': {
      ti: 'ስምካ ከይሃብካ ክትጽሕፍ ትኽእል ኢኻ። ብሕታዊ እዩ፤ ብሓላፍነት ድማ ንሕዞ።',
      am: 'ስምዎን ሳይሰጡ መጻፍ ይችላሉ። የግል ነው፤ በኃላፊነትም እንይዘዋለን።',
      en: 'You can write to us without giving your name. It is private, and it is handled by pastoral staff only.'
    },

    /* ---------- Watch ---------- */
    'watch.eyebrow': { ti: 'ስብከታት',  am: 'ስብከቶች',  en: 'Sermons' },
    'watch.title':   { ti: 'ቃል ኣምላኽ ስማዕ', am: 'የእግዚአብሔርን ቃል ይስሙ', en: 'Hear the Word' },
    'watch.sub': {
      ti: '174 ስብከታትን መዝሙራትን፡ ብዝኾነ ግዜ፡ ብዝኾነ ቦታ።',
      am: '174 ስብከቶችና መዝሙሮች፣ በማንኛውም ጊዜ፣ በማንኛውም ስፍራ።',
      en: '174 messages and worship sets, any time, anywhere, in the language you think in.'
    },
    'watch.latest':  { ti: 'ናይ መወዳእታ',  am: 'የመጨረሻው',   en: 'Latest' },
    'watch.search':  { ti: 'ስብከት ድለ…',   am: 'ስብከት ይፈልጉ…', en: 'Search sermons…' },
    'watch.all':     { ti: 'ኩሉ',         am: 'ሁሉም',       en: 'All' },
    'watch.sunday':  { ti: 'ሰንበት',       am: 'እሁድ',       en: 'Sunday' },
    'watch.word':    { ti: 'ቃል',         am: 'ቃል',        en: 'Word' },
    'watch.worship': { ti: 'ኣምልኾ',       am: 'አምልኮ',      en: 'Worship' },
    'watch.events':  { ti: 'ፍጻመታት',      am: 'ዝግጅቶች',     en: 'Events' },
    'watch.views':   { ti: 'ትዕዝብቲ',      am: 'እይታዎች',     en: 'views' },
    'watch.none':    { ti: 'ዝኾነ ውጽኢት የለን።', am: 'ምንም ውጤት የለም።', en: 'Nothing matches that search.' },
    'watch.audio':   { ti: 'ድምጺ ጥራይ ኣውርድ', am: 'ድምጽ ብቻ ያውርዱ', en: 'Download audio only' },
    'watch.audioD': {
      ti: 'ንትሑት ኢንተርነት፡ ናይ ድምጺ ፋይል ካብ ቪድዮ ብ90% ይንእስ።',
      am: 'ለዝቅተኛ ኢንተርኔት፣ የድምጽ ፋይል ከቪዲዮ በ90% ያንሳል።',
      en: 'For expensive data. Audio is about 90% smaller than video.'
    },

    /* ---------- Give ---------- */
    'give.eyebrow': { ti: 'ወፈያ',  am: 'ስጦታ',  en: 'Generosity' },
    'give.title':   { ti: 'ብሓጐስ ሃብ', am: 'በደስታ ይስጡ', en: 'Give with joy' },
    'give.sub': {
      ti: 'ካብ ካምፓላ ብሞባይል ማኒ፤ ካብ ወጻኢ ድማ ብካርድ። ክልቲኡ ውሑስን ቅልጡፍን።',
      am: 'ከካምፓላ በሞባይል ገንዘብ፤ ከውጭ ደግሞ በካርድ። ሁለቱም ደህንነቱ የተጠበቀና ፈጣን።',
      en: 'Mobile Money if you are in Uganda. Card if you are anywhere else. Both secure, both take under a minute.'
    },
    'give.momo.t':  { ti: 'ኣብ ኡጋንዳ', am: 'በኡጋንዳ', en: 'In Uganda' },
    'give.momo.h':  { ti: 'ሞባይል ማኒ', am: 'ሞባይል ገንዘብ', en: 'Mobile Money' },
    'give.momo.d':  { ti: 'MTN ወይ ኣይርተል። ቁጽሪ ጥራይ ኣእቱ።', am: 'MTN ወይም አይርተል። ቁጥር ብቻ ያስገቡ።', en: 'MTN or Airtel. Enter your number, approve on your phone. No card needed.' },
    'give.card.t':  { ti: 'ካብ ወጻኢ', am: 'ከውጭ ሀገር', en: 'From abroad' },
    'give.card.h':  { ti: 'ካርድ ወይ ኣፕል ፔይ', am: 'ካርድ ወይም አፕል ፔይ', en: 'Card or Apple Pay' },
    'give.card.d':  { ti: 'ብፓውንድ፡ ዶላር ወይ ዩሮ ሃብ።', am: 'በፓውንድ፣ በዶላር ወይም በዩሮ ይስጡ።', en: 'Give in GBP, USD, EUR or CAD. Your currency is detected automatically.' },
    'give.amount':  { ti: 'መጠን', am: 'መጠን', en: 'Amount' },
    'give.custom':  { ti: 'ካልእ መጠን', am: 'ሌላ መጠን', en: 'Other amount' },
    'give.freq':    { ti: 'ተደጋጋሚ', am: 'ተደጋጋሚ', en: 'Frequency' },
    'give.once':    { ti: 'ሓደ ግዜ', am: 'አንድ ጊዜ', en: 'One time' },
    'give.monthly': { ti: 'ወርሓዊ', am: 'ወርሃዊ', en: 'Monthly' },
    'give.fund':    { ti: 'ዕላማ', am: 'ዓላማ', en: 'Designation' },
    'give.tithe':   { ti: 'ዕሽር', am: 'አሥራት', en: 'Tithe' },
    'give.offering':{ ti: 'መባእ', am: 'መባ', en: 'Offering' },
    'give.building':{ ti: 'ህንጻ', am: 'ሕንፃ', en: 'Building fund' },
    'give.missions':{ ti: 'ተልእኾ', am: 'ተልእኮ', en: 'Missions' },
    'give.continue':{ ti: 'ቀጽል', am: 'ይቀጥሉ', en: 'Continue' },
    'give.secure':  { ti: 'ውሑስ ክፍሊት', am: 'ደህንነቱ የተጠበቀ ክፍያ', en: 'Secure payment' },
    'give.receipt': {
      ti: 'ደረሰኝ ብቐጥታ ብኢመይል ይመጸካ። ናይ ወፈያኻ ታሪኽ ኣብ ዝኾነ ግዜ ክትርኢ ትኽእል ኢኻ።',
      am: 'ደረሰኝ ወዲያውኑ በኢሜይል ይደርስዎታል። የስጦታዎን ታሪክ በማንኛውም ጊዜ ማየት ይችላሉ።',
      en: 'A receipt reaches you by email immediately, and your full giving history stays available to you.'
    },

    /* ---------- Visit ---------- */
    'visit.eyebrow': { ti: 'ምብጻሕ', am: 'ጉብኝት', en: 'Plan your visit' },
    'visit.title':   { ti: 'ንመጀመርታ ግዜ ትመጽእ?', am: 'ለመጀመሪያ ጊዜ ይመጣሉ?', en: 'Coming for the first time?' },
    'visit.sub': {
      ti: 'ንፈልጦ ኢና። ናብ ሓድሽ ቤተ ክርስቲያን ምእታው ከቢድ ክኸውን ይኽእል እዩ። ስለዚ ዝኾነ ነገር ኣቐዲምና ክንነግረካ ኢና።',
      am: 'እናውቃለን። ወደ አዲስ ቤተ ክርስቲያን መግባት ከባድ ሊሆን ይችላል። ስለዚህ ሁሉንም ነገር አስቀድመን እንነግርዎታለን።',
      en: "We know walking into a new church can be hard. So here is everything, before you have to ask anyone."
    },
    'visit.q1':  { ti: 'ብኸመይ ክኽደን?', am: 'ምን ልልበስ?', en: 'What do I wear?' },
    'visit.a1':  { ti: 'ዝደለኻዮ። ገሊኦም ብቕዲ ይመጹ፡ ገሊኦም ብጂንስ። ክልቲኡ ጽቡቕ እዩ።', am: 'የፈለጉትን። አንዳንዶች በሱፍ ይመጣሉ፣ አንዳንዶች በጂንስ። ሁለቱም ጥሩ ናቸው።', en: 'Whatever you own. Some come in suits, most come in jeans. Nobody will look at you twice.' },
    'visit.q2':  { ti: 'ክንደይ ይወስድ?', am: 'ምን ያህል ጊዜ ይወስዳል?', en: 'How long is it?' },
    'visit.a2':  { ti: 'ሰንበት ኣስታት ክልተ ሰዓትን ፈረቓን። ሮቡዕ ክልተ ሰዓት።', am: 'እሁድ ወደ ሁለት ሰዓት ተኩል። ረቡዕ ሁለት ሰዓት።', en: 'Sunday runs about two and a half hours. Wednesday is two hours.' },
    'visit.q3':  { ti: 'ኣገልግሎት ብኣየናይ ቋንቋ እዩ?', am: 'አገልግሎቱ በየትኛው ቋንቋ ነው?', en: 'What language is the service in?' },
    'visit.a3':  { ti: 'ብትግርኛን ብኣምሓርኛን። ብእንግሊዝኛ እውን ክትከታተል ትኽእል ኢኻ።', am: 'በትግርኛና በአማርኛ። በእንግሊዝኛም መከታተል ይችላሉ።', en: 'Tigrinya and Amharic, with English available too. You will be able to follow.' },
    'visit.q4':  { ti: 'ደቀይ እንታይ ይገብሩ?', am: 'ልጆቼ ምን ያደርጋሉ?', en: 'What about my children?' },
    'visit.a4':  { ti: 'ቆልዑ ኣብ ሰንበት ናቶም ክፍሊ ኣለዎም። ብዕድመ ተመቓቒሎም።', am: 'ልጆች እሁድ የራሳቸው ክፍል አላቸው። በዕድሜ ተከፋፍለው።', en: 'Children have their own space on Sundays, grouped by age, with vetted volunteers.' },
    'visit.q5':  { ti: 'ገንዘብ ክህብ ኣለኒ ድዩ?', am: 'ገንዘብ መስጠት አለብኝ?', en: 'Will I be asked for money?' },
    'visit.a5':  { ti: 'ኣይፋልን። ንስኻ ጋሻና ኢኻ። ወፈያ ንኣባላት እዩ።', am: 'አይደለም። እርስዎ እንግዳችን ነዎት። ስጦታ ለአባላት ነው።', en: 'No. You are our guest. Giving is for those who call this church home, never for visitors.' },
    'visit.form':  { ti: 'ንመጻእካ ንፍለጥ', am: 'መምጣትዎን እናውቅ', en: "Tell us you're coming" },
    'visit.formD': {
      ti: 'ግዴታ ኣይኮነን። ግን ስምካ እንተፈሊጥና፡ ኣብ ኣፍ ደገ ሓደ ሰብ ክጽበየካ እዩ።',
      am: 'ግዴታ አይደለም። ነገር ግን ስምዎን ካወቅን፣ በበሩ ላይ አንድ ሰው ይጠብቅዎታል።',
      en: "Optional. But if we know your name, someone will be waiting for you at the door instead of you walking in alone."
    },

    /* ---------- Prayer ---------- */
    'pray.title':  { ti: 'ጸሎት ሕተት', am: 'ጸሎት ይጠይቁ', en: 'Ask for prayer' },
    'pray.anon':   { ti: 'ብዘይ ስመይ ክሰድድ እደሊ', am: 'ስሜን ሳልጠቅስ መላክ እፈልጋለሁ', en: 'Send this anonymously' },
    'pray.anonD': {
      ti: 'ስምካ ወይ ኢመይልካ ኣይንሕዝን። ንጸሎት ጥራይ ይውዕል።',
      am: 'ስምዎን ወይም ኢሜይልዎን አንይዝም። ለጸሎት ብቻ ይውላል።',
      en: 'We store no name, no email, no location. It goes to pastoral staff for prayer and nothing else.'
    },
    'pray.send':   { ti: 'ስደድ', am: 'ላክ', en: 'Send request' },

    /* ---------- Stay connected ---------- */
    'conn.eyebrow': { ti: 'ተራኸብ', am: 'ይገናኙ', en: 'Stay connected' },
    'conn.title':   { ti: 'ኣይንፈላለ', am: 'አንለያይ', en: "Don't lose us" },
    'conn.sub': {
      ti: 'ናይ ሰሙን መደብ፡ ሓድሽ ስብከትን ፍጻመታትን፡ ብቐጥታ ናብ ኢመይልካ ወይ ዋትስኣፕካ።',
      am: 'የሳምንቱ መርሃ ግብር፣ አዲስ ስብከትና ዝግጅቶች፣ በቀጥታ ወደ ኢሜይልዎ ወይም ዋትስአፕዎ።',
      en: 'The week ahead, new messages, and event news, straight to your inbox or WhatsApp. One message a week, never more.'
    },
    'conn.ph':   { ti: 'ኢመይልካ', am: 'ኢሜይልዎ', en: 'Your email address' },
    'conn.btn':  { ti: 'ተመዝገብ', am: 'ይመዝገቡ', en: 'Subscribe' },
    'conn.note': { ti: 'ኣብ ዝኾነ ግዜ ክትወጽእ ትኽእል። ኢመይልካ ንዝኾነ ሰብ ኣይንህብን።', am: 'በማንኛውም ጊዜ መውጣት ይችላሉ። ኢሜይልዎን ለማንም አንሰጥም።', en: 'Unsubscribe any time. We never share your address with anyone.' },

    /* ---------- About ---------- */
    'about.eyebrow': { ti: 'ብዛዕባና', am: 'ስለ እኛ', en: 'Who we are' },
    'about.title':   { ti: 'የሱስ ጥራይ ንሰብኽ', am: 'ኢየሱስን ብቻ እንሰብካለን', en: 'Preaching Jesus, and Jesus alone' },
    'about.sub': {
      ti: 'እዚ ካብ መጀመርታ ዝነበረ ቃልና እዩ። ካልእ ኣጀንዳ የብልናን።',
      am: 'ይህ ከመጀመሪያው የነበረ ቃላችን ነው። ሌላ አጀንዳ የለንም።',
      en: 'That has been our line from the beginning. We have no other agenda.'
    },
    'about.story':   { ti: 'ታሪኽና', am: 'ታሪካችን', en: 'Our story' },
    'about.leaders': { ti: 'መራሕቲ', am: 'መሪዎች', en: 'Leadership' },
    'about.belief':  { ti: 'እምነትና', am: 'እምነታችን', en: 'What we believe' },
    'about.safe':    { ti: 'ውሕስነት', am: 'ደህንነት', en: 'Safeguarding' },

    /* ---------- Footer ---------- */
    'foot.visit':   { ti: 'በጽሓና', am: 'ይጎብኙን', en: 'Visit us' },
    'foot.explore': { ti: 'ዳህስስ', am: 'ያስሱ', en: 'Explore' },
    'foot.connect': { ti: 'ተራኸብ', am: 'ይገናኙ', en: 'Connect' },
    'foot.legal':   { ti: 'ሕጋዊ', am: 'ሕጋዊ', en: 'Legal' },
    'foot.privacy': { ti: 'ናይ ብሕቲ ፖሊሲ', am: 'የግላዊነት ፖሊሲ', en: 'Privacy policy' },
    'foot.safe':    { ti: 'ውሕስነት ቆልዑ', am: 'የልጆች ደህንነት', en: 'Safeguarding policy' },
    'foot.rights':  { ti: 'ኩሉ መሰል ዝተሓለወ እዩ።', am: 'ሁሉም መብት የተጠበቀ ነው።', en: 'All rights reserved.' },
    'foot.lowdata': { ti: 'ትሑት ዳታ', am: 'ዝቅተኛ ዳታ', en: 'Low data mode' },
    'foot.lowdataD':{ ti: 'ስእልታትን ምንቅስቓስን የጥፍእ', am: 'ምስሎችንና እንቅስቃሴን ያጠፋል', en: 'Turns off motion and heavy graphics' }
  }
};
