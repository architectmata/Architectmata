import {
  Archive,
  BookOpen,
  Brush,
  Camera,
  Compass,
  Feather,
  Landmark,
  Leaf,
  Map,
  NotebookTabs,
  Shapes,
  Sparkles
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Observe", href: "#observe" },
  { label: "Read", href: "/read" },
  { label: "Journal", href: "/journal" },
  { label: "Explore", href: "#explore" },
  { label: "Create", href: "#create" },
  { label: "Remember", href: "#remember" },
  { label: "Art Classes", href: "#art-classes" },
  { label: "Explorer Club", href: "#explorer-club" },
  { label: "Contact", href: "#contact" }
];

export const brandBasics = {
  tagline: "Architecture through a child's eyes.",
  instagram: "@architectmata",
  instagramUrl: "https://www.instagram.com/architectmata/",
  email: "hello.architectmata@gmail.com",
  location: "Redmond, Washington",
  copyright:
    "All drawings, photographs, field notes, and original content by Manasi Chaudhari / Architectmata unless noted. Please do not reproduce without permission."
};

export const aboutManasi = {
  intro:
    "Manasi Chaudhari is a conservation architect, educator, mother, and storyteller helping families discover architecture through observation rather than instruction.",
  studied: [
    "Bachelor of Architecture, RTM Nagpur University",
    "Master of Architecture in Architectural Conservation, CEPT University, Ahmedabad"
  ],
  worked: [
    "Kimaya Architects, Pune",
    "Conservation and heritage documentation projects",
    "Former Assistant Professor of Architecture"
  ],
  conservation:
    "Her conservation work included documenting and understanding historic buildings and urban heritage: temples, wadas, traditional neighborhoods, and public heritage projects.",
  motherhood:
    "Watching her son learn made her realize children understand architecture long before they know the word architecture. They learn through books, play, museums, nature, travel, conversations, and everyday observation.",
  why:
    "Architectmata began as a way to reconnect with architecture after stepping away from professional practice and to make architecture accessible to families through stories, books, travel, art, and curiosity."
};

export const ideaSections = [
  {
    verb: "Observe",
    href: "#observe",
    title: "Architecture, cities, parenting, and everyday details",
    note: "Doorways, bus stops, balconies, museum fatigue, child development, street corners, and the small clues children notice first.",
    icon: Landmark,
    accent: "terracotta"
  },
  {
    verb: "Read",
    href: "/read",
    title: "Children's books as maps for curiosity",
    note: "Picture books, Marathi books, STEM, architecture shelves, chapter books, and reviews that connect reading with looking.",
    icon: BookOpen,
    accent: "indigo"
  },
  {
    verb: "Explore",
    href: "#explore",
    title: "Travel as gentle fieldwork",
    note: "Family travel, national parks, museums, heritage sites, visitor centers, city walks, and nature trails made child-sized.",
    icon: Compass,
    accent: "peacock"
  },
  {
    verb: "Create",
    href: "#create",
    title: "Art, activities, studio projects, and printables",
    note: "Sketching, mapping, collage, texture studies, observation sheets, and creative learning that begins with place.",
    icon: Brush,
    accent: "marigold"
  },
  {
    verb: "Remember",
    href: "#remember",
    title: "Memory, heritage, migration, family stories, and keepsakes",
    note: "The archive of childhood: tickets, recipes, routes, old homes, inherited words, and stories carried across places.",
    icon: Archive,
    accent: "olive"
  }
];

export const archiveItems = [
  {
    label: "Field note",
    title: "Measuring a place by sitting inside it",
    detail: "Roof timbers, repair work, scale, documentation",
    mark: "01"
  },
  {
    label: "Pinned book",
    title: "How Does My Home Work?",
    detail: "Systems, shelter, pipes, wires, everyday architecture",
    mark: "02"
  },
  {
    label: "Travel scrap",
    title: "Yellowstone Junior Ranger memory",
    detail: "Visitor centers, wildlife, badges, slow family learning",
    mark: "03"
  },
  {
    label: "Studio prompt",
    title: "Draw the street you know without looking",
    detail: "Memory maps, landmarks, routes, belonging",
    mark: "04"
  },
  {
    label: "Heritage trace",
    title: "Bracket, capital, shaft, hand, scale",
    detail: "Cropped drawing fragments from conservation study",
    mark: "05"
  },
  {
    label: "Nature note",
    title: "Leaves collected after the monsoon",
    detail: "Texture, season, patience, field journal",
    mark: "06"
  }
];

