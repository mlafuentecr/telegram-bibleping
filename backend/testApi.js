// backend/testApi.js

const VERSES = require('./src/data/verses');
const { getDailyVerse, getRandomVerse } = require('./src/services/verseService');

(async () => {
  console.log('============================');
  console.log('   🔎 TEST DE VERSE API');
  console.log('============================\n');

  // 1️⃣ Test: DATA FILE
  console.log('📚 Test 1: Verses.js cargado');
  console.log('Total de versículos:', VERSES.length);
  console.log('Primer versículo:', VERSES[0]);
  console.log('Último versículo:', VERSES[VERSES.length - 1]);
  console.log('\n');

  // 2️⃣ Test: DAILY VERSE ES
  console.log('📌 Test 2: getDailyVerse("es")');
  const dailyEs = await getDailyVerse('es');
  console.log(dailyEs);
  console.log('\n');

  // 3️⃣ Test: DAILY VERSE EN
  console.log('📌 Test 3: getDailyVerse("en")');
  const dailyEn = await getDailyVerse('en');
  console.log(dailyEn);
  console.log('\n');

  // 4️⃣ Test: RANDOM VERSE ES
  console.log('🎲 Test 4: getRandomVerse("es")');
  const randomEs = await getRandomVerse('es');
  console.log(randomEs);
  console.log('\n');

  // 5️⃣ Test: RANDOM VERSE EN
  console.log('🎲 Test 5: getRandomVerse("en")');
  const randomEn = await getRandomVerse('en');
  console.log(randomEn);
  console.log('\n');

  console.log('============================');
  console.log('   ✅ TEST COMPLETADO');
  console.log('============================');
})();
