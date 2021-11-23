<template>
  <form
    v-if="show"
    class="form row"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <div class="title-area">
      <strong
        v-if="!showTitleInput"
        @click.prevent="setShowTilteInput"
        class="titleLabel"
        :class="{ error: errorTitle }"
      >
        {{ form.title || "Untitled Rule" }}
        <i class="bi bi-pencil cursor-hand"></i>
      </strong>
      <input
        v-show="showTitleInput"
        id="titleInput"
        ref="titleInput"
        v-model.trim="form.title"
        class="form-control"
        placeholder="Title"
        :class="{ error: errorTitle }"
        maxlength="100"
        focus
        @change="updateEdit"
        @blur="leaveTitleInput"
      />
    </div>

    <div class="rule-form-select-area">
      <div class="col-xs-12 col-md-4 col">
        <label class="sr-only label-title" for="inline-form-input-status">
          If user is
        </label>
        <FormSelect
          v-model="form.statusId"
          :options="status"
          placeholder="Choose Status"
          :iconClass="`bi bi-people`"
          :error="errorStatus"
          @change="updateEdit"
        />
      </div>

      <div class="col-xs-12 col-md-4 col">
        <label class="sr-only label-action" for="inline-form-input-action"
          >then</label
        >
        <FormSelect
          v-model="form.actionId"
          :options="actions"
          placeholder="Choose Action"
          :iconClass="`bi bi-gear`"
          :disabled="!form.statusId"
          :error="errorAction"
          @change="updateEdit"
        />
      </div>

      <div class="col-xs-12 col-md-4 col">
        <form-select
          v-model="form.periodId"
          :options="periods"
          placeholder="Choose When"
          :iconClass="`bi bi-alarm`"
          :disabled="!form.actionId"
          :error="errorPeriod"
          @change="updateEdit"
        >
          <input
            v-if="form.actionId"
            v-model.number="form.days"
            type="number"
            max="1000"
            class="input-days"
            :class="{ error: errorDays }"
            @change="updateEdit"
          />
        </form-select>
      </div>
    </div>
    <footer v-if="!edit">
      <button class="btn" :class="submitClass">
        <i class="bi bi-plus"></i> Create
      </button>
    </footer>
  </form>
</template>

<script>
import { cloneDeep } from "lodash";
import { RULES } from "@/config/const.js";
import { mapActions, mapState } from "vuex";
import FormSelect from "@/components/Form/FormSelect.vue";

export default {
  name: "EventsForm",
  components: {
    FormSelect,
  },
  props: {
    edit: {
      type: [Object, null],
      required: false,
      default: null,
    },
  },
  data() {
    return {
      status: RULES.STATUS,
      actions: RULES.ACTIONS,
      periods: RULES.PERIODS,
      show: true,
      showTitleInput: true,
      wasSubmited: false,
      form: {
        id: null,
        title: "",
        statusId: null,
        actionId: null,
        periodId: null,
        days: 1,
        checked: [],
        enabled: true,
        selected: false,
      },
    };
  },
  computed: {
    ...mapState({
      eventsList: (state) => state.rules.events,
    }),
    errorTitle() {
      return this.wasSubmited && !this.form.title ? true : false;
    },
    errorStatus() {
      return this.wasSubmited && !this.form.statusId ? true : false;
    },
    errorAction() {
      return this.wasSubmited && !this.form.actionId ? true : false;
    },
    errorPeriod() {
      return this.wasSubmited && !this.form.periodId ? true : false;
    },
    errorDays() {
      return this.wasSubmited && !this.form.days && !this.form.days > 0
        ? true
        : false;
    },
    hasError() {
      return (
        this.errorTitle ||
        this.errorStatus ||
        this.errorAction ||
        this.errorPeriod ||
        this.errorDays
      );
    },
    allInputsHasValue() {
      return this.form.title &&
        this.form.statusId &&
        this.form.actionId &&
        this.form.periodId &&
        this.form.days &&
        this.form.days > 0
        ? true
        : false;
    },
    submitClass() {
      return this.allInputsHasValue ? "btn-success" : "btn-secondary ghost";
    },
  },
  mounted() {
    this.showTitleInput = false;

    if (this.edit) {
      this.form = cloneDeep(this.edit);
      this.showTitleInput = true;
      this.wasSubmited = true;
    }
  },
  methods: {
    ...mapActions({
      addRule: "rules/addRule",
    }),
    setShowTilteInput() {
      this.showTitleInput = true;
      document.getElementById("titleInput").focus();

      setTimeout(() => {
        this.$refs.titleInput.focus();
      }, 200);
    },
    onSubmit() {
      this.wasSubmited = true;
      this.showTitleInput = false;

      if (this.hasError) {
        return this.$notify.error({
          title: "Form erro",
        });
      }

      this.addRule(cloneDeep(this.form));
      this.onReset();

      this.$notify.success({
        title: "Created",
      });
    },
    updateEdit() {
      if (!this.edit) return;

      this.$emit("update:edit", this.form);
    },
    onReset() {
      this.form = {
        id: new Date().getTime(),
        title: "",
        statusId: null,
        actionId: null,
        periodId: null,
        days: 1,
        checked: [],
        enabled: true,
        selected: false,
      };

      this.wasSubmited = false;
    },
    leaveTitleInput() {
      this.showTitleInput = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.titleLabel {
  text-align: center;
  padding-top: 5px;
  float: left;
}

.selected-area-content {
  border: 1px solid #e2e2e2;
}
.title-area {
  margin-bottom: 2rem;
  max-width: 420px;
}

.input-days {
  border: 1px solid #e2e2e2;
  margin-left: 5px;
  width: 70px;
  text-align: center;
}

.rule-form-select-area {
  display: flex;
  flex-wrap: wrap;
  .col {
    display: flex;
    padding-right: 20px;

    label {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }

    .label-title {
      min-width: 80px;
    }

    .label-action {
      min-width: 40px;
    }
  }
}
</style>