# Deep Mode CLEAR Framework Integration

## MODIFIED Requirements

### Requirement: Deep Mode Prompt Improvement

The system SHALL provide a comprehensive deep analysis command using the full CLEAR framework (Concise, Logical, Explicit, Adaptive, Reflective) for thorough prompt improvement.

#### Scenario: Apply full CLEAR framework in deep mode
- **WHEN** user runs `clavix deep "Create a login page"`
- **THEN** the system MUST analyze the prompt using full CLEAR framework
- **AND** apply Conciseness analysis (detailed verbosity check)
- **AND** apply Logic analysis (comprehensive flow analysis)
- **AND** apply Explicitness analysis (complete specification check)
- **AND** apply Adaptiveness analysis (generate alternatives)
- **AND** apply Reflectiveness analysis (validation checklist)
- **AND** generate CLEAR-optimized structured prompt
- **AND** display all five CLEAR component scores

#### Scenario: Display comprehensive CLEAR analysis
- **WHEN** deep mode completes analysis
- **THEN** the system MUST display "📊 Framework Assessment" section
- **AND** show Conciseness: detailed score with verbosity issues
- **AND** show Logic: detailed score with structure analysis
- **AND** show Explicitness: detailed score with completeness check
- **AND** show Adaptiveness: score with flexibility analysis
- **AND** show Reflectiveness: score with quality validation notes

#### Scenario: Adaptive variations (CLEAR A component)
- **WHEN** deep mode generates output
- **THEN** the system MUST include "🔄 Adaptive Variations" section
- **AND** generate 2-3 alternative phrasings of the prompt
- **AND** explain when each variation might be more appropriate
- **AND** suggest different prompt structures (user story, job story, structured)
- **AND** demonstrate flexibility in approaching the requirement

#### Scenario: Reflection checklist (CLEAR R component)
- **WHEN** deep mode generates output
- **THEN** the system MUST include "🤔 Reflection Checklist" section
- **AND** provide accuracy verification steps
- **AND** identify edge cases to consider
- **AND** perform "what could go wrong" analysis
- **AND** suggest fact-checking steps for AI-generated content
- **AND** include success criteria validation points

#### Scenario: CLEAR-optimized comprehensive output
- **WHEN** deep mode generates improved prompt
- **THEN** the prompt MUST be optimized for all CLEAR components
- **AND** Concise: No verbosity, focused language
- **AND** Logical: Perfect sequencing and flow
- **AND** Explicit: Complete specifications
- **AND** Adaptive: Acknowledged need for variations (shown separately)
- **AND** Reflective: Validated against quality criteria

#### Scenario: Educational CLEAR feedback in deep mode
- **WHEN** deep mode displays "Changes Made" section
- **THEN** each change MUST be labeled with CLEAR component
- **AND** format: "[C] Removed 15 unnecessary words, improved signal-to-noise ratio"
- **AND** format: "[L] Restructured: context → requirements → constraints → expected output"
- **AND** format: "[E] Added persona (senior developer), output format (React component), tone (production-ready)"
- **AND** format: "[A] See Adaptive Variations section for alternative approaches"
- **AND** format: "[R] See Reflection Checklist for validation steps"

#### Scenario: Deep mode output structure with CLEAR
- **WHEN** deep mode displays results
- **THEN** the output MUST follow structure:
  1. "🎯 CLEAR Framework Deep Analysis" header
  2. "📊 Framework Assessment" (all 5 components)
  3. "✨ Improved Prompt (CLEAR-optimized)"
  4. "📝 Changes Made" (educational CLEAR summary)
  5. "🔄 Adaptive Variations" (A component)
  6. "🤔 Reflection Checklist" (R component)

#### Scenario: All fast mode features included
- **WHEN** user runs deep mode
- **THEN** the system MUST include all features from fast mode
- **AND** MUST apply C, L, E components (like fast mode)
- **AND** MUST include smart triage awareness
- **AND** MUST include "Changes Made" summary
- **AND** PLUS additional A and R components

#### Scenario: Backward compatibility maintained
- **WHEN** deep mode uses CLEAR framework
- **THEN** the output quality MUST be equal to or better than previous implementation
- **AND** all existing deep mode features MUST remain functional
- **AND** edge case identification MUST continue (now part of R)
- **AND** alternative phrasings MUST continue (now part of A)
- **AND** implementation examples SHOULD be provided when helpful (part of A)

#### Scenario: Slash command integration
- **WHEN** user runs `/clavix:deep` in Claude Code
- **THEN** the slash command file MUST reference full CLEAR framework
- **AND** explain all five components (C, L, E, A, R)
- **AND** provide examples of CLEAR-based deep analysis
- **AND** pass the prompt to CLEAR-enhanced deep mode

## ADDED Requirements

### Requirement: CLEAR Framework Scoring System

The system SHALL provide numerical scores for each CLEAR component to enable objective assessment.

#### Scenario: Calculate CLEAR component scores
- **WHEN** deep mode analyzes a prompt
- **THEN** each component MUST receive a score from 0-100
- **AND** Conciseness: 100 = perfectly concise, 0 = extremely verbose
- **AND** Logic: 100 = perfect flow, 0 = completely jumbled
- **AND** Explicitness: 100 = fully specified, 0 = completely vague
- **AND** Adaptiveness: 100 = highly flexible, 0 = rigid/single approach
- **AND** Reflectiveness: 100 = fully validated, 0 = no validation possible

#### Scenario: Calculate overall CLEAR score
- **WHEN** deep mode completes CLEAR analysis
- **THEN** the system MUST calculate weighted overall score
- **AND** weight: C (20%), L (20%), E (30%), A (15%), R (15%)
- **AND** display overall CLEAR score (0-100)
- **AND** score >= 80: Excellent prompt
- **AND** score 60-79: Good prompt, minor improvements
- **AND** score 40-59: Needs improvement
- **AND** score < 40: Significant issues, deep analysis required

#### Scenario: CLEAR score guides recommendations
- **WHEN** overall CLEAR score < 60
- **THEN** the system MUST recommend significant revision
- **AND** highlight lowest-scoring components for focus
- **WHEN** overall CLEAR score >= 80
- **THEN** the system MAY affirm prompt is already excellent
- **AND** suggest only minor refinements if any

### Requirement: CLEAR Framework Help and Education

The system SHALL provide educational resources about the CLEAR framework.

#### Scenario: Display CLEAR framework information
- **WHEN** user runs `clavix deep --framework-info`
- **THEN** the system MUST display complete CLEAR explanation
- **AND** describe each component in detail
- **AND** include Dr. Leo Lo's academic citation
- **AND** link to CLEAR framework resources
- **AND** provide usage examples for each component

#### Scenario: CLEAR-only analysis flag
- **WHEN** user runs `clavix deep --clear-only "prompt"`
- **THEN** the system MUST display only full CLEAR scores and analysis
- **AND** NOT display improved prompt or variations
- **AND** useful for understanding comprehensive CLEAR assessment
