/* ==========================================================================
   ANAMNESE PSICOLÓGICA — Celma Soares da Cruz Luz | CRP 21/01103
   Aplicação 100% local: nenhuma resposta é enviada a servidores externos.
   ========================================================================== */

'use strict';

const PROFESSIONAL = { nome: 'Celma Soares da Cruz Luz', crp: '21/01103' };
const STORAGE_KEY = 'anamnese_celma_v1';

/* --------------------------------------------------------------------------
   SCHEMA DO FORMULÁRIO
   Cada seção contém campos com tipos: text | textarea | date | select | tel
                                       | radio | checkbox
   Campo condicional: showIf: { field: 'id', equals: 'valor' }  (radio/select)
                       showIf: { field: 'id', includes: 'valor' } (checkbox)
   Opção com texto livre: otherOption: 'Outro' (rótulo exato da opção)
   -------------------------------------------------------------------------- */
const SCHEMA = [
  {
    id: 's1', title: 'Identificação',
    fields: [
      { id: 'nome', label: 'Nome', type: 'text', required: true },
      { id: 'dataNascimento', label: 'Data de nascimento', type: 'date' },
      { id: 'idade', label: 'Idade', type: 'text' },
      { id: 'sexo', label: 'Sexo', type: 'select', options: ['Feminino', 'Masculino', 'Outro', 'Prefere não informar'] },
      { id: 'escolaridade', label: 'Escolaridade', type: 'text' },
      { id: 'escola', label: 'Escola', type: 'text' },
      { id: 'responsavel', label: 'Responsável', type: 'text' },
      { id: 'grauParentesco', label: 'Grau de parentesco', type: 'text' },
      { id: 'telefone', label: 'Telefone', type: 'tel' },
      { id: 'dataEntrevista', label: 'Data da entrevista', type: 'date', defaultToday: true },
      { id: 'profissional', label: 'Profissional', type: 'text', fixed: PROFESSIONAL.nome },
      { id: 'crp', label: 'CRP', type: 'text', fixed: PROFESSIONAL.crp },
    ]
  },
  {
    id: 's2', title: 'Motivo da procura / Demanda',
    fields: [
      { id: 'solicitante', label: 'Quem solicitou a avaliação?', type: 'radio',
        options: ['Família', 'Escola', 'Médico', 'Psicólogo', 'Fonoaudiólogo', 'Terapeuta ocupacional', 'Outro'],
        otherOption: 'Outro' },
      { id: 'preocupacaoAtual', label: 'Qual é a principal preocupação atualmente?', type: 'textarea' },
      { id: 'hipoteseDiagnostica', label: 'Existe alguma hipótese diagnóstica prévia?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'hipoteseQual', label: 'Qual?', type: 'text', showIf: { field: 'hipoteseDiagnostica', equals: 'Sim' } },
      { id: 'hipoteseQuem', label: 'Quem levantou essa hipótese?', type: 'text', showIf: { field: 'hipoteseDiagnostica', equals: 'Sim' } },
      { id: 'comportamentosDificuldades', label: 'Quais comportamentos ou dificuldades levaram à investigação?', type: 'textarea' },
      { id: 'quandoPercebidas', label: 'Quando essas dificuldades foram percebidas pela primeira vez?', type: 'textarea' },
      { id: 'mudancaRecente', label: 'Houve mudança ou piora recente?', type: 'textarea' },
    ]
  },
  {
    id: 's3', title: 'Gestação e nascimento',
    fields: [
      { id: 'gestacaoPlanejada', label: 'A gestação foi planejada?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'intercorrenciasGestacao', label: 'Houve intercorrências durante a gestação?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'intercorrenciasQuais', label: 'Quais?', type: 'checkbox',
        options: ['Infecção', 'Sangramento', 'Queda ou trauma', 'Uso de medicamentos', 'Outras'],
        otherOption: 'Outras',
        showIf: { field: 'intercorrenciasGestacao', equals: 'Sim' } },
      { id: 'intercorrenciasObs', label: 'Observações', type: 'textarea',
        showIf: { field: 'intercorrenciasGestacao', equals: 'Sim' } },
      { id: 'idadeGestacional', label: 'Idade gestacional no nascimento', type: 'text', placeholder: 'ex.: 38 semanas' },
      { id: 'tipoParto', label: 'Tipo de parto', type: 'radio', options: ['Normal', 'Cesárea', 'Fórceps', 'Outro'], otherOption: 'Outro' },
      { id: 'pesoNascer', label: 'Peso ao nascer', type: 'text', placeholder: 'ex.: 3,200 kg' },
      { id: 'utiNeonatal', label: 'Necessitou de UTI neonatal?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'cuidadosEspeciais', label: 'Necessitou de oxigênio ou outros cuidados especiais?', type: 'textarea',
        showIf: { field: 'utiNeonatal', equals: 'Sim' } },
    ]
  },
  {
    id: 's4', title: 'Desenvolvimento infantil',
    fields: [
      { id: 'headerMotor', label: 'Desenvolvimento motor', type: 'group-label' },
      { id: 'sustentarCabeca', label: 'Quando começou a sustentar a cabeça?', type: 'radio',
        options: ['Antes de 3 meses', '3–4 meses', 'Após 4 meses', 'Não informado'] },
      { id: 'sentarSemApoio', label: 'Quando sentou sem apoio?', type: 'radio',
        options: ['Antes de 6 meses', '6–8 meses', 'Após 8 meses', 'Não informado'] },
      { id: 'engatinhar', label: 'Quando engatinhou?', type: 'radio',
        options: ['Antes de 8 meses', '8–10 meses', 'Após 10 meses', 'Não chegou a engatinhar', 'Não informado'] },
      { id: 'andar', label: 'Quando começou a andar?', type: 'radio',
        options: ['Antes de 12 meses', '12–18 meses', 'Após 18 meses', 'Não informado'] },
      { id: 'dificuldadesMotoras', label: 'Havia dificuldades motoras ou quedas frequentes?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'dificuldadesMotorasDesc', label: 'Descrever', type: 'textarea',
        showIf: { field: 'dificuldadesMotoras', equals: 'Sim' } },

      { id: 'headerLinguagem', label: 'Linguagem', type: 'group-label' },
      { id: 'primeirasPalavras', label: 'Quando falou as primeiras palavras?', type: 'radio',
        options: ['Antes de 12 meses', '12–18 meses', 'Após 18 meses', 'Não informado'] },
      { id: 'primeirasFrases', label: 'Quando começou a formar frases?', type: 'radio',
        options: ['Antes de 24 meses', '24–36 meses', 'Após 36 meses', 'Não informado'] },
      { id: 'atrasoFala', label: 'Houve atraso na fala?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'acompanhamentoFono', label: 'Já realizou acompanhamento fonoaudiológico?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'comunicacaoAtual', label: 'Como é a comunicação atualmente?', type: 'textarea' },
      { id: 'dificuldadeCompreenderExpressar', label: 'Apresenta dificuldade para compreender ou expressar o que sente?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'dificuldadeCompreenderExpressarDesc', label: 'Descrever', type: 'textarea',
        showIf: { field: 'dificuldadeCompreenderExpressar', equals: 'Sim' } },
    ]
  },
  {
    id: 's5', title: 'Autonomia',
    fields: [
      { id: 'alimentarSozinho', label: 'Alimentar-se sozinho', type: 'radio', options: ['Sim', 'Não', 'Com ajuda'] },
      { id: 'vestirSe', label: 'Vestir-se', type: 'radio', options: ['Sim', 'Não', 'Com ajuda'] },
      { id: 'tomarBanho', label: 'Tomar banho', type: 'radio', options: ['Sim', 'Não', 'Com ajuda'] },
      { id: 'escovarDentes', label: 'Escovar os dentes', type: 'radio', options: ['Sim', 'Não', 'Com ajuda'] },
      { id: 'organizarObjetos', label: 'Organizar seus objetos', type: 'radio', options: ['Sim', 'Não', 'Com ajuda'] },
      { id: 'realizarTarefasSimples', label: 'Realizar tarefas simples', type: 'radio', options: ['Sim', 'Não', 'Com ajuda'] },
      { id: 'dependenciaExcessiva', label: 'Existe dependência excessiva dos adultos?', type: 'textarea' },
    ]
  },
  {
    id: 's6', title: 'Comunicação e interação social',
    fields: [
      { id: 'comunicacaoFamiliares', label: 'Como a criança se comunica com familiares?', type: 'textarea' },
      { id: 'interacaoOutrasCriancas', label: 'Como interage com outras crianças?', type: 'checkbox',
        options: [
          'Interação adequada',
          'Demonstra dificuldade para iniciar interação',
          'Demonstra dificuldade para manter interação',
          'Prefere brincar sozinho',
          'Interage predominantemente com pessoas conhecidas',
          'Apresenta conflitos frequentes',
          'Outro'
        ], otherOption: 'Outro' },
      { id: 'interacaoObs', label: 'Observações', type: 'textarea' },
      { id: 'temAmigos', label: 'Tem amigos?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'iniciarConversaBrincadeira', label: 'Consegue iniciar uma conversa ou brincadeira?', type: 'radio', options: ['Sim', 'Não', 'Parcialmente'] },
      { id: 'manterConversa', label: 'Consegue manter uma conversa?', type: 'radio', options: ['Sim', 'Não', 'Parcialmente'] },
      { id: 'interesseSentimentosOutros', label: 'Demonstra interesse pelo que outras pessoas estão sentindo?', type: 'radio', options: ['Sim', 'Não', 'Parcialmente'] },
      { id: 'compartilhaInteresses', label: 'Compartilha interesses, objetos ou descobertas?', type: 'radio', options: ['Sim', 'Não', 'Parcialmente'] },
      { id: 'compreendeBrincadeirasSociais', label: 'Compreende brincadeiras sociais e regras implícitas?', type: 'radio', options: ['Sim', 'Não', 'Parcialmente'] },
      { id: 'dificuldadeIroniaFigurado', label: 'Apresenta dificuldade para compreender ironia, brincadeiras, duplo sentido ou linguagem figurada?', type: 'radio', options: ['Não', 'Sim'] },
    ]
  },
  {
    id: 's7', title: 'Características associadas ao TEA',
    fields: [
      { id: 'headerFlex', label: 'Flexibilidade e mudanças', type: 'group-label' },
      { id: 'reacaoMudancaRotina', label: 'Como reage quando ocorre mudança na rotina?', type: 'textarea' },
      { id: 'necessidadeMesmaManeira', label: 'Tem necessidade de fazer determinadas coisas sempre da mesma maneira?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'sofrimentoMudancasInesperadas', label: 'Apresenta sofrimento diante de mudanças inesperadas?', type: 'radio', options: ['Não', 'Sim'] },

      { id: 'headerInteresses', label: 'Interesses', type: 'group-label' },
      { id: 'interessesIntensosEspecificos', label: 'Possui interesses muito intensos ou específicos?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'interessesDesc', label: 'Descrever', type: 'textarea',
        showIf: { field: 'interessesIntensosEspecificos', equals: 'Sim' } },
      { id: 'falaRepetidamenteAssunto', label: 'Fala repetidamente sobre determinado assunto?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'dificuldadeMudarAtividade', label: 'Apresenta dificuldade em mudar de atividade?', type: 'radio', options: ['Não', 'Sim'] },

      { id: 'headerRepetitivos', label: 'Comportamentos repetitivos', type: 'group-label' },
      { id: 'comportamentosRepetitivos', label: 'Comportamentos observados', type: 'checkbox',
        options: ['Balança o corpo', 'Bate as mãos', 'Gira objetos', 'Repete palavras ou frases', 'Organiza objetos', 'Repete movimentos', 'Outros'],
        otherOption: 'Outros' },
      { id: 'comportamentosRepetitivosDesc', label: 'Descrever', type: 'textarea' },
    ]
  },
];

const TOTAL_STEPS = SCHEMA.length + 2; // + revisão + assinatura

/* --------------------------------------------------------------------------
   ESTADO
   -------------------------------------------------------------------------- */
let state = {
  answers: {},
  signature: null,
  step: 0, // 0..SCHEMA.length-1 = seções; SCHEMA.length = revisão; +1 = assinatura
};

const app = document.getElementById('app');
let saveTimer = null;

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      showSavedIndicator();
    } catch (e) {
      // localStorage indisponível (ex.: modo privado) — segue sem travar a UX
    }
  }, 250);
}

