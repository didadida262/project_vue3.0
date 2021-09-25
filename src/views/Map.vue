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
import { defaults, ScaleLine, MousePosition, FullScreen, ZoomToExtent, OverviewMap, Rotate } from 'ol/control'
import Tile from 'ol/layer/Tile'// 瓦片渲染方法
import OSM from 'ol/source/OSM'// OSM瓦片【OSM不能在实际开发中使用，因为OSM里中国地图的边界有点问题！！！！】
import 'ol/ol.css'
import Overlay from 'ol/Overlay'
import { fromLonLat, transform } from 'ol/proj'// 转换
import Interaction from 'ol/interaction'// 不知道干嘛用的
import { format } from 'ol/coordinate'

export default defineComponent({
  name: 'Map',
  setup () {
    const map = ref(null) as any
    // map中的各种类型
    const type = {
      // 单击
      click: 'click',
      dblclick: 'dblclick', // 双击，双击会触发click
      singleclick: 'singleclick', // 单击，延迟250毫秒，就算双击不会触发
      moveend: 'moveend', // 鼠标滚动事件
      pointermove: 'pointermove', // 鼠标移动事件
      pointerdrag: 'pointerdrag', // 鼠标拖动事件
      precompose: 'precompose', // 地图准备渲染，为渲染
      postcompose: 'postcompose', // 地图渲染中
      postrender: 'postrender', // 地图渲染全部结束
      changeLayerGroup: 'change:layerGroup', // 地图图层增删时触发
      changeSize: 'change:size', // 地图窗口发生变化就会触发
      changeTarget: 'change:target', // 地图绑定的div发生更改时触发
      changeView: 'change:view', // 地图view对象发生变化触发
      propertychange: 'propertychange' // Map对象中任意的property值改变时触发
    }
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
    // add map evetn
    const addMapEvent = () => {
      map.value.on(type.click, (e: any) => {
        log('click1:', e)
        // 获取当前点击位置的屏幕坐标
        const pixel = map.value.getEventPixel(e.originalEvent)
        log('pixel:', pixel)
        // 检测与视口上的像素相交的要素
        map.value.forEachFeatureAtPixel(pixel, (feature: any, layers: any) => {
          log('pixel:', pixel)
          // feature,返回的要素
          console.log('feature:', feature)
          // layers，返回的图层
          console.log('layers:', layers)
        })
        const coordinate = [e.coordinate[0], e.coordinate[1]]
        log('coordinate:', coordinate)
        // log('click2:', transform(e.coordinate, 'EPSG:3857', 'EPSG:4326'))
        const container = document.getElementById('popup') as HTMLElement
        container.style.display = 'inline-block'
        // const content = document.getElementById('popup-content') as HTMLElement
        const popup = new Overlay({
          element: container,
          autoPan: true
        })
        popup.setPosition(coordinate)
        map.value.addOverlay(popup)
      })
    }
    const addMapControl = () => {
      log('1')
      // 全屏控件
      const controlFullscreen = new FullScreen({
        className: 'ol-full-screen', // CSS类名称,ol-full-screen
        tipLabel: 'Full-screen' // 鼠标滑入按钮提示信息，默认'Toggle full-screen'
        // 如果要使控件在地图视口之外呈现，请指定一个目标
        // target:document.getElementById('box'),
      })
      // 导览控件
      const controlNav = new ZoomToExtent({
        className: 'ol-zoom-extent', // CSS类名称,默认ol-zoom-extent
        tipLabel: 'Fit to extent', // 鼠标滑入按钮提示信息，默认'Fit to extent'
        label: 'N', // 用于按钮的文本，默认为'E'
        extent: [108, 34, 109, 35] // 缩放的程度。如果未定义，则使用视图投影的有效性范围。
      })
      // 概览(鹰眼)控件
      const controlOverview = new OverviewMap({
        className: 'ol-overviewmap ol-custom-overviewmap', // CSS类名称，默认'ol-overviewmap'
        collapsed: false, // 控件初始是否折叠,默认为true
        collapseLabel: '«', // 折叠时的按钮文本,默认为"«"
        label: '»', // 展开时的按钮文本，默认为"»"
        collapsible: true, // 控件是否可以折叠，默认为true
        tipLabel: 'Overview map', // 鼠标滑入按钮提示信息,默认'Overview map'
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        view: new View({
          projection: 'EPSG:4326', // 投影方式
          center: [108, 34], // 定义初始显示位置
          zoom: 3 // 定义地图显示层级
        })
      })
      // 鼠标位置控件:显示坐标信息
      const controlMouse = new MousePosition({
        className: 'ol-mouse-position', // css名称，默认'ol-mouse-position'
        coordinateFormat: (param: any) => {
          return format(param, '{x}, {y}', 6)
        }, // 坐标格式
        projection: 'EPSG:4326'
      })
      map.value.addControl(controlMouse)
      map.value.addControl(controlOverview)
      map.value.addControl(controlNav)
      map.value.addControl(controlFullscreen)
      // 该功能用于设置控件的目标元素
      // control.setTarget(target)
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
        }),
        controls: defaults({
          // 版权信息
          attribution: false,
          // 缩放按钮
          zoom: true
        }).extend([])
      })
      addMapEvent()
      addMapControl()
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
    display: none;
  }
</style>
