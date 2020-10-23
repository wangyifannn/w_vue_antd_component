<template>
  <div class="margin-bottom-10">
    <a-form-model
      :layout="form.layout"
      ref="myForm"
      :rules="rules"
      :model="formData"
      v-bind="formItemLayout"
    >
      <!-- 栅格列布局 -->
      <a-row v-if="formColumn > 1" :gutter="24" class="clearfix">
        <template v-for="(item, index) in formItem">
          <a-col
            :span="item.colSpan ? item.colSpan : 24 / formColumn"
            :key="index"
            :class="
              item.fLeft ? 'float-left' : item.fRight ? 'float-right' : ''
            "
          >
            <a-form-model-item
              v-if="!item.hidden"
              :label="item.label"
              :labelAlign="item.labelAlign || 'left'"
              :class="item.type === 'text' ? 'bold_style' : item.class"
              :prop="item.name"
              :wrapperCol="item.wrapperCol"
            >
              <a-input
                v-if="item.type === 'input'"
                :placeholder="item.holder || '请填写'"
                :disabled="item.disabled"
                v-model="formData[item.name]"
              />
              <div v-if="item.type === 'textarea'" class="textaarea_wrap">
                <a-input
                  style="position:relative"
                  :placeholder="item.holder"
                  :showLimit="item.showLimit"
                  :auto-size="{
                    minRows: item.minRows || 2,
                    maxRows: item.maxRows || 5
                  }"
                  :disabled="item.disabled"
                  type="textarea"
                  v-model="formData[item.name]"
                >
                </a-input>
                <div v-if="item.maxLength" class="textarea_limit_wrap">
                  {{ item.minLength }}/{{ item.maxLength }}
                </div>
              </div>
              <div v-if="item.type === 'upload'">
                <uplaod :name="item.name" @uploadOk="uploadOk"></uplaod>
              </div>
              <div class="text_box" v-if="item.type === 'text'">
                {{ formData[item.name] }}
              </div>
              <div class="text_box" v-if="item.type === 'avatar'">
                <div class="avatar_box">
                  <a-avatar
                    shape="square"
                    :size="64"
                    :src="formData[item.name]"
                    icon="user"
                  />
                </div>
              </div>
              <a-select
                v-if="item.type === 'select'"
                v-model="formData[item.name]"
                :showSearch="item.showSearch || false"
                :disabled="item.disabled"
                :placeholder="item.holder || '请选择'"
              >
                <a-select-option
                  v-for="iitem in item.options"
                  :key="iitem.value || iitem._id"
                  :value="iitem.value || iitem._id || iitem.name"
                >
                  {{ iitem.label || iitem.name }}
                </a-select-option>
              </a-select>
              <a-input-number
                v-if="item.type === 'inputNumber'"
                v-model="formData[item.name]"
                :min="item.min || 0"
                :max="item.max || Infinity"
                @change="inputNumberOnChange"
              />
              <a-checkbox-group
                v-if="item.type === 'checkbox'"
                v-model="formData[item.name]"
              >
                <a-checkbox
                  v-for="iitem in item.options"
                  :key="iitem.value"
                  :value="iitem.value"
                  name="type"
                >
                  {{ iitem.label }}
                </a-checkbox>
              </a-checkbox-group>
              <a-radio-group
                v-if="item.type === 'radio'"
                v-model="formData[item.name]"
              >
                <a-radio
                  v-for="iitem in item.options"
                  :key="iitem.value"
                  :value="iitem.value"
                >
                  {{ iitem.label }}
                </a-radio>
              </a-radio-group>
              <a-date-picker
                v-if="item.type === 'date'"
                v-model="formData[item.name]"
                show-time
                type="date"
                placeholder="请选择日期"
                style="width: 100%;"
              />
              <a-switch
                v-if="item.type === 'switch'"
                v-model="formData[item.name]"
              />
            </a-form-model-item>
          </a-col>
        </template>
      </a-row>
      <!-- 垂直、水平、inline布局 -->
      <template v-else v-for="(item, index) in formItem">
        <a-form-model-item
          v-if="!item.hidden"
          :colon="form.colon || false"
          :key="index"
          :label="item.label"
          :class="item.type === 'text' ? 'bold_style' : item.class"
          :labelCol="item.labelCol"
          :labelAlign="item.labelAlign || 'left'"
          :wrapperCol="item.wrapperCol"
          :prop="item.name"
        >
          <a-input
            v-if="item.type === 'input'"
            :placeholder="item.holder"
            :disabled="item.disabled"
            v-model="formData[item.name]"
          />
          <div v-if="item.type === 'textarea'" class="textaarea_wrap">
            <a-input
              style="position:relative"
              :placeholder="item.holder"
              :showLimit="item.showLimit"
              :auto-size="{
                minRows: item.minRows || 2,
                maxRows: item.maxRows || 5
              }"
              :disabled="item.disabled"
              type="textarea"
              v-model="formData[item.name]"
            >
            </a-input>
            <div v-if="item.maxLength" class="textarea_limit_wrap">
              {{ item.minLength }}/{{ item.maxLength }}
            </div>
          </div>
          <a-select
            v-if="item.type === 'select'"
            v-model="formData[item.name]"
            :disabled="item.disabled"
            :placeholder="item.holder || '请选择'"
          >
            <a-select-option
              v-for="iitem in item.options"
              :key="iitem.id || iitem._id"
              :value="iitem.value || iitem._id || iitem.name"
            >
              {{ iitem.label || iitem.name }}
            </a-select-option>
          </a-select>
          <div class="text_box" v-if="item.type === 'text'">
            {{ formData[item.name] }}
          </div>
          <div class="text_box" v-if="item.type === 'avatar'">
            <div class="avatar_box">
              <img :src="formData[item.name]" alt="" />
            </div>
          </div>
          <a-input-number
            v-if="item.type === 'inputNumber'"
            v-model="formData[item.name]"
            :min="item.min || 0"
            :max="item.max || Infinity"
            @change="inputNumberOnChange"
          />
          <a-checkbox-group
            v-if="item.type === 'checkbox'"
            v-model="formData[item.name]"
          >
            <a-checkbox
              v-for="iitem in item.options"
              :key="iitem.value"
              :value="iitem.value"
              name="type"
            >
              {{ iitem.label }}
            </a-checkbox>
          </a-checkbox-group>
          <a-radio-group
            v-if="item.type === 'radio'"
            v-model="formData[item.name]"
          >
            <a-radio
              v-for="iitem in item.options"
              :key="iitem.value"
              :value="iitem.value"
            >
              {{ iitem.label }}
            </a-radio>
          </a-radio-group>
          <a-date-picker
            v-if="item.type === 'date'"
            v-model="formData[item.name]"
            show-time
            type="date"
            placeholder="请选择日期"
            style="width: 100%;"
          />
          <a-switch
            v-if="item.type === 'switch'"
            v-model="formData[item.name]"
          />
        </a-form-model-item>
      </template>
      <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button
          class="margin-right-10"
          v-if="form.btnTxt"
          @click="onSubmit"
          type="primary"
        >
          {{ form.btnTxt }}
        </a-button>
        <a-button v-if="form.cancelBtnTxt" @click="onCancel">
          {{ form.cancelBtnTxt }}
        </a-button>
        <slot name="otherBtn"></slot>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import uplaod from '../upload'
