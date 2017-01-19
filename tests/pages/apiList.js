module.exports = {
  url() {
    return `${this.api.launchUrl}/apis`;
  },
  elements: {
    main: {
      selector: '#api-list-page',
    },
  },
  commands: [{
    ssr() {
      return this.waitForElementPresent('@main').assert.visible('@main');
    },
  }],
};
