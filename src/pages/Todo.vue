<template>
  <q-page class="flex-column q-pa-lg">
    <q-item v-for="task in tasks" :key="task.title">
      <div class="q-pa-md">
        <q-option-group :options="options" type="checkbox" v-model="group" />
      </div>
    </q-item>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Todo",
  setup() {
    const tasks = [
      {
        title: "hello",
        done: false,
      },
      {
        title: "hello2",
        done: false,
      },
      {
        title: "hello3",
        done: false,
      },
    ];
    return {
      tasks,
      group: ref([]),
      options: [{ label: "Friend request", value: "friend", color: "primary" }],
    };
  },
});
</script>
