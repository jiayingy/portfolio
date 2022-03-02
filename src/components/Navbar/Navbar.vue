<template>
  <div class="navbar">
    <ul class="web">
      <li
        v-for="link in links"
        :key="link.key"
        :class="{ active: link.key === currRoute }"
        :style="getBgColor(link.key)"
      >
        <router-link :to="{ name: link.key }">
          {{ link.value }}
        </router-link>
      </li>
    </ul>
    <div class="mobile">
      <div class="hamburger-nav">
        <HamburgerNav />
      </div>
    </div>
  </div>
</template>

<script>
import styleVariables from '@/assets/styles/exports.scss';
import HamburgerNav from './HamburgerNav';

const NAVBAR_KEY_1 = 'home';
const NAVBAR_KEY_2 = 'projects';
const NAVBAR_KEY_3 = 'art';
const NAVBAR_KEY_4 = 'contact';

const COLORS = {
  [NAVBAR_KEY_1]: styleVariables.colorPurple,
  [NAVBAR_KEY_2]: styleVariables.colorRed,
  [NAVBAR_KEY_3]: styleVariables.colorGreen,
  [NAVBAR_KEY_4]: styleVariables.colorBlue,
};

export default {
  components: {
    HamburgerNav,
  },
  data() {
    return {
      links: [
        { key: NAVBAR_KEY_1, value: 'home' },
        { key: NAVBAR_KEY_2, value: 'projects' },
        { key: NAVBAR_KEY_3, value: 'art' },
        { key: NAVBAR_KEY_4, value: 'contact' },
      ],
    };
  },
  computed: {
    currRoute() {
      return this.$route.name;
    },
  },
  methods: {
    getBgColor(linkKey) {
      const isActive = this.currRoute === linkKey;

      if (isActive) {
        return {
          '--backgroundColor': COLORS[linkKey],
        };
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
}

.mobile,
.web {
  height: 100%;
}

ul {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;

  li {
    list-style: none;
    position: relative;
    font-weight: normal;
    transition: font-weight 0.2s;

    &::after {
      width: 0;
      transition: width 2s;
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: inherit;
    }

    &.active {
      font-weight: bold;
      color: var(--backgroundColor);

      &::after {
        height: 8px;
        content: '';
        position: absolute;
        background-color: var(--backgroundColor);
        opacity: 0.4;
        width: 110%;
        left: 10px;
        bottom: 0;
        z-index: -1;
      }
    }
  }
}

.hamburger-nav {
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  justify-content: flex-end;
}
</style>
