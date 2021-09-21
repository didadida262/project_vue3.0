<template>
  <div class="Login">
    <validate-form @form-submit="getData">
      <div class="mb-3">
        <validate-input
          :rules="emailRules"
          v-model="user.name"
          placeholder="大名"
          label="userName"
        ></validate-input>
        <validate-input
          v-model="user.pd"
          placeholder="密码"
          label="userPd"
        >
        </validate-input>
      </div>
    </validate-form>
  </div>
</template>

<script lang='ts'>

import ValidateForm from '../components/validateForm.vue'
import ValidateInput, { RuleProps } from '../components/ValidateInput.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../router/router'
import { commonAPI } from '../api/common'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const user = computed(() => store.state.user)
    const emailRules: RuleProps = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '输入有效邮箱' }
    ]
    const getData = (result: object) => {
      console.log('提交用户信息:', result)
      commonAPI.login(result).then((res: any) => {
        console.log('反馈:', res)
        localStorage.setItem('userInfo', JSON.stringify({
          ...res,
          isLogin: true
        }))
        console.log('-------------', JSON.stringify({
          ...res,
          isLogin: true
        }))
        store.commit('login', res)
        router.push('/')
      })
    }
    return {
      ValidateForm,
      ValidateInput,
      getData,
      emailRules,
      user
    }
  }
})
</script>

<style>
.Login {
  background-image: linear-gradient(120deg,#155799,#159957);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: 50px;
}
</style>
