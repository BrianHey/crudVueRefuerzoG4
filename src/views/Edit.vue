<template>
  <div class="container px-5">
    <b-form-group label="Nombre:">
      <b-form-input v-model="instrument.name"></b-form-input>
    </b-form-group>

    <b-form-group label="Categoria:">
      <b-form-input v-model="instrument.category"></b-form-input>
    </b-form-group>

    <b-form-group label="Precio:">
      <b-form-input v-model="instrument.price"></b-form-input>
    </b-form-group>

    <b-form-group label="Color:">
      <b-form-input v-model="instrument.color"></b-form-input>
    </b-form-group>
    <b-button class="mx-2" type="submit" variant="primary" @click="editProduct"
      >Editar</b-button
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Edicion",
  props: ["id"],

  methods: {
    editProduct() {
      const { id } = this.getIntrumentByIdComponent;
      const instrument = this.instrument;
      axios
        .put(
          `https://us-central1-crud-vue-firebase-3af18.cloudfunctions.net/instrument/instrument/${id}`,
          instrument
        )
        .then((resultado) => {
          const { data } = resultado;
          console.log(data);
          this.$router.push("/");
        });
    },
  },

  computed: {
    ...mapGetters(["getInstrumentById"]),
    getIntrumentByIdComponent() {
      const id = this.id;
      return this.getInstrumentById(id);
    },

    instrument() {
      return this.getIntrumentByIdComponent.data;
    },
  },
};
</script>
