export const chartConfig = {
  viewBox: {
    width: 800,
    height: 480,
  },
  margin: {
    top: 80,
    right: 90,
    bottom: 40,
    left: 65
  },
  get innerWidth() {
    return this.viewBox.width - this.margin.left - this.margin.right;
  },
  get innerHeight() {
    return this.viewBox.height - this.margin.top - this.margin.bottom;
  },
  layout: {
    illustrationOffset: 20
  } 
} as const;

export type ChartVariable =
  keyof typeof chartConfig;