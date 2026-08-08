# Architectmata Content Management

Architectmata separates design from content.

The codebase owns the site structure, layout, navigation, branding, colors, typography, reusable components, core homepage text, and protected drawing display rules.

Notion owns the repeatable editorial content:

- Book reviews
- Notebook / blog entries
- Travel guides
- Architecture observations
- Parenting and memory notes
- Explorer Club resources
- Art activity resources
- Studio updates
- Image captions and permissions

## CMS Choice

Use the existing Notion workspace as the CMS through the official Notion API.

The website reads published Notion database items at build/render time. If Notion is not connected yet, the site uses local placeholder content so the design still works.

## Required Notion Databases

Create these five databases in Notion:

- Book Reviews
- Travel Guides
- Notebook Entries
- Resources
- Studio Updates

Each database maps to a website area:

- Book Reviews -> Read page
- Travel Guides -> Explore page
- Notebook Entries -> Blog / Notebook page
- Resources -> Resources / Explorer Club page
- Studio Updates -> Art Classes page

## Required Properties

Every database should include these properties with the exact names below:

| Property | Notion type | Used for |
| --- | --- | --- |
| Title | Title | Page/post title |
| Slug | Rich text | Website URL-friendly name |
| Category | Select | Section/category label |
| Tags | Multi-select | Filtering and related content |
| Cover Image | Files & media | Main image |
| Excerpt | Rich text | Card summary |
| Body Content | Rich text | Main article text for the first version |
| Date | Date | Sorting and display |
| Featured | Checkbox | Homepage/featured placement |
| Published | Checkbox | Only checked items appear on the website |
| Image Caption | Rich text | Museum-style image caption |
| Image Permission Status | Select | Permission tracking |

Recommended `Image Permission Status` values:

- Public
- Public cropped
- Private reference
- Do not use

Book Reviews should also include:

| Property | Notion type |
| --- | --- |
| Age Range | Rich text |
| What Children Learn | Rich text |
| Why It Matters | Rich text |

Travel Guides should also include:

| Property | Notion type |
| --- | --- |
| Place | Rich text |

Resources should also include:

| Property | Notion type |
| --- | --- |
| PDF Upload | Files & media |

## Environment Variables

Create a private `.env.local` file beside `.env.example`, then paste the real values:

```bash
NOTION_API_KEY=
NOTION_BOOK_REVIEWS_DATABASE_ID=
NOTION_TRAVEL_GUIDES_DATABASE_ID=
NOTION_NOTEBOOK_ENTRIES_DATABASE_ID=
NOTION_RESOURCES_DATABASE_ID=
NOTION_STUDIO_UPDATES_DATABASE_ID=
```

Never paste the Notion API key into the code.

## Notion Integration Setup

1. In Notion, create an internal integration.
2. Copy the integration secret.
3. Paste it into `.env.local` as `NOTION_API_KEY`.
4. Open each Notion database.
5. Share each database with the integration.
6. Copy each database ID from its Notion URL.
7. Paste each database ID into the matching `.env.local` variable.
8. Restart the website after changing `.env.local`.

## Publishing From Notion

To publish a new item:

1. Add a row/page in the correct Notion database.
2. Fill in the required properties.
3. Add a clear `Slug`, for example `first-museum-visit-with-children`.
4. Add image caption and permission information.
5. Check `Published`.
6. Check `Featured` only if it should appear in featured sections.

Unchecked `Published` items stay hidden.

## Troubleshooting

If content does not appear:

- Confirm `Published` is checked.
- Confirm the database is shared with the Notion integration.
- Confirm the correct database ID is pasted into `.env.local`.
- Confirm `NOTION_API_KEY` is pasted into `.env.local`.
- Restart the website after changing environment variables.
- Check that property names match exactly, including spaces and capitalization.
- Make sure uploaded images are approved for public use.

Full drawing sheets should not be published. Use cropped, watermarked details for public pages.
