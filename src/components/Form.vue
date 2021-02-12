<template>
  <div>
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

    <b-button
      v-show="mode == 'update'"
      class="mx-2"
      type="submit"
      variant="primary"
      @click="editProduct"
      >Editar</b-button
    >
    <b-button
      v-show="mode == 'create'"
      class="mx-2"
      type="submit"
      variant="primary"
      @click="addProduct"
      >Agregar</b-button
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Formulario",
  props: ["id", "mode"],

  methods: {
    ...mapActions(["update_Product", "new_Product"]),
    editProduct() {
      const id = this.id;
      const instrument = this.instrument;
      this.update_Product({ instrument, id });
      this.$emit("hideModal");
    },

    addProduct() {
      const instrument = this.instrument;
      this.new_Product(instrument);
      const emptyValues = { name: "", color: "", category: "", price: "" };
      this.newInstrument = emptyValues;
    },
  },

  computed: {
    ...mapGetters(["instrumentsData", "getInstrumentById"]),

    instrument() {
      const id = this.id;
      const instrument = { name: "", color: "", category: "", price: "" };
      const mode = this.mode;

      return mode == "update"
        ? Object.assign({}, this.getInstrumentById(id).data)
        : instrument;
    },
  },
};
</script>
