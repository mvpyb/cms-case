<template>
  <div class="multiple-input-wrapper" :class="[disabled ? 'disabled' : '']" @click.stop="focusInp">
    <div class="multiple-input__rendered">
      <ul class="clearfix">
        <li v-for="item in inputs" :key="item.id" class="multiple-input-item multiple-input__choice">
          <div class="multiple-input__choice__content">{{ item.content }}</div>
          <span class="multiple-input__choice__remove" @click="removeTag( item )">
            <span class="multiple-input-remove-icon">
              <svg class="" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896" focusable="false"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>
            </span>
          </span>
        </li>
        <li class="multiple-input-item multiple-input-search multiple-input--inline">
          <div class="multiple-input-search__field__wrap">
            <input
              ref="multipleInputs"
              v-model="newValue"
              :disabled="disabled"
              autocomplete="off"
              :maxlength="maxlen"
              class="multiple-input-search__field"
              :style="{width:text(newValue)}"
              @keyup.enter="addTags"
              @blur="addTags"
            >
            <span class="multiple-input-search__field__mirror">&nbsp;</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name : 'CustomInp',
  props : {
    inputs : {
      type : Array,
      default : function() {
        return []
      }
    },
    disabled : {
      type : Boolean,
      default : false
    },
    value : {
      type : String,
      default : ''
    },
    maxlen : {
      type : Number,
      default : 150
    }
  },
  data() {
    return {}
  },
  computed : {
    newValue : {
      get : function() {
        return this.value
      },
      set : function( value ) {
        console.log( 'set', value )
        this.$emit( 'input', value )
      }
    },
    text() {
      return function( value ) {
        if ( value == '' || value == 0 ) {
          return '100%'
        } else {
          return String( value ).length + 1 + 'em'
        }
      }
    }
  },
  mounted() {

  },
  methods : {
    focusInp() {
      if ( this.disabled ) return false
      this.$refs.multipleInputs.focus()
    },
    removeTag( data ) {
      if ( this.disabled ) return false
      this.$emit( 'removeTag', data )
    },
    addTags() {
      if ( this.disabled ) return false
      this.$emit( 'addTags', this.currentInps )
    }
  }
}
</script>

<style lang="scss" scoped>
  .multiple-input-wrapper {
    display: block;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-top: 1.02px solid #d9d9d9;
    border-radius: 4px;
    outline: none;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    user-select: none;
    min-height: 32px;
    height: 40px;
    padding-bottom: 3px;
    cursor: text;
    zoom: 1;
    .multiple-input__rendered{
      position: relative;
      display: block;
      margin-right: 11px;
      line-height: 30px;
      height: auto;
      margin-bottom: -3px;
      margin-left: 5px;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .multiple-input-item{
        position: static;
        float: left;
        width: auto;
        max-width: 100%;
        padding: 0;
        &.multiple-input__choice{
          position: relative;
          float: left;
          max-width: 99%;
          margin-right: 4px;
          padding: 0 20px 0 10px;
          overflow: hidden;
          color: rgba(0,0,0,.65);
          background-color: #fafafa;
          border: 1px solid #e8e8e8;
          border-radius: 2px;
          cursor: default;
          transition: padding .3s cubic-bezier(.645,.045,.355,1);
          /*height: 24px;*/
          height: 32px;
          margin-top: 3px;
          /*line-height: 22px;*/
          line-height: 30px;
          user-select: none;

          .multiple-input__choice__content {
            display: inline-block;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: margin .3s cubic-bezier(.645,.045,.355,1);
          }
          .multiple-input__choice__remove{
            font-style: normal;
            text-align: center;
            text-transform: none;
            vertical-align: -.125em;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            position: absolute;
            right: 4px;
            top: 0;
            color: rgba(0,0,0,.45);
            font-weight: 700;
            line-height: inherit;
            cursor: pointer;
            transition: all .3s;
            display: inline-block;
            font-size: 12px;
            transform: scale(.83333333) rotate(0deg);
            width: 12px;
            .multiple-input-remove-icon{
              display: inline-block;
              color: inherit;
              font-style: normal;
              text-align: center;
              text-transform: none;
              vertical-align: -.125em;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              line-height: 1;
              svg{
                display: inline-block;
              }
            }
          }
        }
        &.multiple-input-search{
          /*height: 24px;*/
          height: 32px;
          margin-top: 3px;
          /*line-height: 22px;*/
          line-height: 30px;
          .multiple-input-search__field__wrap{
            position: relative;
            display: inline-block;
            width: 100%;
            height: 100%;
            .multiple-input-search__field{
              height: 100%;
              line-height: 1;
              background: transparent;
              border-width: 0;
              border-radius: 4px;
              outline: 0;
              width: .75em;
              max-width: 100%;
              padding: 1px;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.65);
              width: 100%;
            }
            .multiple-input-search__field__mirror{
              /*height: 24px;*/
              height: 32px;
              margin-top: 3px;
              /*line-height: 22px;*/
              line-height: 30px;
              position: absolute;
              top: 0;
              left: 0;
              white-space: pre;
              opacity: 0;
              pointer-events: none;
            }
          }
        }
      }

    }
    &.disabled{
      background: #f5f5f5;
      cursor: not-allowed;
      .multiple-input__rendered{
        cursor: not-allowed;
        .multiple-input-item{
          cursor: not-allowed;
          &.multiple-input-search{
            .multiple-input-search__field__wrap{
              .multiple-input-search__field{
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }
  }
</style>
