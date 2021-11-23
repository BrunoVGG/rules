<template>
  <div class="hello">
    <NoData
      v-if="!eventsList.length && !showForm"
      @show-form-new-event="showFormNewEvent"
    />

    <div
      v-if="showForm || eventsList.length"
      class="mt-5 container card"
    >
      <RuleForm />
    </div>

    <el-dialog :visible.sync="showFormModal"> </el-dialog>

    <el-dialog
      title="Edit Rule"
      :visible.sync="showFormModal"
      width="80%"
      :before-close="handleCloseModal"
    >
      <RuleForm
        :key="editKey"
        :edit.sync="editModel"
        @on-submit-edit="callUpdateRule"
      />

      <span slot="footer" class="dialog-footer">
        <button
          class="btn btn-outline-secondary"
          @click.prevent="showFormModal = false"
        >
          Cancel
        </button>
        <button class="btn btn-danger" @click.prevent="callRemoveRule">
          Deleted
        </button>
        <button
          type="primary"
          class="btn btn-success"
          @click.prevent="callUpdateRule"
        >
          Confirm
        </button>
      </span>
    </el-dialog>

    <div v-if="eventsList.length" class="mt-4 mb-5 card container">
      <el-table
        ref="multipleTable"
        :key="`RuleTable${eventsList.length}${tableKey}`"
        :data="dataRows"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column property="title" label="Title"> </el-table-column>
        <el-table-column
          property="title"
          label=""
          show-overflow-tooltip
          width="80"
          sortable
        >
          <template slot-scope="scope">
            <div class="form-check form-switch mt-2">
              <input
                class="form-check-input cursor-hand"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                v-model="scope.row.enabled"
                @change="toggleEnabled(scope.row)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          property="title"
          label=""
          show-overflow-tooltip
          width="50"
        >
          <template slot-scope="scope">
            <i
              role="button"
              @click="editEvent(scope.row)"
              class="bi bi-three-dots-vertical cursor-hand"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { cloneDeep } from "lodash";
import NoData from "@/components/Rules/NoData.vue";
import RuleForm from "@/components/Rules/RuleForm.vue";

export default {
  name: "RuleList",
  components: {
    NoData,
    RuleForm,
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapState({
      eventsList: (state) => state.rules.rules,
    }),
    dataRows: {
      get() {
        return this.eventsList;
      },
      set(newValue) {
        console.log("Changed data", newValue);
      },
    },
  },
  data: function () {
    return {
      showFormModal: false,
      showForm: false,
      isBusy: false,
      selected: [],
      multipleSelection: [],
      editModel: null,
      editKey: 0,
      tableKey: 0,
      fields: [
        { key: "selected", label: "", class: "column_select" },
        {
          key: "title",
          label: "Rule Name",
          sortable: true,
          class: "column_title",
        },
        { key: "actions", label: "", class: "column_actions" },
      ],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        {
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson",
          _rowVariant: "danger",
        },
        {
          age: 40,
          first_name: "Thor",
          last_name: "MacDonald",
          _cellVariants: { age: "info", first_name: "warning" },
        },
        { age: 29, first_name: "Dick", last_name: "Dunlap" },
      ],
    };
  },
  methods: {
    handleCloseModal() {
      this.showFormModal = false;
    },
    ...mapActions({
      updateRule: "rules/updateRule",
      removeRule: "rules/removeRule",
    }),
    showFormNewEvent() {
      this.showForm = true;
    },
    onRowSelected(items) {
      this.selected = items;
    },
    editEvent(data) {
      this.editModel = cloneDeep(data);
      this.showFormModal = true;
      this.editKey++;
    },
    closeModal() {
      this.$bvModal.hide("modalFormEdit");
      this.editKey++;
    },
    callUpdateRule() {
      this.updateRule(this.editModel);
      this.tableKey++;
      this.showFormModal = false;

      this.$notify.success({
        title: "Updated",
      });
    },
    toggleEnabled(data) {
      this.updateRule(data);
      this.tableKey++;

      this.$notify.success({
        title: "Updated",
      });
    },
    callRemoveRule() {
      this.showFormModal = false;
      this.removeRule(this.editModel.id);

      this.$notify.warning({
        title: "Deleted",
      });

      this.tableKey++;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped_ lang="scss">
table.b-table[aria-busy="true"] {
  opacity: 0.6;
}

.sr-only {
  display: none;
}

.column_ {
  &select {
    width: 100px;

    .form-check-input:disabled {
      opacity: 1;
    }
  }

  &title {
    text-align: left;
  }

  &actions {
    width: 100px;

    div {
      display: flex;
    }
  }
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.table-active {
  --bs-table-accent-bg: rgb(242, 242, 242);

  &:hover {
    --bs-table-accent-bg: rgb(242, 242, 242);
  }
  &.b-table-row-selected {
    --bs-table-accent-bg: rgb(242, 242, 242);
    background-color: red;
  }
}
</style>
