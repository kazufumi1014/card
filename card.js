#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");

// ─── Card Data ────────────────────────────────────────────────────────────────
const data = {
  name: "Kazufumi Watanabe",
  title: "IBM Z Engineer",
};

// ─── Layout ───────────────────────────────────────────────────────────────────
const lines = [
  chalk.bold.white(data.name),
  chalk.cyan(data.title),
];

const card = boxen(lines.join("\n"), {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "cyan",
});

console.log(card);
