import * as ipfs from "ipfs-core";

(async () => {
  const node = await ipfs.create();

  const data = "Hello, <YOUR NAME HERE>";

  // add your data to to IPFS - this can be a string, a Buffer,
  // a stream of Buffers, etc
  const results = await node.add(data);

  // CID (Content IDentifier) uniquely addresses the data
  // and can be used to get it again.
  console.log(results.cid.toString());

  await node.stop();
})();
