# Telemetry Heatmap Visualization

This project provides a comprehensive heatmap visualization for telemetry data from ClickHouse, featuring dynamic time ranges, multiple metrics, and interactive filtering.

## Features

### 🎯 Core Functionality
- **Dynamic Time Ranges**: Automatically adjusts time granularity based on selected range
  - 1 hour → Minute-level data
  - 8 hours → Hour-level data  
  - 24+ hours → Day-level data
- **Multiple Metrics**: Visualizes three key system metrics:
  - Heap Memory Utilization (%)
  - CPU Utilization (%)
  - Active Pipelines (count)
- **Interactive Filters**:
  - Organization selection
  - Snaplex selection
  - Node selection (optional)
  - Time range selection

### 📊 Visualization Features
- **Responsive Heatmap**: Built with Nivo heatmap library
- **Hover Tooltips**: Shows actual values and percentages
- **Color-coded Intensity**: Blue gradient from light (low) to dark (high)
- **Real-time Updates**: Data refreshes based on filter changes

## Project Structure

```
src/
├── app/
│   └── heatmap/
│       └── page.tsx          # Main heatmap component
├── lib/
│   └── clickhouse.ts         # ClickHouse integration utilities
└── ...
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- ClickHouse database with telemetry data
- Next.js 15+

### Installation
```bash
npm install
npm run dev
```

Visit `http://localhost:3000/heatmap` to see the heatmap.

## ClickHouse Integration

### Database Schema
The heatmap expects a `telemetry_metrics` table with the following structure:

```sql
CREATE TABLE telemetry_metrics (
    timestamp DateTime,
    org_name String,
    snaplex_name String,
    node_name String,
    heap_mem_util Float64,
    cpu_util Float64,
    active_pipelines UInt32
) ENGINE = MergeTree()
ORDER BY (org_name, snaplex_name, node_name, timestamp);
```

### Sample Data
```sql
INSERT INTO telemetry_metrics VALUES
('2024-01-15 10:00:00', 'Org A', 'Snaplex-1', 'Node-1', 75.5, 45.2, 12),
('2024-01-15 10:01:00', 'Org A', 'Snaplex-1', 'Node-1', 78.1, 47.8, 15),
('2024-01-15 10:02:00', 'Org A', 'Snaplex-1', 'Node-1', 72.3, 43.1, 11);
```

### Configuration
Update the ClickHouse configuration in your environment:

```typescript
const clickhouseConfig = {
  host: 'your-clickhouse-host',
  port: 8123,
  username: 'your-username',
  password: 'your-password',
  database: 'your-database'
};
```

## Usage

### 1. Filter Selection
- **Organization**: Select the target organization
- **Snaplex**: Choose the specific snaplex within the organization
- **Node**: Optionally filter by specific node
- **Time Range**: Select from predefined ranges (1h, 8h, 24h, 7d)

### 2. Time Granularity
The system automatically determines the appropriate time granularity:
- **1 Hour**: Shows minute-level data points
- **8 Hours**: Shows hour-level aggregated data
- **24+ Hours**: Shows day-level aggregated data

### 3. Metrics Display
The heatmap displays three metrics on the Y-axis:
- **Heap Memory Utilization**: Percentage of heap memory usage
- **CPU Utilization**: Percentage of CPU usage
- **Active Pipelines**: Number of active data pipelines

### 4. Interaction
- **Hover**: View detailed values and percentages
- **Color Intensity**: Darker colors indicate higher values
- **Real-time Updates**: Data refreshes when filters change

## API Integration

### Replace Mock Data
To use real ClickHouse data, replace the mock data generation in `page.tsx`:

```typescript
// Replace this:
const telemetryData = useMemo(() => {
  return generateMockData(filters.startDate, filters.endDate, timeUnit);
}, [filters.startDate, filters.endDate, timeUnit]);

// With this:
const telemetryData = useMemo(async () => {
  return await fetchTelemetryData(clickhouseConfig, {
    org: filters.org,
    snaplex: filters.snaplex,
    node: filters.node,
    startDate: filters.startDate,
    endDate: filters.endDate,
    timeUnit: timeUnit
  });
}, [filters, timeUnit]);
```

### Dynamic Filter Options
Load filter options from ClickHouse:

```typescript
const [organizations, setOrganizations] = useState<string[]>([]);

useEffect(() => {
  const loadOrganizations = async () => {
    const orgs = await getOrganizations(clickhouseConfig);
    setOrganizations(orgs);
  };
  loadOrganizations();
}, []);
```

## Customization

### Color Scheme
Modify the heatmap colors in `page.tsx`:

```typescript
colors={{
  type: 'sequential',
  scheme: 'blues' // Options: 'blues', 'greens', 'reds', 'purples', etc.
}}
```

### Metrics
Add or modify metrics by updating the metrics array:

```typescript
const metrics = [
  { key: 'heap_mem_util', label: 'Heap Memory Utilization (%)' },
  { key: 'cpu_util', label: 'CPU Utilization (%)' },
  { key: 'active_pipelines', label: 'Active Pipelines' },
  { key: 'new_metric', label: 'New Metric' }, // Add new metric
];
```

### Time Ranges
Customize available time ranges:

```typescript
const timeRanges = [
  { value: '1h', label: 'Last 1 Hour' },
  { value: '8h', label: 'Last 8 Hours' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' }, // Add new range
];
```

## Performance Considerations

### Data Aggregation
- Use ClickHouse's `toStartOfInterval()` for efficient time-based aggregation
- Implement data sampling for large time ranges
- Consider materialized views for frequently accessed data

### Caching
- Implement client-side caching for filter options
- Use server-side caching for expensive queries
- Consider Redis for session-based caching

### Query Optimization
- Ensure proper indexes on timestamp, org_name, snaplex_name, node_name
- Use partitioning by date for large datasets
- Monitor query performance with ClickHouse system tables

## Troubleshooting

### Common Issues

1. **No Data Displayed**
   - Check ClickHouse connection configuration
   - Verify table schema matches expected structure
   - Ensure data exists for selected filters

2. **Performance Issues**
   - Optimize ClickHouse queries with proper indexes
   - Implement data pagination for large datasets
   - Use materialized views for complex aggregations

3. **Time Zone Issues**
   - Ensure consistent timezone handling between frontend and ClickHouse
   - Use UTC timestamps for consistency

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 