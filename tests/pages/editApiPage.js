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
  }],
};
