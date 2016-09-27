<template>
  <div>
    首屏
    <group>
      <cell title="vue" value="cool"></cell>
    </group>
    <group>
      <calendar :value.sync="value" title="Date Picker"></calendar>
    </group>
  </div>
</template>
<script>
/*import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'*/

import Group from 'vuxc/group'
import Cell from 'vuxc/cell'
import Calendar from 'vuxc/calendar'

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
