<template>
  <div class="Login">
  <a-form
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.name" placeholder="Username">
        <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        @click="subMit"
        type="primary"
        html-type="submit"
        :disabled="formState.name === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
    <!-- <validate-form @form-submit="getData">
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
    </validate-form> -->
  </div>
</template>

<script lang='ts'>

// import ValidateForm from '../components/validateForm.vue'
// import ValidateInput, { RuleProps } from '../components/ValidateInput.vue'
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import router from '../router/router'
import { login } from '../api/common'
import type { UnwrapRef } from 'vue'
import type { FormProps } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
interface FormState {
  name: string;
  password: string;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  name: 'Login',
  setup () {
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      password: ''
    })
    const handleFinish: FormProps['onFinish'] = values => {
      console.log('handleFinish-->', values, formState)
    }
    const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
      console.log('handleFinishFailed', errors)
    }
    const subMit = () => {
      const params = {
        userName: formState.name,
        userPd: formState.password
      }
      console.log('提交用户信息:', params)
      // 打点
      login(params).then((res: any) => {
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('userInfo', JSON.stringify(params))
        router.push('/home')
      })
    }
    return {
      formState,
      subMit,
      handleFinish,
      handleFinishFailed
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
}
</style>
