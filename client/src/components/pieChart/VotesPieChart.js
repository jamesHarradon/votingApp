import React from 'react';

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export,
  Annotation,
  Size,
  Font,
} from 'devextreme-react/pie-chart';

const data = [{ name: 'Votes', value: 5}, {name: 'Yet to Vote', value: 15}]
const customizeLabel = (point) => {
  return `${point.argumentText}: ${point.valueText}`;
}

const customizeTooltip = (arg) => {
    return {
      text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
    };
}

export default function VotesPieChart() {
    return (
      <PieChart
        id="pie"
        type="doughnut"
        palette="Soft Blue"
        dataSource={data}
      >
        <Size width='500' height='300' />
        <Series argumentField="name" valueField='value'>
        <Label
            visible={true}
            format="fixedPoint"
            customizeText={customizeLabel}
          >
            <Font size='24' />
            <Connector visible={true} width={1} />
          </Label>
        </Series>
        <Legend
          visible={false}
        />
      </PieChart>
    );
}



