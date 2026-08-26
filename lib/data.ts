export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  featured: boolean;
  description: string;
  tech: string[];
  behanceUrl: string;
  image: string;
  ascii: string[];
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
  behanceUrl: string;
  images: {
    url: string;
    caption: string;
    aspect?: "portrait" | "landscape" | "square";
  }[];
}

// 5 Featured Projects for Homepage Elastic Gallery & Featured Sections
export const PROJECTS: Project[] = [
  {
    id: "comcore-launching-ceremony",
    title: "Comcore Launching Ceremony Design",
    category: "3D Stage Architecture & Ceremonial Spatial Design",
    client: "Comcore",
    location: "Jakarta, Indonesia",
    year: "2024",
    featured: true,
    description: "Architectural 3D stage topology, ceremonial entrance gates, immersive LED backdrop volume structures, and spatial lighting pre-visualizations for Comcore's corporate launch.",
    tech: ["Cinema 4D", "Octane Render", "Adobe Illustrator", "Photoshop"],
    behanceUrl: "https://www.behance.net/gallery/238856763/Comcore-Launching-Ceremony-Design",
    image: "/images/projects/comcore-asset-1.png",
    ascii: [
      "  /\\____/\\____/\\____/\\____/\\  ",
      " / /\\  / /\\  / /\\  / /\\  / /\\ ",
      "/ /  \\/ /  \\/ /  \\/ /  \\/ /  \\",
      "\\ \\  /\\ \\  /\\ \\  /\\ \\  /\\ \\  /",
      " \\ \\/  \\ \\/  \\ \\/  \\ \\/  \\ \\/ ",
      "  \\/____\\/____\\/____\\/____\\/  ",
      " [ COMCORE LAUNCH // SPATIAL ]",
    ]
  },
  {
    id: "zte-days-event",
    title: "ZTE DAYS",
    category: "Corporate Conference & Keynote Stage Topology",
    client: "ZTE Corporation",
    location: "Jakarta, Indonesia",
    year: "2024",
    featured: true,
    description: "Futuristic corporate keynote stage design, modular LED ribbon arrays, synchronized VIP breakout rooms, and high-velocity spatial layout engineered for ZTE DAYS summit.",
    tech: ["Cinema 4D", "KeyShot", "Photoshop", "After Effects"],
    behanceUrl: "https://www.behance.net/gallery/238855525/ZTE-DAYS",
    image: "/images/projects/behance-zte-days.jpg",
    ascii: [
      " +---+===+---+===+---+===+ ",
      " | | | | | | | | | | | | | ",
      " =*==*===*===*===*===*===*=",
      " | : : : : : : : : : : : | ",
      " +---+===+---+===+---+===+ ",
      " [ ZTE DAYS // KEYNOTE STAGE]",
    ]
  },
  {
    id: "floating-astronaut",
    title: "Floating Astronaut",
    category: "3D Character Concept & Sci-Fi Environment",
    client: "Personal Project / Art Direction",
    location: "Jakarta, Indonesia",
    year: "2020",
    featured: true,
    description: "Detailed zero-gravity astronaut suit modeling, procedural surface texturing, volumetric cosmic lighting, and cinematic composition exploring isolation and space exploration.",
    tech: ["Cinema 4D", "Octane Render", "ZBrush", "Photoshop"],
    behanceUrl: "https://www.behance.net/gallery/90000381/Floating-Astronaut",
    image: "/images/projects/behance-floating-astronaut.jpg",
    ascii: [
      "      .---.       ",
      "     /     \\      ",
      "    | () () |     ",
      "     \\  =  /      ",
      "  .--'-----'--.   ",
      " [ ASTRONAUT 3D ] ",
    ]
  },
  {
    id: "zoomlion-exhibition-booth",
    title: "Zoomlion Exhibition Design Booth",
    category: "Heavy Industrial Exhibition & 3D Spatial Pavilion",
    client: "Zoomlion Heavy Industry",
    location: "Jakarta International Expo",
    year: "2024",
    featured: true,
    description: "Monumental multi-zone commercial trade booth with heavy machinery display platforms, interactive product demonstration bars, and integrated VIP hospitality lounge.",
    tech: ["Cinema 4D", "Octane Render", "Illustrator", "Photoshop"],
    behanceUrl: "https://www.behance.net/gallery/238856381/Zoomlion-Exhibition-Design-Booth",
    image: "/images/projects/behance-zoomlion.jpg",
    ascii: [
      "  .________________________.  ",
      " / \\                      / \\ ",
      "|   |   ZOOMLION BOOTH   |   |",
      " \\ /                      \\ / ",
      "  '------------------------'  ",
      "  [ SPATIAL / EXPO MATRIX ]   ",
    ]
  },
  {
    id: "stage-event-design",
    title: "Stage Event Design",
    category: "Dynamic Concert & Large-Scale Arena Stage",
    client: "Commercial Production",
    location: "Jakarta, Indonesia",
    year: "2024",
    featured: true,
    description: "Arena-scale concert stage design with multi-tiered kinetic truss rigging, curved ultra-wide LED wings, and synchronized spatial lighting pre-visualizations.",
    tech: ["Cinema 4D", "Resolume Arena", "Octane Render", "After Effects"],
    behanceUrl: "https://www.behance.net/gallery/238856173/Stage-Event-Design",
    image: "/images/projects/stage-event-asset-2.png",
    ascii: [
      " <///==================///> ",
      "  | ARENA STAGE TOPOLOGY | ",
      "  |  \\\\\\\\ ///// \\\\\\\\    | ",
      "  |   \\\\\\ ///   \\\\\\     | ",
      " <///==================///> ",
    ]
  }
];

