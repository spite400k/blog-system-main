import { Member } from 'member/types/member';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// https://swamplabo.com/react-chart-libraries/

function ApexChartRader(props: {member: Member}) {

  const series = [
    {
      name: '能力パラメータ',
      data: [
        props.member.param1, 
        props.member.param2, 
        props.member.param3, 
        props.member.param4, 
        props.member.param5, 
        props.member.param6],
    },
  ];
  const options = {
    chart: {
      id: 'simple-rader',
    },
    xaxis: {
      categories: ['Tactics', 'Kick', 'Dribble', 'Ball Control', 'Physical', 'Carrer'],
    },
    colors: ['#FF4560'],
    dataLabels: {
      enabled: true
    },
    radar: {
      size: 300,
      polygons: {
        strokeColors: '#e9e9e9',
        fill: {
          colors: ['#f8f8f8', '#fff']
        }
      }
    },
    
  };

  return <ReactApexChart options={options} type="radar" series={series} width={'130%'} height={350}/>;
}

export default ApexChartRader;