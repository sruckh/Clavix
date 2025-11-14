# Migration Guide: Clavix v1.3.0 → v1.4.0

## Overview

Version 1.4.0 introduces **multi-provider support**, allowing you to generate slash commands for multiple AI development tools simultaneously. The config format has changed from single agent to multiple providers.

## Breaking Changes

### Config Format Change

**v1.3.0:**
```json
{
  "version": "1.3.0",
  "agent": "claude-code",
  "templates": { ... },
  "outputs": { ... },
  "preferences": { ... }
}
```

**v1.4.0:**
```json
{
  "version": "1.4.0",
  "providers": ["claude-code", "cursor"],
  "templates": { ... },
  "outputs": { ... },
  "preferences": { ... }
}
```

**Key Change:** `agent: string` → `providers: string[]`

---

## Automatic Migration

The easiest way to migrate is to simply run:

```bash
clavix init
```

**What happens:**
1. Clavix detects your old v1.3.0 configuration
2. Your previous agent selection is automatically pre-selected in the new UI
3. You can add additional providers or keep just the one you had
4. Config is automatically migrated to v1.4.0 format
5. Commands are regenerated for all selected providers

**Example:**

```bash
$ clavix init

? Clavix is already initialized. Reinitialize? Yes

? Which AI tools are you using? (Space to select, Enter to confirm)
 ◉ Claude Code (.claude/commands/clavix/)    ← Pre-selected from old config
 ◯ Cursor (.cursor/commands/)
 ◯ Droid CLI (.factory/commands/)
 ◯ OpenCode (.opencode/command/)
 ◯ Amp (.agents/commands/)
 ◉ agents.md (Universal)

✓ Generating commands for 2 provider(s)...
  ✓ Generating Claude Code commands...
  ✓ Generating AGENTS.md...

✅ Clavix initialized successfully!
```

---

## Manual Migration

If you prefer to edit the config manually:

### Step 1: Update `.clavix/config.json`

```bash
# Open config file
nano .clavix/config.json
```

Replace:
```json
"agent": "claude-code"
```

With:
```json
"providers": ["claude-code"]
```

Update version:
```json
"version": "1.4.0"
```

### Step 2: Regenerate Commands

```bash
clavix update
```

This will regenerate all slash commands with the new structure.

---

## What's New in v1.4.0

### 1. Multi-Provider Selection

You can now select multiple AI tools during init:

- **Claude Code** - `.claude/commands/clavix/`
- **Cursor** - `.cursor/commands/`
- **Droid CLI** - `.factory/commands/`
- **OpenCode** - `.opencode/command/`
- **Amp** - `.agents/commands/`
- **agents.md** - Universal fallback for any tool

### 2. Checkbox UI

New interactive multi-select interface:
- **Space** to toggle selection
- **Enter** to confirm
- At least one provider must be selected

### 3. Universal agents.md

New universal instruction file for tools that don't support slash commands:
- Contains workflow detection and triggers
- CLEAR framework integration
- Works with any AI assistant (ChatGPT, Gemini, etc.)

### 4. Provider-Specific Formatting

Each provider gets commands in its native format:
- **Droid & OpenCode** - YAML frontmatter with `$ARGUMENTS`
- **Claude Code & Cursor** - Simple markdown
- **Amp** - Supports executable commands (experimental)

---

## Backward Compatibility

**Full backward compatibility guaranteed:**

✅ Old v1.3.0 configs are automatically detected and migrated
✅ Single-provider selection still works (just select one)
✅ Existing Claude Code commands continue to work
✅ No manual code changes required in your project

---

## Troubleshooting

### Q: My slash commands stopped working

**A:** Run `clavix update` to regenerate commands with the new structure.

### Q: Can I keep using only Claude Code?

**A:** Yes! Just select only Claude Code during `clavix init`. You get all the architectural improvements with zero breaking changes to your workflow.

### Q: Do I need to reinstall Clavix?

**A:** Yes, upgrade to v1.4.0:

```bash
npm install -g clavix@1.4.0
```

Then run `clavix init` in your project.

### Q: What if I select multiple providers but only use one?

**A:** No problem! The extra commands don't affect your workflow. They're isolated in separate directories and won't interfere with each other.

### Q: Can I add more providers later?

**A:** Yes! Run `clavix init` again and select additional providers. Existing commands are preserved.

### Q: How do I remove a provider?

**A:** Run `clavix init` again and deselect the provider. Or manually delete the provider's command directory (e.g., `.cursor/commands/`).

---

## Upgrade Checklist

- [ ] Install Clavix v1.4.0: `npm install -g clavix@1.4.0`
- [ ] Run `clavix init` in your project
- [ ] Select desired providers (your old provider is pre-selected)
- [ ] Verify commands work in your AI tool
- [ ] (Optional) Add more providers if needed

---

## Need Help?

- **Documentation:** [README.md](./README.md)
- **Issues:** [GitHub Issues](https://github.com/Bob5k/Clavix/issues)
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)

---

## Example Migration Scenarios

### Scenario 1: Keep Claude Code Only

```bash
clavix init
# Select only "Claude Code" in the checkbox UI
# Config migrated: "agent": "claude-code" → "providers": ["claude-code"]
```

### Scenario 2: Add Cursor

```bash
clavix init
# Select both "Claude Code" and "Cursor"
# Commands generated in:
#   - .claude/commands/clavix/
#   - .cursor/commands/
```

### Scenario 3: Use Multiple Tools

```bash
clavix init
# Select: Claude Code, Cursor, Droid CLI, agents.md
# Commands generated in:
#   - .claude/commands/clavix/
#   - .cursor/commands/
#   - .factory/commands/
#   - AGENTS.md (universal)
```

---

**Migration complete! Enjoy Clavix v1.4.0 with multi-provider support! 🎉**
