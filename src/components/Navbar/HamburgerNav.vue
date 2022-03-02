<template>
  <div
    class="hamburger"
    @click="toggleOpen"
    :class="{ open: isOpen }"
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
$hamburger-line-height: 3px;
$hamburger-line-width: 20px;
$hamburger-height: 15px;
$hamburger-middle-point: ($hamburger-height - $hamburger-line-height) /2;
$hamburger-anim-duration: 0.6s;

@mixin transform-hamburger($translate, $rotate) {
  transform: translateY($translate) rotate($rotate);
}

@mixin open-hamburger($name, $translate, $rotate) {
  @keyframes #{$name} {
    0% {
      transform: none;
    }

    60%, 100% {
      @include transform-hamburger($translate, $rotate);
    }
  }

  animation: $name $hamburger-anim-duration forwards;
}

@mixin close-hamburger($name, $translate, $rotate) {
  @keyframes #{$name} {
    0% {
      @include transform-hamburger($translate, $rotate)
    }

    60%, 100% {
      transform: none;
    }
  }

  animation: $name $hamburger-anim-duration forwards;
}

.hamburger {
  width: $hamburger-line-width;
  height: $hamburger-height;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  div {
    height: $hamburger-line-height;
    width: 100%;
    background-color: $color-black;
    border-radius: 5px;
    transform: none;

    &:first-child {
      @include close-hamburger(closeFirst, $hamburger-middle-point, -45deg);
    }

    &:nth-child(2) {
      opacity: 1;
      transition: opacity $hamburger-anim-duration;
    }

    &:last-child {
      @include close-hamburger(closeLast, -$hamburger-middle-point, 45deg);
    }
  }

  &.open {
    div{
      &:first-child {
        @include open-hamburger(openFirst, $hamburger-middle-point, -45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:last-child {
        @include open-hamburger(openLast, -$hamburger-middle-point, 45deg)
      }
    }
  }
}
</style>
