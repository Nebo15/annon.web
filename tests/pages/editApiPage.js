module.exports = {
  elements: {
    editPageAssert: {
      selector: '#api-edit-page',
    },
    deleteApiButton: {
      selector: 'button[type="button"]',
    },
    confirmDeleteButton: {
      selector: '#api-edit-page button:nth-child(2)',
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
    saveForm: {
      selector: 'button[type="submit"]:nth-child(8)',
    },
  },
  commands: [{
    assertEditPage() {
      return this
        .waitForElementPresent('@editPageAssert')
        .assert.visible('@editPageAssert');
    },
    deleteApis() {
      return this
        .waitForElementPresent('@deleteApiButton')
        .click('@deleteApiButton')
        .waitForElementPresent('@confirmDeleteButton')
        .click('@confirmDeleteButton')
        .click('@confirmDeleteButton');
    },
    editAPI({ api, host, port, path }) {
      return this
        .waitForElementPresent('@apiNameInput')
        .clearValue('@apiNameInput')
        .setValue('@apiNameInput', api)
        .waitForElementPresent('@apiMethodPut')
        .click('@apiMethodPut')
        .click('@apiMethodDelete')
        .setValue('@hostInput', host)
        .setValue('@portInput', port)
        .setValue('@pathInput', path)
        .click('@saveForm');
    },
  }],
};
