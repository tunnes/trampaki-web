function sairDoSistema(){
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('trampaki-user');
    window.location.href = "/";
}