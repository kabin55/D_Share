// ipfs.js or inside server.js

import { create } from 'ipfs-http-client';

// Connect to local Kubo node
const ipfs = create({
  host: '127.0.0.1',
  port: 5001,
  protocol: 'http'
});

export default ipfs;
