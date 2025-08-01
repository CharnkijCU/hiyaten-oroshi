// Types for the response structure

export interface NodeMetrics {
  time_stamp: number;
  count: Record<string, number>;
  cpu_util: {
    sum: Record<string, number>;
    max: Record<string, number>;
  };
  cpu: {
    sum: Record<string, number>;
    max: Record<string, number>;
  };
  mem_util: {
    sum: Record<string, number>;
    max: Record<string, number>;
  };
  mem: {
    sum: Record<string, number>;
    max: Record<string, number>;
  };
  mem_committed: {
    sum: Record<string, number>;
    max: Record<string, number>;
  };
  mem_util_pct: {
    sum: Record<string, number>;
    max: Record<string, number>;
  };
}

export interface ResponseMap {
  by_node: NodeMetrics[];
  runtime_path: string;
}

export interface ApiResponse {
  response_map: ResponseMap;
  http_status_code: number;
}
