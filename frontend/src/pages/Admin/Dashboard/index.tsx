import React from 'react'
import type { StatisticProps } from 'antd'
import { Card, Col, ConfigProvider, Row, Space, Statistic, Typography } from 'antd'
import CountUp from 'react-countup'
import { Column, DualAxes } from '@ant-design/plots'
import { Line } from '@ant-design/plots'
import useFetchData from '~/hooks/useFetch'
import { DashboardApi } from '~/api'
import { formatCurrencyVND } from '~/utils/numberUtils'
import { randomInt } from 'crypto'
const formatter: StatisticProps['formatter'] = (value) => <CountUp end={value as number} separator=',' />

const dashboardApi = new DashboardApi()
const DashboardPage: React.FC = () => {
  const configLine = {
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json'
    },
    xField: (d) => new Date(d.Date),
    yField: 'Close',
    colorField: 'Symbol',
    normalize: { basis: 'first', groupBy: 'color' },
    scale: {
      y: { type: 'log' }
    },
    axis: {
      y: { title: '↑ Change in price (%)' }
    },
    label: {
      text: 'Symbol',
      selector: 'last',
      style: {
        fontSize: 10
      }
    },
    tooltip: { channel: 'y', valueFormatter: '.1f' }
  }

  const fetchUsers = () => {
    return dashboardApi.apiV1DashboardUserGet()
  }
  const fetchTeachers = () => {
    return dashboardApi.apiV1DashboardTeacherGet()
  }
  // const fetchExams = () => {
  //   return dashboardApi.apiV1DashboardExamGet()
  // }
  const fetchFinances = () => {
    return dashboardApi.apiV1DashboardFinanceGet()
  }
  const [loadingUsers, errorUsers, responseUsers] = useFetchData(fetchUsers)
  const [loadingTeachers, errorTeachers, responseTeachers] = useFetchData(fetchTeachers)
  // const [loadingExams, errorExams, responseExams] = useFetchData(fetchExams)
  const [loadingFinances, errorFinances, responseFinances] = useFetchData(fetchFinances)

  console.log(responseFinances?.data?.data)
  const dataFinances = responseFinances ? responseFinances?.data?.data : {}
  const dataTeachers = responseTeachers ? responseTeachers?.data?.data : {}
  const dataUsers = responseUsers ? responseUsers?.data?.data : {}
  console.log(dataFinances)

  const dayMap = {
    dataInMonday: 'Thứ 2',
    dataInTuesday: 'Thứ 3',
    dataInWednesday: 'Thứ 4',
    dataInThursday: 'Thứ 5',
    dataInFriday: 'Thứ 6',
    dataInSaturday: 'Thứ 7',
    dataInSunday: 'Chủ nhật'
  }
  const resultFinance = Object.entries(dataFinances).map(([key, value]) => ({
    day: dayMap[key],
    value: value
  }))
  const resultTeachers = Object.entries(dataTeachers).map(([key, value]) => ({
    day: dayMap[key],
    value: value
  }))
  const resultUsers = Object.entries(dataUsers).map(([key, value]) => ({
    day: dayMap[key],
    value: value
  }))
  return (
    <div
      style={{
        height: '100%'
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            lineWidth: 1
          }
        }}
      >
        <div className='h-full p-10 bg-[#FFFFFF]'>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Typography.Title>Teacher</Typography.Title>
              <Card bordered>
                <Column
                  {...{
                    data: resultTeachers,
                    xField: 'day',
                    yField: 'value',
                    label: {
                      text: (d) => `${formatCurrencyVND(d.value)}`,
                      textBaseline: 'bottom'
                    },

                    legend: false
                  }}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Typography.Title>Finance</Typography.Title>
              <Card bordered>
                <Column
                  {...{
                    data: resultFinance,
                    xField: 'day',
                    yField: 'value',
                    label: {
                      text: (d) => `${formatCurrencyVND(d.value)}`,
                      textBaseline: 'bottom'
                    },

                    legend: false
                  }}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Typography.Title>User</Typography.Title>
              <Card bordered>
                <Column
                  {...{
                    data: responseUsers,
                    xField: 'day',
                    yField: 'value',
                    label: {
                      text: (d) => `${formatCurrencyVND(d.value)}`,
                      textBaseline: 'bottom'
                    },

                    legend: false
                  }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default DashboardPage
