import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Căi absolute (posix) ca scanarea conținutului să funcționeze indiferent de cwd.
const here = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [`${here}/index.html`, `${here}/src/**/*.{js,jsx}`],
  theme: {
    extend: {
      colors: {
        // Accent „chihlimbar" (gold/amber rafinat, fără neon)
        accent: {
          50: '#fbf6ea',
          100: '#f6eccf',
          200: '#eed79e',
          300: '#e6c66f',
          400: '#ddb44c',
          500: '#d29e34',
          600: '#b9842a',
          700: '#946325',
          800: '#6f4a20',
          900: '#4d341a',
        },
        // Accent secundar discret (smarald domol) pt. detalii
        moss: {
          300: '#8fd3ad',
          400: '#5cba88',
          500: '#3f9d6c',
        },
        // Fundal antracit (nu negru) — contraste blânde
        ink: {
          950: '#15171c',
          900: '#191c22',
          850: '#1e222a',
          800: '#242934',
          700: '#2f3543',
          600: '#3c4351',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        // „glow" mult mai discret, cald, fără neon
        glow: '0 0 0 1px rgba(221,180,76,0.20), 0 10px 36px -14px rgba(221,180,76,0.25)',
        card: '0 12px 40px -18px rgba(0,0,0,0.55)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-7px)' },
          '80%': { transform: 'translateX(7px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        pop: 'pop 0.35s ease-out',
        floaty: 'floaty 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
