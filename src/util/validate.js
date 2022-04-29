export default {
  validateIdCard: (rule, value, callback) => {
    const reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (value === '') {
      callback(new Error('请输入身份证号'))
    } else {
      if (reg.test(value) === false) {
        callback(new Error('请输入正确的18位身份证号'))
      } else {
        // this.$refs.one.validateField('identity')
        callback()
      }
    }
  },
  validateName: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入姓名'))
    } else {
      callback()
    }
  },
  validateTel: (rule, value, callback) => {
    const reg = /^1\d{10}$/
    if (value === '') {
      callback(new Error('请输入11位手机号码'))
    } else {
      if (reg.test(value) === false) {
        callback(new Error('请输入正确的11位手机号'))
      } else {
        callback()
      }
    }
  },
  validateNumber: (rule, value, callback) => {
    if (value <= 0) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}
