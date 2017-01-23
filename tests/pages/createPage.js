module.exports = {
  url() {
    return `${this.api.launchUrl}/apis/create`;
  },
  elements: {
    createApiAssert: {
      selector: '#api-edit-page',
    },
    apiNameInput: {
      selector: 'input[name="name"]',
    },
    apiMethodPut: {
      selector: 'label:nth-child(1) > span:nth-child(2) > i:nth-child(1)',
    },
    apiMethodPost: {
      selector: 'label:nth-child(2) > span:nth-child(2) > i:nth-child(1)',
    },
    apiMethodGet: {
      selector: 'label:nth-child(3) > span:nth-child(2) > i:nth-child(1)',
    },
    apiMethodDelete: {
      selector: 'label:nth-child(4) > span:nth-child(2) > i:nth-child(1)',
    },
    hostInput: {
      selector: 'input[name="request.host"]',
    },
    portInput: {
      selector: 'input[name="request.port"]',
    },
    pathInput: {
      selector: 'input[name="request.path"]',
    },
    submitForm: {
      selector: 'button[type="submit"]',
    },
  },
  commands: [{
    createApiSSR() {
      return this
        .waitForElementPresent('@createApiAssert')
        .assert.visible('@createApiAssert');
    },
    createApis({ api, host, port, path }) {
      return this
        .waitForElementPresent('@createApiAssert')
        .assert.visible('@createApiAssert')
        .waitForElementPresent('@apiNameInput')
        .setValue('@apiNameInput', api)
        .waitForElementPresent('@apiMethodPut')
        .click('@apiMethodPut')
        .click('@apiMethodPost')
        .click('@apiMethodGet')
        .click('@apiMethodDelete')
        .setValue('@hostInput', host)
        .setValue('@portInput', port)
        .setValue('@pathInput', path)
        .click('@submitForm');
    },
  }],
};
