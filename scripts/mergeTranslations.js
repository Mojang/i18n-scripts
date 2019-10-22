#!/usr/bin/env node

const fs = require("fs");
const { spawn } = require("child_process");
const localePath = `${process.cwd()}/locale`;
const outputs = {
  success: [],
  errors: []
};

fs.readdir(`${localePath}/`, (err, locales) => {
  if (err) {
    console.log(
      `\x1b[1m\x1b[37mError reading dir \x1b[31m${localePath}\x1b[0m`
    );
    return;
  }
  console.log(
    `💗  \x1b[1m\x1b[34mRunning msgmerge on ${locales.length} locales \x1b[0m`
  );
  locales.map((locale, i) => {
    outputs[locale] = {};
    const localeFile = `${localePath}/${locale}/${locale}.po`;
    const templateFile = `${process.cwd()}/messages.pot`;
    const args = [localeFile, templateFile, "--no-wrap", "-o", localeFile];
    const msgmerge = spawn("msgmerge", args);
    msgmerge.stderr.on("data", data => {
      if (`${data}`.match(/^.+$/)) {
        return;
      }
      if (`${data}`.includes("done.\n")) {
        outputs["success"].push({ locale });
      } else {
        outputs["errors"].push({ locale, data });
      }
    });
    msgmerge.stdout.on("close", () => {
      if (i < locales.length - 1) {
        return;
      }
      log(outputs.success, locales, "successful", `\x1b[32m`, o => o.locale);
      if (outputs.errors.length === 0) {
        return;
      }
      log(
        outputs.errors,
        locales,
        "unsuccessful",
        "\x1b[31m",
        o => `${o.locale} ${o.data}`
      );
    });
  });
});

function log(arr, locales, message, color, mapper) {
  console.log(
    `\x1b[1m\x1b[37m\n${arr.length}/${
      locales.length
    } ${color}${message} \x1b[0mmerges (${arr.map(mapper)})`
  );
}