function clearStorage() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

function showSavedIndicator() {
  const el = document.querySelector('.navbar__save');
  if (!el) return;
  el.textContent = '✓ Salvo automaticamente';
  el.style.opacity = '1';
  clearTimeout(showSavedIndicator._t);
  showSavedIndicator._t = setTimeout(() => { if (el) el.style.opacity = '0'; }, 1400);
}

function setAnswer(id, value) {
  state.answers[id] = value;
  persist();
}

function getAnswer(id) {
  return state.answers[id];
}

/* --------------------------------------------------------------------------
   CONDICIONAIS
   -------------------------------------------------------------------------- */
function isVisible(field) {
  if (!field.showIf) return true;
  const dep = getAnswer(field.showIf.field);
  if (field.showIf.equals !== undefined) return dep === field.showIf.equals;
  if (field.showIf.includes !== undefined) return Array.isArray(dep) && dep.includes(field.showIf.includes);
  return true;
}

/* --------------------------------------------------------------------------
   RENDER — helpers de DOM
   -------------------------------------------------------------------------- */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function clearApp() { app.innerHTML = ''; }

/* --------------------------------------------------------------------------
   TELA INICIAL
   -------------------------------------------------------------------------- */
function renderCover() {
  clearApp();
  const existing = loadFromStorage();

  const cover = el('div', { class: 'cover' }, [
    el('img', { class: 'cover__logo', src: 'icons/logo-horizontal.svg', alt: 'Celma Soares da Cruz Luz — Psicóloga' }),
    el('div', {}, [
      el('h1', { class: 'cover__title' }, 'Anamnese Psicológica'),
      el('div', { class: 'cover__subtitle' }, 'Investigação de Neurodivergências'),
    ]),
    el('div', { class: 'cover__tags' }, 'TEA · TDAH · TOD · Transtornos da Aprendizagem · Desenvolvimento · Aspectos Emocionais e Comportamentais'),
    el('button', {
      class: 'btn btn--primary', onclick: () => {
        if (existing && existing.answers && Object.keys(existing.answers).length) {
          renderResumeModal();
        } else {
          startNewAnamnesis();
        }
      }
    }, 'INICIAR ANAMNESE'),
    el('div', { class: 'cover__privacy' }, 'As informações preenchidas permanecem neste dispositivo e não são enviadas para um banco de dados externo por esta aplicação.'),
    el('div', { class: 'cover__footer' }, [
      el('strong', {}, PROFESSIONAL.nome), document.createElement('br'),
      document.createTextNode('Psicóloga — CRP ' + PROFESSIONAL.crp)
    ]),
  ]);
  app.appendChild(cover);
}

