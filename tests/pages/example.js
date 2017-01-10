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
    searchMain() {
      return this.waitForElementPresent('@main').assert.visible('@main');
    },
  }],
};
