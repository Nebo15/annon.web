module.exports = {
  url() {
    return `${this.api.launchUrl}/apis`;
  },
  elements: {
    mainPageAssert: {
      selector: '#api-list-page',
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
    editApi(apiName) {
      return this
        .waitForElementPresent(`#edit-api-button-${apiName}`)
        .click(`#edit-api-button-${apiName}`);
    },
    assertEmptyList(apiName) {
      return this
        .waitForElementPresent('@apiTableList')
        .expect.element('@apiTableList').text.to.not.contain(apiName);
    },
  }],
};
