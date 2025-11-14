import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { TaskManager } from '../../core/task-manager';
import * as path from 'path';

export default class Plan extends Command {
  static description = 'Generate implementation task breakdown from PRD';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --project my-app',
    '<%= config.bin %> <%= command.id %> --prd-path .clavix/outputs/my-project',
  ];

  static flags = {
    project: Flags.string({
      char: 'p',
      description: 'PRD project name (defaults to most recent)',
    }),
    'prd-path': Flags.string({
      description: 'Direct path to PRD directory',
    }),
    'max-tasks': Flags.integer({
      description: 'Maximum tasks per phase',
      default: 20,
    }),
    overwrite: Flags.boolean({
      char: 'o',
      description: 'Overwrite existing tasks.md file',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Plan);

    console.log(chalk.bold.cyan('\n📋 Task Plan Generator\n'));
    console.log(chalk.gray('Analyzing PRD and generating implementation tasks...\n'));

    try {
      const manager = new TaskManager();

      // Find PRD directory
      let prdPath: string;

      if (flags['prd-path']) {
        prdPath = flags['prd-path'];
      } else {
        console.log(chalk.dim('Looking for PRD directory...'));
        prdPath = await manager.findPrdDirectory(flags.project);
        console.log(chalk.dim(`Found: ${prdPath}\n`));
      }

      // Check if tasks.md already exists
      const tasksPath = path.join(prdPath, 'tasks.md');
      const fs = await import('fs-extra');

      if (await fs.pathExists(tasksPath) && !flags.overwrite) {
        console.log(chalk.yellow('⚠ tasks.md already exists!\n'));
        console.log(chalk.gray(`Location: ${tasksPath}\n`));
        console.log(chalk.dim('Use --overwrite flag to regenerate tasks.md\n'));
        return;
      }

      // Generate tasks
      console.log(chalk.dim('Analyzing PRD content...'));
      const result = await manager.generateTasksFromPrd(prdPath, {
        maxTasksPerPhase: flags['max-tasks'],
        includeReferences: true,
        clearMode: 'fast',
      });

      // Display results
      console.log(chalk.bold.green('\n✨ Task plan generated successfully!\n'));

      console.log(chalk.bold('Summary:'));
      console.log(chalk.cyan(`  Total Phases: ${result.phases.length}`));
      console.log(chalk.cyan(`  Total Tasks: ${result.totalTasks}`));
      console.log();

      console.log(chalk.bold('Task Breakdown:\n'));
      for (const phase of result.phases) {
        console.log(chalk.bold(`  ${phase.name}`));
        console.log(chalk.gray(`    ${phase.tasks.length} tasks`));

        // Show first 3 tasks as preview
        const preview = phase.tasks.slice(0, 3);
        preview.forEach((task) => {
          console.log(chalk.dim(`    • ${task.description}`));
        });

        if (phase.tasks.length > 3) {
          console.log(chalk.dim(`    ... and ${phase.tasks.length - 3} more`));
        }

        console.log();
      }

      console.log(chalk.bold('Output:'));
      console.log(chalk.cyan(`  ${result.outputPath}`));
      console.log();

      console.log(chalk.bold.green('Next Steps:\n'));
      console.log(chalk.gray('  1. Review the generated tasks in tasks.md'));
      console.log(chalk.gray('  2. Edit if needed (add/remove/modify tasks)'));
      console.log(chalk.gray('  3. Run'), chalk.cyan('clavix implement'), chalk.gray('to start implementation'));
      console.log();

      console.log(chalk.dim('💡 Tip: Tasks follow CLEAR framework principles for optimal AI execution\n'));

    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(`\n✗ Error: ${error.message}\n`));

        // Provide helpful hints
        if (error.message.includes('No PRD')) {
          console.log(chalk.yellow('💡 Make sure you have generated a PRD first:'));
          console.log(chalk.gray('   Run'), chalk.cyan('clavix prd'), chalk.gray('to create a new PRD\n'));
        }
      } else {
        console.log(chalk.red('\n✗ An unexpected error occurred\n'));
      }
      this.exit(1);
    }
  }
}
