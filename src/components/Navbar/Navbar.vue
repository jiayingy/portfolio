<template>
  <div class="navbar">
    <ul class="web">
      <li
        v-for="link in links"
        :key="link.key"
        :style="{'--backgroundColor': link.color}"
        @mouseover="setActive($event)"
        @mouseout="clearActive($event)"
      >
        <a v-bind:href="link.href" target="_blank">{{ link.value }}</a>
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

const NAVBAR_KEY_1 = 'github';
const NAVBAR_KEY_2 = 'resume';

export default {
  components: {
    HamburgerNav,
  },
  data() {
    return {
      links: [
        {
          key: NAVBAR_KEY_1, value: 'github', href: 'https://github.com/jiayingy', color: styleVariables.colorPurple,
        },
        {
          key: NAVBAR_KEY_2, value: 'resume', href: 'https://www.jiayingy.space/assets/files/LekJiaYing-resume.pdf', color: styleVariables.colorOrange,
        },
      ],
    };
  },
  methods: {
    setActive(event) {
      const el = event.target.parentNode;
      if (!el.classList.contains('active')) {
        el.classList.add('active');
      }
    },
    clearActive(event) {
      const el = event.target.parentNode;
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  top: 0;
  height: 200px;
  width: 100%;
  z-index: 999;
  // box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);
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
    transition: font-size 0.2s;

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
      font-size: 20px;
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
  justify-content: center;
}
</style>
