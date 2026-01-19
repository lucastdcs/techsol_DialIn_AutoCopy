// src/modules/notes/components/split-transfer.js

import { styleInput, styleLabel, styleTextarea, styleButtonBase } from "../notes-styles.js";
import { getPageData } from "../../shared/page-data.js";
import { showToast } from "../../shared/utils.js";
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from "../notes-bridge.js";

export function createSplitTransferComponent(onBack) {
    const container = document.createElement("div");
    container.style.cssText = "padding: 16px; display: flex; flex-direction: column; gap: 16px; height: 100%; box-sizing: border-box; overflow-y: auto;";

    // --- HELPER: INPUT BUILDER ---
    function createField(id, label, type = "text", placeholder = "") {
        const wrapper = document.createElement("div");
        
        const lbl = document.createElement("label");
        Object.assign(lbl.style, styleLabel);
        lbl.textContent = label;
        
        let input;
        if (type === "textarea") {
            input = document.createElement("textarea");
            Object.assign(input.style, styleTextarea);
            input.style.height = "80px";
        } else {
            input = document.createElement("input");
            input.type = type;
            Object.assign(input.style, styleInput);
        }
        input.id = `st-${id}`;
        input.placeholder = placeholder;
        
        wrapper.appendChild(lbl);
        wrapper.appendChild(input);
        return { wrapper, input };
    }

    function createRadioGroup(id, label) {
        const wrapper = document.createElement("div");
        const lbl = document.createElement("label");
        Object.assign(lbl.style, styleLabel);
        lbl.textContent = label;
        wrapper.appendChild(lbl);

        const group = document.createElement("div");
        group.style.display = "flex";
        group.style.gap = "15px";
        group.style.marginBottom = "16px";

        ['Yes', 'No'].forEach(val => {
            const labelRadio = document.createElement("label");
            labelRadio.style.display = "flex";
            labelRadio.style.alignItems = "center";
            labelRadio.style.fontSize = "13px";
            labelRadio.style.cursor = "pointer";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `st-${id}`;
            radio.value = val === 'Yes' ? 'Y' : 'N';
            radio.style.marginRight = "6px";
            
            if(val === 'No') radio.checked = true;

            labelRadio.appendChild(radio);
            labelRadio.appendChild(document.createTextNode(val));
            group.appendChild(labelRadio);
        });
        wrapper.appendChild(group);
        return { wrapper };
    }

    // --- BLOCO 1: DADOS TÉCNICOS ---
    const sectionTech = document.createElement("div");
    sectionTech.innerHTML = `<div style="font-size:12px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin-bottom:8px; border-bottom:1px solid #e0e0e0; padding-bottom:4px;">1. Dados Técnicos</div>`;
    
    const fAds = createField("cid", "Ads CID");
    const fGa4 = createField("ga4", "GA4 ID");
    const fGtm = createField("gtm", "GTM ID");
    const fGhost = createRadioGroup("ghost", "Ghosting Access Available?");
    const fAccess = createRadioGroup("access", "Advertiser has access to GA4/GTM?");
    const fAccessEmail = createField("access-email", "If Yes, User Email");

    sectionTech.append(fAds.wrapper, fGa4.wrapper, fGtm.wrapper, fGhost.wrapper, fAccess.wrapper, fAccessEmail.wrapper);

    // --- BLOCO 2: CONTATO & CONTEXTO ---
    const sectionInfo = document.createElement("div");
    sectionInfo.innerHTML = `<div style="font-size:12px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin:20px 0 8px 0; border-bottom:1px solid #e0e0e0; padding-bottom:4px;">2. Contato & Problema</div>`;

    const fName = createField("name", "Name of Advertiser");
    const fUrl = createField("url", "Website Address");
    const fPhone = createField("phone", "Phone Number");
    const fEmail = createField("email", "Email Address");
    const fTime = createField("callback", "Preferred Call Back Time (w/ Timezone)");
    const fDesc = createField("desc", "Detailed Issue Description", "textarea");
    const fChecks = createField("checks", "Checks Performed by Tech Team", "textarea");
    const fScreens = createField("screens", "Uncropped Screenshots (Links)", "textarea");

    sectionInfo.append(fName.wrapper, fUrl.wrapper, fPhone.wrapper, fEmail.wrapper, fTime.wrapper, fDesc.wrapper, fChecks.wrapper, fScreens.wrapper);

    // --- BLOCO 3: CONTATOS DE CÓPIA ---
    const sectionCopy = document.createElement("div");
    sectionCopy.innerHTML = `<div style="font-size:12px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin:20px 0 8px 0; border-bottom:1px solid #e0e0e0; padding-bottom:4px;">3. Contatos (Cópia)</div>`;
    
    const fAdvContact = createField("c-adv", "Advertiser Contact");
    const fAmContact = createField("c-am", "Account Manager");

    sectionCopy.append(fAdvContact.wrapper, fAmContact.wrapper);

    // --- BOTÕES ---
    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.gap = "10px";
    btnContainer.style.marginTop = "auto";
    btnContainer.style.paddingTop = "20px";

    const btnMagic = document.createElement("button");
    btnMagic.textContent = "✨ Auto-Fill";
    Object.assign(btnMagic.style, styleButtonBase, { background: "#f8f9fa", color: "#1a73e8", border: "1px solid #dadce0" });
    
    const btnGenerate = document.createElement("button");
    btnGenerate.textContent = "Gerar Nota S&T";
    Object.assign(btnGenerate.style, styleButtonBase);

    btnContainer.appendChild(btnMagic);
    btnContainer.appendChild(btnGenerate);

    container.append(sectionTech, sectionInfo, sectionCopy, btnContainer);

    // --- LÓGICA ---

    // 1. Magic Fill
    btnMagic.onclick = async () => {
        btnMagic.textContent = "⏳ Buscando...";
        const data = await getPageData();
        
        if (data.advertiserName) fName.input.value = data.advertiserName;
        if (data.websiteUrl) fUrl.input.value = data.websiteUrl;
        if (data.clientEmail) {
            fEmail.input.value = data.clientEmail;
            fAdvContact.input.value = data.clientEmail;
        }
        
        // Tenta pegar o CID da URL ou da página
        const cidMatch = document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);
        if (cidMatch) fAds.input.value = cidMatch[0];

        btnMagic.textContent = "✨ Auto-Fill";
        showToast("Dados preenchidos!");
    };

    // 2. Gerar Nota
    btnGenerate.onclick = async () => {
        const getVal = (id) => {
            const el = container.querySelector(`#st-${id}`);
            return el ? el.value : '';
        };
        const getRadio = (name) => {
            const el = container.querySelector(`input[name="st-${name}"]:checked`);
            return el ? el.value : 'N';
        };

        const template = `Split & Transfer : Phone Note Format [Mandatory]

Advertiser’s info:
Ads CID: ${getVal('cid')}
GA4 ID: ${getVal('ga4')}
GTM ID: ${getVal('gtm')}
Advertiser has access to either GA4 or GTM (Y/N): ${getRadio('access')}
If Yes, user access email to GA4/GTM: ${getVal('access-email')}
Ghosting Access Available (Y/N): ${getRadio('ghost')}
Name of the advertiser: ${getVal('name')}
Website Address: ${getVal('url')}
Advertiser’s preferred mode of communication: Phone
Advertiser/Web Master’s Phone Number: ${getVal('phone')}
Preferred Call Back time with time zone and contact number: ${getVal('callback')}
Advertiser/Web Master’s Email Address: ${getVal('email')}

Detailed Issue Description:
${getVal('desc')}

Name of the conversion action or event in the question: N/A
Date range: N/A
Uncropped screenshots of the issue:
${getVal('screens')}

Test conversion details (if any): N/A

Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):
${getVal('checks')}

[IMP] Contacts to be copied on all communication about this case
Advertiser contact - ${getVal('c-adv')}
Account Manager - ${getVal('c-am')}
Additional Contact - N/A

Additional Comments: (Optional)`;

        // Copia e Tenta Inserir
        copyHtmlToClipboard(template.replace(/\n/g, '<br>'));
        
        const editor = await ensureNoteCardIsOpen();
        if (editor) {
            document.execCommand("insertHTML", false, template.replace(/\n/g, '<br>'));
            triggerInputEvents(editor);
            showToast("Nota S&T inserida!");
        } else {
            showToast("Copiado! Abra uma nota para colar.");
        }
        
        // Volta para a view normal se quiser
        // onBack(); 
    };

    return container;
}