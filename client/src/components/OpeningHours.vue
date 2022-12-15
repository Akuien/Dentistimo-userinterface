<template>
    <div>
        <p id="monday">Monday: {{this.openingHours.monday || "Closed"}}</p>
        <p id="tuesday">Tuesday: {{this.openingHours.tuesday || "Closed"}}</p>
        <p id="wednesday">Wednesday: {{this.openingHours.wednesday || "Closed"}}</p>
        <p id="thursday">Thursday: {{this.openingHours.thursday || "Closed"}}</p>
        <p id="friday">Friday: {{ this.openingHours.friday || "Closed"}}</p>
        <p id="saturday">Saturday: {{this.openingHours.saturday || "Closed"}}</p>
        <p id="sunday">Sunday: {{this.openingHours.sunday || "Closed"}}</p>
    </div>
</template>

<script>
export default {
  name: 'OpeningHours',
  props: ['openingHours'],
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>
