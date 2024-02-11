<template>
  <div class="card" :style="getStyles()">
    <div class="card__wrapper">
      <h2 class="card__contributor-name">{{ props.name }}</h2>
      <div class="card__avatar">
        <img :src="props.profileUrl" />
      </div>
      <span class="card__commits">{{ props.commits }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue'

interface CardComponentProps {
  name: string
  profileUrl: string
  commits: number
}
const props = defineProps<CardComponentProps>()

const getLowCommitsColor = () => {
  const overrideStyles: StyleValue = {}

  if (props.commits >= 230) return overrideStyles
  overrideStyles.backgroundImage = `linear-gradient(to top, #ababab, #ababab)`

  return overrideStyles
}

const getStyles = () => ({
  height: `${props.commits}px`,
  ...getLowCommitsColor()
})
</script>

<style scoped>
.card {
  min-height: 324px;
  border-radius: 21px;
  overflow: hidden;
  box-shadow: 0px 3px 9px 0px #0000004f;
  display: grid;
  place-items: center;
  margin-bottom: var(--masonry-spacing);

  background-color: white;
  background-image: linear-gradient(to top, red, yellow, green, white);
  background-size: 100% 2000px;
  background-repeat: no-repeat;
  background-position: bottom;
  transition: all 0.21s ease;
}

.card:hover {
  transform: scale(1.09);
}

.card__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card__contributor-name {
  margin: 0 auto 21px;
}

.card__avatar {
  width: 90%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 16px 6px #0000008a;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.card__commits {
  font-weight: bold;
  margin-top: 21px;
}
</style>
