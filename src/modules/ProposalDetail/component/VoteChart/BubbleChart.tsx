import { Box, Button } from '@mui/material';
import * as d3 from 'd3';
import { useElementSize } from 'hooks/useElementSize';
import { useEffect, useRef, useState } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ReplayIcon from '@mui/icons-material/Replay';

type ChartValue = {
  name: string;
  value: number;
  optionName: string;
}

type Props = {
  data: ChartValue[]
}

type CategoryColorType = {
  For: string;
  Against: string;
  Abstain: string;
}

const CategoryColor = {
  'For': 'var(--for-vote-color)',
  'Against': 'var(--against-vote-color)',
  'Abstain': 'var(--abstain-vote-color)',
}

const BubbleChart = ({ data }: Props) => {
  const { height, ref, width } = useElementSize()
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const max = Math.max.apply(null, data.map(d => d.value));

  const bubble: any = d3.pack<ChartValue>()
    .size([width - 20, height - 20])
    .padding(5);

  const root = bubble(
    d3.hierarchy({ children: data })
      .sum((d: any) => d.value)
      .sort((a: any, b: any) => b.value - a.value)
  );

  const svgRef = useRef<SVGSVGElement | null>(null);

  const zoomBehavior: any = d3.zoom<SVGSVGElement, unknown>()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 10]) // Define the zoom extent (min and max scale)
    .on('zoom', (event) => {
      setZoomTransform(event.transform); // Update the zoom transform state
    })

  function zoomIn() {
    const svg = d3.select(svgRef.current);
    svg.transition().duration(750).call(zoomBehavior.scaleBy, 2)
  }

  function zoomOut() {
    const svg = d3.select(svgRef.current);
    svg.transition().duration(750).call(zoomBehavior.scaleBy, 0.5)
  }

  function resetZoom() {
    const svg = d3.select(svgRef.current);
    svg.transition()
      .duration(750)
      .call(zoomBehavior.transform, d3.zoomIdentity);
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Apply the zoom behavior to the SVG
    svg.call(zoomBehavior);

    // Reset zoom when the component is mounted
    svg.call(zoomBehavior.transform, d3.zoomIdentity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function getValueText(item: any) {
    if (item < max / 3.5) {
      return '';
    }
    return item;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" ref={ref} width="100%" height="100%" position="relative">
      <Box
        position="absolute"
        right="10px"
        top="50%"
        display="flex"
        flexDirection="column"
        sx={{ transform: 'translateY(-50%)' }}
        gap="10px"
      >
        <Button
          size="small"
          variant="outlined"
          sx={{ bgcolor: '#fff !important' }}
          onClick={zoomIn}
        >
          <ZoomInIcon />
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ bgcolor: '#fff !important' }}
          onClick={zoomOut}
        >
          <ZoomOutIcon />
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={resetZoom}
          sx={{ mt: "40px" }}
        >
          <ReplayIcon />
        </Button>
      </Box>
      <svg width={width} height={height} ref={svgRef}>
        <g transform={zoomTransform.toString()}>
          {(root?.children ?? [])?.map((d: any, i: number) => (
            <g className="node" transform={`translate(${d.x},${d.y})`} key={i}>
              <circle r={d.r} fill={CategoryColor[d.data.optionName as keyof CategoryColorType]}>
              </circle>
              <text dy=".3em" textAnchor="middle" fill="#fff">
                {getValueText(d.data.value)}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </Box>
  );
};

export default BubbleChart;
