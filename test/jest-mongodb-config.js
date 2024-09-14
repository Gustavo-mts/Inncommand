module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '4.0.3', // A versão do MongoDB que será usada para testes
        skipMD5: true,
      },
      autoStart: false,
      instance: {
        dbName: 'hotel-test',
      },
    },
  };
  