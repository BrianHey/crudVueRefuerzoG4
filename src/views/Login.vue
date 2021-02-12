<template>
  <div class="container px-5">
    <h1>Login de Usuario</h1>
    <hr class="w-50" />
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group label="Your Email:">
        <b-form-input v-model="user.email"></b-form-input>
      </b-form-group>

      <b-form-group label="Your Password:">
        <b-form-input v-model="user.password"></b-form-input>
      </b-form-group>
      <b-button
        class="mx-2"
        type="submit"
        variant="primary"
        @click="loginWithEmailAndPassword"
        >Logearme</b-button
      >
      <b-button class="mx-2" type="reset" variant="danger">Reset</b-button>
    </b-form>

    <h2 class="mt-5">Login with Google</h2>

    <img
      width="150"
      src="http://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png"
      @click="loginGoogle"
    />
  </div>
</template>
<script>
import firebase from "firebase";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    loginWithEmailAndPassword() {
      const { email, password } = this.user;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
          const { user } = result;
          const { email } = user;
          this.SET_USER({ email });
          this.$router.push("/");
        })
        .catch((e) => {
          alert("Algo salió mal :/ ", e.message);
          console.log(e);
        });
    },
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const { user } = result;
          const { email, displayName, photoURL } = user;
          this.SET_USER({ email, displayName, photoURL });
          this.$router.push("/");
        });
    },
    onSubmit(event) {
      event.preventDefault();
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.name = "";
    },
  },
};
</script>
