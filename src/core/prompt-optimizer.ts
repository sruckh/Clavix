/**
 * PromptOptimizer - Analyzes and improves prompts using rule-based analysis
 */

export interface PromptAnalysis {
  gaps: string[];
  ambiguities: string[];
  strengths: string[];
  suggestions: string[];
}

export interface ImprovedPrompt {
  original: string;
  analysis: PromptAnalysis;
  improved: string;
}

export class PromptOptimizer {
  /**
   * Analyze a prompt and identify issues
   */
  analyze(prompt: string): PromptAnalysis {
    return {
      gaps: this.findGaps(prompt),
      ambiguities: this.findAmbiguities(prompt),
      strengths: this.findStrengths(prompt),
      suggestions: this.generateSuggestions(prompt),
    };
  }

  /**
   * Generate an improved version of the prompt
   */
  improve(prompt: string): ImprovedPrompt {
    const analysis = this.analyze(prompt);
    const improved = this.generateImprovedPrompt(prompt, analysis);

    return {
      original: prompt,
      analysis,
      improved,
    };
  }

  /**
   * Find gaps in the prompt
   */
  private findGaps(prompt: string): string[] {
    const gaps: string[] = [];

    if (!this.hasContext(prompt)) {
      gaps.push('Missing context: What is the background or current situation?');
    }

    if (!this.hasSuccessCriteria(prompt)) {
      gaps.push('No success criteria: How will you know when this is complete?');
    }

    if (!this.hasTechnicalDetails(prompt)) {
      gaps.push('Missing technical details: What technologies or constraints apply?');
    }

    if (!this.hasUserNeeds(prompt)) {
      gaps.push('No user perspective: Who will use this and what do they need?');
    }

    if (!this.hasExpectedOutput(prompt)) {
      gaps.push('Unclear expected output: What should the final deliverable look like?');
    }

    return gaps;
  }

  /**
   * Find ambiguities in the prompt
   */
  private findAmbiguities(prompt: string): string[] {
    const ambiguities: string[] = [];

    // Check for vague terms
    const vagueTerms = ['some', 'maybe', 'probably', 'should', 'could', 'nice to have'];
    for (const term of vagueTerms) {
      if (new RegExp(`\\b${term}\\b`, 'i').test(prompt)) {
        ambiguities.push(`Vague term: "${term}" - be more specific`);
      }
    }

    // Check for undefined pronouns
    if (/(this|that|these|those|it)\s+/gi.test(prompt) && prompt.length < 100) {
      ambiguities.push('Undefined references: What does "this" or "it" refer to?');
    }

    // Check for unspecified quantities
    if (/\b(many|several|few|some)\b/i.test(prompt)) {
      ambiguities.push('Unspecified quantities: How many exactly?');
    }

    return ambiguities;
  }

  /**
   * Find strengths in the prompt
   */
  private findStrengths(prompt: string): string[] {
    const strengths: string[] = [];

    if (this.hasContext(prompt)) {
      strengths.push('Clear context provided');
    }

    if (this.hasTechnicalDetails(prompt)) {
      strengths.push('Technical constraints specified');
    }

    if (this.hasSuccessCriteria(prompt)) {
      strengths.push('Success criteria defined');
    }

    if (prompt.length > 200) {
      strengths.push('Comprehensive detail provided');
    }

    if (/example|such as|like|e\.g\./i.test(prompt)) {
      strengths.push('Includes examples for clarity');
    }

    return strengths;
  }

  /**
   * Generate improvement suggestions
   */
  private generateSuggestions(prompt: string): string[] {
    const suggestions: string[] = [];

    if (!this.hasContext(prompt)) {
      suggestions.push('Add background: Explain the current situation or problem');
    }

    if (!this.hasSuccessCriteria(prompt)) {
      suggestions.push('Define success: Specify measurable criteria for completion');
    }

    if (!this.hasTechnicalDetails(prompt)) {
      suggestions.push('Add constraints: Specify technologies, integrations, or performance needs');
    }

    if (prompt.length < 50) {
      suggestions.push('Expand detail: Add more specific requirements and context');
    }

    if (!this.hasUserNeeds(prompt)) {
      suggestions.push('Consider users: Who will use this and what do they need?');
    }

    return suggestions;
  }

