// src/modules/notes/notes-styles.js

export const styleInput = { width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif", transition: "border-color 0.2s ease, box-shadow 0.2s ease" };
export const styleTextarea = { ...styleInput, height: "100px", resize: "vertical" };
export const styleH3 = { fontSize: "14px", fontWeight: "600", color: "#202124", margin: "0 0 12px 0" };
export const styleCheckboxLabel = { display: "flex", alignItems: "center", marginBottom: "10px", fontSize: "14px", fontWeight: "400", cursor: "pointer", padding: "8px", background: "#f8f9fa", borderRadius: "6px", transition: "background-color 0.2s ease, box-shadow 0.2s ease", userSelect: "none" };
export const styleCheckboxInput = { width: "auto", marginRight: "10px", marginBottom: "0", cursor: "pointer", accentColor: "#1a73e8" };
export const styleButtonBase = { flex: "1 1 0", padding: "10px 0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginTop: "16px" };
export const styleStepper = { display: 'none', alignItems: 'center', gap: '5px', marginLeft: 'auto' };
export const styleStepperBtn = { width: '24px', height: '24px', border: '1px solid #dadce0', borderRadius: '50%', backgroundColor: '#f8f9fa', color: '#3c4043', cursor: 'pointer', padding: '0', fontSize: '16px', lineHeight: '22px', textAlign: 'center', userSelect: 'none' };
export const styleStepperCount = { fontSize: '14px', fontWeight: '500', color: '#1a73e8', minWidth: '15px', textAlign: 'center' };
export const styleStepBlock = { borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px" };
export const styleRadioContainer = { display: 'flex', gap: '15px', marginBottom: '10px' };
export const styleOptionalBtn = { width: '100%', padding: '10px', background: 'white', border: '1px dashed #1a73e8', color: '#1a73e8', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', marginBottom: '10px', transition: 'all 0.2s' };
// Adicione ao final do arquivo
export const styleTagSupportContainer = { 
    marginTop: "12px", marginBottom: "12px", padding: "10px", 
    background: "#fff8e1", borderRadius: "6px", border: "1px solid #ffecb3", 
    display: "none" // Começa oculto
};

export const styleWarningText = { 
    fontSize: "12px", color: "#e37400", marginTop: "4px" 
};

export const styleHelpLink = {
        fontSize: "12px",
        color: "#1a73e8",
        textDecoration: "none",
        cursor: "pointer",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginLeft: "auto", // Empurra para a direita
        transition: "color 0.2s"
};

// --- NOVOS ESTILOS (Search + Chips) ---
export const styleSearchInput = {
    width: "100%", padding: "10px 12px 10px 32px", // Espaço para ícone lupa
    borderRadius: "8px", border: "1px solid #dadce0", background: "#f8f9fa",
    fontSize: "14px", marginBottom: "12px", boxSizing: "border-box",
    // Ícone de lupa em SVG via Data URI
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "10px center",
    outline: "none"
};

export const styleChipContainer = {
    display: 'flex', flexWrap: 'wrap', gap: '8px',
    marginBottom: '16px', paddingBottom: '12px',
    borderBottom: '1px solid #eee'
};

export const styleChip = {
    padding: '6px 12px', borderRadius: '16px',
    border: '1px solid #dadce0', backgroundColor: '#fff',
    color: '#3c4043', fontSize: '12px', fontWeight: '500',
    cursor: 'pointer', transition: 'all 0.2s ease', userSelect: 'none',
    display: 'flex', alignItems: 'center', gap: '6px'
};

export const styleChipSelected = {
    backgroundColor: '#e8f0fe', color: '#1967d2', borderColor: '#1967d2'
};

export const styleChipRemove = {
    marginLeft: '2px', width: '16px', height: '16px', borderRadius: '50%',
    display: 'none', alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', color: '#1967d2', backgroundColor: 'rgba(255,255,255,0.6)',
    transition: 'background 0.2s', lineHeight: '1'
};

export const styleLinkButton = {
    background: 'transparent', 
    border: '1px solid #dadce0', // Borda suave opcional, ou remove se preferir 'text-only'
    borderRadius: '18px',        // Formato de pílula (Google Chips)
    color: '#1a73e8',            // Azul Google
    cursor: 'pointer', 
    fontSize: '13px', 
    fontWeight: '500',
    padding: '6px 16px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: '6px',
    margin: '12px auto 0 auto',  // Centralizado com margem no topo
    transition: 'background-color 0.2s ease',
    fontFamily: "'Poppins', sans-serif"
};

// Container da lista de tasks (o "Drawer")
export const styleTaskListContainer = {
    maxHeight: "220px",          // Limita a altura (Scroll interno)
    overflowY: "auto",           // Scroll automático
    border: "1px solid #dadce0", // Borda suave Google
    borderRadius: "8px",         // Cantos arredondados
    marginTop: "8px",            // Separação da busca
    backgroundColor: "#ffffff",  // Fundo branco limpo
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)", // Sombra interna sutil (profundidade)
    display: "none"              // Começa oculto (controlado pelo JS)
};

// Item individual da lista (sobrescreve o checkbox padrão para ficar mais compacto)
export const styleTaskListItem = {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",         // Mais compacto que o padrão
    borderBottom: "1px solid #f1f3f4", // Separador ultra leve
    cursor: "pointer",
    fontSize: "13px",            // Fonte levemente menor
    color: "#3c4043",
    transition: "background 0.1s",
    userSelect: "none"
};