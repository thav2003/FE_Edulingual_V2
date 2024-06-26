const eChart = {
  series: [
    {
      name: 'Sales',
      data: [450, 200, 100, 220, 500, 100, 400],
      color: '#fff'
    }
  ],

  options: {
    chart: {
      type: 'bar',
      width: '100%',
      height: 'auto',

      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 2
    },
    xaxis: {
      categories: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
        },

        formatter: function (value) {
          return Math.floor(value) // Chuyển đổi các giá trị thành số nguyên
        }
      }
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' VNĐ'
        }
      }
    }
  }
}

export default eChart
