#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read package.json
const packagePath = join(rootDir, 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
const version = packageJson.version;

// Read and update manifest.json
const manifestPath = join(rootDir, 'manifest.json');
const manifestJson = JSON.parse(readFileSync(manifestPath, 'utf8'));

if (manifestJson.version !== version) {
  manifestJson.version = version;
  writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + '\n');
  console.log(`✓ Synced version ${version} to manifest.json`);
} else {
  console.log(`✓ Version ${version} already in sync`);
}
