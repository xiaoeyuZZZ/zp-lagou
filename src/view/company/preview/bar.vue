<template>
  <div style="width:100%;height: 350px; " id="barEcharts"></div>
</template>
<script>
  //先要导入依赖的实例
  import echarts from 'echarts'
  //在echarts_option中写东西就行了，官方文档直接下这里就可以自己玩了
  export default {
    data () {
      return {
        echarts1_option: {
          backgroundColor: '#010105',
          tooltip: {
            formatter: "{c}℃"  //设置鼠标划上提示文字
          },
          title: {
            text: '停车场数量统计',
            x: 'left',
            y: 'top',
            textStyle: {
              fontSize: 16,
              color: '#0fe6f9',
              // fontStyle: 'italic'//标题字体
            }
          },
          grid: {  //设置图标距离
            top: "10",
            left: "30",
            right: "10",
            bottom: "20"
          },
          xAxis: {
            type: "category",
            data: ["2012", "2013", "2014", "2015", "2016", "2017"],
            axisLabel: {
              textStyle: {
                //文字样式
                color: "#62799C",
                fontSize: "12"
              }
            },

            axisTick: {
              //y轴不显示刻度线，
              show: false
            },
            axisLine: {
              //隐藏y轴线
              show: false
            }
          },
          yAxis: {
            type: "value",
            //show: false,
            axisLabel: {
              textStyle: {
                //文字样式
                color: "#62799C",
                fontSize: "12"
              }
            },
            // 控制网格线是否显示
            splitLine: {
              //  改变轴线颜色
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            axisTick: {
              //y轴刻度线
              show: false
            },
            axisLine: {
              //隐藏y轴线
              show: false
            }
          },
          series: [
            {
              data: [20, 30, 40, 50, 20, 60],
              type: "bar",
              itemStyle: {
                normal: {
                  color: "rgba(160,216,254,1)" //柱状图的背景颜色
                }
              },
              barWidth: 15,  //柱状图宽度
              //barGap: '0%'  //设置同一类中两个柱状图的距离
            }
          ]
        }
      }
    },
    //挂载前初始化echarts实例
    mounted () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('barEcharts'))
      // 绘制图表，this.echarts1_option是数据
      myChart.setOption(this.echarts1_option)
    },
  }

</script>
<style scoped lang="scss">
  /*#echartss canvas{*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*}*/
</style>
