global.__publicdir = `${__dirname}/public`;
global.__imagedir = `${__publicdir}/images`;

const app = require("./server/app");
const { PORT } = require("./server/config");

app.listen(PORT, () => {
  console.log(`Welcome to my app in port ${PORT}`);
});
