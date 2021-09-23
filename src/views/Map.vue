<template>
  <div class="mapPage">
    <strong>map</strong> <a-button @click="test">test</a-button>
    <div id="map"></div>
    <div id="popup" class="flag">
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue'
import { log } from '../weapons/index'
import { Map, View } from 'ol'// 地图实例方法、视图方法
import Tile from 'ol/layer/Tile'// 瓦片渲染方法
import OSM from 'ol/source/OSM'// OSM瓦片【OSM不能在实际开发中使用，因为OSM里中国地图的边界有点问题！！！！】
import 'ol/ol.css'
import Overlay from 'ol/Overlay'
import { fromLonLat, transform } from 'ol/proj'// 转换
import Interaction from 'ol/interaction'// 不知道干嘛用的
export default defineComponent({
  name: 'Map',
  setup () {
    const map = ref(null) as any
    const test = () => {
      log('test')
      // 获取当前视图
      const view = map.value.getView()
      // 获取当前中心坐标
      const x = view.getCenter()[0]
      const y = view.getCenter()[1]
      log('当前视图坐标:', x, y)
      // view.setCenter([x + 50, y])
      // 让地图的zoom增加1，从而实现地图放大
      view.setZoom(view.getZoom() + 1)
      map.render()
    }
    const initMap = () => {
      // 地图实例
      map.value = new Map({
        target: 'map',
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        view: new View({
          // 默认EPSG:3857，可以设置为4326
          projection: 'EPSG:4326',
          // 杭州坐标
          center: [120.07908, 30.153068],
          // center: fromLonLat([120.07908, 30.153068]),
          // 地图最小缩放比例
          minZoom: 10,
          // 地图缩放级别（打开页面时默认级别）
          zoom: 15
        })
      })
      map.value.on('singleclick', (e: any) => {
        log('click1:', e)
        const coordinate = [e.coordinate[0], e.coordinate[1]]
        // log('click2:', transform(e.coordinate, 'EPSG:3857', 'EPSG:4326'))
        const container = document.getElementById('popup') as HTMLElement
        // const content = document.getElementById('popup-content') as HTMLElement
        const popup = new Overlay({
          element: container,
          autoPan: true
        })
        popup.setPosition(coordinate)
        map.value.addOverlay(popup)
      })
    }
    onMounted(() => {
      initMap()
    })
    return {
      initMap,
      map,
      test
    }
  }
})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mapPage {
      width: 100%;
      height: 100%;
    }
    #map {
      width: 90%;
      height: 90%;
      border: 1px solid gainsboro;
    }
    .flag {
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 10px;
    }
</style>
