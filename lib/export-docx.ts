import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
} from "docx";

// APA 7th Edition table styling constants
const APA_FONT = "Times New Roman";
const APA_FONT_SIZE = 24; // half-points, so 24 = 12pt
const APA_SMALL_SIZE = 20; // 10pt for notes

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const THICK_BORDER = { style: BorderStyle.SINGLE, size: 2, color: "000000" };
const THIN_BORDER = { style: BorderStyle.SINGLE, size: 1, color: "000000" };

function apaBorders(position: "header" | "body" | "last") {
  return {
    top: position === "header" ? THICK_BORDER : NO_BORDER,
    bottom:
      position === "header"
        ? THICK_BORDER
        : position === "last"
          ? THICK_BORDER
          : THIN_BORDER,
    left: NO_BORDER,
    right: NO_BORDER,
  };
}

function apaText(text: string, options?: { bold?: boolean; italic?: boolean; size?: number }) {
  return new TextRun({
    text,
    font: APA_FONT,
    size: options?.size ?? APA_FONT_SIZE,
    bold: options?.bold,
    italics: options?.italic,
  });
}

function apaCell(
  texts: { text: string; italic?: boolean; bold?: boolean }[],
  position: "header" | "body" | "last",
  alignment?: (typeof AlignmentType)[keyof typeof AlignmentType]
) {
  return new TableCell({
    borders: apaBorders(position),
    children: [
      new Paragraph({
        alignment: alignment ?? AlignmentType.LEFT,
        children: texts.map((t) =>
          apaText(t.text, { bold: t.bold, italic: t.italic })
        ),
      }),
    ],
  });
}

function formatP(p: number): string {
  if (p < 0.001) return "< .001";
  return p.toFixed(3).replace(/^0/, "");
}

// --- T-Test Export ---

interface TTestExportData {
  type: "independent" | "paired";
  t: number;
  df: number;
  pValue: number;
  cohensD: number;
  ci95: [number, number];
  meanDiff: number;
  group1Stats: { mean: number; sd: number; n: number };
  group2Stats: { mean: number; sd: number; n: number };
}

