const campos = {
  inputNome: "previewNome",
  inputCargo: "previewCargo"
};

let contadorCursos = 1;

function atualizarTexto(inputId, previewId, valorPadrao = "") {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (!input || !preview) return;

  function atualizar() {
    const valor = input.value.trim();
    preview.textContent = valor || valorPadrao;
  }

  input.addEventListener("input", atualizar);
  atualizar();
}

function atualizarContato() {
  const telefone = document.getElementById("inputTelefone");
  const email = document.getElementById("inputEmail");
  const cidade = document.getElementById("inputCidade");
  const previewContato = document.getElementById("previewContato");

  function renderizarContato() {
    const partes = [
      telefone.value.trim(),
      email.value.trim(),
      cidade.value.trim()
    ].filter(Boolean);

    previewContato.textContent = partes.length
      ? partes.join(" | ")
      : "Telefone | E-mail | Cidade";
  }

  telefone.addEventListener("input", renderizarContato);
  email.addEventListener("input", renderizarContato);
  cidade.addEventListener("input", renderizarContato);

  renderizarContato();
}

function atualizarResumo() {
  const input = document.getElementById("inputResumo");
  const preview = document.getElementById("previewResumo");
  const secao = document.getElementById("secaoResumo");

  function atualizar() {
    const valor = input.value.trim();
    secao.style.display = valor ? "block" : "none";
    preview.textContent = valor;
  }

  input.addEventListener("input", atualizar);
  atualizar();
}

function atualizarExperiencia() {
  const empresa = document.getElementById("inputEmpresa1");
  const cargo = document.getElementById("inputCargoExp1");
  const periodo = document.getElementById("inputPeriodo1");
  const desc = document.getElementById("inputDesc1");

  const previewTitulo = document.getElementById("previewCargoExp1");
  const previewPeriodo = document.getElementById("previewPeriodo1");
  const previewDesc = document.getElementById("previewDesc1");
  const secao = document.getElementById("secaoExperiencia");

  function atualizar() {
    const empresaValor = empresa.value.trim();
    const cargoValor = cargo.value.trim();
    const periodoValor = periodo.value.trim();
    const descValor = desc.value.trim();

    const temConteudo =
      empresaValor || cargoValor || periodoValor || descValor;

    secao.style.display = temConteudo ? "block" : "none";

    if (cargoValor && empresaValor) {
      previewTitulo.textContent = `${cargoValor} - ${empresaValor}`;
    } else {
      previewTitulo.textContent = cargoValor || empresaValor || "";
    }

    previewPeriodo.textContent = periodoValor;
    previewDesc.textContent = descValor;
  }

  [empresa, cargo, periodo, desc].forEach((campo) => {
    campo.addEventListener("input", atualizar);
  });

  atualizar();
}

function atualizarFormacao() {
  const curso = document.getElementById("inputCursoFormacao");
  const inst = document.getElementById("inputInstituicao");
  const periodo = document.getElementById("inputPeriodoFormacao");

  const previewCurso = document.getElementById("previewCursoFormacao");
  const previewLinha = document.getElementById("previewInstituicaoPeriodo");
  const secao = document.getElementById("secaoFormacao");

  function atualizar() {
    const cursoValor = curso.value.trim();
    const instValor = inst.value.trim();
    const periodoValor = periodo.value.trim();

    const temConteudo = cursoValor || instValor || periodoValor;

    secao.style.display = temConteudo ? "block" : "none";

    previewCurso.textContent = cursoValor;

    const partes = [instValor, periodoValor].filter(Boolean);
    previewLinha.textContent = partes.join(" - ");
  }

  [curso, inst, periodo].forEach((campo) => {
    campo.addEventListener("input", atualizar);
  });

  atualizar();
}

