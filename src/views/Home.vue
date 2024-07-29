<script setup>

import {getVideo} from "@/apis/TestAPI";
import {ref} from "vue";

const videoList = ref([]);
const getData = async () => {
    const resp = await getVideo();
    console.log(resp.data.toString())
    const $ = cheerio.load(resp.data.toString())
    console.log($('div.xing_vb').text())

}

</script>

<template>
    <div class="home">
        <p>我是首页</p>
        <el-button type="primary" @click="getData()">获取列表</el-button>
        <el-table>

        </el-table>
    </div>
</template>


<style scoped>
.home {
    width: 800px;
    height: 800px;
    background-color: lavender;
}
</style>