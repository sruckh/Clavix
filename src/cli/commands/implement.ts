import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { TaskManager } from '../../core/task-manager';
import { GitManager, CommitStrategy } from '../../core/git-manager';
import * as path from 'path';
import * as fs from 'fs-extra';

export default class Implement extends Command {
  static description = 'Start implementing tasks from the task plan';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --project my-app',
    '<%= config.bin %> <%= command.id %> --no-git',
  ];

  static flags = {
    project: Flags.string({
      char: 'p',
      description: 'PRD project name (defaults to most recent)',
    }),
    'tasks-path': Flags.string({
      description: 'Direct path to tasks.md file',
    }),
    'no-git': Flags.boolean({
      description: 'Skip git auto-commit setup',
      default: false,
    }),
    'commit-strategy': Flags.string({
      description: 'Auto-commit strategy (per-task, per-5-tasks, per-phase, none)',
      options: ['per-task', 'per-5-tasks', 'per-phase', 'none'],
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Implement);

    console.log(chalk.bold.cyan('\n🚀 Task Implementation\n'));

    try {
      const manager = new TaskManager();
      const gitManager = new GitManager();

      // Find tasks.md file
      let tasksPath: string;

      if (flags['tasks-path']) {
        tasksPath = flags['tasks-path'];
      } else {
        console.log(chalk.dim('Looking for task plan...'));
        const prdPath = await manager.findPrdDirectory(flags.project);
        tasksPath = path.join(prdPath, 'tasks.md');

        if (!(await fs.pathExists(tasksPath))) {
          console.log(chalk.red('\n✗ No tasks.md found!\n'));
          console.log(chalk.yellow('💡 Run'), chalk.cyan('clavix plan'), chalk.yellow('first to generate task breakdown\n'));
          this.exit(1);
          return;
        }

        console.log(chalk.dim(`Found: ${tasksPath}\n`));
      }

      // Read tasks
      const phases = await manager.readTasksFile(tasksPath);
      const stats = manager.getTaskStats(phases);

      // Display progress
      console.log(chalk.bold('Progress:'));
      console.log(chalk.cyan(`  Completed: ${stats.completed}/${stats.total} tasks (${stats.percentage.toFixed(0)}%)`));
      console.log(chalk.cyan(`  Remaining: ${stats.remaining} tasks`));
      console.log();

      // Check if all tasks are done
      if (stats.remaining === 0) {
        console.log(chalk.bold.green('✨ All tasks completed!\n'));
        console.log(chalk.gray('Great work! All implementation tasks are done.\n'));
        return;
      }

      // Find next task
      const nextTask = manager.findFirstIncompleteTask(phases);

      if (!nextTask) {
        console.log(chalk.yellow('⚠ No incomplete tasks found\n'));
        return;
      }

      // Display next task
      console.log(chalk.bold('Next Task:'));
      console.log(chalk.bold.white(`  ${nextTask.description}`));
      if (nextTask.prdReference) {
        console.log(chalk.dim(`  Reference: ${nextTask.prdReference}`));
      }
      console.log(chalk.dim(`  Phase: ${nextTask.phase}`));
      console.log();

      // Git auto-commit setup (if not skipped)
      let commitStrategy: CommitStrategy = 'none';

      if (!flags['no-git']) {
        const gitStatus = await gitManager.validateGitSetup();

        if (gitStatus.isRepo) {
          console.log(chalk.dim(`Git repository detected (branch: ${gitStatus.currentBranch})`));
          console.log();

          // Prompt for commit strategy (unless provided via flag)
          if (flags['commit-strategy']) {
            commitStrategy = flags['commit-strategy'] as CommitStrategy;
          } else {
            const response = await inquirer.prompt([
              {
                type: 'list',
                name: 'strategy',
                message: 'Do you want the AI agent to create local git commits automatically?',
                choices: [
                  {
                    name: 'After each phase/section completes',
                    value: 'per-phase',
                  },
                  {
                    name: 'After every 5 tasks',
                    value: 'per-5-tasks',
                  },
                  {
                    name: 'After each task',
                    value: 'per-task',
                  },
                  {
                    name: "No, don't create commits for me",
                    value: 'none',
                  },
                ],
                default: 'per-phase',
              },
            ]);

            commitStrategy = response.strategy as CommitStrategy;
          }

          if (commitStrategy !== 'none') {
            console.log(chalk.green(`✓ Auto-commit enabled: ${commitStrategy}\n`));
          } else {
            console.log(chalk.dim('Auto-commit disabled\n'));
          }
        } else {
          console.log(chalk.yellow('⚠ Not a git repository - auto-commits disabled\n'));
        }
      }

      // Display implementation instructions
      console.log(chalk.bold.cyan('Implementation Instructions:\n'));

      console.log(chalk.gray('The AI agent will now:'));
      console.log(chalk.gray(`  1. Implement: ${nextTask.description}`));
      console.log(chalk.gray('  2. Mark the task as completed in tasks.md'));
      if (commitStrategy !== 'none') {
        console.log(chalk.gray(`  3. Create git commits (strategy: ${commitStrategy})`));
      }
      console.log(chalk.gray('  4. Proceed to the next task'));
      console.log();

      // Save commit strategy to a config file for the AI agent to read
      const configPath = path.join(path.dirname(tasksPath), '.clavix-implement-config.json');
      await fs.writeJson(configPath, {
        commitStrategy,
        tasksPath,
        currentTask: nextTask,
        stats,
        timestamp: new Date().toISOString(),
      }, { spaces: 2 });

      console.log(chalk.bold.green('✓ Ready to implement!\n'));

      console.log(chalk.dim('Configuration saved to:'));
      console.log(chalk.dim(`  ${configPath}\n`));

      console.log(chalk.yellow('📝 Important Notes for AI Agent:\n'));
      console.log(chalk.gray('  • Follow the tasks in order from tasks.md'));
      console.log(chalk.gray('  • Mark each completed task: change [ ] to [x]'));
      console.log(chalk.gray(`  • Current task: ${nextTask.description}`));
      if (commitStrategy !== 'none') {
        console.log(chalk.gray(`  • Create git commits per strategy: ${commitStrategy}`));
      }
      console.log(chalk.gray('  • Use PRD as reference for implementation details'));
      console.log();

      console.log(chalk.dim('💡 Tip: The AI agent can run "clavix implement" again to resume progress\n'));

    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.red(`\n✗ Error: ${error.message}\n`));

        // Provide helpful hints
        if (error.message.includes('tasks.md')) {
          console.log(chalk.yellow('💡 Make sure you have generated a task plan first:'));
          console.log(chalk.gray('   Run'), chalk.cyan('clavix plan'), chalk.gray('to create tasks.md\n'));
        }
      } else {
        console.log(chalk.red('\n✗ An unexpected error occurred\n'));
      }
      this.exit(1);
    }
  }
}
