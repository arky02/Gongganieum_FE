import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PageType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

const CongestionCard = (props: {
  time: string[];
  value: number[];
  page: PageType;
}) => {
  const { time, value, page } = props;

  const data = {
    labels: time,
    datasets: [
      {
        data: value,
        borderColor: 'rgb(108, 144, 250)',
        backgroundColor: 'rgba(133, 162, 255, 0.5)',
      },
    ],
  };

  return (
    <DescriptionCard title='실시간 인구 및 혼잡도 추이 현황' page={page}>
      <div className='h-172 w-full'>
        <Line
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </DescriptionCard>
  );
};

export default CongestionCard;
