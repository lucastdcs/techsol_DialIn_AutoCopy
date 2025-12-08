// src/modules/notes/notes-styles.js

// --- CONFIGURAÇÃO DE CORES (Brand Colors) ---
const COLORS = {
  primary: "#1a73e8",
  primaryBg: "#e8f0fe",
  text: "#202124",
  textSub: "#5f6368",
  border: "#dadce0",
  bgInput: "#f1f3f4", // Fundo cinza Google padrão para inputs
  surface: "#ffffff",
  success: "#1e8e3e",
  warning: "#e37400",
  error: "#d93025"
};

// Curva de Animação "Líquida" (Apple Style)
const EASE = "cubic-bezier(0.25, 0.8, 0.25, 1)";

// =========================================================
//           INPUTS & TEXTAREAS (Interativos)
// =========================================================
export const styleInput = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid transparent", // Sem borda inicial (estilo Google)
  backgroundColor: COLORS.bgInput,
  fontSize: "14px",
  color: COLORS.text,
  marginBottom: "16px",
  boxSizing: "border-box",
  fontFamily: "'Google Sans', 'Roboto', sans-serif",
  transition: `all 0.2s ${EASE}`,
  outline: "none",
  // Nota: O foco (border azul) é gerenciado pelo CSS global ou injectStyles
};

export const styleTextarea = {
  ...styleInput,
  minHeight: "100px",
  resize: "vertical",
  lineHeight: "1.5",
};

// =========================================================
//           TEXTOS & LABELS
// =========================================================
export const styleH3 = {
  fontSize: "13px",
  fontWeight: "700",
  color: COLORS.textSub,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0 0 12px 0",
};

export const styleLabel = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: COLORS.text,
  marginBottom: "8px",
  marginTop: "16px",
};

export const styleWarningText = {
  fontSize: "12px",
  color: COLORS.warning,
  marginTop: "6px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontWeight: "500"
};

export const styleHelpLink = {
  fontSize: "12px",
  color: COLORS.primary,
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: "600",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  marginLeft: "auto",
  transition: "opacity 0.2s",
};

// =========================================================
//           LISTAS & CHECKBOXES (Cards)
// =========================================================
export const styleCheckboxLabel = {
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: "500",
  color: COLORS.text,
  cursor: "pointer",
  padding: "10px 12px",
  backgroundColor: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px",
  transition: `all 0.2s ${EASE}`,
  userSelect: "none",
  position: "relative",
  // Hover e Checked devem ser tratados via CSS ou lógica JS para trocar bg
};

export const styleCheckboxInput = {
  width: "18px",
  height: "18px",
  marginRight: "12px",
  cursor: "pointer",
  accentColor: COLORS.primary,
};

// =========================================================
//           BOTÕES (Ações)
// =========================================================
export const styleButtonBase = {
  flex: "1 1 0",
  padding: "12px 0",
  color: "#fff",
  backgroundColor: COLORS.primary,
  border: "none",
  borderRadius: "50px", // Pílula
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "20px",
  boxShadow: "0 2px 6px rgba(26, 115, 232, 0.3)",
  transition: `transform 0.1s ${EASE}, box-shadow 0.2s ${EASE}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

export const styleOptionalBtn = {
  width: "100%",
  padding: "10px",
  background: "#FFFFFF",
  border: `1px dashed ${COLORS.primary}`,
  color: COLORS.primary,
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "13px",
  marginBottom: "12px",
  transition: `background 0.2s ${EASE}`,
};

export const styleLinkButton = {
  background: "transparent",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "20px",
  color: COLORS.primary,
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  margin: "16px auto 0 auto",
  transition: `all 0.2s ${EASE}`,
  fontFamily: "'Google Sans', 'Roboto'",
};

// =========================================================
//           STEPPER (Controles Numéricos)
// =========================================================
export const styleStepper = {
  display: "none", // JS controla display flex
  alignItems: "center",
  gap: "8px",
  marginLeft: "auto",
  backgroundColor: "#f8f9fa",
  padding: "2px",
  borderRadius: "20px",
};

export const styleStepperBtn = {
  width: "24px",
  height: "24px",
  border: "none",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  color: COLORS.text,
  cursor: "pointer",
  padding: "0",
  fontSize: "16px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  transition: "transform 0.1s",
};

export const styleStepperCount = {
  fontSize: "13px",
  fontWeight: "600",
  color: COLORS.primary,
  minWidth: "20px",
  textAlign: "center",
};

// =========================================================
//           SEARCH & CHIPS (Filtros)
// =========================================================
export const styleSearchInput = {
  width: "100%",
  padding: "10px 12px 10px 36px",
  borderRadius: "8px",
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.surface,
  fontSize: "14px",
  marginBottom: "12px",
  boxSizing: "border-box",
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "10px center",
  outline: "none",
  transition: `border-color 0.2s ${EASE}, box-shadow 0.2s ${EASE}`,
};

export const styleChipContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "20px",
};

export const styleChip = {
  padding: "6px 12px",
  borderRadius: "8px", // Soft Square (Google Chips)
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.surface,
  color: COLORS.textSub,
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer",
  transition: `all 0.2s ${EASE}`,
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

export const styleChipSelected = {
  backgroundColor: COLORS.primaryBg,
  color: COLORS.primary,
  borderColor: COLORS.primary,
  fontWeight: "600",
};

export const styleChipRemove = {
  marginLeft: "4px",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: COLORS.primary, // X azul
  backgroundColor: "rgba(255,255,255,0.5)",
  transition: "background 0.2s",
};

// =========================================================
//           CONTAINERS E BLOCOS
// =========================================================
export const styleStepBlock = {
  borderTop: `1px solid ${COLORS.bgInput}`,
  paddingTop: "16px",
  marginTop: "16px",
};

export const styleRadioContainer = {
  display: "flex",
  gap: "16px",
  marginBottom: "16px",
};

export const styleTagSupportContainer = {
  marginTop: "16px",
  marginBottom: "16px",
  padding: "12px 16px",
  backgroundColor: "#fff8e1", // Amarelo suave
  borderRadius: "8px",
  border: "1px solid #ffe082",
  color: "#b06000",
  fontSize: "13px",
  display: "none",
};

// Drawer Lista (Legado/Fallback)
export const styleTaskListContainer = {
  maxHeight: "220px",
  overflowY: "auto",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "8px",
  marginTop: "8px",
  backgroundColor: COLORS.surface,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  display: "none",
};

export const styleTaskListItem = {
  display: "flex",
  alignItems: "center",
  padding: "10px 16px",
  borderBottom: `1px solid ${COLORS.bgInput}`,
  cursor: "pointer",
  fontSize: "13px",
  color: COLORS.text,
  transition: "background 0.1s",
  userSelect: "none",
};