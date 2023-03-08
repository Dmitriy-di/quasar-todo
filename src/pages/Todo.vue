<template>
  <q-page class="q-pa-lg">
    <q-list separator bordered>
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
            v-model="task.done"
          />
        </div>
        <q-item-section class="item-title">
          {{ task.title }}
        </q-item-section>
        <q-item-section class="items-end" v-if="task.done[0]">
          <q-btn
            @click.stop="deleteTask(task, index)"
            size="15px"
            round
            color="teal"
            icon="delete"
          />
        </q-item-section>
      </q-item>
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
      options: [{ label: "", value: "friend", color: "primary" }],
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
</style>
