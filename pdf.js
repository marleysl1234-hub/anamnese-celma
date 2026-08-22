'use strict';

/* Converte o SVG da logo em PNG (via canvas) para poder ser embutido no PDF. */
function svgToPng(url, size) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('logo indisponível'); return r.text(); })
      .then(svgText => {
        const svg64 = btoa(unescape(encodeURIComponent(svgText)));
        const image64 = 'data:image/svg+xml;base64,' + svg64;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = size; canvas.height = size;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, size, size);
          ctx.drawImage(img, 0, 0, size, size);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error('falha ao rasterizar logo'));
        img.src = image64;
      })
      .catch(reject);
  });
}

function formatDateBR(iso) {
  if (!iso) return '____/____/________';
  const parts = String(iso).split('-');
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

async function generatePDF() {
  showToast('Gerando PDF...');
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    let logoDataUrl = null;
    try { logoDataUrl = await svgToPng('icons/logo-icon.svg', 128); } catch (e) { logoDataUrl = null; }

    const GOLD = [169, 132, 62];
    const TEXT = [62, 58, 53];
    const SOFT = [117, 110, 100];
    const LINE = [231, 225, 211];

    function addHeader() {
      let textX = margin;
      if (logoDataUrl) {
        doc.addImage(logoDataUrl, 'PNG', margin, 24, 34, 34);
        textX = margin + 44;
      }
      doc.setFont('times', 'bold'); doc.setFontSize(13); doc.setTextColor(...TEXT);
      doc.text(PROFESSIONAL.nome, textX, 40);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(...GOLD);
      doc.text('PSICÓLOGA  ·  CRP ' + PROFESSIONAL.crp, textX, 52);
      doc.setDrawColor(...GOLD); doc.setLineWidth(0.7);
      doc.line(margin, 68, pageWidth - margin, 68);
    }

    function addFooter(pageNum, totalPages) {
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...SOFT);
      doc.text(`${PROFESSIONAL.nome} | Psicóloga | CRP ${PROFESSIONAL.crp}`, margin, pageHeight - 28);
      doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - margin, pageHeight - 28, { align: 'right' });
    }

    function ensureSpace(neededHeight) {
      if (y + neededHeight > pageHeight - 56) {
        doc.addPage();
        addHeader();
        y = 92;
      }
    }

    addHeader();
    y = 92;

    doc.setFont('times', 'bold'); doc.setFontSize(15); doc.setTextColor(...TEXT);
    const titleLines = doc.splitTextToSize('ANAMNESE PSICOLÓGICA PARA INVESTIGAÇÃO DE NEURODIVERGÊNCIAS', contentWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 17 + 4;

    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GOLD);
    const subtitleLines = doc.splitTextToSize(
      'TEA · TDAH · TOD · Transtornos da Aprendizagem · Desenvolvimento · Aspectos Emocionais e Comportamentais',
      contentWidth
    );
    doc.text(subtitleLines, margin, y);
    y += subtitleLines.length * 12 + 20;

    SCHEMA.forEach((section, idx) => {
      ensureSpace(42);
      doc.setFont('times', 'bold'); doc.setFontSize(12); doc.setTextColor(...TEXT);
      doc.text(`${idx + 1}. ${section.title.toUpperCase()}`, margin, y);
      y += 8;
      doc.setDrawColor(...LINE); doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 16;

      section.fields.forEach(f => {
        if (f.type === 'group-label') {
          ensureSpace(20);
          doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...GOLD);
          doc.text(f.label, margin, y);
          y += 15;
          return;
        }
        if (!isVisible(f)) return;

        const answer = fieldAnswerText(f);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...SOFT);
        const qLines = doc.splitTextToSize(f.label, contentWidth);
        ensureSpace(qLines.length * 11.5 + 18);
        doc.text(qLines, margin, y);
        y += qLines.length * 11.5 + 3;

        doc.setFont('helvetica', 'normal'); doc.setFontSize(10.5); doc.setTextColor(...TEXT);
        const aLines = doc.splitTextToSize(answer, contentWidth);
        ensureSpace(aLines.length * 13 + 10);
        doc.text(aLines, margin, y);
        y += aLines.length * 13 + 13;
      });
      y += 4;
    });

    // Bloco de assinatura — evita ficar isolado em página vazia
    ensureSpace(170);
    y += 8;
    doc.setDrawColor(...GOLD); doc.setLineWidth(0.7);
    doc.line(margin, y, pageWidth - margin, y);
    y += 26;

    doc.setFont('times', 'bold'); doc.setFontSize(11); doc.setTextColor(...TEXT);
    doc.text('Assinatura da profissional', margin, y);
    y += 12;

    if (state.signature) {
      doc.addImage(state.signature, 'PNG', margin, y, 180, 70);
    }
    y += 80;

    doc.setDrawColor(...TEXT); doc.setLineWidth(0.6);
    doc.line(margin, y, margin + 220, y);
    y += 15;

    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...TEXT);
    doc.text(PROFESSIONAL.nome, margin, y); y += 13;
    doc.text('Psicóloga — CRP ' + PROFESSIONAL.crp, margin, y); y += 13;
    doc.text('Data: ' + formatDateBR(getAnswer('dataEntrevista')), margin, y);

    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) { doc.setPage(p); addFooter(p, totalPages); }

    const patientName = (getAnswer('nome') || 'Paciente').trim();
    const safeName = patientName
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'Paciente';
    const fileName = `Anamnese_Celma_Soares_${safeName}.pdf`;

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    renderSuccessStep(url, fileName);
  } catch (err) {
    console.error('Erro ao gerar PDF:', err);
    showToast('Não foi possível gerar o PDF. Verifique os dados preenchidos e tente novamente.');
  }
}
