<template>
  <div class="salary">
    <p>工资计算器</p>
    <p>税前（元）：<a-input
     @change="getSalary"
     placeholder="税前收入"></a-input>
    </p>
    <p>五险基数（元）：<a-input
     @change="getWuxianBase"
     placeholder="请输入五险基数"></a-input>
    </p>
    <p>公积金基数（元）：<a-input
     @change="getRoomratioBase"
     placeholder="请输入公积金基数"></a-input>
    </p>
    <p>公积金比例（%）：<a-input
     @change="getRoomratio"
     placeholder="请输入公积金比例"></a-input>
    </p>
    <a-button type="primary" @click="handleSubmit" ghost>Calculate</a-button>
    <div class="data" style="margin-top:10px">
      <p>个人五险：{{ resData.personalWu}}</p>
      <p>公司五险：{{ resData.companyWu}}</p>
      <p>个人、公司一金：{{ resData.personalJin}}</p>
      <p>扣税{{ resData.tax}}</p>
      <p>实际到手{{ resData.actualGetMoney}}</p>
      <p>五险一金总额{{ resData.all}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { log } from '../weapons/index'

export default defineComponent({
  name: 'Salary',
  setup () {
    const salary = ref(0)
    const roomRation = ref(0)
    const roomRationBase = ref(0)
    const wuxianBase = ref(0)
    const personalWuJin = [0.08, 0.02, 0.005]
    const companyWuJin = [0.14, 0.099, 0.005, 0.015, 0.002]
    const resData = reactive({
      actualGetMoney: 0,
      tax: 0,
      personalWu: 0,
      personalJin: 0,
      companyWu: 0,
      all: 0
    })
    const handleSubmit = () => {
      resData.personalWu = Number(wuxianBase.value * personalWuJin.reduce((a, b) => {
        return a + b
      }, 0))
      resData.personalJin = Number(salary.value) * roomRation.value / 100
      resData.companyWu = wuxianBase.value * companyWuJin.reduce((a, b) => {
        return a + b
      }, 0)
      const ying = salary.value - resData.personalJin - resData.personalWu - 5000
      log('ying:', ying)
      if (ying <= 3000) {
        resData.tax = ying * 0.03
      } else if (ying <= 12000) {
        resData.tax = ying * 0.1 - 210
      } else if (ying <= 25000) {
        resData.tax = ying * 0.2 - 1410
      } else if (ying <= 35000) {
        resData.tax = ying * 0.25 - 2660
      } else if (ying <= 55000) {
        resData.tax = ying * 0.3 - 4410
      } else if (ying <= 8000) {
        resData.tax = ying * 0.35 - 7160
      } else {
        resData.tax = ying * 0.45 - 15160
      }
      resData.actualGetMoney = salary.value - resData.tax - resData.personalWu - resData.personalJin
      resData.all = resData.actualGetMoney + resData.personalWu + resData.personalJin * 2 + resData.companyWu
    }
    const handleSelectChange = (e: any) => {
      log('e:', e)
    }
    const getSalary = (e: any) => {
      salary.value = e.target.value
    }
    const getRoomratio = (e: any) => {
      roomRation.value = e.target.value
    }
    const getWuxianBase = (e: any) => {
      wuxianBase.value = e.target.value
    }
    const getRoomratioBase = (e: any) => {
      roomRationBase.value = e.target.value
    }
    return {
      salary,
      roomRation,
      handleSubmit,
      handleSelectChange,
      getSalary,
      getRoomratio,
      resData,
      personalWuJin,
      companyWuJin,
      getWuxianBase,
      getRoomratioBase
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../css/Salary.less';
</style>
