# Complete Guide: Troubleshooting & Error Isolation in Foundry VTT

> **Official Reference:** [https://foundryvtt.com/article/troubleshooting/](https://foundryvtt.com/article/troubleshooting/)

---

## 1. Diagnostic Step-by-Step Protocol

### Step 1: Check Safe Configuration
Run Foundry in Safe Mode to disable all community modules:
1. Go to **Configure Settings** > **Game Settings**.
2. Enable **Safe Configuration** and reload world.
3. If the bug disappears, it is caused by a community module.

### Step 2: Binary Search Module Isolation (Find the Culprit)
1. Deactivate half of the active modules.
2. If the bug persists, the culprit is in the active half.
3. Repeat division until the conflicting module is identified.

### Step 3: Inspect Browser Developer Console (F12)
Look for red stack traces:
- `TypeError: Cannot read properties of undefined`: Missing DataModel property or version mismatch.
- `libWrapper error`: Two modules conflicting on wrapping the same prototype function.
- `404 Not Found`: Missing texture asset or deleted audio file.

---

## 2. Common Manifest Incompatibilities
Verify `minimum` and `verified` version constraints in `module.json`:
```json
"compatibility": {
  "minimum": "11",
  "verified": "12"
}
```
If running Foundry v12 on a module with `"verified": "10"`, expect deprecation errors (e.g. `Application` vs `ApplicationV2`).
