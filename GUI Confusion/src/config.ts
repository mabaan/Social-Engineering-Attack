// Configuration for experimental conditions
export interface AttackConfig {
  useFullscreen: boolean;
  conditionName: string;
}

// Global configuration set by the entry point
export let attackConfig: AttackConfig = {
  useFullscreen: true,
  conditionName: "A"
};

export function setAttackConfig(config: AttackConfig): void {
  attackConfig = config;
}
