// src/modules/notes/drafts/draft-ui.js

import { DraftService } from "./draft-service.js";
import { showToast, stylePopup } from "../../shared/utils.js"; // Reuso de estilos
import { SoundManager } from "../../shared/sound-manager.js";

export function createDraftsManager(callbacks) {
    const { onSaveCurrent, onLoadDraft } = callbacks;

    // --- ELEMENTOS UI ---
    
    // 1. Botão "Estacionar" (Para o Footer do Notes)
    const parkButton = document.createElement("button");
    parkButton.innerHTML = `<span style="font-size:16px">⏸️</span> Estacionar`;
    // Estilo Ghost/Secundário
    parkButton.style.cssText = `
        flex: 0 0 auto; padding: 10px 16px; 
        background: #F1F3F4; color: #5F6368; 
        border: 1px solid transparent; borderRadius: 8px; 
        font-size: 13px; fontWeight: 600; cursor: pointer;
        display: flex; alignItems: center; gap: 6px;
        transition: all 0.2s;
    `;
    parkButton.onmouseover = () => { parkButton.style.background = "#E8F0FE"; parkButton.style.color = "#1967D2"; };
    parkButton.onmouseout = () => { parkButton.style.background = "#F1F3F4"; parkButton.style.color = "#5F6368"; };
    
    parkButton.onclick = async () => {
        if(confirm("Deseja estacionar o caso atual e limpar a tela?")) {
            await onSaveCurrent(); // Chama o Notes Assistant para pegar os dados
            renderDrawerList();
            updateBadge();
            SoundManager.playSuccess();
            showToast("Caso estacionado com sucesso.");
        }
    };

    // 2. Botão de Histórico (Para o Header)
    const historyBtnWrapper = document.createElement("div");
    historyBtnWrapper.style.cssText = "position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 4px;";
    historyBtnWrapper.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    
    const badge = document.createElement("div");
    badge.style.cssText = "position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white;";
    historyBtnWrapper.appendChild(badge);

    historyBtnWrapper.onmouseenter = () => historyBtnWrapper.style.background = "rgba(0,0,0,0.05)";
    historyBtnWrapper.onmouseleave = () => historyBtnWrapper.style.background = "transparent";
    historyBtnWrapper.onclick = (e) => {
        e.stopPropagation();
        toggleDrawer();
    };

    function updateBadge() {
        const count = DraftService.getCount();
        if (count > 0) {
            badge.style.display = "block";
            badge.textContent = count;
            badge.style.transform = "scale(1.2)";
            setTimeout(() => badge.style.transform = "scale(1)", 200);
        } else {
            badge.style.display = "none";
        }
    }

    // 3. Drawer (Gaveta Deslizante)
    const drawer = document.createElement("div");
    drawer.style.cssText = `
        position: absolute; bottom: 0; left: 0; width: 100%; height: 85%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;

    const drawerHeader = document.createElement("div");
    drawerHeader.style.cssText = "padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;";
    drawerHeader.innerHTML = `<span style="font-size:16px; font-weight:700; color:#202124;">Casos Estacionados</span>`;
    
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    closeBtn.style.cssText = "background:none; border:none; font-size:18px; color:#5f6368; cursor:pointer;";
    closeBtn.onclick = () => toggleDrawer(false);
    drawerHeader.appendChild(closeBtn);

    const drawerList = document.createElement("div");
    drawerList.style.cssText = "flex: 1; overflow-y: auto; padding: 16px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;";

    drawer.appendChild(drawerHeader);
    drawer.appendChild(drawerList);

    function toggleDrawer(forceState) {
        const isOpen = drawer.style.transform === "translateY(0%)";
        const shouldOpen = forceState !== undefined ? forceState : !isOpen;
        
        if (shouldOpen) {
            renderDrawerList();
            drawer.style.transform = "translateY(0%)";
        } else {
            drawer.style.transform = "translateY(110%)";
        }
    }

    function renderDrawerList() {
        const drafts = DraftService.getAll();
        drawerList.innerHTML = "";

        if (drafts.length === 0) {
            drawerList.innerHTML = `<div style="text-align:center; padding:40px; color:#9AA0A6;">Nenhum caso estacionado.</div>`;
            return;
        }

        drafts.forEach(draft => {
            const card = document.createElement("div");
            card.style.cssText = `
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                position: relative; transition: all 0.2s;
            `;
            
            const date = new Date(draft.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                    <div style="font-weight:700; color:#1A73E8; font-size:14px;">${draft.clientName || 'Cliente'}</div>
                    <div style="font-size:11px; color:#9AA0A6; font-family:monospace;">${date}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px;">
                    CID: ${draft.cid || 'N/A'}<br>
                    Status: <b>${draft.status || 'N/A'}</b>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#E8F0FE; color:#1967D2; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">▶ Retomar</button>
                    <button class="cw-del-btn" style="padding:8px 12px; background:#FCE8E6; color:#D93025; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">🗑️</button>
                </div>
            `;

            card.querySelector(".cw-resume-btn").onclick = () => {
                if(confirm("Retomar este caso? O formulário atual será substituído.")) {
                    onLoadDraft(draft);
                    DraftService.delete(draft.id); // Remove ao retomar
                    renderDrawerList();
                    updateBadge();
                    toggleDrawer(false);
                    SoundManager.playSwoosh();
                }
            };

            card.querySelector(".cw-del-btn").onclick = () => {
                DraftService.delete(draft.id);
                renderDrawerList();
                updateBadge();
            };

            drawerList.appendChild(card);
        });
    }

    // Inicializa Badge
    updateBadge();

    return {
        parkButton,
        historyBtnWrapper,
        drawer
    };
}