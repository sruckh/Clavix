import { PromptOptimizer } from '../../src/core/prompt-optimizer';

describe('PromptOptimizer', () => {
  let optimizer: PromptOptimizer;

  beforeEach(() => {
    optimizer = new PromptOptimizer();
  });

  describe('analyze', () => {
    it('should identify gaps in minimal prompt', () => {
      const prompt = 'Create a login page';
      const analysis = optimizer.analyze(prompt);

      expect(analysis.gaps).toContain('Missing context: What is the background or current situation?');
      expect(analysis.gaps.length).toBeGreaterThan(0);
    });

    it('should identify strengths in detailed prompt', () => {
      const prompt = `Build a login page with email and password fields.
      Currently we don't have authentication.
      Users should be able to log in securely.
      Use React and TypeScript.`;

      const analysis = optimizer.analyze(prompt);

      expect(analysis.strengths).toContain('Clear context provided');
      expect(analysis.strengths).toContain('Technical constraints specified');
    });

    it('should identify ambiguities', () => {
      const prompt = 'Create some pages that should maybe have this functionality';
      const analysis = optimizer.analyze(prompt);

      expect(analysis.ambiguities.length).toBeGreaterThan(0);
    });
  });

  describe('improve', () => {
    it('should generate improved prompt with structure', () => {
      const prompt = 'Create a login page';
      const result = optimizer.improve(prompt);

      expect(result.improved).toContain('# Objective');
      expect(result.improved).toContain('# Requirements');
      expect(result.improved).toContain('# Technical Constraints');
      expect(result.improved).toContain('# Expected Output');
      expect(result.improved).toContain('# Success Criteria');
    });

    it('should preserve original prompt', () => {
      const prompt = 'Create a login page';
      const result = optimizer.improve(prompt);

      expect(result.original).toBe(prompt);
    });

    it('should include analysis', () => {
      const prompt = 'Create a login page';
      const result = optimizer.improve(prompt);

      expect(result.analysis).toBeDefined();
      expect(result.analysis.gaps).toBeDefined();
      expect(result.analysis.ambiguities).toBeDefined();
      expect(result.analysis.strengths).toBeDefined();
      expect(result.analysis.suggestions).toBeDefined();
    });
  });
});
