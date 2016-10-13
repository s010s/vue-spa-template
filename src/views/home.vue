<template>
  <div>
    首屏
    <group>
      <cell title="vux的使用" value="cool"></cell>
    </group>
    <group>
      <calendar :value.sync="value" title="Date Picker"></calendar>
    </group>
    <group>
      <switch :title="'双向绑定:值为' + value1" :value.sync="value1"></switch>
      <switch :title="'双向绑定:值为' + value1" :value.sync="value1"></switch>
    </group>
    aa
  </div>
</template>
<script>
//引入vux组件，详情查看vux各个组件的用法
import Group from 'vux-comp/group'
import Cell from 'vux-comp/cell'
import Calendar from 'vux-comp/calendar'
import Switch from 'vux-comp/switch'


module.exports = {
  components: {
    Group,
    Cell,
    Calendar,
    Switch
  },
  data: function() {
    return {
      msg: 'aboutMessage',
      title: 'home',
      value1: true
    }
  },
  route: {
    activate: function(transition) {
      this.$root.$set('header', this.title);
      transition.next();
    }
  },
};
</script>
