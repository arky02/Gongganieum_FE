import { ArcElement, Chart } from 'chart.js';
import ChartDataLables from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import { PageType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

Chart.register(ArcElement);
Chart.register(ChartDataLables);

const AgeRatioCard = (props: {
  ageTeenager: number;
  ageTwenties: number;
  ageThirties: number;
  ageForties: number;
  ageFifties: number;
  ageSixties: number;
  page: PageType;
}) => {
  const {
    ageTeenager,
    ageTwenties,
    ageThirties,
    ageForties,
    ageFifties,
    ageSixties,
    page,
  } = props;

  const data = {
    labels: ['10대', '20대', '30대', '40대', '50대', '60대'],
    datasets: [
      {
        label: '비율',
        data: [
          ageTeenager,
          ageTwenties,
          ageThirties,
          ageForties,
          ageFifties,
          ageSixties,
        ],
        backgroundColor: [
          'rgb(244, 214, 61)',
          'rgb(254, 125, 74)',
          'rgb(239, 83, 80)',
          'rgb(78, 177, 53)',
          'rgb(66, 124, 216)',
          'rgb(105, 87, 203)',
        ],
      },
    ],
  };

  return (
    <DescriptionCard title='연령대별 비율' page={page}>
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
      <div className='flex h-24 items-center justify-between px-4'>
        <div className='flex items-center gap-4 text-12 font-700'>
          <div className='h-8 w-8 rounded-full bg-[rgb(244,214,61)]' />
          10대
        </div>
        <div className='flex items-center gap-4 text-12 font-700'>
          <div className='h-8 w-8 rounded-full bg-[rgb(254,125,74)]' />
          20대
        </div>
        <div className='flex items-center gap-4 text-12 font-700'>
          <div className='h-8 w-8 rounded-full bg-[rgb(239,83,80)]' />
          30대
        </div>
        <div className='flex items-center gap-4 text-12 font-700'>
          <div className='h-8 w-8 rounded-full bg-[rgb(78,177,53)]' />
          40대
        </div>
        <div className='flex items-center gap-4 text-12 font-700'>
          <div className='h-8 w-8 rounded-full bg-[rgb(66,124,216)]' />
          50대
        </div>
        <div className='flex items-center gap-4 text-12 font-700'>
          <div className='h-8 w-8 rounded-full bg-[rgb(105,87,203)]' />
          60대
        </div>
      </div>
    </DescriptionCard>
  );
};

export default AgeRatioCard;
