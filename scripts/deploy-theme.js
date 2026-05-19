#!/usr/bin/env node
/**
 * Deploy theme to Shopify using the Admin API directly.
 * Usage: node scripts/deploy-theme.js
 * Requires env: SHOPIFY_CLI_PASSWORD (Theme Access password)
 */

import { readdirSync, statSync, readFileSync } from "fs";
import { join, relative } from "path";
import { createHash } from "crypto";

const STORE = "discount-mattress-4.myshopify.com";
const THEME_ID = process.env.SHOPIFY_LIVE_THEME_ID;
const TOKEN = process.env.SHOPIFY_CLI_PASSWORD;
const API_VERSION = "2026-01";
const ROOT = process.cwd();
const EXCLUDE = new Set([
  ".git", "node_modules", "scripts", "data", "docs", ".github",
  "README.md", ".gitignore", "AGENTS.md", "CLAUDE.md", "PRD.md",
  "shopify.app.toml", "package.json", "package-lock.json",
]);

const THEME_DIRS = new Set(["assets", "sections", "snippets", "templates", "layout", "config", "blocks", "locales"]);

if (!TOKEN) {
  console.error("❌ SHOPIFY_CLI_PASSWORD not set");
  process.exit(1);
}

if (!THEME_ID) {
  console.error("❌ SHOPIFY_LIVE_THEME_ID not set");
  process.exit(1);
}

async function graphql(query, variables = {}) {
  const url = `https://${STORE}/admin/api/${API_VERSION}/graphql.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) throw new Error(JSON.stringify(data.errors));
  return data;
}

async function rest(method, path, body = null) {
  const url = `https://${STORE}/admin/api/${API_VERSION}${path}`;
  const opts = {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN },
  };
  if (body) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  const data = await res.json();
  if (data.errors) throw new Error(JSON.stringify(data.errors));
  return data;
}

function getThemeFiles(dir) {
  const files = [];
  function walk(d) {
    const entries = readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) {
        const rel = relative(ROOT, full);
        if (!EXCLUDE.has(entry.name) && !EXCLUDE.has(rel)) walk(full);
      } else if (entry.isFile()) {
        // Skip hidden files
        if (entry.name.startsWith(".")) continue;
        // Check if file is in a theme directory
        const rel = relative(ROOT, full);
        const topDir = rel.split("/")[0];
        if (THEME_DIRS.has(topDir)) {
          files.push(rel);
        }
      }
    }
  }
  walk(dir);
  return files;
}

async function getRemoteAssets() {
  const data = await rest("GET", `/themes/${THEME_ID}/assets.json`);
  return data.assets || [];
}

async function uploadAsset(key) {
  const fullPath = join(ROOT, key);
  const content = readFileSync(fullPath, "base64");
  
  const body = {
    asset: {
      key,
      attachment: content,
    },
  };

  try {
    await rest("PUT", `/themes/${THEME_ID}/assets.json`, body);
    console.log(`  ✅ ${key}`);
  } catch (err) {
    console.error(`  ❌ ${key}: ${err.message}`);
  }
}

async function deleteAsset(key) {
  try {
    await rest("DELETE", `/themes/${THEME_ID}/assets.json?asset[key]=${encodeURIComponent(key)}`);
    console.log(`  🗑️ ${key}`);
  } catch (err) {
    // Ignore delete errors
  }
}

async function main() {
  console.log(`\n🔍 Scanning theme files in ${ROOT}...`);
  const localFiles = getThemeFiles(ROOT);
  console.log(`   Found ${localFiles.length} local theme files\n`);

  console.log(`🔍 Fetching remote assets...`);
  const remoteAssets = await getRemoteAssets();
  const remoteKeys = new Set(remoteAssets.map((a) => a.key));
  console.log(`   Found ${remoteAssets.length} remote assets\n`);

  // Upload new/changed files
  console.log(`📤 Uploading files...`);
  for (const key of localFiles) {
    await uploadAsset(key);
  }

  // Delete remote files that no longer exist locally
  const localSet = new Set(localFiles);
  const toDelete = remoteAssets
    .filter((a) => !a.key.startsWith("templates/") && !a.key.startsWith("config/") && !a.key.startsWith("locales/"))
    .filter((a) => !localSet.has(a.key));

  if (toDelete.length > 0) {
    console.log(`\n🗑️ Cleaning ${toDelete.length} stale assets...`);
    for (const asset of toDelete.slice(0, 50)) {
      await deleteAsset(asset.key);
    }
  }

  console.log(`\n✅ Deploy complete!`);
}

main().catch((err) => {
  console.error(`\n❌ Deploy failed:`, err.message);
  process.exit(1);
});
