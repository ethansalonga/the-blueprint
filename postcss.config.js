import postcssPresetEnv from "postcss-preset-env"
import precss from "precss"
import postcssNested from "postcss-nested"
import postcssImport from "postcss-import"
import tailwindCSS from "tailwindcss"
import autoprefixer from "autoprefixer"

export default {
  plugins: [
    postcssPresetEnv({
      stage: 1,
    }),
    precss,
    postcssNested,
    postcssImport,
    tailwindCSS,
    autoprefixer,
  ],
}
