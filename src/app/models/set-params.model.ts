export class SetParams {
  constructor (
    public max_block_net_usage: number,
    public target_block_net_usage_pct: number,
    public max_transaction_net_usage: number,
    public base_per_transaction_net_usage: number,
    public net_usage_leeway: number,
    public context_free_discount_net_usage_num: number,
    public context_free_discount_net_usage_den: number,
    public max_block_cpu_usage: number,
    public target_block_cpu_usage_pct: number,
    public max_transaction_cpu_usage: number,
    public min_transaction_cpu_usage: number,
    public max_transaction_lifetime: number,
    public deferred_trx_expiration_window: number,
    public max_transaction_delay: number,
    public max_inline_action_size: number,
    public max_inline_action_depth: number,
    public max_authority_depth: number
  ) {}
}
