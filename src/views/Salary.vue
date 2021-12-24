<template>
    <h1>工资计算器</h1>
    <a-form ref="formRef"
      :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="calculate">
      <a-form-item label="税前（元）">
        <a-input v-model:value="form.salary" placeholder="请输入税前工资"/>
      </a-form-item>
      <a-form-item label="社保基数（元）">
        <a-input v-model:value="form.sbasic" placeholder="请输入社保基数"/>
      </a-form-item>
      <a-form-item label="公积金基数（元）">
        <a-input v-model:value="form.gbasic" placeholder="请输入公积金基数"/>
      </a-form-item>
      <a-form-item label="公积金比例">
        <a-input v-model:value="form.gpercent" placeholder="请输入公积金比例"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Calculate
        </a-button>
      </a-form-item>
    </a-form>

  <div class="result">
    <div class="data" style="margin-top:10px">
      <h2>个人五险：{{ resData.personalWu}}</h2>
      <h2>公司五险：{{ resData.companyWu}}</h2>
      <h2>个人、公司一金：{{ resData.personalJin}}</h2>
      <h2>扣税{{ resData.tax}}</h2>
      <h2>实际到手{{ resData.actualGetMoney}}</h2>
      <h2>五险一金总额{{ resData.all}}</h2>
    </div>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { log } from '../weapons/index'

export default defineComponent({
  name: 'Salary',
  setup () {
    const form = reactive({
        salary: 0,
        sbasic: 0,
        gbasic: 0,
        gpercent: 0
      })
      // 养老保险、医疗保险、失业补助、生育、工伤
    const spercent = [0.08, 0.02, 0.005]
    const spercentcomp = [0.14, 0.099, 0.005, 0.015, 0.002]
    const resData = reactive({
      actualGetMoney: 0,
      tax: 0,
      personalWu: 0,
      personalJin: 0,
      companyWu: 0,
      all: 0
    })
    const calculate = () => {
      // for (const key in form) {
      //   form[key].value = Number(form[key].value)
      // }
      log(JSON.parse(JSON.stringify(form)))
      log('calculate.....')
      // 个人五险缴纳
      resData.personalWu = form.sbasic * spercent.reduce((a, b) => { return a + b })
      resData.personalWu = Math.round(resData.personalWu * 100) / 100
      resData.companyWu = form.sbasic * spercentcomp.reduce((a, b) => { return a + b })
      resData.companyWu = Math.round(resData.companyWu * 100) / 100

      // 个人、公司一金
      resData.personalJin = form.gbasic * form.gpercent
      // 应纳税
      const ying = form.salary - resData.personalJin - resData.personalWu - 5000
      log('应纳税:', ying)
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
      resData.actualGetMoney = form.salary - resData.tax - resData.personalWu - resData.personalJin
      resData.all = resData.actualGetMoney + resData.personalWu + resData.personalJin * 2 + resData.companyWu
      log('resData:', resData)
    }

    return {
      form,
      calculate,
      resData
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../css/Salary.less';
</style>
