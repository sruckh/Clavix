# Proposal: Integrate CLEAR Framework

## Summary
Migrate Clavix from regex-based pattern matching to the academically-validated CLEAR framework (Concise, Logical, Explicit, Adaptive, Reflective) developed by Dr. Leo Lo at the University of New Mexico for prompt engineering. This change elevates Clavix from a simple rule-based tool to a methodology-driven prompt engineering assistant grounded in research.

## Motivation
**Current State:**
- Fast and deep modes use basic regex pattern matching (`hasContext()`, `hasSuccessCriteria()`, etc.)
- No explicit framework or methodology is documented
- Analysis is categorized as "gaps, ambiguities, strengths, suggestions" without structure
- README mentions "rule-based analysis" which lacks academic rigor

**Problems:**
- Users don't understand the methodology behind improvements
- No framework to validate the quality of analysis
- Limited differentiation between fast and deep modes beyond "more features"
- Missing modern, research-backed approach to prompt engineering

**Desired State:**
- Fast and deep modes apply the CLEAR framework systematically
- Users understand improvements are based on proven methodology
- Clear mapping: C (Concise), L (Logical), E (Explicit), A (Adaptive), R (Reflective)
- Documentation highlights modern, academic approach as a differentiator
- PRD and summarize modes enhanced with CLEAR validation

## Goals
1. **Core Implementation**: Replace regex-based analysis with CLEAR framework methods
2. **Fast Mode**: Apply C, L, E components + smart triage
3. **Deep Mode**: Apply full CLEAR framework (C, L, E, A, R) with comprehensive output
4. **PRD Enhancement**: Add CLEAR validation to generated PRDs
5. **Summarize Enhancement**: Apply CLEAR to extracted prompts
6. **Documentation**: Update README, CLAUDE.md, and slash commands to reference CLEAR
7. **Academic Citation**: Include Dr. Leo Lo's framework as validation

## Non-Goals
- Changing PRD's Socratic questioning workflow (keep it, enhance with CLEAR)
- Modifying conversational mode flow (only enhance summarize output)
- Replacing smart triage logic (keep it, make it CLEAR-aware)
- Removing existing analysis categories (map them to CLEAR instead)

## Risks & Mitigation
**Risk:** Output quality regression from current implementation
- **Mitigation:** Map existing categories to CLEAR, run side-by-side tests

**Risk:** Users confused by new terminology
- **Mitigation:** Explain CLEAR in output, educational "Changes Made" section

**Risk:** Breaking changes to slash command behavior
- **Mitigation:** Keep same input/output structure, enhance content only

## Success Criteria
- [ ] Fast mode output clearly references CLEAR framework (C, L, E)
- [ ] Deep mode output uses full CLEAR framework (C, L, E, A, R)
- [ ] PRD mode validates output with CLEAR assessment
- [ ] Summarize mode applies CLEAR to extracted prompts
- [ ] README prominently features CLEAR framework with academic citation
- [ ] All existing tests pass
- [ ] New CLEAR-specific test cases added
- [ ] `openspec validate` passes with --strict

## Related Changes
None (initial CLEAR integration)

## References
- [CLEAR Framework Guide](https://guides.library.tamucc.edu/prompt-engineering/clear)
- [Academic Paper](https://digitalrepository.unm.edu/cgi/viewcontent.cgi?article=1214&context=ulls_fsp) - Lo, L. S. (2023). "The CLEAR Path: A Framework for Enhancing Information Literacy through Prompt Engineering"
- Current implementation: `src/core/prompt-optimizer.ts`
- Slash commands: `src/templates/slash-commands/claude-code/`
