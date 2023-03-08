<template>
  <q-page class="q-pa-lg">
    <q-list separator bordered>
      <q-item
        @click="task.done = !task.done"
        v-for="task in tasks"
        :key="task.title"
        clickable
        :class="{ 'done bg-green-2': task.done }"
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
        <q-item-section class="items-end" v-if="task.done">
          <q-btn size="15px" round color="teal" icon="delete" />
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
      options: [{ label: "", value: "friend", color: "primary" }],
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
