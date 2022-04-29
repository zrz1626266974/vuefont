<template>
  <el-form label-position="left" :model="one" class="activity-detail">
    <el-form-item label="活动名称">
      <span>{{ one.activityName }}</span>
    </el-form-item>
    <el-form-item label="活动开始时间">
      <span>{{ one.stime|dateFormat }}</span>
    </el-form-item>
    <el-form-item label="活动结束时间">
      <span>{{ one.etime|dateFormat }}</span>
    </el-form-item>
    <el-form-item label="活动人数">
      <span>{{ one.activityCount }}</span>
    </el-form-item>
    <el-form-item label="活动积分">
      <span>{{ one.activityPoint }}</span>
    </el-form-item>
    <el-form-item label="活动负责人">
      <span>{{ one.activityLeader }}</span>
    </el-form-item>
    <el-form-item label="负责人联系电话">
      <span>{{ one.activityTel }}</span>
    </el-form-item>
    <el-form-item label="活动详情">
      <span>{{ one.activityDetail }}</span>
    </el-form-item>
    <el-form-item label="活动发布时间">
      <span>{{ one.activityTime|dateFormat }}</span>
    </el-form-item>
    <el-form-item label="活动地点">
      <h1>{{placeName}}</h1>
      <div id="container" style="width: 100%;height: 500px;">
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import activity from '@/api/activity'
import m from '@/api/map'
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  name: 'ActivityDetail',
  data () {
    return {
      one: {},
      acid: '',
      result: {},
      map: '',
      amap: '',
      flag: true,
      zoom: 11,
      scrollWheelZoom: true,
      location: '',
      placeName: '无',
      // 服务端高德地图返回值
      amapInfo: ''
    }
  },
  watch: {
    one (val) {
      console.log('activityDetail ===', val)
      // this.getMapByUid(val.place)
      //  ----获取高德地图返回值
      this.getAmapById(val.activityPlace)
    },
    amapInfo (val) {
      console.log(`amapInfo == `, val)
      this.placeName = val.name + '(' + val.address + ')'
      this.initAMap()
    }
  },
  created () {
    this.acid = this.$route.params.acid
    this.getActivityById(this.acid)
  },
  methods: {
    initAMap () {
      AMapLoader.load({
        key: '64ef51c906966cc13270c7a6ea13d996',
        version: '2.0',
        plugins: [],
        AMapUI: {
          version: '1.1',
          plugins: ['misc/PoiPicker']
        },
        Loca: {
          version: '2.0'
        }
      }).then((AMap) => {
        this.amap = new AMap.Map('container', {
          // viewMode: '3D',
          zoom: 11,
          zooms: [2, 22],
          center: [105.602725, 37.076636]
        })
        // m.getAmapById()
        var marker = new AMap.Marker()
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        })
        var info = {
          // id: this.amapInfo.id,
          name: this.amapInfo.name,
          // location: this.amapInfo.location,
          pname: this.amapInfo.pname,
          cityname: this.amapInfo.cityname,
          address: this.amapInfo.address
        }
        // let arr = str.split(",").map(Number);
        var poi = {
          location: this.amapInfo.location.split(',').map(Number)
        }
        marker.setMap(this.amap)
        infoWindow.setMap(this.amap)
        marker.setPosition(poi.location)
        infoWindow.setPosition(poi.location)
        infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>')
        infoWindow.open(this.amap, marker.getPosition())
        this.amap.setCenter(poi.location)
      }).catch(e => {
        console.log(e)
      })
    },
    click () {
      alert(this.location.lng + ' ' + this.location.lat)
    },
    // 获取服务端高德地图返回
    getAmapById (id) {
      console.log(`Amap poi id`, id)
      m.getAmapById(id).then(data => {
        console.log(data.data.data.one)
        this.amapInfo = data.data.data.one.pois[0]
      }).catch(err => {
        console.log(err)
      })
    },
    getActivityById (acid) {
      activity.getActivityById(acid).then(data => {
        this.one = data.data.data.one
        console.log(this.one)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.map {
  width: 100%;
  height: 400px;
}
.activity-detail {
  width: 100%;
  height: 550px;
  overflow: auto;
}
.area-address {
  width: 45%;
  float: left;
}
/* .search-address {
  text-align: left;
} */
</style>
