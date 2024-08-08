import yargs from "yargs";

yargs()
  .command(
    "page",
    "generate page",
    (yargs) => yargs,
    function () {
      import("./generate_list_page").then((x) => x.default());
    }
  )
  .command(
    "fork-sync",
    "fork sync",
    (yargs) => yargs,
    function () {
      import("./fork_sync").then((x) => x.default());
    }
  )
  .demandCommand(1)
  .recommendCommands()
  .parse(process.argv.splice(2));