function renderResumeModal() {
  const overlay = el('div', { class: 'overlay' }, [
    el('div', { class: 'modal' }, [
      el('h3', {}, 'Anamnese em andamento'),
      el('p', {}, 'Encontramos uma anamnese em andamento. Deseja continuar de onde parou?'),
      el('div', { class: 'modal__actions' }, [
        el('button', {
          class: 'btn btn--primary', onclick: () => {
            const saved = loadFromStorage();
            state = Object.assign({ answers: {}, signature: null, step: 0 }, saved);
            overlay.remove();
            renderStep();
          }
        }, 'CONTINUAR'),
        el('button', {
          class: 'btn btn--ghost', onclick: () => {
            overlay.remove();
            startNewAnamnesis();
          }
        }, 'NOVA ANAMNESE'),
      ])
    ])
  ]);
  document.body.appendChild(overlay);
}

function startNewAnamnesis() {
  state = { answers: {}, signature: null, step: 0 };
  state.answers.profissional = PROFESSIONAL.nome;
  state.answers.crp = PROFESSIONAL.crp;
  state.answers.dataEntrevista = todayISO();
  clearStorage();
  persist();
  renderStep();
}

/* --------------------------------------------------------------------------
   APPBAR (cabeçalho fixo com progresso)
   -------------------------------------------------------------------------- */
