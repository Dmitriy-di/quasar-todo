<template>
  <q-layout view="lHr lpr lFr">
    <div class="q-pa-md">
      <q-header elevated class="bg-purple">
        <q-toolbar>
          <q-btn
            @click="drawer = !drawer"
            flat
            round
            dense
            icon="menu"
            class="q-mr-sm"
          />
          <q-space></q-space>
          <q-btn flat round dense icon="search" class="q-mr-xs" />
          <q-btn flat round dense icon="group_add" />
        </q-toolbar>
        <q-toolbar inset>
          <q-toolbar-title> <strong>Quasar</strong> Framework </q-toolbar-title>
        </q-toolbar>
        <q-img
          src="../statics/infinity.jpg"
          class="header-image absolute-top"
        ></q-img>
        <div class="time q-mb-lg q-mt-lg q-px-xl">{{ toToday }}</div>
      </q-header>
    </div>

    <q-drawer v-model="drawer" show-if-above :width="370" :breakpoint="800">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../statics/avatar.jpg" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <EssentialLink
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Text from "../components/Text.vue";
import { defineComponent, ref } from "vue";
import { date } from "quasar";

export default defineComponent({
  name: "MainLayout",
  components: {
    Text,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      slide: ref(1),
      EssentialLink,
      Text,
      drawer: ref(false),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  computed: {
    toToday() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY: dddd");
      return formattedString;
    },
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
}

.header-image {
  height: 100%;
  width: 100%;
  z-index: -1;
}
.bg-purple {
  background-color: yellow !important;
}
</style>
