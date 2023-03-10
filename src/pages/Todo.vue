<template>
  <q-page class="q-pa-lg">
    <div square class="row q-pa-lg add-task">
      <q-input
        @keyup.enter="addTodo"
        class="col"
        bg-color="white"
        placeholder="Add new task"
        outlined
        v-model="titleTodo"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
      <q-btn @click="addTodo" color="green" icon="send" label="Add" />
    </div>
    <q-list separator bordered>
      <transition-group name="list" tag="div">
        <q-item
          @click="task.done[0] = !task.done[0]"
          v-for="(task, index) in tasks.values"
          :key="task.title"
          clickable
          :class="{ 'done bg-green-2': task.done[0] }"
          class="flex justify-between"
          v-ripple
        >
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
      </transition-group>

      <q-ajax-bar
        ref="bar"
        position="bottom"
        color="green"
        size="10px"
        skip-hijack
      />

      <div v-if="!tasks.values.length" class="absolute-center">
        <q-icon name="done" size="150px" color="red" />
        <div class="text-h3">No tasks</div>
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { useQuasar } from "quasar";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default defineComponent({
  name: "Todo",
  setup() {
    const $q = useQuasar();
    const titleTodo = ref("");
    const tasks = reactive([]);
    const bar = ref(null);

    const fetching = async () => {
      const productCollectionRef = collection(db, "todos");
      try {
        await onSnapshot(productCollectionRef, (querySnapshot) => {
          let fbTodos = [];
          querySnapshot.forEach((doc) => {
            const todo = {
              id: doc.id,
              title: doc.data().title,
              done: doc.data().done,
            };
            fbTodos.push(todo);
          });
          tasks.values = fbTodos;
        });
      } catch (e) {
        console.log("Ошибка: ", e);
      }
    };
    fetching();

    $q.notify.registerType("my-notif", {
      icon: "announcement",
      progress: true,
      color: "brown",
      textColor: "white",
      classes: "glossy",
    });

    const addTodo = () => {
      console.log(bar.value);
      bar.value.start();
      setTimeout(() => {
        if (titleTodo.value) {
          addDoc(collection(db, "todos"), {
            title: titleTodo.value,
            done: [false],
          });
        } else {
          $q.notify({
            type: "negative",
            message: "Input is empty",
          });
        }
        titleTodo.value = "";
        bar.value.stop();
      }, 1000);
    };

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
      bar,
      addTodo,
      tasks,
      options: [{ label: "", value: "", color: "primary" }],
      deleteTask,
      titleTodo,
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
