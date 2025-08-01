import { HeatmapRect } from "@visx/heatmap";
import { scaleBand, scaleLinear } from "@visx/scale";
import Example from "../components/VisxHeatMap";
export default function Heatmap() {
  return (
    <div>
      <Example width={1500} height={1000}/>
    </div>
  );
}