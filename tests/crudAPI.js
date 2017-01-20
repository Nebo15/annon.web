
// import faker from 'faker';

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
  // 'create/delete API test': (client) => {
  //   const apiName = faker.lorem.words(1);
  //   const hostName = faker.lorem.words(1);
  //
  //   client.page.createPage().navigate();
  //   client.page.createPage().createApis({
  //     api: apiName,
  //     host: hostName,
  //     port: '9091',
  //     path: 'test/test',
  //   });
  //   client.page.apisPage().apisList();
  //   client.page.apisPage().assertNewApi(apiName);
  //   client.page.apisPage().editApi();
  //   client.page.editApiPage().assertEditPage();
  //   client.page.editApiPage().deleteApis();
  //   client.page.apisPage().apisList();
  //   client.page.apisPage().assertEmptyList(apiName);
  // },
  after: (client) => {
    client.end();
  },
};