function renderAppbar(stepIndex) {
  const pct = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);
  const label = stepIndex < SCHEMA.length
    ? `Etapa ${stepIndex + 1} de ${TOTAL_STEPS}`
    : (stepIndex === SCHEMA.length ? `Etapa ${stepIndex + 1} de ${TOTAL_STEPS} · Revisão` : `Etapa ${stepIndex + 1} de ${TOTAL_STEPS} · Assinatura`);

  return el('div', { class: 'appbar' }, [
    el('div', { class: 'appbar__row' }, [
      el('img', { class: 'appbar__logo', src: 'icons/logo-icon.svg', alt: '' }),
      el('div', { class: 'appbar__step' }, label),
    ]),
    el('div', { class: 'progress' }, [ el('div', { class: 'progress__bar', style: `width:${pct}%` }) ]),
    el('div', { class: 'appbar__pct' }, `${pct}% concluído`),
  ]);
}

/* --------------------------------------------------------------------------
   CAMPOS — renderização por tipo
   -------------------------------------------------------------------------- */
function renderField(field) {
  if (!isVisible(field)) return null;

  if (field.type === 'group-label') {
    return el('div', { class: 'field' }, [ el('h3', { style: 'font-size:1.05rem;color:var(--gold-2);margin-bottom:4px;' }, field.label) ]);
  }

  const wrap = el('div', { class: 'field', id: 'field_' + field.id });
  if (field.type !== 'group-label') {
    const isGroupType = field.type === 'radio' || field.type === 'checkbox';
    const labelAttrs = { class: 'field__label' };
    if (!isGroupType) labelAttrs.for = field.id;
    else labelAttrs.role = 'heading';
    wrap.appendChild(el(isGroupType ? 'div' : 'label', labelAttrs, field.label + (field.required ? ' *' : '')));
  }

  if (field.fixed !== undefined) {
    wrap.appendChild(el('input', { class: 'input', id: field.id, value: field.fixed, disabled: 'disabled' }));
    return wrap;
  }

  if (field.type === 'text' || field.type === 'tel') {
    const input = el('input', {
      class: 'input', id: field.id, type: field.type === 'tel' ? 'tel' : 'text',
      placeholder: field.placeholder || '', value: getAnswer(field.id) || '',
      oninput: (e) => setAnswer(field.id, e.target.value)
    });
    wrap.appendChild(input);
  }

  else if (field.type === 'date') {
    const val = getAnswer(field.id) || (field.defaultToday ? todayISO() : '');
    if (field.defaultToday && !getAnswer(field.id)) setAnswer(field.id, val);
    wrap.appendChild(el('input', {
      class: 'input', id: field.id, type: 'date', value: val,
      onchange: (e) => setAnswer(field.id, e.target.value)
    }));
  }

  else if (field.type === 'textarea') {
    wrap.appendChild(el('textarea', {
      class: 'textarea', id: field.id, rows: '2', placeholder: field.placeholder || '',
      oninput: (e) => { setAnswer(field.id, e.target.value); autoGrow(e.target); }
    }, getAnswer(field.id) || ''));
    setTimeout(() => { const t = document.getElementById(field.id); if (t) autoGrow(t); }, 0);
  }

  else if (field.type === 'select') {
    const sel = el('select', {
      class: 'select', id: field.id,
      onchange: (e) => setAnswer(field.id, e.target.value)
    });
    sel.appendChild(el('option', { value: '' }, 'Selecione'));
    field.options.forEach(opt => {
      const optEl = el('option', { value: opt }, opt);
      if (getAnswer(field.id) === opt) optEl.selected = true;
      sel.appendChild(optEl);
    });
    wrap.appendChild(sel);
  }

  else if (field.type === 'radio') {
    const group = el('div', { class: 'choice-group' + (field.options.length <= 3 ? ' choice-group--row' : '') });
    field.options.forEach((opt, i) => {
      const checked = getAnswer(field.id) === opt;
      const choiceEl = el('label', { class: 'choice' + (checked ? ' choice--checked' : '') }, [
        el('input', {
          type: 'radio', name: field.id, value: opt, ...(checked ? { checked: 'checked' } : {}),
          onchange: () => { setAnswer(field.id, opt); renderCurrentStep(); }
        }),
        el('span', {}, opt)
      ]);
      group.appendChild(choiceEl);
    });
    wrap.appendChild(group);

    if (field.otherOption && getAnswer(field.id) === field.otherOption) {
      wrap.appendChild(renderOtherText(field));
    }
  }

  else if (field.type === 'checkbox') {
    const current = Array.isArray(getAnswer(field.id)) ? getAnswer(field.id) : [];
    const group = el('div', { class: 'choice-group' });
    field.options.forEach(opt => {
      const checked = current.includes(opt);
      const choiceEl = el('label', { class: 'choice' + (checked ? ' choice--checked' : '') }, [
        el('input', {
          type: 'checkbox', value: opt, ...(checked ? { checked: 'checked' } : {}),
          onchange: (e) => {
            let arr = Array.isArray(getAnswer(field.id)) ? getAnswer(field.id).slice() : [];
            if (e.target.checked) { if (!arr.includes(opt)) arr.push(opt); }
            else { arr = arr.filter(v => v !== opt); }
            setAnswer(field.id, arr);
            renderCurrentStep();
          }
        }),
        el('span', {}, opt)
      ]);
      group.appendChild(choiceEl);
    });
    wrap.appendChild(group);

    if (field.otherOption && current.includes(field.otherOption)) {
      wrap.appendChild(renderOtherText(field));
    }
  }

  return wrap;
}

