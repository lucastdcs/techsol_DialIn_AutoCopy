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

