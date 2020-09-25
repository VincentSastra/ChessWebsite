const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        // https://coolors.co/22223b-4a4e69-726d81-9a8c98-c6bbbe-f2e9e4
        customizeTheme: {
          '@text-color': '#726D81',
          '@primary-color': '#22223B',
        },
      },
    },
  ],
};
