# Forge IA — 4 Landing Pages Task

Create 4 production-quality landing pages + 1 index for Forge IA.

## Product
- Name: Forge IA
- Tagline: "Votre équipe de nuit"
- Target: French SME managers (5-100 employees), non-tech
- Value: AI agents working at night (monitoring, follow-ups, LinkedIn/email drafts, summaries)
- Main channel: WhatsApp
- Pricing: Gratuit (trial) / Pro 29€/mois
- Differentiator: proactive, multi-agent, French SMEs

## Inspiration
1. Notion AI — powerful copy, airy layout, clean sections
2. enso.bot — Japanese zen minimalism, white space, refined typography
3. Lindy AI — human, conversational, warm, concrete use cases

## Files to create

### index.html
Simple dark hub with links to all 4 variants. Show variant name + short description.

### v1-nuit.html — "La Nuit" (Notion AI-inspired)
- Dark premium: #0A0A0A bg, #B8FF57 accent, white text
- Fonts: Playfair Display (headings) + DM Sans (body) via Google Fonts
- Hero: "Pendant que vous dormez, Forge IA travaille." with typing effect
- Sections: Nav → Hero → How it works (3 steps) → Features (6 cards) → Testimonials (3) → Pricing (Free/Pro) → CTA → Footer
- Animations: IntersectionObserver fade-in on scroll, typing effect on hero

### v2-zen.html — "Zen" (enso.bot-inspired)
- Pure white #FFFFFF bg, ink #1A1A1A, single cherry accent #E8564C
- Fonts: Cormorant Garamond (headings) + Source Sans Pro (body)
- Very airy, centered, Japanese-grid layout
- Hero: "Votre entreprise mérite une équipe qui ne dort jamais." — lots of space
- Sections: Nav → Hero → One use-case per section (vertical scroll, 4 use cases) → Single long testimonial → Features list → Pricing → Footer
- Animations: subtle fade-in, underline draw animation on title

### v3-conversation.html — "Conversation" (Lindy AI-inspired)
- Warm cream #FAF7F2, charcoal #2C2C2C, WhatsApp green #25D366
- Fonts: Plus Jakarta Sans
- WhatsApp conversation mock in hero (typewriter bubble effect)
- Hero: "Envoyez un message. Forge IA s'occupe du reste."
- Sections: Nav → Hero with chat mock → Use cases as chat bubbles → How it works → Testimonials → Pricing → "Démarrer sur WhatsApp" CTA
- Animations: chat bubbles appearing with delay on load

### v4-editorial.html — "Editorial" (brutalist)
- Black #000000 + white #FFFFFF + electric yellow #FFE500
- Fonts: Anton (headings) + Space Mono (body/accents) via Google Fonts
- Full-width massive typography, asymmetric layout
- Hero: "VOTRE PME. UNE ÉQUIPE IA. 24H/24." — fills entire viewport width
- Sections: Nav → Massive hero → 3 giant stats with counter animation → Features grid → Big quote → Pricing → Aggressive CTA → Footer
- Animations: glitch effect on hero title, number counter on scroll

## Requirements
- Standalone HTML: inline CSS + vanilla JS, no npm/build
- Google Fonts CDN only external dependency
- Responsive mobile (768px breakpoints)
- All text French, realistic (no Lorem ipsum)
- Fictional but credible French testimonials (name + title + company)
- CTAs → "#"
- Complete pages with nav, all sections, footer
