import { Component } from '@angular/core'
import { Chart } from 'angular-highcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 
   series : any =  [{
    name: 'Sales',
    data: [43934, 48656, 65165, 81827, 112143, 142383,
        171533, 165174, 155157, 161454, 154610],
        type: undefined
}, ]

series2 : any =  [{
  name: 'Share',
  data: [
      { name: 'Camera', y: 73.24 },
      { name: 'SMPS', y: 12.93 },
      { name: 'Others', y: 4.73 }
  ]
}]

series3 : any = [{
  name: 'Sales',
  data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
      194.1, 95.6, 54.4]

}, {
  name: 'Expenses',
  data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
      106.6, 92.3]

}]
constructor(){
  setTimeout(()=>{

    this.getChartsData()
  },500)
}

pieChart :  any
monthlyChart : any
getChartsData(){

  this.pieChart = new Chart({
    chart: {
      plotShadow: false,
      type: 'pie',
      height: 300,
      // width: 300
  },
  title: {
      text: 'Product Wise Sales ',
      align: 'left'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  credits: {
    enabled: false
},
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              connectorColor: 'silver'
          }
      }
  },
  series: this.series2
  })

  this.monthlyChart = new Chart({
    chart: {
      type: 'column',
      height: 300,
      // width: 300
  },
  title: {
      text: 'Sales to Expense Ratio'
  },
  credits: {
    enabled: false
},
  xAxis: {
      categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
    //   title: {
    //       text: 'Sales '
    //   }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color}padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: this.series3
  })
 
}

  chart: any = new Chart({
    chart:{
      height: 300,
      // width: 300
    },
    title: {
      text: 'Total Sales',
      align: 'left'
  },

  credits: {
    enabled: false
},
  yAxis: {
      title: {
          text: 'Number of Sales'
      }
  },

  xAxis: {
      accessibility: {
        //   rangeDescription: 'Range: 2010 to 2020'
      }
  },

  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
  },

  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2010
      }
  },

  series: this.series,

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }

  })
  

}
