module.exports = {
  url() {
    return `${this.api.launchUrl}/apis`;
  },
  elements: {
    mainPageAssert: {
      selector: '#api-list-page',
    },
    editApiLink: {
      selector: '#edit-api-button',
    },
    addPluginButton: {
      selector: '#add-plugin-button',
    },
  },
  commands: [{
    apisList() {
      return this
        .waitForElementPresent('@mainPageAssert')
        .assert.visible('@mainPageAssert');
    },
    assertNewApi(apiName) {
      return this
        .waitForElementPresent('@mainPageAssert')
        .expect.element('@mainPageAssert').text.to.contain(apiName);
    },
    editApi() {
      return this
        .waitForElementPresent('@editApiLink')
        .click('@editApiLink');
    },
    addPlugins() {
      return this
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    assertEmptyList(apiName) {
      return this
        .waitForElementPresent('@mainPageAssert')
        .expect.element('@mainPageAssert').text.to.not.contain(apiName);
    },
  }],
};
