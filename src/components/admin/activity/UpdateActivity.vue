<template>
  <el-form ref="form" :model="one" label-width="auto">
    <el-form-item label="活动名称">
      <el-input v-model="one.activityName"></el-input>
    </el-form-item>
    <el-form-item label="活动地点">
      <h1>{{showPlace}}</h1>
      <a-map :amapInfo="amapInfo" @picked="picked"/>
    </el-form-item>
    <el-form-item label="活动类型">
      <el-select v-model="one.typeId" placeholder="请选择">
        <el-option
          v-for="item in type"
          :key="item.typeId"
          :label="item.typeName"
          :value="item.typeId"
          >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动开始时间">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择活动开始日期"
          v-model="one.stime"
          style="width: 100%;"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择活动结束日期"
          v-model="one.etime"
          style="width: 100%;"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="活动所需人数">
      <el-input v-model="one.activityCount" ></el-input>
    </el-form-item>
    <el-form-item label="活动积分">
      <el-input v-model="one.activityPoint"></el-input>
    </el-form-item>
    <el-form-item label="活动负责人">
      <el-input v-model="one.activityLeader"></el-input>
    </el-form-item>
    <el-form-item label="活动负责人联系电话">
      <el-input v-model="one.activityTel" ></el-input>
    </el-form-item>
    <el-form-item label="活动详情">
      <el-input type="textarea" v-model="one.activityDetail"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import activity from '@/api/activity'
import t from '@/api/type'
import {getToken} from '@/util/auth'
import m from '@/api/map'
// import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'UpdateActivity',
  components: {
    // MapSelect: () => import('@/components/admin/Map'),
    AMap: () => import('@/components/admin/MapSelect2')
  },
  data () {
    return {
      one: {
        typeId: 1,
        id: getToken(),
        acid: ''
      },
      location: {},
      // center: {},
      zoom: 11,
      type: [],
      map: '',
      id: '',
      kw: '',
      city: null,
      result: {
      },
      flag: true,
      amapInfo: '',
      showPlace: '无'
    }
  },
  watch: {
    one (val) {
      console.log('activityPlace===', val)
      // this.getMapByUid(val.activityPlace)
      //  ----获取高德地图返回值--------------------
      this.getAmapById(val.activityPlace)
    },
    // ---- 监听服务端查询的更新前活动地点结果 -----------------
    amapInfo (val) {
      console.log(`update activity AmapInfo `, val)
      this.showPlace = val.name + '(' + val.address + ')'
      // this.initAMap()
    }
  },
  created () {
    // this.location = this.center
    this.acid = this.$route.params.acid
    this.getActivityById(this.acid)
    // this.value = this.one.typeid
    this.getTypeList()
  },
  methods: {
    // 获取高德地图服务端 poiid 查询结果
    getAmapById (id) {
      console.log(`Amap poi id`, id)
      m.getAmapById(id).then(data => {
        console.log(data.data.data.one)
        this.amapInfo = data.data.data.one.pois[0]
      }).catch(err => {
        console.log(err)
      })
    },
    picked (info) {
      this.showPlace = info.name + '(' + info.address + ')'
      console.log(info)
      this.one.activityPlace = info.id
    },
    //  -----获取活动类型列表 ，用于下拉框选择 --------------------
    getTypeList () {
      t.getTypeList().then(data => {
        this.type = data.data.data.list
        console.log(this.type)
      }).catch(err => {
        console.log(err)
      })
    },
    getActivityById (acid) {
      activity.getActivityById(acid).then(data => {
        this.one = data.data.data.one
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit () {
      console.log(`this.one.typeid = ${this.one.typeId}`)
      activity.updateActivity(this.one).then(data => {
        this.$router.push({name: 'refresh', params: {to: 'activityList'}})
        console.log('submit!')
        console.log(this.one.typeid)
      }).catch(err => {
        console.log(err)
      })
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
