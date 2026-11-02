(function(){
  'use strict';

  // ---- Business data ----
  var CONTACT = {
    phone:'+998 77 097 14 37',
    phoneHref:'+998770971437',
    email:'info@ideyaplus.uz',
    telegram:'far_akhm',
    whatsapp:'998770971437'
  };
  // Google Apps Script Web App that appends a row to the leads spreadsheet (see README-google-sheet-setup.md).
  var SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxF70cI0CebwT2CeM89QXsWBc3EzhkuIYskUN6Hr3NktPEX2XCLH4s5A1EIv_oy8NZ_/exec';

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var PRODUCTS = [
    {key:'p4', icon:'', featured:true},
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
      navAbout:'О нас', navServices:'Решения', navProcess:'Как работаем', navCases:'Проекты', navContact:'Контакты',
      ctaShort:'Бесплатный аудит',
      heroPill:'Belli Tilsimat — генеральный партнёр компании IDEYA PLUS',
      heroT1:'Автоматизируем бизнес на 1С', heroT2:'под ключ',
      heroSub:'Аудит, внедрение, настройка и сопровождение. 10 лет опыта и 100+ проектов — теперь для компаний Узбекистана.',
      heroCta1:'Получить бесплатный аудит', heroCta2:'Смотреть решения',
      chip1:'Франчайзи 1С в Туркменистане', chip2:'Резидент IT Park Uzbekistan', chip3:'Ответим в течение рабочего дня',
      hs1:'проектов на 1С', hs2:'лет опыта с 1С', hs3:'сотрудников в команде',
      painEyebrow:'Знакомая ситуация', painTitle:'Когда бизнес растёт быстрее, чем учёт',
      painSub:'Если вы узнали себя хотя бы в одном пункте — мы знаем, как это исправить.', painLbl:'Решение',
      pain1t:'Учёт в Excel и ручные сверки', pain1d:'Данные дублируются, цифры расходятся, на отчёты уходят дни.', pain1r:'Единая база: данные вводятся один раз и видны всем.',
      pain2t:'Нет цельной картины по складу и деньгам', pain2d:'Остатки, продажи и финансы живут в разных файлах и головах.', pain2r:'Остатки, продажи и финансы — в одной системе и одном отчёте.',
      pain3t:'1С есть, но «не работает» как нужно', pain3d:'Конфигурация типовая, процессы нестандартные, сотрудники обходят систему.', pain3r:'Настроим и доработаем 1С под то, как работает ваша компания.',
      pain4t:'Рост упирается в ручные операции', pain4d:'Каждый новый клиент или склад — это ещё больше рутины.', pain4r:'Автоматизируем рутину — команда занимается делом, а не таблицами.',
      aboutEyebrow:'Почему мы', aboutTitle:'Команда, которая отвечает за результат проекта',
      aboutLead:'Не просто «настроим программу» — доведём автоматизацию до рабочего результата и останемся рядом после запуска.',
      tYears:'лет на рынке 1С', tYearsD:'Начинали с экосистемой 1С в России, 10 лет работаем в Туркменистане.',
      tProj:'реализованных проектов', tProjD:'От небольших ИП до промышленных предприятий и торговых сетей.',
      tPark:'Резидент IT Park Uzbekistan', tParkD:'Работаем в Узбекистане как зарегистрированная компания — прозрачно и по местному законодательству.',
      tFranch:'Официальный франчайзи «1С»', tFranchD:'Статус Belli Tilsimat в Туркменистане: прямой доступ к экосистеме 1С и сертифицированная команда.',
      tPartner:'Партнёрство IDEYA PLUS × Belli Tilsimat', tPartnerD:'В рамках партнёрства с IDEYA PLUS компания Belli Tilsimat предлагает и реализует решения на базе 1С на рынке Узбекистана.',
      tOne:'Один ответственный контакт', tOneD:'Проект ведёт единая команда. У вас одна точка связи, а при необходимости мы заменим сотрудника.',
      tFocus:'Только 1С', tFocusD:'Специализируемся исключительно на 1С — глубоко знаем продукт и типовые задачи отраслей.',
      tLic:'Лицензии — у официальных партнёров', tLicD:'Лицензии 1С приобретаются отдельно у официальных партнёров в Узбекистане — подскажем, что именно нужно.',
      geo1t:'Россия', geo1d:'школа экспертизы', geo2t:'Туркменистан', geo2d:'10 лет и статус франчайзи', geo3t:'Узбекистан', geo3d:'новый рынок, тот же подход',
      prodEyebrow:'Решения', prodTitle:'Решения 1С под задачи вашего бизнеса', prodSub:'Автоматизируем учёт и процессы на базе 1С.',
      p1t:'1С:Управление нашей фирмой', p1d:'Внедрим и настроим учёт и управление ключевыми процессами малого и среднего бизнеса в одном инструменте.', p1f:'Малый и средний бизнес',
      p2t:'1С:Управление торговлей', p2d:'Настроим учёт товаров, продаж и склада — от закупки до отгрузки клиенту.', p2f:'Опт, розница, сети',
      p3t:'1С:Бухгалтерия', p3d:'Настроим точный бухгалтерский и налоговый учёт с готовыми формами отчётности.', p3f:'Для любого бизнеса',
      p4t:'1С:ERP Управление предприятием', p4d:'Внедрение и сопровождение ERP-решений для комплексной автоматизации бизнеса: операционное управление, учёт, контроль и планирование деятельности предприятия.', p4f:'Средний и крупный бизнес',
      p5t:'1С:Розница', p5d:'Настроим кассу, продажи и аналитику для магазина — рабочее место кассира и подключение онлайн-кассы.', p5f:'Магазины и точки продаж',
      p6t:'1С:Документооборот', p6d:'Внедрим электронный документооборот: согласование, контроль исполнения, архив документов.', p6f:'Договоры и согласования',
      p7t:'1С:ИТС — техническая поддержка', p7d:'Обеспечим обновления, консультации специалистов и доступ к обучающим материалам на постоянной основе.', p7f:'После запуска',
      p9t:'AI+ решения 1С', p9d:'Отчётность, аналитика, прогнозирование и статистика на основе данных 1С с использованием искусственного интеллекта.', p9f:'Аналитика на данных 1С',
      p10t:'EDI — электронный бизнес', p10d:'Обмен бизнес-документами между информационными системами компаний.', p10f:'Обмен документами',
      pfc1:'Производство', pfc2:'Снабжение и склад', pfc3:'Финансы и бюджет', pfc4:'Кадры', pfc5:'Аналитика',
      prodCta:'Обсудить', prodFeaturedTag:'Рекомендуем',
      procEyebrow:'Как мы работаем', procTitle:'Пять шагов от заявки до запуска системы',
      procSub:'Понятный путь без сюрпризов: на каждом шаге вы знаете, что происходит и что дальше.', procFree:'Бесплатно', procCta:'Начать с бесплатного аудита',
      proc1t:'Консультация и аудит', proc1d:'Разбираем задачи бизнеса, текущие процессы и узкие места — бесплатно, при заявке на сайте.',
      proc2t:'Подбор конфигурации 1С', proc2d:'Предлагаем оптимальное решение: типовое или с доработками под вашу специфику.',
      proc3t:'Внедрение и настройка', proc3d:'Устанавливаем систему, переносим данные и настраиваем под реальные бизнес-процессы.',
      proc4t:'Обучение сотрудников', proc4d:'Обучаем команду работе в системе — от кассира до руководителя.',
      proc5t:'Сопровождение и ИТС', proc5d:'Остаёмся на связи: обновления, консультации и оперативные доработки после запуска.',
      caseEyebrow:'Проекты', caseTitle:'Внедрения, которые уже работают', caseSub:'Подтверждённые проекты Belli Tilsimat в Туркменистане.',
      c1s:'Морской транспорт', c1n:'Международный морской порт Туркменистана', c1p:'1С:ERP Управление предприятием 2',
      c2s:'Морской транспорт', c2n:'Торговый морской флот Туркменистана', c2p:'1С:ERP Управление предприятием 2',
      c3s:'Страхование', c3n:'Государственная страховая организация Туркменистана', c3p:'1С:Бухгалтерия',
      caseCta:'Хочу такой же результат',
      testiEyebrow:'Отзывы', testiTitle:'Что говорят клиенты',
      testiIntro:'Вот что говорят клиенты, которые уже автоматизировали бизнес с Belli Tilsimat в Туркменистане.',
      t1:'Belli Tilsimat подошла к внедрению 1С:Предприятие 8 профессионально и ответственно. Получили современный инструмент для управления бизнес-процессами и рекомендуем компанию как надёжного партнёра.',
      t2:'Отдел внедрения 1С зарекомендовал себя исключительно положительно: высокая квалификация, оперативность и соблюдение сроков на всех этапах проекта.',
      t3:'Специалисты проявили профессионализм и внимательное отношение к клиенту, оперативно отвечали на все вопросы при установке 1С.',
      t4:'Команда провела аудит, донастроила систему под нашу специфику и обучила сотрудников — переход на новую систему прошёл организованно и в срок.',
      t5:'Рабочая группа автоматизировала продажу лекарственных препаратов качественно и в сжатые сроки — работа стала удобнее и эффективнее.',
      testiFlag:'Туркменистан',
      partnersEyebrow:'Партнёры', partnersTitle:'Технологии и бренды, с которыми мы работаем',
      faqEyebrow:'Вопросы', faqTitle:'Отвечаем на частые вопросы', faqSub:'Не нашли ответ? Напишите — ответим в течение рабочего дня.', faqCta:'Задать вопрос',
      q1:'Сколько это стоит?', a1:'Стоимость рассчитывается индивидуально после бесплатного аудита: вы получаете понятное предложение до старта работ.',
      q2:'Входят ли лицензии 1С?', a2:'Лицензии 1С приобретаются отдельно у официальных партнёров в Узбекистане. Мы подскажем, какие именно лицензии нужны под вашу задачу.',
      q3:'Сколько занимает внедрение?', a3:'Срок зависит от масштаба и числа процессов. Оценку сроков даём по итогам аудита, когда понятен объём работ.',
      q4:'У нас уже есть 1С — вы можете подключиться?', a4:'Да. Проведём аудит текущей базы, настроим и доработаем систему и при необходимости возьмём на сопровождение.',
      q5:'Кто отвечает за результат?', a5:'Мы как компания. У проекта один ответственный контакт, а если потребуется — заменим сотрудника, и вам не придётся искать нового исполнителя.',
      q6:'Вы работаете только с 1С?', a6:'Да, мы специализируемся исключительно на 1С. Поэтому хорошо знаем продукт и типовые задачи разных отраслей.',
      q7:'Как начать?', a7:'Оставьте заявку или напишите нам: обсудим задачу и назначим бесплатный аудит.',
      ctaEyebrow:'Начните сейчас', ctaTitle:'Начнём с бесплатного аудита?',
      ctaText:'Расскажите о задаче — предложим решение и рассчитаем стоимость. Ответим в течение рабочего дня.', ctaBtn:'Получить бесплатный аудит', ctaTg:'Написать в Telegram',
      contactEyebrow:'Контакты', contactTitle:'Оставьте заявку — ответим в течение рабочего дня', contactSub:'Заполните форму или напишите напрямую.',
      fName:'Имя', fNamePh:'Ваше имя', fPhone:'Телефон', fPhonePh:'+998 __ ___ __ __', fEmail:'Email', fEmailPh:'email@company.uz',
      fCompany:'Компания', fCompanyPh:'Название компании', fProduct:'Какой продукт интересует', fMessage:'Сообщение', fMessagePh:'Коротко опишите задачу',
      fConsent:'Нажимая кнопку, вы соглашаетесь на обработку персональных данных.', fSubmit:'Отправить заявку', fOther:'Ещё не определился',
      successTitle:'Спасибо! Заявка принята', successText:'Мы свяжемся с вами в течение рабочего дня. Хотите быстрее — напишите нам напрямую:',
      failTitle:'Не удалось отправить заявку', failText:'Напишите нам напрямую — так мы получим её сразу:',
      viaTelegram:'Написать в Telegram', viaWhatsapp:'Написать в WhatsApp', viaCall:'Позвонить',
      cPhone:'Телефон', phoneRole:'— коммерческий директор', cHours:'Часы работы', cHoursVal:'Круглосуточно',
      footTagline2:'Belli Tilsimat — генеральный партнёр компании IDEYA PLUS · Резидент IT Park Uzbekistan · Выгодные условия для клиентов в Центральной Азии',
      footCopy:'© 2026 IDEYA PLUS. Все права защищены. ИНН 312959777.', footNote:'Опыт и материалы компании Belli Tilsimat (Туркменистан), адаптировано для рынка Узбекистана.',
      modalEyebrow:'Бесплатный аудит', modalTitle:'Оставьте контакты'
    },
    uz:{
      navAbout:'Biz haqimizda', navServices:'Yechimlar', navProcess:'Qanday ishlaymiz', navCases:'Loyihalar', navContact:'Aloqa',
      ctaShort:'Bepul audit',
      heroPill:'Belli Tilsimat — IDEYA PLUS kompaniyasining bosh hamkori',
      heroT1:"Biznesni 1C da avtomatlashtiramiz", heroT2:'kalit topshirish asosida',
      heroSub:"Audit, joriy etish, sozlash va qo'llab-quvvatlash. 10 yillik tajriba va 100+ loyiha — endi O'zbekiston kompaniyalari uchun.",
      heroCta1:'Bepul audit olish', heroCta2:"Yechimlarni ko'rish",
      chip1:'Turkmanistonda 1C franchayzisi', chip2:'IT Park Uzbekiston rezidenti', chip3:'Ish kuni davomida javob beramiz',
      hs1:"1C bo'yicha loyiha", hs2:'1C bilan yillik tajriba', hs3:'jamoadagi xodim',
      painEyebrow:'Tanish holat', painTitle:"Biznes hisobdan tezroq o'sganda",
      painSub:"Agar o'zingizni kamida bitta bandda tanigan bo'lsangiz — buni qanday tuzatishni bilamiz.", painLbl:'Yechim',
      pain1t:"Excelda hisob va qo'lda solishtirish", pain1d:"Ma'lumotlar takrorlanadi, raqamlar farq qiladi, hisobotlarga kunlar ketadi.", pain1r:"Yagona baza: ma'lumot bir marta kiritiladi va hammaga ko'rinadi.",
      pain2t:"Ombor va pul bo'yicha yaxlit manzara yo'q", pain2d:"Qoldiqlar, savdo va moliya turli fayllarda va xotirada yashaydi.", pain2r:"Qoldiqlar, savdo va moliya — bitta tizimda va bitta hisobotda.",
      pain3t:"1C bor, lekin kerakli darajada «ishlamaydi»", pain3d:"Konfiguratsiya standart, jarayonlar nostandart, xodimlar tizimni aylanib o'tadi.", pain3r:"1C ni kompaniyangiz ishlash tarziga moslab sozlaymiz va takomillashtiramiz.",
      pain4t:"O'sish qo'lda bajariladigan operatsiyalarga tiraladi", pain4d:"Har bir yangi mijoz yoki ombor — yana ko'proq rutina.", pain4r:"Rutinani avtomatlashtiramiz — jamoa jadvallar bilan emas, ish bilan band.",
      aboutEyebrow:'Nega biz', aboutTitle:"Loyiha natijasi uchun javob beradigan jamoa",
      aboutLead:"Shunchaki «dasturni sozlab berish» emas — avtomatlashtirishni ishlaydigan natijaga yetkazamiz va ishga tushgandan keyin ham yoningizda qolamiz.",
      tYears:"1C bozorida yillar", tYearsD:"Rossiyada 1C ekotizimi bilan boshladik, 10 yildan beri Turkmanistonda ishlaymiz.",
      tProj:'amalga oshirilgan loyiha', tProjD:"Kichik yakka tadbirkorlardan sanoat korxonalari va savdo tarmoqlarigacha.",
      tPark:'IT Park Uzbekiston rezidenti', tParkD:"O'zbekistonda ro'yxatdan o'tgan kompaniya sifatida ishlaymiz — shaffof va mahalliy qonunchilikka muvofiq.",
      tFranch:"«1C» rasmiy franchayzisi", tFranchD:"Belli Tilsimat maqomi Turkmanistonda: 1C ekotizimiga to'g'ridan-to'g'ri kirish va sertifikatlangan jamoa.",
      tPartner:"IDEYA PLUS × Belli Tilsimat hamkorligi", tPartnerD:"IDEYA PLUS bilan hamkorlik doirasida Belli Tilsimat 1C asosidagi yechimlarni O'zbekiston bozorida taklif etadi va amalga oshiradi.",
      tOne:"Bitta mas'ul aloqa", tOneD:"Loyihani yagona jamoa olib boradi. Sizda bitta aloqa nuqtasi bor, zarur bo'lsa — xodimni almashtiramiz.",
      tFocus:'Faqat 1C', tFocusD:"Faqat 1C ga ixtisoslashganmiz — mahsulotni va tarmoqlarning odatiy vazifalarini chuqur bilamiz.",
      tLic:"Litsenziyalar — rasmiy hamkorlardan", tLicD:"1C litsenziyalari O'zbekistondagi rasmiy hamkorlardan alohida sotib olinadi — aynan nima kerakligini maslahat beramiz.",
      geo1t:'Rossiya', geo1d:'tajriba maktabi', geo2t:'Turkmaniston', geo2d:'10 yil va franchayzi maqomi', geo3t:"O'zbekiston", geo3d:"yangi bozor, o'sha yondashuv",
      prodEyebrow:'Yechimlar', prodTitle:"Biznesingiz vazifalariga mos 1C yechimlari", prodSub:"1C asosida hisob va jarayonlarni avtomatlashtiramiz.",
      p1t:'1C: Kompaniyamizni boshqarish', p1d:"Kichik va o'rta biznesning asosiy jarayonlarini bitta vositada hisobga olish va boshqarishni joriy etamiz.", p1f:"Kichik va o'rta biznes",
      p2t:'1C: Savdoni boshqarish', p2d:'Tovar, sotuv va ombor hisobini sozlab beramiz — xariddan mijozga yetkazib berishgacha.', p2f:"Ulgurji, chakana, tarmoqlar",
      p3t:'1C: Buxgalteriya', p3d:"Tayyor hisobot shakllari bilan aniq buxgalteriya va soliq hisobini sozlab beramiz.", p3f:"Har qanday biznes uchun",
      p4t:'1C: ERP Korxonani boshqarish', p4d:"Biznesni kompleks avtomatlashtirish uchun ERP-yechimlarini joriy etamiz va qo'llab-quvvatlaymiz: korxona faoliyatini operativ boshqarish, hisobga olish, nazorat va rejalashtirish.", p4f:"O'rta va yirik biznes",
      p5t:'1C: Chakana savdo', p5d:"Do'kon uchun kassa, sotuv va tahlilni sozlab beramiz — kassir ish joyi va onlayn-kassa ulanishi.", p5f:"Do'konlar va savdo nuqtalari",
      p6t:'1C: Hujjat aylanishi', p6d:'Elektron hujjat aylanishini joriy etamiz: kelishish, bajarilishini nazorat qilish, hujjatlar arxivi.', p6f:"Shartnomalar va kelishuvlar",
      p7t:'1C: ITS — texnik yordam', p7d:"Doimiy asosda yangilanishlar, mutaxassislar konsultatsiyasi va o'quv materiallariga kirishni ta'minlaymiz.", p7f:'Ishga tushgandan keyin',
      p9t:'1C uchun AI+ yechimlari', p9d:"1C ma'lumotlari asosida sun'iy intellekt yordamida hisobotlar, tahlil, prognozlash va statistika.", p9f:"1C ma'lumotlari tahlili",
      p10t:'EDI — elektron biznes', p10d:"Kompaniyalarning axborot tizimlari o'rtasida biznes-hujjatlar almashinuvi.", p10f:'Hujjat almashinuvi',
      pfc1:'Ishlab chiqarish', pfc2:"Ta'minot va ombor", pfc3:'Moliya va byudjet', pfc4:'Kadrlar', pfc5:'Tahlil',
      prodCta:'Muhokama qilish', prodFeaturedTag:'Tavsiya etamiz',
      procEyebrow:'Biz qanday ishlaymiz', procTitle:'Arizadan ishga tushirilgan tizimgacha besh qadam',
      procSub:"Kutilmagan hodisalarsiz tushunarli yo'l: har bir qadamda nima bo'layotganini va keyin nima bo'lishini bilasiz.", procFree:'Bepul', procCta:'Bepul auditdan boshlash',
      proc1t:'Konsultatsiya va audit', proc1d:'Biznes vazifalari, joriy jarayonlar va tor joylarni aniqlaymiz — saytdan ariza bergan har bir mijoz uchun bepul.',
      proc2t:'1C konfiguratsiyasini tanlash', proc2d:'Optimal yechimni taklif qilamiz: standart yoki sizning ehtiyojingizga moslashtirilgan.',
      proc3t:'Joriy etish va sozlash', proc3d:"Tizimni o'rnatamiz, ma'lumotlarni ko'chiramiz va real biznes-jarayonlariga moslab sozlaymiz.",
      proc4t:"Xodimlarni o'qitish", proc4d:"Jamoani tizimda ishlashga o'rgatamiz — kassirdan rahbargacha.",
      proc5t:"Qo'llab-quvvatlash va ITS", proc5d:"Ishga tushirilgandan keyin ham aloqada qolamiz: yangilanishlar, konsultatsiya va tezkor moslashtirishlar.",
      caseEyebrow:'Loyihalar', caseTitle:"Allaqachon ishlayotgan joriy etishlar", caseSub:"Belli Tilsimat ning Turkmanistondagi tasdiqlangan loyihalari.",
      c1s:'Dengiz transporti', c1n:"Turkmaniston Xalqaro dengiz porti", c1p:'1C: ERP Korxonani boshqarish 2',
      c2s:'Dengiz transporti', c2n:"Turkmaniston Savdo dengiz floti", c2p:'1C: ERP Korxonani boshqarish 2',
      c3s:"Sug'urta", c3n:"Turkmanistonning davlat sug'urta tashkiloti", c3p:'1C: Buxgalteriya',
      caseCta:"Xuddi shunday natija istayman",
      testiEyebrow:'Fikrlar', testiTitle:'Mijozlar nima deydi',
      testiIntro:"Turkmanistonda Belli Tilsimat bilan biznesini avtomatlashtirgan mijozlar shunday deydi.",
      t1:"Belli Tilsimat 1C:Korxona 8 tizimini joriy etishda professional va mas'uliyatli yondashdi. Biznes-jarayonlarni boshqarish uchun zamonaviy vosita oldik va kompaniyani ishonchli hamkor sifatida tavsiya qilamiz.",
      t2:"1C joriy etish bo'limi o'zini faqat ijobiy tomondan ko'rsatdi: yuqori malaka, tezkorlik va loyihaning barcha bosqichlarida muddatlarga rioya qilish.",
      t3:"Mutaxassislar professionallik va mijozga e'tiborli munosabat ko'rsatdi, 1C o'rnatishda barcha savollarga tezkor javob berishdi.",
      t4:"Jamoa auditni o'tkazdi, tizimni ehtiyojlarimizga moslab sozladi va xodimlarni o'qitdi — yangi tizimga o'tish tartibli va o'z vaqtida amalga oshdi.",
      t5:"Ishchi guruh dori vositalari savdosini sifatli va qisqa muddatda avtomatlashtirdi — ish qulay va samarali bo'lib qoldi.",
      testiFlag:'Turkmaniston',
      partnersEyebrow:'Hamkorlar', partnersTitle:"Biz ishlaydigan texnologiyalar va brendlar",
      faqEyebrow:'Savollar', faqTitle:"Tez-tez so'raladigan savollarga javob beramiz", faqSub:"Javob topa olmadingizmi? Yozing — ish kuni davomida javob beramiz.", faqCta:'Savol berish',
      q1:"Bu qancha turadi?", a1:"Narx bepul auditdan keyin individual hisoblanadi: ishlar boshlanishidan oldin tushunarli taklif olasiz.",
      q2:"1C litsenziyalari kiradimi?", a2:"1C litsenziyalari O'zbekistondagi rasmiy hamkorlardan alohida sotib olinadi. Vazifangizga aynan qaysi litsenziyalar kerakligini maslahat beramiz.",
      q3:"Joriy etish qancha vaqt oladi?", a3:"Muddat ko'lam va jarayonlar soniga bog'liq. Ishlar hajmi aniq bo'lgach, audit yakunlari bo'yicha muddatni baholab beramiz.",
      q4:"Bizda 1C allaqachon bor — ulana olasizlarmi?", a4:"Ha. Joriy bazani auditdan o'tkazamiz, tizimni sozlaymiz va takomillashtiramiz, zarur bo'lsa qo'llab-quvvatlashga olamiz.",
      q5:"Natija uchun kim mas'ul?", a5:"Biz kompaniya sifatida. Loyihada bitta mas'ul aloqa bor, kerak bo'lsa — xodimni almashtiramiz, yangi ijrochi qidirishingiz shart emas.",
      q6:"Faqat 1C bilan ishlaysizlarmi?", a6:"Ha, faqat 1C ga ixtisoslashganmiz. Shu sababli mahsulotni va turli tarmoqlarning odatiy vazifalarini yaxshi bilamiz.",
      q7:"Qanday boshlash mumkin?", a7:"Ariza qoldiring yoki bizga yozing: vazifani muhokama qilib, bepul audit tayinlaymiz.",
      ctaEyebrow:'Hoziroq boshlang', ctaTitle:'Bepul auditdan boshlaymizmi?',
      ctaText:"Vazifangiz haqida gapirib bering — yechim taklif qilamiz va narxni hisoblaymiz. Ish kuni davomida javob beramiz.", ctaBtn:'Bepul audit olish', ctaTg:'Telegram orqali yozish',
      contactEyebrow:'Aloqa', contactTitle:"Ariza qoldiring — ish kuni davomida javob beramiz", contactSub:"Formani to'ldiring yoki to'g'ridan-to'g'ri yozing.",
      fName:'Ism', fNamePh:'Ismingiz', fPhone:'Telefon', fPhonePh:'+998 __ ___ __ __', fEmail:'Email', fEmailPh:'email@company.uz',
      fCompany:'Kompaniya', fCompanyPh:'Kompaniya nomi', fProduct:'Qaysi mahsulot qiziqtiradi', fMessage:'Xabar', fMessagePh:'Vazifani qisqacha tavsiflang',
      fConsent:"Tugmani bosish orqali siz shaxsiy ma'lumotlaringizni qayta ishlashga rozilik bildirasiz.", fSubmit:'Arizani yuborish', fOther:"Hali aniqlamadim",
      successTitle:"Rahmat! Ariza qabul qilindi", successText:"Ish kuni davomida siz bilan bog'lanamiz. Tezroq xohlasangiz — bevosita yozing:",
      failTitle:"Arizani yuborib bo'lmadi", failText:"Bevosita yozing — shunda ariza darhol yetib boradi:",
      viaTelegram:'Telegram orqali yozish', viaWhatsapp:'WhatsApp orqali yozish', viaCall:"Qo'ng'iroq qilish",
      cPhone:'Telefon', phoneRole:'— tijorat direktori', cHours:'Ish vaqti', cHoursVal:"Kecha-kunduz",
      footTagline2:"Belli Tilsimat — IDEYA PLUS kompaniyasining bosh hamkori · IT Park Uzbekiston rezidenti · Markaziy Osiyo mijozlari uchun foydali shartlar",
      footCopy:'© 2026 IDEYA PLUS. Barcha huquqlar himoyalangan. STIR 312959777.', footNote:"Belli Tilsimat (Turkmaniston) kompaniyasining tajribasi va materiallari O'zbekiston bozori uchun moslashtirildi.",
      modalEyebrow:'Bepul audit', modalTitle:"Kontaktingizni qoldiring"
    }
  };

  var lang = (function(){ try{ return localStorage.getItem('bt_lang')==='uz' ? 'uz' : 'ru'; }catch(e){ return 'ru'; } })();
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function(id){ return document.getElementById(id); };

  // ---------- builders ----------
  function buildProducts(){
    $('productGrid').innerHTML = PRODUCTS.map(function(p){
      var btn = '<button class="go" onclick="openLead(\''+p.key+'\')"><span data-i18n="prodCta"></span>'+ARROW+'</button>';
      if(p.featured){
        return '<article class="pcard featured spot"><div class="pf-ph"><div class="pf-img" data-depth="0.03" style="background-image:url(images/product-erp-photo.jpg)"></div><span class="feat-tag" data-i18n="prodFeaturedTag"></span></div>'+
          '<div class="pf-body"><span class="for" data-i18n="p4f"></span><h3 data-i18n="p4t"></h3><p data-i18n="p4d"></p>'+
          '<div class="pf-chips"><span data-i18n="pfc1"></span><span data-i18n="pfc2"></span><span data-i18n="pfc3"></span><span data-i18n="pfc4"></span><span data-i18n="pfc5"></span></div>'+btn+'</div></article>';
      }
      return '<article class="pcard spot"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">'+p.icon+'</svg></div>'+
        '<span class="for" data-i18n="'+p.key+'f"></span><h3 data-i18n="'+p.key+'t"></h3><p data-i18n="'+p.key+'d"></p>'+btn+'</article>';
    }).join('');
  }
  function buildProcess(){
    $('processList').innerHTML = PROCESS.map(function(key,i){
      return '<div class="step"><div class="n">0'+(i+1)+'</div><div><h3 data-i18n="'+key+'t"></h3><p data-i18n="'+key+'d"></p></div>'+
        (i===0 ? '<span class="free" data-i18n="procFree"></span>' : '')+'</div>';
    }).join('');
  }
  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.6L22 9.3l-5 4.8 1.3 7-6.3-3.6L5.7 21l1.3-7-5-4.8 7.1-.7Z"/></svg>';
  function buildTesti(){
    $('testiTrack').innerHTML = TESTI.map(function(t){
      return '<div class="testi-card"><div class="testi-top"><div class="testi-avatar">'+t.co.charAt(0)+'</div><span class="testi-flag" data-i18n="testiFlag"></span></div>'+
        '<div class="testi-stars">'+STAR+STAR+STAR+STAR+STAR+'</div>'+
        '<p class="testi-quote" data-i18n="'+t.key+'"></p>'+
        '<div class="testi-foot"><div class="co">'+t.co+'</div></div></div>';
    }).join('');
  }
  function buildProductSelects(){
    var opts = PRODUCTS.map(function(p){ return '<option value="'+p.key+'" data-i18n="'+p.key+'t"></option>'; }).join('');
    var other = '<option value="" selected data-i18n="fOther"></option>';
    $('mainProductSelect').innerHTML = other + opts;
    $('modalProductSelect').innerHTML = other + opts;
  }

  // ---------- i18n + word-split headings ----------
  function splitEl(el){
    var txt = el.textContent.replace(/\s+/g,' ').trim();
    var words = txt.split(' ');
    el.textContent = '';
    words.forEach(function(w,i){
      var outer = document.createElement('span'); outer.className = 'w';
      var inner = document.createElement('span'); inner.className = 'wi'; inner.textContent = w; inner.style.setProperty('--i', i);
      outer.appendChild(inner); el.appendChild(outer);
      if(i < words.length-1) el.appendChild(document.createTextNode(' '));
    });
  }
  function splitAll(){
    if(reduced) return;
    document.querySelectorAll('[data-split]').forEach(splitEl);
  }
  function applyLang(l){
    lang = l;
    try{ localStorage.setItem('bt_lang', l); }catch(e){}
    document.documentElement.lang = l;
    var dict = T[l];
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n');
      if(dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var k = el.getAttribute('data-i18n-ph');
      if(dict[k] !== undefined) el.setAttribute('placeholder', dict[k]);
    });
    $('langRu').setAttribute('aria-pressed', l==='ru');
    $('langUz').setAttribute('aria-pressed', l==='uz');
    splitAll();
  }
  window.setLang = applyLang;

  function setupContacts(){
    $('navPhone').href = 'tel:' + CONTACT.phoneHref; $('navPhone').textContent = CONTACT.phone;
    var ip = document.querySelector('#infoPhone a'); ip.href = 'tel:' + CONTACT.phoneHref; ip.textContent = CONTACT.phone;
    var it = document.querySelector('#infoTelegram a'); it.href = 'https://t.me/' + CONTACT.telegram; it.textContent = '@' + CONTACT.telegram;
    $('infoEmail').href = 'mailto:' + CONTACT.email; $('infoEmail').textContent = CONTACT.email;
    $('ctaTg').href = 'https://t.me/' + CONTACT.telegram;
  }

  // ---------- lead capture ----------
  window.openLead = function(productKey){
    var sel = $('modalProductSelect');
    if(sel) sel.value = productKey || '';
    $('modalForm').classList.remove('hide-form');
    $('modalSuccess').classList.remove('show');
    $('modalBackdrop').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ var f = document.querySelector('#modalForm input[name="name"]'); if(f) f.focus(); }, 60);
  };
  window.closeLead = function(){
    $('modalBackdrop').style.display = 'none';
    document.body.style.overflow = '';
  };
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ closeLead(); closeMnav(); }
  });

  function productLabel(key){
    if(!key) return T[lang].fOther;
    return T[lang][key+'t'] || key;
  }
  function showResult(which, ok){
    var d = T[lang];
    var title = $(which+'SuccessTitle'), text = $(which+'SuccessText');
    title.setAttribute('data-i18n', ok ? 'successTitle' : 'failTitle'); title.textContent = d[ok ? 'successTitle' : 'failTitle'];
    text.setAttribute('data-i18n', ok ? 'successText' : 'failText'); text.textContent = d[ok ? 'successText' : 'failText'];
    $(which+'Success').classList.add('show');
  }
  window.handleSubmit = function(evt, which){
    evt.preventDefault();
    var form = evt.target;
    var data = new FormData(form);
    var get = function(k){ return (data.get(k)||'').toString().trim(); };
    var name = get('name'), phone = get('phone'), email = get('email'), company = get('company'), message = get('message');
    var product = productLabel(get('product'));

    var ru = lang==='ru';
    var lines = ['IDEYA PLUS — ' + (ru ? 'заявка с сайта' : 'saytdan ariza'),
      (ru?'Имя':'Ism') + ': ' + name, (ru?'Телефон':'Telefon') + ': ' + phone];
    if(email) lines.push('Email: ' + email);
    if(company) lines.push((ru?'Компания':'Kompaniya') + ': ' + company);
    lines.push((ru?'Продукт':'Mahsulot') + ': ' + product);
    if(message) lines.push((ru?'Сообщение':'Xabar') + ': ' + message);
    var text = encodeURIComponent(lines.join('\n'));
    $(which+'TgLink').href = 'https://t.me/' + CONTACT.telegram + '?text=' + text;
    $(which+'WaLink').href = 'https://wa.me/' + CONTACT.whatsapp + '?text=' + text;
    $(which+'CallLink').href = 'tel:' + CONTACT.phoneHref;

    var btn = form.querySelector('[type="submit"]');
    if(btn) btn.disabled = true;
    var finish = function(ok){
      if(btn) btn.disabled = false;
      form.classList.add('hide-form');
      showResult(which, ok);
    };
    if(!SHEET_WEBHOOK_URL || SHEET_WEBHOOK_URL.indexOf('PASTE_YOUR') !== -1){ finish(false); return false; }
    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, 10000) : null;
    fetch(SHEET_WEBHOOK_URL, {
      method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'},
      body: JSON.stringify({name:name, phone:phone, email:email, company:company, product:product, message:message}),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function(){ if(timer) clearTimeout(timer); finish(true); })
      .catch(function(){ if(timer) clearTimeout(timer); finish(false); });
    return false;
  };

  // phone mask: only when the number starts with +998 (other countries are left as typed)
  function fmtPhone(v){
    var d = v.replace(/\D/g,'');
    if(d.indexOf('998') !== 0) return v;
    d = d.slice(0,12);
    var out = '+' + d.slice(0,3);
    if(d.length>3) out += ' ' + d.slice(3,5);
    if(d.length>5) out += ' ' + d.slice(5,8);
    if(d.length>8) out += ' ' + d.slice(8,10);
    if(d.length>10) out += ' ' + d.slice(10,12);
    return out;
  }
  document.querySelectorAll('input[data-phone]').forEach(function(inp){
    inp.addEventListener('input', function(e){
      if(e.inputType && e.inputType.indexOf('delete') === 0) return;
      inp.value = fmtPhone(inp.value);
    });
  });

  // ---------- mobile nav ----------
  var mnav = $('mnav');
  function closeMnav(){ mnav.classList.remove('open'); mnav.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  $('burger').addEventListener('click', function(){ mnav.classList.add('open'); mnav.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; });
  $('mnavClose').addEventListener('click', closeMnav);
  mnav.querySelectorAll('a,button.btn').forEach(function(a){ a.addEventListener('click', closeMnav); });

  window.scrollTesti = function(dir){
    $('testiTrack').scrollBy({left: dir*400, behavior: reduced ? 'auto' : 'smooth'});
  };

  // FAQ: keep one answer open at a time
  document.querySelectorAll('.faq-item').forEach(function(d){
    d.addEventListener('toggle', function(){
      if(!d.open) return;
      document.querySelectorAll('.faq-item').forEach(function(o){ if(o !== d) o.open = false; });
    });
  });

  // ---------- reveal on scroll ----------
  function setupReveal(){
    var els = document.querySelectorAll('.rv, .stagger, [data-split]');
    document.querySelectorAll('.stagger').forEach(function(s){
      Array.prototype.forEach.call(s.children, function(c,i){ c.style.setProperty('--i', i); });
    });
    if(reduced || !('IntersectionObserver' in window)){
      els.forEach(function(el){ el.classList.add('in','is-in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in','is-in'); io.unobserve(en.target); }
      });
    }, {threshold:.15, rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){ if(!el.closest('.hero')) io.observe(el); });
  }

  // ---------- hero entrance ----------
  function setupHero(){
    var hero = document.querySelector('.hero');
    var ins = hero.querySelectorAll('.hero-in');
    var delays = [0.05, 0.62, 0.78, 0.94, 1.1];
    ins.forEach(function(el,i){ el.style.setProperty('--d', (delays[i] || 1.1) + 's'); });
    hero.querySelectorAll('.ln').forEach(function(el,i){ el.style.setProperty('--base', (0.2 + i*0.22) + 's'); });
    var go = function(){
      hero.classList.add('go');
      hero.querySelectorAll('.ln').forEach(function(el){ el.classList.add('is-in'); });
    };
    if(reduced){ go(); return; }
    requestAnimationFrame(function(){ requestAnimationFrame(go); });
  }

  // ---------- counters ----------
  function setupCounters(){
    var nums = document.querySelectorAll('[data-count]');
    function setFinal(n){ n.textContent = n.getAttribute('data-count') + (n.getAttribute('data-suffix') || ''); }
    if(reduced || !('IntersectionObserver' in window)){ nums.forEach(setFinal); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, target = parseInt(el.getAttribute('data-count'),10), suffix = el.getAttribute('data-suffix') || '', start = performance.now(), dur = 1400;
        function tick(t){
          var p = Math.min(1, (t-start)/dur), eased = 1 - Math.pow(1-p, 3);
          el.textContent = Math.round(eased*target) + (p>=1 ? suffix : '');
          if(p<1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, {threshold:.4});
    nums.forEach(function(n){ io.observe(n); });
  }

  // ---------- scroll: progress, nav state, parallax, process line ----------
  var parallaxEls = [];
  var procEl = null, procSteps = [], procFill = null;
  function onScroll(){
    var y = window.scrollY, vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    $('progress').style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y/max) : 0) + ')';
    $('navFloat').classList.toggle('scrolled', y > 8);

    if(!reduced){
      parallaxEls.forEach(function(el){
        var r = el.getBoundingClientRect();
        if(r.bottom < -200 || r.top > vh + 200) return;
        var depth = parseFloat(el.getAttribute('data-depth')) || 0;
        var delta = (vh/2 - (r.top + r.height/2)) * depth;
        el.style.transform = 'translate3d(0,' + delta.toFixed(1) + 'px,0)';
      });
    }
    if(procEl){
      var pr = procEl.getBoundingClientRect(), line = vh * 0.58;
      var p = Math.max(0, Math.min(1, (line - pr.top) / pr.height));
      procFill.style.setProperty('--p', reduced ? 1 : p.toFixed(3));
      procSteps.forEach(function(s){
        var sr = s.getBoundingClientRect();
        s.classList.toggle('on', reduced || (sr.top + sr.height/2) < line);
      });
    }
  }
  function setupScroll(){
    parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
    procEl = $('proc'); procFill = $('procFill');
    procSteps = procEl ? Array.prototype.slice.call(procEl.querySelectorAll('.step')) : [];
    var ticking = false;
    function req(){ if(!ticking){ ticking = true; requestAnimationFrame(function(){ onScroll(); ticking = false; }); } }
    window.addEventListener('scroll', req, {passive:true});
    window.addEventListener('resize', req);
    onScroll();

    // active nav link
    if('IntersectionObserver' in window){
      var links = document.querySelectorAll('.nav a');
      var map = {};
      links.forEach(function(a){ map[a.getAttribute('href')] = a; });
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          var a = map['#' + en.target.id];
          if(a && en.isIntersecting){ links.forEach(function(l){ l.classList.remove('active'); }); a.classList.add('active'); }
        });
      }, {rootMargin:'-45% 0px -50% 0px'});
      ['about','products','process','cases','contact'].forEach(function(id){ var s = $(id); if(s) io.observe(s); });
    }
  }

  // ---------- marquees ----------
  function setupMarquees(){
    var mq = $('mqTrack');
    var grid = $('partnersGrid');
    if(reduced) return;
    if(mq) mq.innerHTML += mq.innerHTML;
    if(grid){ var logos = Array.prototype.slice.call(grid.children); logos.forEach(function(el){ grid.appendChild(el.cloneNode(true)); }); }
  }

  // ---------- pointer effects: spotlight, magnetic buttons, cursor ----------
  function setupPointer(){
    if(reduced || !finePointer) return;
    var ring = document.createElement('div'); ring.className = 'cur';
    var dot = document.createElement('div'); dot.className = 'cur-dot';
    document.body.appendChild(ring); document.body.appendChild(dot);
    var mx = 0, my = 0, rx = 0, ry = 0, active = false, raf = 0;
    var magnets = Array.prototype.slice.call(document.querySelectorAll('[data-magnetic]'));

    function loop(){
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      raf = (Math.abs(mx-rx) > .2 || Math.abs(my-ry) > .2) ? requestAnimationFrame(loop) : 0;
    }
    document.addEventListener('pointermove', function(e){
      if(e.pointerType && e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      if(!active){ active = true; rx = mx; ry = my; ring.classList.add('on'); dot.classList.add('on'); }
      if(!raf) raf = requestAnimationFrame(loop);

      var t = e.target.closest ? e.target.closest('.spot') : null;
      if(t){ var r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px'); }

      magnets.forEach(function(m){
        var r = m.getBoundingClientRect();
        var cx = r.left + r.width/2, cy = r.top + r.height/2;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        var near = Math.abs(dx) < r.width/2 + 50 && Math.abs(dy) < r.height/2 + 50;
        m.style.setProperty('--tx', near ? (dx*0.22).toFixed(1) + 'px' : '0px');
        m.style.setProperty('--ty', near ? (dy*0.3).toFixed(1) + 'px' : '0px');
      });
    }, {passive:true});
    document.addEventListener('pointerover', function(e){
      var hit = e.target.closest && e.target.closest('a,button,summary,select,input,textarea,label');
      ring.classList.toggle('big', !!hit);
    });
    document.documentElement.addEventListener('mouseleave', function(){ ring.classList.remove('on'); dot.classList.remove('on'); active = false; });
  }

  // ---------- init ----------
  buildProducts();
  buildProcess();
  buildTesti();
  buildProductSelects();
  setupContacts();
  applyLang(lang);
  setupReveal();
  setupHero();
  setupCounters();
  setupMarquees();
  setupScroll();
  setupPointer();
})();
