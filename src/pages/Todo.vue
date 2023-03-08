<template>
  <q-page class="q-pa-lg">
    <q-list separator bordered>
      <q-item
        @click="task.done = !task.done"
        v-for="task in tasks"
        :key="task.title"
      >
        <div class="q-pa-md">
          <q-option-group
            :options="options"
            type="checkbox"
            v-model="task.done"
          />
        </div>
        <q-item-section>
          {{ task.title }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

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
    return {
      tasks,
      group: ref([]),
      options: [{ label: "Friend request", value: "friend", color: "primary" }],
    };
  },
});
</script>
