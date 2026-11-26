(function () {
  var root = document.documentElement;

  try {
    if (localStorage.getItem("tema") === "dark") root.setAttribute("data-theme", "dark");
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("tema-toggle");
    if (!btn) return;

    function atualizar() {
      var escuro = root.getAttribute("data-theme") === "dark";
      btn.textContent = escuro ? "☀" : "☾";
      btn.setAttribute("aria-label", escuro ? "Voltar ao modo padrão" : "Ativar modo escuro");
    }

    btn.addEventListener("click", function () {
      var escuro = root.getAttribute("data-theme") === "dark";
      if (escuro) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", "dark");
      try { localStorage.setItem("tema", escuro ? "padrao" : "dark"); } catch (e) {}
      atualizar();
    });

    atualizar();
  });
})();


document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formulario");
  if (!form) return;

  var status = document.getElementById("form-status");
  var numero = (form.dataset.whatsapp || "").trim();

  function mostrar(texto, estado) {
    status.textContent = texto;
    status.setAttribute("data-estado", estado || "");
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // campo-isca anti-spam: se um robô preencher, ignora o envio
    if (form.elements["website"] && form.elements["website"].value) return;

    if (!numero || numero.indexOf("SEU_") === 0) {
      mostrar("O formulário ainda não foi configurado: falta o seu número de WhatsApp no index.html.", "erro");
      return;
    }

    var nome = form.elements["nome"].value.trim();
    var email = form.elements["email"].value.trim();
    var mensagem = form.elements["mensagem"].value.trim();

    if (!nome || !email || !mensagem) {
      mostrar("Preencha todos os campos antes de enviar.", "erro");
      return;
    }

    var texto =
      "Olá, meu nome é " + nome + "." +
      "\nE-mail para resposta: " + email +
      "\n\nMensagem:\n" + mensagem;

    var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);

    window.open(url, "_blank", "noopener,noreferrer");

    mostrar("Abrindo o WhatsApp numa nova aba…", "ok");
    form.reset();
  });
});