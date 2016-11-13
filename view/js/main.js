function verificarToken(){
    sessionStorage.getItem("authorization") == null || sessionStorage.getItem("trampaki-user") != '1' ? window.location.assign("https://trampaki-tunnes.c9users.io/login") : null;
}