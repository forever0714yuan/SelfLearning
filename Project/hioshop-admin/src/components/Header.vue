<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  font-size: 22px;
  padding-left: 15px;
  height: 100%;
}
</style>
