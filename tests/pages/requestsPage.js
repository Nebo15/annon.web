module.exports = {
  url() {
    return `${this.api.launchUrl}/requests`;
  },
  elements: {
    requestsListAssert: {
      selector: '#request-list-page',
    },
  },
  commands: [{
    requestsListSSR() {
      return this
        .waitForElementPresent('@requestsListAssert')
        .assert.visible('@requestsListAssert');
    },
  }],
};
