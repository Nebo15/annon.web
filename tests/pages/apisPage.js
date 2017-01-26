module.exports = {
  url() {
    return `${this.api.launchUrl}/apis`;
  },
  elements: {
    mainPageAssert: {
      selector: '#api-list-page',
    },
    editApiLink: {
      selector: '#edit-api-button-0',
    },
    apiTableList: {
      selector: '#api-table',
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
        .waitForElementPresent('@apiTableList')
        .expect.element('@apiTableList').text.to.contain(apiName);
    },
    editApi() {
      return this
        .waitForElementPresent('@editApiLink')
        .click('@editApiLink');
    },
    assertEmptyList(apiName) {
      return this
        .waitForElementPresent('@apiTableList')
        .expect.element('@apiTableList').text.to.not.contain(apiName);
    },
  }],
};
