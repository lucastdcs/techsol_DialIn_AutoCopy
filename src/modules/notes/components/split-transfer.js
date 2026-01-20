// src/modules/notes/components/split-transfer.js

import { getPageData } from "../../shared/page-data.js";
import { showToast } from "../../shared/utils.js";
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from "../notes-bridge.js";

export function createSplitTransferComponent(onBack) {
    // 1. CONTAINER PRINCIPAL (Fix de Layout)
    const container = document.createElement("div");
    // height: 100% é crucial para herdar a altura do pai
    // display: flex e flex-direction: column organizam header, corpo e footer
    // min-height: 0 é o segredo para scroll dentro de flex items no Firefox/Chrome
    container.style.cssText = "display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";

    // 2. ÁREA DE SCROLL (Onde o conteúdo vive)
    const scrollArea = document.createElement("div");
    // flex: 1 faz ele ocupar todo o espaço disponível
    // overflow-y: auto habilita o scroll apenas aqui
    // padding-bottom suficiente para o footer não cobrir o último campo
    scrollArea.style.cssText = "flex: 1; overflow-y: auto; padding: 20px 24px 80px 24px; min-height: 0;"; 

    // --- ESTILOS VISUAIS (Google Material 3 / Apple HD) ---
    const styles = {
        sectionTitle: `
            font-family: 'Google Sans', Roboto, sans-serif;
            font-size: 11px; 
            font-weight: 700; 
            color: #5F6368; 
            text-transform: uppercase; 
            letter-spacing: 0.8px; 
            margin: 28px 0 12px 0;
            display: flex; align-items: center; gap: 8px;
        `,
        label: `
            display: block; 
            font-size: 13px; 
            font-weight: 600; 
            color: #3C4043; 
            margin-bottom: 8px;
        `,
        inputWrapper: `
            margin-bottom: 16px;
        `,
        input: `
            width: 100%; 
            padding: 12px 14px; 
            border-radius: 8px; 
            border: 1px solid #DADCE0; 
            background: #FFFFFF; 
            font-size: 14px; 
            color: #202124; 
            transition: border 0.2s, box-shadow 0.2s; 
            outline: none; 
            box-sizing: border-box;
            font-family: Roboto, sans-serif;
        `,
        inputFocus: `
            border-color: #1a73e8; 
            box-shadow: 0 0 0 2px rgba(26,115,232,0.15);
        `,
        textarea: `
            min-height: 80px; 
            resize: vertical; 
            line-height: 1.5;
        `,
        
        // Radio Cards (Botões selecionáveis)
        radioGroup: `
            display: flex; 
            gap: 10px; 
            margin-bottom: 20px;
        `,
        radioLabel: `
            flex: 1; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 10px; 
            border: 1px solid #DADCE0; 
            border-radius: 8px; 
            background: #FFF; 
            cursor: pointer; 
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); 
            font-size: 13px; 
            font-weight: 500; 
            color: #3C4043; 
            user-select: none;
        `,
        radioActive: `
            background: #E8F0FE; 
            border-color: #1967D2; 
            color: #1967D2; 
            font-weight: 600;
            box-shadow: 0 1px 2px rgba(26,115,232,0.1);
        `,
        
        // Banner de Aviso
        banner: `
            background: #FEF7E0; 
            border: 1px solid #FEEFC3; 
            border-radius: 12px; 
            padding: 16px; 
            margin-bottom: 24px; 
            font-size: 13px; 
            color: #B06000; 
            line-height: 1.5; 
            display: flex; 
            gap: 12px; 
            align-items: start;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        `,
        
        // Botão Mágico
        magicBtn: `
            width: 100%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 8px; 
            padding: 12px; 
            background: #FFFFFF; 
            color: #1A73E8; 
            border: 1px solid #DADCE0; 
            border-radius: 12px; 
            font-size: 13px; 
            font-weight: 600; 
            cursor: pointer; 
            transition: all 0.2s; 
            margin-bottom: 8px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        `
    };

    // --- HELPER: INPUT BUILDER ---
    function createField(id, labelText, type = "text", placeholder = "") {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = styles.inputWrapper;
        
        const lbl = document.createElement("label");
        lbl.style.cssText = styles.label;
        lbl.textContent = labelText;
        
        let input;
        if (type === "textarea") {
            input = document.createElement("textarea");
            input.style.cssText = styles.input + styles.textarea;
        } else {
            input = document.createElement("input");
            input.type = type;
            input.style.cssText = styles.input;
        }
        
        // UX: Focus States
        const originalStyle = input.style.cssText;
        input.onfocus = () => input.style.cssText = originalStyle + styles.inputFocus;
        input.onblur = () => input.style.cssText = originalStyle;

        input.id = `st-${id}`;
        input.placeholder = placeholder;
        
        wrapper.appendChild(lbl);
        wrapper.appendChild(input);
        return { wrapper, input };
    }

    function createRadioGroup(id, labelText) {
        const wrapper = document.createElement("div");
        
        const lbl = document.createElement("label");
        lbl.style.cssText = styles.label;
        lbl.textContent = labelText;
        wrapper.appendChild(lbl);

        const group = document.createElement("div");
        group.style.cssText = styles.radioGroup;

        ['Yes', 'No'].forEach(val => {
            const labelRadio = document.createElement("label");
            labelRadio.style.cssText = styles.radioLabel;

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `st-${id}`;
            radio.value = val === 'Yes' ? 'Y' : 'N';
            radio.style.display = "none"; // Esconde o radio nativo (UI limpa)
            
            if(val === 'No') {
                radio.checked = true;
            }

            // Feedback Tátil
            labelRadio.onmousedown = () => labelRadio.style.transform = "scale(0.96)";
            labelRadio.onmouseup = () => labelRadio.style.transform = "scale(1)";
            labelRadio.onmouseleave = () => labelRadio.style.transform = "scale(1)";

            labelRadio.appendChild(radio);
            labelRadio.appendChild(document.createTextNode(val));
            
            // Lógica Visual (Toggle Class)
            radio.addEventListener('change', () => {
                // Reseta todos
                group.querySelectorAll('label').forEach(l => l.style.cssText = styles.radioLabel);
                // Ativa o clicado
                if (radio.checked) labelRadio.style.cssText = styles.radioLabel + styles.radioActive;
            });
            
            // Inicializa estado visual
            if(val === 'No') labelRadio.style.cssText = styles.radioLabel + styles.radioActive;

            group.appendChild(labelRadio);
        });
        wrapper.appendChild(group);
        return { wrapper };
    }

    // --- CONSTRUÇÃO DO CONTEÚDO ---

    // 1. DISCLAIMER (Topo)
    const disclaimer = document.createElement("div");
    disclaimer.style.cssText = styles.banner;
    disclaimer.innerHTML = `
        <span style="font-size: 18px;">⚠️</span>
        <div>
            <div style="font-weight:700; margin-bottom:4px;">Processo Crítico</div>
            Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a>.
        </div>
    `;
    scrollArea.appendChild(disclaimer);

    // 2. MAGIC FILL BTN
    const btnMagic = document.createElement("button");
    btnMagic.style.cssText = styles.magicBtn;
    btnMagic.innerHTML = `<span style="font-size:16px">✨</span> Preencher Automaticamente`;
    
    // Hover e Active
    btnMagic.onmouseover = () => btnMagic.style.backgroundColor = "#F8F9FA";
    btnMagic.onmouseout = () => btnMagic.style.backgroundColor = "#FFFFFF";
    btnMagic.onmousedown = () => btnMagic.style.transform = "scale(0.98)";
    btnMagic.onmouseup = () => btnMagic.style.transform = "scale(1)";
    
    scrollArea.appendChild(btnMagic);

    // 3. SEÇÃO: DADOS TÉCNICOS
    const techTitle = document.createElement("div");
    techTitle.style.cssText = styles.sectionTitle;
    techTitle.style.marginTop = "24px"; 
    techTitle.innerHTML = `<span>🛠️</span> Dados Técnicos`;
    scrollArea.appendChild(techTitle);

    const fAds = createField("cid", "Ads CID", "text", "000-000-0000");
    const fGa4 = createField("ga4", "GA4 ID");
    const fGtm = createField("gtm", "GTM ID");
    const fAccess = createRadioGroup("access", "Advertiser has access to GA4/GTM?");
    const fAccessEmail = createField("access-email", "If Yes, User Email");
    const fGhost = createRadioGroup("ghost", "Ghosting Access Available?");

    scrollArea.append(fAds.wrapper, fGa4.wrapper, fGtm.wrapper, fAccess.wrapper, fAccessEmail.wrapper, fGhost.wrapper);

    // 4. SEÇÃO: CONTATO
    const contactTitle = document.createElement("div");
    contactTitle.style.cssText = styles.sectionTitle;
    contactTitle.innerHTML = `<span>📞</span> Contato & Problema`;
    scrollArea.appendChild(contactTitle);

    const fName = createField("name", "Name of Advertiser");
    const fUrl = createField("url", "Website Address");
    const fPhone = createField("phone", "Phone Number");
    const fEmail = createField("email", "Email Address");
    const fTime = createField("callback", "Preferred Call Back Time (w/ Timezone)");
    const fDesc = createField("desc", "Detailed Issue Description", "textarea", "Descreva o problema técnico em detalhes...");
    const fChecks = createField("checks", "Checks Performed by Tech Team", "textarea", "Liste o troubleshooting já realizado...");
    const fScreens = createField("screens", "Uncropped Screenshots (Links)", "textarea", "https://...");

    scrollArea.append(fName.wrapper, fUrl.wrapper, fPhone.wrapper, fEmail.wrapper, fTime.wrapper, fDesc.wrapper, fChecks.wrapper, fScreens.wrapper);

    // 5. SEÇÃO: CÓPIA
    const copyTitle = document.createElement("div");
    copyTitle.style.cssText = styles.sectionTitle;
    copyTitle.innerHTML = `<span>📧</span> Contatos para Cópia (CC)`;
    scrollArea.appendChild(copyTitle);
    
    const fAdvContact = createField("c-adv", "Advertiser Contact");
    const fAmContact = createField("c-am", "Account Manager");

    scrollArea.append(fAdvContact.wrapper, fAmContact.wrapper);

    // --- FOOTER FIXO (Ações) ---
    const footer = document.createElement("div");
    // backdrop-filter blur para o conteúdo passar por baixo suavemente
    // z-index alto para ficar sobre o scrollArea
    footer.style.cssText = "padding: 16px 24px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 100;";

    const btnGenerate = document.createElement("button");
    btnGenerate.textContent = "Gerar Nota S&T";
    btnGenerate.style.cssText = "padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s, box-shadow 0.2s;";
    
    // Efeito de clique físico
    btnGenerate.onmousedown = () => {
        btnGenerate.style.transform = "scale(0.96)";
        btnGenerate.style.boxShadow = "0 1px 3px rgba(26, 115, 232, 0.2)";
    };
    btnGenerate.onmouseup = () => {
        btnGenerate.style.transform = "scale(1)";
        btnGenerate.style.boxShadow = "0 2px 6px rgba(26, 115, 232, 0.3)";
    };
    
    footer.appendChild(btnGenerate);

    // MONTAGEM FINAL
    container.appendChild(scrollArea);
    container.appendChild(footer);

    // --- LÓGICA (Mantida) ---

    // 1. Magic Fill
    btnMagic.onclick = async () => {
        btnMagic.innerHTML = `<span style="font-size:16px">⏳</span> Buscando...`;
        const data = await getPageData();
        
        if (data.advertiserName) fName.input.value = data.advertiserName;
        if (data.websiteUrl) fUrl.input.value = data.websiteUrl;
        if (data.clientEmail) {
            fEmail.input.value = data.clientEmail;
            fAdvContact.input.value = data.clientEmail;
        }
        
        const bodyText = document.body.innerText;
        const cidMatch = bodyText.match(/\d{3}-\d{3}-\d{4}/);
        if (cidMatch) fAds.input.value = cidMatch[0];

        btnMagic.innerHTML = `<span style="font-size:16px; color:#188038">✅</span> Dados Preenchidos!`;
        btnMagic.style.background = "#E6F4EA";
        btnMagic.style.borderColor = "#188038";
        
        setTimeout(() => {
             btnMagic.innerHTML = `<span style="font-size:16px">✨</span> Preencher Automaticamente`;
             btnMagic.style.background = "#FFFFFF";
             btnMagic.style.borderColor = "#DADCE0";
        }, 2000);
        
        showToast("Dados capturados com sucesso!");
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

<b>Advertiser’s info:</b>
<b>Ads CID:</b> ${getVal('cid')}
<b>GA4 ID:</b> ${getVal('ga4')}
<b>GTM ID:</b> ${getVal('gtm')}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${getRadio('access')}
<b>If Yes, user access email to GA4/GTM:</b> ${getVal('access-email')}
<b>Ghosting Access Available (Y/N):</b> ${getRadio('ghost')}
<b>Name of the advertiser:</b> ${getVal('name')}
<b>Website Address:</b> ${getVal('url')}
<b>Advertiser’s preferred mode of communication:</b> Phone
<b>Advertiser/Web Master’s Phone Number:</b> ${getVal('phone')}
<b>Preferred Call Back time with time zone and contact number:</b> ${getVal('callback')}
<b>Advertiser/Web Master’s Email Address:</b> ${getVal('email')}

<b>Detailed Issue Description:</b>
${getVal('desc')}

<b>Name of the conversion action or event in the question:</b> N/A
<b>Date range:</b> N/A
<b>Uncropped screenshots of the issue:</b>
${getVal('screens')}

<b>Test conversion details (if any):</b> N/A

<b>Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):</b>
${getVal('checks')}

[IMP] Contacts to be copied on all communication about this case
<b>Advertiser contact -</b> ${getVal('c-adv')}
<b>Account Manager -</b> ${getVal('c-am')}
<b>Additional Contact -</b> N/A

<b>Additional Comments:</b> (Optional)`;

        const htmlToInsert = template.replace(/\n/g, '<br>');
        copyHtmlToClipboard(htmlToInsert);
        
        const editor = await ensureNoteCardIsOpen();
        if (editor) {
            if (editor.innerText.trim() === "") editor.innerHTML = "";
            document.execCommand("insertHTML", false, htmlToInsert);
            triggerInputEvents(editor);
            showToast("Nota S&T inserida!");
        } else {
            showToast("Copiado! Abra uma nota para colar.");
        }
    };

    return container;
}