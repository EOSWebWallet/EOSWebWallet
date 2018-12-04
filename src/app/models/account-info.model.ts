export interface AccountInfo { // Snake case naming because of mapping
  usd_total: number
  cpu_used_sec: number
  cpu_available_sec: number
  cpu_max_sec: number
  net_used_layout: string
  net_available_layout: string
  net_max_layout: string
  net_used_kb: number
  net_available_kb: number
  net_max_kb: number
  net_sign_string: string
  ram_used_kb: number
  ram_available_kb: number
  ram_max_kb: number
  ram_used_layout: string
  ram_available_layout: string
  ram_max_layout: string
  ram_sign_string: string
  refund: number
  refund_request: {net_amount: string, cpu_amount: string, request_time: string}
  refund_time: string
  privileged: boolean
  total_balance: string
  total_balance_cut: string[]
  account_name: string
  core_liquid_balance: string
  balance_cut: string[]
  procent_for_bar: number
  cpu_stacked: string;
  net_stacked: string;
  cpu_self_stacked:string;
  net_self_stacked:string;
  staked: number
  staked_cut: string[]
  unstaked: number
  unstaked_cut: string
  netData: string[]
  cpuData: string[]
  ram_usage: string
  ram_quota: string
  created: string
  net_percent: number
  cpu_percent: number
  ram_percent: number
  self_delegated_bandwidth: {from: string, to: string, cpu_weight: string, net_weight: string}
  voter_info: {staked: string}
  total_resources: {cpu_weight: string, net_weight: string, owner: string}
  net_limit: {used: string, available: string, max: string}
  cpu_limit: {used: string, available: string, max: string}
  tokens: {
    token: string
    balance: string
    international: string
  }[]
  net_size_symbol: string
}
