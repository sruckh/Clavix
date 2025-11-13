import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import { QuestionEngine } from '../../core/question-engine';
import { PrdGenerator } from '../../core/prd-generator';
import { FileSystem } from '../../utils/file-system';

export default class Prd extends Command {
  static description = 'Generate a Product Requirements Document through Socratic questioning';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --quick',
    '<%= config.bin %> <%= command.id %> --project my-app',
  ];

  static flags = {
    quick: Flags.boolean({
      char: 'q',
      description: 'Use quick mode with fewer questions',
      default: false,
    }),
    project: Flags.string({
      char: 'p',
      description: 'Project name for organizing outputs',
    }),
    template: Flags.string({
      char: 't',
      description: 'Path to custom question template',
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Prd);

    console.log(chalk.bold.cyan('\n📋 PRD Generator\n'));
    console.log(chalk.gray("Let's create a comprehensive Product Requirements Document through strategic questions.\n"));

    try {
      // Initialize QuestionEngine
      const engine = new QuestionEngine();

      // Determine template path
      const templatePath = flags.template ||
        path.join(__dirname, '../../templates/prd-questions.md');

      // Load question flow
      console.log(chalk.dim('Loading questions...\n'));
      const flow = await engine.loadFlow(templatePath);

      console.log(chalk.bold(`${flow.name}`));
      console.log(chalk.gray(flow.description));
      console.log();

      // Collect answers through Socratic questioning
      const answers: Record<string, any> = {};
      let question = engine.getNextQuestion();

      while (question) {
        const progress = engine.getProgress();
        console.log(chalk.dim(`[${progress.current + 1}/${progress.total}]`));

        let answer;
        if (question.type === 'confirm') {
          const response = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'answer',
              message: question.text,
              default: question.default as boolean,
            },
          ]);
          answer = response.answer;
        } else if (question.type === 'list' && question.choices) {
          const response = await inquirer.prompt([
            {
              type: 'list',
              name: 'answer',
              message: question.text,
              choices: question.choices,
            },
          ]);
          answer = response.answer;
        } else {
          // Text input
          // Capture question reference for closure
          const currentQuestion = question;
          const response = await inquirer.prompt([
            {
              type: 'input',
              name: 'answer',
              message: currentQuestion.text,
              default: currentQuestion.default as string,
              validate: (input: string) => {
                // Check if required
                if (currentQuestion.required && !input.trim()) {
                  return 'This question is required';
                }

                // Run custom validation if exists
                if (currentQuestion.validate) {
                  const result = currentQuestion.validate(input);
                  if (result !== true) {
                    return result as string;
                  }
                }

                return true;
              },
            },
          ]);
          answer = response.answer;
        }

        // Submit answer
        if (answer && question) {
          const submitResult = engine.submitAnswer(question.id, answer);
          if (submitResult !== true) {
            console.log(chalk.red(`\n✗ ${submitResult}\n`));
            continue; // Ask again
          }
          answers[question.id] = answer;
        }

        console.log(); // Add spacing
        question = engine.getNextQuestion();
      }

      // All questions answered
      console.log(chalk.bold.green('\n✓ All questions answered!\n'));

      // Generate PRDs
      console.log(chalk.dim('Generating PRD documents...\n'));

      const generator = new PrdGenerator();
      const projectName = flags.project || generator.extractProjectName(answers);

      const outputPath = await generator.generate(answers, {
        projectName,
        outputDir: '.clavix/outputs',
      });

      // Display success message
      console.log(chalk.bold.green('✨ PRD documents generated successfully!\n'));
      console.log(chalk.bold('Output location:'));
      console.log(chalk.cyan(`  ${outputPath}`));
      console.log();
      console.log(chalk.bold('Generated files:'));
      console.log(chalk.gray(`  • full-prd.md`) + chalk.dim(' - Comprehensive PRD for team alignment'));
      console.log(chalk.gray(`  • quick-prd.md`) + chalk.dim(' - Condensed prompt for AI agents'));
      console.log();
      console.log(chalk.gray('💡 Tip: Use quick-prd.md as input for your AI agent to start development\n'));

    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(`\n✗ Error: ${error.message}\n`));
      } else {
        console.log(chalk.red('\n✗ An unexpected error occurred\n'));
      }
      this.exit(1);
    }
  }
}
