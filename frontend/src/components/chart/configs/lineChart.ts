const lineChart = {
  series: [
    {
      name: 'Mobile apps',
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      offsetY: 0
    },
    {
      name: 'Websites',
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      offsetY: 0
    }
  ],

  options: {
    chart: {
      width: '100%',
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },

    legend: {
      show: false
    },

    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c']
        }
      }
    },

    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c']
        }
      },
      categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    }
  }
}

export default lineChart
