<template>
  <div id="myChart" style="width: 49%;height: 350px;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data(){
      return {
        dataArr:['第一季度','第二季度','第三季度','第四季度']//需要替换的数据
      }
    },
    mounted(){
      this.drawLine()
    },
    methods: {
      drawLine () {
        let odataArr = this.dataArr;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          backgroundColor: '#010105',
          color: '#0fe6f9',
          title: {
            text: '交易次数统计',
            x: 'left',
            y: 'top',
            textStyle: {
              fontSize: 16,
              color: '#0fe6f9',
              // fontStyle: 'italic'//标题字体
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: '#fff'
              },
              show: false
            },
            axisTick: {
              //x轴刻度线
              show: false
            },
            // 设置X轴数据旋转倾斜
            // axisLabel: {
            //   rotate: 30, // 旋转角度
            //   interval: 0  //设置X轴数据间隔几个显示一个，为0表示都显示
            // },
            // boundaryGap值为false的时候，折线第一个点在y轴上
            boundaryGap: true,
            data: odataArr
            //data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {
            axisTick: {
              //y轴刻度线
              show: false
            },
            axisLine: {
              //隐藏y轴线
              show: false
            }
          },
          series: [{
            name: '销量',
            type: 'line',//折线图 可以自定义bar柱状图
            data: [5, 20, 36, 10, 10, 20],
            // 设置折线上圆点大小
            symbolSize:8,
            areaStyle: {}
          }]
        });
      },
    }
  }
</script>

<style scoped>

</style>
