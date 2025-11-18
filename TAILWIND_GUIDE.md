# 🎨 Tailwind Custom Colors Guide

## Quick Reference

### Available Custom Colors

| Color           | Usage                                        | Description              |
| --------------- | -------------------------------------------- | ------------------------ |
| `primary`       | `bg-primary` `text-primary` `border-primary` | Main brand green         |
| `primary-focus` | `bg-primary-focus` `hover:bg-primary-focus`  | Darker primary for hover |
| `accent`        | `bg-accent` `text-accent`                    | Secondary brand yellow   |
| `accent-focus`  | `bg-accent-focus`                            | Darker accent            |
| `warning`       | `bg-warning` `text-warning`                  | Alert/caution orange     |
| `warning-focus` | `bg-warning-focus`                           | Darker warning           |
| `error`         | `bg-error` `text-error`                      | Danger/error red         |
| `error-focus`   | `bg-error-focus`                             | Darker error             |
| `success`       | `bg-success` `text-success`                  | Success green            |
| `base-100`      | `bg-base-100`                                | Main background (white)  |
| `base-200`      | `bg-base-200`                                | Secondary background     |
| `base-300`      | `bg-base-300`                                | Tertiary background      |
| `neutral`       | `text-neutral` `bg-neutral`                  | Main text/neutral color  |
| `neutral-focus` | `text-neutral-focus`                         | Darker neutral           |

### Usage Examples

```jsx
// Backgrounds
<div className="bg-primary">Primary background</div>
<div className="bg-base-100">White background</div>

// Text colors
<p className="text-primary">Green text</p>
<p className="text-error">Red text</p>

// Borders
<div className="border border-accent">Yellow border</div>

// With opacity
<div className="bg-primary/50">50% opacity primary</div>
<div className="bg-accent/80">80% opacity accent</div>

// Hover states
<button className="bg-primary hover:bg-primary-focus">
  Hover me
</button>

// Dark mode (add 'dark' class to <html>)
<div className="bg-base-100 dark:bg-base-100">
  Auto switches between light/dark
</div>
```

---

## 📝 How to Add New Custom Colors

### Step 1: Add to `src/global.css`

```css
@layer base {
  :root {
    /* Add your color in RGB format (R G B) */
    --my-color: 100 200 150;
    --my-color-focus: 80 180 130; /* Optional: darker variant */
  }

  .dark {
    /* Add dark mode version */
    --my-color: 120 220 170;
    --my-color-focus: 100 200 150;
  }
}
```

**💡 Convert HEX to RGB:**

- Hex: `#64c896` → RGB: `100 200 150`
- Use: https://www.rapidtables.com/convert/color/hex-to-rgb.html
- Or VS Code color picker (hover over color)

### Step 2: Add to `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      // ... existing colors ...

      myColor: {
        DEFAULT: "rgb(var(--my-color) / <alpha-value>)",
        focus: "rgb(var(--my-color-focus) / <alpha-value>)",
      },
    },
  },
},
```

### Step 3: Use in Your Components

```jsx
<div className="bg-my-color text-white">
  Custom color background!
</div>

<button className="bg-my-color hover:bg-my-color-focus">
  Button with hover
</button>
```

---

## 🌙 Dark Mode Setup

### Enable Dark Mode

Add `dark` class to your root element:

```jsx
// In App.tsx or main layout
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      {/* Your app content */}
    </div>
  );
}
```

Or add directly to `index.html`:

```html
<html className="dark"></html>
```

---

## 📐 Add Custom Spacing

In `tailwind.config.js`:

```javascript
theme: {
  extend: {
    spacing: {
      '128': '32rem',    // Usage: w-128, h-128, p-128, m-128
      '144': '36rem',    // Usage: mt-144, mb-144
    },
  },
},
```

---

## � Google Fonts Setup (Already Configured!)

Your app now uses:

- **Body text:** Poppins (modern, clean)
- **Headings:** Playfair Display (elegant)

### Usage

```jsx
// Body text (default)
<p>This uses Poppins automatically</p>

// Force body font
<div className="font-sans">Poppins text</div>

// Headings font
<h1>Playfair Display automatically</h1>
<p className="font-display">Or use on any element</p>
```

### Change to Different Fonts

1. **Visit [Google Fonts](https://fonts.google.com/)**
2. **Select your fonts** (e.g., "Roboto", "Montserrat")
3. **Copy the `<link>` tag** from Google Fonts
4. **Replace in `index.html`:**
   ```html
   <link
     href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
     rel="stylesheet"
   />
   ```
5. **Update `tailwind.config.js`:**
   ```javascript
   fontFamily: {
     sans: ['Roboto', 'system-ui', 'sans-serif'],
   },
   ```

### Popular Font Combinations

```javascript
// Modern & Professional
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Montserrat', 'sans-serif'],
},

// Classic & Elegant
fontFamily: {
  sans: ['Lora', 'serif'],
  display: ['Cinzel', 'serif'],
},

// Bold & Playful
fontFamily: {
  sans: ['Quicksand', 'sans-serif'],
  display: ['Righteous', 'sans-serif'],
},

// Tech & Modern
fontFamily: {
  sans: ['Space Grotesk', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
},
```

---

## �📏 Add Custom Font Sizes

In `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontSize: {
      'xxs': '0.625rem',      // Usage: text-xxs
      'huge': '6rem',         // Usage: text-huge
    },
  },
},
```

---

## 📱 Add Custom Breakpoints

In `tailwind.config.js`:

```javascript
theme: {
  extend: {
    screens: {
      'xs': '475px',          // Usage: xs:text-sm
      '3xl': '1920px',        // Usage: 3xl:container
    },
  },
},
```

---

## 🎯 Tips & Best Practices

1. **Always use RGB format** for colors (not HEX) in `global.css`

   - ✅ `--color: 255 100 50`
   - ❌ `--color: #ff6432`

2. **Opacity support** - The `<alpha-value>` placeholder enables opacity utilities

   - `bg-primary/50` = 50% opacity
   - `text-accent/80` = 80% opacity

3. **Naming convention**

   - Use kebab-case in CSS: `--my-custom-color`
   - Use camelCase in Tailwind config: `myCustomColor`
   - Use kebab-case in JSX: `bg-my-custom-color`

4. **Dark mode colors** should be defined separately for better contrast

5. **Test your colors** in both light and dark mode

---

## 🔧 Configuration Files

| File                 | Purpose                                |
| -------------------- | -------------------------------------- |
| `src/global.css`     | Define color variables (RGB format)    |
| `tailwind.config.js` | Register colors for Tailwind utilities |
| `postcss.config.js`  | Process Tailwind CSS (don't modify)    |

---

## 📚 Useful Resources

- [Tailwind Colors Documentation](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind Configuration](https://tailwindcss.com/docs/configuration)
- [HEX to RGB Converter](https://www.rapidtables.com/convert/color/hex-to-rgb.html)
- [Color Palette Generator](https://coolors.co/)

---

**Need help?** Check the comments in `src/global.css` and `tailwind.config.js` for detailed instructions!
