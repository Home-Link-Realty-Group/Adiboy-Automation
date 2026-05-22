@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 45 8% 20%;
    --card: 0 0% 100%;
    --card-foreground: 45 8% 20%;
    --popover: 0 0% 100%;
    --popover-foreground: 45 8% 20%;
    --primary: 217 100% 47%;
    --primary-foreground: 0 0% 100%;
    --secondary: 217 100% 27%;
    --secondary-foreground: 0 0% 100%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 25%;
    --accent: 45 92% 50%;
    --accent-foreground: 0 0% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 217 100% 33%;
    --chart-1: 217 100% 47%;
    --chart-2: 45 92% 50%;
    --chart-3: 217 100% 27%;
    --chart-4: 43 85% 55%;
    --chart-5: 45 95% 58%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 45 8% 12%;
    --foreground: 0 0% 95%;
    --card: 45 8% 16%;
    --card-foreground: 0 0% 95%;
    --popover: 45 8% 14%;
    --popover-foreground: 0 0% 95%;
    --primary: 217 100% 40%;
    --primary-foreground: 0 0% 100%;
    --secondary: 45 8% 25%;
    --secondary-foreground: 0 0% 100%;
    --muted: 45 8% 30%;
    --muted-foreground: 0 0% 70%;
    --accent: 217 100% 60%;
    --accent-foreground: 45 8% 12%;
    --destructive: 0 62.8% 50%;
    --destructive-foreground: 0 0% 98%;
    --border: 45 8% 25%;
    --input: 45 8% 22%;
    --ring: 217 100% 50%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}



@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }

  /* ═══ FOCUS INDICATORS — Accessibility ═══ */
  :focus-visible {
    outline: 2px solid #D4A843;
    outline-offset: 2px;
  }

  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible,
  a:focus-visible {
    outline: 2px solid #D4A843;
    outline-offset: 2px;
  }

  /* ═══ SCREEN READER ONLY ═══ */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .sr-only:focus-visible {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
  }

  /* ═══ PREFERS REDUCED MOTION ═══ */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ═══ SYSTEM FONTS WITH SWAP ═══ */
  @font-face {
    font-family: 'Segoe UI';
    font-display: swap;
    src: system-ui;
  }

  /* ═══ STATUS LIGHT PULSE ═══ */
  @keyframes pulseLight {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
}

/* Mobile nav helpers */
.hidden-mobile { display: flex !important; }
.show-mobile { display: none !important; }

@media (max-width: 768px) {
  .hidden-mobile { display: none !important; }
  .show-mobile { display: flex !important; }
}
