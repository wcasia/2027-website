function mediaRangeToMinWidth(root) {
  root.walkAtRules('media', (rule) => {
    rule.params = rule.params
      .replace(/\(\s*width\s*>=\s*([^)]+)\)/g, '(min-width: $1)')
      .replace(/\(\s*width\s*<=\s*([^)]+)\)/g, '(max-width: $1)')
      .replace(/\(\s*width\s*>\s*([^)]+)\)/g, '(min-width: calc($1 + 1px))')
      .replace(/\(\s*width\s*<\s*([^)]+)\)/g, '(max-width: calc($1 - 1px))');
  });
}

module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),
    mediaRangeToMinWidth,
    require('postcss-nesting')(),
    require('postcss-custom-properties')({ preserve: false })
  ]
}
