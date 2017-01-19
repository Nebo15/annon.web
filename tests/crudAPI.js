module.exports = {
  'apis ssr test': (client) => {
    client.page.apisPage().navigate();
    client.page.apisPage().ssr();
  },
  'create API test': (client) => {
    client.page.createPage().navigate();
    client.page.createPage().createApis('fsddsf');
  },
  after: (client) => {
    client.end();
  },
};
