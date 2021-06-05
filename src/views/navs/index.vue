<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name : 'Navs',
  components : { },
  data() {
    return {
      user : {},
      activeTab : 'activity'
    }
  },
  computed : {
    ...mapGetters( [
      'name',
      'avatar',
      'roles'
    ] )
  },
  created() {
    this.getUser()
  },
  methods : {
    getUser() {
      this.user = {
        name : this.name,
        role : this.roles.join( ' | ' ),
        email : 'zhaocai@ivglass.com',
        avatar : this.avatar
      }
    }
  }
}
</script>
