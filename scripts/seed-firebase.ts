// scripts/seedFirebase.ts
// Run this once to populate your Firestore with initial azkar data

import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const azkarData = [
  {
    id: "ayatul_kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khuzuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard",
    urduTranslation: "اللہ کے سوا کوئی معبود نہیں، وہ زندہ اور قائم رہنے والا ہے، اُسے نہ اونگھ آتی ہے نہ نیند، آسمانوں اور زمین میں جو کچھ ہے سب اسی کا ہے",
    repetitions: 1,
    fazilat: "رسول اللہ ﷺ نے فرمایا: جو شخص ہر نماز کے بعد آیۃ الکرسی پڑھے گا، اسے جنت میں داخل ہونے سے موت کے سوا کوئی چیز نہیں روکے گی۔ یہ قرآن کی سب سے عظیم آیت ہے",
    category: "both",
    order: 1
  },
  {
    id: "morning_protection",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdulillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    urduTranslation: "ہم نے صبح کی اور ساری بادشاہی اللہ کی ہے، تمام تعریفیں اللہ کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے",
    repetitions: 1,
    fazilat: "جو شخص صبح کے وقت یہ دعا پڑھے گا، اسے پورے دن اللہ کی خاص حفاظت حاصل رہے گی",
    category: "morning",
    order: 2
  },
  {
    id: "evening_protection",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdulillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    urduTranslation: "ہم نے شام کی اور ساری بادشاہی اللہ کی ہے، تمام تعریفیں اللہ کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں",
    repetitions: 1,
    fazilat: "جو شخص شام کے وقت یہ دعا پڑھے گا، اسے پوری رات اللہ کی خاص حفاظت حاصل رہے گی",
    category: "evening",
    order: 3
  },
  {
    id: "subhanallah_33",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allahi wa bihamdihi",
    urduTranslation: "اللہ پاک ہے اور تمام تعریفیں اسی کے لیے ہیں",
    repetitions: 33,
    fazilat: "رسول اللہ ﷺ نے فرمایا: جو شخص دن میں سو مرتبہ یہ کلمات پڑھے، اس کے گناہ معاف کر دیے جاتے ہیں اگرچہ سمندر کی جھاگ کے برابر ہوں",
    category: "both",
    order: 4
  },
  {
    id: "alhamdulillah_33",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    urduTranslation: "تمام تعریفیں اللہ کے لیے ہیں",
    repetitions: 33,
    fazilat: "یہ کلمہ میزان میں بھاری ہے اور اللہ تعالیٰ کو بہت محبوب ہے۔ جنت کے خزانوں میں سے ایک خزانہ ہے",
    category: "both",
    order: 5
  },
  {
    id: "allahu_akbar_34",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    urduTranslation: "اللہ سب سے بڑا ہے",
    repetitions: 34,
    fazilat: "ہر نماز کے بعد 33-33-34 تسبیحات پڑھنا سنت مؤکدہ ہے۔ یہ بڑے اجر و ثواب کا باعث ہے",
    category: "both",
    order: 6
  },
  {
    id: "la_ilaha_morning_100",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    urduTranslation: "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریفیں ہیں اور وہ ہر چیز پر قادر ہے",
    repetitions: 100,
    fazilat: "جو شخص صبح کے وقت 100 مرتبہ یہ کلمات پڑھے گا، اسے دس غلام آزاد کرنے کا ثواب ملے گا، اور اس کے لیے 100 نیکیاں لکھی جائیں گی",
    category: "morning",
    order: 7
  },
  {
    id: "surah_ikhlas_3",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul Huwa Allahu Ahad, Allah-us-Samad, Lam yalid wa lam yulad, Wa lam yakun lahu kufuwan ahad",
    urduTranslation: "کہو: وہ اللہ ایک ہے، اللہ بے نیاز ہے، نہ اس کی کوئی اولاد ہے نہ وہ کسی کی اولاد ہے، اور کوئی اس کا ہمسر نہیں",
    repetitions: 3,
    fazilat: "رسول اللہ ﷺ نے فرمایا: جو شخص تین مرتبہ سورہ اخلاص پڑھے گا، گویا اس نے پورا قرآن پڑھ لیا",
    category: "both",
    order: 8
  },
  {
    id: "surah_falaq_3",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Qul a'udhu bi Rabbil-falaq, min sharri ma khalaq, wa min sharri ghasiqin idha waqab, wa min sharrin-naffathati fil-'uqad, wa min sharri hasidin idha hasad",
    urduTranslation: "کہو: میں صبح کے رب کی پناہ مانگتا ہوں، ہر مخلوق کے شر سے، اندھیری رات کے شر سے جب وہ چھا جائے، گرہوں میں پھونکنے والیوں کے شر سے، اور حاسد کے شر سے جب وہ حسد کرے",
    repetitions: 3,
    fazilat: "صبح و شام تین مرتبہ معوذتین پڑھنے سے تمام چیزوں سے حفاظت ہو جاتی ہے۔ ہر قسم کے شر سے محفوظ رہنے کا ذریعہ ہے",
    category: "both",
    order: 9
  },
  {
    id: "surah_nas_3",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Qul a'udhu bi Rabbin-nas, Malikin-nas, Ilahin-nas, min sharril-waswasil-khannas, alladhi yuwaswisu fi sudurin-nas, minal-jinnati wan-nas",
    urduTranslation: "کہو: میں لوگوں کے رب کی، لوگوں کے بادشاہ کی، لوگوں کے معبود کی پناہ مانگتا ہوں، وسوسہ ڈالنے والے کے شر سے جو پیچھے ہٹ جاتا ہے، جو لوگوں کے دلوں میں وسوسے ڈالتا ہے، جنوں اور انسانوں میں سے",
    repetitions: 3,
    fazilat: "یہ سورت شیطان کے وسوسوں اور جادو ٹونے سے بچاتی ہے۔ صبح و شام تین بار پڑھنا مستحب ہے",
    category: "both",
    order: 10
  },
  {
    id: "bismillah_protection_3",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim",
    urduTranslation: "اللہ کے نام سے، جس کے نام کے ساتھ زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی اور وہی سننے والا جاننے والا ہے",
    repetitions: 3,
    fazilat: "رسول اللہ ﷺ نے فرمایا: جو شخص صبح و شام تین مرتبہ یہ کلمات پڑھے گا، اسے کوئی چیز اچانک نقصان نہیں پہنچا سکتی",
    category: "both",
    order: 11
  },
  {
    id: "raditu_billah_3",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    transliteration: "Raditu billahi Rabba, wa bil-Islami dina, wa bi-Muhammadin (sallallahu 'alayhi wa sallam) nabiyya",
    urduTranslation: "میں اللہ کو رب مان کر، اسلام کو دین مان کر، اور محمد ﷺ کو نبی مان کر راضی ہوں",
    repetitions: 3,
    fazilat: "جو شخص صبح و شام تین بار یہ کلمات پڑھے گا، اس کے لیے جنت واجب ہو جاتی ہے",
    category: "both",
    order: 12
  }
];

export async function seedFirestore() {
  console.log('🌱 Starting Firestore seeding...');
  
  try {
    const azkarCollection = collection(db, 'azkar');
    
    for (const zikr of azkarData) {
      const { id, ...data } = zikr;
      await setDoc(doc(azkarCollection, id), data);
      console.log(`✅ Added: ${id}`);
    }
    
    console.log('🎉 Firestore seeding completed successfully!');
    console.log(`📊 Total documents added: ${azkarData.length}`);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    throw error;
  }
}

// To run this script, create a temporary component or screen that calls seedFirestore()
// Example usage in a test screen:
// 
// import { seedFirestore } from '../scripts/seedFirebase';
// 
// <Button onPress={seedFirestore} title="Seed Database" />