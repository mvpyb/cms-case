<template>
  <div class="un-select" :class="[ className, disabled ? 'disabled' : '', size + '-size' ]" @click="btnClick">
    <slot />
  </div>
</template>

<script>
export default {
  name : 'Btn',
  props : {
    disabled : {
      type : Boolean,
      default : false
    },
    className : {
      type : String,
      default : 'new-default'
    },
    size : {
      type : String,
      default : 'default'
    }
  },
  data() {
    return {
      listLoading : false
    }
  },
  mounted() {
    // console.log( 'test', this.className )
  },
  methods : {
    btnClick() {
      if ( this.disabled ) return false
      this.$emit( 'btnClick' )
    }
  }
}
</script>

