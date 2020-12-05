module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true, // TODO: to check what are these two flags
  },
  purge: {
    mode: 'layers',
    layers: ['utilities'], //
    content: [
      './src/**/*.js',
      './src/**/*.html',
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
