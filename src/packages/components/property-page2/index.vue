<template>
    <div class="property-page">
        <el-form :model="ruleFrom" label-width="100">
            <el-form-item label="显示本模块 :">
                <el-switch v-model="ruleFrom.isShowModule" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
            <el-form-item label="数据显示形式 :">
                <el-radio v-model="ruleFrom.dataDisplayForm" label="1">数量</el-radio>
                <el-radio v-model="ruleFrom.dataDisplayForm" label="2">百分比</el-radio>
            </el-form-item>
            <el-form-item label="大屏显示时间 :">
                <div class="property-page-bottom">
                    <div>
                        <el-radio-group v-model="ruleFrom.showTime" size="small">
                            <el-radio-button label="今天"></el-radio-button>
                            <el-radio-button label="本月"></el-radio-button>
                            <el-radio-button label="本季度"></el-radio-button>
                            <el-radio-button label="本年"></el-radio-button>
                        </el-radio-group>
                        <el-date-picker v-model="radioByTime" align="right" type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                    <div>
                        <router-link to="preview"><el-button>预览</el-button></router-link>
                        <el-button type="primary" @click="submitSet">确认设置</el-button>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                radioByTime: '',
            }
        },
        props: ['ruleFrom'],
        methods: {
            submitSet() {
                this.setShowTime();
                this.setBoolean();
                this.$emit('submitScreenProperty')
            },
            setShowTime() {
                if (this.ruleFrom.showTime === '今天') this.ruleFrom.showTime = 1;
                else if (this.ruleFrom.showTime === '本月') this.ruleFrom.showTime = 2;
                else if (this.ruleFrom.showTime === '本季度') this.ruleFrom.showTime = 3;
                else if (this.ruleFrom.showTime === '本年') this.ruleFrom.showTime = 4;
            },
            setBoolean() {
                if (this.ruleFrom.isShowModule === true) this.ruleFrom.isShowModule = 1;
                else this.ruleFrom.isShowModule = 0;
                if (this.ruleFrom.isExchangeDisplay === true) this.ruleFrom.isExchangeDisplay = 1;
                else this.ruleFrom.isExchangeDisplay = 0;
            }
        }
    }
</script>

<style scoped>
    .property-page {
        background-color: #ffffff;
        padding: 0 20px 1px 20px;
        border-radius: 5px;
    }

    .property-page-bottom {
        display: flex;
        justify-content: space-between;
    }
</style>
