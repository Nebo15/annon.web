
import faker from 'faker';

module.exports = {
  'add Idempotency plugin test': (client) => {
    const apiName = faker.lorem.words(1);
    const hostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi();
    client.page.editApiPage().addPlugins();
    client.page.pluginsPage().assertPluginsPage(); // TODO
  },
  after: (client) => {
    client.end();
  },
};
