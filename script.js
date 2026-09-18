(function(){
  // ---- Placeholder business data: replace before launch ----
  var CONTACT = {
    phone1:'+998 50 900 51 94',
    phone2:'+998 77 097 14 37',
    phoneHref:'+998509005194',
    email:'info@ideyaplus.uz',
    telegram:'bellitilsimat_uz',
    whatsapp:'998509005194'
  };
  // Google Apps Script Web App URL that appends a row to the leads spreadsheet.
  // Deploy the script from README-google-sheet-setup.md and paste the /exec URL here.
  var SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxF70cI0CebwT2CeM89QXsWBc3EzhkuIYskUN6Hr3NktPEX2XCLH4s5A1EIv_oy8NZ_/exec';

  var PRODUCTS = [
    {key:'p4', icon:'<path d="M12 2 3 7l9 5 9-5-9-5Z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>', featured:true},
    {key:'p1', icon:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'},
    {key:'p2', icon:'<path d="M3 6h2l2.2 10.5A2 2 0 0 0 9.2 18h7.6a2 2 0 0 0 2-1.6L20 9H6"/><circle cx="9" cy="21" r="1"/><circle cx="17" cy="21" r="1"/>'},
    {key:'p3', icon:'<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/>'},
    {key:'p5', icon:'<path d="M3 9 5 3h14l2 6"/><path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/><line x1="3" y1="9" x2="21" y2="9"/>'},
    {key:'p6', icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>'},
    {key:'p7', icon:'<path d="M3 15v-3a9 9 0 0 1 18 0v3"/><path d="M21 15v2a2 2 0 0 1-2 2h-2"/><rect x="3" y="15" width="4" height="5" rx="1"/><rect x="17" y="15" width="4" height="5" rx="1"/>'},
    {key:'p9', icon:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6.5 6.5 2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2"/>'},
    {key:'p10', icon:'<path d="M3 7h13"/><path d="m13 4 3 3-3 3"/><path d="M21 17H8"/><path d="m11 20-3-3 3-3"/>'}
  ];

  var PROCESS = ['proc1','proc2','proc3','proc4','proc5'];

  var TESTI = [
    {co:'GAP INSAAT YATIRIM VE DIS TICARET', key:'t1'},
    {co:'АОЗТ «Морской торговый флот» / «Morskoy Torgovy Flot»', key:'t2'},
    {co:'Аудиторская компания «Халкара Аудит»', key:'t3'},
    {co:'ИП «Мыратлы Гадам» / YaTT «Myratly Gadam»', key:'t4'},
    {co:'ХО «Behistli Dunya»', key:'t5'}
  ];

  var T = {
    ru:{
      navServices:'Продукты 1С', navProcess:'Как мы работаем', navLearn:'Обучение', navReviews:'Отзывы', navContact:'Контакты', navAbout:'О компании',
      ctaShort:'Оставить заявку',
      geoEyebrow:'География работы', geoTitle:'От первого рынка — к Туркменистану и Узбекистану',
      geoSub:'Каждый новый рынок — новый экзамен на компетентность. В Туркменистане, а теперь и в Узбекистане.',
      geo1t:'Россия — школа экспертизы', geo1d:'Здесь мы начали работать с экосистемой «1С», прошли сертификацию и сформировали стандарты внедрения, которые используем до сих пор.',
      geo2t:'Туркменистан — 10 лет и статус франчайзи', geo2d:'Стали официальным франчайзи «1С» в стране и реализовали 100+ проектов — от небольших ИП до промышленных предприятий и торговых сетей.',
      geo3t:'Узбекистан — новый рынок, тот же подход', geo3d:'Открылись как резидент IT Park Uzbekistan и переносим весь опыт на локальный рынок — с учётом специфики Узбекистана.',
      badge1:'Франчайзи 1С в Туркменистане', badge2:'Резидент IT Park Uzbekistan', badge3:'Выгодные условия по локальным прайсам Туркменистана',
      statusEyebrow:'Официальный статус', statusTitle:'Почему нам можно доверять с первого дня',
      statusSub:'Не просто обещания — реальный юридический и партнёрский статус, который можно проверить.',
      logoSlotTag:'Лого 1С', logoSlotTag2:'Лого IT Park',
      status1t:'Официальный франчайзи «1С» в Туркменистане', status1d:'Входим в официальную партнёрскую сеть фирмы «1С»: сертифицированные специалисты и прямой доступ к обновлениям экосистемы.',
      status2t:'Резидент IT Park Uzbekistan', status2d:'Официально зарегистрированы в национальном технопарке — прозрачная работа по местному законодательству.',
      status3t:'Партнёр компании IDEYA PLUS', status3d:'В рамках партнёрства с IDEYA PLUS компания Belli Tilsimat предлагает и реализует решения в области автоматизации бизнеса на базе 1С на рынке Узбекистана.',
      heroEyebrow:'10 лет опыта с «1С» в Туркменистане',
      heroTitle1:'Belli Tilsimat — генеральный партнёр', heroTitle2:'компании IDEYA PLUS',
      heroSub:'100+ внедрений 1С — в Туркменистане.\nТеперь мы готовы оказывать свои услуги в Узбекистане.',
      heroCta1:'Оставить заявку на консультацию', heroCta2:'Смотреть продукты 1С',
      aboutEyebrow:'О компании', aboutTitle:'Реальная автоматизация бизнеса — теперь и для Узбекистана',
      aboutLead:'Стоимость внедрения и сопровождения — по прайсам туркменского рынка, без наценок как «для иностранного клиента», тем самым вы получаете экономию в десятки тысяч долларов.',
      aboutText:'Помогаем бизнесу Центральной Азии внедрять и обслуживать 1С — от малого до крупного бизнеса.',
      aboutCta:'Обсудить ваш проект',
      val1t:'Официальный франчайзи «1С» в Туркменистане', val1d:'Работаем напрямую в экосистеме 1С — без посредников: сертифицированные консультанты и прямой доступ к обновлениям.',
      val2t:'Лицензии — у официальных партнёров', val2d:'Лицензии 1С клиенты приобретают отдельно у официальных партнёров в Узбекистане.',
      val3t:'Резидент IT Park Uzbekistan', val3d:'Официальный юридический статус в национальном IT-парке — прозрачная работа и понятные договорные условия.',
      val4t:'100+ реализованных проектов', val4d:'Розница, производство, строительство, медицина, логистика — опыт разных отраслей.',
      prodEyebrow:'Услуги по 1С', prodTitle:'Решение под задачи вашего бизнеса', prodSub:'Подберём, внедрим и настроим конфигурацию 1С под ваши процессы — от учёта до управления всей компанией. Стоимость работ — на выгодных условиях туркменского рынка; лицензии 1С клиенты приобретают отдельно у официальных партнёров в Узбекистане.',
      p1t:'1С:Управление нашей фирмой', p1d:'Внедрим и настроим учёт и управление ключевыми процессами малого и среднего бизнеса в одном инструменте.',
      p2t:'1С:Управление торговлей', p2d:'Настроим учёт товаров, продаж и склада — от закупки до отгрузки клиенту.',
      p3t:'1С:Бухгалтерия', p3d:'Настроим точный бухгалтерский и налоговый учёт с готовыми формами отчётности.',
      p4t:'1С:ERP Управление предприятием', p4d:'Внедрение и сопровождение ERP-решений для комплексной автоматизации бизнеса: операционное управление, учёт, контроль и планирование деятельности предприятия.',
      p5t:'1С:Розница', p5d:'Настроим кассу, продажи и аналитику для магазина — рабочее место кассира и подключение онлайн-кассы.',
      p6t:'1С:Документооборот', p6d:'Внедрим электронный документооборот: согласование, контроль исполнения, архив документов.',
      p7t:'1С:ИТС — техническая поддержка', p7d:'Обеспечим обновления, консультации специалистов и доступ к обучающим материалам на постоянной основе.',
      p9t:'AI+ решения 1С', p9d:'Отчётность, аналитика, прогнозирование и статистика на основе данных 1С с использованием искусственного интеллекта.',
      p10t:'EDI — электронный бизнес', p10d:'Обмен бизнес-документами между информационными системами компаний.',
      prodCta:'Оставить заявку', prodFeaturedTag:'Рекомендуем', prodFeaturedCap:'Фото: цех/производство или дашборд ERP на экране',
      procEyebrow:'Как мы работаем', procTitle:'Пять шагов от заявки до запуска системы', procCta:'Обсудить ваш проект',
      proc1t:'Консультация и аудит', proc1d:'Разбираем задачи бизнеса, текущие процессы и узкие места — бесплатно, при заявке на сайте.',
      proc2t:'Подбор конфигурации 1С', proc2d:'Предлагаем оптимальное решение: типовое или с доработками под вашу специфику.',
      proc3t:'Внедрение и настройка', proc3d:'Устанавливаем систему, переносим данные и настраиваем под реальные бизнес-процессы.',
      proc4t:'Обучение сотрудников', proc4d:'Обучаем команду работе в системе — от кассира до руководителя.',
      proc5t:'Сопровождение и ИТС', proc5d:'Остаёмся на связи: обновления, консультации и оперативные доработки после запуска.',
      stat1:'реализованных проектов', stat2:'лет на рынке 1С', stat3:'специалистов в команде', stat4:'обученных пользователей',
      learnEyebrow:'Центр сертифицированного обучения 1С', learnTitle:'Учим работать в 1С — от кассира до директора',
      learnText:'Курсы для сотрудников и будущих специалистов 1С: от базовой работы с программой до администрирования и разработки конфигураций. Практика на реальных задачах, сертификат по итогам обучения.',
      learnCta:'Записаться на обучение',
      learn1:'Работа с программой', learn2:'Администрирование', learn3:'Разработка', learn4:'Сертификат',
      testiEyebrow:'Нам доверяют', testiTitle:'Что говорят клиенты в регионе',
      testiIntro:'Вот что говорят клиенты, которые уже автоматизировали бизнес с Belli Tilsimat в Туркменистане.',
      partnersEyebrow:'Партнёры', partnersTitle:'Технологии и бренды, с которыми мы работаем',
      t1:'Belli Tilsimat подошла к внедрению 1С:Предприятие 8 профессионально и ответственно. Получили современный инструмент для управления бизнес-процессами и рекомендуем компанию как надёжного партнёра.',
      t2:'Отдел внедрения 1С зарекомендовал себя исключительно положительно: высокая квалификация, оперативность и соблюдение сроков на всех этапах проекта.',
      t3:'Специалисты проявили профессионализм и внимательное отношение к клиенту, оперативно отвечали на все вопросы при установке 1С.',
      t4:'Команда провела аудит, донастроила систему под нашу специфику и обучила сотрудников — переход на новую систему прошёл организованно и в срок.',
      t5:'Рабочая группа автоматизировала продажу лекарственных препаратов качественно и в сжатые сроки — работа стала удобнее и эффективнее.',
      testiFlag:'Туркменистан',
      ctaBandEyebrow:'Начните сейчас', ctaBandTitle:'Внедрение 1С на выгодных условиях туркменского рынка', ctaBandText:'Оставьте заявку, посчитаем стоимость в течение рабочего дня.',
      contactEyebrow:'Контакты', contactTitle:'Оставьте заявку на консультацию', contactSub:'Заполните форму или напишите напрямую — ответим в течение рабочего дня.',
      fName:'Имя', fNamePh:'Ваше имя', fPhone:'Телефон', fPhonePh:'+998 __ ___ __ __', fEmail:'Email', fEmailPh:'email@company.uz',
      fCompany:'Компания', fCompanyPh:'Название компании', fProduct:'Какой продукт интересует', fMessage:'Сообщение', fMessagePh:'Коротко опишите задачу',
      fConsent:'Нажимая кнопку, вы соглашаетесь на обработку персональных данных.', fSubmit:'Отправить заявку', fOther:'Ещё не определился',
      successTitle:'Заявка сформирована!', successText:'Отправьте её нам одним из способов ниже — так мы получим её быстрее всего.',
      viaTelegram:'Написать в Telegram', viaWhatsapp:'Написать в WhatsApp', viaCall:'Позвонить',
      cPhone:'Телефон', phoneRole1:'генеральный директор', phoneRole2:'коммерческий директор', cAddress:'Адрес', cAddressVal:'г. Ашхабад, ТЦ «Джошгун»', cHours:'Часы работы', cHoursVal:'Круглосуточно',
      footTagline2:'Belli Tilsimat — генеральный партнёр компании IDEYA PLUS · Резидент IT Park Uzbekistan · Выгодные условия для клиентов в Центральной Азии',
      footCopy:'© 2026 IDEYA PLUS. Все права защищены. ИНН 312959777.', footNote:'Опыт и материалы компании Belli Tilsimat (Туркменистан), адаптировано для рынка Узбекистана.',
      modalEyebrow:'Быстрая заявка', modalTitle:'Оставьте контакты'
    },
    uz:{
      navServices:'1C mahsulotlari', navProcess:'Ish jarayoni', navLearn:"O'quv markazi", navReviews:'Mijozlar fikri', navContact:'Aloqa', navAbout:'Kompaniya haqida',
      ctaShort:'Ariza qoldirish',
      geoEyebrow:"Ish geografiyasi", geoTitle:"Birinchi bozordan — Turkmaniston va O'zbekistonga",
      geoSub:"Har bir yangi bozor — kompetentsiya imtihoni. Turkmanistonda, endi esa O'zbekistonda ham.",
      geo1t:'Rossiya — tajriba maktabi', geo1d:"Aynan shu yerda 1C ekotizimi bilan ishlashni boshladik, sertifikatlashdan o'tdik va hozirgacha qo'llaydigan joriy etish standartlarini shakllantirdik.",
      geo2t:'Turkmaniston — 10 yil va franchayzi maqomi', geo2d:"Mamlakatda 1C rasmiy franchayzisiga aylandik va 100 dan ortiq loyihani amalga oshirdik — kichik XK'lardan sanoat korxonalari va savdo tarmoqlarigacha.",
      geo3t:"O'zbekiston — yangi bozor, o'sha yondashuv", geo3d:"IT Park Uzbekiston rezidenti sifatida ochildik va to'plangan barcha tajribani mahalliy bozorga — O'zbekiston xususiyatlarini hisobga olgan holda olib kelmoqdamiz.",
      badge1:'Turkmanistonda 1C franchayzisi', badge2:'IT Park Uzbekiston rezidenti', badge3:"Turkmaniston mahalliy narxlari bo'yicha foydali shartlar",
      statusEyebrow:'Rasmiy maqom', statusTitle:"Nega bizga birinchi kundanoq ishonish mumkin",
      statusSub:"Shunchaki va'da emas — tekshirish mumkin bo'lgan real yuridik va hamkorlik maqomi.",
      logoSlotTag:'1C logotipi', logoSlotTag2:'IT Park logotipi',
      status1t:'Turkmanistonda 1C rasmiy franchayzisi', status1d:"«1C» kompaniyasining rasmiy hamkorlar tarmog'iga kiramiz: sertifikatlangan mutaxassislar va ekotizim yangilanishlariga to'g'ridan-to'g'ri kirish.",
      status2t:'IT Park Uzbekiston rezidenti', status2d:"O'zbekistonning milliy texnoparkida rasmiy ro'yxatdan o'tganmiz — mahalliy qonunchilikka muvofiq shaffof ishlaymiz.",
      status3t:'IDEYA PLUS kompaniyasining hamkori', status3d:"IDEYA PLUS bilan hamkorlik doirasida Belli Tilsimat 1C asosidagi biznesni avtomatlashtirish yechimlarini O'zbekiston bozorida taklif etadi va amalga oshiradi.",
      heroEyebrow:'Turkmanistonda 1C bilan 10 yillik tajriba',
      heroTitle1:'Belli Tilsimat — bosh hamkori', heroTitle2:"IDEYA PLUS kompaniyasining",
      heroSub:"100 dan ortiq 1C loyihasi — Turkmanistonda.\nEndi O'zbekistonda ham xizmat ko'rsatishga tayyormiz.",
      heroCta1:'Konsultatsiyaga yozilish', heroCta2:"1C mahsulotlarini ko'rish",
      aboutEyebrow:'Kompaniya haqida', aboutTitle:"Real biznes avtomatlashtiruvi — endi O'zbekiston uchun ham",
      aboutLead:"Joriy etish va texnik qo'llab-quvvatlash narxi — turkman bozori narxida, \"xorijiy mijoz\" uchun ustamalarsiz — bu sizga o'n minglab dollar tejamkorlik beradi.",
      aboutText:"Markaziy Osiyo biznesiga 1C ni joriy etish va qo'llab-quvvatlashda yordam beramiz — kichik biznesdan yirik biznesgacha.",
      aboutCta:'Loyihangizni muhokama qilish',
      val1t:'Turkmanistonda 1C rasmiy franchayzisi', val1d:"1C ekotizimida vositachisiz ishlaymiz: sertifikatlangan konsultantlar va yangilanishlarga to'g'ridan-to'g'ri kirish.",
      val2t:"Litsenziyalar — rasmiy hamkorlardan", val2d:"1C litsenziyalarini mijozlar O'zbekistondagi rasmiy hamkorlardan alohida sotib oladi.",
      val3t:'IT Park Uzbekiston rezidenti', val3d:"Milliy IT-parkda rasmiy yuridik maqom — shaffof ish va tushunarli shartnoma shartlari.",
      val4t:'100+ amalga oshirilgan loyiha', val4d:'Chakana savdo, ishlab chiqarish, qurilish, tibbiyot, logistika — turli sohalardagi tajriba.',
      prodEyebrow:"1C bo'yicha xizmatlar", prodTitle:'Biznesingiz vazifalariga mos yechim', prodSub:"Jarayonlaringizga mos 1C konfiguratsiyasini tanlab, joriy etib, sozlab beramiz — hisobdan butun kompaniyani boshqarishgacha. Ish narxi — turkman bozori shartlarida; 1C litsenziyalarini mijozlar O'zbekistondagi rasmiy hamkorlardan alohida sotib oladi.",
      p1t:'1C: Kompaniyamizni boshqarish', p1d:"Kichik va o'rta biznesning asosiy jarayonlarini bitta vositada hisobga olish va boshqarishni joriy etamiz.",
      p2t:'1C: Savdoni boshqarish', p2d:'Tovar, sotuv va ombor hisobini sozlab beramiz — xariddan mijozga yetkazib berishgacha.',
      p3t:'1C: Buxgalteriya', p3d:"Tayyor hisobot shakllari bilan aniq buxgalteriya va soliq hisobini sozlab beramiz.",
      p4t:'1C: ERP Korxonani boshqarish', p4d:"Biznesni kompleks avtomatlashtirish uchun ERP-yechimlarini joriy etamiz va qo'llab-quvvatlaymiz: korxona faoliyatini operativ boshqarish, hisobga olish, nazorat va rejalashtirish.",
      p5t:'1C: Chakana savdo', p5d:"Do'kon uchun kassa, sotuv va tahlilni sozlab beramiz — kassir ish joyi va onlayn-kassa ulanishi.",
      p6t:'1C: Hujjat aylanishi', p6d:'Elektron hujjat aylanishini joriy etamiz: kelishish, bajarilishini nazorat qilish, hujjatlar arxivi.',
      p7t:'1C: ITS — texnik yordam', p7d:"Doimiy asosda yangilanishlar, mutaxassislar konsultatsiyasi va o'quv materiallariga kirishni ta'minlaymiz.",
      p9t:'1C uchun AI+ yechimlari', p9d:"1C ma'lumotlari asosida sun'iy intellekt yordamida hisobotlar, tahlil, prognozlash va statistika.",
      p10t:'EDI — elektron biznes', p10d:"Kompaniyalarning axborot tizimlari o'rtasida biznes-hujjatlar almashinuvi.",
      prodCta:'Ariza qoldirish', prodFeaturedTag:'Tavsiya etamiz', prodFeaturedCap:"Foto: sex/ishlab chiqarish yoki ekranda ERP dashboard",
      procEyebrow:'Biz qanday ishlaymiz', procTitle:'Arizadan ishga tushirilgan tizimgacha besh qadam', procCta:'Loyihangizni muhokama qilish',
      proc1t:'Konsultatsiya va audit', proc1d:'Biznes vazifalari, joriy jarayonlar va tor joylarni aniqlaymiz — saytdan ariza bergan har bir mijoz uchun bepul.',
      proc2t:'1C konfiguratsiyasini tanlash', proc2d:'Optimal yechimni taklif qilamiz: standart yoki sizning ehtiyojingizga moslashtirilgan.',
      proc3t:'Joriy etish va sozlash', proc3d:'Tizimni o‘rnatamiz, ma’lumotlarni ko‘chiramiz va real biznes-jarayonlariga moslab sozlaymiz.',
      proc4t:'Xodimlarni o‘qitish', proc4d:'Jamoani tizimda ishlashga o‘rgatamiz — kassirdan rahbargacha.',
      proc5t:'Qo‘llab-quvvatlash va ITS', proc5d:'Ishga tushirilgandan keyin ham aloqada qolamiz: yangilanishlar, konsultatsiya va tezkor moslashtirishlar.',
      stat1:'amalga oshirilgan loyiha', stat2:'1C bozorida yillik tajriba', stat3:'jamoadagi mutaxassis', stat4:'o‘qitilgan foydalanuvchi',
      learnEyebrow:'1C sertifikatlangan o‘quv markazi', learnTitle:'1C’da ishlashni o‘rgatamiz — kassirdan direktorgacha',
      learnText:"1C xodimlari va bo'lajak mutaxassislar uchun kurslar: dastur bilan asosiy ishlashdan tortib, konfiguratsiyalarni boshqarish va ishlab chiqishgacha. Real vazifalar asosida amaliyot, o'qish yakunida sertifikat.",
      learnCta:"O'qishga yozilish",
      learn1:'Dastur bilan ishlash', learn2:'Boshqaruv', learn3:'Ishlab chiqish', learn4:'Sertifikat',
      testiEyebrow:'Bizga ishonishadi', testiTitle:'Mintaqadagi mijozlar nima deydi',
      testiIntro:"Turkmanistonda Belli Tilsimat bilan biznesini avtomatlashtirgan mijozlar shunday deydi.",
      partnersEyebrow:'Hamkorlar', partnersTitle:"Biz ishlaydigan texnologiyalar va brendlar",
      t1:"Belli Tilsimat 1C:Korxona 8 tizimini joriy etishda professional va mas'uliyatli yondashdi. Biznes-jarayonlarni boshqarish uchun zamonaviy vosita oldik va kompaniyani ishonchli hamkor sifatida tavsiya qilamiz.",
      t2:"1C joriy etish bo'limi o'zini faqat ijobiy tomondan ko'rsatdi: yuqori malaka, tezkorlik va loyihaning barcha bosqichlarida muddatlarga rioya qilish.",
      t3:"Mutaxassislar professionallik va mijozga e'tiborli munosabat ko'rsatdi, 1C o'rnatishda barcha savollarga tezkor javob berishdi.",
      t4:"Jamoa auditni o'tkazdi, tizimni ehtiyojlarimizga moslab sozladi va xodimlarni o'qitdi — yangi tizimga o'tish tartibli va o'z vaqtida amalga oshdi.",
      t5:"Ishchi guruh dori vositalari savdosini sifatli va qisqa muddatda avtomatlashtirdi — ish qulay va samarali bo'lib qoldi.",
      testiFlag:'Turkmaniston',
      ctaBandEyebrow:'Hoziroq boshlang', ctaBandTitle:"1C joriy etish — Turkmaniston bozori uchun foydali shartlarda", ctaBandText:"Ariza qoldiring, bir ish kuni ichida tannarxni hisoblab beramiz.",
      contactEyebrow:'Aloqa', contactTitle:'Konsultatsiya uchun ariza qoldiring', contactSub:"Formani to'ldiring yoki to'g'ridan-to'g'ri yozing — bir ish kuni ichida javob beramiz.",
      fName:'Ism', fNamePh:'Ismingiz', fPhone:'Telefon', fPhonePh:'+998 __ ___ __ __', fEmail:'Email', fEmailPh:'email@company.uz',
      fCompany:'Kompaniya', fCompanyPh:'Kompaniya nomi', fProduct:'Qaysi mahsulot qiziqtiradi', fMessage:'Xabar', fMessagePh:'Vazifani qisqacha tavsiflang',
      fConsent:"Tugmani bosish orqali siz shaxsiy ma'lumotlaringizni qayta ishlashga rozilik bildirasiz.", fSubmit:'Arizani yuborish', fOther:"Hali aniqlamadim",
      successTitle:'Ariza tayyor!', successText:"Uni quyidagi usullardan biri orqali yuboring — shunda tezroq yetib boradi.",
      viaTelegram:'Telegram orqali yozish', viaWhatsapp:'WhatsApp orqali yozish', viaCall:"Qo'ng'iroq qilish",
      cPhone:'Telefon', phoneRole1:'bosh direktor', phoneRole2:'tijorat direktori', cAddress:'Manzil', cAddressVal:'Ashxabod, "Joshgun" SM', cHours:'Ish vaqti', cHoursVal:"Kecha-kunduz",
      footTagline2:"Belli Tilsimat — IDEYA PLUS kompaniyasining bosh hamkori · IT Park Uzbekiston rezidenti · Markaziy Osiyo mijozlari uchun foydali shartlar",
      footCopy:'© 2026 IDEYA PLUS. Barcha huquqlar himoyalangan. STIR 312959777.', footNote:"Belli Tilsimat (Turkmaniston) kompaniyasining tajribasi va materiallari O'zbekiston bozori uchun moslashtirildi.",
      modalEyebrow:'Tezkor ariza', modalTitle:"Kontaktingizni qoldiring"
    }
  };

  var lang = (function(){ try{ return localStorage.getItem('bt_lang')||'ru'; }catch(e){ return 'ru'; } })();

  function buildProducts(){
    var grid = document.getElementById('productGrid');
    grid.innerHTML = PRODUCTS.map(function(p){
      if(p.featured){
        return '<div class="product-card featured"><div class="photo-fill pf-ph" data-depth="0.03" style="background-image:url(images/product-erp-photo.jpg)"><span class="feat-tag" data-i18n="prodFeaturedTag"></span></div>'+
          '<div class="pf-body"><h3 data-i18n="'+p.key+'t"></h3><p data-i18n="'+p.key+'d"></p>'+
          '<button class="btn btn-line btn-sm" onclick="openLead(\''+p.key+'\')"><span data-i18n="prodCta"></span></button></div></div>';
      }
      return '<div class="product-card"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">'+p.icon+'</svg></div>'+
        '<h3 data-i18n="'+p.key+'t"></h3><p data-i18n="'+p.key+'d"></p>'+
        '<button class="btn btn-line btn-sm" onclick="openLead(\''+p.key+'\')"><span data-i18n="prodCta"></span></button></div>';
    }).join('');
  }
  function buildProcess(){
    var list = document.getElementById('processList');
    list.innerHTML = PROCESS.map(function(key,i){
      var n = String(i+1).padStart(2,'0');
      return '<div class="process-item"><div class="n">'+n+'</div><div class="body"><h3 data-i18n="'+key+'t"></h3><p data-i18n="'+key+'d"></p></div></div>';
    }).join('');
  }
  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.6L22 9.3l-5 4.8 1.3 7-6.3-3.6L5.7 21l1.3-7-5-4.8 7.1-.7Z"/></svg>';
  function buildTesti(){
    var track = document.getElementById('testiTrack');
    track.innerHTML = TESTI.map(function(t){
      return '<div class="testi-card"><div class="testi-top"><div class="testi-avatar">'+t.co.charAt(0)+'</div><span class="testi-flag" data-i18n="testiFlag"></span></div>'+
        '<div class="testi-stars">'+STAR+STAR+STAR+STAR+STAR+'</div>'+
        '<p class="testi-quote" data-i18n="'+t.key+'"></p>'+
        '<div class="testi-foot"><div class="co">'+t.co+'</div></div></div>';
    }).join('');
  }
  function buildProductSelects(){
    var opts = PRODUCTS.map(function(p){ return '<option value="'+p.key+'" data-i18n="'+p.key+'t"></option>'; }).join('');
    var other = '<option value="" selected data-i18n="fOther"></option>';
    document.getElementById('mainProductSelect').innerHTML = other + opts;
    document.getElementById('modalProductSelect').innerHTML = other + opts;
  }

  function applyLang(l){
    lang = l;
    try{ localStorage.setItem('bt_lang', l); }catch(e){}
    var dict = T[l];
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n');
      if(dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var k = el.getAttribute('data-i18n-ph');
      if(dict[k] !== undefined) el.setAttribute('placeholder', dict[k]);
    });
    document.getElementById('langRu').setAttribute('aria-pressed', l==='ru');
    document.getElementById('langUz').setAttribute('aria-pressed', l==='uz');
    renderPhone();
  }
  window.setLang = applyLang;

  function renderPhone(){
    var el = document.getElementById('infoPhone');
    if(!el) return;
    var d = T[lang];
    el.innerHTML =
      CONTACT.phone1 + ' <span class="phone-role">— ' + d.phoneRole1 + '</span><br>' +
      CONTACT.phone2 + ' <span class="phone-role">— ' + d.phoneRole2 + '</span>';
  }

  // ---- lead capture ----
  window.openLead = function(productKey){
    var sel = document.getElementById('modalProductSelect');
    if(sel) sel.value = productKey||'';
    document.getElementById('modalForm').classList.remove('hide-form');
    document.getElementById('modalSuccess').classList.remove('show');
    var bd = document.getElementById('modalBackdrop');
    bd.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ var f = document.querySelector('#modalForm input[name="name"]'); if(f) f.focus(); }, 50);
  };
  window.closeLead = function(){
    document.getElementById('modalBackdrop').style.display = 'none';
    document.body.style.overflow = '';
  };
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeLead(); });

  function productLabel(key){
    if(!key) return T[lang].fOther;
    return T[lang][key+'t'] || key;
  }

  window.handleSubmit = function(evt, which){
    evt.preventDefault();
    var form = evt.target;
    var data = new FormData(form);
    var name = (data.get('name')||'').toString().trim();
    var phone = (data.get('phone')||'').toString().trim();
    var email = (data.get('email')||'').toString().trim();
    var company = (data.get('company')||'').toString().trim();
    var product = productLabel((data.get('product')||'').toString());
    var message = (data.get('message')||'').toString().trim();

    if(SHEET_WEBHOOK_URL.indexOf('PASTE_YOUR') === -1){
      fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify({name:name, phone:phone, email:email, company:company, product:product, message:message})
      }).catch(function(){});
    }

    var lines = [
      'Belli Tilsimat UZ — ' + (lang==='ru' ? 'заявка с сайта' : 'saytdan ariza'),
      (lang==='ru'?'Имя':'Ism') + ': ' + name,
      (lang==='ru'?'Телефон':'Telefon') + ': ' + phone
    ];
    if(email) lines.push('Email: ' + email);
    if(company) lines.push((lang==='ru'?'Компания':'Kompaniya') + ': ' + company);
    lines.push((lang==='ru'?'Продукт':'Mahsulot') + ': ' + product);
    if(message) lines.push((lang==='ru'?'Сообщение':'Xabar') + ': ' + message);
    var text = encodeURIComponent(lines.join('\n'));

    var tgHref = 'https://t.me/' + CONTACT.telegram + '?text=' + text;
    var waHref = 'https://wa.me/' + CONTACT.whatsapp + '?text=' + text;
    var callHref = 'tel:' + CONTACT.phoneHref;

    document.getElementById(which+'TgLink').href = tgHref;
    document.getElementById(which+'WaLink').href = waHref;
    document.getElementById(which+'CallLink').href = callHref;

    form.classList.add('hide-form');
    document.getElementById(which+'Success').classList.add('show');
    return false;
  };

  // ---- FAB ----
  window.toggleFab = function(force){
    var menu = document.getElementById('fabMenu');
    var main = document.getElementById('fabMain');
    var open = typeof force==='boolean' ? force : !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    main.classList.toggle('open', open);
  };

  // ---- mobile nav ----
  var mnav = document.getElementById('mnav');
  document.getElementById('burger').addEventListener('click', function(){ mnav.classList.add('open'); });
  document.getElementById('mnavClose').addEventListener('click', function(){ mnav.classList.remove('open'); });
  mnav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mnav.classList.remove('open'); }); });

  // ---- testimonial scroll ----
  window.scrollTesti = function(dir){
    var track = document.getElementById('testiTrack');
    track.scrollBy({left: dir*400, behavior: matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'auto'});
  };

  // ---- reveal on scroll ----
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setupReveal(){
    var els = document.querySelectorAll('.rv, .stagger');
    if(reduced || !('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.12});
    els.forEach(function(el){ io.observe(el); });
  }

  // ---- partners: auto-scrolling marquee (skipped for reduced-motion) ----
  function setupPartnersMarquee(){
    var grid = document.getElementById('partnersGrid');
    if(!grid || reduced) return;
    var logos = Array.prototype.slice.call(grid.children);
    if(logos.length < 2) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'partners-marquee';
    grid.parentNode.insertBefore(wrapper, grid);
    wrapper.appendChild(grid);
    logos.forEach(function(el){ grid.appendChild(el.cloneNode(true)); });
  }

  // ---- hero entrance: headline, then content, then CTAs ----
  function setupHeroEntrance(){
    var el = document.querySelector('.hero-top');
    if(!el) return;
    if(reduced){ el.classList.add('in'); return; }
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('in'); }); });
  }

  // ---- stat count-up ----
  function setupCounters(){
    var nums = document.querySelectorAll('.stat-row .num[data-count]');
    if(reduced || !('IntersectionObserver' in window)){
      nums.forEach(function(n){ n.textContent = n.getAttribute('data-count')+'+'; });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, target = parseInt(el.getAttribute('data-count'),10), start = performance.now(), dur = 1100;
        function tick(t){
          var p = Math.min(1, (t-start)/dur);
          var eased = 1 - Math.pow(1-p, 3);
          el.textContent = Math.round(eased*target) + (p>=1?'+':'');
          if(p<1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, {threshold:.4});
    nums.forEach(function(n){ io.observe(n); });
  }

  // ---- scroll parallax: blocks drift at different speeds as you scroll ----
  function setupParallax(){
    if(reduced) return;
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
    if(!els.length) return;
    var ticking = false;
    function apply(){
      var vh = window.innerHeight;
      els.forEach(function(el){
        var depth = parseFloat(el.getAttribute('data-depth')) || 0;
        var r = el.getBoundingClientRect();
        var center = r.top + r.height/2;
        var delta = (vh/2 - center) * depth;
        el.style.transform = 'translateY(' + delta.toFixed(1) + 'px)';
      });
      ticking = false;
    }
    function onScroll(){
      if(!ticking){ requestAnimationFrame(apply); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    apply();
  }

  // ---- history: pinned scroll journey — camera pans as you scroll, blocks cross-fade in turn ----
  // ---- floating nav shrink on scroll ----
  var navFloat = document.getElementById('navFloat');
  document.addEventListener('scroll', function(){
    navFloat.classList.toggle('scrolled', window.scrollY > 8);
  }, {passive:true});

  // ---- init ----
  buildProducts();
  buildProcess();
  buildTesti();
  buildProductSelects();
  applyLang(lang);
  setupReveal();
  setupHeroEntrance();
  setupPartnersMarquee();
  setupCounters();
  setupParallax();

  document.getElementById('infoEmail').textContent = CONTACT.email;
})();