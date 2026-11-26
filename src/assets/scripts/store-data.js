window.GB_STORE_DATA = {
  currency: "SAR",
  categories: [
    {
      slug: "basketball",
      name: { ar: "أحذية كرة سلة", en: "Basketball Shoes" },
      image: "assets/images/products/orange-product.png",
      accent: "#FF6B1A"
    },
    {
      slug: "running",
      name: { ar: "أحذية جري", en: "Running Shoes" },
      image: "assets/images/products/emerald-running.png",
      accent: "#10B981"
    },
    {
      slug: "training",
      name: { ar: "أحذية تدريب", en: "Training Shoes" },
      image: "assets/images/products/cobalt-training.png",
      accent: "#3B82F6"
    },
    {
      slug: "casual",
      name: { ar: "أحذية كاجوال", en: "Casual Sneakers" },
      image: "assets/images/products/white-product.png",
      accent: "#E2E8F0"
    },
    {
      slug: "offers",
      name: { ar: "عروض وتخفيضات", en: "Offers & Deals" },
      image: "assets/images/products/crimson-court.png",
      accent: "#EF4444"
    }
  ],
  heroVariants: {
    orange: {
      key: "orange",
      label: { ar: "برتقالي ناري", en: "Blaze Orange" },
      swatch: "#FF6B1A",
      image: "assets/images/products/orange-product.png"
    },
    black: {
      key: "black",
      label: { ar: "أسود مطفي", en: "Stealth Black" },
      swatch: "#222328",
      image: "assets/images/products/black-product.png"
    },
    white: {
      key: "white",
      label: { ar: "أبيض لؤلؤي", en: "Pearl White" },
      swatch: "#F1F5F9",
      image: "assets/images/products/white-product.png"
    },
    pink: {
      key: "pink",
      label: { ar: "وردي نيون", en: "Neon Rose" },
      swatch: "#EC4899",
      image: "assets/images/products/pink-product.png"
    }
  },
  products: [
    {
      id: "ua-basketball-pro",
      slug: "ua-basketball-pro",
      name: { ar: "حذاء كرة سلة أندر آرمر الاحترافي", en: "Under Armour Basketball Shoe" },
      category: "basketball",
      price: 49.95,
      oldPrice: 55.50,
      discount: 10,
      rating: 4.9,
      reviews: 184,
      featured: true,
      bestseller: true,
      isNew: false,
      image: "assets/images/products/orange-product.png",
      colors: ["orange", "black", "white", "pink"],
      gallery: [
        "assets/images/products/orange-product.png",
        "assets/images/products/black-product.png",
        "assets/images/products/white-product.png",
        "assets/images/products/pink-product.png"
      ],
      sizes: [40, 41, 42, 43, 44, 45],
      description: {
        ar: "خامة شبكية قابلة للتنفس مع طبقات جلدية لدعم ومتانة إضافية، نعل أوسط خفيف ومستجيب، ونعل خارجي مطاطي متين بنقشة متعرجة لحركة وتحكم مثالي داخل الملعب.",
        en: "Breathable engineered mesh upper with supportive leather overlays, responsive lightweight EVA midsole, and durable herringbone-traction rubber outsole built for total court control."
      },
      longDescription: {
        ar: [
          "صُمم حذاء كرة السلة أندر آرمر الاحترافي ليمنحك أفضلية حقيقية في كل هجمة ودفاع. يجمع الجزء العلوي بين النسيج الشبكي الهندسي فائق التهوية وطبقات الجلد المدعّمة حول الكاحل ومقدمة القدم لتوفير ثبات استثنائي دون زيادة في الوزن.",
          "يعتمد النعل الأوسط على رغوة عالية الاستجابة تمتص الصدمات القوية عند الهبوط وتعيد تحويل الطاقة إلى انطلاقة سريعة، بينما يوفر النعل الخارجي المطاطي بنقشة متعرجة متعددة الاتجاهات تماسكاً فورياً على مختلف أرضيات الملاعب."
        ],
        en: [
          "Engineered for explosive court play, the Under Armour Basketball Shoe combines an airy engineered mesh upper with structured leather overlays around the midfoot and collar for locked-in stability without bulk.",
          "A responsive lightweight midsole cushions hard landings and snaps back into every sprint, while the multi-directional herringbone rubber outsole delivers instant stop-and-go traction on indoor and outdoor courts."
        ]
      },
      specs: {
        ar: ["نعل أوسط عالي الاستجابة", "نقشة متعرجة مانعة للانزلاق", "تهوية 360 درجة", "وزن خفيف 320 جم"],
        en: ["High-rebound EVA midsole", "Herringbone traction outsole", "360° breathable mesh", "Lightweight 320g build"]
      }
    },
    {
      id: "gb-apex-crimson",
      slug: "gb-apex-crimson",
      name: { ar: "حذاء كرة سلة كريمسون برو", en: "Crimson Court Pro High" },
      category: "basketball",
      price: 64.00,
      oldPrice: 80.00,
      discount: 20,
      rating: 4.8,
      reviews: 96,
      featured: true,
      bestseller: true,
      isNew: true,
      image: "assets/images/products/crimson-court.png",
      colors: ["red", "black"],
      gallery: ["assets/images/products/crimson-court.png", "assets/images/products/black-product.png"],
      sizes: [41, 42, 43, 44, 45],
      description: {
        ar: "تصميم احترافي عالي الرقبة لحماية الكاحل أثناء القفز السريع والالتفافات الحادة.",
        en: "High-collar pro silhouette engineered for ankle lockdown during explosive cuts and landings."
      },
      specs: {
        ar: ["دعامة كاحل مبطنة", "كبسولة امتصاص صدمات", "نعل مطاطي مقاوم للتآكل"],
        en: ["Padded ankle lockdown", "Dual-density shock pod", "High-abrasion rubber"]
      }
    },
    {
      id: "gb-emerald-stride",
      slug: "gb-emerald-stride",
      name: { ar: "حذاء جري إميرالد كاربون", en: "Emerald Carbon Stride" },
      category: "running",
      price: 58.50,
      oldPrice: null,
      discount: 0,
      rating: 4.9,
      reviews: 142,
      featured: true,
      bestseller: true,
      isNew: true,
      image: "assets/images/products/emerald-running.png",
      colors: ["green", "black"],
      gallery: ["assets/images/products/emerald-running.png", "assets/images/products/black-product.png"],
      sizes: [39, 40, 41, 42, 43, 44],
      description: {
        ar: "حذاء جري فائق الخفة مزود بنعل مرن يدفع خطواتك للأمام في المسافات الطويلة والماراثون.",
        en: "Ultra-lightweight distance runner with responsive energy-return foam for marathon pace."
      },
      specs: {
        ar: ["نعل مرن مرتد للطاقة", "نسيج شبكي فائق التهوية", "وزن 245 جم فقط"],
        en: ["Energy-return foam", "Aero-knit breathable upper", "Featherweight 245g"]
      }
    },
    {
      id: "gb-cobalt-trainer",
      slug: "gb-cobalt-trainer",
      name: { ar: "حذاء تدريب كوبالت فورس", en: "Cobalt Force X Trainer" },
      category: "training",
      price: 52.00,
      oldPrice: 65.00,
      discount: 20,
      rating: 4.7,
      reviews: 78,
      featured: true,
      bestseller: false,
      isNew: true,
      image: "assets/images/products/cobalt-training.png",
      colors: ["blue", "black"],
      gallery: ["assets/images/products/cobalt-training.png", "assets/images/products/black-product.png"],
      sizes: [40, 41, 42, 43, 44, 45],
      description: {
        ar: "قاعدة عريضة وثابتة مثالية لتمارين القوة، الأوزان، والتدريب المتقاطع عالي الكثافة.",
        en: "Wide flat heel stability built for strength lifting, agility drills, and HIIT sessions."
      },
      specs: {
        ar: ["كعب مسطح للثبات", "أربطة محكمة جانبية", "نعل مرن من المقدمة"],
        en: ["Flat stability heel", "Lateral lockdown cage", "Flexible forefoot grooves"]
      }
    },
    {
      id: "gb-pearl-street",
      slug: "gb-pearl-street",
      name: { ar: "سنيكرز كاجوال بيرل لوكس", en: "Pearl Luxe Street Sneaker" },
      category: "casual",
      price: 54.00,
      oldPrice: null,
      discount: 0,
      rating: 4.8,
      reviews: 115,
      featured: false,
      bestseller: true,
      isNew: false,
      image: "assets/images/products/white-product.png",
      colors: ["white", "black"],
      gallery: ["assets/images/products/white-product.png", "assets/images/products/black-product.png"],
      sizes: [38, 39, 40, 41, 42, 43, 44],
      description: {
        ar: "تصميم أبيض لؤلؤي أنيق يجمع بين الراحة اليومية والمظهر العصري الفاخر.",
        en: "Crisp pearl-white lifestyle sneaker blending all-day cushioning with elevated street style."
      },
      specs: {
        ar: ["جلد صناعي فاخر", "بطانة داخلية ناعمة", "مناسب للاستخدام اليومي"],
        en: ["Premium synthetic leather", "Memory-foam footbed", "All-day street comfort"]
      }
    },
    {
      id: "gb-gold-elite",
      slug: "gb-gold-elite",
      name: { ar: "حذاء كرة سلة الإصدار الذهبي", en: "Gold Edition Court Elite" },
      category: "basketball",
      price: 69.95,
      oldPrice: 82.00,
      discount: 15,
      rating: 5.0,
      reviews: 64,
      featured: false,
      bestseller: true,
      isNew: true,
      image: "assets/images/products/gold-elite.png",
      colors: ["gold", "orange"],
      gallery: ["assets/images/products/gold-elite.png", "assets/images/products/orange-product.png"],
      sizes: [41, 42, 43, 44, 45],
      description: {
        ar: "إصدار ذهبي محدود بلمسات معدنية فاخرة وتوسيد مزدوج للتحكم المطلق في الملعب.",
        en: "Limited gold edition featuring metallic accents and dual-zone court cushioning."
      },
      specs: {
        ar: ["إصدار محدود", "توسيد مزدوج الطبقات", "نعل خارجي عالي الثبات"],
        en: ["Limited edition finish", "Dual-zone cushioning", "Pro court grip"]
      }
    },
    {
      id: "gb-stealth-shadow",
      slug: "gb-stealth-shadow",
      name: { ar: "حذاء تدريب ستيلث شادو", en: "Stealth Shadow Pro" },
      category: "training",
      price: 47.50,
      oldPrice: null,
      discount: 0,
      rating: 4.7,
      reviews: 89,
      featured: false,
      bestseller: false,
      isNew: false,
      image: "assets/images/products/black-product.png",
      colors: ["black", "white"],
      gallery: ["assets/images/products/black-product.png", "assets/images/products/white-product.png"],
      sizes: [40, 41, 42, 43, 44],
      description: {
        ar: "أسود بالكامل بتصميم انسيابي متين يتحمل أقسى التمارين اليومية.",
        en: "All-black stealth trainer built to endure intense daily gym and turf workouts."
      },
      specs: {
        ar: ["مقاوم للاحتكاك", "دعم قوس القدم", "خامة سهلة التنظيف"],
        en: ["Abrasion-resistant toe", "Arch support bridge", "Easy-clean upper"]
      }
    },
    {
      id: "gb-neon-pulse",
      slug: "gb-neon-pulse",
      name: { ar: "حذاء جري نيون روز", en: "Neon Rose Pulse Runner" },
      category: "running",
      price: 44.95,
      oldPrice: 59.95,
      discount: 25,
      rating: 4.8,
      reviews: 109,
      featured: false,
      bestseller: false,
      isNew: true,
      image: "assets/images/products/pink-product.png",
      colors: ["pink", "white"],
      gallery: ["assets/images/products/pink-product.png", "assets/images/products/white-product.png"],
      sizes: [38, 39, 40, 41, 42, 43],
      description: {
        ar: "لون وردي جريء مع نعل فائق المرونة يمنحك انطلاقة سلسة في كل جولة جري.",
        en: "Bold neon rose runner with ultra-plush heel-to-toe transition for effortless daily miles."
      },
      specs: {
        ar: ["امتصاص صدمات الكعب", "أربطة مرنة سريعة", "نعل خفيف الوزن"],
        en: ["Plush heel crash pad", "Dynamic lockdown laces", "Featherlight sole"]
      }
    },
    {
      id: "gb-blaze-runner",
      slug: "gb-blaze-runner",
      name: { ar: "حذاء جري بليز فيلوسيتي", en: "Blaze Velocity Runner" },
      category: "running",
      price: 56.00,
      oldPrice: null,
      discount: 0,
      rating: 4.6,
      reviews: 53,
      featured: false,
      bestseller: false,
      isNew: false,
      image: "assets/images/products/orange-product.png",
      colors: ["orange", "emerald"],
      gallery: ["assets/images/products/orange-product.png", "assets/images/products/emerald-running.png"],
      sizes: [40, 41, 42, 43, 44],
      description: {
        ar: "مصمم للسرعة والاستجابة الفورية على المضمار والطرق المعبدة.",
        en: "Tuned for tempo runs and crisp road responsiveness."
      },
      specs: {
        ar: ["تهوية متقدمة", "نعل ديناميكي", "تصميم هوائي"],
        en: ["Advanced airflow mesh", "Dynamic rocker sole", "Aerodynamic heel"]
      }
    },
    {
      id: "gb-urban-emerald",
      slug: "gb-urban-emerald",
      name: { ar: "سنيكرز كاجوال إميرالد ستريت", en: "Emerald Street Casual" },
      category: "casual",
      price: 49.00,
      oldPrice: null,
      discount: 0,
      rating: 4.7,
      reviews: 71,
      featured: false,
      bestseller: false,
      isNew: true,
      image: "assets/images/products/emerald-running.png",
      colors: ["green", "white"],
      gallery: ["assets/images/products/emerald-running.png", "assets/images/products/white-product.png"],
      sizes: [39, 40, 41, 42, 43, 44],
      description: {
        ar: "لمسة زمردية مميزة تمنح إطلالتك اليومية طابعاً رياضياً فاخراً.",
        en: "Signature emerald colorway bringing athletic luxury to your everyday rotation."
      },
      specs: {
        ar: ["بطانة مريحة طوال اليوم", "خامات متينة", "تصميم عصري"],
        en: ["All-day comfort insole", "Durable overlays", "Modern silhouette"]
      }
    }
  ],
  testimonials: [
    {
      name: { ar: "فهد العتيبي", en: "Fahad Al-Otaibi" },
      role: { ar: "لاعب كرة سلة", en: "Basketball Player" },
      rating: 5,
      quote: {
        ar: "ثبات الحذاء على أرضية الملعب مذهل وخفة وزنه فرقت معي في المباريات الطويلة. التغليف والتوصيل من GreenBird فخم جداً.",
        en: "Incredible court grip and lightweight feel during full games. GreenBird delivery and packaging felt truly premium."
      },
      avatar: "assets/images/products/orange-product.png"
    },
    {
      name: { ar: "سارة المنصور", en: "Sara Al-Mansour" },
      role: { ar: "عداءة ماراثون", en: "Marathon Runner" },
      rating: 5,
      quote: {
        ar: "تجربة تسوق سلسة وسريعة، والمقاس وصل مطابق تماماً للوصف. خامة الحذاء مريحة جداً في الجري اليومي.",
        en: "Smooth shopping experience and true-to-size fit. The cushioning makes daily 10K runs effortless."
      },
      avatar: "assets/images/products/pink-product.png"
    },
    {
      name: { ar: "خالد الدوسري", en: "Khaled Al-Dosari" },
      role: { ar: "مدرب لياقة", en: "Fitness Coach" },
      rating: 5,
      quote: {
        ar: "أكثر ما أعجبني هو ثبات النعل في تمارين الأوزان وتنوع الألوان المتاحة. متجر احترافي بكل معنى الكلمة.",
        en: "Rock-solid heel stability for lifting and awesome colorway options. A genuinely pro athletic store."
      },
      avatar: "assets/images/products/cobalt-training.png"
    }
  ]
};
