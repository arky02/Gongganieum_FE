import { ArcElement, Chart } from 'chart.js';
import ChartDataLables from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import DescriptionCard from './DescriptionCard';

Chart.register(ArcElement);
Chart.register(ChartDataLables);

const ResidentRatioCard = (props: {
  resident: number;
  noneResident: number;
}) => {
  const { resident, noneResident } = props;

  const data = {
    labels: ['남성', '여성'],
    datasets: [
      {
        label: '비율',
        data: [resident, noneResident],
        backgroundColor: ['rgb(110,121,135)', 'rgb(25,31,40)'],
      },
    ],
  };

  return (
    <DescriptionCard title='상주•비상주 비율'>
      <div className='h-172 w-full'>
        <Doughnut
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
              datalabels: {
                display: true,
                color: 'white',
                font: {
                  weight: 'bold',
                  size: 14,
                },
                formatter: (value) => {
                  return value ? value + '%' : '';
                },
              },
            },
            rotation: -90,
            circumference: 180,
            cutout: '50%',
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
      <div className='flex h-24 items-center justify-between px-16'>
        <div className='flex h-full items-center rounded-[6px] bg-[rgb(110,121,135)] px-4 text-14 font-600 text-white'>
          상주
        </div>
        <div className='flex h-full items-center rounded-[6px] bg-[rgb(25,31,40)] px-4 text-14 font-600 text-white'>
          비상주
        </div>
      </div>
    </DescriptionCard>
  );
};

export default ResidentRatioCard;
