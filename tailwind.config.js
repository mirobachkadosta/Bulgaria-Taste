/** 
 * =========================================
 * TAILWIND CSS CONFIGURATION
 * =========================================
 * 
 * This file connects your CSS custom properties (from global.css) 
 * to Tailwind utility classes.
 * 
 * @type {import('tailwindcss').Config} 
 */
export default {
  /* 
    FILES TO SCAN - Add paths where you use Tailwind classes
    Tailwind scans these files to generate only the CSS you actually use
  */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add more paths if needed:
    // "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* 
        =========================================
        CUSTOM COLORS
        =========================================
        
        HOW TO ADD A NEW COLOR:
        1. Define the color in global.css as: --my-color: R G B
        2. Add it here following this pattern:
        
        myColor: {
          DEFAULT: "rgb(var(--my-color) / <alpha-value>)",
          focus: "rgb(var(--my-color-focus) / <alpha-value>)",  // Optional: for hover/focus state
        },
        
        OR for a single color without variants:
        myColor: "rgb(var(--my-color) / <alpha-value>)",
        
        3. Use in components: bg-my-color, text-my-color, border-my-color
        4. With opacity: bg-my-color/50, text-my-color/80
      */
      colors: {
        // Primary color - Main brand color (green)
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",      // Usage: bg-primary
          focus: "rgb(var(--primary-focus) / <alpha-value>)",  // Usage: bg-primary-focus
        },

        // Accent color - Secondary brand color (yellow)
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",       // Usage: bg-accent
          focus: "rgb(var(--accent-focus) / <alpha-value>)",   // Usage: bg-accent-focus
        },

        // Warning color - Alert/caution (orange)
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",      // Usage: bg-warning
          focus: "rgb(var(--warning-focus) / <alpha-value>)",  // Usage: bg-warning-focus
        },

        // Error color - Danger/error (red)
        error: {
          DEFAULT: "rgb(var(--error) / <alpha-value>)",        // Usage: bg-error
          focus: "rgb(var(--error-focus) / <alpha-value>)",    // Usage: bg-error-focus
        },

        // Success color - Positive/success (green)
        success: "rgb(var(--success) / <alpha-value>)",        // Usage: bg-success

        // Base colors - Backgrounds
        base: {
          100: "rgb(var(--base-100) / <alpha-value>)",         // Usage: bg-base-100
          200: "rgb(var(--base-200) / <alpha-value>)",         // Usage: bg-base-200
          300: "rgb(var(--base-300) / <alpha-value>)",         // Usage: bg-base-300
        },

        // Neutral colors - Text & borders
        neutral: {
          DEFAULT: "rgb(var(--neutral) / <alpha-value>)",      // Usage: text-neutral
          focus: "rgb(var(--neutral-focus) / <alpha-value>)",  // Usage: text-neutral-focus
        },

        /* ADD YOUR NEW COLORS HERE:
        
        myColor: {
          DEFAULT: "rgb(var(--my-color) / <alpha-value>)",
          focus: "rgb(var(--my-color-focus) / <alpha-value>)",
        },
        
        */
      },

      /* 
        =========================================
        CUSTOM SPACING (Optional)
        =========================================
        
        HOW TO ADD CUSTOM SPACING:
        Add custom spacing values for padding, margin, width, height, etc.
        
        Example:
        spacing: {
          '128': '32rem',    // Usage: w-128, h-128, p-128
          '144': '36rem',    // Usage: mt-144, mb-144
        },
      */

      /* 
        =========================================
        CUSTOM FONTS
        =========================================
        
        HOW TO ADD GOOGLE FONTS:
        1. Add font link in index.html (already done!)
        2. Add font family below
        3. Use: font-sans (body text), font-display (headings)
        
        CHANGE FONTS:
        - Visit: https://fonts.google.com/
        - Select fonts and copy the name
        - Update the arrays below
      */
      fontFamily: {
        sans: ['Comfortaa', 'sans-serif'],        // Body text: font-sans (default)
        display: ['TASA Explorer', 'sans-serif'],               // Headings: font-display

        // Add more font families:
        // mono: ['Fira Code', 'monospace'],                  // Usage: font-mono
      },

      /* 
        =========================================
        CUSTOM FONT SIZES (Optional)
        =========================================
        
        HOW TO ADD CUSTOM FONT SIZES:
        
        Example:
        fontSize: {
          'xxs': '0.625rem',      // Usage: text-xxs
          'huge': '6rem',         // Usage: text-huge
        },
      */

      /* 
        =========================================
        CUSTOM BREAKPOINTS (Optional)
        =========================================
        
        HOW TO ADD CUSTOM BREAKPOINTS:
        
        Example:
        screens: {
          'xs': '475px',          // Usage: xs:text-sm
          '3xl': '1920px',        // Usage: 3xl:container
        },
      */
    },
  },

  /* 
    =========================================
    DARK MODE CONFIGURATION
    =========================================
    
    'class' = Toggle dark mode by adding 'dark' class to <html> or <body>
    'media' = Use system preferences (prefers-color-scheme)
    
    To enable dark mode:
    <html className="dark">  or  <body className="dark">
  */
  darkMode: "class",

  /* 
    =========================================
    PLUGINS (Optional)
    =========================================
    
    Add Tailwind plugins here for additional functionality
    
    Popular plugins:
    - @tailwindcss/forms
    - @tailwindcss/typography
    - @tailwindcss/aspect-ratio
    
    Install: npm install -D @tailwindcss/forms
    Then add: plugins: [require('@tailwindcss/forms')],
  */
  plugins: [],
}
