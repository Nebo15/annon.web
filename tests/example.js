module.exports = {
  // before: client => ,
  'Server-side rendering': (client) => {
    client.end();
  },
};
