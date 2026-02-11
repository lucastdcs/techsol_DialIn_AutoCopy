// src/modules/personal-library/personal-library-assistant.js

import { stylePopup, styleResizeHandle, makeResizable, showToast, confirmDialog } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";
import { SnippetService } from "./snippet-service.js";

export function initPersonalLibrary() {
    const CURRENT_VERSION = "v1.1";
    let visible = false;
    let currentTab = 'general'; // general, note, email
    let editorOverlay = null;
    let currentEditingId = null;

    // --- INJEÇÃO DE ESTILOS GLOBAIS (DNA APPLE/GOOGLE) ---
    if (!document.getElementById('cw-lib-styles')) {
        const style = document.createElement('style');
        style.id = 'cw-lib-styles';
        style.innerHTML = `
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `;
        document.head.appendChild(style);
    }

    // --- DESIGN SYSTEM ---
    const COLORS = {
        bg: "#F0F2F5",
        surface: "#FFFFFF",
        primary: "#007AFF",
        primaryBg: "rgba(0, 122, 255, 0.1)",
        text: "#1C1C1E",
        textSub: "#8E8E93",
        border: "rgba(0, 0, 0, 0.08)",
        danger: "#FF3B30"
    };

    const styles = {
        container: { display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg, fontFamily: "'Google Sans', Roboto, sans-serif" },
        
        // Tabs
        tabHeader: { display: 'flex', padding: '12px 16px 0 16px', background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` },
        tabBtn: { 
            flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', 
            fontSize: '13px', fontWeight: '500', color: COLORS.textSub, 
            borderBottom: '3px solid transparent', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', userSelect: 'none'
        },
        tabActive: { color: COLORS.primary, borderBottomColor: COLORS.primary, fontWeight: '600' },

        // List
        listContainer: { flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
        emptyState: { padding: '40px 20px', textAlign: 'center', color: '#BDC1C6', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },

        // Card
        card: {
            background: COLORS.surface, borderRadius: '16px', padding: '16px',
            border: `1px solid ${COLORS.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)', cursor: 'default',
            position: 'relative', overflow: 'hidden'
        },
        cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
        cardTitle: { fontSize: '14px', fontWeight: '600', color: COLORS.text },
        cardPreview: { fontSize: '12px', color: COLORS.textSub, lineHeight: '1.5', display: '-webkit-box', webkitLineClamp: '3', webkitBoxOrient: 'vertical', overflow: 'hidden' },
        
        // Actions
        cardActions: { 
            display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px', 
            paddingTop: '12px', borderTop: `1px dashed ${COLORS.border}` 
        },
        actionBtn: { 
            padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', 
            cursor: 'pointer', border: 'none', background: 'transparent', transition: 'background 0.2s'
        },

        // Floating Action Button (FAB)
        fab: {
            position: 'absolute', bottom: '24px', right: '24px',
            width: '56px', height: '56px', borderRadius: '16px',
            background: COLORS.primary, color: '#FFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(26, 115, 232, 0.4)',
            cursor: 'pointer', transition: 'transform 0.2s', zIndex: 10
        },

        // Editor Overlay
        editorOverlay: {
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(25px) saturate(180%)',
            webkitBackdropFilter: 'blur(25px) saturate(180%)',
            zIndex: 20, transform: 'translateY(100%)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex', flexDirection: 'column'
        },
        editorHeader: {
            padding: '16px 24px', background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        },
        editorBody: { flex: 1, padding: '24px', overflowY: 'auto' },
        
        // Inputs
        inputGroup: { marginBottom: '20px' },
        label: { display: 'block', fontSize: '12px', fontWeight: '700', color: COLORS.textSub, marginBottom: '8px', textTransform: 'uppercase' },
        input: {
            width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`,
            fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: COLORS.surface,
            boxSizing: 'border-box'
        }
    };

    // --- POPUP SETUP ---
    const popup = document.createElement("div");
    popup.id = "library-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { 
        right: "auto", left: "50%", width: "400px", height: "600px", 
        transform: "translateX(-50%) scale(0.05)", overflow: "hidden"
    });

    const animRefs = { popup };
    const header = createStandardHeader(
        popup, "Minha Biblioteca", CURRENT_VERSION, 
        "Gerencie seus snippets, textos e templates.", 
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);

    const container = document.createElement("div");
    Object.assign(container.style, styles.container);
    popup.appendChild(container);

    // --- TABS ---
    const tabHeader = document.createElement("div");
    Object.assign(tabHeader.style, styles.tabHeader);

    const tabs = [
        { id: 'general', label: 'Geral', icon: '📋' },
        { id: 'note', label: 'Notas', icon: '📝' },
        { id: 'email', label: 'Emails', icon: '📧' }
    ];

    tabs.forEach(t => {
        const btn = document.createElement("div");
        btn.innerHTML = `${t.icon} ${t.label}`;
        btn.id = `lib-tab-${t.id}`;
        Object.assign(btn.style, styles.tabBtn);
        if(t.id === currentTab) Object.assign(btn.style, styles.tabActive);
        
        btn.onmouseenter = () => SoundManager.playHover();
        btn.onclick = () => switchTab(t.id);
        tabHeader.appendChild(btn);
    });
    container.appendChild(tabHeader);

    // --- LISTA ---
    const listContainer = document.createElement("div");
    Object.assign(listContainer.style, styles.listContainer);
    container.appendChild(listContainer);

    // --- FAB (Add Button) ---
    const fab = document.createElement("div");
    fab.className = "cw-fab cw-tactile";
    Object.assign(fab.style, styles.fab);
    fab.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
    fab.onmouseenter = () => fab.style.transform = "scale(1.1)";
    fab.onmouseleave = () => fab.style.transform = "scale(1)";
    fab.onclick = () => openEditor();
    container.appendChild(fab);

    // --- EDITOR OVERLAY ---
    editorOverlay = document.createElement("div");
    Object.assign(editorOverlay.style, styles.editorOverlay);
    
    // Header do Editor
    const edHead = document.createElement("div");
    Object.assign(edHead.style, styles.editorHeader);
    edHead.innerHTML = `<span style="font-weight:700; font-size:16px;">Novo Item</span>`;
    
    const closeEd = document.createElement("button");
    closeEd.innerHTML = "Cancelar";
    closeEd.style.cssText = "background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;";
    closeEd.onclick = closeEditor;
    edHead.appendChild(closeEd);
    editorOverlay.appendChild(edHead);

    // Body do Editor
    const edBody = document.createElement("div");
    Object.assign(edBody.style, styles.editorBody);
    editorOverlay.appendChild(edBody);

    // Footer do Editor (Save)
    const edFooter = document.createElement("div");
    edFooter.style.cssText = "padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";
    
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Salvar";
    saveBtn.style.cssText = "padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);";
    saveBtn.onclick = handleSave;
    edFooter.appendChild(saveBtn);
    editorOverlay.appendChild(edFooter);

    container.appendChild(editorOverlay);

    // --- RESIZE HANDLE ---
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // --- LÓGICA ---

    function switchTab(id) {
        SoundManager.playClick();
        currentTab = id;
        
        // Atualiza UI Tabs
        tabs.forEach(t => {
            const btn = document.getElementById(`lib-tab-${t.id}`);
            if (t.id === id) {
                Object.assign(btn.style, styles.tabActive);
            } else {
                Object.assign(btn.style, styles.tabBtn);
            }
        });

        renderList();
    }

    function renderList() {
        listContainer.innerHTML = "";
        const items = SnippetService.getSnippets(currentTab);

        if (items.length === 0) {
            listContainer.innerHTML = `
                <div style="${objectToCss(styles.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">📭</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "cw-lib-card";
            Object.assign(card.style, styles.card);

            if (item.isCode) {
                card.style.borderLeft = `4px solid ${COLORS.primary}`;
                card.style.background = "rgba(0, 122, 255, 0.02)";
            }

            // Sanitização básica ou processamento para preview
            let previewContent = item.content;
            if (item.isRich) {
                // Remove tags para o preview, exceto imagens que mostramos um placeholder ou pequeno ícone
                const temp = document.createElement('div');
                temp.innerHTML = item.content;
                const hasImages = temp.querySelector('img');
                previewContent = temp.innerText.substring(0, 150) + (temp.innerText.length > 150 ? '...' : '');
                if (hasImages) previewContent = "🖼️ [Contém Imagens] " + previewContent;
            }

            card.innerHTML = `
                <div style="${objectToCss(styles.cardHeader)}">
                    <div style="${objectToCss(styles.cardTitle)}">${item.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${item.isCode ? '<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>' : ''}
                        ${currentTab === 'email' ? '<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>' : ''}
                    </div>
                </div>
                <div style="${objectToCss(styles.cardPreview)}; ${item.isCode ? "font-family:'Roboto Mono', monospace; font-size:11px;" : ""}">${previewContent}</div>
                <div style="${objectToCss(styles.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${objectToCss(styles.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${objectToCss(styles.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${objectToCss(styles.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `;

            // Listeners
            card.onmouseenter = () => { 
                SoundManager.playHover();
                // O efeito de lift agora é via classe CSS cw-lib-card
            };

            card.querySelector('.cw-act-copy').onclick = (e) => {
                e.stopPropagation();
                SoundManager.playClick();

                if (item.isRich) {
                    const blob = new Blob([item.content], { type: 'text/html' });
                    const plainText = document.createElement('div');
                    plainText.style.whiteSpace = 'pre-wrap'; // Mantém formatação de código
                    plainText.innerHTML = item.content;
                    const blobText = new Blob([plainText.innerText], { type: 'text/plain' });
                    const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': blobText })];
                    navigator.clipboard.write(data);
                } else {
                    navigator.clipboard.writeText(item.content);
                }

                showToast("Copiado!");
            };

            card.querySelector('.cw-act-edit').onclick = (e) => {
                e.stopPropagation();
                SoundManager.playClick();
                openEditor(item);
            };

            card.querySelector('.cw-act-del').onclick = async (e) => {
                e.stopPropagation();
                SoundManager.playClick();
                const confirmed = await confirmDialog("Excluir este item?");
                if(confirmed) {
                    SnippetService.delete(item.id);
                    renderList();
                    showToast("Item excluído.");
                }
            };

            listContainer.appendChild(card);
        });
    }

    function openEditor(item = null) {
        currentEditingId = item ? item.id : null;
        
        // Limpa e Reconstrói o Form baseado na Tab
        edBody.innerHTML = "";
        
        // Campo Título (Comum a todos)
        edBody.appendChild(createInputBlock("title", "Título / Nome", item ? item.title : ""));

        // Campos Específicos
        if (currentTab === 'email') {
            edBody.appendChild(createInputBlock("subject", "Assunto do Email", item ? item.subject : ""));
        }

        // Campo Conteúdo (Comum, mas label varia)
        let contentLabel = "Conteúdo";
        if (currentTab === 'email') contentLabel = "Corpo do Email (HTML)";
        if (currentTab === 'note') contentLabel = "Texto da Nota (Reason)";
        
        edBody.appendChild(createInputBlock("content", contentLabel, item ? item.content : "", {
            isRich: true,
            isCode: item ? item.isCode : false
        }));

        // Feedback visual da abertura
        edHead.querySelector("span").textContent = item ? "Editar Item" : "Novo Item";
        editorOverlay.style.transform = "translateY(0)";
        
        setTimeout(() => {
            const firstInput = edBody.querySelector("input");
            if(firstInput) firstInput.focus();
        }, 300);
    }

    function closeEditor() {
        editorOverlay.style.transform = "translateY(100%)";
        // Pequeno delay para resetar estado
        setTimeout(() => currentEditingId = null, 300);
    }

    async function handleSave() {
        const titleInput = edBody.querySelector("#cw-inp-title");
        const contentInput = edBody.querySelector("#cw-inp-content");
        
        const title = titleInput.value.trim();
        // Se for contenteditable, pegamos o innerHTML
        const content = contentInput.contentEditable === "true" ? contentInput.innerHTML : contentInput.value.trim();
        const isCode = contentInput.getAttribute('data-is-code') === 'true';

        if (!title || (!content || content === '<br>')) {
            showToast("Preencha título e conteúdo.", { error: true });
            return;
        }

        const payload = {
            id: currentEditingId, // Se null, cria novo
            type: currentTab,
            title: title,
            content: content,
            isCode: isCode,
            isRich: contentInput.contentEditable === "true"
        };

        if (currentTab === 'email') {
            const subject = edBody.querySelector("#cw-inp-subject").value.trim();
            if(!subject) {
                showToast("Assunto é obrigatório para emails.", { error: true });
                return;
            }
            payload.subject = subject;
        }

        saveBtn.textContent = "Salvando...";
        await SnippetService.save(payload);
        
        saveBtn.textContent = "Salvar";
        closeEditor();
        renderList();
        showToast("Salvo com sucesso!");
        SoundManager.playSuccess();
    }

    // --- HELPER DE UI ---
    function createInputBlock(id, labelText, value, options = {}) {
        const div = document.createElement("div");
        Object.assign(div.style, styles.inputGroup);
        
        const label = document.createElement("label");
        label.textContent = labelText;
        Object.assign(label.style, styles.label);
        
        let input;
        if (options.isRich) {
            const toolbar = document.createElement("div");
            toolbar.style.cssText = "display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);";

            toolbar.innerHTML = `
                <button type="button" class="cw-toolbar-btn cw-tb-bold cw-tactile" title="Negrito">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-italic cw-tactile" title="Itálico">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-code cw-tactile" title="Formato Código">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-img cw-tactile" title="Inserir Imagem">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </button>
            `;

            input = document.createElement("div");
            input.contentEditable = "true";
            Object.assign(input.style, styles.input, {
                minHeight: '180px', maxHeight: '350px', overflowY: 'auto',
                whiteSpace: 'pre-wrap', lineHeight: '1.6', outline: 'none'
            });
            input.innerHTML = value || "";

            if (options.isCode) {
                input.style.fontFamily = "'Roboto Mono', monospace";
                input.style.backgroundColor = "#F8F9FA";
                input.setAttribute('data-is-code', 'true');
            }

            toolbar.querySelectorAll('.cw-toolbar-btn').forEach(btn => {
                btn.onmouseenter = () => SoundManager.playHover();
                btn.onmousedown = () => SoundManager.playClick();
            });

            toolbar.querySelector('.cw-tb-bold').onclick = () => { document.execCommand('bold'); input.focus(); };
            toolbar.querySelector('.cw-tb-italic').onclick = () => { document.execCommand('italic'); input.focus(); };
            toolbar.querySelector('.cw-tb-code').onclick = (e) => {
                 const isCode = input.getAttribute('data-is-code') === 'true';
                 const newState = !isCode;
                 input.setAttribute('data-is-code', newState);
                 input.style.fontFamily = newState ? "'Roboto Mono', monospace" : "inherit";
                 input.style.backgroundColor = newState ? "rgba(0, 122, 255, 0.03)" : COLORS.surface;

                 if (newState) {
                     e.currentTarget.classList.add('active');
                 } else {
                     e.currentTarget.classList.remove('active');
                 }
                 input.focus();
            };

            toolbar.querySelector('.cw-tb-img').onclick = () => {
                const url = prompt("Cole a URL da imagem:");
                if(url) {
                    document.execCommand('insertImage', false, url);
                    const imgs = input.querySelectorAll('img');
                    imgs.forEach(img => { img.style.maxWidth = '100%'; img.style.borderRadius = '8px'; });
                }
            };

            input.onpaste = (e) => {
                const items = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (const item of items) {
                    if (item.kind === 'file' && item.type.startsWith('image/')) {
                        e.preventDefault();
                        const blob = item.getAsFile();
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const img = `<img src="${event.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;
                            document.execCommand('insertHTML', false, img);
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            };

            div.appendChild(label);
            div.appendChild(toolbar);
        } else {
            input = document.createElement("input");
            input.type = "text";
            Object.assign(input.style, styles.input);
            input.value = value || "";
            div.appendChild(label);
        }
        
        input.id = `cw-inp-${id}`;
        
        // Efeito focus
        input.onfocus = () => { input.style.borderColor = COLORS.primary; input.style.boxShadow = `0 0 0 2px ${COLORS.primaryBg}`; };
        input.onblur = () => { input.style.borderColor = COLORS.border; input.style.boxShadow = "none"; };

        div.appendChild(input);
        return div;
    }

    function objectToCss(obj) {
        return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
    }

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, "cw-btn-library");
        if(visible) renderList(); // Refresh ao abrir
    }

    return toggleVisibility;
}