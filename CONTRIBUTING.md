# Contributing to OpenLandingPage

Thank you for your interest in contributing to OpenLandingPage! We welcome contributions, bug fixes, new templates, and improvements.

To ensure the repository remains legally sound, maintainable, and reliable for everyone, please review these guidelines before submitting a pull request.

---

## 1. Contributor License Agreement & Intellectual Property

OpenLandingPage supports two distinct contribution paths with different licensing scopes:

### A. Repository Code & Pull Request Contributions

By submitting a Pull Request or code patch to this repository, you agree to the following terms for the code and assets included in your contribution:

1. **Inbound = Outbound Licensing:** You grant the project and its users a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, modify, merge, publish, distribute, sublicense, and sell your contributed repository code under the terms of the project's [MIT License](LICENSE).
2. **Original Work & Clean Intellectual Property:** You certify that:
   - The contribution is your original work, or
   - You have the necessary rights and permissions to submit the code under the MIT License, and
   - The contribution does not infringe upon any third-party copyrights, patents, trademarks, or proprietary trade secrets.
3. **No Proprietary Third-Party Assets:** Do not submit:
   - Proprietary font binaries (use Google Fonts or SIL Open Font License compliant fonts; third-party fonts remain under their own licenses).
   - Commercial stock photos or videos without explicit open redistribution rights.
   - Closed-source or proprietary libraries.
4. **Respect Creator Rights:** Do not submit a design or template copied from another creator and claim it as your own.

### B. Community Gallery Submissions (No GitHub PR Required)

Creators can share live landing pages through the in-app **Add your website** dialog without opening a Pull Request:

1. **Website Listing Only:** Submitting a live HTTPS URL, creator credit, and optional preview screenshot grants OpenLandingPage permission to display the listing, attribution, and screenshot in the Community gallery. **Linked websites keep their own terms**—a listing does not license the external website's source code, copy, or brand assets under MIT.
2. **Optional Standalone HTML Upload:** If you also upload an optional standalone HTML file and accept the HTML contribution consent, that uploaded HTML file is contributed under the [MIT License](LICENSE) (including personal and commercial reuse, modification, and redistribution with required copyright and license notices). You must hold the rights to distribute the uploaded HTML and any included assets; separately licensed third-party libraries or fonts do not automatically become MIT-licensed.

---

## 2. Development Setup

This project uses **[Bun](https://bun.sh)** (version `1.3.11`+) as its primary package manager and runtime runner.

```bash
# Clone the repository
git clone https://github.com/Famanias/openlanding.page.git
cd openlanding.page

# Install dependencies
bun install

# Start local Next.js development server
bun dev
```

For more details on scripts and architecture, see [`docs/development.md`](docs/development.md).

---

## 3. Pull Request Guidelines

Before submitting your pull request:

1. **Run verification commands:**
   ```bash
   bun run check      # Verify template isolation and palette rules
   bun run lint       # ESLint checks
   bun run test       # Unit tests (Vitest)
   bun run build      # Next.js production build
   ```
2. **Template Isolation:**
   - Register a literal `createdAt: "YYYY-MM-DD"` in gallery metadata and append the item to `RAW_TEMPLATES` (same-day ties follow append order).
   - Ship a readable standalone `public/downloads/<slug>.html` with inline CSS and JavaScript, then set `hasDownload: true`. It must open from disk without Next.js or site-origin assets. See [`docs/gallery.md`](docs/gallery.md).
   - Templates must remain strictly self-contained within their respective route groups `src/app/(template_name)/`.
   - Do not introduce cross-template dependencies or pollute global styles.
3. **Keep Commits Focused:**
   - Write clear, descriptive commit messages.
   - Avoid bundling unrelated changes or formatting overhauls into a feature/fix PR.
4. **Never Commit Secrets:**
   - Ensure `.env*`, API tokens, or personal credentials are never staged or committed.

---

## 4. Reporting Issues & Security

- **Bug Reports & Feedback:** Open an issue on GitHub with clear reproduction steps and environment details.
- **Security Vulnerabilities:** If you discover a sensitive security vulnerability, please report it privately to the maintainers rather than creating a public issue.
