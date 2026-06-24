<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
    <el-button @click="toMap">加页手记</el-button>
  </div>
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
  <div v-if="matched" style="margin-top: 20px;">
    <el-card>
      <h3>刷点</h3>
      <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
        <img
            v-for="match in matched"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import position1 from '../public/positions/1.json'
import position2 from '../public/positions/2.json'
import position3 from '../public/positions/3.json'
import position4 from '../public/positions/4.json'
import position5 from '../public/positions/5.json'
import position6 from '../public/positions/6.json'
import position7 from '../public/positions/7.json'
import position8 from '../public/positions/8.json'
import position9 from '../public/positions/9.json'

const value = ref('')
const value2 = ref('1')
const mapImg = ref<HTMLImageElement | null>(null)
const matched = ref<number[]>([])
const router = useRouter();
let position: unknown;

function toMap() {
  router.push('/map');
}

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
  if (value.value === '1') {
      position = position1;
  } else if (value.value === '2') {
      position = position2;
  } else if (value.value === '3') {
      position = position3;
  } else if (value.value === '4') {
      position = position4;
  } else if (value.value === '5') {
      position = position5;
  } else if (value.value === '6') {
      position = position6;
  } else if (value.value === '7') {
      position = position7;
  } else if (value.value === '8') {
      position = position8;
  } else if (value.value === '9') {
      position = position9;
  }
  if (!mapImg.value) return

  const rect = mapImg.value.getBoundingClientRect()

  const relativeX = event.clientX - rect.left
  const relativeY = event.clientY - rect.top

  const percentX = relativeX / rect.width * 10000
  const percentY = relativeY / rect.height * 10000

  if (value2.value === '1') {
    matched.value = getPosition(position, percentX, percentY);

  } else if (value2.value === '2') {
    matched.value = getPosition2(position, percentX, percentY);
    
  }

  // console.log(`点击坐标: x=${percentX}, y=${percentY}`)
  // console.log(matched.value)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPosition(position: any, xposition: number, yposition: number): number[] {
    const matchedGroups: number[] = []
    for (const key in position) {
        const points = position[key]
        if (!points || points.length < 4) continue
        for (let j = 0; j < 4; j++) {
            const point = points[j]
            const dx = point.x - xposition
            const dy = point.y - yposition
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 900) {
                const groupNumber = parseInt(key.replace('position', ''), 10)
                matchedGroups.push(groupNumber)
                break
            }
        }
    }
    return matchedGroups
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPosition2(position: any, xposition: number, yposition: number): number[] {
    const matchedGroups: number[] = []

    for (const key in position) {
        const points = position[key]
        const point = points[4]
        const dx = point.x - xposition
        const dy = point.y - yposition
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 900) {
            const groupNumber = parseInt(key.replace('position', ''), 10)
            matchedGroups.push(groupNumber)
            break
        }
    }
    return matchedGroups
}
</script>

<style>
</style>
