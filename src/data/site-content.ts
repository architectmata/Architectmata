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
  { label: "Observe", href: "/observe" },
  { label: "Read", href: "/read" },
  { label: "Explore", href: "/travel" },
  { label: "Create", href: "/art-classes" },
  { label: "Remember", href: "/remember" },
  { label: "About", href: "/about" }
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
    href: "/observe",
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
    title: "Little Master Carroll — Alice in Wonderland",
    category: "Early learning",
    age: "Baby–preschool",
    learns: "Colours, visual recognition, and an early introduction to a literary classic",
    why: "A BabyLit colour primer that uses familiar elements from Alice in Wonderland to introduce colours through bold illustrations and simple language."
  },
  {
    title: "Books That Feel Like Home",
    category: "India + diaspora",
    age: "Family reading",
    learns: "Culture, belonging, family vocabulary, clothing, food, and everyday connections to India",
    why: "A growing Architectmata shelf of books such as Nani’s Walk to the Park and Ammama’s Sari that help children encounter Indian life through ordinary stories rather than only festivals and mythology."
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
    title: "Junior Rangers Changed How We Explore National Parks",
    place: "National parks | Family learning",
    note:
      "The Junior Ranger program turned park visits into active exploration: asking questions, completing activities, talking with rangers, noticing wildlife and landscapes, and carrying home a badge connected to what was learned.",
    href: "/journal/junior-rangers-national-parks-with-kids"
  },
  {
    title: "Why I Never Skip the Visitor Center",
    place: "National parks | Family travel",
    note:
      "Maps, exhibits, ranger desks, stamps, local stories, and practical information make the visitor center one of the best places to understand a park before heading into it.",
    href: "/journal/why-i-never-skip-national-park-visitor-centers"
  },
  {
    title: "What My 5-Year-Old Remembered From Our Oregon Road Trip",
    place: "Oregon | Family travel",
    note:
      "The moments children remember are not always the famous viewpoints. Small experiences, repeated rituals, discoveries, and conversations can become the real map of a family trip.",
    href: "/journal/what-kids-remember-from-family-travel"
  }
];

export const notebookEntries = [
  {
    section: "Observe",
    title: "Look Down: What a Manhole Cover Can Tell You",
    copy: "Manhole covers can carry clues about a city’s history, infrastructure and identity. Chandigarh first taught me to look down, and I have been photographing these overlooked pieces of design ever since.",
    icon: Shapes,
    href: "/observe"
  },
  {
    section: "Create",
    title: "The Spiky Fort",
    copy: "I wanted to improve the sandcastle. My child had other plans. His spiky mountain fort became a reminder that sometimes the better question is not ‘How can I fix this?’ but ‘Tell me about what you made.’",
    icon: Sparkles,
    href: "/journal/the-spiky-fort-learning-not-to-correct-child-creativity"
  },
  {
    section: "Remember",
    title: "When Books Become Family Keepsakes",
    copy: "Some books stop being only books. Teacher notes, park stamps, personalised pages and family memories can turn them into small archives of childhood.",
    icon: Feather,
    href: "/journal/when-books-become-family-keepsakes"
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
