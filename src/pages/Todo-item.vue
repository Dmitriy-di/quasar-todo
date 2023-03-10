<template>
  <q-item>
    <div class="q-pa-md">
      <q-option-group
        :options="options"
        type="checkbox"
        v-model="task.done[0]"
      />
    </div>
    <q-item-section class="item-title">
      {{ task.title }}
    </q-item-section>
    <transition name="slide-fade">
      <q-item-section class="items-end" v-if="task.done[0]">
        <q-btn
          @click.stop="deleteTask(task.id)"
          size="15px"
          round
          color="teal"
          icon="delete"
        />
      </q-item-section>
    </transition>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default defineComponent({
  name: "Todo-item",

  props: {
    task: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const $q = useQuasar();

    const deleteTask = (id) => {
      $q.dialog({
        title: "Confirm",
        message: "Do you really want to delete??",
        cancel: true,
      }).onOk(() => {
        deleteDoc(doc(collection(db, "todos"), id));
        $q.notify({
          type: "my-notif",
          message: "Task delete",
        });
      });
    };

    return {
      options: [{ label: "", value: "", color: "primary" }],
      deleteTask,
    };
  },
});
</script>

<style lang="scss" scoped>
.done {
  .item-title {
    text-decoration: line-through;
    color: green;
  }
}
.box {
  height: 60px;
  width: 60px;
  background: red;
}
//======TRANSITION slide-fade=======
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
//======TRANSITION fade=======
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
//========================================
.add-task {
  background-color: $primary;
}
</style>
