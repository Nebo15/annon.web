module.exports = {
  // before: client => ,
  'Server-side rendering': (client) => {
    client.page.example().navigate().ssr();
    client.end();
  },
};
