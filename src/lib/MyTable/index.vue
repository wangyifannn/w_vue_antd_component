<template>
  <div>
    <slot name="form"></slot>
    <div class="color-black margin-bottom-10">
      {{ title }}
    </div>
    <a-table
      class="my_table"
      :row-selection="
        multiple || radio
          ? {
              type: multiple ? 'checkbox' : 'radio',
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }
          : null
      "
      :bordered="bordered"
      :dataSource="dataSource"
      :pagination="false"
    >
      <template v-for="item in showColumn">
        <a-table-column
          v-if="item.type == 'action'"
          :key="item.key"
          :data-index="item.key"
          :title="item.title"
        >
          <template slot-scope="text, record, index">
            <span v-for="(citem, ind) in operation.btns" :key="'btn_' + ind">
              <a-button
                v-if="setShow(record, citem)"
                :key="index"
                :type="citem.type || 'link'"
                :style="citem.style"
                :title="
                  !!setDisabled(record, citem) && citem.btnTip
                    ? citem.btnTip
                    : ''
                "
                :class="citem.class"
                @click="handle(citem.handle, record, index)"
                :icon="citem.icon"
                :disabled="setDisabled(record, citem)"
                :size="citem.size || 'small'"
                >{{ citem.content }}
              </a-button>
            </span>
          </template>
        </a-table-column>
        <!-- 头像avatar || formatTime -->
        <a-table-column
          v-else-if="item.type == 'avatar' || item.type === 'date'"
          :key="item.key"
          :title="item.title"
        >
          <template slot-scope="record">
            <a-avatar
              v-if="item.type == 'avatar'"
              :src="record.avatar"
              alt=""
            />
            <span v-if="item.type === 'date'">{{
              formatTime(record.date)
            }}</span>
          </template>
        </a-table-column>
        <a-table-column
          v-else-if="item.type == 'slot'"
          :key="item.key"
          :title="item.title"
        >
          <template slot-scope="record, index">
            <slot
              :name="item.key"
              v-bind:row="record"
              v-bind:index="index"
            ></slot>
          </template>
        </a-table-column>
        <a-table-column
          v-else
          :key="item.key"
          :data-index="item.key"
          :title="item.title"
        >
        </a-table-column>
      </template>
    </a-table>
    <a-pagination
      v-if="page.total"
      v-model="page.currentPage"
      class="margin-top-30 align-center"
      show-quick-jumper
      show-size-changer
      :pageSizeOptions="
        page.pageSizeOptions ? page.pageSizeOptions : ['10', '50', '100']
      "
      :default-current="page.currentPage"
      :show-total="total => `共 ${page.total} 条`"
      :total="page.total"
      @change="onChange"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'wTable',
  props: {
    align: {
      type: String,
      default: 'left'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    radio: {
      type: Boolean,
      default: false
    },
    tableAttr: {
      type: Object,
      default: () => {}
    },
    cardTitle: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    operation: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      checkedRow: {}
    }
  },
  watch: {},
  computed: {
    showColumn() {
      return this._.filter(this.columns, function(o) {
        return !o.hidden
      })
    }
  },
  created() {},
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onChange(pageNumber) {
      console.log('Page: ', pageNumber)
      this.$emit('onChange', pageNumber)
    },
    onShowSizeChange(current, pageSize) {
      let val = { current, pageSize }
      this.$emit('sizeChange', val)
    },
    editMember(row) {
      // 编辑
      console.log(row)
    },
    toLog(row) {
      //
      console.log(row)
    },
    setDisabled(row) {
      var flag = false
      switch (this.operation.nowPage) {
        case 'explamesTable':
          if (row.is_relative) {
            flag = true
          }
          break
        default:
          break
      }
      return flag
    },
    setShow(row, btn) {
      var flag = true
      switch (this.operation.nowPage) {
        case 'askServicesTable':
          if (btn.show && row.askOnlineStatus != btn.show) {
            flag = false
          }
          break
        default:
          break
      }
      return flag
    },
    rowClick(row) {
      console.log('row==', row)
      this.$emit('rowClick', row)
      this.checkedRow = row && row._id ? row._id : row
    },
    handle(str, row, index) {
      this.rowClick(row)
      row.$index = index
      this.$emit(str, row) // 将事件名字和参数值传递出去，
    }
  }
}
</script>

<style lang="less">
@import 'index';
</style>
