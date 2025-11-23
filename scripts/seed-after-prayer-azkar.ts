// scripts/seed-after-prayer-azkar.ts
// Seeds after-prayer azkar data to Firestore

import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

// Firebase config - make sure to set your environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// After prayer azkar data
const afterPrayerAzkarData = [
  {
    id: "takbir_after_salam",
    arabic: "اللَّهُ أَكْبَرُ",
    translations: {
      en: "Allah is the Greatest",
      ur: "اللہ سب سے بڑا ہے",
      bn: "আল্লাহ সর্বমহান",
      hi: "अल्लाह सब से बड़ा है",
      id: "Allah Maha Besar"
    },
    transliteration: {
      en: "Allahu Akbar",
      ur: "اللہ اکبر",
      bn: "আল্লাহু আকবার",
      hi: "अल्लाहु अकबर",
      id: "Allahu Akbar"
    },
    narrator: "Abdullah bin Abbas",
    hadithReference: [
      { source: "Bukhari", number: "842" },
      { source: "Muslim", number: "1316" }
    ],
    repetitions: 1,
    category: ['after_prayer'],
    order: 1,
    specialNotes: {
      en: "Said loudly once after completing the obligatory prayer",
      ur: "فرض نماز کی تکمیل کے بعد بلند آواز سے ایک مرتبہ",
      bn: "ফরজ নামাজ শেষ করার পর উচ্চস্বরে একবার",
      hi: "फ़र्ज़ नमाज़ के बाद बुलंद आवाज़ से एक मर्तबा",
      id: "Dibaca dengan suara keras satu kali setelah salam shalat fardhu"
    }
  },
  {
    id: "astaghfirullah_3_times",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    translations: {
      en: "I ask Allah for forgiveness",
      ur: "میں اللہ سے بخشش مانگتا ہوں",
      bn: "আমি আল্লাহর কাছে ক্ষমা চাই",
      hi: "मैं अल्लाह से माफ़ी मांगता हूं",
      id: "Aku memohon ampunan kepada Allah"
    },
    transliteration: {
      en: "Astaghfirullah",
      ur: "استغفر اللہ",
      bn: "আস্তাগফিরুল্লাহ",
      hi: "अस्तग़फ़िरुल्लाह",
      id: "Astaghfirullaah"
    },
    narrator: "Thawban",
    hadithReference: [
      { source: "Muslim", number: "1334" }
    ],
    repetitions: 3,
    category: ['after_prayer'],
    order: 2,
    benefits: {}
  },
  {
    id: "allahumma_antas_salam",
    arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    translations: {
      en: "O Allah! You are As-Salam (the One Who is free from all defects and deficiencies) and from You is all peace, blessed are You, Possessor of majesty and honor",
      ur: "اے اللہ! تو سلامتی والا ہے اور تجھ سے سلامتی ہے، تو بابرکت ہے، اے بزرگی اور عزت والے",
      bn: "হে আল্লাহ! তুমি শান্তি এবং তোমা থেকেই শান্তি, তুমি বরকতময়, হে মহিমা ও সম্মানের অধিকারী",
      hi: "ऐ अल्लाह! तू सलामती वाला है और तुझसे सलामती है, तू बाबरकत है, ऐ बुज़ुर्गी और इज़्ज़त वाले",
      id: "Ya Allah! Engkau adalah As-Salam dan dari-Mu keselamatan, Maha Suci Engkau wahai Pemilik Keagungan dan Kemuliaan"
    },
    transliteration: {
      en: "Allahumma Antas-Salamu wa minkas-salamu tabarakta ya Dhal-Jalali wal-Ikram",
      ur: "اللہم انت السلام ومنک السلام تبارکت یا ذالجلال والاکرام",
      bn: "আল্লাহুম্মা আনতাস সালামু ওয়া মিনকাস সালামু তাবারাকতা ইয়া যাল জালালি ওয়াল ইকরাম",
      hi: "अल्लाहुम्मा अन्तस्सलामु व मिन्कस्सलामु तबारक्ता या ज़ल्जलालि वल्इकराम",
      id: "Allaahumma Antas-Salaamu wa minkas-salaamu tabaarakta yaa Dzal-Jalaali wal-Ikraam"
    },
    narrator: "Thawban",
    hadithReference: [
      { source: "Muslim", number: "1334" }
    ],
    repetitions: 1,
    category: ['after_prayer'],
    order: 3,
    benefits: {}
  },
  {
    id: "ayatul_kursi_after_prayer",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translations: {
      en: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great. [Surah Al-Baqarah: Verse 255]",
      ur: "اللہ! نہیں کوئی معبود سوائے اس کے، وہ زندہ ہے قائم رکھنے والا... [سورۃ البقرۃ: آیت 255]",
      bn: "আল্লাহ! তিনি ছাড়া কোনো উপাস্য নেই, তিনি চিরঞ্জীব, সর্বসত্তার ধারক... [সূরা বাকারা: আয়াত ২৫৫]",
      hi: "अल्लाह! उसके सिवा कोई माबूद नहीं, वह ज़िंदा है क़ायम रखने वाला... [सूरह बक़रह: आयत 255]",
      id: "Allah, tidak ada Tuhan yang berhak disembah melainkan Dia Yang Hidup kekal lagi terus menerus mengurus... [Surah Al-Baqarah: Ayat 255]"
    },
    transliteration: {
      en: "Allahu la ilaha illa Huwal Hayyul Qayyum...",
      ur: "اللہ لا الہ الا ھو الحی القیوم...",
      bn: "আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়ুল কাইয়ূম...",
      hi: "अल्लाहु ला इलाहा इल्ला हुवल हय्युल क़य्यूम...",
      id: "Allaahu laa ilaaha illaa Huwal Hayyul Qayyuum..."
    },
    narrator: "Abu Umamah",
    hadithReference: [
      { source: "Al-Sunan Al-Kubra lil-Nasai", number: "9928" }
    ],
    repetitions: 1,
    category: ['after_prayer'],
    order: 4,
    benefits: {
      en: "Whoever recites Ayat al-Kursi after every prayer will surely enter paradise immediately after death",
      ur: "جو شخص ہر نماز کے بعد آیت الکرسی پڑھے وہ مرنے کے فوراً بعد جنت میں داخل ہوگا",
      bn: "যে ব্যক্তি প্রতি নামাজের পর আয়াতুল কুরসি পাঠ করবে, সে মৃত্যুর পর সরাসরি জান্নাতে প্রবেশ করবে",
      hi: "जो शख़्स हर नमाज़ के बाद आयतल कुर्सी पढ़े वो मरने के फ़ौरन बाद जन्नत में दाख़िल होगा",
      id: "Barangsiapa membaca Ayat Kursi setelah setiap shalat, dia pasti masuk surga segera setelah meninggal"
    }
  },
  {
    id: "subhanallah_33_after_prayer",
    arabic: "سُبْحَانَ اللَّهِ (33 مرتبہ)\nالْحَمْدُ لِلَّهِ (33 مرتبہ)\nاللَّهُ أَكْبَرُ (33 مرتبہ)",
    translations: {
      en: "Glory be to Allah (33 times)\nAll praise is for Allah (33 times)\nAllah is the Greatest (33 times)",
      ur: "اللہ پاک ہے (33 مرتبہ)\nتمام تعریفیں اللہ کے لیے ہیں (33 مرتبہ)\nاللہ سب سے بڑا ہے (33 مرتبہ)",
      bn: "আল্লাহ পবিত্র (৩৩ বার)\nসমস্ত প্রশংসা আল্লাহর জন্য (৩৩ বার)\nআল্লাহ সর্বমহান (৩৩ বার)",
      hi: "अल्लाह पाक है (33 मर्तबा)\nतमाम तारीफ़ें अल्लाह के लिए हैं (33 मर्तबा)\nअल्लाह सबसे बड़ा है (33 मर्तबा)",
      id: "Maha Suci Allah (33 kali)\nSegala puji bagi Allah (33 kali)\nAllah Maha Besar (33 kali)"
    },
    transliteration: {
      en: "SubhanAllah (33 times)\nAlhamdulillah (33 times)\nAllahu Akbar (33 times)",
      ur: "سبحان اللہ (33 مرتبہ)\nالحمد للہ (33 مرتبہ)\nاللہ اکبر (33 مرتبہ)",
      bn: "সুবহানাল্লাহ (৩৩ বার)\nআলহামদুলিল্লাহ (৩৩ বার)\nআল্লাহু আকবার (৩৩ বার)",
      hi: "सुब्हानल्लाह (33 मर्तबा)\nअल्हम्दुलिल्लाह (33 मर्तबा)\nअल्लाहु अकबर (33 मर्तबा)",
      id: "Subhaanallaah (33 kali)\nAlhamdulillaah (33 kali)\nAllaahu Akbar (33 kali)"
    },
    narrator: "Abu Hurairah",
    hadithReference: [
      { source: "Muslim", number: "1352" },
      { source: "Bukhari", number: "843" }
    ],
    repetitions: 99,
    category: ['after_prayer'],
    order: 5,
    benefits: {
      en: "The one who says these words after every prayer never becomes disappointed, and all of his sins are forgiven, even if his sins are like the foam of the sea",
      ur: "جو شخص ہر نماز کے بعد یہ کلمات کہے وہ کبھی ناکام اور نامراد نہیں رہتا، اور اسکے تمام گناہ معاف کر دیے جاتے ہیں",
      bn: "যে ব্যক্তি প্রতি নামাযের পর এই কলেমাগুলো পড়বে সে কখনো হতাশ হবে না এবং তার সকল গুনাহ মাফ করে দেওয়া হবে",
      hi: "जो शख़्स हर नमाज़ के बाद ये कलिमात कहे वो कभी नाकाम और नामुराद नहीं रहता",
      id: "Barangsiapa mengucapkan kalimat ini setelah setiap shalat tidak akan pernah kecewa"
    }
  },
  {
    id: "la_ilaha_100_after_prayer",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translations: {
      en: "There is none worthy of worship but Allah alone, with no partner or associate. He is the Dominion, to Him be praise, and He is able to do all things",
      ur: "نہیں کوئی معبود مگر اللہ، وہ اکیلا ہے، نہیں کوئی شریک اس کا، اسی کی بادشاہی ہے اور اسی کے لیے سب تعریفیں ہیں",
      bn: "আল্লাহ ছাড়া কোনো মাবুদ নেই, তিনি একক, তাঁর কোনো শরীক নেই। রাজত্ব তাঁরই",
      hi: "नहीं कोई माबूद मगर अल्लाह, वो अकेला है, नहीं कोई शरीक उसका",
      id: "Tiada Tuhan yang berhak disembah selain Allah Yang Maha Esa, tiada sekutu bagi-Nya"
    },
    transliteration: {
      en: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      ur: "لا الہ الا اللہ وحدہ لا شریک لہ، لہ الملک ولہ الحمد وھو علی کل شیء قدیر",
      bn: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহ",
      hi: "ला इलाहा इल्लल्लाहु वहदहु ला शरीका लह",
      id: "Laa ilaaha illallaahu wahdahu laa syariika lah"
    },
    hadithReference: [
      { source: "Muslim", number: "1352" },
      { source: "Bukhari", number: "843" }
    ],
    repetitions: 1,
    category: ['after_prayer'],
    order: 6,
    specialNotes: {
      en: "Said once to complete the number of 100",
      ur: "100 کا عدد پورا کرنے کے لیے ایک مرتبہ",
      bn: "১০০ সংখ্যা পূর্ণ করার জন্য একবার",
      hi: "100 का अदद पूरा करने के लिए एक मर्तबा",
      id: "Dibaca satu kali untuk menyempurnakan hitungan 100"
    },
    benefits: {}
  }
];

