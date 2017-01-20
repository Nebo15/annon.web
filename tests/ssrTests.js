module.exports = {
  'apis ssr test': (client) => {
    client.page.apisPage().navigate();
    client.page.apisPage().apisList();
  },
  'create ssr test': (client) => {
    client.page.createPage().navigate();
    client.page.createPage().createApiSSR();
  },
  'requests ssr test': (client) => {
    client.page.requestsPage().navigate();
    client.page.requestsPage().requestsListSSR();
  },
  after: (client) => {
    client.end();
  },
};
