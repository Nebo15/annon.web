module.exports = {
  url() {
    return `${this.api.launchUrl}/apis`;
  },
  elements: {
    mainPageAssert: {
      selector: '#api-list-page',
    },
  },
  commands: [{
    ssr() {
      return this
        .waitForElementPresent('@mainPageAssert')
        .assert.visible('@mainPageAssert');
    },
  }],
};
