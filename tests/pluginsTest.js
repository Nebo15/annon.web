
import faker from 'faker';

module.exports = {
  'add/delete Idempotency plugin test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().addPlugins();
    client.page.pluginsPage().assertPluginsPage().selectPlugins('Idempotency').enableIdempotencyPlugin();
    client.page.editApiPage().assertPluginsInList('idempotency');
    client.page.editApiPage().editPluginLink();
    client.page.pluginsPage().deletePlugins();
    client.pause(1000);
    client.page.pluginsPage().confirmDeletePlugins();
    client.page.editApiPage().assertPluginsEmptyList('idempotency');
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  'add ACL plugin test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);
    const aclPath = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().addPlugins();
    client.page.pluginsPage().assertPluginsPage().selectPlugins('ACL').enableACLPlugin(aclPath);
    client.page.editApiPage().assertPluginsInList('acl');
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  'add proxy plugin test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().addPlugins();
    client.page.pluginsPage().assertPluginsPage().selectPlugins('Proxy').enableProxyPlugin({
      host: 'furman.com',
      port: '1111',
      path: '/testsdsds',
    });
    client.page.editApiPage().assertPluginsInList('proxy');
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  'add JWT plugin test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().addPlugins();
    client.page.pluginsPage().assertPluginsPage().selectPlugins('JWT').enableJWTPlugin('vdvtqmbfqu3k244019m8ag3kt8ade9ao');
    client.page.editApiPage().assertPluginsInList('jwt');
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  'add IP restriction plugin test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().addPlugins();
    client.page.pluginsPage().assertPluginsPage().selectPlugins('IPrestriction').enableIPPlugin('127.0.0.5');
    client.page.editApiPage().assertPluginsInList('ip_restriction');
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  after: (client) => {
    client.end();
  },
};
