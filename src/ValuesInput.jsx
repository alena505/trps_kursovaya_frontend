
import styled from '@emotion/styled'
import { useState } from 'react'
import { Play, Table as TableIcon } from 'lucide-react'


function changeVectorToNext(vec) {
	let where0 = vec.length - 1
	while (where0 >= 0 && vec[where0] === 1) {
		where0--
	}
	if (where0 < 0) return
	vec[where0] = 1
	for (let i = where0 + 1; i < vec.length; i++) vec[i] = 0
}


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

const CellInput = styled.input`
	width: 50px;
	padding: 4px;
	text-align: center;
	border-radius: 6px;
	border: 1px solid #ddd;
	outline: none;
	font-family: monospace;
	&:focus {
		border-color: #8f82ff;
		box-shadow: 0 0 0 2px rgba(143, 130, 255, 0.2);
	}
`

// ------------------- COMPONENT -------------------
function ValuesInput({ table, onSetTable }) {
	const [paramsCountStr, setParamsCountStr] = useState('3')
	const [funcsCountStr, setFuncsCountStr] = useState('2')

	const genTable = () => {
		const paramsCount = +paramsCountStr
		const funcsCount = +funcsCountStr
		const lines = []
		const linesCount = 2 ** paramsCount
		const xs = Array(paramsCount).fill(0)
		const fs = Array(funcsCount).fill('0')

		for (let i = 0; i < linesCount; i++) {
			lines.push({
				xs: xs.slice(),
				fs: fs.slice(),
			})
			changeVectorToNext(xs)
		}

		onSetTable({
			xsCount: paramsCount,
			fsCount: funcsCount,
			lines,
			formulas: null,
		})
	}

	const changeFuncValue = (lineIndex, fIndex, newValue) => {
		if (newValue !== '0' && newValue !== '1' && newValue !== '') return

		const lines = [...table.lines]
		lines[lineIndex] = {
			...lines[lineIndex],
			fs: [...lines[lineIndex].fs],
		}
		lines[lineIndex].fs[fIndex] = newValue

		onSetTable({
			...table,
			lines,
		})
	}

	return (
		<Card>
			<Header>
				<TableIcon size={20} /> Ввод значений функций
			</Header>
			<InputsRow>
				<Label>
					Число параметров:
					<Input
						type='number'
						min={1}
						max={10}
						value={paramsCountStr}
						onChange={e => setParamsCountStr(e.target.value)}
					/>
				</Label>
				<Label>
					Число функций:
					<Input
						type='number'
						min={2}
						max={10}
						value={funcsCountStr}
						onChange={e => setFuncsCountStr(e.target.value)}
					/>
				</Label>
			</InputsRow>
			<Button onClick={genTable}>
				<Play size={16} /> Сгенерировать таблицу
			</Button>

			{table && (
				<TableWrapper>
					<Table>
						<thead>
							<tr>
								{[...Array(table.xsCount).keys()].map(i => (
									<th key={i}>
										x<sub>{i + 1}</sub>
									</th>
								))}
								{[...Array(table.fsCount).keys()].map(i => (
									<th key={i}>
										f<sub>{i + 1}</sub>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{table.lines.map((line, lineIndex) => (
								<tr key={lineIndex}>
									{line.xs.map((x, i) => (
										<td key={i}>{x}</td>
									))}
									{line.fs.map((f, i) => (
										<td key={i}>
											<CellInput
												type='number'
												min={0}
												max={1}
												value={f}
												onChange={e =>
													changeFuncValue(lineIndex, i, e.target.value)
												}
											/>
										</td>
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

export default ValuesInput
