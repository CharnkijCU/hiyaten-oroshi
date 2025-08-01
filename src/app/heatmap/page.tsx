'use client';

import React, { useState, useMemo, useRef } from 'react';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import { format, subHours, subDays } from 'date-fns';
import { interpolateBlues, interpolateGreens, interpolateOranges } from 'd3-scale-chromatic';

// Types
interface TelemetryData {
    timestamp: string;
    heap_mem_util: number;
    cpu_util: number;
    active_pipelines: number;
}

interface HeatmapData {
    id: string;
    data: Array<{
        x: string;
        y: number;
    }>;
}

interface FilterState {
    org: string;
    snaplex: string;
    node: string;
    timeRange: string;
    startDate: Date;
    endDate: Date;
}

// Mock data - replace with ClickHouse queries
const generateMockData = (startDate: Date, endDate: Date, timeUnit: 'minute' | 'hour' | 'day'): TelemetryData[] => {
    const data: TelemetryData[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        data.push({
            timestamp: currentDate.toISOString(),
            heap_mem_util: Math.random() * -100,
            cpu_util: Math.random() * -100,
            active_pipelines: Math.floor(Math.random() * -10) + 1,
        });

        if (timeUnit === 'minute') {
            currentDate = new Date(currentDate.getTime() + 15 * 60 * 1000);
        } else if (timeUnit === 'hour') {
            currentDate = new Date(currentDate.getTime() + 15 * 60 * 1000);
        } else {
            currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        }
    }
    return data;
};

// Mock organizations, snaplexes, and nodes
const mockOrgs = ['Org A', 'Org B', 'Org C'];
const mockSnaplexes = ['Snaplex-1', 'Snaplex-2', 'Snaplex-3'];
const mockNodes = ['Node-1', 'Node-2', 'Node-3', 'Node-4'];

