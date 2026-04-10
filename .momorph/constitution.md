<!--
Sync Impact Report
===================
Version change: N/A -> 1.0.0
New constitution - initial creation.

Added sections:
- Core Principles (5 principles)
- Technology Stack & Constraints
- Development Workflow
- Governance

Templates requiring updates:
- .momorph/templates/plan-template.md — ✅ aligned (Constitution Compliance Check present)
- .momorph/templates/spec-template.md — ✅ aligned (responsive breakpoints, security TR, dependencies reference constitution)
- .momorph/templates/tasks-template.md — ✅ aligned (TDD flow, phase structure, parallel markers present)

Follow-up TODOs: None
-->

# Agentic Coding Live Demo Constitution

## Core Principles

### I. Clean Architecture & Code Organization

- All source code MUST reside under `src/` with clear separation of concerns.
- Folder structure MUST follow a feature-based organization:
  - `src/app/` — Next.js App Router pages and layouts
  - `src/components/` — Reusable UI components (grouped by feature or shared)
  - `src/libs/` — Third-party service integrations (e.g., Supabase clients)
  - `src/hooks/` — Custom React hooks
  - `src/types/` — Shared TypeScript type definitions
  - `src/utils/` — Pure utility functions
- Every file MUST have a single, clear responsibility. Avoid God files/components.
- Naming conventions:
  - Components: PascalCase (`LoginForm.tsx`)
  - Hooks: camelCase with `use` prefix (`useAuth.ts`)
  - Utilities/libs: camelCase (`formatDate.ts`)
  - Types: PascalCase for types/interfaces, camelCase for files
- TypeScript strict mode MUST remain enabled. Use explicit types at module boundaries; leverage inference internally.
- Imports MUST use the `@/*` path alias (mapped to `./src/*`). No relative imports that traverse more than one parent (`../../`).
- Dead code, unused imports, and commented-out code MUST NOT be committed.

### II. Test-Driven Development (TDD)

- TDD is **NON-NEGOTIABLE** for all feature implementation.
- Development flow MUST follow Red-Green-Refactor:
  1. **Red**: Write a failing test that defines the expected behavior.
  2. **Green**: Write the minimum code to make the test pass.
  3. **Refactor**: Improve code quality while keeping tests green.
- Every user story MUST have corresponding integration tests before implementation begins.
- Test files MUST be co-located or placed in a parallel `tests/` directory following the source structure.
- Minimum test coverage targets:
  - Core user flows: 90%+
  - Integration points (API, Supabase): 85%+
  - Error/edge case scenarios: 75%+
- Mocking strategy:
  - External services (Supabase, Cloudflare): Mock at the boundary using test doubles.
  - Internal modules: Prefer real implementations; mock only when isolation is essential.

### III. Security by Design (OWASP)

- All code MUST comply with [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/).
- **Input validation**: All user input MUST be validated on both client and server side. Use Zod or equivalent schema validation.
- **Authentication**: MUST use Supabase Auth exclusively. Never implement custom auth flows. Use `@supabase/ssr` for server-side session management.
- **Authorization**: Row Level Security (RLS) MUST be enabled on all Supabase tables. Never bypass RLS in application code.
- **Data exposure**: API responses MUST NOT leak sensitive data (internal IDs, stack traces, credentials). Use DTOs/projections.
- **Environment secrets**: All secrets MUST be stored in environment variables (`.env`). Never hardcode secrets. `.env` files MUST be in `.gitignore`.
- **Dependency security**: Only use well-maintained, trusted dependencies. Review new dependencies before adding.
- **XSS prevention**: Never use `dangerouslySetInnerHTML`. Sanitize all dynamic content rendered in the DOM.
- **CSRF protection**: Rely on Supabase Auth's built-in CSRF protections. Verify origin headers on server-side API routes.
- **Error handling**: Never expose internal errors to users. Log errors server-side; return generic error messages to clients.

### IV. Responsive & Accessible UI

- All UI MUST be responsive and support three breakpoint categories:
  - **Mobile**: 320px - 767px
  - **Tablet**: 768px - 1023px
  - **Desktop**: 1024px+
- Use TailwindCSS responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) for breakpoint-specific styles. Mobile-first approach is mandatory.
- Layout MUST use CSS Flexbox or Grid via TailwindCSS utilities. No fixed pixel widths for containers.
- Typography, spacing, and touch targets MUST scale appropriately across breakpoints.
- Minimum touch target size: 44x44px on mobile.
- Accessibility requirements:
  - Semantic HTML elements MUST be used (e.g., `<button>`, `<nav>`, `<main>`, `<form>`).
  - All interactive elements MUST be keyboard-navigable.
  - Images MUST have meaningful `alt` attributes.
  - Color contrast MUST meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text).
  - Form fields MUST have associated `<label>` elements.
