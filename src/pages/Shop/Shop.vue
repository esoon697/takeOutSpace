<template>
  <div class="shopContainer">
    <goback/>
    <p>shop...{{index}} {{koko}}</p>
  </div>
</template>

<script>
import goback from '../../components/goback/goback'
export default {
  props: ['index'],
  components: {goback}
}
</script>

<style>
</style>