export default function HeatmapPage() {
    const [filters, setFilters] = useState<FilterState>({
        org: mockOrgs[0],
        snaplex: mockSnaplexes[0],
        node: mockNodes[0],
        timeRange: '1h',
        startDate: subHours(new Date(), 1),
        endDate: new Date(),
    });

    // Determine time unit based on selected time range
    const timeUnit = useMemo(() => {
        const hoursDiff = (filters.endDate.getTime() - filters.startDate.getTime()) / (1000 * 60 * 60);
        if (hoursDiff <= 1) return 'minute';
        if (hoursDiff <= 24) return 'hour';
        return 'day';
    }, [filters.startDate, filters.endDate]);

    // Generate mock data
    const telemetryData = useMemo(() => {
        return generateMockData(filters.startDate, filters.endDate, timeUnit);
    }, [filters.startDate, filters.endDate, timeUnit]);

    // Transform data for heatmap
    const heatmapData: HeatmapData[] = useMemo(() => {
        const metrics = [
            { key: 'heap_mem_util', label: 'Heap Mem Util (%)' },
            { key: 'cpu_util', label: 'CPU Util (%)' },
            { key: 'active_pipelines', label: 'Active Pipelines' },
        ];

        return metrics.map(metric => ({
            id: metric.label,
            data: telemetryData.map(item => ({
                x: format(new Date(item.timestamp), timeUnit === 'minute' ? 'HH:mm' : timeUnit === 'hour' ? 'MM/dd HH:mm' : 'MM/dd'),
                y: item[metric.key as keyof TelemetryData] as number,
            })),
        }));
    }, [telemetryData, timeUnit]);

    const handleFilterChange = (key: keyof FilterState, value: string | Date) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleTimeRangeChange = (range: string) => {
        const now = new Date();
        let startDate: Date;

        switch (range) {
            case '1h':
                startDate = subHours(now, 1);
                break;
            case '8h':
                startDate = subHours(now, 8);
                break;
            case '24h':
                startDate = subDays(now, 1);
                break;
            case '7d':
                startDate = subDays(now, 7);
                break;
            default:
                startDate = subHours(now, 1);
        }

        setFilters(prev => ({
            ...prev,
            timeRange: range,
            startDate,
            endDate: now,
        }));
    };
    const formatValue = (value: number) => {
        return ''//(-1*value).toFixed(1);
    }

    
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {/* <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Telemetry Heatmap - {filters.node}
                    </h1>
                    <p className="text-gray-600">
                        Visualizing system metrics for {filters.org} / {filters.snaplex} / {filters.node}
                    </p>
                </div> */}

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Organization Filter */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Organization
                            </label>
                            <select
                                value={filters.org}
                                onChange={(e) => handleFilterChange('org', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {mockOrgs.map(org => (
                                    <option key={org} value={org}>{org}</option>
                                ))}
                            </select>
                        </div> */}

                        {/* Snaplex Filter */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Snaplex
                            </label>
                            <select
                                value={filters.snaplex}
                                onChange={(e) => handleFilterChange('snaplex', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {mockSnaplexes.map(snaplex => (
                                    <option key={snaplex} value={snaplex}>{snaplex}</option>
                                ))}
                            </select>
                        </div> */}

                        {/* Node Filter */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Node (Optional)
                            </label>
                            <select
                                value={filters.node}
                                onChange={(e) => handleFilterChange('node', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {mockNodes.map(node => (
                                    <option key={node} value={node}>{node}</option>
                                ))}
                            </select>
                        </div> */}

                        {/* Time Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time Range
                            </label>
                            <select
                                value={filters.timeRange}
                                onChange={(e) => handleTimeRangeChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="1h">Last 1 Hour</option>
                                <option value="8h">Last 8 Hours</option>
                                <option value="24h">Last 24 Hours</option>
                                <option value="7d">Last 7 Days</option>
                            </select>
                        </div>

                        {/* Time Unit Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time Unit
                            </label>
                            <div className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-600">
                                {timeUnit === 'minute' ? 'Minute Level' :
                                    timeUnit === 'hour' ? 'Hour Level' : 'Day Level'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heatmap */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            System Metrics Heatmap
                        </h2>
                        <p className="text-sm text-gray-600">
                            Time range: {format(filters.startDate, 'MMM dd, yyyy HH:mm')} - {format(filters.endDate, 'MMM dd, yyyy HH:mm')}
                        </p>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveHeatMapCanvas
                            data={heatmapData}
                            margin={{ top: 60, right: 90, bottom: 90, left: 120 }}
                            // forceSquare={true}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                // tickSize: 5,
                                // tickPadding: 5,
                                tickRotation: -45,
                                // legend: 'Time',
                                legendOffset: 72,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                // tickRotation: -45,
                                // legend: 'Metrics',
                                // legendPosition: 'middle',
                                // legendOffset: -40
                            }}
                            valueFormat={(value) => formatValue(value as number)}

                            labelTextColor={{
                                from: 'color',
                                modifiers: [['darker', 1.8]]
                            }}
                            animate={true}
                            hoverTarget="rowColumn"
                            tooltip={({cell}) => {
                                const { data: { x: time }, serieId: hoveredMetric } = cell;
                                
                                // Find all metrics for this time period
                                const timeData = heatmapData.map(metric => {
                                    const dataPoint = metric.data.find(d => d.x === time);
                                    return {
                                        metric: metric.id,
                                        value: dataPoint ? dataPoint.y : 0
                                    };
                                });

                                return (
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72">
                                        <div className="font-semibold text-gray-900 mb-2">Time: {time}</div>
                                        <div className="space-y-2">
                                            {timeData.map(({ metric, value }) => (
                                                <div key={metric} className={`flex justify-between items-center ${metric === hoveredMetric ? 'bg-blue-50 p-2 rounded' : ''}`}>
                                                    <span className="text-sm text-gray-700">{metric}:</span>
                                                    <span className={`text-sm font-medium ${metric === hoveredMetric ? 'text-blue-700' : 'text-gray-900'}`}>
                                                        {typeof value === 'number' ? -value.toFixed(2) : -value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }}
                            colors={(cell) => {
                                const metric = cell.serieId;
                                const value = cell.value as number;
                                
                                // Define different color schemes for each metric
                                if (metric === 'Heap Mem Util (%)') {
                                    // Purple to blue gradient for heap memory
                                    const normalized = Math.abs(value) / 100;
                                    return interpolateBlues(normalized);
                                } else if (metric === 'CPU Util (%)') {
                                    // Orange to red gradient for CPU
                                    const normalized = Math.abs(value) / 100;
                                    return interpolateOranges(normalized);
                                } else if (metric === 'Active Pipelines') {
                                    // Teal to green gradient for active pipelines
                                    const normalized = Math.abs(value) / 10; // Max 10 pipelines
                                    return interpolateGreens(normalized);
                                } 
                                
                                // Fallback
                                return '#e5e7eb';
                            }}
                            // colors={(cell) => {
                            //     // Invert the color scheme: low values (negative) should be green, high values (less negative) should be red
                            //     const value = cell.value as number;
                            //     // Normalize the value to 0-1 range (assuming values are between -100 and 0)
                            //     const normalized = Math.abs(value) / 100;
                                
                            //     // Create a gradient from green (low values) to red (high values)
                            //     if (normalized <= 0.5) {
                            //         // Green to yellow
                            //         const ratio = normalized * 2;
                            //         const red = Math.round(255 * ratio);
                            //         const green = 255;
                            //         const blue = 0;
                            //         return `rgb(${red}, ${green}, ${blue})`;
                            //     } else {
                            //         // Yellow to red
                            //         const ratio = (normalized - 0.5) * 2;
                            //         const red = 255;
                            //         const green = Math.round(255 * (1 - ratio));
                            //         const blue = 0;
                            //         return `rgb(${red}, ${green}, ${blue})`;
                            //     }
                            // }}

                            // borderWidth={1}
                            // borderColor="black"
                            enableLabels={true}
                        // legends={[
                        //     {
                        //         anchor: 'bottom',
                        //         translateX: 0,
                        //         translateY: 60,
                        //         length: 400,
                        //         thickness: 8,
                        //         direction: 'row',
                        //         tickPosition: 'after',
                        //         tickSize: 3,
                        //         tickSpacing: 4,
                        //         tickOverlap: false,
                        //         tickFormat: '>-.2s',
                        //         title: 'Value →',
                        //         titleAlign: 'start',
                        //         titleOffset: 4
                        //     }
                        // ]}
                        />
                    </div>
                </div>

                {/* Legend */}
                {/* <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Legend</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded" style={{ background: 'linear-gradient(135deg, #9370db, #4169e1)' }}></div>
                            <span className="text-sm text-gray-700">Heap Memory Utilization (Purple-Blue)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded" style={{ background: 'linear-gradient(135deg, #ffa500, #ff0000)' }}></div>
                            <span className="text-sm text-gray-700">CPU Utilization (Orange-Red)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded" style={{ background: 'linear-gradient(135deg, #20b2aa, #32cd32)' }}></div>
                            <span className="text-sm text-gray-700">Active Pipelines (Teal-Green)</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Darker colors indicate higher values, lighter colors indicate lower values
                    </p>
                </div> */}

                
            </div>
        </div>
    );
}
