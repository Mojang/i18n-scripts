#!/usr/bin/env node

const gettextParser = require("gettext-parser");
const fs = require("fs");
const options = {
  encoding: "UTF-8",
};

const input = fs.readFileSync(
  process.cwd() + "/locale/en-US/en-US.po",
  options
);
const po = gettextParser.po.parse(input);

const newPo = {
  ...po,
  translations: { "": populateEmptyValues(po.translations[""]) },
};

const compiledEnUs = gettextParser.po.compile(newPo);

fs.writeFile(
  process.cwd() + "/locale/en-US/en-US.po",
  compiledEnUs,
  options,
  () => {
    compiledEnUs.toString();
  }
);

function populateEmptyValues(obj) {
  let updatedTexts = 0;
  console.log(`🌈  \x1b[1m\x1b[34mUpdating english translations \x1b[0m`);

  const result = Object.entries(obj).reduce((acc, entry) => {
    const key = entry[0];
    const value = entry[1];
    const msgstr = value.msgstr;
    const needsUpdate = key !== "" && msgstr && msgstr[0] === "";
    const newValue = needsUpdate
      ? { ...value, msgstr: [value.msgid] }
      : { ...value };

    if (needsUpdate) {
      console.log(`\x1b[1m\x1b[37mAdding text:\x1b[0m ${newValue.msgstr}`);
      updatedTexts++;
    }
    return { ...acc, [key]: newValue };
  }, {});
  console.log(`\x1b[1m\x1b[37mAdded ${updatedTexts} text(s)\x1b[0m`);
  return result;
}
