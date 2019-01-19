module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', './node_modules/prettier-stylelint/config.js'],
  rules  : {
    'max-line-length'                              : null,
    'font-family-no-missing-generic-family-keyword': null,
    'at-rule-no-unknown'                           : null,
    'scss/at-rule-no-unknown'                      : true,
  },
}
