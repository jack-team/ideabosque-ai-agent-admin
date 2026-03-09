export type AppInstalledResult = {
  // 是否已安装
  authed: boolean;
  // 是否需要 订阅
  subscription_required: boolean;
  app_subscription: {
    active: boolean;
    plan_name: string;
    plan_code: string;
    status: string;
    current_period_end: string;
  };
  quotas: Record<string, {
    lte: number;
  }>;
}