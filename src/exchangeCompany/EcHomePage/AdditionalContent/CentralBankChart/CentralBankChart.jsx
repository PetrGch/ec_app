import React from 'react';

import {Dropdown} from "../../../../common/controlLib";
import {sizeType} from "../../../../common/controlLib/util";

import './centralBankChart.less';
import {Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {mockData} from "./CentralBankChartMockData";

export const RANGE_TYPE = {
  DAILY: "DAILY",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  ANNUAL: "ANNUAL"
};

const colors = ["#85bf4b", "#50bfbf", "#272727", "#f27b38"];

const rangeTypeList = [
  {
    index: "week",
    value: "Week"
  },
  {
    index: "month",
    value: "Month"
  },
  {
    index: "quarter",
    value: "Quarter"
  },
  {
    index: "year",
    value: "Year"
  }
];

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
  constructor() {
    super();

    this.state = {
      selectedRange: "daily"
    };

    this.selectRange = this.selectRange.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
  }

  selectRange(range) {
    const { index } = range;
    this.setState({ selectedRange: index });
  }

  get chartData() {
    const lineData = [];
    const chartData = mockData.data.map(data => {
      const parsedData = {period: data.period};
      Object.keys(data.lines).forEach(key => {
        const newField = key.replace("_", " ");
        if (lineData.indexOf(newField) === -1) {
          lineData.push(newField);
        }
        parsedData[newField] = parseFloat(data.lines[key]).toFixed(3);
      });

      return parsedData;
    });

    return { lineData, chartData }
  }

  render() {
    const { selectedRange } = this.state;
    const data = this.chartData;

    return (
      <div className="centralBankChart">
        <div className="centralBankChart__header centralBankChartHeader">
          <div className="centralBankChartHeader__dropdown">
            <Dropdown
              size={sizeType.MD}
              list={rangeTypeList}
              selectedIndex={selectedRange}
              selectItem={this.selectRange}
            />
          </div>
        </div>
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
                tick={<CustomXAxisTick/>}
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
                    label={<CustomLabel/>}
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