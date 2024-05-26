import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React, { useState } from 'react';
import { SubstrateEntry } from '../../../types';
import LegendLabel from './LegendLabel';
import PieLegendStyles from "../styles/PieLegendStyles.module.css"
import { useSelector } from 'react-redux';
import { selectIsInfoNewOrEditing } from '../InfoCardSlice';
import { produce } from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
  substrateValues: SubstrateEntry[], 
  handleChangeSubstrate: () => void
}

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.plugins.legend.display = false


const pieOptions = {
  animation: {
    duration: 1000, // Duration of the animation in milliseconds
    easing: 'easeInOutQuart', // Easing function to use for the animation
  },
  legend: {
    display: false
  }
};

const data = {
  labels: ['worm casting'],
  datasets: [
    {
      label: '% of substrate',
      data: [1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const SubstrateChart:React.FC<Props> = ({substrateValues, handleChangeSubstrate}) => {
  const [chartData, setChartData] = useState<typeof data>(data);
  const isNewOrEditing = useSelector(selectIsInfoNewOrEditing)
  const remainingPercent = 100 - chartData?.datasets[0].data.reduce((acc, item) => acc + item, 0)

  const handleLabelChange = (dataIndex: number, newLabel: string) => {
    setChartData(
      produce(prevState => {
        prevState.labels[dataIndex] = newLabel
      })
    );
  }

  const handleLabelValueChange = (dataIndex: number, newValue: number) => {
    setChartData(
      produce(prevState => {
        prevState.datasets[0].data[dataIndex] = Number(newValue)
      })
    );
  }

  const handleAddLabel = () => {
    setChartData(prevState => {
        const newLabels = [...prevState.labels, "new label"]
        const dataSet = [...prevState.datasets]
        const dataSetObject = {...dataSet[0]}
        const newData = [...dataSetObject.data, 1]
        const newBackgroundColor = [...dataSetObject.backgroundColor, 'rgba(153, 102, 255, 0.2)']
        const newBorderColor = [...dataSetObject.borderColor, 'rgba(153, 102, 255, 1)']
        dataSetObject.backgroundColor = newBackgroundColor
        dataSetObject.borderColor = newBorderColor
        dataSetObject.data = newData
        const newState = {datasets: [dataSetObject], labels: newLabels}
        return newState
      }
    );
  }

  const handleRemoveLabel = (dataIndex: number, labelName: string) => {
    setChartData(
      produce(prevState => {
        prevState.labels.filter(label => label !== labelName)
        prevState.datasets[0].data.filter((_, index) => index !== dataIndex)
      })
    );
  }

  return (
    <div className={PieLegendStyles.pieChart}>
      <ul className={`${isNewOrEditing ? PieLegendStyles.substrateLegendGrid : PieLegendStyles.substrateLegend}`}>
        {chartData.labels.length > 0 && chartData.labels.map((label, index) => (
          <LegendLabel 
            combinedPercent={chartData?.datasets[0].data.reduce((acc, item) => acc + item, 0)}
            dataIndex={index}
            handleLabelValueChange={handleLabelValueChange}
            handleLabelChange={handleLabelChange}
            handleRemoveLabel={handleRemoveLabel}
            label={label} 
            value={chartData.datasets[0].data[index]} 
            backgroundColor={chartData.datasets[0].backgroundColor[index]}
            borderColor={chartData.datasets[0].borderColor[index]}
          />
        ))}
      </ul>
      {isNewOrEditing && (
        <button className={PieLegendStyles.addLabelButton} onClick={handleAddLabel}>
          Add a new substrate
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      {isNewOrEditing && <div>Remaining space: {remainingPercent}%</div>}
      <div className={PieLegendStyles.chart}>
        <Pie 
          data={chartData}
          options={pieOptions}
        />
      </div>
    </div>
  )
}

export default SubstrateChart