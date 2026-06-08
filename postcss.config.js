import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Indicăm explicit calea către tailwind.config.js, ca să funcționeze
// indiferent de directorul curent (cwd) din care e pornit serverul.
const here = dirname(fileURLToPath(import.meta.url))

export default {
  plugins: [tailwindcss({ config: join(here, 'tailwind.config.js') }), autoprefixer()],
}
