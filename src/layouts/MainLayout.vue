<template>
  <q-layout view="lHr lpr lFr">
    <div class="q-pa-md">
      <q-header elevated class="bg-purple">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
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
      </q-header>
    </div>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
    </q-drawer>

    <q-page-container>
      <router-view />
      <Text />
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
      autoplay: ref(false),
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
