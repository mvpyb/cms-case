<template>
  <div class="section-main no-data">
    <svg-icon class-name="handle-icon" icon-class="no-datas" />
    <div class="txt">
      {{ txt }}
    </div>
  </div>
</template>

<script>
export default {
  name : 'NoData',
  props : {
    txt : {
      type : String,
      default : '什么也没有'
    }
  }
}
</script>

<style scoped lang="scss">
  .no-data {
    text-align: center;
    .handle-icon{
      width: 300px;
      height: 300px;
    }
    .txt {
      width: 100%;
      font-size: 30px;
      color: #ccc;
    }
  }
</style>
