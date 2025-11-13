# Summarize Mode CLEAR Framework Enhancement

## MODIFIED Requirements

### Requirement: Conversation Analysis and Summarization

The system SHALL analyze conversations, extract prompts, and optimize them using the CLEAR framework.

#### Scenario: CLEAR optimization of extracted prompts
- **WHEN** conversation analysis extracts requirements into optimized-prompt.md
- **THEN** the system MUST run the extracted prompt through CLEAR analysis
- **AND** apply Conciseness optimization (remove conversational fluff)
- **AND** apply Logic optimization (structure requirements coherently)
- **AND** apply Explicitness optimization (add clear specifications)
- **AND** generate CLEAR-optimized version of the prompt

#### Scenario: Display both raw and CLEAR-optimized prompts
- **WHEN** summarization completes
- **THEN** the system MUST display "Raw Extraction" section
- **AND** show the original extracted prompt from conversation
- **AND** display "🎯 CLEAR-Optimized Prompt" section
- **AND** show the CLEAR-enhanced version
- **AND** display CLEAR component scores (C, L, E)

#### Scenario: CLEAR improvements explanation
- **WHEN** displaying CLEAR-optimized prompt
- **THEN** the system MUST include "CLEAR Enhancements Made" section
- **AND** explain what was improved from raw extraction
- **AND** format: "[C] Removed 20 conversational words, focused on core request"
- **AND** format: "[L] Restructured: context first, then requirements, then constraints"
- **AND** format: "[E] Added explicit output format and success criteria from conversation"

#### Scenario: Save both versions
- **WHEN** summarization generates outputs
- **THEN** the system MUST save optimized-prompt.md (CLEAR-optimized)
- **AND** save optimized-prompt-raw.md (raw extraction)
- **AND** allow user to compare and choose preferred version

#### Scenario: CLEAR validation of mini-PRD
- **WHEN** conversation analysis generates mini-prd.md
- **THEN** the system MAY run CLEAR validation on the mini-PRD
- **AND** assess for AI consumption quality (similar to full PRD validation)
- **AND** suggest improvements if CLEAR score < 70

#### Scenario: Summarize workflow unchanged
- **WHEN** running conversation summarization
- **THEN** the extraction process MUST remain identical
- **AND** same conversation analysis logic MUST be used
- **AND** CLEAR optimization is ADDITIVE enhancement
- **AND** optimization runs AFTER extraction, not during

#### Scenario: Slash command references CLEAR
- **WHEN** user views `/clavix:summarize` command documentation
- **THEN** the command MUST mention CLEAR framework optimization
- **AND** explain that extracted prompts are CLEAR-optimized
- **AND** note benefits: concise, logical, explicit for immediate AI use

## ADDED Requirements

### Requirement: CLEAR Framework for Conversation Extraction

The system SHALL use CLEAR framework to optimize prompts extracted from conversations.

#### Scenario: CLEAR analysis guides extraction
- **WHEN** analyzing conversation for requirements
- **THEN** the system SHOULD use CLEAR principles to identify key elements
- **AND** Conciseness: Extract signal, ignore noise
- **AND** Logic: Organize requirements in coherent order
- **AND** Explicitness: Ensure all specifications are captured

#### Scenario: Educational CLEAR feedback in summarize
- **WHEN** displaying CLEAR enhancements
- **THEN** the system SHOULD help user understand transformation
- **AND** show before/after examples for key improvements
- **AND** teach CLEAR principles through conversation → prompt transformation
- **AND** example: "Conversation: 'maybe we could add...' → CLEAR: 'Add [specific feature]'"