async function seedAfterPrayerAzkar() {
  console.log("🚀 Starting to seed after-prayer azkar to Firestore...");
  console.log(`📊 Total azkar to seed: ${afterPrayerAzkarData.length}`);

  try {
    const azkarCollection = collection(db, "azkar");
    let successCount = 0;
    let errorCount = 0;

    for (const azkar of afterPrayerAzkarData) {
      try {
        const docRef = doc(azkarCollection, azkar.id);

        // Convert the data to match Firestore structure
        const firestoreData = {
          arabic: azkar.arabic,
          translations: azkar.translations,
          transliteration: azkar.transliteration,
          benefits: azkar.benefits || {},
          repetitions: azkar.repetitions,
          category: azkar.category,
          order: azkar.order,
          references: azkar.hadithReference.map(ref => ({
            bookId: ref.source,
            number: parseInt(ref.number) || 0,
          })),
          narrator: azkar.narrator || "",
          specialNotes: azkar.specialNotes || {},
        };

        await setDoc(docRef, firestoreData);
        successCount++;
        console.log(`✅ Seeded: ${azkar.id}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error seeding ${azkar.id}:`, error);
      }
    }

    console.log("\n📊 Summary:");
    console.log(`✅ Successfully seeded: ${successCount} azkar`);
    console.log(`❌ Failed to seed: ${errorCount} azkar`);
    console.log("\n🎉 After-prayer azkar seeding completed!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal error during seeding:", error);
    process.exit(1);
  }
}

// Run the seed function
seedAfterPrayerAzkar();
