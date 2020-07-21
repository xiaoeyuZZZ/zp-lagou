<template>
    <el-form>
        <el-form-item label="表格时间选择 :">
            <div class="property-page-bottom">
                <div>
                    <el-radio v-model="radioByTable" label="1">快捷选择</el-radio>
                    <el-radio v-model="radioByTable" label="2">某时间</el-radio>
                    <el-radio v-model="radioByTable" label="3">某时间段</el-radio>
                    <!-- 快捷选择 -->
                    <span v-show="radioByTable === '1'">
                <el-select v-model="quickTimeSlot" placeholder="请选择" @change="quickSelectChange">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                  ></el-option>
                </el-select>
                <el-date-picker v-model="quickDate" align="right" type="date"
                                placeholder="选择日期"></el-date-picker>
              </span>
                    <!-- 某时间 -->
                    <span v-show="radioByTable === '2' ">
                <el-date-picker v-model="someTime" align="right" type="date"
                                placeholder="选择时间"></el-date-picker>
              </span>
                    <!-- 某时间段 -->
                    <span v-show="radioByTable === '3'">
                <el-date-picker v-model="startDate" align="right" type="date"
                                placeholder="开始日期"></el-date-picker>
                <el-date-picker v-model="endDate" align="right" type="date"
                                placeholder="结束日期"></el-date-picker>
              </span>
                </div>
                <div>
                    <el-button @click="submitSelect" type="primary">确认时间</el-button>
                </div>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
  import {dateString, quickTimeSelect} from '../../../tools/utils'
    export default {
        data() {
            return {
                radioByTable: '1',
                quickTimeSlot: '',
                quickDate: '',
                someTime: '',
                startDate: '',
                endDate: '',
                options: [
                    {
                        value: '1',
                        label: '今天'
                    },
                    {
                        value: '2',
                        label: '本月'
                    },
                    {
                        value: '3',
                        label: '本季度'
                    },
                    {
                        value: '4',
                        label: '本年'
                    },
                ],
            }
        },
        props: ['tableProperty'],
        methods: {
            submitSelect() {
                if (this.radioByTable === '1') {
                    let time = quickTimeSelect(this.quickTimeSlot, this.quickDate)
                    this.tableProperty.startAt = time.startAt
                    this.tableProperty.endAt = time.endAt
                } else if (this.radioByTable === '2') {
                    this.tableProperty.startAt = dateString(this.someTime)
                    this.tableProperty.endAt = dateString(this.someTime)
                } else {
                    this.tableProperty.startAt = dateString(this.startDate)
                    this.tableProperty.endAt = dateString(this.endDate)
                }
                this.$emit('getTableContent')
            },
            quickSelectChange() {
                this.quickDate = undefined
                if (this.quickTimeSlot === '1') {
                    let dt = new Date()
                    this.quickDate = dt
                }
            }
        }
    }
</script>

<style scoped>
    .property-page-bottom {
        display: flex;
        justify-content: space-between;
    }
</style>
