import styled from '@emotion/styled'
import { useState } from 'react'
import FormulaInput from './FormulaInput'
import { backRequest } from './request'
import { InlineMath } from 'react-katex'
import { Play, Table as TableIcon } from 'lucide-react'


const Card = styled.div`
	background: white;
	border-radius: 14px;
	padding: 20px;
	margin: 20px auto;
	max-width: 700px;
	border: 1px solid rgba(2, 6, 23, 0.04);
	box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
`

const Header = styled.h3`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 1.1rem;
	margin-bottom: 16px;
	color: #2563eb;
`

const InputsRow = styled.div`
	display: flex;
	gap: 16px;
	margin-bottom: 16px;
`

const Label = styled.label`
	flex: 1;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	color: #0f172a;
`

const Input = styled.input`
	height: 36px;
	padding: 4px 10px;
	margin-top: 4px;
	border-radius: 8px;
	border: 1px solid #ddd;
	font-family: inherit;
	font-size: 14px;
	outline: none;
	transition: all 0.2s;
	&:focus {
		border-color: #8f82ff;
		box-shadow: 0 0 0 2px rgba(143, 130, 255, 0.2);
	}
`

const Button = styled.button`
	height: 44px;
	border: none;
	border-radius: 10px;
	font-family: inherit;
	font-weight: 600;
	font-size: 14px;
	color: white;
	background: linear-gradient(90deg, #2563eb, #3b82f6);
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 0 18px;
	margin-top: 12px;
	transition: all 0.25s ease-out;
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
	}
`

const TableWrapper = styled.div`
	overflow-x: auto;
	margin-top: 20px;
	max-width: 100%;
`

const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	text-align: center;
	th,
	td {
		border: 1px solid #e2e8f0;
		padding: 6px 10px;
		font-family: monospace;
	}
	th {
		background: #f3f4f6;
		color: #111827;
	}
	tbody tr:hover {
		background: #f9fafb;
	}
`


function convertAnswerToTable(answer) {
	if (!answer) return null
	const xsCount = answer.vars.length
	const truthTable = answer.truthTable
	const fsCount = truthTable.length > 0 ? truthTable[0].length - xsCount : 0
	const lines = truthTable.map(row => ({
		xs: row.slice(0, xsCount),
		fs: row.slice(xsCount).map(f => f + ''),
	}))
	return { xsCount, fsCount, lines }
}


function FormulasInput({ onSetTable }) {
	const [funcsCountStr, setFuncsCountStr] = useState('2')
	const [formulas, setFormulas] = useState(['', ''])
	const [answer, setAnswer] = useState(null)

	const changeFuncsCount = e => {
		const newCount = +e.target.value
		setFuncsCountStr(e.target.value)
		if (isNaN(newCount)) return
		if (formulas.length < newCount) {
			setFormulas([...formulas, ...Array(newCount - formulas.length).fill('')])
		} else setFormulas(formulas.slice(0, newCount))
	}

	const setFormulaByIndex = (i, formula) => {
		const newFormulas = [...formulas]
		newFormulas[i] = formula
		setFormulas(newFormulas)
	}

	const formulaInputs = formulas.map((f, i) => (
		<FormulaInput
			key={i}
			formula={f}
			onSetFormula={val => setFormulaByIndex(i, val)}
		/>
	))

	const applyFormulas = () => {
		backRequest('CheckAndParseFormulas', formulas, res => {
			setAnswer(res)
			const table = convertAnswerToTable(res)
			onSetTable({ ...table, formulas })
		})
	}

	return (
		<Card>
			<Header>
				<TableIcon size={20} /> Ввод формул функций
			</Header>
			<InputsRow>
				<Label>
					Число функций:
					<Input
						type='number'
						min={2}
						max={10}
						value={funcsCountStr}
						onChange={changeFuncsCount}
					/>
				</Label>
			</InputsRow>
			{formulaInputs}
			<Button onClick={applyFormulas}>
				<Play size={16} /> Применить
			</Button>

			{answer && (
				<TableWrapper>
					<Table>
						<thead>
							<tr>
								{answer.vars.map((v, i) => (
									<th key={i}>
										<InlineMath
											math={v.length > 1 ? `${v[0]}_{${v.slice(1)}}` : v}
										/>
									</th>
								))}
								{Array(answer.formulasCount)
									.fill(0)
									.map((_, i) => (
										<th key={i}>
											<InlineMath math={`f_${i + 1}`} />
										</th>
									))}
							</tr>
						</thead>
						<tbody>
							{answer.truthTable.map((row, i) => (
								<tr key={i}>
									{row.map((v, j) => (
										<td key={j}>{v}</td>
									))}
								</tr>
							))}
						</tbody>
					</Table>
				</TableWrapper>
			)}
		</Card>
	)
}

export default FormulasInput