function renderOtherText(field) {
  const key = field.id + '__outro';
  return el('div', { class: 'conditional' }, [
    el('input', {
      class: 'input', placeholder: 'Especifique', value: getAnswer(key) || '',
      oninput: (e) => setAnswer(key, e.target.value)
    })
  ]);
}

function autoGrow(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight) + 'px';
}

/* --------------------------------------------------------------------------
   RENDER — SEÇÃO DO FORMULÁRIO
   -------------------------------------------------------------------------- */
let currentSectionIndex = 0;

function renderSectionStep(sectionIdx) {
  currentSectionIndex = sectionIdx;
  clearApp();
  const section = SCHEMA[sectionIdx];

  const sectionEl = el('div', { class: 'section' }, [
    el('div', { class: 'section__eyebrow' }, `Seção ${sectionIdx + 1} de ${SCHEMA.length}`),
    el('h2', { class: 'section__title' }, section.title),
  ]);

  section.fields.forEach(f => {
    const rendered = renderField(f);
    if (rendered) sectionEl.appendChild(rendered);
  });

  app.appendChild(renderAppbar(sectionIdx));
  app.appendChild(sectionEl);
  app.appendChild(renderNavbar({
    showBack: sectionIdx > 0,
    onBack: () => { state.step = sectionIdx - 1; persist(); renderStep(); },
    nextLabel: sectionIdx === SCHEMA.length - 1 ? 'REVISAR ANAMNESE' : 'CONTINUAR →',
    onNext: () => {
      const missing = validateSection(section);
      if (missing) { flashInvalid(missing); return; }
      state.step = sectionIdx + 1; persist(); renderStep();
      window.scrollTo(0, 0);
    }
  }));
  window.scrollTo(0, 0);
}