export function exportTTest(data: TTestExportData): Promise<Blob> {
  const isIndependent = data.type === "independent";
  const title = isIndependent
    ? "Independent Samples t-Test Results"
    : "Paired Samples t-Test Results";

  const headerRow = new TableRow({
    children: [
      apaCell([{ text: "Group" }], "header"),
      apaCell([{ text: "N", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "M", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "SD", italic: true }], "header", AlignmentType.CENTER),
    ],
  });

  const group1Row = new TableRow({
    children: [
      apaCell([{ text: isIndependent ? "Group 1" : "Time 1" }], "body"),
      apaCell([{ text: String(data.group1Stats.n) }], "body", AlignmentType.CENTER),
      apaCell([{ text: data.group1Stats.mean.toFixed(2) }], "body", AlignmentType.CENTER),
      apaCell([{ text: data.group1Stats.sd.toFixed(2) }], "body", AlignmentType.CENTER),
    ],
  });

  const group2Row = new TableRow({
    children: [
      apaCell([{ text: isIndependent ? "Group 2" : "Time 2" }], "last"),
      apaCell([{ text: String(data.group2Stats.n) }], "last", AlignmentType.CENTER),
      apaCell([{ text: data.group2Stats.mean.toFixed(2) }], "last", AlignmentType.CENTER),
      apaCell([{ text: data.group2Stats.sd.toFixed(2) }], "last", AlignmentType.CENTER),
    ],
  });

  const dfStr = isIndependent ? data.df.toFixed(2) : String(data.df);

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [apaText("Table 1", { bold: true })],
          }),
          new Paragraph({
            children: [apaText(title, { italic: true })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, group1Row, group2Row],
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              apaText("Note. ", { italic: true, size: APA_SMALL_SIZE }),
              apaText("t", { italic: true, size: APA_SMALL_SIZE }),
              apaText(`(${dfStr}) = ${Math.abs(data.t).toFixed(2)}, `, { size: APA_SMALL_SIZE }),
              apaText("p ", { italic: true, size: APA_SMALL_SIZE }),
              apaText(`${formatP(data.pValue)}, `, { size: APA_SMALL_SIZE }),
              apaText("d ", { italic: true, size: APA_SMALL_SIZE }),
              apaText(`= ${Math.abs(data.cohensD).toFixed(2)}, 95% CI [${data.ci95[0].toFixed(2)}, ${data.ci95[1].toFixed(2)}]`, {
                size: APA_SMALL_SIZE,
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}

// --- ANOVA Export ---

interface AnovaExportData {
  fStatistic: number;
  dfBetween: number;
  dfWithin: number;
  pValue: number;
  etaSquared: number;
  ssBetween: number;
  ssWithin: number;
  ssTotal: number;
  msBetween: number;
  msWithin: number;
  groupStats: { name: string; n: number; mean: number; sd: number }[];
}

export function exportAnova(data: AnovaExportData): Promise<Blob> {
  // ANOVA summary table
  const anovaHeaderRow = new TableRow({
    children: [
      apaCell([{ text: "Source" }], "header"),
      apaCell([{ text: "SS", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "df", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "MS", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "F", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "p", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "\u03B7\u00B2" }], "header", AlignmentType.CENTER),
    ],
  });

  const betweenRow = new TableRow({
    children: [
      apaCell([{ text: "Between groups" }], "body"),
      apaCell([{ text: data.ssBetween.toFixed(2) }], "body", AlignmentType.CENTER),
      apaCell([{ text: String(data.dfBetween) }], "body", AlignmentType.CENTER),
      apaCell([{ text: data.msBetween.toFixed(2) }], "body", AlignmentType.CENTER),
      apaCell([{ text: data.fStatistic.toFixed(2) }], "body", AlignmentType.CENTER),
      apaCell([{ text: formatP(data.pValue) }], "body", AlignmentType.CENTER),
      apaCell([{ text: data.etaSquared.toFixed(2) }], "body", AlignmentType.CENTER),
    ],
  });

  const withinRow = new TableRow({
    children: [
      apaCell([{ text: "Within groups" }], "body"),
      apaCell([{ text: data.ssWithin.toFixed(2) }], "body", AlignmentType.CENTER),
      apaCell([{ text: String(data.dfWithin) }], "body", AlignmentType.CENTER),
      apaCell([{ text: data.msWithin.toFixed(2) }], "body", AlignmentType.CENTER),
      apaCell([{ text: "" }], "body"),
      apaCell([{ text: "" }], "body"),
      apaCell([{ text: "" }], "body"),
    ],
  });

  const totalRow = new TableRow({
    children: [
      apaCell([{ text: "Total" }], "last"),
      apaCell([{ text: data.ssTotal.toFixed(2) }], "last", AlignmentType.CENTER),
      apaCell([{ text: String(data.dfBetween + data.dfWithin) }], "last", AlignmentType.CENTER),
      apaCell([{ text: "" }], "last"),
      apaCell([{ text: "" }], "last"),
      apaCell([{ text: "" }], "last"),
      apaCell([{ text: "" }], "last"),
    ],
  });

  // Descriptive statistics table
  const descHeaderRow = new TableRow({
    children: [
      apaCell([{ text: "Group" }], "header"),
      apaCell([{ text: "N", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "M", italic: true }], "header", AlignmentType.CENTER),
      apaCell([{ text: "SD", italic: true }], "header", AlignmentType.CENTER),
    ],
  });

  const groupRows = data.groupStats.map((g, i) => {
    const isLast = i === data.groupStats.length - 1;
    return new TableRow({
      children: [
        apaCell([{ text: g.name }], isLast ? "last" : "body"),
        apaCell([{ text: String(g.n) }], isLast ? "last" : "body", AlignmentType.CENTER),
        apaCell([{ text: g.mean.toFixed(2) }], isLast ? "last" : "body", AlignmentType.CENTER),
        apaCell([{ text: g.sd.toFixed(2) }], isLast ? "last" : "body", AlignmentType.CENTER),
      ],
    });
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [apaText("Table 1", { bold: true })] }),
          new Paragraph({
            children: [apaText("One-Way Analysis of Variance", { italic: true })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [anovaHeaderRow, betweenRow, withinRow, totalRow],
          }),
          new Paragraph({ spacing: { before: 400 }, children: [] }),
          new Paragraph({ children: [apaText("Table 2", { bold: true })] }),
          new Paragraph({
            children: [apaText("Descriptive Statistics by Group", { italic: true })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [descHeaderRow, ...groupRows],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}

// --- Chi-Square Export ---

interface ChiSquareExportData {
  type: "independence" | "goodness";
  chiSquare: number;
  df: number;
  pValue: number;
  cramersV?: number;
  observed: number[][] | number[];
  expected: number[][] | number[];
  grandTotal?: number;
}

export function exportChiSquare(data: ChiSquareExportData): Promise<Blob> {
  const children: (Paragraph | Table)[] = [];

  children.push(new Paragraph({ children: [apaText("Table 1", { bold: true })] }));

  if (data.type === "independence") {
    const obs = data.observed as number[][];
    const rows = obs.length;
    const cols = obs[0].length;

    children.push(
      new Paragraph({
        children: [apaText("Observed Frequencies", { italic: true })],
        spacing: { after: 200 },
      })
    );

    // Header
    const headerCells = [apaCell([{ text: "" }], "header")];
    for (let j = 0; j < cols; j++) {
      headerCells.push(
        apaCell([{ text: `Col ${j + 1}` }], "header", AlignmentType.CENTER)
      );
    }

    const tableRows = [new TableRow({ children: headerCells })];

    for (let i = 0; i < rows; i++) {
      const isLast = i === rows - 1;
      const cells = [apaCell([{ text: `Row ${i + 1}` }], isLast ? "last" : "body")];
      for (let j = 0; j < cols; j++) {
        cells.push(
          apaCell([{ text: String(obs[i][j]) }], isLast ? "last" : "body", AlignmentType.CENTER)
        );
      }
      tableRows.push(new TableRow({ children: cells }));
    }

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: tableRows,
      })
    );
  }

  // Note with test statistic
  const noteChildren: TextRun[] = [
    apaText("Note. ", { italic: true, size: APA_SMALL_SIZE }),
    apaText("\u03C7\u00B2", { italic: true, size: APA_SMALL_SIZE }),
    apaText(`(${data.df}`, { size: APA_SMALL_SIZE }),
  ];

  if (data.type === "independence" && data.grandTotal) {
    noteChildren.push(
      apaText(`, N = ${data.grandTotal}`, { italic: true, size: APA_SMALL_SIZE })
    );
  }

  noteChildren.push(
    apaText(`) = ${data.chiSquare.toFixed(2)}, `, { size: APA_SMALL_SIZE }),
    apaText("p ", { italic: true, size: APA_SMALL_SIZE }),
    apaText(formatP(data.pValue), { size: APA_SMALL_SIZE })
  );

  if (data.cramersV !== undefined) {
    noteChildren.push(
      apaText(", ", { size: APA_SMALL_SIZE }),
      apaText("V ", { italic: true, size: APA_SMALL_SIZE }),
      apaText(`= ${data.cramersV.toFixed(2)}`, { size: APA_SMALL_SIZE })
    );
  }

  children.push(new Paragraph({ spacing: { before: 200 }, children: noteChildren }));

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBlob(doc);
}

// --- Correlation Export ---

interface CorrelationExportData {
  type: "pearson" | "spearman";
  r: number;
  t: number;
  df: number;
  pValue: number;
  ci95: [number, number];
  n: number;
  r2: number;
}

export function exportCorrelation(data: CorrelationExportData): Promise<Blob> {
  const symbol = data.type === "pearson" ? "r" : "r\u209B";

  const headerRow = new TableRow({
    children: [
      apaCell([{ text: "Statistic" }], "header"),
      apaCell([{ text: "Value" }], "header", AlignmentType.CENTER),
    ],
  });

  const rows = [
    [data.type === "pearson" ? "Pearson r" : "Spearman \u03C1", data.r.toFixed(4)],
    ["R\u00B2", data.r2.toFixed(4)],
    ["t", data.t.toFixed(4)],
    ["df", String(data.df)],
    ["p (two-tailed)", data.pValue < 0.001 ? "< .001" : data.pValue.toFixed(4)],
    ["95% CI", `[${data.ci95[0].toFixed(4)}, ${data.ci95[1].toFixed(4)}]`],
    ["N", String(data.n)],
  ].map(([label, value], i, arr) => {
    const isLast = i === arr.length - 1;
    return new TableRow({
      children: [
        apaCell([{ text: label }], isLast ? "last" : "body"),
        apaCell([{ text: value }], isLast ? "last" : "body", AlignmentType.CENTER),
      ],
    });
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [apaText("Table 1", { bold: true })] }),
          new Paragraph({
            children: [
              apaText(
                `${data.type === "pearson" ? "Pearson" : "Spearman"} Correlation Results`,
                { italic: true }
              ),
            ],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...rows],
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              apaText("Note. ", { italic: true, size: APA_SMALL_SIZE }),
              apaText(symbol, { italic: true, size: APA_SMALL_SIZE }),
              apaText(`(${data.df}) = ${data.r.toFixed(2)}, `, { size: APA_SMALL_SIZE }),
              apaText("p ", { italic: true, size: APA_SMALL_SIZE }),
              apaText(formatP(data.pValue), { size: APA_SMALL_SIZE }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}

// --- Descriptive Export ---

interface DescriptiveExportData {
  n: number;
  mean: number;
  median: number;
  sd: number;
  variance: number;
  se: number;
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
  ci95: [number, number];
}

export function exportDescriptive(data: DescriptiveExportData): Promise<Blob> {
  const headerRow = new TableRow({
    children: [
      apaCell([{ text: "Statistic" }], "header"),
      apaCell([{ text: "Value" }], "header", AlignmentType.CENTER),
    ],
  });

  const stats = [
    ["N", String(data.n)],
    ["M", data.mean.toFixed(4)],
    ["Mdn", data.median.toFixed(4)],
    ["SD", data.sd.toFixed(4)],
    ["Variance", data.variance.toFixed(4)],
    ["SE", data.se.toFixed(4)],
    ["Min", data.min.toFixed(4)],
    ["Max", data.max.toFixed(4)],
    ["Range", data.range.toFixed(4)],
    ["Q1", data.q1.toFixed(4)],
    ["Q3", data.q3.toFixed(4)],
    ["IQR", data.iqr.toFixed(4)],
    ["Skewness", data.skewness.toFixed(4)],
    ["Kurtosis (excess)", data.kurtosis.toFixed(4)],
    ["95% CI", `[${data.ci95[0].toFixed(4)}, ${data.ci95[1].toFixed(4)}]`],
  ];

  const rows = stats.map(([label, value], i) => {
    const isLast = i === stats.length - 1;
    const italicLabels = ["M", "Mdn", "SD", "SE"];
    return new TableRow({
      children: [
        apaCell(
          [{ text: label, italic: italicLabels.includes(label) }],
          isLast ? "last" : "body"
        ),
        apaCell([{ text: value }], isLast ? "last" : "body", AlignmentType.CENTER),
      ],
    });
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ children: [apaText("Table 1", { bold: true })] }),
          new Paragraph({
            children: [apaText("Descriptive Statistics", { italic: true })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...rows],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}

// --- Download helper ---

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
