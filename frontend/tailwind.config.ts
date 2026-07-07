/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-dim': 'var(--surface-dim)',
        'surface-bright': 'var(--surface-bright)',
        'surface-container-lowest': 'var(--surface-container-lowest)',
        'surface-container-low': 'var(--surface-container-low)',
        'surface-container': 'var(--surface-container)',
        'surface-container-high': 'var(--surface-container-high)',
        'surface-container-highest': 'var(--surface-container-highest)',
        
        'on-surface': 'var(--on-surface)',
        'on-surface-variant': 'var(--on-surface-variant)',
        
        primary: 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        'primary-container': 'var(--primary-container)',
        'on-primary-container': 'var(--on-primary-container)',
        
        secondary: 'var(--secondary)',
        'on-secondary': 'var(--on-secondary)',
        'secondary-container': 'var(--secondary-container)',
        'on-secondary-container': 'var(--on-secondary-container)',
        
        tertiary: 'var(--tertiary)',
        'on-tertiary': 'var(--on-tertiary)',
        'tertiary-container': 'var(--tertiary-container)',
        'on-tertiary-container': 'var(--on-tertiary-container)',
        
        error: 'var(--error)',
        'on-error': 'var(--on-error)',
        'error-container': 'var(--error-container)',
        'on-error-container': 'var(--on-error-container)',
        
        // Legacy overrides for old dashboard components
        base: 'var(--bg-base)',
        card: 'var(--bg-card)',
        elevated: 'var(--bg-elevated)',
        border: 'var(--bg-border)',
        success: 'var(--accent-success)',
        warning: 'var(--accent-warning)',
        danger: 'var(--accent-danger)',
        muted: 'var(--text-muted)',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      spacing: {
        'grid-margin': '24px',
        'grid-gutter': '16px',
        'stack-lg': '32px',
        'stack-md': '16px',
        'stack-sm': '8px',
        'stack-xs': '4px',
      },
      fontFamily: {
        'display-lg': ['Hanken Grotesk', 'sans-serif'],
        'display-md': ['Hanken Grotesk', 'sans-serif'],
        'headline-sm': ['Hanken Grotesk', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'body-sm': ['Inter', 'sans-serif'],
        'label-mono': ['JetBrains Mono', 'monospace'],
        'label-caps': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(34, 197, 94, 0.15)',
      },
    },
  },
  plugins: [],
}