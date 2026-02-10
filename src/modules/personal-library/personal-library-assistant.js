// src/modules/personal-library/personal-library-assistant.js

import { stylePopup, styleResizeHandle, makeResizable, showToast, confirmDialog } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";
import { SnippetService } from "./snippet-service.js";

export function initPersonalLibrary() {
    const CURRENT_VERSION = "v1.0";
    let visible = false;
    let currentTab = 'general'; // general, note, email
    let editorOverlay = null;
    let currentEditingId = null;

    // --- DESIGN SYSTEM ---
    const COLORS = {
        bg: "#F8F9FA",
        surface: "#FFFFFF",
        primary: "#1A73E8",
        primaryBg: "#E8F0FE",
        text: "#202124",
        textSub: "#5F6368",
        border: "#DADCE0",
        danger: "#D93025"
    };

    const styles = {
        container: { display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg, fontFamily: "'Google Sans', Roboto, sans-serif" },
        
        // Tabs
        tabHeader: { display: 'flex', padding: '12px 16px 0 16px', background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` },
        tabBtn: { 
            flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', 
            fontSize: '13px', fontWeight: '500', color: COLORS.textSub, 
            borderBottom: '3px solid transparent', transition: 'all 0.2s', userSelect: 'none'
        },
        tabActive: { color: COLORS.primary, borderBottomColor: COLORS.primary, fontWeight: '600' },

        // List
        listContainer: { flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
        emptyState: { padding: '40px 20px', textAlign: 'center', color: '#BDC1C6', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },

        // Card
        card: {
            background: COLORS.surface, borderRadius: '12px', padding: '16px',
            border: `1px solid ${COLORS.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)', cursor: 'default',
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
            background: COLORS.bg, zIndex: 20,
            transform: 'translateY(100%)', transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
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
            Object.assign(card.style, styles.card);

            if (item.isCode) {
                card.style.borderLeft = `4px solid ${COLORS.primary}`;
                card.style.background = "#F8F9FA";
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
                    <button class="cw-act-copy" style="${objectToCss(styles.actionBtn)}; color:#1967D2;">Copiar</button>
                    <button class="cw-act-edit" style="${objectToCss(styles.actionBtn)}; color:#5F6368;">Editar</button>
                    <button class="cw-act-del" style="${objectToCss(styles.actionBtn)}; color:#D93025;">Excluir</button>
                </div>
            `;

            // Listeners
            card.onmouseenter = () => { 
                card.style.transform = "translateY(-2px)";
                card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            };
            card.onmouseleave = () => { 
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
            };

            card.querySelector('.cw-act-copy').onclick = (e) => {
                e.stopPropagation();
                SoundManager.playClick();

                if (item.isRich) {
                    const blob = new Blob([item.content], { type: 'text/html' });
                    const plainText = document.createElement('div');
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
                openEditor(item);
            };

            card.querySelector('.cw-act-del').onclick = (e) => {
                e.stopPropagation();
                if(confirm("Excluir este item?")) {
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
            toolbar.style.cssText = "display:flex; gap:8px; margin-bottom:8px; background:#f1f3f4; padding:6px; border-radius:8px; border:1px solid #dadce0;";

            const btnStyle = "padding:4px 10px; font-size:11px; cursor:pointer; background:white; border:1px solid #dadce0; border-radius:6px; font-weight:600; color:#5f6368; transition:all 0.2s;";

            toolbar.innerHTML = `
                <button type="button" class="cw-tb-bold" title="Negrito" style="${btnStyle}"><b>B</b></button>
                <button type="button" class="cw-tb-italic" title="Itálico" style="${btnStyle}"><i>I</i></button>
                <button type="button" class="cw-tb-code" title="Formato Código" style="${btnStyle} font-family:monospace;">&lt;/&gt;</button>
                <button type="button" class="cw-tb-img" title="Inserir Imagem" style="${btnStyle}">🖼️</button>
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

            toolbar.querySelector('.cw-tb-bold').onclick = () => { document.execCommand('bold'); input.focus(); };
            toolbar.querySelector('.cw-tb-italic').onclick = () => { document.execCommand('italic'); input.focus(); };
            toolbar.querySelector('.cw-tb-code').onclick = (e) => {
                 const isCode = input.getAttribute('data-is-code') === 'true';
                 const newState = !isCode;
                 input.setAttribute('data-is-code', newState);
                 input.style.fontFamily = newState ? "'Roboto Mono', monospace" : "inherit";
                 input.style.backgroundColor = newState ? "#F8F9FA" : COLORS.surface;
                 e.currentTarget.style.background = newState ? COLORS.primaryBg : "white";
                 e.currentTarget.style.color = newState ? COLORS.primary : "#5f6368";
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