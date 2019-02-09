import React from 'react';
import moment from "moment/moment";

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CentralBankChartHeader from "./CentralBankChartHeader/CentralBankChartHeader";

import './centralBankChart.less';

const colors = ["#85bf4b", "#50bfbf"];

function CustomLabel(props) {
  const {x, y, value} = props;
  return (
    <text x={x} y={y - 6} textAnchor="middle" fill="#666" className="centralBankLineChart__lineLabel">
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
    <g transform={`translate(${x},${y + 10})`}>
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
    const {centralBank} = this.props;
    const lineData = ["sell price", "buy price"];

    const chartData = centralBank.central_bank_details
      ? centralBank.central_bank_details.map(detail => {
        const parsedData = { period: moment(detail.period).format("DD/MM/YYYY") };
        parsedData["sell price"] = parseFloat(detail.sell_price).toFixed(3);
        parsedData["buy price"] = parseFloat(detail.buy_price).toFixed(3);

        return parsedData;
      })
      : [];

    return {lineData, chartData}
  }

  render() {
    const {lng, centralBank, selectedRange, dispatch} = this.props;
    const data = this.chartData;

    if (!data.chartData.length) {
      return null;
    }

    return (
      <div className="centralBankChart">
        <CentralBankChartHeader
          lng={lng}
          selectedRange={selectedRange}
          dataHeader={centralBank}
          dispatch={dispatch}
        />
        <div className="centralBankChart__chart centralBankLineChart">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data.chartData}
              margin={{top: 30, left: 0, right: 0, bottom: 0}}
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