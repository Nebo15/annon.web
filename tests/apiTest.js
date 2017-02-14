
import faker from 'faker';

module.exports = {
  'create/edit/delete API test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);
    const editApiName = faker.name.firstName();
    const editHostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().assertEditPage().editAPI({
      api: editApiName,
      host: editHostName,
      port: '8086',
      path: 'edit/eddd',
    });
    client.page.apisPage().apisList().assertNewApi(editApiName);
    client.page.apisPage().editApi(editApiName);
    client.page.editApiPage().assertEditPage();
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(editApiName);
  },
  'try create dublicate API name test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.editApiPage().assertErrorCreateApi();
    client.page.apisPage().navigate();
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().deleteApis();
    client.pause(1000);
    client.page.editApiPage().confirmDeleteApis();
    client.page.apisPage().apisList().assertEmptyList(apiName);
  },
  'try create/edit API and don\'t save changes popup test': (client) => {
    const apiName = faker.name.firstName();
    const hostName = faker.lorem.words(1);
    const editApiName = faker.name.firstName();
    const editHostName = faker.lorem.words(1);

    client.page.createPage().navigate().createApis({
      api: apiName,
      host: hostName,
      port: '9091',
      path: 'test/test',
    });
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
    client.page.editApiPage().assertEditPage().editAPIwithoutSave({
      api: editApiName,
      host: editHostName,
      port: '8086',
      path: 'edit/eddd',
    });
    client.page.editApiPage().saveChangesPopupAssert();
    client.pause(500);
    client.page.editApiPage().assertPopup();
    client.page.apisPage().navigate();
    client.page.apisPage().apisList().assertNewApi(apiName);
    client.page.apisPage().editApi(apiName);
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
