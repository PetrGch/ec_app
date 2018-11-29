import React from 'react';

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CentralBankChartHeader from "./CentralBankChartHeader/CentralBankChartHeader";

import './centralBankChart.less';

const colors = ["#85bf4b", "#50bfbf"];

function CustomLabel(props) {
  const { x, y, value } = props;
  return (
    <text x={x} y={y-6} textAnchor="middle" fill="#666" className="centralBankLineChart__lineLabel">
      {parseFloat(value).toFixed(2)}
    </text>
  );
}

function CustomYAxisTick(props) {
  const {x, y, payload} = props;
  return (
    <text x={x} y={y} textAnchor="end" fill="#666">
      <tspan className="centralBankLineChart__yAxisTick">
        {payload.value}
      </tspan>
    </text>
  );
}

function CustomXAxisTick(props) {
  const {x, y, payload} = props;
  return (
    <g transform={`translate(${x},${y+10})`}>
      <text x={0} y={0} textAnchor="middle" fill="#666">
        <tspan className="centralBankLineCha rt__xAxisTick">
          {payload.value}
        </tspan>
      </text>
    </g>
  );
}

export default class CentralBankChart extends React.PureComponent {
  get chartData() {
    const { centralBank } = this.props;
    const lineData = [];

    const chartData = centralBank.dataDetail ? centralBank.dataDetail.map(data => {
      const parsedData = {period: data.period};
      Object.keys(data.lines).forEach(key => {
        const newField = key.replace("_", " ");
        if (lineData.indexOf(newField) === -1) {
          lineData.push(newField);
        }
        parsedData[newField] = parseFloat(data.lines[key]).toFixed(3);
      });

      return parsedData;
    }) : [];

    return { lineData, chartData }
  }

  render() {
    const { lng, centralBank, selectedRange, dispatch } = this.props;
    const data = this.chartData;

    if (!centralBank.dataHeader || data.chartData.length === 0) {
      return null;
    }

    return (
      <div className="centralBankChart">
        <CentralBankChartHeader
          lng={lng}
          selectedRange={selectedRange}
          dataHeader={centralBank.dataHeader}
          dispatch={dispatch}
        />
        <div className="centralBankChart__chart centralBankLineChart">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data.chartData}
              margin={{ top: 30, left: 0, right: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                tick={ <CustomXAxisTick/>}
              />
              <YAxis
                domain={['auto', 'auto']}
                tickSize={20}
                tickLine={false}
                axisLine={false}
                tick={<CustomYAxisTick/>}
              />
              <Tooltip/>
              {
                data.lineData.map((line, index) =>
                  (<Line
                    key={line}
                    dot={selectedRange !== "all"}
                    label={selectedRange !== "all" ? <CustomLabel/> : false}
                    dataKey={line}
                    stroke={colors[index]}
                    fill={colors[index]}
                  />))
              }
              <Legend
                verticalAlign="bottom"
                align="right"
                iconType="square"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}