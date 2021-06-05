<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline : [
        {
          timestamp : '2019/4/20',
          title : '我是标题',
          content : '这是个简介 2020/11/16 20:46'
        }
      ]
    }
  }
}
</script>
