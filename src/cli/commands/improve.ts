import { Command, Args } from '@oclif/core';
import chalk from 'chalk';
import { PromptOptimizer } from '../../core/prompt-optimizer';

export default class Improve extends Command {
  static description = 'Analyze and improve a prompt';

  static examples = [
    '<%= config.bin %> <%= command.id %> "Create a login page"',
    '<%= config.bin %> <%= command.id %> "Build an API for user management"',
  ];

  static args = {
    prompt: Args.string({
      description: 'The prompt to improve',
      required: true,
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Improve);

    if (!args.prompt || args.prompt.trim().length === 0) {
      console.log(chalk.red('\n✗ Please provide a prompt to improve\n'));
      console.log(chalk.gray('Example:'), chalk.cyan('clavix improve "Create a login page"'));
      return;
    }

    if (args.prompt.length < 10) {
      console.log(chalk.yellow('\n⚠️  Prompt is very short. Consider providing more detail.\n'));
    }

    console.log(chalk.bold.cyan('\n🔍 Analyzing prompt...\n'));

    const optimizer = new PromptOptimizer();
    const result = optimizer.improve(args.prompt);

    // Display analysis
    console.log(chalk.bold('Original Prompt:'));
    console.log(chalk.gray(result.original));
    console.log();

    // Display analysis results
    if (result.analysis.strengths.length > 0) {
      console.log(chalk.bold.green('✓ Strengths:'));
      result.analysis.strengths.forEach((strength) => {
        console.log(chalk.green(`  • ${strength}`));
      });
      console.log();
    }

    if (result.analysis.gaps.length > 0) {
      console.log(chalk.bold.yellow('⚠ Gaps:'));
      result.analysis.gaps.forEach((gap) => {
        console.log(chalk.yellow(`  • ${gap}`));
      });
      console.log();
    }

    if (result.analysis.ambiguities.length > 0) {
      console.log(chalk.bold.red('⚠ Ambiguities:'));
      result.analysis.ambiguities.forEach((ambiguity) => {
        console.log(chalk.red(`  • ${ambiguity}`));
      });
      console.log();
    }

    if (result.analysis.suggestions.length > 0) {
      console.log(chalk.bold.blue('💡 Suggestions:'));
      result.analysis.suggestions.forEach((suggestion) => {
        console.log(chalk.blue(`  • ${suggestion}`));
      });
      console.log();
    }

    // Display improved prompt
    console.log(chalk.bold.cyan('✨ Improved Prompt:\n'));
    console.log(chalk.dim('─'.repeat(80)));
    console.log(result.improved);
    console.log(chalk.dim('─'.repeat(80)));

    console.log(chalk.gray('\n💡 Tip: Copy the improved prompt above and use it with your AI agent\n'));
  }
}
