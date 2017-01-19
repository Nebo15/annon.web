module.exports = {
  // before: client => ,
  'Server-side rendering': (client) => {
    client.page.apiList().navigate().ssr();
    client.end();
  },
};
