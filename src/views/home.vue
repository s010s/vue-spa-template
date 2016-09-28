<template>
  <div>
    首屏
    <group>
      <cell title="vux的使用" value="cool"></cell>
    </group>
    <group>
      <calendar :value.sync="value" title="Date Picker"></calendar>
    </group>
  </div>
</template>
<script>

//引入vux组件，详情查看vux各个组件的用法
import Group from 'vux-comp/group'
import Cell from 'vux-comp/cell'
import Calendar from 'vux-comp/calendar'

module.exports = {
  components: {
    Group,
    Cell,
    Calendar
  },
  data: function() {
    return {
      msg: 'aboutMessage',
      title: 'home'
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
