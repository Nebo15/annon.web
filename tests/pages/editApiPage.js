module.exports = {
  elements: {
    editPageAssert: {
      selector: '#api-edit-page',
    },
    deleteApiButton: {
      selector: 'button[type="button"]',
    },
    confirmDeleteButton: {
      selector: '#popup-confirm-ok',
    },
    cancelDeleteButton: {
      selector: '#popup-confirm-cancel',
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
    saveForm: {
      selector: '#api-edit-page button[type="submit"]',
    },
    addPluginButton: {
      selector: '#add-plugin-button',
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
        .waitForElementVisible('@cancelDeleteButton')
        .click('@confirmDeleteButton');
    },
    addPlugins() {
      return this
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    editAPI({ api, host, port, path }) {
      return this
        .waitForElementPresent('@apiNameInput')
        .clearValue('@apiNameInput')
        .setValue('@apiNameInput', api)
        .waitForElementPresent('@apiMethodDelete')
        .click('@apiMethodDelete')
        .setValue('@hostInput', host)
        .setValue('@portInput', port)
        .setValue('@pathInput', path)
        .click('@saveForm');
    },
  }],
};
