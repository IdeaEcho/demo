<template>
  <div class="picker">
    <!-- 选择项 -->
    <div class="picker-items">
      <picker-slot :values="values || []" :valueKey="valueKey" :defaultIndex="defaultIndex" :formatTextFn="formatTextFn"
        v-model="values[values.valueIndex]"></picker-slot>
      <div class="picker-center-highlight"></div>
    </div>
  </div>
</template>

<script>
  import pickerSlot from './picker-slot.vue'
  export default {
    name: 'picker',
    componentName: 'picker',
    components: {
      pickerSlot
    },
    props: {
      values: {
        type: Array
      },
      valueKey: String,
      //初始下标
      defaultIndex: {
        type: Number,
        default: 0
      },
      //字符串格式处理函数
      formatTextFn: {
        type: Function,
        default: null
      }
    },
    created() {
      this.$on('slotValueChange', this.slotValueChange);
    },
    methods: {
      slotValueChange(e) {
        this.$emit('change', this, e.currentValue);
      },
    },
  }
</script>

<style lang="scss">
  .picker {
    overflow: hidden;
  }

  .picker-items {
    display: flex;
    justify-content: center;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }

  .picker-center-highlight {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    height: 36px;
    top: 50%;
    margin-top: -18px;
    pointer-events: none;
  }

  .picker-center-highlight:after,
  .picker-center-highlight:before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #dcdcdc;
    display: block;
    z-index: 15;
    // transform: scaleY(0.5);
  }

  .picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }

  .picker-center-highlight:after {
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
  }
</style>