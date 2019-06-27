import {
  makeStringFlag,
  makeBooleanFlag,
  makeNumberFlag,
  reduceFlag,
  makeCommand,
  makeStringArgument,
  makeBooleanArgument,
  makePositionalArguments
} from "marron-glace";

const stringFlag = makeStringFlag("flag1", {
  usage: "string flag",
  default: "test",
  alias: "s"
});

const booleanFlag = makeBooleanFlag("flag2", {
  usage: "boolean flag",
  default: false,
  alias: "b"
});

const numberFlag = makeNumberFlag("flag3", {
  usage: "number flag",
  alias: "n",
  default: 123
});

const flags = reduceFlag(stringFlag, booleanFlag, numberFlag);

const subFlags = reduceFlag(flags, makeNumberFlag("flag4"));

const pos1 = makeStringArgument("pos1", {
  usage: "source1"
});

const pos2 = makeBooleanArgument("pos2", {
  usage: "true/false"
});

const pos = makePositionalArguments(pos1, pos2);

const command = makeCommand({
  name: "example",
  description: "demo",
  version: "0.0.1",
  usage: "demo demo",
  flag: subFlags,
  positionalArguments: pos,
  handler: (args, flags) => {
    console.log("arg1: ", flags.flag1.value);
    console.log("arg2: ", flags.flag2.value);
    console.log("arg3: ", flags.flag3.value);

    console.log(args.pos1.value);
    console.log(args.pos2.value);
  }
});

command(process.argv.splice(2));
