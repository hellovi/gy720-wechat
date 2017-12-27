/*
 * 登录页面
 * @Author: chenliangshan
 * @Date: 2017-12-27 14:17:25
 * @Last Modified by: chenliangshan
 * @Last Modified time: 2017-12-27 18:51:32
 */

<template>
  <div class="app-login">
    <div class="app-login__logo">
      <img src="../assets/logo.png" alt="光鱼全景">
    </div>

    <!-- 账号登录 -->
    <form class="app-login__form" novalidate>
      <div class="form-item">
        <svg fill="#888"><use href="#user"/></svg>
        <input type="text" v-model="form.username" placeholder="请输入光鱼账号">
        <!-- <span v-show="errors.has('username')" class="error is-danger">{{ errors.first('username') }}</span> -->
      </div>
      <div class="form-item">
        <svg fill="#888"><use href="#password"/></svg>
        <input type="password" v-model="form.password" placeholder="请输入密码">
      </div>
      <div class="form-submit">
        <button type="button" @click="formSubmit">登录</button>
      </div>
    </form>

    <!-- 微信登录 -->
    <div class="app-oauth__login">
      <div class="app-oauth__icon">
        <div class="left">
          <img src="../assets/left-line.png">
        </div>
        <svg fill="#fff"><use href="#wechat"/></svg>
        <div class="right">
          <img src="../assets/right-line.png">
        </div>
      </div>
      <div class="app-oauth__btn">
        点击使用<a class="app-oauth__btn-weixin" href="">微信登录</a>
      </div>
    </div>
  </div>
</template>

<script>

const isEmail = value => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
const isMobile = value => /^1[34578]\d{9}$/.test(value)
const isEmailMobile = value => isEmail(value) || isMobile(value)

export default {
  name: 'login',

  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    }
  },

  methods: {
    formSubmit() {
      const { username, password } = this.form
      if (isEmailMobile(username)) {
        const data = {}
        if (isEmail(username)) data.email = username
        else if (isMobile(username)) data.mobile = username
        this.$http.post('/user/login', {
          password,
          ...data,
        })
        .then((res) => {
          // eslint-disable-next-line
          console.log(res)
        })
      }
    },
  },
}
</script>

<style lang="postcss">
.app-login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../assets/bg.jpg") no-repeat top center;
  background-size: cover;

  &__logo {
    text-align: center;
    margin: 120px 235px;
  }

  &__form {
    width: 560px;
    margin: 0 auto;

    .form-item {
      display: flex;
      justify-content: flex-start;
      font-size: 26px;
      border: 1px solid #b5b5b5;
      border-radius: 10px;
      background-color: #fff;
      line-height: 40px;
      margin-bottom: 40px;
      padding: 15px 20px;
      position: relative;

      svg {
        width: 38px;
        height: 41px;
      }

      input {
        width: 100%;
        margin-left: 25px;
        border: 0;
        line-height: 40px;

        &:focus {
          outline: none;
        }
      }

      .error {
        position: absolute;
        bottom: -40px;
        font-size: 24px;
      }
    }

    .form-submit {
      width: 100%;
      text-align: center;
      padding-top: 20px;
      position: relative;

      button[type="button"] {
        width: 100%;
        height: 70px;
        font-size: 36px;
        color: #FEFEFE;
        border: 0;
        border-radius: 10px;
	      background-color: #439ffa;
      }
    }
  }
}

.app-oauth {

  &__login {
    margin-top: 270px;
  }

  &__icon {
    width: 100%;
    display: flex;
    justify-content: center;

    svg {
      width: 81px;
      height: 81px;
      margin: 0 52px;
    }

    .left, .right {
      width: calc((100vw - 183px) / 2);

      img {
        width: 100%;
        vertical-align: bottom;
      }
    }
  }

  &__btn {
    font-size: 24px;
    text-align: center;
    color: #fff;
    margin-top: 30px;

    a {
      color: #439FFA;
      margin-left: 1em;
    }
  }
}
</style>