function validateSection(section) {
  for (const f of section.fields) {
    if (f.required && isVisible(f)) {
      const v = getAnswer(f.id);
      if (!v || (typeof v === 'string' && !v.trim())) return f.id;
    }
  }
  return null;
}

function flashInvalid(fieldId) {
  const node = document.getElementById('field_' + fieldId);
  if (!node) return;
  node.style.outline = '2px solid var(--danger)';
  node.style.borderRadius = '10px';
  node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => { node.style.outline = 'none'; }, 1600);
}

function renderNavbar({ showBack, onBack, nextLabel, onNext }) {
  const bar = el('div', { class: 'navbar' }, [
    el('div', { class: 'navbar__save' }, ''),
  ]);
  if (showBack) bar.appendChild(el('button', { class: 'btn btn--ghost', onclick: onBack }, '← VOLTAR'));
  bar.appendChild(el('button', { class: 'btn btn--primary', onclick: onNext }, nextLabel));
  return bar;
}

function renderCurrentStep() {
  // Re-renderiza mantendo o scroll (usado após alterar radio/checkbox que revela condicionais)
  const scrollY = window.scrollY;
  renderStep();
  window.scrollTo(0, scrollY);
}

/* --------------------------------------------------------------------------
   REVISÃO
   -------------------------------------------------------------------------- */
