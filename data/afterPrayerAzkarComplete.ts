// afterPrayerAzkarComplete.ts
// Azkar to be recited after obligatory prayers (Farz Namaz)
// Based on authentic Hadith from the GREEN Card collection
// Includes 6 languages: Arabic, English, Urdu, Bengali, Hindi, Indonesian

export interface AfterPrayerAzkar {
  id: string;
  arabic: string;
  translations: {
    en: string;
    ur: string;
    bn: string;
    hi: string;
    id: string;
  };
  transliteration: {
    en: string;
    ur: string;
    bn: string;
    hi: string;
    id: string;
  };
  narrator?: string;
  hadithReference: {
    source: string;
    number: string;
  }[];
  repetitions: number;
  category: ('morning' | 'evening' | 'after_prayer')[];
  order: number;
  benefits?: {
    en: string;
    ur: string;
    bn: string;
    hi: string;
    id: string;
  };
  specialNotes?: {
    en: string;
    ur: string;
    bn: string;
    hi: string;
    id: string;
  };
}

const afterPrayerAzkarData: AfterPrayerAzkar[] = [
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
    order: 2
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
    order: 3
  },
  {
    id: "ayatul_kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translations: {
      en: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great. [Surah Al-Baqarah: Verse 255]",
      ur: "اللہ! نہیں کوئی معبود سوائے اس کے، وہ زندہ ہے قائم رکھنے والا، اسے نہ اونگھ آتی ہے نہ نیند، اسی کا ہے جو آسمانوں میں ہے اور جو زمین میں ہے، کون ہے جو اس کے پاس سفارش کرے مگر اس کی اجازت سے؟ وہ جانتا ہے جو ان کے آگے ہے اور جو ان کے پیچھے ہے، اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے مگر جتنا وہ چاہے، اس کی کرسی نے آسمانوں اور زمین کو گھیر رکھا ہے، اور ان دونوں کی حفاظت اسے تھکاتی نہیں، اور وہ بلند و بالا ہے عظمت والا۔ [سورۃ البقرۃ: آیت 255]",
      bn: "আল্লাহ! তিনি ছাড়া কোনো উপাস্য নেই, তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তাঁকে তন্দ্রা স্পর্শ করে না এবং নিদ্রাও নয়। আসমান ও জমিনে যা কিছু আছে সব তাঁরই। কে আছে এমন যে, তাঁর অনুমতি ছাড়া তাঁর কাছে সুপারিশ করবে? তাদের সামনে ও পেছনে যা কিছু আছে তিনি তা জানেন। তাঁর জ্ঞানের কোনো কিছুই তারা আয়ত্ত করতে পারে না, তবে যা তিনি ইচ্ছে করেন। তাঁর কুরসি আসমান ও জমিন পরিব্যাপ্ত করে আছে। আর এ দুটোর রক্ষণাবেক্ষণ তাঁর জন্য ক্লান্তিকর নয়। তিনি সর্বোচ্চ, মহান। [সূরা বাকারা: আয়াত ২৫৫]",
      hi: "अल्लाह! उसके सिवा कोई माबूद नहीं, वह ज़िंदा है क़ायम रखने वाला, उसे न ऊंघ आती है न नींद, उसी का है जो आसमानों में है और जो ज़मीन में है, कौन है जो उसके पास सिफ़ारिश करे मगर उसकी इजाज़त से? वह जानता है जो उनके आगे है और जो उनके पीछे है, और वह उसके इल्म में से किसी चीज़ का एहाता नहीं कर सकते मगर जितना वह चाहे, उसकी कुर्सी ने आसमानों और ज़मीन को घेर रखा है, और इन दोनों की हिफ़ाज़त उसे थकाती नहीं, और वह बुलंद व बाला है अज़मत वाला। [सूरह बक़रह: आयत 255]",
      id: "Allah, tidak ada Tuhan yang berhak disembah melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafa'at di sisi Allah tanpa izin-Nya. Allah mengetahui apa-apa yang di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui apa-apa dari ilmu Allah melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Allah tidak merasa berat memelihara keduanya, dan Allah Maha Tinggi lagi Maha Besar. [Surah Al-Baqarah: Ayat 255]"
    },
    transliteration: {
      en: "Allahu la ilaha illa Huwal Hayyul Qayyum, la ta'khuzuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa'u 'indahu illa bi-idhnih, ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha', wasi'a kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifzuhuma, wa Huwal-'Aliyyul-'Azim",
      ur: "اللہ لا الہ الا ھو الحی القیوم، لا تاخذہ سنۃ ولا نوم، لہ ما فی السماوات وما فی الارض، من ذا الذی یشفع عندہ الا باذنہ، یعلم ما بین ایدیھم وما خلفھم، ولا یحیطون بشیء من علمہ الا بما شاء، وسع کرسیہ السماوات والارض، ولا یؤدہ حفظھما، وھو العلی العظیم",
      bn: "আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়ুল কাইয়ূম, লা তা'খুযুহু সিনাতুন ওয়া লা নাওম, লাহু মা ফিস সামাওয়াতি ওয়া মা ফিল আরদ, মান যাল্লাযী ইয়াশফাউ ইনদাহু ইল্লা বি ইযনিহি, ইয়া'লামু মা বাইনা আইদীহিম ওয়া মা খালফাহুম, ওয়া লা ইউহীতূনা বি শাইয়িম মিন ইলমিহী ইল্লা বিমা শাআ, ওয়াসিআ কুরসিয়্যুহুস সামাওয়াতি ওয়াল আরদ, ওয়া লা ইয়াউদুহু হিফযুহুমা, ওয়া হুওয়াল আলিয়্যুল আযীম",
      hi: "अल्लाहु ला इलाहा इल्ला हुवल हय्युल क़य्यूम, ला ताख़ुज़ुहु सिनतुन व ला नौम, लहु मा फ़िस्समावाति व मा फ़िल अर्ज़, मन ज़ल्लज़ी यश्फ़उ इन्दहु इल्ला बिइज़्निही, याअ्लमु मा बैना अय्दीहिम व मा ख़ल्फ़हुम, व ला युहीतूना बिशैइम्मिन इल्मिही इल्ला बिमा शा, वसिअ कुर्सीय्युहुस्समावाति वल अर्ज़, व ला यऊदुहु हिफ़्ज़ुहुमा, व हुवल अलीय्युल अज़ीम",
      id: "Allaahu laa ilaaha illaa Huwal Hayyul Qayyuum, laa ta'khuzuhu sinatun wa laa nawm, lahu maa fis-samaawaati wa maa fil-ardh, man dzal-ladzii yashfa'u 'indahu illaa bi-idznihi, ya'lamu maa bayna aydiihim wa maa khalfahum, wa laa yuhiituuna bi-syai'im-min 'ilmihii illaa bimaa syaa', wasi'a kursiyyuhus-samaawaati wal-ardh, wa laa ya'uuduhu hifzuhumaa, wa Huwal-'Aliyyul-'Azhiim"
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
    id: "subhanallah_alhamdulillah_allahuakbar_33",
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
      { source: "Muslim", number: "1349" },
      { source: "Bukhari", number: "843" }
    ],
    repetitions: 99,
    category: ['after_prayer'],
    order: 5,
    benefits: {
      en: "The one who says these words after every prayer never becomes disappointed, and all of his sins are forgiven, even if his sins are like the foam of the sea",
      ur: "جو شخص ہر نماز کے بعد یہ کلمات کہے وہ کبھی ناکام اور نامراد نہیں رہتا، اور اسکے تمام گناہ معاف کر دیے جاتے ہیں، خواہ اسکے گناہ سمندر کی جھاگ کے برابر ہی کیوں نہ ہوں",
      bn: "যে ব্যক্তি প্রতি নামাযের পর এই কলেমাগুলো পড়বে সে কখনো হতাশ হবে না এবং তার সকল গুনাহ মাফ করে দেওয়া হবে, যদিও তার গুনাহ সমুদ্রের ফেনার মত হয়",
      hi: "जो शख़्स हर नमाज़ के बाद ये कलिमात कहे वो कभी नाकाम और नामुराद नहीं रहता, और उसके तमाम गुनाह माफ़ कर दिए जाते हैं, ख़्वाह उसके गुनाह समुन्दर की झाग के बराबर ही क्यों न हों",
      id: "Barangsiapa mengucapkan kalimat ini setelah setiap shalat tidak akan pernah kecewa, dan semua dosanya akan diampuni, meskipun dosanya sebanyak buih di lautan"
    }
  },
  {
    id: "complete_100_with_la_ilaha",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translations: {
      en: "There is none worthy of worship but Allah alone, with no partner or associate. He is the Dominion, to Him be praise, and He is able to do all things",
      ur: "نہیں کوئی معبود مگر اللہ، وہ اکیلا ہے، نہیں کوئی شریک اس کا، اسی کی بادشاہی ہے اور اسی کے لیے سب تعریفیں ہیں، اور وہ ہر شہ پر قوت رکھتا ہے",
      bn: "আল্লাহ ছাড়া কোনো মাবুদ নেই, তিনি একক, তাঁর কোনো শরীক নেই। রাজত্ব তাঁরই, প্রশংসাও তাঁর এবং তিনি সকল কিছুর উপর ক্ষমতাবান",
      hi: "नहीं कोई माबूद मगर अल्लाह, वो अकेला है, नहीं कोई शरीक उसका, उसी की बादशाही है और उसी के लिए सब तारीफ़ें हैं, और वो हर शै पर क़ुदरत रखता है",
      id: "Tiada Tuhan yang berhak disembah selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala pujian. Dia Mahakuasa atas segala sesuatu"
    },
    transliteration: {
      en: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      ur: "لا الہ الا اللہ وحدہ لا شریک لہ، لہ الملک ولہ الحمد وھو علی کل شیء قدیر",
      bn: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকা লাহ, লাহুল মুলকু ওয়া লাহুল হামদু ওয়া হুওয়া আলা কুল্লি শাইয়িন ক্বাদীর",
      hi: "ला इलाहा इल्लल्लाहु वहदहु ला शरीका लह, लहुल मुल्कु व लहुल हम्दु व हुवा अला कुल्लि शैइन क़दीर",
      id: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli syai'in qadiir"
    },
    hadithReference: [
      { source: "Muslim", number: "1352" },
      { source: "Muslim", number: "1349" },
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
    }
  }
];

export default afterPrayerAzkarData;
