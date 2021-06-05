<template>
  <div class="field about-content-item clearfix" ref="fields">
    <div
      v-for="( item, index ) in fields"
      :key="index +'_field'"
      class="field-item"
    >{{ item }}</div>
  </div>
</template>

<script>
export default {
  name : 'Fields',
  props : {
    fields : {
      type : Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // console.log( 'fields', this.fields )
    this.setFieldsLen()
  },
  methods : {
    async handle() {},
    async setFieldsLen() {
      const el = this.$refs.fields
      const rect = el.getBoundingClientRect()
      const { width } = rect
      const children = el.children
      const len = this.fields.length
      // const paddings = 26
      const margins = 10
      // console.log( 'el', el )
      // console.log( 'children', el.children )
      // console.log( 'rect', rect )
      // console.log( 'width', width )
      let widthStr = 0
      let threshold = 0
      for ( let i = 0; i < len; i++ ) {
        const cRect = children[i].getBoundingClientRect()
        const cWidth = cRect.width
        widthStr += ( cWidth + margins * 2 )
        // console.log( 'widthStr', widthStr )
        // console.log( 'i', i )
        if ( widthStr >= width ) {
          threshold = i - 1
          break
        }
      }
      for ( let i = 0; i < len; i++ ) {
        if ( i > threshold ) {
          children[i].style.display = 'none'
        }
      }
      // console.log( 'threshold', threshold )
    }
  }
}
</script>

<style lang="scss" scoped>
  .about-content-item {
    width: 100%;
    &.field{
      margin-top: 40px;
      display: inline-block;
      .field-item{
        display: inline-block;
        margin: 10px 10px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        padding: 0 26px;
        border-radius: 26px;
        background-color: #eee;
      }
    }
  }
</style>
