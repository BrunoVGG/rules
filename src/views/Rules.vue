<template>
  <div class="rule-area">
    <RuleList />
  </div>
</template>

<script>
import RuleList from "@/components/Rules/RuleList.vue";

export default {
  name: "Rules",
  components: {
    RuleList,
  },
};
</script>

<style scoped lang="scss">
.rule-area {
  padding: 20px;
  width: 100%;

  @media (max-width: 480px) {
    padding: 5px;
  }
}
</style>
