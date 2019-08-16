<template>
  <div class="picker-slot">
    <div ref="wrapper" class="picker-slot-wrapper">
      <div class="picker-item" :key="index" v-for="(itemValue,index) in mutatingValues"
        :class="{ 'picker-selected': itemValue === currentValue }">
        {{typeof formatTextFn == 'function' ? formatTextFn(itemValue) : itemValue}}
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from './draggable';
  import translateUtil from './translate';
import { log } from 'util';
  export default {
    name: 'picker-slot',
    props: {
      values: {
        type: Array,
        default () {
          return [];
        }
      },
      value: {},
      itemHeight: {
        type: Number,
        default: 36
      },
      //可见区域展示数据数量
      visibleItemCount: {
        type: Number,
        default: 3
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      formatTextFn: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        valueIndex: -1, //当前数据下标
        currentValue: this.value, //当前数据
        mutatingValues: this.values, //所有数据
        dragging: false,
      };
    },
    computed: {
      dragRange() {
        var values = this.mutatingValues;
        var visibleItemCount = this.visibleItemCount;
        var itemHeight = this.itemHeight;
        return [-itemHeight * (values.length - Math.ceil(visibleItemCount / 2)), itemHeight * Math.floor(
          visibleItemCount / 2)];
      },
    },
    methods: {
      translate2Value(translate) {
        var itemHeight = this.itemHeight;
        translate = Math.round(translate / itemHeight) * itemHeight;
        var index = -(translate - Math.floor(this.visibleItemCount / 2) * itemHeight) / itemHeight;
        return this.mutatingValues[index];
      },
      value2Translate(value) {
        var values = this.mutatingValues;
        var valueIndex = values.indexOf(value);
        var offset = Math.floor(this.visibleItemCount / 2);
        var itemHeight = this.itemHeight;
        if (valueIndex !== -1) {
          return (valueIndex - offset) * -itemHeight;
        }
      },
      initEvents() {
        var el = this.$refs.wrapper;
        var dragState = {};
        var velocityTranslate, prevTranslate, pickerItems;
        draggable(el, {
          start: (event) => {
            dragState = {
              range: this.dragRange,
              start: new Date(),
              startLeft: event.pageX,
              startTop: event.pageY,
              startTranslateTop: translateUtil.getElementTranslate(el).top
            };
            pickerItems = el.querySelectorAll('.picker-item');
          },
          drag: (event) => {
            this.dragging = true;
            dragState.left = event.pageX;
            dragState.top = event.pageY;
            var deltaY = dragState.top - dragState.startTop;
            var translate = dragState.startTranslateTop + deltaY;
            translateUtil.translateElement(el, null, translate);
            velocityTranslate = translate - prevTranslate || translate;
            prevTranslate = translate;
            if (this.rotateEffect) {
              this.updateRotate(prevTranslate, pickerItems);
            }
          },
          end: (event) => {
            this.dragging = false;
            var momentumRatio = 7;
            var currentTranslate = translateUtil.getElementTranslate(el).top;
            var duration = new Date() - dragState.start;
            let distance = Math.abs(dragState.startTranslateTop - currentTranslate);
            var itemHeight = this.itemHeight;
            var visibleItemCount = this.visibleItemCount;
            let rect, offset;
            if (distance < 6) {
              rect = this.$el.getBoundingClientRect();
              offset = Math.floor((event.clientY - (rect.top + (visibleItemCount - 1) * itemHeight / 2)) /
                itemHeight) * itemHeight;
              if (offset > this.maxTranslateY) {
                offset = this.maxTranslateY;
              }
              velocityTranslate = 0;
              currentTranslate -= offset;
            }
            var momentumTranslate;
            if (duration < 300) {
              momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
            }
            var dragRange = dragState.range;
            this.$nextTick(() => {
              var translate;
              if (momentumTranslate) {
                translate = Math.round(momentumTranslate / itemHeight) * itemHeight;
              } else {
                translate = Math.round(currentTranslate / itemHeight) * itemHeight;
              }
              translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);
              translateUtil.translateElement(el, null, translate);
              this.currentValue = this.translate2Value(translate);
              if (this.rotateEffect) {
                this.planUpdateRotate();
              }
            });
            dragState = {};
          }
        });
      },
      doOnValueChange() {
        var value = this.currentValue;
        var wrapper = this.$refs.wrapper;
        translateUtil.translateElement(wrapper, null, this.value2Translate(value));
      },
      dispatch(componentName, eventName, params) {
        var parent = this.$parent;
        var name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;

          if (parent) {
            name = parent.$options.componentName;
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params));
        }
      },
    },
    mounted() {
      this.currentValue = this.mutatingValues[this.defaultIndex];
      this.initEvents();
      this.doOnValueChange();
    },
    watch: {
      values(val) {
        this.mutatingValues = val;
      },
      mutatingValues(val) {
        if (this.valueIndex === -1) {
          this.currentValue = (val || [])[0];
        }
      },
      currentValue(val) {
        this.doOnValueChange();
        this.$emit('input', val);
        this.dispatch('picker', 'slotValueChange', this);
      },
      defaultIndex(val) {
        if ((this.mutatingValues[val] !== undefined) && (this.mutatingValues.length >= val + 1)) {
          this.currentValue = this.mutatingValues[val];
        }
      }
    }
  };
</script>

<style lang="scss">
  .picker-slot {
    font-size: 18px;
    overflow: hidden;
    position: relative;
    max-height: 100%;
  }

  .picker-slot.picker-slot-left {
    text-align: left;
  }

  .picker-slot.picker-slot-center {
    text-align: center;
  }

  .picker-slot.picker-slot-right {
    text-align: right;
  }

  .picker-slot-wrapper {
    height: 108px;
  }

  .picker-slot-wrapper {
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    backface-visibility: hidden;
  }

  .picker-slot-wrapper.dragging,
  .picker-slot-wrapper.dragging .picker-item {
    transition-duration: 0s;
  }

  .picker-item {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ababab;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    transition-duration: 0.3s;
    backface-visibility: hidden;
  }

  .picker-slot-absolute .picker-item {
    position: absolute;
  }

  .picker-item.picker-selected {
    color: #000;
    transform: translate3d(0, 0, 0) rotateX(0);
  }
</style>