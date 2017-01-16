module.exports = {
  url() {
    return `${this.api.launchUrl}/example`;
  },
  elements: {
    main: {
      selector: '#example-page',
    },
  },
  commands: [{
    ssr() {
      return this.waitForElementPresent('@main').assert.visible('@main');
    },
  }],
};
