import { useState, useMemo } from 'react'
import './App.css'

// ── Tabela de classificação IMC (OMS) ──
const TABELA = [
  { key: 'magro',      label: 'Abaixo do peso', range: '< 18,5',      min: 0,    max: 18.5,     cor: '#3b82f6', bg: '#eff6ff', classe: 'result--magro'      },
  { key: 'normal',     label: 'Peso normal',    range: '18,5 – 24,9', min: 18.5, max: 25,       cor: '#22c55e', bg: '#f0fdf4', classe: 'result--normal'     },
  { key: 'sobrepeso',  label: 'Sobrepeso',      range: '25,0 – 29,9', min: 25,   max: 30,       cor: '#f59e0b', bg: '#fffbeb', classe: 'result--sobrepeso'  },
  { key: 'obesidade1', label: 'Obesidade I',    range: '30,0 – 34,9', min: 30,   max: 35,       cor: '#f97316', bg: '#fff7ed', classe: 'result--obesidade1' },
  { key: 'obesidade2', label: 'Obesidade II',   range: '35,0 – 39,9', min: 35,   max: 40,       cor: '#ef4444', bg: '#fef2f2', classe: 'result--obesidade2' },
  { key: 'obesidade3', label: 'Obesidade III',  range: '≥ 40,0',      min: 40,   max: Infinity, cor: '#a855f7', bg: '#fdf2f8', classe: 'result--obesidade3' },
]

function classificarIMC(imc) {
  return TABELA.find(t => imc >= t.min && imc < t.max) || null
}

function calcularProgresso(imc) {
  return Math.min(Math.max((imc / 45) * 100, 0), 100)
}

function App() {
  const [altura, setAltura] = useState('')
  const [peso,   setPeso]   = useState('')

  // ── Calcula IMC automaticamente com useMemo ──
  const imc = useMemo(() => {
    const a = parseFloat(altura)
    const p = parseFloat(peso)
    if (!a || !p || a <= 0 || p <= 0) return null
    const alturaM = a / 100
    return p / (alturaM * alturaM)
  }, [altura, peso])

  const classificacao = imc ? classificarIMC(imc) : null
  const progresso     = imc ? calcularProgresso(imc) : 0

  return (
    <div className="card">

      {/* Header */}
      <div className="card-header">
        <h1>Calculadora de IMC</h1>
        <p>Índice de Massa Corporal · React + Vite</p>
      </div>

      <div className="card-body">

        {/* Campo Altura */}
        <div className="field">
          <label htmlFor="altura">Altura</label>
          <div className="input-wrap">
            <input
              id="altura"
              type="number"
              placeholder="Ex: 175"
              value={altura}
              onChange={e => setAltura(e.target.value)}
              min="1"
              max="300"
            />
            <span className="input-unit">cm</span>
          </div>
          <span className="input-hint">Digite em centímetros (ex: 175)</span>
        </div>

        {/* Campo Peso */}
        <div className="field">
          <label htmlFor="peso">Peso</label>
          <div className="input-wrap">
            <input
              id="peso"
              type="number"
              placeholder="Ex: 70"
              value={peso}
              onChange={e => setPeso(e.target.value)}
              min="1"
              max="500"
            />
            <span className="input-unit">kg</span>
          </div>
          <span className="input-hint">Digite em quilogramas (ex: 70)</span>
        </div>

        {/* Resultado */}
        <div className={`result ${classificacao ? classificacao.classe : 'result--empty'}`}>
          <p className="result__label">Seu IMC</p>
          <div className="result__value">
            {imc ? imc.toFixed(1) : '—'}
          </div>
          <div className="result__class">
            {classificacao ? classificacao.label : 'Preencha os campos acima'}
          </div>
          <div className="result__desc">
            {classificacao
              ? `Faixa: ${classificacao.range} kg/m²`
              : 'O resultado aparecerá aqui automaticamente'}
          </div>

          {/* Barra de progresso */}
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{
                width: `${progresso}%`,
                background: classificacao ? classificacao.cor : '#e2e8f0'
              }}
            />
          </div>
        </div>

        {/* Tabela de classificação */}
        <div className="table-section">
          <p className="table-title">Tabela de Classificação (OMS)</p>
          {TABELA.map(item => {
            const ativo = classificacao?.key === item.key
            return (
              <div
                key={item.key}
                className={`table-row ${ativo ? 'table-row--active' : ''}`}
                style={{ background: ativo ? item.bg : 'transparent' }}
              >
                <div className="table-row__left">
                  <div className="dot" style={{ background: item.cor }} />
                  {item.label}
                </div>
                <span className="table-row__range">{item.range}</span>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default App
