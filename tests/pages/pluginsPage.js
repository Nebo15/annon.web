module.exports = {
  elements: {
    pluginsPageAssert: {
      selector: '#plugin-create-page',
    },
  },
  commands: [{
    assertPluginsPage() {
      return this
        .waitForElementPresent('@pluginsPageAssert')
        .assert.visible('@pluginsPageAssert');
    },
  }],
};
