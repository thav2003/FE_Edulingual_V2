import React from 'react'
import type { StatisticProps } from 'antd'
import { Card, Col, ConfigProvider, Row, Space, Statistic } from 'antd'
import CountUp from 'react-countup'
import { DualAxes } from '@ant-design/plots'
import { Line } from '@ant-design/plots'
import useFetchData from '~/hooks/useFetch'
import { DashboardApi } from '~/api'
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
  const configDualAxes = {
    xField: 'time',
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 }
    ],
    legend: {
      color: {
        itemMarker: (v) => {
          if (v === 'waiting') return 'rect'
          return 'smooth'
        }
      }
    },
    children: [
      {
        type: 'interval',
        yField: 'waiting'
      },
      {
        type: 'line',
        yField: 'people',
        shapeField: 'smooth',
        scale: { color: { relations: [['people', '#fdae6b']] } },
        axis: { y: { position: 'right' } },
        style: { lineWidth: 2 }
      }
    ]
  }
  const fetchUsers = () => {
    return dashboardApi.apiV1DashboardUserGet()
  }
  const fetchTeachers = () => {
    return dashboardApi.apiV1DashboardTeacherGet()
  }
  const fetchExams = () => {
    return dashboardApi.apiV1DashboardExamGet()
  }
  const fetchFinances = () => {
    return dashboardApi.apiV1DashboardFinanceGet()
  }
  const [loadingUsers, errorUsers, responseUsers] = useFetchData(fetchUsers)
  const [loadingTeachers, errorTeachers, responseTeachers] = useFetchData(fetchTeachers)
  const [loadingExams, errorExams, responseExams] = useFetchData(fetchExams)
  const [loadingFinances, errorFinances, responseFinances] = useFetchData(fetchFinances)

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
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Bài kiểm tra tháng này'
                  value={responseExams?.data?.data?.dataThisMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Bài kiểm tra tháng trước'
                  value={responseExams?.data?.data?.dataLastMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Thu nhập tháng này'
                  value={responseFinances?.data?.data?.dataThisMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Thu nhập tháng trước'
                  value={responseFinances?.data?.data?.dataLastMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Giáo viên tháng này'
                  value={responseTeachers?.data?.data?.dataThisMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Giáo viên tháng trước'
                  value={responseTeachers?.data?.data?.dataLastMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Người dùng tháng này'
                  value={responseUsers?.data?.data?.dataThisMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered>
                <Statistic
                  title='Người dùng tháng trước'
                  value={responseUsers?.data?.data?.dataLastMonth}
                  formatter={formatter}
                />
              </Card>
            </Col>
            {/* <Col span={12}>
              <Card bordered>
                <Line {...configLine} />;
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered>
                <DualAxes {...configDualAxes} />
              </Card>
            </Col> */}
          </Row>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default DashboardPage
