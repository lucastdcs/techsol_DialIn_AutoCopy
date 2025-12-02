# 🚀 Case Wizard

![Build Status](https://img.shields.io/github/actions/workflow/status/lucastdcs/techsol_DialIn_AutoCopy/deploy.yml?label=Build&style=flat-square)
![Version](https://img.shields.io/badge/version-v3.5.2-blue?style=flat-square)
![License](https://img.shields.io/github/license/lucastdcs/techsol_DialIn_AutoCopy?style=flat-square)

Uma suíte de ferramentas completa via **Bookmarklet** projetada para otimizar o fluxo de trabalho de Consultores de Soluções Técnicas. Este projeto automatiza tarefas repetitivas, padroniza notas de casos, agiliza o envio de e-mails e fornece scripts de atendimento em tempo real.

---

## ✨ Funcionalidades Principais

A ferramenta é dividida em módulos flutuantes independentes:

### 📝 Case Notes Assistant
O módulo mais robusto da suíte.
* **Fluxos Inteligentes:** Selecione entre BAU/LM e o idioma (PT/ES).
* **Templates Dinâmicos:** Preenchimento automático baseado no Status e Substatus.
* **Seleção de Tasks:** Interface visual com busca e contadores para múltiplas implementações.
* **Screenshots Organizados:** Gera campos para evidências de forma estruturada.
* **Compliance:** Verifica automaticamente a necessidade de Tag Support e Consentimento.
* **Limpeza Segura:** Insere a nota no editor do caso sem quebrar a formatação existente.

### 📧 Quick Email Assistant
Automação de comunicação com o cliente.
* **Modo Sniper:** Abre e foca no editor de e-mail automaticamente.
* **Templates Prontos:** NRP, Contato Inicial, Agendamento, etc.
* **Substituição de Variáveis:** Preenche automaticamente nome do cliente, URL e datas (com cálculo de dias úteis).

### 📞 Call Script Assistant
Guia de atendimento em tempo real.
* **Checklists:** Roteiros de início e fim de chamada (PT/ES/EN).
* **Interativo:** Marque os itens conforme fala com o cliente.

### 🔗 Quick Links & Feedback
* Acesso rápido a formulários internos (Ocorrências, Bugs).
* Links diretos para suporte (Ads, Analytics, Merchant).

---

## 🛠️ Instalação (Usuários)

Como esta ferramenta é um **Bookmarklet**, a instalação é simples e não requer extensões.

1.  Mostre a sua barra de favoritos (`Ctrl + Shift + B`).
2.  Clique com o botão direito na barra e selecione **"Adicionar página"**.
3.  **Nome:** `Case Wizard` (ou o que preferir).
4.  **URL:** Cole o código abaixo:

```javascript
javascript:(function(){var s=document.createElement('script');s.src='[https://lucastdcs.github.io/techsol_DialIn_AutoCopy/dist/bundle.js?t='+new](https://lucastdcs.github.io/techsol_DialIn_AutoCopy/dist/bundle.js?t='+new) Date().getTime();document.body.appendChild(s);})();