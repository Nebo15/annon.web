module.exports = {
  url() {
    return `${this.api.launchUrl}/apis/create`;
  },
  elements: {
    createApiAssert: {
      selector: '#api-create-page',
    },
    apiNameInput: {
      selector: 'input[name="name"]',
    },
  },
  commands: [{
    createApis(name) {
      return this
        .waitForElementPresent('@createApiAssert')
        .assert.visible('@createApiAssert')
        .waitForElementPresent('@apiNameInput')
        .setValue('@apiNameInput', name);
    },
  }],
};
