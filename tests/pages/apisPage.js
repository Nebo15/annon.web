module.exports = {
  url() {
    return `${this.api.launchUrl}/apis`;
  },
  elements: {
    mainPageAssert: {
      selector: '#api-list-page',
    },
    editApiLink: {
      selector: '#api-list-page div:nth-child(1)',
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
    assertEmptyList(apiName) {
      return this
        .waitForElementPresent('@mainPageAssert')
        .expect.element('@mainPageAssert').text.to.not.contain(apiName);
    },
  }],
};
