<template lang="pug">
  .login
    el-form(label-width='100px' label-position='right')
      el-form-item(label='用户名：' prop='')
        el-input(placeholder='请输入用户名' v-model='form.userName' clearable).w300
      el-form-item(label='密码：' prop='')
        el-input(placeholder='请输入密码' type='password' v-model='form.password' clearable).w300
      el-form-item(label='' prop='')
        el-button(type='primary' @click='login') 登录 
</template>

<script>
// import $ from 'jquery'

export default {
  data() {
    return {
      form: {
        userName: '',
        password: ''
      },
      pubkey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJPSsAm9Po08VtGKQx86TuOYu/7BTOtwYlFQvjQCEs3aTeUOH3p9pgd3pw14Num0n/l3Sk3d1av4hzZJvlODfScCAwEAAQ=='
    }
  },
  methods: {
    async login() {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubkey);
      const password = encrypt.encrypt(this.form.password);
      
      const res = await API.common.login({...this.form, password})

      if(res.data.code === 100) {
        localStorage.userInfo = JSON.stringify(res.data.data)
        this.$store.commit('updateUserInfo', res.data.data)
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  padding-top: 150px;
}
</style>
