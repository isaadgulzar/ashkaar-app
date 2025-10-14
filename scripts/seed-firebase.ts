// scripts/seedFirebase.ts
// Extended azkar data from the provided images

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const azkarData = [
  {
    id: "ayatul_kursi",
    arabic:
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translations: {
      en: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
      ur: "اللہ کے سوا کوئی معبود نہیں، وہ زندہ اور قائم رہنے والا ہے، اُسے نہ اونگھ آتی ہے نہ نیند",
    },
    transliteration: {
      en: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khuzuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard",
    },
    benefits: {
      en: "Reading Ayatul Kursi provides protection from Satan and jinn, nothing prevents paradise",
      ur: "آیۃ الکرسی پڑھنے سے شیطان اور جنات سے محفوظ رہتے ہیں، جنت کے سوا کوئی چیز نہیں روکتی",
    },
    repetitions: 1,
    category: "both",
    order: 1,
    references: [
      { bookId: "bukhari", number: 2311 },
      { bookId: "nasai_kubra", number: 8017 },
      { bookId: "mustadrak", number: 2064 },
    ],
  },
  {
    id: "surah_ikhlas_3",
    arabic:
      "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration:
      "Qul Huwa Allahu Ahad, Allah-us-Samad, Lam yalid wa lam yulad, Wa lam yakun lahu kufuwan ahad",
    urduTranslation:
      "کہو: وہ اللہ ایک ہے، اللہ بے نیاز ہے، نہ اس کی کوئی اولاد ہے نہ وہ کسی کی اولاد ہے، اور کوئی اس کا ہمسر نہیں",
    repetitions: 3,
    benefits:
      "مُعَوِّذَات کی تلاوت (جنات اور جادو کے خلاف) ہر شے سے کافی ہو جاتی ہے",
    category: "both",
    order: 1,
    reference: "جامع ترمذی: 3575، سنن ابی داؤد: 5082",
  },
  {
    id: "surah_falaq_3",
    arabic:
      "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration:
      "Qul a'udhu bi Rabbil-falaq, min sharri ma khalaq, wa min sharri ghasiqin idha waqab, wa min sharrin-naffathati fil-'uqad, wa min sharri hasidin idha hasad",
    urduTranslation:
      "کہو: میں صبح کے رب کی پناہ مانگتا ہوں، ہر مخلوق کے شر سے، اندھیری رات کے شر سے جب وہ چھا جائے، گرہوں میں پھونکنے والیوں کے شر سے، اور حاسد کے شر سے جب وہ حسد کرے",
    repetitions: 3,
    benefits:
      "مُعَوِّذَات کی تلاوت (جنات اور جادو کے خلاف) ہر شے سے کافی ہو جاتی ہے",
    category: "both",
    order: 2,
    reference: "جامع ترمذی: 3575، سنن ابی داؤد: 5082",
  },
  {
    id: "surah_nas_3",
    arabic:
      "قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration:
      "Qul a'udhu bi Rabbin-nas, Malikin-nas, Ilahin-nas, min sharril-waswasil-khannas, alladhi yuwaswisu fi sudurin-nas, minal-jinnati wan-nas",
    urduTranslation:
      "کہو: میں لوگوں کے رب کی، لوگوں کے بادشاہ کی، لوگوں کے معبود کی پناہ مانگتا ہوں، وسوسہ ڈالنے والے کے شر سے جو پیچھے ہٹ جاتا ہے، جو لوگوں کے دلوں میں وسوسے ڈالتا ہے، جنوں اور انسانوں میں سے",
    repetitions: 3,
    benefits:
      "◊مُعَوِّذَات کی تلاوت (جنات اور جادو کے خلاف) ہر شے سے کافی ہو جاتی ہے",
    category: "both",
    order: 3,
    reference: "جامع ترمذی: 3575، سنن ابی داؤد: 5082",
  },
  {
    id: "tahlil_tahmid_takbir_10",
    arabic:
      "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration:
      "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
    urduTranslation:
      "نہیں کوئی معبود کر اللہ، وہ اکیلا ہے، نہیں کوئی شریک اُسکا، اُسی کی بادشاہی ہے، اور اُسی کے لیے سب تعریفیں ہیں، اور وہ ہر شے پر پوری طرح قدرت رکھتا ہے",
    repetitions: 10,
    benefits: "ہر نماز کے بعد 10 مرتبہ پڑھنا سنت ہے",
    category: "both",
    order: 3,
    reference: "مسلم: 6844، سنن ابی داؤد: 5077",
  },
  {
    id: "raditu_billah",
    arabic:
      "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا",
    transliteration:
      "Raditu billahi Rabba, wa bil-Islami dina, wa bi-Muhammadin nabiyya",
    urduTranslation:
      "راضی ہوں میں اللہ کو رب، اور اسلام کو دین، اور محمد ﷺ کو نبی",
    repetitions: 3,
    benefits:
      "یہ کلمات پڑھنے والے پر جنّت واجب ہو جائے گی اور قیامت والے دن الله اسے خوش کر دے گا.",
    category: "both",
    order: 4,
    reference: "سنن ابی داؤد: 5072، مسند احمد: 18990",
  },
  {
    id: "bismillah_protection",
    arabic:
      "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration:
      "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim",
    urduTranslation:
      "اللہ کے نام کے ساتھ جس کے نام میں کوئی چیز نقصان نہیں پہنچا سکتی، نہ زمین میں اور نہ آسمان میں، وہی سننے والا جاننے والا ہے",
    repetitions: 3,
    benefits:
      "یہ کلمات پڑھنے والے کو نہ تو کوئی شے نقصان پہنچا سکتی ہے اور نہ ہی کوئی اچانک ناگہانی مصیبت اسے پہنچے گی",
    category: "both",
    order: 5,
    reference: "جامع ترمذی: 3388، سنن ابی داؤد: 5088",
  },
  {
    id: "auzu_bikalimaat",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
    urduTranslation:
      "میں اللہ کے کامل کلمات کی پناہ پکڑتا ہوں ہر اُس چیز کے شر سے جو اُس نے پیدا کی",
    repetitions: 3,
    benefits:
      "یہ کلمات پڑھنے والے کو زہریلے جانور کا ڈنگ نقصان نہیں پہنچا سکے گا ",
    category: "both",
    order: 6,
    reference: "مسلم: 6880، مسند احمد: 7885، 290/2",
  },
  {
    id: "subhanallah_tahmid",
    arabic:
      "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَى نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
    transliteration:
      "Subhan Allahi wa bihamdihi 'adada khalqihi wa rida nafsihi wa zinata 'arshihi wa midada kalimatihi",
    urduTranslation:
      "اللہ پاک ہے اور اُس کی تعریف کے ساتھ، اُس کی مخلوق کی تعداد کے برابر، اور اُس کی رضا کے برابر، اور اُس کے عرش کے وزن کے برابر، اور اُس کے کلمات کی سیاہی کے برابر",
    repetitions: 3,
    benefits:
      "یہ کلمات پڑھنے والے کونمازفجرسے لے کرإشراق تک مسلسل عبادت کرنے والے شخص سی بھی زیادہ ثواب حاصل ہوتا ہے",
    category: "morning",
    order: 7,
    reference: "مسلم: 6913",
  },
  {
    id: "istighfar_tawbah_3",
    arabic:
      "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration:
      "Astaghfirullahallazi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh",
    urduTranslation:
      "میں اللہ سے مغفرت طلب کرتا ہوں، نہیں کوئی معبود مگر وہ، خود سے زندہ، ہر چیز کا تھامنے والا، اور میں اُس کی طرف رجوع کرتا ہوں",
    repetitions: 3,
    benefits:
      "یہ کلمات پڑھنے والے کے سارے گناہ معاف کر دیے جائیں گے اگرچہ وہ شخص میدان جنگ سے ہی (بزدلی دکھا کر) بھاگ چکا ہو",
    category: "both",
    order: 8,
    reference: "جامع ترمذی: 3577، سنن ابی داؤد: 1517",
  },
  {
    id: "allahumma_ajirni_7",
    arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
    transliteration: "Allahumma ajirni minan-nar",
    urduTranslation: "اے اللہ! مجھے جہنم سے بچا",
    repetitions: 7,
    benefits:
      "جو کوئی نماز فجر اور نماز مغرب سے پہلے بولے سے پہلے آزاد ہو کا اور کا سے کہہ بات پڑھے ہو: (7 مرتبہ نماز فجر اور نماز مغرب کے فوراً بعد)",
    category: "both",
    order: 9,
    reference: "سنن ابی داؤد: 5079",
  },
  {
    id: "morning_evening_complete",
    arabic:
      "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    transliteration:
      "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykal-masir",
    urduTranslation:
      "اے اللہ! ہم نے تیرے نام کے ساتھ صبح کی اور تیرے نام کے ساتھ شام کی اور تیرے ہی نام کے ساتھ زندہ رہیں اور تیرے ہی نام کے ساتھ مریں گے اور تیری طرف ہی خاتمہ ہے",
    repetitions: 1,
    benefits: "",
    category: "morning",
    order: 10,
    reference: "جامع ترمذی: 3391",
  },
  {
    id: "evening_complete",
    arabic:
      "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration:
      "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykan-nushur",
    urduTranslation:
      "اے اللہ! ہم نے تیرے نام کے ساتھ شام کی اور تیرے نام کے ساتھ صبح کی اور تیرے ہی نام کے ساتھ زندہ رہیں اور تیرے ہی نام کے ساتھ مریں گے اور تیری طرف ہی اٹھنا ہے",
    repetitions: 1,
    benefits: "",
    category: "evening",
    order: 10,
    reference: "جامع ترمذی: 3391",
  },
  {
    id: "morning_fitrah_islam",
    arabic:
      "أَصْبَحْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُّسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
    transliteration:
      "Asbahna 'ala fitratil-Islami wa 'ala kalimatil-ikhlasi wa 'ala dini nabiyyina Muhammadin wa 'ala millati abina Ibrahima hanifan musliman wa ma kana minal-mushrikin",
    urduTranslation:
      "ہم نے صبح کی اسلام کی فطرت پر اور اخلاص کے کلمے پر اور ہمارے نبی محمد ﷺ کے دین پر اور ہمارے باپ ابراہیم علیہ السلام کی ملّت پر جو یکسو تھے مسلمان تھے اور مشرکوں میں سے نہ تھے",
    repetitions: 1,
    benefits: "",
    category: "morning",
    order: 11,
    reference: "",
  },
  {
    id: "evening_fitrah_islam",
    arabic:
      "أَمْسَيْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُّسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
    transliteration:
      "Amsayna 'ala fitratil-Islami wa 'ala kalimatil-ikhlasi wa 'ala dini nabiyyina Muhammadin wa 'ala millati abina Ibrahima hanifan musliman wa ma kana minal-mushrikin",
    urduTranslation:
      "ہم نے شام کی اسلام کی فطرت پر اور اخلاص کے کلمے پر اور ہمارے نبی محمد ﷺ کے دین پر اور ہمارے باپ ابراہیم علیہ السلام کی ملّت پر جو یکسو تھے مسلمان تھے اور مشرکوں میں سے نہ تھے",
    repetitions: 1,
    benefits: "",
    category: "evening",
    order: 11,
    reference: "",
  },
  {
    id: "morning_mulk_dua",
    arabic:
      "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    transliteration:
      "Asbahna wa asbahal-mulku lillah walhamdulillah la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadhal-yawm wa khayra ma ba'dahu wa a'udhu bika min sharri ma fi hadhal-yawm wa sharri ma ba'dahu. Rabbi a'udhu bika minal-kasali wa su'il-kibar. Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr",
    urduTranslation:
      "ہم نے صُبح کی اور بادشاہی اللہ کیلیے صبح ہوئی، اور تمام تعریفیں اللہ کیلیے ہیں، نہیں کوئی معبود سوائے اللہ کے، وہ اکیلا ہے، نہیں کوئی شریک اُسکا، اُسی کی بادشاہی ہے، اور اُسی کے لیے سب تعریفیں ہیں، اور وہ ہر چیز پر قادر ہے۔ اے رب! میں تجھ سے مانگتا ہوں اس دن میں جو خیر ہے اور جو خیر ہے اس کے بعد، اور میں تیری پناہ میں آتا ہوں اس دن کے شر سے اور جو شر ہے اس کے بعد۔ اے رب! میں تیری پناہ میں آتا ہوں سستی سے اور بڑھاپے کی برائی سے۔ اے رب! میں تیری پناہ میں آتا ہوں جہنم کے عذاب سے اور قبر کے عذاب سے",
    repetitions: 1,
    benefits: "",
    category: "morning",
    order: 12,
    reference: "مسلم: 6908",
  },
  {
    id: "evening_mulk_dua",
    arabic:
      "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    transliteration:
      "Amsayna wa amsal-mulku lillah walhamdulillah la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadhihil-laylati wa khayra ma ba'daha wa a'udhu bika min sharri ma fi hadhihil-laylati wa sharri ma ba'daha. Rabbi a'udhu bika minal-kasali wa su'il-kibar. Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr",
    urduTranslation:
      "ہم نے شام کی اور بادشاہی اللہ کیلیے شام ہوئی، اور تمام تعریفیں اللہ کیلیے ہیں، نہیں کوئی معبود سوائے اللہ کے، وہ اکیلا ہے، نہیں کوئی شریک اُسکا، اُسی کی بادشاہی ہے، اور اُسی کے لیے سب تعریفیں ہیں، اور وہ ہر چیز پر قادر ہے۔ اے رب! میں تجھ سے مانگتا ہوں اس رات میں جو خیر ہے اور جو خیر ہے اس کے بعد، اور میں تیری پناہ میں آتا ہوں اس رات کے شر سے اور جو شر ہے اس کے بعد۔ اے رب! میں تیری پناہ میں آتا ہوں سستی سے اور بڑھاپے کی برائی سے۔ اے رب! میں تیری پناہ میں آتا ہوں جہنم کے عذاب سے اور قبر کے عذاب سے",
    repetitions: 1,
    benefits: "",
    category: "evening",
    order: 12,
    reference: "مسلم: 6908",
  },
  {
    id: "sayyidul_istighfar",
    arabic:
      "اللَّهُمَّ أَنتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِن شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنتَ",
    transliteration:
      "Allahumma anta Rabbi la ilaha illa ant, khalaqtani wa ana 'abduka wa ana 'ala 'ahdika wa wa'dika mastata't, a'udhu bika min sharri ma sana't, abu'u laka bini'matika 'alayya wa abu'u bidhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa ant",
    urduTranslation:
      "اے اللہ! تو ہی میرا رب ہے، نہیں ہے کوئی معبود مگر تو، تو نے مجھے پیدا کیا، میں تیرا بندہ ہوں اور میں تیرے عہد اور وعدے پر (قائم) ہوں جتنا میری طاقت ہے، میں تیری پناہ میں آتا ہوں اُس شر سے جو میں نے کیا",
    repetitions: 1,
    benefits:
      "اے اللہ! تو ہی میرا رب ہے، نہیں ہے کوئی معبود مگر تو، تو نے مجھے پیدا کیا، میں تیرا بندہ ہوں اور میں تیرے عہد اور وعدے پر (قائم) ہوں جتنا میری طاقت ہے، میں تیری پناہ میں آتا ہوں",
    category: "both",
    order: 14,
    reference: "بخاری: 6306",
  },
  {
    id: "allahumma_innee_afiyah",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي اللَّهُمَّ احْفَظْنِي مِن بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَن شِمَالِي وَمِن فَوْقِي وَأَعُوذُ بِعَظَمَتِكَ أَن أُغْتَالَ مِن تَحْتِي",
    transliteration:
      "Allahumma inni as'alukal-'afiyata fid-dunya wal-akhirah. Allahumma inni as'alukal-'afwa wal-'afiyata fi dini wa dunyaya wa ahli wa mali. Allahummastur 'awrati wa amin raw'ati. Allahumma-hfazni min bayni yadayya wa min khalfi wa 'an yamini wa 'an shimali wa min fawqi wa a'udhu bi'azamatika an ughtala min tahti",
    urduTranslation:
      "اے اللہ! میں تجھ سے دنیا اور آخرت کا عافیت کا سوال کرتا ہوں۔ اے اللہ! میں تجھ سے عفو اور عافیت کا سوال کرتا ہوں میری دین میں اور میری دنیا میں اور میرے گھر والوں میں اور میرے مال میں",
    repetitions: 1,
    benefits:
      "اے اللہ! میں تجھ سے دنیا اور آخرت میں عافیت کا سوال کرتا ہوں۔ اے اللہ! میں تجھ سے عفو اور عافیت کا سوال کرتا ہوں میری دین میں اور میری دنیا میں اور میرے گھر والوں میں اور میرے مال میں",
    category: "both",
    order: 15,
    reference: "سنن ابی داؤد: 5074",
  },
  {
    id: "allahumma_aalimal_ghayb",
    arabic:
      "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ أَشْهَدُ أَن لَّا إِلَٰهَ إِلَّا أَنتَ أَعُوذُ بِكَ مِن شَرِّ نَفْسِي وَمِن شَرِّ الشَّيْطَانِ وَشِرْكِهِ",
    transliteration:
      "Allahumma 'alimal-ghaybi wash-shahadah, Fatiras-samawati wal-ard, Rabba kulli shay'in wa malikah, ashhadu an la ilaha illa anta, a'udhu bika min sharri nafsi wa min sharrish-shaytani wa shirkih",
    urduTranslation:
      "اے اللہ! جاننے والے غیب اور حاضر کو، پیدا کرنے والے آسمانوں اور زمین کو، ہر چیز کا رب اور مالک، میں گواہی دیتا ہوں کہ نہیں کوئی معبود سوائے تیرے، میں تیری پناہ پکڑتا ہوں اپنے نفس کی برائی سے اور شیطان کے شر سے",
    repetitions: 1,
    benefits:
      "اے اللہ! جاننے والے غیب اور حاضر کو، پیدا کرنے والے آسمانوں اور زمین کو، ہر چیز کا رب اور مالک، میں گواہی دیتا ہوں کہ نہیں کوئی معبود سوائے تیرے",
    category: "both",
    order: 16,
    reference: "جامع ترمذی: 3392",
  },
  {
    id: "subhanallah_100",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "Subhan Allahi wa bihamdihi",
    urduTranslation: "اللہ پاک ہے اور اُس کی حمد کے ساتھ",
    repetitions: 100,
    benefits:
      "جو کوئی پڑھے 100 مرتبہ صبح اور شام تو کوئی اُس سے آگے نہیں بڑھے گا قیامت میں سوائے اُس کے جس سے فعل میں بڑھ گیا ہو",
    category: "both",
    order: 17,
    reference: "بخاری: 6405، مسلم: 6842، 6843",
  },
  {
    id: "istighfar_100",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayh",
    urduTranslation:
      "میں اللہ سے مغفرت طلب کرتا ہوں اور اُسی کی طرف رجوع کرتا ہوں",
    repetitions: 100,
    benefits: "توبہ و استغفار کرنا سنت ہے",
    category: "both",
    order: 18,
    reference: "بخاری: 6307، مسلم: 6858",
  },
  {
    id: "four_kalimat_100",
    arabic:
      "سُبْحَانَ اللَّهِ ۞ الْحَمْدُ لِلَّهِ ۞ اللَّهُ أَكْبَرُ ۞ لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration:
      "Subhan Allah, Alhamdulillah, Allahu Akbar, La ilaha illallah",
    urduTranslation:
      "اللہ پاک ہے، تمام تعریفیں اللہ کے لیے ہیں، اللہ سب سے بڑا ہے، نہیں کوئی معبود سوائے اللہ کے",
    repetitions: 100,
    benefits:
      "100 اعلان آدم ذکر کے کا ثواب ۞ 100 گھوڑے جہاد میں بھیجنے کا ثواب ۞ 100 اونٹ اللہ کی راہ میں قربان کرنے کا ثواب ۞ لَا إِلَٰهَ إِلَّا اللَّهُ ۞ زمین و آسمان بھر جاتے ہیں",
    category: "both",
    order: 19,
    reference: "السنن الکبری للنسائی: 10680",
  },
  {
    id: "la_hawla_wala_quwwata",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    urduTranslation: "نہیں ہے طاقت اور نہ قوت مگر اللہ کی مدد سے",
    repetitions: 1,
    benefits: "رسول اللہ ﷺ نے فرمایا: یہ جنت کے خزانوں میں سے ایک خزانہ ہے",
    category: "both",
    order: 20,
    reference: "بخاری: 6409، مسلم: 6862",
  },
  {
    id: "hasbunallah",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-wakil",
    urduTranslation: "ہم نے اللہ پر بھروسہ کیا اور وہی بہترین کارساز ہے",
    repetitions: 1,
    benefits:
      "رسول اللہ ﷺ نے مختلف حالات میں اور سیدنا ابراہیم علیہ السلام نے آگ کے گڑھے میں داخل ہونے والے دن یہ کلمات پڑھے",
    category: "both",
    order: 21,
    reference: "آل عمران: 173، بخاری: 4563",
  },
  {
    id: "surah_baqarah_last_2",
    arabic: "سورۃ البقرۃ کی آخری 2 آیات کی تلاوت",
    transliteration: "Surah Al-Baqarah ki akhri 2 ayaat",
    urduTranslation: "سورۃ البقرۃ کی آخری 2 آیات کی تلاوت (رات ایک بار)",
    repetitions: 1,
    benefits: "بندے کے لئے (رات دینے میں) کافی ہو جاتی ہے",
    category: "evening",
    order: 22,
    reference: "بخاری: 4008، مسلم: 1878",
  },
  {
    id: "surah_mulk",
    arabic: "سورۃ الملک",
    transliteration: "Surah Al-Mulk",
    urduTranslation:
      "سورۃ الملک تلاوت کرنے والے کو شفاعت کرنے کی صی کی اجازت کردی جائے گی (رات ایک بار)",
    repetitions: 1,
    benefits: "یہ سورت قبر میں بھی تمام آزمائش سے بچائے گی",
    category: "evening",
    order: 23,
    reference: "سنن ابی داؤد: 1400",
  },
  {
    id: "durood_sharif_10",
    arabic: "درود شریف",
    transliteration: "Durood Sharif",
    urduTranslation: "درود شریف پڑھنے والا نبی (10 مرتبہ صبح اور شام)",
    repetitions: 10,
    benefits: "شافع محمد ﷺ کی شفاعت کا حقدار ہو جاتا ہے",
    category: "both",
    order: 24,
    reference: "مجمع الزوائد للہیثمی: 17022",
  },
  {
    id: "allahumma_salli_ala_muhammad",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammad",
    urduTranslation: "اے اللہ! محمد ﷺ پر درود بھیج",
    repetitions: 1,
    benefits:
      "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ اور اس کے محبوب ﷺ پر درود شریف",
    category: "both",
    order: 25,
    reference: "جامع ترمذی: 593",
  },
  {
    id: "durood_ibrahimi",
    arabic: "درود ابراہیمی",
    transliteration: "Durood Ibrahimi",
    urduTranslation:
      "رسول اللہ ﷺ نے آیت فرود (سورۃ الاحزاب، آیت: 56) کے جواب میں نماز دالا درود ابراہیمی تعلیم فرمایا تھا",
    repetitions: 1,
    benefits: "پڑھنے والا شخص شفاعت ﷺ کی شفاعت کا حقدار ہو جاتا ہے",
    category: "both",
    order: 26,
    reference: "بخاری: 4797، مسلم: 908، سنن ابی داؤد: 1501",
  },
];

export async function seedFirestore() {
  console.log("🌱 Starting Firestore seeding...");

  try {
    const azkarCollection = collection(db, "azkar");

    for (const zikr of azkarData) {
      const { id, ...data } = zikr;
      await setDoc(doc(azkarCollection, id), data);
      console.log(`✅ Added: ${id}`);
    }

    console.log("🎉 Firestore seeding completed successfully!");
    console.log(`📊 Total documents added: ${azkarData.length}`);
  } catch (error) {
    console.error("❌ Error seeding Firestore:", error);
    throw error;
  }
}

// To run this script, create a temporary component or screen that calls seedFirestore()
// Example usage in a test screen:
//
// import { seedFirestore } from '../scripts/seedFirebase';
//
// <Button onPress={seedFirestore} title="Seed Database" />
