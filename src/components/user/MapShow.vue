<template>
  <div class="home_div">
      <div id="container"></div>
      <!-- <div id="pickerBox"> -->
        <!-- <input id="pickerInput" placeholder="输入关键字选取地点" /> -->
      <!-- </div> -->
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapShow',
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
        this.$emit('onMapReady', this.map)
        // console.log(picker)
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
  height: 100%;
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
