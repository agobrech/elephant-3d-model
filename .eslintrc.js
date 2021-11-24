module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:tailwindcss/recommended'
  ],
  plugins: [
    'tailwindcss'
  ],
  // add your custom rules here
  rules: {}
}