export default {
  name:'wForm',
  components: { uplaod },
  props: {
    formData: { type: Object, default: () => {} },
    form: {
      type: Object,
      default: () => {
        return { layout: '', btnTxt: '', cancelBtnTxt: '' }
      }
    },
    rules: {},
    labelCol: {
      type: Object,
      default: () => {
        return { span: 4 }
      }
    },
    formColumn: {
      type: Number,
      default: 1
    },
    formItem: {
      type: Array,
      default: () => []
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return { span: 20 }
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    btnWrapperCol() {
      return { span: this.wrapperCol.span, offset: this.labelCol.span }
    },
    formItemLayout() {
      const { layout } = this.form
      let obj =
        layout === 'horizontal'
          ? {
              labelCol: this.labelCol,
              wrapperCol: this.wrapperCol
            }
          : layout === 'vertical'
          ? {}
          : {}
      return obj
    },
    buttonItemLayout() {
      const { layout } = this.form
      return layout === 'horizontal'
        ? {
            wrapperCol: this.btnWrapperCol
          }
        : {}
    }
  },
  methods: {
    uploadOk(val) {
      this.formData[val.name] = val.img
    },
    inputNumberOnChange() {},
    onSubmit() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$refs.myForm.resetFields()
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="less">
@import 'index';
</style>
