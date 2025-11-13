/**
 * Agent integration types
 */

export interface AgentAdapter {
  name: string;
  displayName: string;
  detectProject(): Promise<boolean>;
  generateCommands(templates: CommandTemplate[]): Promise<void>;
  injectDocumentation(blocks: ManagedBlock[]): Promise<void>;
  getCommandPath(): string;
}

export interface CommandTemplate {
  name: string;
  content: string;
  description: string;
}

export interface ManagedBlock {
  startMarker: string;
  endMarker: string;
  content: string;
  targetFile: string;
}

export type AgentType = 'claude-code' | 'cursor' | 'windsurf' | 'custom';
