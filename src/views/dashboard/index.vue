<template>
  <div class="dashboard-container p12" style="padding: 12px;">
    <div class="contents">
      <div class="title">
        协会概况
      </div>
      <div class="info">
        中国中小企业国际合作协会(CICASME)，成立于1990年，是中国第一家全国性中小企业社会团体，是国资委直管的16家全国性协会之一。协会接受工业和信息化部的业务指导和民政部的监督管理，与工业和信息化部中小企业发展促进中心合署办公、紧密协同。在历任会长、执行会长的带领下，协会已经在国内拥有会员单位2万余家，在国际上与30多个国家（地区）的商协会建立起实质性合作关系，成功运营APEC中小企业技术交流暨展示会、APEC中小企业工商论坛、中德中小企业经理人培训、中意工业节能技术培训、中国-中东欧中小企业合作示范等一系列品牌项目。协会建立完善会员分级服务机制，不断充实高效服务团队，依托中心、协会地位优势与核心业务，密切与其他向广大会员单位提供权益保护、国际合作、宣传推广、行业发展、国内交流、行业资讯等方面优质服务。协会已发展成为中国中小企业领域地位最权威、运行最规范、联系最广泛、国际影响力最大的社会团体。
      </div>
      <div class="footer-cont">
        <p>
          上海中小企业国际合作协会 版权所有 未经授权严禁转载任何内容或建立镜像
          <br>
          制作单位：上海中小企业国际合作协会
          <br>
          <span class="foot-bar-link"> 沪ICP备2021007053号-1 </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Dashboard'
}
</script>

<style lang="scss" scoped>
  .dashboard-container {
    width: 100%;
    height: calc( 100vh - 90px );
    .contents{
      width: 80%;
      margin: 0 auto;
      position: relative;
      height: calc(100vh - 85px );
      text-align: center;
      .title {
        margin-top: 50px;
        font-size: 30px;
        font-weight: bold;
      }
      .info {
        margin-top: 50px;
        font-size: 16px;
        line-height: 30px;
        text-align: left;
        text-indent: 2em;
      }
      .footer-cont{
        position: absolute;
        padding: 25px 0;
        bottom: 100px;
        left: 0;
        width: 100%;
        p {
          font-size: 16px;
          color: #AEAEAE ;
          line-height: 30px;
          text-align: center;
          span {
            color: #AEAEAE;
          }
        }
      }
    }
  }
</style>
