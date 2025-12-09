#!/usr/bin/env node

/**
 * Setup Verification Script
 * Run this to check if your environment is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 DatingAdvice.io - Setup Verification\n');
console.log('========================================\n');

// Check .env file
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

console.log('1️⃣  Checking .env file...');
if (!envExists) {
  console.log('   ❌ .env file not found');
  console.log('   ✅ Copy .env.example to .env and add your API key\n');
} else {
  console.log('   ✅ .env file exists\n');
}

// Check API key in .env
if (envExists) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const apiKeyMatch = envContent.match(/REACT_APP_OPENROUTER_API_KEY=(.+)/);
  
  console.log('2️⃣  Checking OpenRouter API key...');
  if (!apiKeyMatch || !apiKeyMatch[1] || apiKeyMatch[1].includes('your_')) {
    console.log('   ❌ API key not configured or uses placeholder');
    console.log('   ✅ Get your free API key from: https://openrouter.ai\n');
  } else {
    const keyPreview = apiKeyMatch[1].substring(0, 20) + '...';
    console.log(`   ✅ API key configured: ${keyPreview}\n`);
  }
}

// Check package.json dependencies
console.log('3️⃣  Checking dependencies...');
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const requiredDeps = ['express', 'cors', 'body-parser', 'dotenv', 'framer-motion'];
const missingDeps = requiredDeps.filter(dep => 
  !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
);

if (missingDeps.length === 0) {
  console.log('   ✅ All dependencies are installed\n');
} else {
  console.log(`   ❌ Missing dependencies: ${missingDeps.join(', ')}`);
  console.log('   ✅ Run: npm install\n');
}

// Check node_modules
console.log('4️⃣  Checking node_modules...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('   ✅ node_modules directory exists\n');
} else {
  console.log('   ❌ node_modules directory not found');
  console.log('   ✅ Run: npm install\n');
}

console.log('========================================\n');
console.log('📋 Quick Start Guide:\n');
console.log('1. Add your API key to .env:');
console.log('   REACT_APP_OPENROUTER_API_KEY=your_key_here\n');
console.log('2. Restart the dev server:');
console.log('   Terminal 1: npm start');
console.log('   Terminal 2: npm run server:dev\n');
console.log('3. Open http://localhost:3000\n');
console.log('========================================\n');
