var today = new Date();
var metai = today.getFullYear().toString();
var menuo = today.getMonth() + 1;
var diena = today.getDate();
if (menuo < 10) {
    menuo = '0' + menuo;
}
if (diena < 10) {
    diena = '0' + diena;
}
metai = metai.substring(2, 4);
document.getElementById("Txt_info").value = "DOF/" + metai + menuo + diena;

Txt_acftId_val();