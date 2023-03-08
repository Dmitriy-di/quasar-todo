<template>
  <q-layout class="q-layout" view="lHr lpr lFr">
    <div class="q-pa-md header">
      <q-header elevated class="">
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
        <q-img class="header-image absolute-top"></q-img>
        <div class="time q-mb-lg q-mt-lg q-px-xl">{{ toToday }}</div>
      </q-header>
    </div>

    <q-drawer
      class="list q-pt-lg"
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
        class="scroll-area"
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="style" />
            </q-item-section>
            <q-item-section> Todo </q-item-section>
          </q-item>

          <q-item to="/about" exact clickable v-ripple>
            <q-item-section avatar>
              <span class="material-icons"> info </span>
            </q-item-section>
            <q-item-section> About </q-item-section>
          </q-item>

          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <span class="material-icons"> help </span>
            </q-item-section>
            <q-item-section> Help </q-item-section>
          </q-item>

          <q-item to="/contacts" exact clickable v-ripple>
            <q-item-section avatar>
              <span class="material-icons"> call </span>
            </q-item-section>
            <q-item-section> Contacts </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../statics/avatar.jpg" />
          </q-avatar>
          <div class="text-weight-bold">Eugene</div>
          <div>Eugene@mail.ru</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container class="layout">
      <div class="layout__img">
        <q-img src="../statics/bg_todo.jpg" />
      </div>
      <router-view v-slot="{ Component }">
        <transition name="bounce">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import Text from "../components/Text.vue";
import { defineComponent, onMounted, ref } from "vue";
import { date } from "quasar";
import { gsap } from "gsap";

export default defineComponent({
  name: "MainLayout",
  components: {
    Text,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    // onMounted(() => {
    //   gsap.to(el.current, {
    //     // полный поворот
    //     rotation: "+=360",
    //   });
    // });
    return {
      slide: ref(1),
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

.material-icons {
  font-size: 30px;
  color: black;
}
.layout {
  background-color: $primary;
  position: relative;
  height: 100vh;
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.list {
  background-color: $primary;
}
.absolute-top {
  height: 169px !important;
  background-color: $primary;
}
.header {
  background-color: $primary;
}
.scroll-area {
  background-color: $primary;
}
.q-img {
  width: 100%;
  height: 100%;
}
.q-layout {
  color: white;
  font-size: 18px;
}
.q-router-link--exact-active {
  color: red;
}
.q-drawer {
  background-color: $primary !important;
}
//======TRANSITION=======
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
