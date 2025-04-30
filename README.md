# Carvana

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), built using the **App Router**. It serves as a platform potentially focused on classified listings, managing users, customers, listings with associated taxonomies, and images.

## Live Demo

Check out the live demo at [carvana-nine.vercel.app](https://carvana-nine.vercel.app)

## Key Features

### AI-Powered Vehicle Recognition

The platform leverages OpenAI's vision capabilities through `@ai-sdk/openai` to automatically extract vehicle details from uploaded images:

- **Instant Vehicle Identification**: Simply upload a car image to automatically identify make, model, year, and variant
- **Comprehensive Details Extraction**: The system automatically detects vehicle specifications like odometer reading, doors, seats, ULEZ compliance, transmission, color, fuel type, body type, and more
- **Streamable UI Feedback**: Real-time visual feedback during the AI analysis process
- **Taxonomy Mapping**: Automatically maps detected vehicle attributes to the platform's taxonomy system
- **Form Auto-Population**: Pre-fills listing creation forms with AI-detected data, saving time and reducing errors

This feature significantly streamlines the listing creation process, improves data accuracy, and enhances the overall user experience.

## Tech Stack

This project leverages a modern tech stack focused on performance, developer experience, and type safety:

- **Framework:** [Next.js](https://nextjs.org) 15 (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:**
  - [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI and Tailwind CSS)
  - [Radix UI](https://www.radix-ui.com/) (Primitives for accessible components)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (likely via [Neon](https://neon.tech/) serverless driver - `@prisma/adapter-neon`, `@neondatabase/serverless`)
- **State Management:**
  - [React Query (`@tanstack/react-query`)](https://tanstack.com/query/latest) (Server state, caching, synchronization)
  - [nuqs](https://nuqs.47ng.com/) (Type-safe URL Search Parameter state)
- **Forms:**
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) (Schema validation)
  - `@hookform/resolvers` (Zod resolver for React Hook Form)
- **API & Fetching:**
  - Next.js Route Handlers / Server Actions
  - [ky](https://github.com/sindresorhus/ky) (HTTP client)
  - [next-safe-action](https://next-safe-action.dev/) (Type-safe Server Actions)
- **File Storage:** [AWS S3](https://aws.amazon.com/s3/) (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
- **Authentication:** Likely custom implementation using `bcryptjs` for password hashing. Includes OAuth account linking (`user_oauth_accounts.prisma`).
- **Rich Text Editing:** [TinyMCE](https://www.tiny.cloud/) (`@tinymce/tinymce-react`)
- **Drag & Drop:** [`@dnd-kit`](https://dndkit.com/)
- **Image Handling:** [Sharp](https://sharp.pixelplumbing.com/), [ThumbHash](https://github.com/evanw/thumbhash), [unlazy](https://unlazy.byword.xyz/)
- **Rate Limiting:** [Upstash Ratelimit](https://upstash.com/docs/ratelimit/overview) (`@upstash/ratelimit`, `@upstash/redis`)
- **AI Integration:**
  - [`@ai-sdk/openai`](https://sdk.vercel.ai/) (OpenAI integration for image analysis)
  - [`ai`](https://sdk.vercel.ai/) (Vercel AI SDK for streamable UI responses)
- **Linting & Formatting:** ESLint, Prettier
- **Development Tools:** Turbopack (via `next dev --turbopack`)

## Project Structure

The project follows standard Next.js App Router conventions with additional structure:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Business Logic Overview

Based on the Prisma schema, the application implements the following core business logic:

1.  **User and Authentication:**

    - Manages internal application users (`User`) with roles (e.g., `ADMIN`, `EDITOR`, `VIEWER`).
    - Supports standard email/password authentication (`password` hash).
    - Integrates OAuth providers (`UserOAuthAccount`) for alternative login methods linked to internal users.
    - Handles user sessions (`Session`) for maintaining login state.

2.  **Customer Management:**

    - Manages external customers (`Customer`) who are distinct from internal users. These are likely the end-users interacting with the platform's primary features (e.g., posting or viewing listings).
    - Stores customer contact details (`email`, `phone`), personal information (`firstName`, `lastName`), and address.
    - Tracks the customer's journey or status using `CustomerLifecycle` (e.g., lead, active, inactive).
    - Records basic customer activity via `PageView` tracking.

3.  **Classified Listings Management (`Classified`):**

    - This is the central entity, representing items or services being listed (e.g., cars, products, services, jobs).
    - **Content & Details:** Each listing has a `title`, `slug` (for SEO-friendly URLs), `description`, `content` (potentially rich text), `price` with a `priceType` (Fixed, Negotiable, etc.), and location details (`address`, `latitude`, `longitude`).
    - **Status & Visibility:** Listings progress through different states (`status`: DRAFT, PENDING_REVIEW, PUBLISHED, REJECTED, ARCHIVED, EXPIRED). `publishedAt` and `archivedAt` timestamps track these transitions. Listings can be marked as `featured`.
    - **Ownership:** Each listing is associated with a `Customer` who created it.
    - **Contact:** Listings store contact information (`contactName`, `contactEmail`, `contactPhone`) which can optionally be hidden (`showContactDetails`).

4.  **Categorization and Tagging (`Taxonomy`):**

    - Provides a flexible system for organizing `Classified` listings.
    - Supports different types of taxonomies (`type`: CATEGORY, TAG, LOCATION, FEATURE, etc.).
    - Allows hierarchical structures (e.g., nested categories) via the `parent` relation.
    - Listings can be associated with multiple taxonomy terms (many-to-many relationship). This enables filtering, browsing, and searching based on these terms.

5.  **Image Handling (`Image`):**
    - Supports associating multiple images with each `Classified` listing (one-to-many relationship).
    - Stores image metadata like `url`, `alt` text, `size`, `width`, `height`, and potentially a `