function renderizarCursosPreview() {
  const secao = document.getElementById("secaoCursos");
  const previewListaCursos = document.getElementById("previewListaCursos");

  const nomes = document.querySelectorAll(".input-nome-curso");
  const instituicoes = document.querySelectorAll(".input-instituicao-curso");
  const anos = document.querySelectorAll(".input-ano-curso");

  const cursos = [];

  for (let i = 0; i < nomes.length; i++) {
    const nome = nomes[i].value.trim();
    const instituicao = instituicoes[i].value.trim();
    const ano = anos[i].value.trim();

    if (nome || instituicao || ano) {
      cursos.push({ nome, instituicao, ano });
    }
  }

  secao.style.display = cursos.length ? "block" : "none";
  previewListaCursos.innerHTML = "";

  cursos.forEach((curso) => {
    const div = document.createElement("div");
    div.className = "item-curso-preview";

    const h3 = document.createElement("h3");
    h3.textContent = curso.nome || "Curso";

    const p = document.createElement("p");
    const partes = [curso.instituicao, curso.ano].filter(Boolean);
    p.textContent = partes.join(" - ");

    div.appendChild(h3);
    div.appendChild(p);
    previewListaCursos.appendChild(div);
  });
}

function vincularEventosCursos() {
  const inputsCursos = document.querySelectorAll(
    ".input-nome-curso, .input-instituicao-curso, .input-ano-curso"
  );

  inputsCursos.forEach((input) => {
    input.removeEventListener("input", renderizarCursosPreview);
    input.addEventListener("input", renderizarCursosPreview);
  });

  renderizarCursosPreview();
}

function adicionarCurso() {
  contadorCursos++;

  const container = document.getElementById("listaCursosForm");

  const bloco = document.createElement("div");
  bloco.className = "curso-form-item";
  bloco.innerHTML = `
    <div class="grupo">
      <label for="inputNomeCurso${contadorCursos}">Nome do curso</label>
      <input type="text" id="inputNomeCurso${contadorCursos}" class="input-nome-curso" />
    </div>

    <div class="grupo">
      <label for="inputInstituicaoCurso${contadorCursos}">Instituição</label>
      <input type="text" id="inputInstituicaoCurso${contadorCursos}" class="input-instituicao-curso" />
    </div>

    <div class="grupo">
      <label for="inputAnoCurso${contadorCursos}">Ano / Período</label>
      <input type="text" id="inputAnoCurso${contadorCursos}" class="input-ano-curso" />
    </div>
  `;

  container.appendChild(bloco);
  vincularEventosCursos();
}

function atualizarHabilidades() {
  const input = document.getElementById("inputHabilidades");
  const lista = document.getElementById("previewHabilidades");
  const secao = document.getElementById("secaoHabilidades");

  function atualizar() {
    const habilidades = input.value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    secao.style.display = habilidades.length > 0 ? "block" : "none";

    lista.innerHTML = "";

    habilidades.forEach((habilidade) => {
      const li = document.createElement("li");
      li.textContent = habilidade;
      lista.appendChild(li);
    });
  }

  input.addEventListener("input", atualizar);
  atualizar();
}

function trocarModelo() {
  const selectModelo = document.getElementById("selectModelo");
  const curriculo = document.getElementById("curriculoPreview");

  function atualizar() {
    curriculo.classList.remove("modelo-classico", "modelo-moderno");

    if (selectModelo.value === "moderno") {
      curriculo.classList.add("modelo-moderno");
    } else {
      curriculo.classList.add("modelo-classico");
    }
  }

  selectModelo.addEventListener("change", atualizar);
  atualizar();
}

function limparFormulario() {
  document.querySelectorAll("input, textarea").forEach((el) => {
    el.value = "";
    el.dispatchEvent(new Event("input"));
  });

  const cursos = document.querySelectorAll(".curso-form-item");
  cursos.forEach((curso, index) => {
    if (index > 0) curso.remove();
  });

  contadorCursos = 1;
  vincularEventosCursos();

  const selectModelo = document.getElementById("selectModelo");
  if (selectModelo) {
    selectModelo.value = "classico";
    selectModelo.dispatchEvent(new Event("change"));
  }
}

function imprimirCurriculo() {
  window.print();
}

Object.entries(campos).forEach(([inputId, previewId]) => {
  const padroes = {
    previewNome: "Seu Nome",
    previewCargo: "Cargo / Objetivo"
  };

  atualizarTexto(inputId, previewId, padroes[previewId] || "");
});

atualizarContato();
atualizarResumo();
atualizarExperiencia();
atualizarFormacao();
vincularEventosCursos();
atualizarHabilidades();
trocarModelo();

document
  .getElementById("btnAdicionarCurso")
  .addEventListener("click", adicionarCurso);

document
  .getElementById("btnLimpar")
  .addEventListener("click", limparFormulario);

document
  .getElementById("btnImprimir")
  .addEventListener("click", imprimirCurriculo);