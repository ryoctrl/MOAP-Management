module.exports = {
  apps : [
      {
          name: "MOAP-Management",
          script: "npm",
          args: "start",
          env: {
              PORT: 9252,
              REACT_APP_API_HOST: 'https://moap-api.mosin.jp/'
          }
      }
  ]
};