// ALL 13 Authentic Behance Projects on behance.net/ananimr13
export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "comcore",
    title: "Comcore Launching Ceremony Design",
    category: "3D Stage & Ceremonial Space",
    client: "Comcore",
    year: "2024",
    description: "Ceremonial stage topology, immersive registration tunnels, and panoramic LED spatial environments for Comcore corporate launch.",
    coverImage: "/images/projects/comcore-asset-1.png",
    behanceUrl: "https://www.behance.net/gallery/238856763/Comcore-Launching-Ceremony-Design",
    images: [
      { url: "/images/projects/comcore-asset-1.png", caption: "Ceremonial Entrance Portal & Main Tunnel Architecture", aspect: "landscape" },
      { url: "/images/projects/comcore-asset-4.png", caption: "VIP Interactive Product Showcase Area", aspect: "landscape" },
      { url: "/images/projects/comcore-asset-5.png", caption: "Spatial Floor Plan & Pre-Visualization", aspect: "landscape" },
      { url: "/images/projects/comcore-asset-2.png", caption: "Branded Photo Booth & Registration Counter", aspect: "landscape" },
      { url: "/images/projects/comcore-asset-6.png", caption: "Ceremonial Stage Perspective Elevation", aspect: "landscape" },
      { url: "/images/projects/behance-comcore.jpg", caption: "Main Launch Stage & Curved LED Array", aspect: "landscape" },
    ]
  },
  {
    id: "zte-days",
    title: "ZTE DAYS Summit",
    category: "Corporate Keynote Stage",
    client: "ZTE Corporation",
    year: "2024",
    description: "Futuristic corporate keynote arena design with multi-layered LED ribbon arrays, synchronized lighting fixtures, and VIP breakout lounges.",
    coverImage: "/images/projects/behance-zte-days.jpg",
    behanceUrl: "https://www.behance.net/gallery/238855525/ZTE-DAYS",
    images: [
      { url: "/images/projects/behance-zte-days.jpg", caption: "Keynote Main Stage Perspective Render", aspect: "landscape" },
      { url: "/images/projects/zte-days-asset-1.png", caption: "Curved LED Ribbon & Speaker Podium", aspect: "landscape" },
      { url: "/images/projects/zte-days-asset-2.png", caption: "Executive Breakout Room & Technology Zone", aspect: "landscape" },
      { url: "/images/projects/zte-days-asset-3.png", caption: "Lobby Activation & Partner Media Wall", aspect: "landscape" },
      { url: "/images/projects/zte-days-asset-5.png", caption: "Side Wing Audio-Visual Array Simulation", aspect: "landscape" },
      { url: "/images/projects/zte-days-asset-6.png", caption: "Lighting Cue & Beam Synchronization", aspect: "landscape" },
    ]
  },
  {
    id: "xiaomi-stage",
    title: "Xiaomi Event Stage Design Concept",
    category: "Consumer Tech Stage & Spatial Launch",
    client: "Xiaomi",
    year: "2024",
    description: "High-tech consumer product stage design featuring dynamic holographic projection zones, modular illuminated arches, and synchronized spatial acoustics.",
    coverImage: "/images/projects/xiaomi-stage-asset-1.png",
    behanceUrl: "https://www.behance.net/gallery/238858329/Xiaomi-Event-Stage-Design-Concept",
    images: [
      { url: "/images/projects/xiaomi-stage-asset-1.png", caption: "Xiaomi Launch Main Stage Perspective", aspect: "landscape" },
      { url: "/images/projects/xiaomi-stage-asset-3.png", caption: "Dynamic Product Spotlight & Truss Layout", aspect: "landscape" },
      { url: "/images/projects/xiaomi-stage-asset-4.png", caption: "Audience Perspective & LED Volume Rig", aspect: "landscape" },
      { url: "/images/projects/xiaomi-stage-asset-5.png", caption: "Stage Rigging Elevation & Lighting Beams", aspect: "landscape" },
      { url: "/images/projects/xiaomi-stage-asset-6.png", caption: "Side Entrance & Media Zone Architecture", aspect: "landscape" },
    ]
  },
  {
    id: "zoomlion",
    title: "Zoomlion Exhibition Design Booth",
    category: "Industrial Trade Pavilion",
    client: "Zoomlion Heavy Industry",
    year: "2024",
    description: "Monumental multi-zone commercial trade booth with heavy machinery display platforms, interactive demonstration bars, and VIP hospitality lounge.",
    coverImage: "/images/projects/behance-zoomlion.jpg",
    behanceUrl: "https://www.behance.net/gallery/238856381/Zoomlion-Exhibition-Design-Booth",
    images: [
      { url: "/images/projects/behance-zoomlion.jpg", caption: "Exhibition Pavilion Front Overview", aspect: "landscape" },
      { url: "/images/projects/zoomlion-asset-1.png", caption: "Heavy Equipment Display Platform", aspect: "landscape" },
      { url: "/images/projects/zoomlion-asset-3.png", caption: "Two-Tier VIP Hospitality Lounge & Bar", aspect: "landscape" },
      { url: "/images/projects/zoomlion-asset-4.png", caption: "Interactive Digital Demonstration Hub", aspect: "landscape" },
      { url: "/images/projects/zoomlion-asset-5.png", caption: "Overhead Truss Structure & Lighting Rig", aspect: "landscape" },
      { url: "/images/projects/zoomlion-asset-6.png", caption: "Side Elevation & Meeting Room Module", aspect: "landscape" },
    ]
  },
  {
    id: "stage-event",
    title: "Stage Event Design",
    category: "Concert & Arena Stage",
    client: "Commercial Production",
    year: "2024",
    description: "Arena-scale concert stage design with multi-tiered kinetic truss rigging, curved ultra-wide LED wings, and synchronized spatial lighting pre-visualizations.",
    coverImage: "/images/projects/stage-event-asset-2.png",
    behanceUrl: "https://www.behance.net/gallery/238856173/Stage-Event-Design",
    images: [
      { url: "/images/projects/stage-event-asset-2.png", caption: "Arena Stage Front Elevation & LED Wings", aspect: "landscape" },
      { url: "/images/projects/stage-event-asset-1.png", caption: "Kinetic Truss Rigging & Lighting Geometry", aspect: "landscape" },
      { url: "/images/projects/stage-event-asset-4.png", caption: "Dynamic Live Concert Laser & Smoke Simulation", aspect: "landscape" },
      { url: "/images/projects/stage-event-asset-5.png", caption: "Stage Floor Construction & Monitor Layout", aspect: "landscape" },
      { url: "/images/projects/stage-event-asset-6.png", caption: "Overhead Arena Spatial Topography", aspect: "landscape" },
      { url: "/images/projects/behance-stage-event.jpg", caption: "Perspective Wide Arena Render Pass", aspect: "landscape" },
    ]
  },
  {
    id: "wilfar-ceremony",
    title: "Wilfar Opening Ceremony Design",
    category: "Opening Ceremony & Spatial Design",
    client: "Wilfar",
    year: "2024",
    description: "Corporate opening ceremony stage architecture, celebratory ribbon cut arena, and customized branding environment for Wilfar.",
    coverImage: "/images/projects/wilfar-ceremony-asset-2.png",
    behanceUrl: "https://www.behance.net/gallery/238857819/Wilfar-Opening-Ceremony-Design",
    images: [
      { url: "/images/projects/wilfar-ceremony-asset-2.png", caption: "Main Opening Ceremony Stage Overview", aspect: "landscape" },
      { url: "/images/projects/wilfar-ceremony-asset-3.png", caption: "Stage Rigging & VIP Backdrop Elements", aspect: "landscape" },
      { url: "/images/projects/wilfar-ceremony-asset-4.png", caption: "Entrance Gate & Signage Architecture", aspect: "landscape" },
      { url: "/images/projects/wilfar-ceremony-asset-5.png", caption: "Spatial Layout & Lighting Setup", aspect: "landscape" },
      { url: "/images/projects/wilfar-ceremony-asset-6.png", caption: "Audience Seating & Stage Sightlines", aspect: "landscape" },
    ]
  },
  {
    id: "xl-axiata",
    title: "XL AXIATA Technology Days",
    category: "Telecom Tech Summit Stage",
    client: "XL Axiata",
    year: "2024",
    description: "High-velocity telecom summit stage topology, illuminated polygon LED structures, and interactive corporate showcase booths for XL Axiata.",
    coverImage: "/images/projects/xl-axiata-asset-1.png",
    behanceUrl: "https://www.behance.net/gallery/238855187/XL-AXIATA-TECHNOLOGY-DAYS",
    images: [
      { url: "/images/projects/xl-axiata-asset-1.png", caption: "XL Axiata Summit Keynote Stage", aspect: "landscape" },
      { url: "/images/projects/xl-axiata-asset-2.png", caption: "Polygon LED Display Array & Podiums", aspect: "landscape" },
      { url: "/images/projects/xl-axiata-asset-4.png", caption: "Telecom Innovation Showcase Booth", aspect: "landscape" },
      { url: "/images/projects/xl-axiata-asset-5.png", caption: "Lobby Pre-Function Interactive Area", aspect: "landscape" },
      { url: "/images/projects/xl-axiata-asset-6.png", caption: "Overhead Arena Spatial Topography", aspect: "landscape" },
    ]
  },
  {
    id: "foodcourt-festival",
    title: "Foodcourt Festival Spark Design Concept",
    category: "Experiential Festival & Spatial Design",
    client: "Festival Spark",
    year: "2024",
    description: "Vibrant modular food festival architecture, neon-accented dining zones, interactive performance stages, and atmospheric festival lighting.",
    coverImage: "/images/projects/foodcourt-festival-asset-1.png",
    behanceUrl: "https://www.behance.net/gallery/238858003/Foodcourt-Festival-Spark-Design-Concept",
    images: [
      { url: "/images/projects/foodcourt-festival-asset-1.png", caption: "Festival Central Plaza & Stage Layout", aspect: "landscape" },
      { url: "/images/projects/foodcourt-festival-asset-2.png", caption: "Modular Food Vendor Kiosk Architecture", aspect: "landscape" },
      { url: "/images/projects/foodcourt-festival-asset-3.png", caption: "Illuminated Seating & Dining Courtyard", aspect: "landscape" },
      { url: "/images/projects/foodcourt-festival-asset-4.png", caption: "Night Scene Lighting & Atmosphere Pass", aspect: "landscape" },
      { url: "/images/projects/foodcourt-festival-asset-5.png", caption: "Entrance Archway & Ticket Booth Concept", aspect: "landscape" },
      { url: "/images/projects/foodcourt-festival-asset-6.png", caption: "Aerial Masterplan & Flow Simulation", aspect: "landscape" },
    ]
  },
  {
    id: "marketing-gallery",
    title: "Marketing Gallery Nusaraya Study",
    category: "Architectural Interior & Spatial Pre-Viz",
    client: "PT Nusaraya",
    year: "2024",
    description: "Architectural interior modeling and lighting simulation for modern real estate sales gallery, interactive model display tables, and VIP meeting suites.",
    coverImage: "/images/projects/marketing-gallery-asset-1.png",
    behanceUrl: "https://www.behance.net/gallery/238858609/Marketing-Gallery-of-Nusaraya-Study",
    images: [
      { url: "/images/projects/marketing-gallery-asset-1.png", caption: "Gallery Reception & Scale Model Zone", aspect: "landscape" },
      { url: "/images/projects/marketing-gallery-asset-2.png", caption: "Executive Presentation Suite & Lounge", aspect: "landscape" },
      { url: "/images/projects/marketing-gallery-asset-3.png", caption: "Architectural Lighting & Material Detail", aspect: "landscape" },
      { url: "/images/projects/marketing-gallery-asset-4.png", caption: "VIP Consultation Pods & Display Units", aspect: "landscape" },
      { url: "/images/projects/marketing-gallery-asset-5.png", caption: "Full Interior Perspective Rendering", aspect: "landscape" },
      { url: "/images/projects/marketing-gallery-asset-6.png", caption: "Floor Plan & Sightline Optimization", aspect: "landscape" },
    ]
  },
  {
    id: "zte-nubia",
    title: "ZTE Nubia Booth Exhibition",
    category: "Smartphone Commercial Booth",
    client: "ZTE / Nubia",
    year: "2024",
    description: "Sleek commercial technology exhibition booth showcasing ZTE and Nubia flagship smartphones, hands-on demonstration pods, and gaming visual zones.",
    coverImage: "/images/projects/zte-nubia-asset-1.png",
    behanceUrl: "https://www.behance.net/gallery/238854945/ZTE-NUBIA-BOOTH-EXHIBITION",
    images: [
      { url: "/images/projects/zte-nubia-asset-1.png", caption: "Nubia Gaming Experience Booth View", aspect: "landscape" },
      { url: "/images/projects/zte-nubia-asset-2.png", caption: "Smartphone Hands-On Counter Module", aspect: "landscape" },
      { url: "/images/projects/zte-nubia-asset-3.png", caption: "Overhead Branded Canopy & Lighting", aspect: "landscape" },
      { url: "/images/projects/zte-nubia-asset-4.png", caption: "Side Angle Presentation Area", aspect: "landscape" },
      { url: "/images/projects/zte-nubia-asset-6.png", caption: "VIP Lounge & Media Interview Nook", aspect: "landscape" },
    ]
  },
  {
    id: "floating-astronaut",
    title: "Floating Astronaut",
    category: "3D Character & Environment",
    client: "Personal / Art Direction",
    year: "2020",
    description: "Detailed zero-gravity astronaut suit modeling, procedural surface texturing, volumetric cosmic lighting, and cinematic composition.",
    coverImage: "/images/projects/behance-floating-astronaut.jpg",
    behanceUrl: "https://www.behance.net/gallery/90000381/Floating-Astronaut",
    images: [
      { url: "/images/projects/behance-floating-astronaut.jpg", caption: "Zero Gravity Composition Full Study", aspect: "portrait" },
      { url: "/images/projects/floating-astronaut-asset-1.jpg", caption: "Helmet Visor Reflection & Suit Seam Detail", aspect: "portrait" },
      { url: "/images/projects/floating-astronaut-asset-2.jpg", caption: "Volumetric Cosmic Lighting Pass", aspect: "portrait" },
    ]
  },
  {
    id: "zephyr-cube",
    title: "Zephyr Cube 3D Motion",
    category: "Generative 3D Abstract Motion",
    client: "Personal Concept",
    year: "2021",
    description: "Procedural kinetic cube simulations, chrome and glass refraction dynamics, and generative motion graphic study.",
    coverImage: "/images/projects/zephyr-cube-asset-1.jpg",
    behanceUrl: "https://www.behance.net/gallery/123471249/Zephyr-Cube",
    images: [
      { url: "/images/projects/zephyr-cube-asset-1.jpg", caption: "Kinetic Chrome Cube Topology Study", aspect: "square" },
      { url: "/images/projects/zephyr-cube-asset-2.jpg", caption: "Glass Refraction & Caustics Simulation", aspect: "square" },
      { url: "/images/projects/zephyr-cube-asset-3.jpg", caption: "Motion Trajectory & Spatial Matrix", aspect: "square" },
    ]
  },
  {
    id: "3d-portfolio-archive",
    title: "3D Spatial Portfolio Archive",
    category: "3D Spatial & Render Archive",
    client: "Creative Archive",
    year: "2020",
    description: "Collection of early spatial topologies, stage visual drafts, 3D character concepts, and digital experiments.",
    coverImage: "/images/projects/3d-portfolio-asset-1.jpg",
    behanceUrl: "https://www.behance.net/gallery/92528493/3D-PORTOFOLIO",
    images: [
      { url: "/images/projects/3d-portfolio-asset-1.jpg", caption: "3D Spatial Explorations & Topology Studies", aspect: "landscape" }
    ]
  }
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/zephyrrr13?igsi=MWpkZG5ra29jejhtbA%3D%3D&utm_source=qr",
  linkedin: "https://www.linkedin.com/in/zephyrrr13/",
  threads: "https://www.threads.com/@zephyrrr13?igshid=NTc4MTIwNjQ2YQ==",
  discord: "https://discord.gg/DncG838n",
  wechatId: "zephyrr13",
  behance: "https://www.behance.net/ananimr13"
};