function fieldAnswerText(field) {
  const v = getAnswer(field.id);
  if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) return '—';
  if (Array.isArray(v)) {
    let text = v.join(', ');
    if (field.otherOption && v.includes(field.otherOption) && getAnswer(field.id + '__outro')) {
      text += ` (${getAnswer(field.id + '__outro')})`;
    }
    return text;
  }
  if (field.otherOption && v === field.otherOption && getAnswer(field.id + '__outro')) {
    return `${v} (${getAnswer(field.id + '__outro')})`;
  }
  return String(v);
}

function renderReviewStep() {
  clearApp();
  const wrap = el('div', { class: 'section' }, [
    el('div', { class: 'section__eyebrow' }, 'Revisão final'),
    el('h2', { class: 'section__title' }, 'Revisar Anamnese'),
  ]);

  SCHEMA.forEach((section, idx) => {
    const block = el('div', { class: 'review-block' });
    block.appendChild(el('div', { class: 'review-block__head' }, [
      el('h3', {}, `${idx + 1}. ${section.title}`),
      el('button', { class: 'btn--text', onclick: () => { state.step = idx; persist(); renderStep(); } }, 'EDITAR'),
    ]));
    section.fields.forEach(f => {
      if (f.type === 'group-label') return;
      if (!isVisible(f)) return;
      block.appendChild(el('div', { class: 'review-row' }, [
        el('div', { class: 'review-row__q' }, f.label),
        el('div', { class: 'review-row__a' }, fieldAnswerText(f)),
      ]));
    });
    wrap.appendChild(block);
  });

  app.appendChild(renderAppbar(SCHEMA.length));
  app.appendChild(wrap);
  app.appendChild(renderNavbar({
    showBack: true,
    onBack: () => { state.step = SCHEMA.length - 1; persist(); renderStep(); },
    nextLabel: 'CONTINUAR PARA ASSINATURA →',
    onNext: () => { state.step = SCHEMA.length + 1; persist(); renderStep(); window.scrollTo(0,0); }
  }));
  window.scrollTo(0, 0);
}

/* --------------------------------------------------------------------------
   ASSINATURA (canvas)
   -------------------------------------------------------------------------- */
let sigCtx = null, sigDrawing = false, sigHasStroke = false;

function renderSignatureStep() {
  clearApp();
  const wrap = el('div', { class: 'section' }, [
    el('div', { class: 'section__eyebrow' }, 'Última etapa'),
    el('h2', { class: 'section__title' }, 'Assinatura da Profissional'),
    el('p', { style: 'color:var(--text-soft);font-size:0.9rem;margin-bottom:14px;' }, 'Assine dentro da área abaixo'),
  ]);

  const sigWrap = el('div', { class: 'signature-wrap' });
  const canvas = el('canvas', { id: 'signaturePad' });
  sigWrap.appendChild(canvas);
  wrap.appendChild(sigWrap);
  wrap.appendChild(el('div', { style: 'margin-top:12px;display:flex;gap:10px;' }, [
    el('button', { class: 'btn btn--ghost', onclick: clearSignature }, 'LIMPAR'),
  ]));
  wrap.appendChild(el('p', { style: 'color:var(--text-soft);font-size:0.78rem;margin-top:16px;' },
    'Esta é uma captura de assinatura manuscrita feita diretamente na interface, e não uma assinatura digital certificada.'));

  app.appendChild(renderAppbar(SCHEMA.length + 1));
  app.appendChild(wrap);
  app.appendChild(renderNavbar({
    showBack: true,
    onBack: () => { state.step = SCHEMA.length; persist(); renderStep(); },
    nextLabel: 'GERAR PDF',
    onNext: () => {
      if (!sigHasStroke && !state.signature) { flashSignatureRequired(); return; }
      if (sigHasStroke) state.signature = canvas.toDataURL('image/png');
      persist();
      generatePDF();
    }
  }));

  setTimeout(() => setupSignaturePad(canvas), 0);
}

