module.exports = {
  'apis ssr test': (client) => {
    client.page.apisPage().navigate().ssr();
  },
  'create API test': (client) => {
    client.page.createPage().navigate().createApis('fsddsf');
  },
  after: (client) => {
    client.end();
  },
};