export const PERSONAL_INFO = {
  name: "ZAINAL ABIDIN",
  role: "Senior 3D Artist & Senior Graphic Designer",
  secondaryRole: "Visual Jockey (VJ) / Music Director",
  email: "zainalab1313@gmail.com",
  phone: "+62 812 9132 9873",
  phoneRaw: "081291329873",
  whatsappUrl: "https://wa.me/6281291329873?text=Hi%20Zainal,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.",
  location: "Pulo Gebang, Jakarta Timur, DKI Jakarta, Indonesia",
  behance: "https://www.behance.net/ananimr13",
  instagram: "https://instagram.com/zephyrrr13",
  socials: SOCIAL_LINKS,
  cvDownloadUrl: "/cv/Resume-ZAINAL-ABIDIN.pdf",
  currentCompany: {
    name: "PT Nusaraya",
    fullName: "PT Nusaraya Event",
    website: "https://www.nusarayaevent.com",
    address: "Jl. KH. Hasyim Ashari, RT.3/RW.1, Cideng, Kecamatan Gambir, Jakarta Pusat, DKI Jakarta 10150",
    phone: "021 - 80627092 / 081291329873",
    email: "nusarayamicejkt@gmail.com",
    role: "Senior 3D Artist & Senior Graphic Designer",
    period: "Present",
    image: "/images/office/nusaraya-hq.jpg"
  },
  education: [
    {
      institution: "Universitas Mercu Buana",
      campus: "Kampus Meruya",
      address: "Jl. Meruya Selatan No.1, Kembangan, Jakarta Barat 11650",
      degree: "Desain Komunikasi Visual (DKV)",
      location: "Jakarta Barat",
      detail: "Completed up to Semester 5",
      image: "/images/office/mercubuana-campus.jpg"
    },
    {
      institution: "SMKN 46 Jakarta",
      campus: "Cipinang Pulo",
      address: "Jl. Cipinang Pulo No.19, Jatinegara, Jakarta Timur 13410",
      degree: "Visual Communication Design",
      location: "Jakarta Timur",
      detail: "2016 – 2019"
    }
  ],
  experiences: [
    {
      role: "Senior 3D Artist & Senior Graphic Designer",
      company: "PT Nusaraya (PT Nusaraya Event)",
      url: "https://www.nusarayaevent.com",
      location: "Cideng, Gambir, Jakarta Pusat",
      period: "Present",
      points: [
        "Develop high-quality 3D assets, stage topology environments, and spatial animations for commercial events, MICE, and corporate productions.",
        "Lead graphic design initiatives including core visual concepts, event branding guidelines, and multimedia marketing collateral.",
        "Collaborate closely with event directors and technical stage teams to ensure world-class aesthetic and physical execution."
      ]
    },
    {
      role: "Visual Jockey (VJ) / Music Director",
      company: "Freelance",
      location: "Jakarta / Live Events",
      period: "Present",
      points: [
        "Direct and synchronize real-time visual content across high-resolution LED screens in concert and festival environments.",
        "Proficient in live VJ software (Resolume Arena), media servers, hardware signal routing, and rapid live problem-solving."
      ]
    },
    {
      role: "Video Editor & Content Operation",
      company: "Kuaishou Technology",
      location: "Jakarta",
      period: "2020",
      points: [
        "Produced short-form motion video content and managed creative deliverables for agency, KOL, and partner accounts.",
        "Optimized backend video traffic engagement and supported creator ecosystem operations."
      ]
    },
    {
      role: "Graphic Designer",
      company: "Ontechnology",
      location: "Jakarta",
      period: "2019",
      points: [
        "Designed sports-focused creative brand assets and promotional video packages to strengthen mobile application positioning."
      ]
    },
    {
      role: "Graphic Designer",
      company: "Creativeira Agency",
      location: "Jakarta",
      period: "2018",
      points: [
        "Designed advertising materials, branding assets, and corporate campaign collateral for enterprise clients."
      ]
    }
  ],
  skills: [
    {
      category: "3D & Motion",
      items: ["Advanced 3D Modeling", "Stage Topology Design", "Motion Graphics", "Visual Jockey (VJ)", "Octane Render", "Cinema 4D", "KeyShot"]
    },
    {
      category: "Design & UI Tools",
      items: ["Adobe Photoshop", "Adobe Illustrator", "Sketch App (Expert)", "Adobe After Effects", "Adobe Premiere Pro", "Digital Imaging"]
    },
    {
      category: "Live Production & Management",
      items: ["Resolume Arena", "Live Stage Synchronization", "Event Spatial Planning", "Brand Identity Systems", "Creative Direction"]
    }
  ]
};