- Design tokens from Figma MUST be translated into TailwindCSS theme extensions or CSS custom properties.

### V. Tech Stack Best Practices

- **Next.js 15 (App Router)**:
  - Use React Server Components (RSC) by default. Add `"use client"` only when client interactivity is required.
  - Use `loading.tsx`, `error.tsx`, and `not-found.tsx` for route-level UI states.
  - Data fetching MUST happen in Server Components or Route Handlers. No client-side fetching for initial page data.
  - Use Next.js Metadata API for SEO (`generateMetadata`, `metadata` export).
- **Supabase**:
  - Use the pre-configured clients in `src/libs/supabase/` (`client.ts` for browser, `server.ts` for server, `middleware.ts` for middleware).
  - MUST use Supabase's type-safe client. Generate types from the database schema.
  - Real-time subscriptions MUST be used only in Client Components and properly cleaned up on unmount.
  - Database migrations MUST be managed via Supabase CLI (`supabase/migrations/`).
- **Cloudflare Workers**:
  - Use `@opennextjs/cloudflare` for deployment. Access Cloudflare bindings via `getCloudflareContext()`.
  - Be mindful of Cloudflare Workers runtime limitations (no Node.js-specific APIs unless polyfilled).
  - Edge-compatible packages only. Verify compatibility before adding new dependencies.
- **TailwindCSS v4**:
  - Use utility classes exclusively. No custom CSS unless absolutely necessary (e.g., complex animations).
  - Compose complex styles using TailwindCSS `@apply` sparingly — prefer direct utility classes in JSX.
  - Group related utilities logically in JSX: layout > spacing > typography > colors > effects.

## Technology Stack & Constraints

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.5.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x (strict) |
| Styling | TailwindCSS | 4.x |
| Backend/BaaS | Supabase (Auth, Database, Storage) | Latest |
| Deployment | Cloudflare Workers (OpenNext) | Latest |
| Package Manager | Yarn | 1.22.22 |
| Runtime | Node.js | 24.x |
| Linting | ESLint | 9.x |
| Local Dev | Docker (Supabase local) | Latest |

### Constraints

- All code MUST compile with TypeScript strict mode without errors.
- ESLint MUST pass with zero errors before any commit.
- The `@/*` import alias is the only path alias. Do not introduce others.
- No direct DOM manipulation. Use React's declarative model.
- No `any` type unless explicitly justified with a comment explaining why.
- Bundle size MUST be monitored. Avoid importing entire libraries when tree-shakeable alternatives exist.

## Development Workflow

### Branch & Commit Strategy

- Feature branches MUST be created from `main`.
- Commits MUST follow [Conventional Commits](https://www.conventionalcommits.org/) format: `type(scope): description`.
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

### Development Cycle

1. **Specify**: Create feature spec from Figma design (`/momorph.specify`).
2. **Plan**: Generate implementation plan (`/momorph.plan`).
3. **Task**: Break plan into executable tasks (`/momorph.tasks`).
4. **Implement**: Execute tasks following TDD — tests first, then code (`/momorph.implement`).
5. **Review**: Self-review against constitution principles before PR.
6. **Commit**: Use conventional commit messages (`/momorph.commit`).

### Local Development

- Run `make up` to start local Supabase and sync environment variables.
- Run `make dev` to start Next.js dev server with Turbopack.
- Run `make down` to stop local containers.
- All environment configuration is managed via `.env.development` (auto-created from `.env.example`).

### Code Review Checklist

Before merging any code, verify:
- [ ] TypeScript compiles with zero errors
- [ ] ESLint passes with zero errors
- [ ] All tests pass
- [ ] Responsive design verified at mobile, tablet, and desktop breakpoints
- [ ] No hardcoded secrets or sensitive data
- [ ] Supabase RLS policies cover new tables/columns
- [ ] Accessibility requirements met (keyboard nav, contrast, semantic HTML)
- [ ] No unnecessary dependencies added

## Governance

- This constitution is the **single source of truth** for all development decisions in this project.
- All implementation plans MUST include a Constitution Compliance Check (see `plan-template.md`).
- Any deviation from these principles MUST be documented with a justification in the relevant plan or PR.
- **Amendment process**:
  1. Propose change with rationale.
  2. Document the amendment in this file.
  3. Update version number following semantic versioning.
  4. Propagate changes to dependent templates.
- **Compliance review**: Every PR MUST be checked against these principles. Non-compliance blocks merge.
- For detailed runtime development guidance, refer to `AGENTS.md` and `.momorph/guidelines/`.

**Version**: 1.0.0 | **Ratified**: 2026-04-10 | **Last Amended**: 2026-04-10
