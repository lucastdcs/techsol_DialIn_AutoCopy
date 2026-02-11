// src/modules/notes/core/notes-state.js
export class NotesState {
    constructor() { this.reset(); }
    reset() {
        this.currentCaseType = "bau"; this.currentLang = "pt"; this.isPortugalCase = false;
        this.visible = false; this.isSplitView = false; this.currentStatus = "";
        this.currentSubStatus = ""; this.formData = {}; this.activeTasks = [];
        this.screenshotsData = {}; this.tagSupportState = null; this.isDirty = false;
    }
    setCaseType(type) { this.currentCaseType = type; this.notify(); }
    setLanguage(lang) { this.currentLang = lang; this.notify(); }
    setStatus(status) { this.currentStatus = status; this.notify(); }
    setSubStatus(subStatus) { this.currentSubStatus = subStatus; this.notify(); }
    updateField(id, value) { this.formData[id] = value; this.isDirty = true; this.notify(); }
    listeners = [];
    subscribe(fn) { this.listeners.push(fn); return () => this.listeners = this.listeners.filter(l => l !== fn); }
    notify() { this.listeners.forEach(fn => fn(this)); }
}
export const notesState = new NotesState();
