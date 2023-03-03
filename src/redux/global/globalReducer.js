import globalTypes from "./globalTypes";

import crocodile from "../../assets/images/avatars/crocodile.jpg";
import dolphin from "../../assets/images/avatars/dolphin.jpg";
import iguana from "../../assets/images/avatars/iguana.jpg";
import jaguar from "../../assets/images/avatars/jaguar.jpg";
import macaw from "../../assets/images/avatars/macaw.jpg";
import monkey from "../../assets/images/avatars/monkey.jpg";
import sloth from "../../assets/images/avatars/sloth.jpg";
import toucan from "../../assets/images/avatars/toucan.jpg";
import turtle from "../../assets/images/avatars/turtle.jpg";
import whale from "../../assets/images/avatars/whale.jpg";
import none from "../../assets/images/avatars/default.svg";

import gold from "../../assets/images/filters/gold.png";
import selected from "../../assets/images/filters/filter-select.png";
import transparent from "../../assets/images/filters/transparent.png";
import driver from "../../assets/images/filters/filter-driver.png";

const initialState = {
  labelStringField: "Only letters and numbers allowed",
  labelRequiredField: "This field is required",

  priceMin: 2000,
  priceMax: 50000,
  seatsMax: 3,
  commissionOnPassenger: 1,
  commissionOnDriver: 1,
  initHeight: 0,
  constants: [],
  feedback: {},
  isNavBar: true,
  isOffline: false,

  isLoadingCountries: false,
  countries: [],

  // Booking status
  // Status 1: Sent
  // Status 2: Seen
  // Status 3: Accepted
  // Status 4: Rejected
  // Status 5: Canceled
  bookingStatusVariant: (status) => {
    const variant = ["warning", "info", "success", "danger", "danger"];
    return variant[status - 1];
  },

  // Ride status
  // Status 1: Planned,
  // Status 2: On going,
  // Status 3: Done,
  // Status 4: Canceled,
  rideStatusVariant: (status) => {
    const variant = ["warning", "info", "success", "danger"];
    return variant[status - 1];
  },

  nbContactSubjects: 10,
  nbReasonNotComplete: 5,

  carMakers: [
    "Other",
    "Audi",
    "BMW",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Daewoo",
    "Daihatsu",
    "Datsun",
    "Dodge",
    "Ford",
    "GMC",
    "Geely",
    "Honda",
    "Hyundai",
    "Jeep",
    "Kia",
    "Land Rover",
    "Lexus",
    "Lifan",
    "Mazda",
    "Mercedes-Benz",
    "Mitsubishi",
    "Nissan",
    "Peugeot",
    "Porsche",
    "RAM",
    "Renault",
    "Ssangyong",
    "Subaru",
    "Suzuki",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ],

  provincesCostaRica: [
    "Alajuela",
    "Cartago",
    "Guanacaste",
    "Heredia",
    "Limón",
    "Puntarenas",
    "San José",
  ],

  countriesAvailable: ["Costa Rica"],

  pointsGrid: {
    READ_MESSAGE: { value: 1 },
    SEND_MESSAGE: { value: 2 },
    ADD_BIO: { value: 15 },
    UPDATE_BIO: { value: 5 },
    BOOK_RIDE: { value: 10 },
    PUBLISH_RIDE: { value: 20 },
    ANSWER_BOOKING: { value: 10 },
    BECOME_DRIVER: { value: 20 },
    ADD_REVIEW: { value: 10 },
    CONFIRM_RIDE: { value: 10 },
    ADD_DATE_OF_BIRTH: { value: 15 },
    SET_CAR_FUEL: { value: 2 },
    SET_CAR_SEATS: { value: 2 },
  },

  srcAvatar: (user) => {
    switch (user.avatar) {
      case "crocodile":
        return crocodile;

      case "dolphin":
        return dolphin;

      case "iguana":
        return iguana;

      case "jaguar":
        return jaguar;

      case "macaw":
        return macaw;

      case "monkey":
        return monkey;

      case "sloth":
        return sloth;

      case "toucan":
        return toucan;

      case "turtle":
        return turtle;

      case "whale":
        return whale;

      case null:
        return none;

      default:
        return none;
    }
  },

  srcFilter: (filter) => {
    switch (filter) {
      case "gold":
        return gold;

      case "selected":
        return selected;

      case "driver":
        return driver;

      case null:
        return transparent;

      default:
        return transparent;
    }
  },

  languages: {
    en: {
      name: "English",
      nativeName: "English",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/English_language.svg/500px-English_language.svg.png",
    },
    es: {
      name: "Spanish",
      nativeName: "Español",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Spanish_language_(ES-MX).svg/500px-Flag_of_Spanish_language_(ES-MX).svg.png",
    },
    fr: {
      name: "French",
      nativeName: "Français",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/500px-Flag_of_France.svg.png",
    },
    de: {
      name: "German",
      nativeName: "Deutsch",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/500px-Flag_of_Germany.svg.png",
    },
    he: {
      name: "Hebrew",
      nativeName: "עברית",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/500px-Flag_of_Israel.svg.png",
    },
    nl: {
      name: "Dutch",
      nativeName: "Nederlands",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/500px-Flag_of_the_Netherlands.svg.png",
    },
    it: {
      name: "Italian",
      nativeName: "Italiano",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/500px-Flag_of_Italy.svg.png",
    },
    pt: {
      name: "Portuguese",
      nativeName: "Português",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Portuguese_language_(PT-BR).svg/500px-Flag_of_Portuguese_language_(PT-BR).svg.png",
    },

    ab: {
      name: "Abkhaz",
      nativeName: "аҧсуа",
    },
    aa: {
      name: "Afar",
      nativeName: "Afaraf",
    },
    af: {
      name: "Afrikaans",
      nativeName: "Afrikaans",
    },
    ak: {
      name: "Akan",
      nativeName: "Akan",
    },
    sq: {
      name: "Albanian",
      nativeName: "Shqip",
    },
    am: {
      name: "Amharic",
      nativeName: "አማርኛ",
    },
    ar: {
      name: "Arabic",
      nativeName: "العربية",
    },
    an: {
      name: "Aragonese",
      nativeName: "Aragonés",
    },
    hy: {
      name: "Armenian",
      nativeName: "Հայերեն",
    },
    as: {
      name: "Assamese",
      nativeName: "অসমীয়া",
    },
    av: {
      name: "Avaric",
      nativeName: "авар мацӀ, магӀарул мацӀ",
    },
    ae: {
      name: "Avestan",
      nativeName: "Avesta",
    },
    ay: {
      name: "Aymara",
      nativeName: "Aymar aru",
    },
    az: {
      name: "Azerbaijani",
      nativeName: "Azərbaycan dili",
    },
    bm: {
      name: "Bambara",
      nativeName: "Bamanankan",
    },
    ba: {
      name: "Bashkir",
      nativeName: "башҡорт теле",
    },
    eu: {
      name: "Basque",
      nativeName: "Euskara",
    },
    be: {
      name: "Belarusian",
      nativeName: "Беларуская",
    },
    bn: {
      name: "Bengali",
      nativeName: "বাংলা",
    },
    bh: {
      name: "Bihari",
      nativeName: "भोजपुरी",
    },
    bi: {
      name: "Bislama",
      nativeName: "Bislama",
    },
    bs: {
      name: "Bosnian",
      nativeName: "Bosanski jezik",
    },
    br: {
      name: "Breton",
      nativeName: "Brezhoneg",
    },
    bg: {
      name: "Bulgarian",
      nativeName: "български език",
    },
    my: {
      name: "Burmese",
      nativeName: "ဗမာစာ",
    },
    ca: {
      name: "Catalan; Valencian",
      nativeName: "Català",
    },
    ch: {
      name: "Chamorro",
      nativeName: "Chamoru",
    },
    ce: {
      name: "Chechen",
      nativeName: "нохчийн мотт",
    },
    ny: {
      name: "Chichewa; Chewa; Nyanja",
      nativeName: "ChiCheŵa, chinyanja",
    },
    zh: {
      name: "Chinese",
      nativeName: "中文 (Zhōngwén), 汉语, 漢語",
    },
    cv: {
      name: "Chuvash",
      nativeName: "чӑваш чӗлхи",
    },
    kw: {
      name: "Cornish",
      nativeName: "Kernewek",
    },
    co: {
      name: "Corsican",
      nativeName: "Corsu",
    },
    cr: {
      name: "Cree",
      nativeName: "ᓀᐦᐃᔭᐍᐏᐣ",
    },
    hr: {
      name: "Croatian",
      nativeName: "Hrvatski",
    },
    cs: {
      name: "Czech",
      nativeName: "Česky, čeština",
    },
    da: {
      name: "Danish",
      nativeName: "Dansk",
    },
    dv: {
      name: "Divehi; Dhivehi; Maldivian;",
      nativeName: "ދިވެހި",
    },

    eo: {
      name: "Esperanto",
      nativeName: "Esperanto",
    },
    et: {
      name: "Estonian",
      nativeName: "Eesti",
    },
    ee: {
      name: "Ewe",
      nativeName: "Eʋegbe",
    },
    fo: {
      name: "Faroese",
      nativeName: "Føroyskt",
    },
    fj: {
      name: "Fijian",
      nativeName: "Vosa Vakaviti",
    },
    fi: {
      name: "Finnish",
      nativeName: "Suomi, suomen kieli",
    },

    ff: {
      name: "Fula; Fulah; Pulaar; Pular",
      nativeName: "Fulfulde",
    },
    gl: {
      name: "Galician",
      nativeName: "Galego",
    },
    ka: {
      name: "Georgian",
      nativeName: "ქართული",
    },

    el: {
      name: "Greek, Modern",
      nativeName: "Ελληνικά",
    },
    gn: {
      name: "Guaraní",
      nativeName: "Avañeẽ",
    },
    gu: {
      name: "Gujarati",
      nativeName: "ગુજરાતી",
    },
    ht: {
      name: "Haitian; Haitian Creole",
      nativeName: "Kreyòl ayisyen",
    },
    ha: {
      name: "Hausa",
      nativeName: "Hausa, هَوُسَ",
    },

    hz: {
      name: "Herero",
      nativeName: "Otjiherero",
    },
    hi: {
      name: "Hindi",
      nativeName: "हिन्दी, हिंदी",
    },
    ho: {
      name: "Hiri Motu",
      nativeName: "Hiri Motu",
    },
    hu: {
      name: "Hungarian",
      nativeName: "Magyar",
    },
    id: {
      name: "Indonesian",
      nativeName: "Bahasa Indonesia",
    },
    ga: {
      name: "Irish",
      nativeName: "Gaeilge",
    },
    ig: {
      name: "Igbo",
      nativeName: "Asụsụ Igbo",
    },
    ik: {
      name: "Inupiaq",
      nativeName: "Iñupiaq, Iñupiatun",
    },
    io: {
      name: "Ido",
      nativeName: "Ido",
    },
    is: {
      name: "Icelandic",
      nativeName: "Íslenska",
    },

    iu: {
      name: "Inuktitut",
      nativeName: "ᐃᓄᒃᑎᑐᑦ",
    },
    ja: {
      name: "Japanese",
      nativeName: "日本語",
    },
    jv: {
      name: "Javanese",
      nativeName: "Basa Jawa",
    },
    kl: {
      name: "Kalaallisut, Greenlandic",
      nativeName: "Kalaallisut",
    },
    kn: {
      name: "Kannada",
      nativeName: "ಕನ್ನಡ",
    },
    kr: {
      name: "Kanuri",
      nativeName: "Kanuri",
    },
    ks: {
      name: "Kashmiri",
      nativeName: "कश्मीरी, كشميري‎",
    },
    kk: {
      name: "Kazakh",
      nativeName: "Қазақ тілі",
    },
    km: {
      name: "Khmer",
      nativeName: "ភាសាខ្មែរ",
    },
    ki: {
      name: "Kikuyu, Gikuyu",
      nativeName: "Gĩkũyũ",
    },
    rw: {
      name: "Kinyarwanda",
      nativeName: "Ikinyarwanda",
    },
    ky: {
      name: "Kirghiz, Kyrgyz",
      nativeName: "кыргыз тили",
    },
    kv: {
      name: "Komi",
      nativeName: "коми кыв",
    },
    kg: {
      name: "Kongo",
      nativeName: "KiKongo",
    },
    ko: {
      name: "Korean",
      nativeName: "한국어 (韓國語), 조선말 (朝鮮語)",
    },
    ku: {
      name: "Kurdish",
      nativeName: "Kurdî, كوردی‎",
    },
    kj: {
      name: "Kwanyama, Kuanyama",
      nativeName: "Kuanyama",
    },
    lb: {
      name: "Luxembourgish, Letzeburgesch",
      nativeName: "Lëtzebuergesch",
    },
    lg: {
      name: "Luganda",
      nativeName: "Luganda",
    },
    li: {
      name: "Limburgish, Limburgan, Limburger",
      nativeName: "Limburgs",
    },
    ln: {
      name: "Lingala",
      nativeName: "Lingála",
    },
    lo: {
      name: "Lao",
      nativeName: "ພາສາລາວ",
    },
    lt: {
      name: "Lithuanian",
      nativeName: "Lietuvių kalba",
    },
    lu: {
      name: "Luba-Katanga",
      nativeName: "Luba-Katanga",
    },
    lv: {
      name: "Latvian",
      nativeName: "Latviešu valoda",
    },
    gv: {
      name: "Manx",
      nativeName: "Gaelg, Gailck",
    },
    mk: {
      name: "Macedonian",
      nativeName: "македонски јазик",
    },
    mg: {
      name: "Malagasy",
      nativeName: "Malagasy fiteny",
    },
    ms: {
      name: "Malay",
      nativeName: "Bahasa Melayu, بهاس ملايو‎",
    },
    ml: {
      name: "Malayalam",
      nativeName: "മലയാളം",
    },
    mt: {
      name: "Maltese",
      nativeName: "Malti",
    },
    mi: {
      name: "Māori",
      nativeName: "Te reo Māori",
    },
    mr: {
      name: "Marathi (Marāṭhī)",
      nativeName: "मराठी",
    },
    mh: {
      name: "Marshallese",
      nativeName: "Kajin M̧ajeļ",
    },
    mn: {
      name: "Mongolian",
      nativeName: "монгол",
    },
    na: {
      name: "Nauru",
      nativeName: "Ekakairũ Naoero",
    },
    nv: {
      name: "Navajo, Navaho",
      nativeName: "Diné bizaad, Dinékʼehǰí",
    },
    nb: {
      name: "Norwegian Bokmål",
      nativeName: "Norsk bokmål",
    },
    nd: {
      name: "North Ndebele",
      nativeName: "IsiNdebele",
    },
    ne: {
      name: "Nepali",
      nativeName: "नेपाली",
    },
    ng: {
      name: "Ndonga",
      nativeName: "Owambo",
    },
    nn: {
      name: "Norwegian Nynorsk",
      nativeName: "Norsk nynorsk",
    },
    no: {
      name: "Norwegian",
      nativeName: "Norsk",
    },
    ii: {
      name: "Nuosu",
      nativeName: "ꆈꌠ꒿ Nuosuhxop",
    },
    nr: {
      name: "South Ndebele",
      nativeName: "IsiNdebele",
    },
    oc: {
      name: "Occitan",
      nativeName: "Occitan",
    },
    oj: {
      name: "Ojibwe, Ojibwa",
      nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
    },
    cu: {
      name: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
      nativeName: "ѩзыкъ словѣньскъ",
    },
    om: {
      name: "Oromo",
      nativeName: "Afaan Oromoo",
    },
    or: {
      name: "Oriya",
      nativeName: "ଓଡ଼ିଆ",
    },
    os: {
      name: "Ossetian, Ossetic",
      nativeName: "ирон æвзаг",
    },
    pa: {
      name: "Panjabi, Punjabi",
      nativeName: "ਪੰਜਾਬੀ, پنجابی‎",
    },
    pi: {
      name: "Pāli",
      nativeName: "पाऴि",
    },
    fa: {
      name: "Persian",
      nativeName: "فارسی",
    },
    pl: {
      name: "Polish",
      nativeName: "Polski",
    },
    ps: {
      name: "Pashto, Pushto",
      nativeName: "پښتو",
    },

    qu: {
      name: "Quechua",
      nativeName: "Runa Simi, Kichwa",
    },
    rm: {
      name: "Romansh",
      nativeName: "Rumantsch grischun",
    },
    rn: {
      name: "Kirundi",
      nativeName: "KiRundi",
    },
    ro: {
      name: "Romanian, Moldavian, Moldovan",
      nativeName: "Română",
    },
    ru: {
      name: "Russian",
      nativeName: "Русский язык",
    },
    sa: {
      name: "Sanskrit (Saṁskṛta)",
      nativeName: "संस्कृतम्",
    },
    sc: {
      name: "Sardinian",
      nativeName: "Sardu",
    },
    sd: {
      name: "Sindhi",
      nativeName: "सिन्धी, سنڌي، سندھی‎",
    },
    se: {
      name: "Northern Sami",
      nativeName: "Davvisámegiella",
    },
    sm: {
      name: "Samoan",
      nativeName: "Gagana faa Samoa",
    },
    sg: {
      name: "Sango",
      nativeName: "Yângâ tî sängö",
    },
    sr: {
      name: "Serbian",
      nativeName: "српски језик",
    },
    gd: {
      name: "Scottish Gaelic; Gaelic",
      nativeName: "Gàidhlig",
    },
    sn: {
      name: "Shona",
      nativeName: "ChiShona",
    },
    si: {
      name: "Sinhala, Sinhalese",
      nativeName: "සිංහල",
    },
    sk: {
      name: "Slovak",
      nativeName: "Slovenčina",
    },
    sl: {
      name: "Slovene",
      nativeName: "Slovenščina",
    },
    so: {
      name: "Somali",
      nativeName: "Soomaaliga, af Soomaali",
    },
    st: {
      name: "Southern Sotho",
      nativeName: "Sesotho",
    },

    su: {
      name: "Sundanese",
      nativeName: "Basa Sunda",
    },
    sw: {
      name: "Swahili",
      nativeName: "Kiswahili",
    },
    ss: {
      name: "Swati",
      nativeName: "SiSwati",
    },
    sv: {
      name: "Swedish",
      nativeName: "Svenska",
    },
    ta: {
      name: "Tamil",
      nativeName: "தமிழ்",
    },
    te: {
      name: "Telugu",
      nativeName: "తెలుగు",
    },
    tg: {
      name: "Tajik",
      nativeName: "тоҷикӣ, toğikī, تاجیکی‎",
    },
    th: {
      name: "Thai",
      nativeName: "ไทย",
    },
    ti: {
      name: "Tigrinya",
      nativeName: "ትግርኛ",
    },
    bo: {
      name: "Tibetan Standard, Tibetan, Central",
      nativeName: "བོད་ཡིག",
    },
    tk: {
      name: "Turkmen",
      nativeName: "Türkmen, Түркмен",
    },
    tl: {
      name: "Tagalog",
      nativeName: "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔",
    },
    tn: {
      name: "Tswana",
      nativeName: "Setswana",
    },
    to: {
      name: "Tonga (Tonga Islands)",
      nativeName: "Faka Tonga",
    },
    tr: {
      name: "Turkish",
      nativeName: "Türkçe",
    },
    ts: {
      name: "Tsonga",
      nativeName: "Xitsonga",
    },
    tt: {
      name: "Tatar",
      nativeName: "татарча, tatarça, تاتارچا‎",
    },
    tw: {
      name: "Twi",
      nativeName: "Twi",
    },
    ty: {
      name: "Tahitian",
      nativeName: "Reo Tahiti",
    },
    ug: {
      name: "Uighur, Uyghur",
      nativeName: "Uyƣurqə, ئۇيغۇرچە‎",
    },
    uk: {
      name: "Ukrainian",
      nativeName: "українська",
    },
    ur: {
      name: "Urdu",
      nativeName: "اردو",
    },
    uz: {
      name: "Uzbek",
      nativeName: "Zbek, Ўзбек, أۇزبېك‎",
    },
    ve: {
      name: "Venda",
      nativeName: "Tshivenḓa",
    },
    vi: {
      name: "Vietnamese",
      nativeName: "Tiếng Việt",
    },
    vo: {
      name: "Volapük",
      nativeName: "Volapük",
    },
    wa: {
      name: "Walloon",
      nativeName: "Walon",
    },
    cy: {
      name: "Welsh",
      nativeName: "Cymraeg",
    },
    wo: {
      name: "Wolof",
      nativeName: "Wollof",
    },
    fy: {
      name: "Western Frisian",
      nativeName: "Frysk",
    },
    xh: {
      name: "Xhosa",
      nativeName: "IsiXhosa",
    },
    yi: {
      name: "Yiddish",
      nativeName: "ייִדיש",
    },
    yo: {
      name: "Yoruba",
      nativeName: "Yorùbá",
    },
    za: {
      name: "Zhuang, Chuang",
      nativeName: "Saɯ cueŋƅ, Saw cuengh",
    },
  },

  isLoadingGetLevels: false,
  getLevelsData: [],
  getLevelsError: "",
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case globalTypes.SET_GLOBAL_STATE:
      return {
        ...state,
        initHeight: action.payload.height,
        constants: action.payload.constants,
      };

    // Get constants

    case globalTypes.GET_CONSTANTS_REQUEST:
      return {
        ...state,
        isLoadingConstants: true,
      };

    case globalTypes.GET_CONSTANTS_SUCCESS:
      return {
        ...state,
        isLoadingConstants: false,
        constants: action.payload,
        isOffline: false,
      };

    case globalTypes.GET_CONSTANTS_FAIL:
      return {
        ...state,
        isLoadingConstants: false,
        constants: action.payload,
        isOffline: true,
      };

    // OLD - Set alert module

    case globalTypes.SET_ALERT:
      return {
        ...state,
        feedback: action.payload,
        variant: action.payload.variant,
      };

    case globalTypes.CLEAR_ALERT:
      return { ...state, feedback: {} };

    // Get all countries info

    case globalTypes.GET_COUNTRIES_REQUEST:
      return {
        ...state,
        isLoadingCountries: true,
      };

    case globalTypes.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoadingCountries: false,
        countries: action.payload,
      };

    // Conditionally display the Navigation Bar
    case globalTypes.DISPLAY_NAV_BAR:
      return {
        ...state,
        isNavBar: action.payload,
      };

    // Get all the levels

    case globalTypes.GET_LEVELS_REQUEST:
      return {
        ...state,
        isLoadingGetLevels: true,
      };

    case globalTypes.GET_LEVELS_SUCCESS:
      return {
        ...state,
        isLoadingGetLevels: false,
        getLevelsData: action.payload,
        getLevelsError: "",
      };

    case globalTypes.GET_LEVELS_FAIL:
      return {
        ...state,
        isLoadingGetLevels: false,
        getLevelsData: [],
        getLevelsError: action.payload,
      };

    default:
      return state;
  }
}

export default globalReducer;
