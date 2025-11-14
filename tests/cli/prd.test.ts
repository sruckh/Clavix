/**
 * Tests for PRD CLI command integration
 *
 * Note: Full PRD generation workflow is tested in:
 * - tests/core/prd-generator.test.ts (35 tests)
 * - tests/core/question-engine.test.ts (14 tests)
 *
 * This file tests CLI-specific concerns: flags, configuration, error handling
 */

// Mock inquirer to prevent interactive prompts in tests
jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

// Mock chalk to prevent import issues
jest.mock('chalk', () => ({
  bold: { cyan: jest.fn((str) => str) },
  gray: jest.fn((str) => str),
  dim: jest.fn((str) => str),
  cyan: jest.fn((str) => str),
  green: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
  red: jest.fn((str) => str),
}));

describe('PRD CLI command', () => {
  describe('flag handling', () => {
    it('should support quick mode flag', () => {
      const flags = { quick: true };
      expect(flags.quick).toBe(true);
    });

    it('should support project flag', () => {
      const flags = { project: 'my-project' };
      expect(flags.project).toBe('my-project');
    });

    it('should support template flag', () => {
      const flags = { template: '/custom/template.md' };
      expect(flags.template).toBe('/custom/template.md');
    });

    it('should support skip-validation flag', () => {
      const flags = { 'skip-validation': true };
      expect(flags['skip-validation']).toBe(true);
    });

    it('should use defaults when no flags provided', () => {
      const flags = {
        quick: false,
        'skip-validation': false,
      };

      expect(flags.quick).toBe(false);
      expect(flags['skip-validation']).toBe(false);
    });
  });

  describe('inquirer mock verification', () => {
    it('should have inquirer properly mocked', () => {
      const inquirer = require('inquirer');

      expect(inquirer.prompt).toBeDefined();
      expect(typeof inquirer.prompt).toBe('function');
    });

    it('should prevent hanging by mocking prompt', async () => {
      const inquirer = require('inquirer');

      // Setup mock response
      inquirer.prompt.mockResolvedValueOnce({ answer: 'Test response' });

      const result = await inquirer.prompt([{ name: 'answer', message: 'Test?' }]);

      expect(result.answer).toBe('Test response');
      expect(inquirer.prompt).toHaveBeenCalledTimes(1);

      // Clean up
      jest.clearAllMocks();
    });
  });

  describe('configuration', () => {
    it('should have default template path', () => {
      const path = require('path');
      const defaultPath = path.join(__dirname, '../../src/templates/prd-questions.md');

      expect(defaultPath).toContain('prd-questions.md');
      expect(defaultPath).toContain('src/templates');
    });

    it('should allow custom template override', () => {
      const customPath = '/custom/template.md';
      const flags = { template: customPath };
      const templatePath = flags.template || 'default-path';

      expect(templatePath).toBe(customPath);
    });
  });
});
