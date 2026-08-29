import {
  aboutManasi,
  archiveItems,
  bookReviews,
  ideaSections,
  notebookEntries,
  resources as homepageResources,
  studioPrograms,
  travelStories
} from "@/data/site-content";
import {
  books as legacyBooks,
  destinations,
  posts,
  resources as legacyResources
} from "@/lib/data";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  category: string;
};

const routeItems: SearchItem[] = [
  {
    title: "About Manasi",
    description: aboutManasi.intro,
    href: "/about",
    category: "About"
  },
  {
    title: "Architecture and Heritage",
    description: "Conservation drawings, historic buildings, observation, and architectural field notes.",
    href: "/architecture",
    category: "Architecture"
  },
  {
    title: "Art Classes",
    description: "Drawing, observation, architecture, maps, museums, and nature-based studio programs for children.",
    href: "/art-classes",
    category: "Create"
  },
  {
    title: "Book Library",
    description: "Children's books about architecture, nature, Marathi stories, STEM, belonging, and making.",
    href: "/read",
    category: "Books"
  },
  {
    title: "Travel and Field Guides",
    description: "Family travel, national parks, museums, heritage sites, city walks, and nature trails.",
    href: "/travel",
    category: "Travel"
  },
  {
    title: "Architectmata Blog",
    description: "Notes about architecture, books, travel, art, parenting, and ways of observing together.",
    href: "/blog",
    category: "Blog"
  },
  {
    title: "Explorer Club",
    description: "Printable expeditions, observation prompts, neighborhood activities, and family field notes.",
    href: "/explorer-club",
    category: "Resources"
  },
  {
    title: "Printable Resources",
    description: "Observation sheets, museum activities, travel planners, booklists, and place journals.",
    href: "/resources",
    category: "Resources"
  },
  {
    title: "Contact Architectmata",
    description: "Get in touch about art classes, resources, collaborations, and questions.",
    href: "/contact",
    category: "Contact"
  }
];

const generatedItems: SearchItem[] = [
  ...ideaSections.map((item) => ({
    title: item.title,
    description: item.note,
    href: item.href.startsWith("#") ? `/${item.href}` : item.href,
    category: item.verb
  })),
  ...archiveItems.map((item) => ({
    title: item.title,
    description: item.detail,
    href: "/#observe",
    category: item.label
  })),
  ...bookReviews.map((book) => ({
    title: book.title,
    description: `${book.learns}. ${book.why}`,
    href: "/read",
    category: book.category
  })),
  ...legacyBooks.map((book) => ({
    title: book.title,
    description: `${book.summary} ${book.learn}`,
    href: "/books",
    category: book.category
  })),
  ...travelStories.map((story) => ({
    title: story.title,
    description: `${story.place}. ${story.note}`,
    href: "/#explore",
    category: "Travel"
  })),
  ...destinations.map((destination) => ({
    title: destination.name,
    description: `${destination.place}. ${destination.tags.join(", ")}`,
    href: "/travel",
    category: "Travel"
  })),
  ...notebookEntries.map((entry) => ({
    title: entry.title,
    description: entry.copy,
    href: "/#remember",
    category: entry.section
  })),
  ...posts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    href: "/blog",
    category: post.category
  })),
  ...studioPrograms.map((program) => ({
    title: program,
    description: "An Architectmata studio program for children built around drawing, making, and close observation.",
    href: "/art-classes",
    category: "Art classes"
  })),
  ...homepageResources.map((resource) => ({
    title: resource.title,
    description: resource.type,
    href: "/#explorer-club",
    category: "Resource"
  })),
  ...legacyResources.map((resource) => ({
    title: resource.title,
    description: `${resource.type}. ${resource.meta}`,
    href: "/resources",
    category: "Resource"
  }))
];

export const searchIndex = [...routeItems, ...generatedItems].filter(
  (item, index, items) =>
    items.findIndex((candidate) => candidate.title === item.title && candidate.href === item.href) === index
);
