<template>
  <div>
    <a-menu
      mode="horizontal"
      v-model="actived"
      @click="handleClick"
      style="box-shadow:none;"
    >
      <a-menu-item :key="item.name" v-for="item in options">
        <a :href="item.path" target="_blank">{{ item.name }}</a>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      actived: []
    }
  },
  computed: {
    ...mapGetters(['activedProject'])
  },
  watch: {
    activedProject: {
      handler(val) {
        this.actived = val
      },
      immediate: true
    }
  },
  // WATC
  methods: {
    ...mapMutations('setting', ['setActivedProject']),
    handleClick(val) {
      console.log(2222, val)
      if (val && val.key) {
        this.setActivedProject([val.key])
      }
    }
  }
}
</script>
