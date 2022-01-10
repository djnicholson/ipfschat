import * as ipfs from "ipfs-core";
import * as readline from "readline";
import { stdin as input, stdout as output } from "process";

const TOPIC = "FB79F977-5676-488E-890F-9830C4831262";

const message = (m: string) => Buffer.from(m, "ascii");

const getLine: (rl: readline.Interface, question: string) => Promise<string> = (
  rl: readline.Interface,
  question: string
) => new Promise((resolve) => rl.question(question, resolve));

(async () => {
  const rl = readline.createInterface({ input, output });

  const node = await ipfs.create();

  const id = await node.id();
  console.log("My ID is: " + id.id);

  await node.pubsub.subscribe(TOPIC, (_) => {
    console.log(`${_.from}: ${_.data.toString()}`);
  });

  setInterval(
    async () => console.log("peers: " + (await node.pubsub.peers(TOPIC))),
    10000
  );

  // eslint-disable-next-line no-constant-condition
  while (true) {
    node.pubsub.publish(TOPIC, message(await getLine(rl, "")));
  }
})();
