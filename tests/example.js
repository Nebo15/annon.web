module.exports = {
  // before: client => ,
  'Server-side rendering': (client) => {
    client.page.examplePage().navigate().ssr();
    client.end();
  },
};
