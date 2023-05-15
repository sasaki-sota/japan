'use client';
import * as d3 from 'd3';
import React, { useEffect } from 'react';

// GeoJsonファイルを読み込み
import geoJson from '../assets/japan.geo.json';

const Japan: React.FC = () => {
  useEffect(() => {
    const main = async () => {
      const width = 300; // 描画サイズ: 幅
      const height = 300; // 描画サイズ: 高さ
      const centerPos = [137.0, 38.2]; // 地図のセンター位置
      const scale = 1000; // 地図のスケール

      // 地図の投影設定
      const projection = d3
        .geoMercator()
        .center(centerPos)
        .translate([width / 2, height / 2])
        .scale(scale);

      // 地図をpathに投影(変換)
      const path = d3.geoPath().projection(projection);

      // SVG要素を追加
      const svg = d3
        .select(`#map-container`)
        .append(`svg`)
        .attr(`viewBox`, `0 0 ${width} ${height}`)
        .attr(`width`, `100%`)
        .attr(`height`, `100%`);

      //
      // [ メモ ]
      // 動的にGeoJsonファイルを読み込む場合は以下のコードを使用
      // const geoJson = await d3.json(`/japan.geo.json`);
      //

      // 都道府県の領域データをpathで描画
      svg
        .selectAll(`path`)
        .data(geoJson.features)
        .enter()
        .append(`path`)
        .attr(`d`, path)
        .attr(`stroke`, `#666`)
        .attr(`stroke-width`, 0.25)
        .attr(`fill`, `#2566CC`)
        .attr(`fill-opacity`, () => Math.random())
        .on(`click`, function (item: any) {
          // 都道府県名を取得
          const prefectureName = item.properties.name_ja;

          // 遷移先のURLを作成
          const url = `/prefecture/${encodeURIComponent(prefectureName)}`;

          // 遷移
          window.location.href = url;
        })
        .on(`mouseover`, function () {
          d3.select(this).attr(`fill`, `#CC4C39`);
          d3.select(this).attr(`stroke-width`, `1`);
        })
        .on(`mouseout`, function () {
          d3.select(this).
          .on(`mouseout`, function () {
            d3.select(this).attr(`fill`, `#2566CC`);
            d3.select(this).attr(`stroke-width`, `0.25`);
          });
      };
  
      main();
    }, []);
  
    return <div id="map-container" className="w-80 h-80 m-5" />;
  };
  
  export default Japan;
  