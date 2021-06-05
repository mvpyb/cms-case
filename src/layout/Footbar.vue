<template>
  <div class="footbar clearfix syRegular" style="background-color: #242424">
    <div class="w885">
      <div class="footer-top">
        <span class="foot-bar-link">首页</span>
        <span class="foot-bar-link">关于协会</span>
        <span class="foot-bar-link">工作动态</span>
        <span class="foot-bar-link">一站式服务</span>
        <span class="foot-bar-link">专题服务</span>
        <span class="foot-bar-link">出版宣传</span>
        <span class="foot-bar-link">会员天地</span>
      </div>
      <div class="footer-cont">
        <p>
          上海中小企业国际合作协会 版权所有 未经授权严禁转载任何内容或建立镜像
          <br>
          客服邮箱：XXXX@siab.com.cn  制作单位：上海中小企业国际合作协会
          <br>
          <span class="foot-bar-link"> 沪ICP备XXXXXXXX号-X</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Footbar',
  data() {
    return {

    }
  },
  computed : {},
  watch : {},
  mounted() {
  },
  methods : {

  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background: #242424;
    /*border-bottom: 3px solid #274898;*/
  }
  .footer-top {
    text-align: center;
    border-bottom: 1px solid #bbb;
    padding: 20px 0;
    span {
      color: #AEAEAE;
      padding: 0 30px;
      &:hover {
        color: #274898;
      }
    }
  }
  .footer-cont {
    padding: 25px 0;
    p {
      font-size: 14px;
      color: #AEAEAE ;
      line-height: 30px;
      text-align: center;
      span {
        color: #AEAEAE;
      }
    }
  }
</style>
