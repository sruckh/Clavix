# Design: CLEAR Framework Integration

## Architecture Overview

### Current Architecture
```
User Input → PromptOptimizer.analyze() → Regex Pattern Matching → Output
                     ↓
          { gaps, ambiguities, strengths, suggestions }
```

### New Architecture
```
User Input → PromptOptimizer.applyCLEARFramework() → CLEAR Analysis → Output
                     ↓
          { conciseness, logic, explicitness, adaptiveness, reflectiveness }
                     ↓
          Mapped to existing categories for compatibility
```

## CLEAR Framework Components

### 1. Concise (C)
**Purpose:** Eliminate verbosity, remove pleasantries, focus on essentials

**Implementation:**
- Detect unnecessary words (please, could you, etc.)
- Count vague qualifiers (maybe, perhaps, might)
- Measure signal-to-noise ratio
- Suggest specific replacements

**Maps to:** Ambiguities (partial overlap)

### 2. Logical (L)
**Purpose:** Ensure coherent sequencing and structured flow

**Implementation:**
- Analyze order of requirements
- Detect jumbled concepts
- Suggest logical reordering (context → requirements → constraints → output)
- Validate step-by-step sequences

**Maps to:** New category (structural improvement)

### 3. Explicit (E)
**Purpose:** Provide clear output specifications

**Implementation:**
- Check for persona/role specification
- Verify output format is defined
- Ensure tone/style is specified
- Validate success criteria present
- Check for examples when helpful

**Maps to:** Gaps (directly maps)

### 4. Adaptive (A)
**Purpose:** Provide flexibility and alternative approaches

**Implementation:**
- Generate 2-3 alternative phrasings
- Suggest different prompt structures (user story, job story, structured sections)
- Recommend temperature/creativity settings
- Provide variation examples

**Maps to:** Deep mode only (suggestions with examples)

### 5. Reflective (R)
**Purpose:** Enable continuous evaluation and validation

**Implementation:**
- Create accuracy verification checklist
- Identify edge cases to consider
- Perform "what could go wrong" analysis
- Suggest fact-checking steps
- Provide quality assessment criteria

**Maps to:** Deep mode only (new category)

## Mode Differentiation Strategy

### Fast Mode: C + L + E + Triage
**Purpose:** Quick cleanup for "shitty prompts"

**CLEAR Usage:**
- ✅ Concise: Remove fluff, tighten language
- ✅ Logical: Check basic sequencing
- ✅ Explicit: Ensure key specs present
- ❌ Adaptive: Recommend deep mode instead
- ❌ Reflective: Basic validation only

**Output:**
```
🎯 CLEAR Analysis (Fast Mode)
├─ Conciseness: [score + issues]
├─ Logic: [score + flow issues]
├─ Explicitness: [score + missing specs]
├─ 💡 Recommendation: Use /clavix:deep for adaptive variations
└─ ✨ Improved Prompt
   └─ 📝 Changes Made: [educational summary]
```

### Deep Mode: Full CLEAR (C + L + E + A + R)
**Purpose:** Comprehensive analysis for complex requirements

**CLEAR Usage:**
- ✅ Concise: Detailed verbosity analysis
- ✅ Logical: Comprehensive flow analysis
- ✅ Explicit: Complete specification check
- ✅ Adaptive: Multiple variations + alternatives
- ✅ Reflective: Full validation checklist + edge cases

**Output:**
```
🎯 CLEAR Framework Deep Analysis

📊 Framework Assessment:
├─ Concise: [score + detailed analysis]
├─ Logical: [score + structure analysis]
├─ Explicit: [score + completeness check]
├─ Adaptive: [score + flexibility analysis]
└─ Reflective: [score + quality validation]

✨ Improved Prompt (CLEAR-optimized)
   └─ 📝 Changes Made: [educational summary]

🔄 Adaptive Variations (A):
├─ Variation 1: [different approach]
├─ Variation 2: [different framing]
└─ Variation 3: [different structure]

🤔 Reflection Checklist (R):
├─ Accuracy verification steps
├─ Edge cases to consider
├─ Potential issues (what could go wrong)
└─ Success criteria validation
```

## Implementation Plan

### Phase 1: Core Engine
**File:** `src/core/prompt-optimizer.ts`

**New Methods:**
```typescript
// Individual CLEAR component analyzers
analyzeConciseness(prompt: string): ConciseAnalysis
analyzeLogic(prompt: string): LogicAnalysis
analyzeExplicitness(prompt: string): ExplicitAnalysis
analyzeAdaptiveness(prompt: string): AdaptiveAnalysis
analyzeReflectiveness(prompt: string): ReflectiveAnalysis

// Orchestrator
applyCLEARFramework(prompt: string, mode: 'fast' | 'deep'): CLEARResult

// Scoring
getCLEARScore(analysis: CLEARResult): CLEARScore
```

**Backward Compatibility:**
```typescript
// Keep existing methods, map them internally
analyze(prompt: string): Analysis {
  const clear = this.applyCLEARFramework(prompt, 'fast');
  return this.mapCLEARToLegacy(clear);
}

mapCLEARToLegacy(clear: CLEARResult): Analysis {
  return {
    gaps: clear.explicitness.issues,
    ambiguities: clear.conciseness.issues,
    strengths: clear.scores,
    suggestions: [...clear.logic.suggestions, ...clear.conciseness.suggestions]
  };
}
```

### Phase 2: Template Updates
**Files:** `src/templates/slash-commands/claude-code/*.md`

**Changes:**
- Add CLEAR framework explanation to each command
- Reference C, L, E, A, R components
- Update examples to show CLEAR-based output

### Phase 3: Documentation
**Files:** `README.md`, `CLAUDE.md`

**Changes:**
- Hero section: "Built on the CLEAR Framework"
- Features section: Replace "rule-based" with "CLEAR Framework methodology"
- New section: "Why CLEAR?" with academic citation
- Update command descriptions

## Trade-offs

### Option 1: Replace Existing Analysis (Chosen)
**Pros:**
- Clean, unified methodology
- Modern, research-backed approach
- Easy to explain and document

**Cons:**
- Risk of regression if CLEAR implementation is inferior
- Breaking change if output format changes significantly

**Mitigation:** Map CLEAR to existing categories, preserve output structure

### Option 2: Keep Both Systems
**Pros:**
- Zero risk of regression
- Users can choose methodology

**Cons:**
- Code complexity doubles
- Confusing for users (which to use?)
- Maintenance burden

**Decision:** Option 1 with backward compatibility mapping

### Option 3: CLEAR as Optional Flag
**Pros:**
- Gradual migration
- A/B testing capability

**Cons:**
- Fragmented user experience
- Doubles test surface area
- Eventually need to deprecate old system anyway

**Decision:** Not chosen - commit to CLEAR as the standard

## Validation Strategy

### Testing Approach
1. **Unit Tests:** Each CLEAR component analyzer
2. **Integration Tests:** Full applyCLEARFramework() with real prompts
3. **Regression Tests:** Compare CLEAR vs old system on existing test suite
4. **Quality Tests:** Ensure CLEAR output ≥ old system quality

### Test Prompts
- **Poor Conciseness:** "Could you please maybe help me with creating something like a login page if possible?"
- **Poor Logic:** Jumbled requirements without sequencing
- **Poor Explicitness:** "Build a dashboard" (no specs)
- **Needs Adaptiveness:** Open-ended feature request with multiple valid approaches
- **Needs Reflection:** Complex prompt requiring validation

## Open Questions
None - design is complete and ready for implementation.
