<template>
  <div class="home_div">
      <div id="container"></div>
      <div id="pickerBox">
        <input id="pickerInput" placeholder="输入关键字选取地点" />
      </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapSelect',
  data () {
    return {
      map: null
    }
  },
  props: {
    // poiid: '',
    // poiname: '',
    amapInfo: {
      location: [105.602725, 37.076636]
    }
  },
  watch: {
    amapInfo (val) {
      console.log(`map - select `, val)
      // 异步加载的map 还没有加载成功，导致出错 ↓
      // map.setCenter(val.location.split(',').map(Number))
      this.initAMap().then(map => {
        console.log(val.location.split(',').map(Number))
        // map.setCenter(val.location.split(',').map(Number))
        console.log(map.getCenter())
        var marker = new AMap.Marker()
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        })
        var info = {
          id: val.id,
          name: val.name,
          location: val.location,
          pname: val.pname,
          cityname: val.cityname,
          address: val.address
        }
        // let arr = str.split(",").map(Number);
        var poi = {
          location: val.location.split(',').map(Number)
        }
        console.log(`poi position`, poi)
        marker.setMap(map)
        infoWindow.setMap(map)
        marker.setPosition(poi.location)
        infoWindow.setPosition(poi.location)
        infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>')
        infoWindow.open(map, marker.getPosition())
        map.setCenter(marker.getPosition())
        console.log(`marker.position`, marker.getPosition())
      })
    }
  },
  created () {},
  // mounted () {
  //   // this.initAMap()
  // },
  methods: {
    initAMap () {
      return new Promise((resolve, reject) => {
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
          var map = new AMap.Map('container', {
            zoom: 11,
            zooms: [2, 22],
            center: [105.602725, 37.076636]
          })
          // AMapUI.PoiPicker()
          var picker = new AMapUI.PoiPicker({
            map: map,
            input: 'pickerInput'
          })
          var marker = new AMap.Marker()
          var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -20)
          })
          picker.on('poiPicked', (poiResult) => {
            var poi = poiResult.item
            var info = {
              id: poi.id,
              name: poi.name,
              // location: poi.location,
              // pname: poi.pname,
              // cityname: poi.cityname,
              address: poi.address
            }
            marker.setMap(map)
            infoWindow.setMap(map)
            marker.setPosition(poi.location)
            infoWindow.setPosition(poi.location)
            infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>')
            infoWindow.open(map, marker.getPosition())
            map.setCenter(marker.getPosition())
            this.$emit('picked', info)
          })
          console.log(picker)
          resolve(map)
        }).catch(e => {
          console.log(e)
          reject(e)
        })
      })
    }
  }
}
</script>
<style  scoped>
.home_div{
  padding: 0px;
  margin:  0px;
  width:  100%;
  height:  400px;
  position:  relative;
}
#container{
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 400px;
  position: absolute;
}
#pickerBox {
  position: absolute;
  z-index: 9999;
  top: 50px;
  right: 30px;
  width: 300px;
}
#pickerInput {
  width: 200px;
  padding: 5px 5px;
}
#poiInfo {
  background: #fff;
}
</style>
