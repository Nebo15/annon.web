module.exports = {
  'apis ssr test': (client) => {
    client.page.apisPage().navigate().apisList();
  },
  'create ssr test': (client) => {
    client.page.createPage().navigate().createApiSSR();
  },
  'requests ssr test': (client) => {
    client.page.requestsPage().navigate().requestsListSSR();
  },
  after: (client) => {
    client.end();
  },
};
