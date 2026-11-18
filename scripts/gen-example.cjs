// Regenerates lib/example.json by running the EXAMPLE debts below through the app's own payoff engine
// (src/lib/payoff.ts in the debt-angel-app repo).
//   APP=/path/to/debt-angel-app node scripts/gen-example.cjs
// The numbers are example data for illustration only. They are not user data or a promise of results.
const fs = require("fs"), os = require("os"), path = require("path");
const APP = process.env.APP || "../debt-angel";
const ts = require(path.join(APP, "node_modules/typescript"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "da-"));
for (const f of ["payoff", "money", "types"]) {
  const p = path.join(APP, "src/lib", f + ".ts");
  if (!fs.existsSync(p)) continue;
  fs.writeFileSync(path.join(tmp, f + ".js"), ts.transpileModule(fs.readFileSync(p, "utf8"), { compilerOptions: { module: "commonjs", target: "es2020" } }).outputText);
}
const p = require(path.join(tmp, "payoff.js"));
const extra = 200;
const debts = [
  { id: "a", name: "Store card", balance: 1200, apr: 26.99, minPayment: 40 },
  { id: "b", name: "Visa", balance: 4800, apr: 22.9, minPayment: 110 },
  { id: "c", name: "Car loan", balance: 9500, apr: 6.9, minPayment: 240 },
  { id: "d", name: "Medical bill", balance: 450, apr: 0, minPayment: 30 },
];
const c = p.compareStrategies(debts, extra);
const pick = (r) => ({ months: r.months, totalInterest: r.totalInterest, totalPaid: r.totalPaid, order: r.payoffOrder.map((e) => ({ name: e.name, month: e.month })), balance: r.balanceByMonth });
const out = { extra, debts, snowball: pick(c.snowball), avalanche: pick(c.avalanche), minimumsOnly: pick(c.minimumsOnly) };
fs.writeFileSync(path.join(__dirname, "../lib/example.json"), JSON.stringify(out, null, 1));
console.log("wrote lib/example.json");
