import { Component } from '@angular/core'
import { Chart } from 'angular-highcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 
   series : any =  [{
    name: 'Installation & Developers',
    data: [43934, 48656, 65165, 81827, 112143, 142383,
        171533, 165174, 155157, 161454, 154610],
        type: undefined
}, {
    name: 'Manufacturing',
    data: [24916, 37941, 29742, 29851, 32490, 30282,
        38121, 36885, 33726, 34243, 31050]
}, {
    name: 'Sales & Distribution',
    data: [11744, 30000, 16005, 19771, 20185, 24377,
        32147, 30912, 29243, 29213, 25663]
}, {
    name: 'Operations & Maintenance',
    data: [null, null, null, null, null, null, null,
        null, 11164, 11218, 10077]
}, {
    name: 'Other',
    data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
        17300, 13053, 11906, 10073]
}]

series2 : any =  [{
  name: 'Share',
  data: [
      { name: 'Chrome', y: 73.24 },
      { name: 'Edge', y: 12.93 },
      { name: 'Firefox', y: 4.73 },
      { name: 'Safari', y: 2.50 },
      { name: 'Internet Explorer', y: 1.65 },
      { name: 'Other', y: 4.93 }
  ]
}]

series3 : any = [{
  name: 'Tokyo',
  data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
      194.1, 95.6, 54.4]

}, {
  name: 'New York',
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
      text: 'Browser market shares in April, 2022',
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
      text: 'Monthly Average Rainfall'
  },
  subtitle: {
      text: 'Source: WorldClimate.com'
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
      title: {
          text: 'Rainfall (mm)'
      }
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
      text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
      align: 'left'
  },

  subtitle: {
      text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
      align: 'left'
  },
  credits: {
    enabled: false
},
  yAxis: {
      title: {
          text: 'Number of Employees'
      }
  },

  xAxis: {
      accessibility: {
          rangeDescription: 'Range: 2010 to 2020'
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
