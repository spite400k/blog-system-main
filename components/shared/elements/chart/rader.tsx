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
      categories: ['パラメータ1', 'パラメータ2', 'パラメータ3', 'パラメータ4', 'パラメータ5', 'パラメータ6'],
    },
    colors: ['#606DC2'],
  };

  return <ReactApexChart options={options} type="radar" series={series} width={'150%'}/>;
}

export default ApexChartRader;