function flashSignatureRequired() {
  const wrap = document.querySelector('.signature-wrap');
  if (!wrap) return;
  wrap.style.borderColor = 'var(--danger)';
  showToast('Por favor, assine antes de gerar o PDF.');
  setTimeout(() => { wrap.style.borderColor = 'var(--gold)'; }, 1600);
}

function setupSignaturePad(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  sigCtx = canvas.getContext('2d');
  sigCtx.scale(ratio, ratio);
  sigCtx.lineWidth = 2.2;
  sigCtx.lineCap = 'round';
  sigCtx.strokeStyle = '#3E3A35';

  if (state.signature) {
    const img = new Image();
    img.onload = () => sigCtx.drawImage(img, 0, 0, rect.width, rect.height);
    img.src = state.signature;
    sigHasStroke = true;
  }

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  }
  function start(e) { e.preventDefault(); sigDrawing = true; sigHasStroke = true; const p = pos(e); sigCtx.beginPath(); sigCtx.moveTo(p.x, p.y); }
  function move(e) { if (!sigDrawing) return; e.preventDefault(); const p = pos(e); sigCtx.lineTo(p.x, p.y); sigCtx.stroke(); }
  function end(e) { sigDrawing = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  canvas.addEventListener('touchend', end);
}

function clearSignature() {
  const canvas = document.getElementById('signaturePad');
  if (!canvas || !sigCtx) return;
  sigCtx.clearRect(0, 0, canvas.width, canvas.height);
  sigHasStroke = false;
  state.signature = null;
  persist();
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = el('div', { class: 'toast' }); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('toast--visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('toast--visible'), 2600);
}

/* --------------------------------------------------------------------------
   TELA DE SUCESSO
   -------------------------------------------------------------------------- */
function renderSuccessStep(pdfBlobUrl, fileName) {
  clearApp();
  const box = el('div', { class: 'success' }, [
    el('div', { class: 'success__icon' }, '✓'),
    el('h2', {}, 'PDF gerado com sucesso'),
    el('p', { style: 'color:var(--text-soft);max-width:340px;' }, 'A anamnese foi convertida em um documento profissional pronto para arquivamento.'),
    el('a', { class: 'btn btn--primary', href: pdfBlobUrl, download: fileName, style: 'text-decoration:none;display:inline-flex;align-items:center;justify-content:center;' }, 'BAIXAR PDF'),
  ]);

  if (navigator.share) {
    box.appendChild(el('button', {
      class: 'btn btn--ghost', onclick: async () => {
        try {
          const resp = await fetch(pdfBlobUrl);
          const blob = await resp.blob();
          const file = new File([blob], fileName, { type: 'application/pdf' });
          await navigator.share({ files: [file], title: 'Anamnese Psicológica' });
        } catch (e) { /* usuário cancelou ou share indisponível para arquivos */ }
      }
    }, 'COMPARTILHAR'));
  }

  box.appendChild(el('button', {
    class: 'btn--text', onclick: () => renderNewAnamneseConfirm()
  }, 'NOVA ANAMNESE'));

  app.appendChild(box);
}

function renderNewAnamneseConfirm() {
  const overlay = el('div', { class: 'overlay' }, [
    el('div', { class: 'modal' }, [
      el('h3', {}, 'Nova anamnese'),
      el('p', {}, 'Deseja realmente iniciar uma nova anamnese? O preenchimento atual será removido deste dispositivo.'),
      el('div', { class: 'modal__actions' }, [
        el('button', { class: 'btn btn--primary', onclick: () => { overlay.remove(); startNewAnamnesis(); } }, 'NOVA ANAMNESE'),
        el('button', { class: 'btn btn--ghost', onclick: () => overlay.remove() }, 'CANCELAR'),
      ])
    ])
  ]);
  document.body.appendChild(overlay);
}

/* --------------------------------------------------------------------------
   ROTEADOR DE ETAPAS
   -------------------------------------------------------------------------- */
function renderStep() {
  const step = state.step || 0;
  if (step < SCHEMA.length) renderSectionStep(step);
  else if (step === SCHEMA.length) renderReviewStep();
  else renderSignatureStep();
}

/* --------------------------------------------------------------------------
   INICIALIZAÇÃO
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCover();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
