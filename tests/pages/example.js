module.exports = {
  url() {
    return `${this.api.launchUrl}/`;
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
