<template>
  <q-page class="q-pa-lg">
    <q-list separator bordered>
      <transition-group name="list" tag="div">
        <q-item
          @click="task.done[0] = !task.done[0]"
          v-for="(task, index) in tasks"
          :key="task.title"
          clickable
          :class="{ 'done bg-green-2': task.done[0] }"
          class="flex justify-between"
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
                @click.stop="deleteTask(task, index)"
                size="15px"
                round
                color="teal"
                icon="delete"
              />
            </q-item-section>
          </transition>
        </q-item>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script>
import { onMounted, defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Todo",
  setup() {
    const tasks = reactive([
      {
        title: "hello",
        done: [false],
      },
      {
        title: "hello2",
        done: [false],
      },
      {
        title: "hello3",
        done: [false],
      },
    ]);
    const deleteTask = (task, index) => {
      tasks.splice(index, 1);
      console.log(task.done);
    };
    onMounted(() => {
      console.log(tasks);
      console.log(tasks[0]);
      console.log(tasks[0].done[0]);
    });

    return {
      tasks,
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
</style>
