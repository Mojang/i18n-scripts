#!/usr/bin/env node
if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) < 10.12) {
  console.log(
`
\x1b[1m\x1b[31mNode ${process.version} not supported by this script, please update nodejs.

Aborting!\x1b[0m
`
  )
  return;
}

const fs = require("fs");
const po2json = require("po2json");
const opts = { encoding: "utf8" };

let filenamesMap = {};
let successful = 0;
let argv = require("minimist")(process.argv.slice(2));
const outFolder = argv['o'] || `/static/translations/`;
const lowercase = argv['lowercase'];
const fixPercentage = argv['fix-percentage'];
const filenamesMapPath = argv['filenamesMap'];

fs.mkdirSync(`${process.cwd()}${outFolder}`, { recursive: true });

if (filenamesMapPath) {
  let rawdata = fs.readFileSync(filenamesMapPath);
  filenamesMap = JSON.parse(rawdata);
}

fs.readdir(`${process.cwd()}/locale/`, (err, locales) => {
  console.log(
    `🍉  \x1b[1m\x1b[34mGenerating json files for ${
      locales.length
    } locales\x1b[0m`
  );

  locales.map(generateJsonForLocale);

  console.log(
    `\x1b[1m\x1b[37m\n${successful} json files for ${
      locales.length
    }\x1b[32m locates successfully generated \x1b[0m`
  );
});

function trimLinebreaksFromKeys(transObj) {
  const parsedJson = JSON.parse(transObj);
  if (
    !parsedJson ||
    !parsedJson.locale_data ||
    !parsedJson.locale_data.messages
  ) {
    return transObj;
  }
  parsedJson.locale_data.messages = Object.keys(
    parsedJson.locale_data.messages
  ).reduce((prev, key) => replaceLineBreaksInKey(prev, key, parsedJson), {});
  return JSON.stringify(parsedJson, null, 2);
}

function replaceLineBreaksInKey(prev, key, parsedJson) {
  const newkey = key.replace(/(\n|\r)/g, " ").replace(/\s{2,}/g, " ");
  prev[newkey] = parsedJson.locale_data.messages[key];
  return { ...prev };
}

function percentageFix(text) {
  return text.replace(/(?!%[0-9]{1,2}\$s)%/g, '%%');
}

function generateJsonForLocale(locale) {
  let input = fs.readFileSync(
    `${process.cwd()}/locale/${locale}/${locale}.po`,
    opts
  );

  if (fixPercentage) {
    input = percentageFix(input);
  }

  const jsonData = trimLinebreaksFromKeys(
    po2json.parse(input, {
      format: "jed",
      pretty: true,
      stringify: true
    })
  );

  const filenames = filenamesMapPath && filenamesMap[locale] || [locale];
  filenames.map(filename => {
    fs.writeFileSync(
      `${process.cwd()}${outFolder}${lowercase ? filename.toLowerCase() : filename}.json`,
      jsonData,
      opts
    );
    successful++;
  })
}
