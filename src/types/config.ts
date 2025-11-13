/**
 * Configuration types for Clavix
 */

export interface ClavixConfig {
  version: string;
  agent: string;
  templates: TemplateConfig;
  outputs: OutputConfig;
  preferences: PreferencesConfig;
  experimental?: Record<string, unknown>;
}

export interface TemplateConfig {
  prdQuestions: string;
  fullPrd: string;
  quickPrd: string;
}

export interface OutputConfig {
  path: string;
  format: 'markdown' | 'pdf';
}

export interface PreferencesConfig {
  autoOpenOutputs: boolean;
  verboseLogging: boolean;
  preserveSessions: boolean;
}

export const DEFAULT_CONFIG: ClavixConfig = {
  version: '1.0.0',
  agent: 'claude-code',
  templates: {
    prdQuestions: 'default',
    fullPrd: 'default',
    quickPrd: 'default',
  },
  outputs: {
    path: '.clavix/outputs',
    format: 'markdown',
  },
  preferences: {
    autoOpenOutputs: false,
    verboseLogging: false,
    preserveSessions: true,
  },
};
