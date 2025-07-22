#!/usr/bin/env node

const { scrapeFredDataMonthly } = require('./server/controllers/product');

(async () => {
  try {
    console.log("🔗 Running FRED data scrape from cron...");
    await scrapeFredDataMonthly();
    console.log("✅ Scrape completed.");
  } catch (err) {
    console.error("🚨 Scrape failed:", err);
    process.exit(1);
  }
})();


(async () => {
  try {
    console.log("🔗 Running FRED data scrape from cron...");
    await scrapeFredDataMonthly();
    console.log("✅ Scrape completed.");
  } catch (err) {
    console.error("🚨 Scrape failed:", err);
    process.exit(1);
  }
})();
