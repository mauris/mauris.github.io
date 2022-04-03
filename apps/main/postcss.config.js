const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(isProd ? { cssnano: {} } : {})
  },
}
