# Calculadora de IMC — React + Vite

Calculadora de Índice de Massa Corporal desenvolvida com **React 18** e **Vite**.

## 📁 Estrutura

```
imc-react/
├── src/
│   ├── App.jsx      → componente principal com lógica do IMC
│   ├── App.css      → estilos do componente
│   ├── main.jsx     → ponto de entrada React
│   └── index.css    → estilos globais
├── index.html       → HTML base do Vite
├── vite.config.js   → configuração do Vite
├── package.json     → dependências
├── .gitignore
└── README.md
```

## ▶️ Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Build para produção
npm run build
```

## ⚙️ Funcionalidades

- Campos de **altura** (cm) e **peso** (kg)
- Cálculo do IMC em tempo real com `useMemo`
- Classificação automática conforme tabela da **OMS**
- Barra de progresso visual
- Tabela completa com destaque na faixa atual
