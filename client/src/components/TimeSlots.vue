<template>
  <b-container>
     <h1> Available Time Slots </h1>
   <b-card
    style="max-width: 10rem;"
    class="mb-2"
    >
     <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">8.00-8.30</b-form-radio>
     </b-card>
</b-container>
</template>
