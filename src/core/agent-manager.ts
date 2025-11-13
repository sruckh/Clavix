import { AgentAdapter, AgentType } from '../types/agent';
import { ClaudeCodeAdapter } from './adapters/claude-code-adapter';
import { IntegrationError } from '../types/errors';

/**
 * Agent Manager - handles agent detection and registration
 */
export class AgentManager {
  private adapters: Map<string, AgentAdapter> = new Map();

  constructor() {
    // Register built-in adapters
    this.registerAdapter(new ClaudeCodeAdapter());
  }

  /**
   * Register a new agent adapter
   */
  registerAdapter(adapter: AgentAdapter): void {
    this.adapters.set(adapter.name, adapter);
  }

  /**
   * Get all registered adapters
   */
  getAdapters(): AgentAdapter[] {
    return Array.from(this.adapters.values());
  }

  /**
   * Get adapter by name
   */
  getAdapter(name: string): AgentAdapter | undefined {
    return this.adapters.get(name);
  }

  /**
   * Detect which agents are available in the current project
   */
  async detectAgents(): Promise<AgentAdapter[]> {
    const detected: AgentAdapter[] = [];

    for (const adapter of this.adapters.values()) {
      if (await adapter.detectProject()) {
        detected.push(adapter);
      }
    }

    return detected;
  }

  /**
   * Get agent adapter by name or throw error
   */
  requireAdapter(name: string): AgentAdapter {
    const adapter = this.getAdapter(name);
    if (!adapter) {
      throw new IntegrationError(
        `Agent "${name}" is not registered`,
        `Available agents: ${Array.from(this.adapters.keys()).join(', ')}`
      );
    }
    return adapter;
  }

  /**
   * Check if an agent is available
   */
  hasAgent(name: string): boolean {
    return this.adapters.has(name);
  }

  /**
   * Get list of available agent names
   */
  getAvailableAgents(): string[] {
    return Array.from(this.adapters.keys());
  }
}
