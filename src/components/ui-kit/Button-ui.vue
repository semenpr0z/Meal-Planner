<script>

export default {
  data() {
    return {
      firstName: '',
      email: '',
      password: '',
      age: '',
      sex: ''
    };
  },
  props: {
    text: {
      type: String,
      default: 'Найти блюдо'
    },
    method: {
      type: String,
      required: false
    },
    color: {
      type: String,
      default: 'orange'
    },
    shortButton: {
      type: Boolean,
      default: false
    },
    wideButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showNextStep() {
      this.$emit('showNextStep');
    },
    moreRecipes() {
      this.$emit('moreRecipes');
    },
    auth() {
      this.$emit('auth')
    },
    determinate() {
      if (this.method === 'showNextStep') {
        this.showNextStep()
      }
      else if (this.method === 'moreRecipes') {
        this.moreRecipes()
      }
      else if (this.method === 'auth') {
        this.auth()
      }
    }
  },
  emits: ['showNextStep', 'moreRecipes', 'auth']
}

</script>

<template>
  <button
    :class="['button-ui', { 'button-ui_orange': color == 'orange' }, { 'button-ui_gray': color == 'gray' }, { 'button-ui_red': color == 'red' }, { 'button-ui_green': color == 'green' }, 'button', { 'button-ui_short': shortButton == true }, { 'button-ui_wide': wideButton == true }]"
    @keydown.enter="determinate" tabindex="0">{{ text }}</button>
</template>

<style lang="scss" scoped>
.button-ui {
  padding: 14px 58px;
  border-radius: 30px;
  transition: 0.5s;

  &_orange {
    background: var(--Orange);
    border: 3px solid var(--Orange);
    color: var(--White);

    &:hover {
      color: var(--Orange);
      border: 3px solid var(--Orange);
      background: transparent;
    }

    &:active {
      background: var(--Light_orange);
      border: 3px solid var(--Orange);
    }
  }

  &_gray {
    background: var(--Gray);
    border: 3px solid var(--Gray);
    color: var(--Black);

    &:hover {
      color: var(--Black);
      border: 3px solid var(--Black);
      background: transparent;
    }

    &:active {
      background: var(--Text_gray);
      border: 3px solid var(--Text_gray);
      color: var(--White);
    }
  }

  &_red {
    background-color: #D02500;
    border: 3px solid #D02500;
    color: var(--White);

    &:hover {
      color: #D02500;
      border: 3px solid #D02500;
      background: transparent;
    }

    &:active {
      background: var(--Light_orange);
      border: 3px solid var(--Orange);
    }
  }

  &_green{
    background-color: #00B012;
    border: 3px solid #00B012;
    color: var(--White);

    &:hover {
      color: #00B012;
      border: 3px solid #00B012;
      background: transparent;
    }

    &:active {
      background: var(--Light_orange);
      border: 3px solid var(--Orange);
    }
  }

  &_short {
    padding: 14px 24px;
  }

  &_wide{
    width: 100%;
  }

  &:hover {
    cursor: pointer;
  }
}

@media (max-width: 840px) {
  .button-ui {
    &_short{
      padding: 14px 16px;
    }
  }
}
</style>