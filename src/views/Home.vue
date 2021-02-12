<template>
  <div class="container ">
    <h3>Gestion de instrumentos</h3>
    <hr class="w-50" />
    <Formulario mode="create" />

    <b-table :fields="fields" striped hover :items="instrumentsData">
      <template #cell(Acciones)="data">
        <button
          class="btn btn-warning mx-2"
          @click="editProducto(data.item.id)"
        >
          Editar</button
        ><button @click="deleteProducto(data.item.id)" class="btn btn-danger">
          Eliminar
        </button>
      </template>
    </b-table>

    <b-modal v-model="modalShow" hide-footer hide-header>
      <Formulario :id="idEdit" @hideModal="hideModal" mode="update" />
    </b-modal>

    <canvas id="migrafica"></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Formulario from "@/components/Form.vue";
import Graficas from "@/helpers/grafica";

const { showChart } = Graficas;

export default {
  name: "Home",
  components: {
    Formulario,
  },
  mounted() {
    this.get_Instruments();
    const datosInstrumentos = this.instrumentsData
    this.showChart(datosInstrumentos);
  },

  data() {
    return {
      fields: [
        { key: "category", label: "Categoria" },
        { key: "name", label: "Nombre" },
        { key: "price", label: "Precio" },
        { key: "color", label: "Color" },
        "Acciones",
      ],
      ventas: [
        {
          date: new Date(),
          amount: 21345,
        },
        {
          date: new Date(),
          amount: 2342,
        },
        {
          date: new Date(),
          amount: 7654,
        },
      ],
      idEdit: "",
      modalShow: false,
      instrumentModal: { name: "", color: "", category: "", price: "" },
      newInstrument: { name: "", color: "", category: "", price: "" },
    };
  },
  methods: {
    ...mapActions([
      "get_Instruments",
      "new_Product",
      "update_Product",
      "delete_Product",
    ]),

    hideModal() {
      this.modalShow = false;
    },

    editProducto(id) {
      this.idEdit = id;
      this.modalShow = true;
      // this.$router.push({ name: "Editar", params: { id } });
    },

    deleteProducto(id) {
      const decision = confirm(
        "Estás seguro de querer eliminar este producto?"
      );
      decision
        ? (this.delete_Product(id),
          this.$bvToast.toast(`Bien!`, {
            title: "Instrumento eliminado",
            variant: "primary",
          }))
        : false;
    },

    showChart,
  },

  computed: {
    ...mapGetters(["instrumentsData"]),
  },
};
</script>