export const bookReviews = [
  {
    title: "How Does My Home Work?",
    category: "Architecture",
    age: "4-8",
    learns: "Electricity, water, plumbing, construction, and how homes function",
    why: "One of the first books Manasi recommends because it encourages children to look differently at their own homes."
  },
  {
    title: "A Monsoon Alphabet",
    category: "Nature",
    age: "3-6",
    learns: "Seasonal observation, sound, color, waiting",
    why: "Turns weather into vocabulary and invites children to listen before they name."
  },
  {
    title: "The Fort on the Hill",
    category: "Marathi",
    age: "6-9",
    learns: "Landscape, local history, courage, oral storytelling",
    why: "Pairs beautifully with a short climb, a sketchbook, and a story from a grandparent."
  }
];

export const fieldImages = [
  {
    src: "/images/architectmata/site-sketching-roof.jpg",
    caption: "On-site sketching during heritage documentation."
  },
  {
    src: "/images/architectmata/conservation-roof-temple.jpg",
    caption: "Traditional roof structure, temple precinct, and conservation fieldwork."
  },
  {
    src: "/images/architectmata/protected-bracket-detail.jpg",
    caption: "Cropped bracket detail from Manasi's conservation drawing archive."
  }
];

export const travelStories = [
  {
    title: "A Piece of India in Manhattan",
    place: "New York City | Architecture + India",
    note:
      "After first discovering Charles Correa through Bharat Bhavan in architecture school, seeing the Permanent Mission of India to the UN felt deeply personal: modern architecture carrying Indian identity and a quiet sense of home.",
    url: "https://www.instagram.com/p/DQ-taQdEfq_/"
  },
  {
    title: "Yellowstone Without Rushing",
    place: "Yellowstone National Park | Family travel",
    note: "Wildlife, visitor centers, landscapes, and Junior Ranger activities became a way to learn through exploration rather than racing between viewpoints."
  },
  {
    title: "The Visitor Center Is the First Museum",
    place: "National parks | Family travel",
    note: "Maps, stamps, ranger desks, animal tracks, and why the practical room is often the best learning room."
  },
  {
    title: "A Museum Day When Nobody Finished the Gallery",
    place: "Parenting | Art and fatigue",
    note: "How to treat restlessness as feedback and turn one sculpture, one bench, and one postcard into enough."
  }
];

export const notebookEntries = [
  {
    section: "Observe",
    title: "Children Read Buildings Before They Know the Word",
    copy: "Construction sites became chances to talk about excavators, materials, and how places are made. Every building has clues children can already begin to read.",
    icon: Shapes
  },
  {
    section: "Remember",
    title: "Pandemic Play From Everyday Materials",
    copy: "Simple play experiences made from household materials taught Manasi that observation and imagination matter more than perfectly designed toys.",
    icon: Feather
  },
  {
    section: "Create",
    title: "Texture Exploration for Little Hands",
    copy: "Cardboard, fabric, bubble wrap, leaves, paper, crayons, and paint become a sensory activity for ages 18 months to 5 years.",
    icon: Sparkles
  }
];

export const studioDetails = {
  ageGroups: ["5-7 years", "Future groups for older children"],
  format: "Primarily in-person",
  location: "Redmond, Washington",
  fees: "Available on inquiry",
  philosophy:
    "Children become confident artists and observers by drawing, experimenting, asking questions, and looking closely at the world around them."
};

export const studioPrograms = [
  "Architecture through sketching",
  "Mapmaking and memory walks",
  "Museum-inspired art projects",
  "Nature journals and texture studies"
];

export const resources = [
  {
    title: "Heritage Walk Observation Sheet",
    type: "Printable PDF",
    icon: Map
  },
  {
    title: "Picture-Book Architecture Shelf",
    type: "Booklist",
    icon: BookOpen
  },
  {
    title: "Travel Journal for Children",
    type: "Workbook",
    icon: NotebookTabs
  },
  {
    title: "Museum Scavenger Hunt",
    type: "Activity card",
    icon: Camera
  },
  {
    title: "Fort Sketching Bingo",
    type: "Field game",
    icon: Landmark
  },
  {
    title: "Leaf and Bark Texture Page",
    type: "Nature sheet",
    icon: Leaf
  }
];

export const imageUseRules = [
  "Architecture sketches: use cropped details unless full drawings are explicitly approved.",
  "Child photographs: never show a child's face; use silhouettes, back views, hands, feet, or over-the-shoulder compositions.",
  "Travel photographs: use landscapes, museums, buildings, trails, visitor centers, and architectural details.",
  "Personal notebooks: use selected spreads, cropped annotations, textures, and details rather than complete pages."
];
