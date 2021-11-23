<template>
  <div class="mt-5">
    <h1>
      User <br /> automation
    </h1>
    <p>
      Now you can create automataions and automatically perform actions in regards to your users.
    </p>
    <p>
      You can decide when users should be 
      <strong>activated, deactivated, anonymized and deleted</strong>.
    </p>
    <p>
      <button
        class="btn btn-success"
        @click.prevent="showFormNewEvent"
      >
        + Create rule
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    msg: String
  },
  methods: {
    showFormNewEvent() {
      this.$emit('show-form-new-event');
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
