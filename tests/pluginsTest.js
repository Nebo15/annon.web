
import faker from 'faker';

module.exports = {
  'add/delete Idempotency plugin test': (client) => {
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
    client.page.pluginsPage().assertPluginsPage().selectPlugins('Idempotency').enableIdempotencyPlugin();
    client.page.editApiPage().assertPluginsInList('idempotency');
    client.page.editApiPage().editPluginLink();
    client.page.pluginsPage().deletePlugins();
    client.page.editApiPage().assertPluginsEmptyList('idempotency');
    client.page.editApiPage().deleteApis();
    client.page.apisPage().apisList();
  },
  after: (client) => {
    client.end();
  },
};
