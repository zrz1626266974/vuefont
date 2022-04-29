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
  name: 'MapView',
  data () {
    return {
      map: null
    }
  },
  created () {},
  mounted () {
    this.initAMap()
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
        this.map = new AMap.Map('container', {
          // viewMode: '3D',
          zoom: 11,
          zooms: [2, 22],
          center: [105.602725, 37.076636]
        })
        // AMapUI.PoiPicker()
        var picker = new AMapUI.PoiPicker({
          map: this.map,
          input: 'pickerInput'
          // searchResultsContainer: 'poiInfo'
        })
        var marker = new AMap.Marker()
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        })
        picker.on('poiPicked', (poiResult) => {
          var source = poiResult.source
          var poi = poiResult.item
          var info = {
            source: source,
            id: poi.id,
            name: poi.name,
            location: poi.location.toString(),
            address: poi.address
          }
          marker.setMap(this.map)
          infoWindow.setMap(this.map)
          marker.setPosition(poi.location)
          infoWindow.setPosition(poi.location)
          infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>')
          infoWindow.open(this.map, marker.getPosition())
          this.map.setCenter(marker.getPosition())
        })
        console.log(picker)
      }).catch(e => {
        console.log(e)
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
  height:  500px;
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
