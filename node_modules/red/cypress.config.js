const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    CYPRESS_CRASH_REPORTS: 0,
  },
  component: {
    setupNodeEvents(on) {
      require('cypress-terminal-report/src/installLogsPrinter')(on);
    },

    excludeSpecPattern: "**/node_modules/**",
    fixturesFolder: false,
    video: false,
    devServer: {
      framework: "react",
      bundler: "webpack"
    }
  }
});
