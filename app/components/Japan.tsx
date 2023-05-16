'use client';
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import geoJson from '../assets/japan.geo.json';

const MapComponent: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 400;
    const height = 400;
    const centerPos = [137.0, 38.2];
    const scale = 1000;

    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([width / 2, height / 2])
      .scale(scale);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    svg
      .selectAll('path')
      .data(geoJson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', '#666')
      .attr('stroke-width', 0.25)
      .attr('fill', '#2566CC')
      .attr('fill-opacity', () => Math.random())
      .on('mouseover', function () {
        const group = svg.append('g').attr('id', 'label-group');
        const label = d3.select(this).data()[0].properties.name_ja;

        const rectElement = group
          .append('rect')
          .attr('id', 'label-rect')
          .attr('stroke', '#666')
          .attr('stroke-width', 0.5)
          .attr('fill', '#fff');

        const textElement = group
          .append('text')
          .attr('id', 'label-text')
          .text(label);

        const padding = { x: 5, y: 0 };
        const textSize = textElement.node()!.getBBox();
        rectElement
          .attr('x', textSize.x - padding.x)
          .attr('y', textSize.y - padding.y)
          .attr('width', textSize.width + padding.x * 2)
          .attr('height', textSize.height + padding.y * 2);

        d3.select(this).attr('fill', '#CC4C39').attr('stroke-width', '1');
      })
      .on('mousemove', function () {
        const textSize = svg.select('#label-text').node()!.getBBox();
        const labelPos = {
          x: d3.event.offsetX - textSize.width,
          y: d3.event.offsetY - textSize.height,
        };

        svg
          .select('#label-group')
          .attr('transform', `translate(${labelPos.x}, ${labelPos.y})`);
      })
      .on('mouseout', function () {
        svg.select('#label-group').remove();
        d3.select(this).attr('fill', '#2566CC').attr('stroke-width', '0.25');
      });
  }, []);

  return <div id="map-container" ref={svgRef} />;
};

export default MapComponent;
