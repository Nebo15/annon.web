module.exports = {
  elements: {
    pluginsPageAssert: {
      selector: '#plugin-create-page',
    },
    selectPlugin: {
      selector: '#add-plugin-dropdown',
    },
    selectPluginIdempotency: {
      selector: '#add-plugin-dropdown li:nth-child(5)',
    },
    selectPluginACL: {
      selector: '#add-plugin-dropdown li:nth-child(3)',
    },
    selectPluginProxy: {
      selector: '#add-plugin-dropdown li:nth-child(1)',
    },
    selectPluginJWT: {
      selector: '#add-plugin-dropdown li:nth-child(2)',
    },
    addPluginButton: {
      selector: '#plugins-button-add',
    },
    deletePluginButton: {
      selector: '#plugins-button-delete',
    },
    confirmDeletePluginButton: {
      selector: '#popup-confirm-ok',
    },
    cancelDeletePluginButton: {
      selector: '#popup-confirm-cancel',
    },
    aclPOSTMethodSelect: {
      selector: '#acl-plugin-chechboxes0 label:nth-child(1) span:nth-child(2)',
    },
    aclPathInput: {
      selector: 'input[name="settings.rules[0].path"]',
    },
    scopesSelect: {
      selector: '#acl-plugin-scopes0 label:nth-child(1) span:nth-child(2)',
    },
  },
  commands: [{
    assertPluginsPage() {
      return this
        .waitForElementPresent('@pluginsPageAssert')
        .assert.visible('@pluginsPageAssert');
    },
    selectPlugins(plugin) {
      return this
        .waitForElementPresent('@selectPlugin')
        .click('@selectPlugin')
        .waitForElementPresent('@selectPluginProxy')
        .click(`@selectPlugin${plugin}`);
    },
    enableIdempotencyPlugin() {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .click('@addPluginButton');
    },
    deletePlugins() {
      return this
        .waitForElementPresent('@deletePluginButton')
        .click('@deletePluginButton')
        .waitForElementPresent('@confirmDeletePluginButton')
        .waitForElementVisible('@cancelDeletePluginButton')
        .click('@confirmDeletePluginButton');
    },
    enableACLPlugin(path) {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .click('@addPluginButton')
        .waitForElementPresent('@aclPOSTMethodSelect')
        .click('@aclPOSTMethodSelect')
        .setValue('@aclPathInput', path)
        .click('@scopesSelect')
        .click('@addPluginButton');
    },
  }],
};
