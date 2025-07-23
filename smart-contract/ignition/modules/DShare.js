const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DShareModule", (m) => {
  const dshare = m.contract("DShare");
  return { dshare };
});