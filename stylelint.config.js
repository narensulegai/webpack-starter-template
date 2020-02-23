module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'extends',
        'ignores',
      ],
    }],
    'number-leading-zero': null,
  },
};
