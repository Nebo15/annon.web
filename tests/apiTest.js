
import faker from 'faker';

module.exports = {
  'create/edit/delete API test': (client) => {
    const apiName = faker.lorem.words(1);
    const hostName = faker.lorem.words(1);
    const editApiName = faker.lorem.words(1);
    const editHostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi();
    client.page.editApiPage().assertEditPage().editAPI({
      api: editApiName,
      host: editHostName,
      port: '8086',
      path: 'edit/eddd',
    });
    client.page.apisPage().apisList().assertNewApi(editApiName);
    client.page.apisPage().editApi();
    client.page.editApiPage().assertEditPage();
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  after: (client) => {
    client.end();
  },
};
