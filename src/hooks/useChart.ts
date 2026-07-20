import * as d3 from 'd3';
import { chartConfig } from 'src/config/chartConfig.ts';

export function useChart() {

  const innerWidth = chartConfig.innerWidth;
  const innerHeight = chartConfig.innerHeight;

  const xScale = d3.scaleLinear()
    .domain([1, 8])
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([100, 0])
    .range([0, innerHeight]);

  const illustrationOffset = chartConfig.layout.illustrationOffset;

  return {
    innerWidth: innerWidth,
    innerHeight: innerHeight,

    xScale: xScale,
    yScale: yScale,

    ticks: d3.range(1, 9),

    illustrationOffset,

  }
}