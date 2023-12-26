'use client'
import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import styles from './chart.module.css'
import { MemberType } from '@/types/member'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

// https://swamplabo.com/react-chart-libraries/

function ApexChartRader(props: { member: MemberType }) {
  const data = {
    labels: [
      'Tactics',
      'Kick',
      'Dribble',
      'Ball Control',
      'Physical',
      'Carrer'
    ],
    datasets: [
      {
        label: '能力パラメータ',
        data: [
          props.member.param1,
          props.member.param2,
          props.member.param3,
          props.member.param4,
          props.member.param5,
          props.member.param6
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  }

  return (
    <>
      <div className={styles.piechart}>
        <Radar data={data} />
      </div>
    </>
  )
}

export default ApexChartRader
