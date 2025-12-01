const verses = {
  en: [
    {
      reference: 'Psalm 23:1',
      text: 'The Lord is my shepherd; I shall not want.'
    },
    {
      reference: 'Isaiah 40:31',
      text: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles.'
    },
    {
      reference: 'John 3:16',
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'
    },
    {
      reference: 'Philippians 4:13',
      text: 'I can do all things through Christ who strengthens me.'
    }
  ],
  es: [
    {
      reference: 'Salmo 23:1',
      text: 'El Señor es mi pastor, nada me faltará.'
    },
    {
      reference: 'Isaías 40:31',
      text: 'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.'
    },
    {
      reference: 'Juan 3:16',
      text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna.'
    },
    {
      reference: 'Filipenses 4:13',
      text: 'Todo lo puedo en Cristo que me fortalece.'
    }
  ]
};

const getVerseList = (language) => {
  const lang = language && verses[language] ? language : 'en';
  return verses[lang];
};

const getDailyVerse = (language) => {
  const list = getVerseList(language);
  const today = new Date();
  const index = today.getDay() % list.length;
  const verse = list[index];
  return { ...verse, language: language || 'en', day: today.toISOString().split('T')[0] };
};

const getRandomVerse = (language) => {
  const list = getVerseList(language);
  const verse = list[Math.floor(Math.random() * list.length)];
  return { ...verse, language: language || 'en' };
};

module.exports = { getDailyVerse, getRandomVerse };
