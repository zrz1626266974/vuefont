<template>
  <el-form ref="one" :rules="rules" :model="one" label-width="auto">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="one.name"></el-input>
    </el-form-item>
    <el-form-item label="活动地点" prop="place">
      <h1>{{place}}</h1>
      <a-map @picked="picked" />
    </el-form-item>
    <el-form-item label="活动类型" prop="typeid">
      <el-select v-model="one.typeid" placeholder="请选择">
        <el-option
          v-for="item in type"
          :key="item.typeid"
          :label="item.name"
          :value="item.typeid"
          >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动开始时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择活动开始日期" v-model="one.stime" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择活动结束日期" v-model="one.etime" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="活动所需人数" prop="count">
      <el-input v-model.number="one.count" ></el-input>
    </el-form-item>
    <el-form-item label="活动积分" prop="point">
      <el-input v-model.number="one.point" ></el-input>
    </el-form-item>
    <el-form-item label="活动负责人">
      <el-input v-model="one.leader" ></el-input>
    </el-form-item>
    <el-form-item label="活动负责人联系电话" prop="tel">
      <el-input v-model="one.tel" ></el-input>
    </el-form-item>
    <el-form-item label="活动详情">
      <el-input type="textarea" v-model="one.detail"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">添加</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import activity from '@/api/activity'
import t from '@/api/type'
// import m from '@/api/map'
import {getToken} from '@/util/auth'
import validate from '@/util/validate'
export default {
  name: 'UpdateActivity',
  components: {
    // MapSelect: () => import('@/components/admin/Map'),
    AMap: () => import('@/components/admin/MapSelect')
  },
  data () {
    // var validate
    return {
      one: {
        id: getToken(),
        count: '',
        point: '',
        tel: '',
        place: ''
      },
      poiid: '',
      place: '无',
      type: [],
      id: '',
      city: '北京',
      kw: '',
      result: {
        province: '',
        city: '',
        area: ''
      },
      // 检验规则
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'}
        ],
        place: [
          {required: true, message: '请选择活动地点', trigger: 'blur'}
        ],
        typeid: [
          {required: true, message: '选择一个活动类型', trigger: 'change'}
        ],
        count: [
          {validator: validate.validateNumber, type: 'integer', required: true, message: '请输入所需人数(正整数)', trigger: 'blur'}
        ],
        point: [
          {validator: validate.validateNumber, type: 'integer', required: true, message: '请输入活动积分(正整数)', trigger: 'blur'}
        ],
        tel: [
          {required: true, validator: validate.validateTel, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    getTypeList () {
      t.getTypeList().then(data => {
        this.type = data.data.data.list
        console.log(this.type)
      }).catch(err => {
        console.log(err)
      })
    },
    picked (info) {
      console.log(`info == `, info)
      this.poiid = info.id
      console.log(`this.poiid == `, this.poiid)
      // 设置地点poi id
      this.place = info.name + '(' + info.address + ')'
      this.one.place = info.id
    },
    submitForm () {
      this.$refs.one.validate((valid) => {
        if (valid) {
          activity.addActivity(this.one).then(data => {
            this.$router.push({name: 'activityList'})
            console.log(`add activity! this.one.typeid = ${this.one.typeid}`)
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.one.resetFields()
    }
  }
}
</script>
<style>
.area-address {
  width: 45%;
  float: left;
}
.search-address {
  text-align: left;
}
</style>
