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
    apiMethodPost: {
      selector: '#api-edit-page label:nth-child(2)',
    },
    apiMethodGet: {
      selector: '#api-edit-page label:nth-child(3)',
    },
    apiMethodDelete: {
      selector: '#api-edit-page label:nth-child(4)',
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
      selector: '#api-edit-page button[type="submit"]',
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
        .waitForElementPresent('@apiMethodPost')
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
