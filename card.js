#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const readline = require("readline");

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

// ─── Social Menu ──────────────────────────────────────────────────────────────
const menuItems = [
  { label: "GitHub",    url: "https://github.com/dummy" },
  { label: "Instagram", url: "https://instagram.com/dummy" },
];

let selectedIndex = 0;
let menuRendered = false;

function renderMenu() {
  if (menuRendered) {
    // 1 header + items + 1 hint line
    readline.moveCursor(process.stdout, 0, -(menuItems.length + 2));
    readline.clearScreenDown(process.stdout);
  }
  console.log(chalk.bold.white("Open a link:"));
  menuItems.forEach((item, i) => {
    if (i === selectedIndex) {
      const line = ` ▶ ${item.label} `;
      console.log(chalk.bgCyan.black.bold(line));
    } else {
      console.log(chalk.white(`   ${item.label}`));
    }
  });
  console.log(chalk.gray("  ↑↓ navigate   Enter open   q quit"));
  menuRendered = true;
}

function cleanup() {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }
  process.stdin.pause();
}

async function openUrl(url) {
  try {
    const { default: open } = await import("open");
    await open(url);
  } catch (err) {
    console.error(chalk.red(`\nFailed to open URL: ${err.message}`));
  }
}

function handleKeypress(str, key) {
  if (!key) return;

  if (key.ctrl && key.name === "c") {
    cleanup();
    process.exit(0);
  }
  if (key.name === "q") {
    cleanup();
    process.exit(0);
  }
  if (key.name === "up") {
    selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
    renderMenu();
  }
  if (key.name === "down") {
    selectedIndex = (selectedIndex + 1) % menuItems.length;
    renderMenu();
  }
  if (key.name === "return") {
    openUrl(menuItems[selectedIndex].url);
  }
}

function setupKeyListener() {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("keypress", handleKeypress);
}

// ─── Entry Point ──────────────────────────────────────────────────────────────
if (process.stdout.isTTY) {
  renderMenu();
  setupKeyListener();
}
