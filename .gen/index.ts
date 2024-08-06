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
  .demandCommand(1)
  .recommendCommands()
  .parse(process.argv.splice(2));
