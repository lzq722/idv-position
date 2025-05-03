<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 30px;">
    <el-select
      v-model="value"
      placeholder="选择地图"
      size="large"
      style="width: 240px; margin-bottom: 20px;"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="value2"
      placeholder="选择阵营"
      size="large"
      style="width: 240px; margin-bottom: 20px;"
    >
      <el-option
        v-for="item in camp"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <img
      v-if="value"
      ref="mapImg"
      :src="`/idv-position/maps/${value}.png`"
      style="width: 90%; cursor: crosshair;"
      @click="searchposition"
    >
  </div>
  <div v-if="!value" style="margin-top: 20px;">
      <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
        <div v-for="option in options" :key="option.value" style="width: 30%; height: auto; margin-right: 10px; margin-bottom: 10px; cursor: pointer;" @click="value = option.value">
          <img :src="`/idv-position/maps/${option.value}.png`" :alt="option.label" style="width: 100%; height: auto;">
          <p style="text-align: center;">{{ option.label }}</p>
        </div>
      </div>
  </div>
  <div v-if="positionid" style="margin-top: 20px;">
    <el-card>
      <h3>刷点情况</h3>
      <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
        <img
          v-for="match in positionid.matched"
          :key="match"
          :src="`/idv-position/mapwithposition/${value}-${match}.png`"
          alt="选点图"
          style="width: 30%; height: auto; margin-right: 10px; margin-bottom: 10px;"
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const value = ref('')
const value2 = ref('1')
const positionid = ref('')
const mapImg = ref<HTMLImageElement | null>(null)
const camp = [
  {
    value: '1',
    label: '求生者',
  },
  {
    value: '2',
    label: '监管者',
  },
]
const options = [
  {
    value: '1',
    label: '军工厂',
  },
  {
    value: '2',
    label: '红教堂',
  },
  {
    value: '3',
    label: '圣心医院',
  },
  {
    value: '4',
    label: '永眠镇',
  },
  {
    value: '5',
    label: '唐人街',
  },
  {
    value: '6',
    label: '不归林',
  },
  {
    value: '7',
    label: '湖景村',
  },
  {
    value: '8',
    label: '月亮河公园',
  },
  {
    value: '9',
    label: '里奥的回忆',
  },
]
const searchposition = async (event: MouseEvent) => {
  if (!mapImg.value) return

  const rect = mapImg.value.getBoundingClientRect()

  const relativeX = event.clientX - rect.left
  const relativeY = event.clientY - rect.top

  const percentX = relativeX / rect.width * 10000
  const percentY = relativeY / rect.height * 10000

  if (value2.value === '1') {
    positionid.value = await $fetch("/api/match",{
      method: 'post',
      body: {xposition: percentX, yposition: percentY, mapid: value.value}
    })
  } else if (value2.value === '2') {
    positionid.value = await $fetch("/api/match2",{
      method: 'post',
      body: {xposition: percentX, yposition: percentY, mapid: value.value}
    })
  }

  console.log(`点击坐标: x=${percentX}, y=${percentY}`)
  console.log(positionid.value.matched)
}
</script>

<style>
</style>
