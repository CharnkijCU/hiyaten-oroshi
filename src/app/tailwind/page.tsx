'use client';

import { useState, useMemo } from 'react';

interface CheatSheetItem {
  category: string;
  title: string;
  description: string;
  classes: string[];
  examples: { label: string; code: string; preview: string }[];
}

const cheatSheetData: CheatSheetItem[] = [
  {
    category: 'Layout',
    title: 'Display',
    description: 'Control how an element is displayed',
    classes: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'contents', 'hidden'],
    examples: [
      { 
        label: 'Block', 
        code: 'block', 
        preview: '<div class="block bg-blue-200 p-2 m-1">Block</div><div class="block bg-red-200 p-2 m-1">Block</div>' 
      },
      { 
        label: 'Flex', 
        code: 'flex', 
        preview: '<div class="flex bg-gray-100 p-2"><div class="bg-blue-200 p-1 m-1">1</div><div class="bg-red-200 p-1 m-1">2</div></div>' 
      },
      { 
        label: 'Grid', 
        code: 'grid', 
        preview: '<div class="grid grid-cols-2 gap-1 bg-gray-100 p-2"><div class="bg-blue-200 p-1">1</div><div class="bg-red-200 p-1">2</div><div class="bg-green-200 p-1">3</div><div class="bg-yellow-200 p-1">4</div></div>' 
      },
      { 
        label: 'Hidden', 
        code: 'hidden', 
        preview: '<div class="bg-gray-100 p-2"><span class="bg-blue-200 p-1">Visible</span><span class="hidden bg-red-200 p-1">Hidden</span></div>' 
      }
    ]
  },
  {
    category: 'Layout',
    title: 'Position',
    description: 'Control element positioning',
    classes: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    examples: [
      { 
        label: 'Relative', 
        code: 'relative', 
        preview: '<div class="relative bg-gray-100 p-4 h-16"><div class="absolute top-0 right-0 bg-red-200 p-1 text-xs">Top Right</div><div class="bg-blue-200 p-2">Content</div></div>' 
      },
      { 
        label: 'Absolute', 
        code: 'absolute', 
        preview: '<div class="relative bg-gray-100 p-4 h-16"><div class="absolute top-2 left-2 bg-red-200 p-1 text-xs">Absolute</div><div class="bg-blue-200 p-2">Content</div></div>' 
      },
      { 
        label: 'Fixed', 
        code: 'fixed', 
        preview: '<div class="bg-gray-100 p-4 h-16"><div class="bg-blue-200 p-2">Content</div><div class="bg-red-200 p-1 text-xs">Fixed (stays in place)</div></div>' 
      }
    ]
  },
  {
    category: 'Layout',
    title: 'Flexbox',
    description: 'Flexbox utilities for layout',
    classes: ['flex-row', 'flex-col', 'flex-wrap', 'flex-nowrap', 'justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around', 'items-start', 'items-center', 'items-end', 'items-stretch'],
    examples: [
      { 
        label: 'Row', 
        code: 'flex flex-row', 
        preview: '<div class="flex flex-row bg-gray-100 p-2"><div class="bg-blue-200 p-2 m-1">1</div><div class="bg-red-200 p-2 m-1">2</div><div class="bg-green-200 p-2 m-1">3</div></div>' 
      },
      { 
        label: 'Column', 
        code: 'flex flex-col', 
        preview: '<div class="flex flex-col bg-gray-100 p-2"><div class="bg-blue-200 p-2 m-1">1</div><div class="bg-red-200 p-2 m-1">2</div><div class="bg-green-200 p-2 m-1">3</div></div>' 
      },
      { 
        label: 'Center', 
        code: 'flex justify-center items-center', 
        preview: '<div class="flex justify-center items-center bg-gray-100 p-4 h-16"><div class="bg-blue-200 p-2">Centered</div></div>' 
      },
      { 
        label: 'Between', 
        code: 'flex justify-between', 
        preview: '<div class="flex justify-between bg-gray-100 p-2"><div class="bg-blue-200 p-2">Left</div><div class="bg-red-200 p-2">Right</div></div>' 
      }
    ]
  },
  {
    category: 'Layout',
    title: 'Grid',
    description: 'CSS Grid utilities',
    classes: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-12', 'grid-rows-1', 'grid-rows-2', 'grid-rows-3', 'gap-1', 'gap-2', 'gap-4', 'gap-8'],
    examples: [
      { 
        label: '2 Columns', 
        code: 'grid grid-cols-2 gap-4', 
        preview: '<div class="grid grid-cols-2 gap-2 bg-gray-100 p-2"><div class="bg-blue-200 p-2 text-center">1</div><div class="bg-red-200 p-2 text-center">2</div><div class="bg-green-200 p-2 text-center">3</div><div class="bg-yellow-200 p-2 text-center">4</div></div>' 
      },
      { 
        label: '3 Columns', 
        code: 'grid grid-cols-3 gap-4', 
        preview: '<div class="grid grid-cols-3 gap-1 bg-gray-100 p-2"><div class="bg-blue-200 p-1 text-center text-xs">1</div><div class="bg-red-200 p-1 text-center text-xs">2</div><div class="bg-green-200 p-1 text-center text-xs">3</div><div class="bg-yellow-200 p-1 text-center text-xs">4</div><div class="bg-purple-200 p-1 text-center text-xs">5</div><div class="bg-pink-200 p-1 text-center text-xs">6</div></div>' 
      },
      { 
        label: '12 Columns', 
        code: 'grid grid-cols-12 gap-2', 
        preview: '<div class="grid grid-cols-12 gap-1 bg-gray-100 p-2"><div class="col-span-4 bg-blue-200 p-1 text-center text-xs">4</div><div class="col-span-8 bg-red-200 p-1 text-center text-xs">8</div><div class="col-span-6 bg-green-200 p-1 text-center text-xs">6</div><div class="col-span-6 bg-yellow-200 p-1 text-center text-xs">6</div></div>' 
      }
    ]
  },
  {
    category: 'Spacing',
    title: 'Padding',
    description: 'Control element padding',
    classes: ['p-0', 'p-1', 'p-2', 'p-4', 'p-8', 'px-4', 'py-2', 'pt-4', 'pr-4', 'pb-4', 'pl-4'],
    examples: [
      { 
        label: 'All sides', 
        code: 'p-4', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 p-4 text-center">p-4</div></div>' 
      },
      { 
        label: 'Horizontal', 
        code: 'px-4', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 px-4 py-2 text-center">px-4</div></div>' 
      },
      { 
        label: 'Vertical', 
        code: 'py-2', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 px-2 py-2 text-center">py-2</div></div>' 
      },
      { 
        label: 'Top only', 
        code: 'pt-4', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 pt-4 pb-2 px-2 text-center">pt-4</div></div>' 
      }
    ]
  },
  {
    category: 'Spacing',
    title: 'Margin',
    description: 'Control element margins',
    classes: ['m-0', 'm-1', 'm-2', 'm-4', 'm-8', 'mx-auto', 'my-2', 'mt-4', 'mr-4', 'mb-4', 'ml-4'],
    examples: [
      { 
        label: 'All sides', 
        code: 'm-4', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 m-4 p-2 text-center">m-4</div></div>' 
      },
      { 
        label: 'Auto center', 
        code: 'mx-auto', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 mx-auto p-2 text-center w-24">mx-auto</div></div>' 
      },
      { 
        label: 'Vertical', 
        code: 'my-2', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-red-200 p-1 text-center text-xs">Top</div><div class="bg-blue-200 my-2 p-2 text-center">my-2</div><div class="bg-red-200 p-1 text-center text-xs">Bottom</div></div>' 
      },
      { 
        label: 'Top only', 
        code: 'mt-4', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-red-200 p-1 text-center text-xs">Top</div><div class="bg-blue-200 mt-4 p-2 text-center">mt-4</div></div>' 
      }
    ]
  },
  {
    category: 'Sizing',
    title: 'Width',
    description: 'Control element width',
    classes: ['w-0', 'w-1', 'w-2', 'w-4', 'w-8', 'w-16', 'w-32', 'w-64', 'w-auto', 'w-full', 'w-screen', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4'],
    examples: [
      { 
        label: 'Full width', 
        code: 'w-full', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 w-full p-2 text-center">w-full</div></div>' 
      },
      { 
        label: 'Half width', 
        code: 'w-1/2', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 w-1/2 p-2 text-center">w-1/2</div></div>' 
      },
      { 
        label: 'Auto width', 
        code: 'w-auto', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 w-auto p-2 text-center">w-auto</div></div>' 
      },
      { 
        label: 'Fixed width', 
        code: 'w-64', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 w-64 p-2 text-center">w-64</div></div>' 
      }
    ]
  },
  {
    category: 'Sizing',
    title: 'Height',
    description: 'Control element height',
    classes: ['h-0', 'h-1', 'h-2', 'h-4', 'h-8', 'h-16', 'h-32', 'h-64', 'h-auto', 'h-full', 'h-screen', 'h-1/2', 'h-1/3', 'h-2/3', 'h-1/4', 'h-3/4'],
    examples: [
      { 
        label: 'Full height', 
        code: 'h-full', 
        preview: '<div class="bg-gray-100 p-2 h-20"><div class="bg-blue-200 h-full p-2 text-center flex items-center justify-center">h-full</div></div>' 
      },
      { 
        label: 'Screen height', 
        code: 'h-screen', 
        preview: '<div class="bg-gray-100 p-2 h-20"><div class="bg-blue-200 h-16 p-2 text-center flex items-center justify-center">h-screen</div></div>' 
      },
      { 
        label: 'Auto height', 
        code: 'h-auto', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 h-auto p-2 text-center">h-auto</div></div>' 
      },
      { 
        label: 'Fixed height', 
        code: 'h-32', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 h-16 p-2 text-center flex items-center justify-center">h-32</div></div>' 
      }
    ]
  },
  {
    category: 'Typography',
    title: 'Font Size',
    description: 'Control text size',
    classes: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'],
    examples: [
      { 
        label: 'Small', 
        code: 'text-sm', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-sm">text-sm - Small text</div></div>' 
      },
      { 
        label: 'Base', 
        code: 'text-base', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-base">text-base - Base text</div></div>' 
      },
      { 
        label: 'Large', 
        code: 'text-lg', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-lg">text-lg - Large text</div></div>' 
      },
      { 
        label: 'Extra Large', 
        code: 'text-xl', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-xl">text-xl - Extra Large</div></div>' 
      }
    ]
  },
  {
    category: 'Typography',
    title: 'Font Weight',
    description: 'Control text weight',
    classes: ['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black'],
    examples: [
      { 
        label: 'Normal', 
        code: 'font-normal', 
        preview: '<div class="bg-gray-100 p-2"><div class="font-normal">font-normal - Normal weight</div></div>' 
      },
      { 
        label: 'Medium', 
        code: 'font-medium', 
        preview: '<div class="bg-gray-100 p-2"><div class="font-medium">font-medium - Medium weight</div></div>' 
      },
      { 
        label: 'Bold', 
        code: 'font-bold', 
        preview: '<div class="bg-gray-100 p-2"><div class="font-bold">font-bold - Bold weight</div></div>' 
      },
      { 
        label: 'Black', 
        code: 'font-black', 
        preview: '<div class="bg-gray-100 p-2"><div class="font-black">font-black - Black weight</div></div>' 
      }
    ]
  },
  {
    category: 'Typography',
    title: 'Text Alignment',
    description: 'Control text alignment',
    classes: ['text-left', 'text-right', 'text-center', 'text-justify'],
    examples: [
      { 
        label: 'Left', 
        code: 'text-left', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-left border-l-4 border-blue-500 pl-2">text-left - Left aligned text</div></div>' 
      },
      { 
        label: 'Center', 
        code: 'text-center', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-center border-l-4 border-blue-500 pl-2">text-center - Centered text</div></div>' 
      },
      { 
        label: 'Right', 
        code: 'text-right', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-right border-l-4 border-blue-500 pl-2">text-right - Right aligned text</div></div>' 
      },
      { 
        label: 'Justify', 
        code: 'text-justify', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-justify border-l-4 border-blue-500 pl-2">text-justify - Justified text</div></div>' 
      }
    ]
  },
  {
    category: 'Typography',
    title: 'Text Color',
    description: 'Control text color',
    classes: ['text-black', 'text-white', 'text-gray-500', 'text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500', 'text-pink-500', 'text-indigo-500'],
    examples: [
      { 
        label: 'Black', 
        code: 'text-black', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-black">text-black - Black text</div></div>' 
      },
      { 
        label: 'Gray', 
        code: 'text-gray-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-gray-500">text-gray-500 - Gray text</div></div>' 
      },
      { 
        label: 'Red', 
        code: 'text-red-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-red-500">text-red-500 - Red text</div></div>' 
      },
      { 
        label: 'Blue', 
        code: 'text-blue-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="text-blue-500">text-blue-500 - Blue text</div></div>' 
      }
    ]
  },
  {
    category: 'Backgrounds',
    title: 'Background Color',
    description: 'Control background colors',
    classes: ['bg-black', 'bg-white', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'],
    examples: [
      { 
        label: 'White', 
        code: 'bg-white', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-white p-3 text-center">bg-white</div></div>' 
      },
      { 
        label: 'Gray', 
        code: 'bg-gray-100', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-gray-200 p-3 text-center">bg-gray-100</div></div>' 
      },
      { 
        label: 'Red', 
        code: 'bg-red-100', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-red-100 p-3 text-center">bg-red-100</div></div>' 
      },
      { 
        label: 'Blue', 
        code: 'bg-blue-100', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-100 p-3 text-center">bg-blue-100</div></div>' 
      }
    ]
  },
  {
    category: 'Borders',
    title: 'Border Width',
    description: 'Control border width',
    classes: ['border', 'border-0', 'border-2', 'border-4', 'border-8', 'border-t', 'border-r', 'border-b', 'border-l'],
    examples: [
      { 
        label: 'Default', 
        code: 'border', 
        preview: '<div class="bg-gray-100 p-2"><div class="border border-gray-300 p-3 text-center">border</div></div>' 
      },
      { 
        label: 'Thick', 
        code: 'border-4', 
        preview: '<div class="bg-gray-100 p-2"><div class="border-4 border-gray-300 p-3 text-center">border-4</div></div>' 
      },
      { 
        label: 'Top only', 
        code: 'border-t', 
        preview: '<div class="bg-gray-100 p-2"><div class="border-t border-gray-300 p-3 text-center">border-t</div></div>' 
      },
      { 
        label: 'None', 
        code: 'border-0', 
        preview: '<div class="bg-gray-100 p-2"><div class="border-0 bg-white p-3 text-center">border-0</div></div>' 
      }
    ]
  },
  {
    category: 'Borders',
    title: 'Border Color',
    description: 'Control border colors',
    classes: ['border-black', 'border-white', 'border-gray-300', 'border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-purple-500'],
    examples: [
      { 
        label: 'Gray', 
        code: 'border border-gray-300', 
        preview: '<div class="bg-gray-100 p-2"><div class="border border-gray-300 p-3 text-center">border-gray-300</div></div>' 
      },
      { 
        label: 'Red', 
        code: 'border border-red-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="border border-red-500 p-3 text-center">border-red-500</div></div>' 
      },
      { 
        label: 'Blue', 
        code: 'border border-blue-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="border border-blue-500 p-3 text-center">border-blue-500</div></div>' 
      },
      { 
        label: 'Green', 
        code: 'border border-green-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="border border-green-500 p-3 text-center">border-green-500</div></div>' 
      }
    ]
  },
  {
    category: 'Borders',
    title: 'Border Radius',
    description: 'Control border radius',
    classes: ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'],
    examples: [
      { 
        label: 'None', 
        code: 'rounded-none', 
        preview: '<div class="bg-gray-100 p-2"><div class="rounded-none bg-blue-200 p-3 text-center">rounded-none</div></div>' 
      },
      { 
        label: 'Small', 
        code: 'rounded-sm', 
        preview: '<div class="bg-gray-100 p-2"><div class="rounded-sm bg-blue-200 p-3 text-center">rounded-sm</div></div>' 
      },
      { 
        label: 'Medium', 
        code: 'rounded-md', 
        preview: '<div class="bg-gray-100 p-2"><div class="rounded-md bg-blue-200 p-3 text-center">rounded-md</div></div>' 
      },
      { 
        label: 'Large', 
        code: 'rounded-lg', 
        preview: '<div class="bg-gray-100 p-2"><div class="rounded-lg bg-blue-200 p-3 text-center">rounded-lg</div></div>' 
      },
      { 
        label: 'Full', 
        code: 'rounded-full', 
        preview: '<div class="bg-gray-100 p-2"><div class="rounded-full bg-blue-200 p-3 text-center w-24 h-12 flex items-center justify-center">rounded-full</div></div>' 
      }
    ]
  },
  {
    category: 'Effects',
    title: 'Box Shadow',
    description: 'Control box shadows',
    classes: ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl', 'shadow-inner', 'shadow-none'],
    examples: [
      { 
        label: 'Small', 
        code: 'shadow-sm', 
        preview: '<div class="bg-gray-100 p-2"><div class="shadow-sm bg-white p-3 text-center">shadow-sm</div></div>' 
      },
      { 
        label: 'Default', 
        code: 'shadow', 
        preview: '<div class="bg-gray-100 p-2"><div class="shadow bg-white p-3 text-center">shadow</div></div>' 
      },
      { 
        label: 'Large', 
        code: 'shadow-lg', 
        preview: '<div class="bg-gray-100 p-2"><div class="shadow-lg bg-white p-3 text-center">shadow-lg</div></div>' 
      },
      { 
        label: 'Inner', 
        code: 'shadow-inner', 
        preview: '<div class="bg-gray-100 p-2"><div class="shadow-inner bg-white p-3 text-center">shadow-inner</div></div>' 
      }
    ]
  },
  {
    category: 'Effects',
    title: 'Opacity',
    description: 'Control element opacity',
    classes: ['opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'],
    examples: [
      { 
        label: '0%', 
        code: 'opacity-0', 
        preview: '<div class="bg-gray-100 p-2"><div class="opacity-0 bg-blue-200 p-3 text-center">opacity-0 (invisible)</div></div>' 
      },
      { 
        label: '25%', 
        code: 'opacity-25', 
        preview: '<div class="bg-gray-100 p-2"><div class="opacity-25 bg-blue-200 p-3 text-center">opacity-25</div></div>' 
      },
      { 
        label: '50%', 
        code: 'opacity-50', 
        preview: '<div class="bg-gray-100 p-2"><div class="opacity-50 bg-blue-200 p-3 text-center">opacity-50</div></div>' 
      },
      { 
        label: '100%', 
        code: 'opacity-100', 
        preview: '<div class="bg-gray-100 p-2"><div class="opacity-100 bg-blue-200 p-3 text-center">opacity-100</div></div>' 
      }
    ]
  },
  {
    category: 'Transforms',
    title: 'Scale',
    description: 'Control element scaling',
    classes: ['scale-0', 'scale-50', 'scale-75', 'scale-90', 'scale-95', 'scale-100', 'scale-105', 'scale-110', 'scale-125', 'scale-150'],
    examples: [
      { 
        label: '50%', 
        code: 'scale-50', 
        preview: '<div class="bg-gray-100 p-2"><div class="scale-50 bg-blue-200 p-3 text-center w-24 h-12 flex items-center justify-center">scale-50</div></div>' 
      },
      { 
        label: '100%', 
        code: 'scale-100', 
        preview: '<div class="bg-gray-100 p-2"><div class="scale-100 bg-blue-200 p-3 text-center">scale-100</div></div>' 
      },
      { 
        label: '110%', 
        code: 'scale-110', 
        preview: '<div class="bg-gray-100 p-2"><div class="scale-110 bg-blue-200 p-3 text-center">scale-110</div></div>' 
      },
      { 
        label: '150%', 
        code: 'scale-150', 
        preview: '<div class="bg-gray-100 p-2"><div class="scale-150 bg-blue-200 p-3 text-center">scale-150</div></div>' 
      }
    ]
  },
  {
    category: 'Transforms',
    title: 'Rotate',
    description: 'Control element rotation',
    classes: ['rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180'],
    examples: [
      { 
        label: '0°', 
        code: 'rotate-0', 
        preview: '<div class="bg-gray-100 p-2"><div class="rotate-0 bg-blue-200 p-3 text-center w-24 h-12 flex items-center justify-center">rotate-0</div></div>' 
      },
      { 
        label: '45°', 
        code: 'rotate-45', 
        preview: '<div class="bg-gray-100 p-2"><div class="rotate-45 bg-blue-200 p-3 text-center w-24 h-12 flex items-center justify-center">rotate-45</div></div>' 
      },
      { 
        label: '90°', 
        code: 'rotate-90', 
        preview: '<div class="bg-gray-100 p-2"><div class="rotate-90 bg-blue-200 p-3 text-center w-24 h-12 flex items-center justify-center">rotate-90</div></div>' 
      },
      { 
        label: '180°', 
        code: 'rotate-180', 
        preview: '<div class="bg-gray-100 p-2"><div class="rotate-180 bg-blue-200 p-3 text-center w-24 h-12 flex items-center justify-center">rotate-180</div></div>' 
      }
    ]
  },
  {
    category: 'Transitions',
    title: 'Transition',
    description: 'Control element transitions',
    classes: ['transition-none', 'transition-all', 'transition', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform'],
    examples: [
      { 
        label: 'All', 
        code: 'transition-all', 
        preview: '<div class="bg-gray-100 p-2"><div class="transition-all bg-blue-200 p-3 text-center hover:bg-red-200">transition-all (hover me)</div></div>' 
      },
      { 
        label: 'Colors', 
        code: 'transition-colors', 
        preview: '<div class="bg-gray-100 p-2"><div class="transition-colors bg-blue-200 p-3 text-center hover:bg-green-200">transition-colors (hover me)</div></div>' 
      },
      { 
        label: 'Transform', 
        code: 'transition-transform', 
        preview: '<div class="bg-gray-100 p-2"><div class="transition-transform bg-blue-200 p-3 text-center hover:scale-110">transition-transform (hover me)</div></div>' 
      },
      { 
        label: 'None', 
        code: 'transition-none', 
        preview: '<div class="bg-gray-100 p-2"><div class="transition-none bg-blue-200 p-3 text-center hover:bg-yellow-200">transition-none (hover me)</div></div>' 
      }
    ]
  },
  {
    category: 'Interactivity',
    title: 'Hover',
    description: 'Hover state utilities',
    classes: ['hover:bg-blue-500', 'hover:text-white', 'hover:scale-105', 'hover:shadow-lg', 'hover:rotate-12'],
    examples: [
      { 
        label: 'Background', 
        code: 'hover:bg-blue-500', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-gray-200 p-3 text-center hover:bg-blue-500 hover:text-white transition-colors">hover:bg-blue-500 (hover me)</div></div>' 
      },
      { 
        label: 'Text', 
        code: 'hover:text-white', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-500 p-3 text-center hover:text-white transition-colors">hover:text-white (hover me)</div></div>' 
      },
      { 
        label: 'Scale', 
        code: 'hover:scale-105', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-blue-200 p-3 text-center hover:scale-105 transition-transform">hover:scale-105 (hover me)</div></div>' 
      },
      { 
        label: 'Shadow', 
        code: 'hover:shadow-lg', 
        preview: '<div class="bg-gray-100 p-2"><div class="bg-white p-3 text-center hover:shadow-lg transition-shadow">hover:shadow-lg (hover me)</div></div>' 
      }
    ]
  },
  {
    category: 'Interactivity',
    title: 'Focus',
    description: 'Focus state utilities',
    classes: ['focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500'],
    examples: [
      { 
        label: 'No outline', 
        code: 'focus:outline-none', 
        preview: '<div class="bg-gray-100 p-2"><button class="focus:outline-none bg-blue-200 p-3 text-center">focus:outline-none (click me)</button></div>' 
      },
      { 
        label: 'Ring', 
        code: 'focus:ring-2 focus:ring-blue-500', 
        preview: '<div class="bg-gray-100 p-2"><button class="focus:ring-2 focus:ring-blue-500 bg-blue-200 p-3 text-center">focus:ring (click me)</button></div>' 
      },
      { 
        label: 'Border', 
        code: 'focus:border-blue-500', 
        preview: '<div class="bg-gray-100 p-2"><button class="focus:border-blue-500 border-2 border-transparent bg-blue-200 p-3 text-center">focus:border (click me)</button></div>' 
      }
    ]
  }
];

const categories = [...new Set(cheatSheetData.map(item => item.category))];

export default function TailwindCheatSheet() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedClass, setCopiedClass] = useState<string>('');

  const filteredData = useMemo(() => {
    return cheatSheetData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classes.some(cls => cls.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedClass(text);
      setTimeout(() => setCopiedClass(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Tailwind CSS Cheatsheet
            </h1>
            <p className="text-lg text-slate-600">
              The ultimate reference for Tailwind CSS utilities
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
                Search utilities
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search for classes, descriptions, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-slate-600">
            {filteredData.length} utility group{filteredData.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Cheatsheet Content */}
        <div className="grid gap-6">
          {filteredData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>

                {/* Examples */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Examples</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {item.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                        <div className="text-sm font-medium text-slate-700 mb-2">{example.label}</div>
                        <div className="bg-slate-50 rounded p-2 mb-3">
                          <code className="text-xs text-slate-600">{example.code}</code>
                        </div>
                        <div 
                          className="p-2 rounded bg-slate-100 text-sm text-slate-700 min-h-[2rem] flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: example.preview }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Classes */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">All Classes</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.classes.map((cls, classIndex) => (
                      <button
                        key={classIndex}
                        onClick={() => copyToClipboard(cls)}
                        className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200 ${
                          copiedClass === cls
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {cls}
                        {copiedClass === cls && (
                          <span className="ml-2 text-xs">✓ Copied!</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">No utilities found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">
              Built with ❤️ using Next.js and Tailwind CSS
            </p>
            <p className="text-xs mt-2">
              Click any class to copy it to your clipboard
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
