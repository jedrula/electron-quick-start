var ip = require("ip");
const fs = require('fs').promises;

async function build() {
  const globalContents = `
    window.localIp = "${ip.address()}";
  `
  await fs.writeFile('global.js', globalContents);
}


build();