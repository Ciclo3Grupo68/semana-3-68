<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="loginUser"
        >
          <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">
            Iniciar de sesión
          </h1>
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Contraseña"
            v-model="login.password"
          />
          <!-- inicio sesion button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Inicio de sesion
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        // console.log(this.login)
        let response = await this.$http.post("/api/auth/signin", this.login);
        console.log(response.data);
        let token = response.data.accessToken;

        localStorage.setItem("jwt", token);
        console.log(token)
        if (token) {
          swal(
            "Login Correcto",
            "Los datos son correctos, Bienvenido!",
            "success"
          );
          this.$router.push("/home");
        }
      } catch (error) {
        swal("Oops!", "Algo salió mal!", "warning");
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>