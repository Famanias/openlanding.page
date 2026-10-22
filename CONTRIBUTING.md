# Contributing to OpenLandingPage

Thank you for your interest in contributing to OpenLandingPage! We welcome contributions, bug fixes, new templates, and improvements.

To ensure the repository remains legally sound, maintainable, and reliable for everyone, please review these guidelines before submitting a pull request.

---

## 1. Contributor License Agreement & Intellectual Property

By submitting a Pull Request, patch, or issue to this repository, you agree to the following terms:

1. **Inbound = Outbound Licensing:** You grant the project and its users a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, modify, merge, publish, distribute, sublicense, and sell your contribution under the terms of the project's [MIT License](LICENSE).
2. **Original Work & Clean Intellectual Property:** You certify that:
   - The contribution is your original work, or
   - You have the necessary rights and permissions to submit the code under the MIT License, and
   - The contribution does not infringe upon any third-party copyrights, patents, trademarks, or proprietary trade secrets.
3. **No Proprietary Third-Party Assets:** Do not submit:
   - Proprietary font binaries (use Google Fonts or SIL Open Font License compliant fonts).
   - Commercial stock photos or videos without explicit open redistribution rights.
   - Closed-source or proprietary libraries.
4. **Don't be an asshole:** Don't submit a template that you obviously stole from somewhere else and claim it as your own.

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
