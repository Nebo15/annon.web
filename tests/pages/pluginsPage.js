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
    selectPluginIPrestriction: {
      selector: '#add-plugin-dropdown li:nth-child(6)',
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
    proxyHostInput: {
      selector: 'input[name="settings.host"]',
    },
    proxyPortInput: {
      selector: 'input[name="settings.port"]',
    },
    proxyPathInput: {
      selector: 'input[name="settings.path"]',
    },
    ipAdressInput: {
      selector: 'input[name="settings.whitelist[0]"]',
    },
    jwtSignatureInput: {
      selector: 'input[name="settings.signature"]',
    },
    selectIPFieldInput: {
      selector: '#plugin-ip-restriction-form button[type="button"]',
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
    enableProxyPlugin({ host, port, path }) {
      return this
        .waitForElementPresent('@proxyHostInput')
        .waitForElementVisible('@proxyHostInput')
        .setValue('@proxyHostInput', host)
        .setValue('@proxyPortInput', port)
        .setValue('@proxyPathInput', path)
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    enableJWTPlugin(signature) {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .setValue('@jwtSignatureInput', signature)
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
    enableIPPlugin(ip) {
      return this
        .waitForElementPresent('@addPluginButton')
        .waitForElementVisible('@addPluginButton')
        .click('@selectIPFieldInput')
        .setValue('@ipAdressInput', ip)
        .waitForElementPresent('@addPluginButton')
        .click('@addPluginButton');
    },
  }],
};
