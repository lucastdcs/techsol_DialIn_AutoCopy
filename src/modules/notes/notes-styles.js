// src/modules/notes/notes-styles.js

// --- CONFIGURAÇÃO DE CORES (Design System Unificado) ---
const COLORS = {
  primary: "#1a73e8",       // Azul Google
  primaryBg: "#e8f0fe",     // Fundo Azul Claro
  text: "#202124",          // Preto Google
  textSub: "#5f6368",       // Cinza Texto
  border: "#dadce0",        // Borda Padrão
  bgInput: "#f8f9fa",       // Fundo Input (Cinza Gelo)
  surface: "#ffffff",       // Branco Puro
  success: "#1e8e3e",       // Verde
  warning: "#e37400",       // Laranja
  error: "#d93025"          // Vermelho
};

// Curva de Animação "Líquida" (Apple Style)
const EASE = "cubic-bezier(0.25, 0.8, 0.25, 1)";

// =========================================================
//           INPUTS & TEXTAREAS (Interativos)
// =========================================================
export const styleInput = {
  width: "100%",
  padding: "12px 14px", // Mais espaço interno (Touch friendly)
  borderRadius: "8px",
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.bgInput,
  fontSize: "14px",
  color: COLORS.text,
  marginBottom: "16px",
  boxSizing: "border-box",
  fontFamily: "'Google Sans', 'Roboto', sans-serif",
  transition: `border-color 0.2s ${EASE}, box-shadow 0.2s ${EASE}, background-color 0.2s`,
  outline: "none",
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
  letterSpacing: "0.6px",
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
  gap: "6px",
  fontWeight: "500",
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
  padding: "12px 14px", // Mais área de clique
  backgroundColor: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "12px", // Arredondamento moderno
  transition: `all 0.2s ${EASE}`,
  userSelect: "none",
  boxShadow: "0 1px 2px rgba(0,0,0,0.02)", // Sombra sutil
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
  borderRadius: "50px", // Botão Pílula (Apple/Google)
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "20px",
  boxShadow: "0 4px 12px rgba(26, 115, 232, 0.3)", // Glow Azul
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
  transition: `background-color 0.2s ${EASE}`,
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
  display: "none", // Controlado por JS (flex/none)
  alignItems: "center",
  gap: "8px",
  marginLeft: "auto",
  backgroundColor: "#f1f3f4", // Container cinza
  padding: "2px",
  borderRadius: "20px", // Pílula container
};

export const styleStepperBtn = {
  width: "24px",
  height: "24px",
  border: "none",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.15)", // Sombra de elevação
  color: COLORS.text,
  cursor: "pointer",
  padding: "0",
  fontSize: "16px",
  fontWeight: "700",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  transition: "transform 0.1s ease",
};

export const styleStepperCount = {
  fontSize: "13px",
  fontWeight: "700",
  color: COLORS.primary,
  minWidth: "20px",
  textAlign: "center",
};

// =========================================================
//           SEARCH & CHIPS (Filtros)
// =========================================================
export const styleSearchInput = {
  width: "100%",
  padding: "12px 12px 12px 40px", // Espaço maior para ícone
  borderRadius: "12px",
  border: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.surface,
  fontSize: "14px",
  marginBottom: "16px",
  boxSizing: "border-box",
  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "12px center",
  outline: "none",
  transition: `border-color 0.2s ${EASE}, box-shadow 0.2s ${EASE}`,
};

export const styleChipContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "20px",
  paddingBottom: "12px",
  borderBottom: `1px solid ${COLORS.bgInput}`,
};

export const styleChip = {
  padding: "6px 12px",
  borderRadius: "8px", // Soft Square (Estilo Google atual)
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
  display: "none", // JS controla
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  color: COLORS.primary,
  backgroundColor: "rgba(255,255,255,0.6)",
  transition: "background 0.2s",
  lineHeight: "1",
};

// =========================================================
//           CONTAINERS E BLOCOS
// =========================================================
export const styleStepBlock = {
  borderTop: `1px solid ${COLORS.bgInput}`,
  paddingTop: "20px",
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
  background: "#fff8e1", // Amarelo suave
  borderRadius: "8px",
  border: "1px solid #ffe082",
  color: "#b06000",
  fontSize: "13px",
  display: "none",
};

// Drawer Lista (Fallback/Legado)
export const styleTaskListContainer = {
  maxHeight: "240px",
  overflowY: "auto",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "12px",
  marginTop: "8px",
  backgroundColor: COLORS.surface,
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
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