  /**
   * Generate improved prompt with structure
   */
  private generateImprovedPrompt(original: string, analysis: PromptAnalysis): string {
    let improved = '# Objective\n\n';
    improved += this.extractOrInferObjective(original) + '\n\n';

    improved += '# Requirements\n\n';
    improved += this.extractOrInferRequirements(original) + '\n\n';

    improved += '# Technical Constraints\n\n';
    improved += this.extractOrInferTechnical(original) + '\n\n';

    improved += '# Expected Output\n\n';
    improved += this.extractOrInferOutput(original) + '\n\n';

    improved += '# Success Criteria\n\n';
    improved += this.extractOrInferSuccess(original) + '\n';

    return improved;
  }

  // Helper methods for analysis
  private hasContext(prompt: string): boolean {
    return /\b(background|context|currently|existing|problem|issue|because)\b/i.test(prompt);
  }

  private hasSuccessCriteria(prompt: string): boolean {
    return /\b(success|complete|done|measure|metric|goal|should be able to)\b/i.test(prompt);
  }

  private hasTechnicalDetails(prompt: string): boolean {
    const techTerms = /\b(react|vue|angular|node|python|java|typescript|api|database|sql|nosql|aws|docker|kubernetes)\b/i;
    return techTerms.test(prompt) || /\b(integrate|performance|scale|security)\b/i.test(prompt);
  }

  private hasUserNeeds(prompt: string): boolean {
    return /\b(user|customer|client|team|developer|admin|visitor)\b/i.test(prompt);
  }

  private hasExpectedOutput(prompt: string): boolean {
    return /\b(output|result|deliverable|should|look like|include|contain)\b/i.test(prompt);
  }

  private extractOrInferObjective(prompt: string): string {
    // Try to find action verbs at the start
    const actionMatch = prompt.match(/^(create|build|develop|implement|add|update|fix|refactor|design)\s+(.+)/i);
    if (actionMatch) {
      return `${actionMatch[1]} ${actionMatch[2]}`;
    }
    return prompt.split('\n')[0] || prompt.substring(0, 100);
  }

  private extractOrInferRequirements(prompt: string): string {
    const lines = prompt.split('\n').filter((line) => line.trim());
    if (lines.length > 1) {
      return lines.slice(1).map((line) => `- ${line}`).join('\n');
    }
    return '- ' + prompt + '\n- [Add specific requirements based on objective]';
  }

  private extractOrInferTechnical(original: string): string {
    const techStack: string[] = [];

    if (/react/i.test(original)) techStack.push('React');
    if (/typescript/i.test(original)) techStack.push('TypeScript');
    if (/node/i.test(original)) techStack.push('Node.js');
    if (/python/i.test(original)) techStack.push('Python');

    if (techStack.length > 0) {
      return '- Technology stack: ' + techStack.join(', ') + '\n- [Add other constraints]';
    }

    return '- [Specify technologies, integrations, performance requirements]';
  }

  private extractOrInferOutput(original: string): string {
    if (/component|page|ui/i.test(original)) {
      return '- Functional, tested component\n- Responsive design\n- Accessible implementation';
    }
    if (/api|endpoint|service/i.test(original)) {
      return '- Working API endpoint(s)\n- Error handling\n- Documentation';
    }
    return '- [Describe what the final deliverable should look like]';
  }

  private extractOrInferSuccess(original: string): string {
    return '- Implementation matches requirements\n- All edge cases handled\n- Code is tested and documented\n- [Add specific success metrics]';
  }
}
