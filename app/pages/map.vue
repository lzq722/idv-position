<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
        <el-button @click="toPosition">回到选点</el-button>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin-top: 30px;">
        <div v-for="option in source" :key="option" style="width: 19%; height: auto; margin-right: 10px; margin-bottom: 10px; cursor: pointer;" @click="value = option">
            <img :src="`/idv-position/sidedoorpng/${option}.png`" alt="">
        </div>
    </div>
    <div v-if="value" style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
        <div style="width:80%;">
            <img :src="`/idv-position/bookmaps/${value}.jpg`" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">

const value = ref()
const router = useRouter();
const source = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

function toPosition() {
    router.push('/');
}
</script>

<style>
</style>
