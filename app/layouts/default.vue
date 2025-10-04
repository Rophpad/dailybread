<template>
  <main class="flex flex-col items-center justify- min-h-screen border overflow-x-hidden">
    <section class="h-full w-full lg:w-1/3 flex flex-col items-center justify ">
      <AppHeader  class=" "/>
      <slot />
    </section>
  </main>
  <!-- <link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet"> -->
</template>

<style>
main {
  background-color: #faf9f0;
  background-image: url('/doodle2.svg');
}
</style>
