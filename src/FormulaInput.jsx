import styled from '@emotion/styled'
import { useRef } from 'react'
import { InlineMath } from 'react-katex'

const Input = styled.input`
	height: 48px;
	width: 100%;
	max-width: 600px;
	display: block;
	margin-bottom: 10px;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 0 12px;
	font-family: monospace;
	font-size: 16px;
	outline: none;
	&:focus {
		border-color: #8f82ff;
		box-shadow: 0 0 0 2px rgba(143, 130, 255, 0.2);
	}
`

const KeyboardDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 40px);
	grid-auto-rows: 40px;
	gap: 6px;
	margin-bottom: 16px;
`

const KeyboardCell = styled.div`
	background: #dff2ff;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	user-select: none;
	transition: 0.2s;
	&:hover {
		background: #cdebff;
	}
`

const keyboardData = [
	'a',
	'b',
	'c',
	'd',
	'x1',
	'x2',
	'x3',
	'(',
	')',
	'∧',
	'∨',
	'¬',
	'→',
	'↔',
	'⊕',
	'↓',
	'↑',
	'↛',
	'↮',
]


function FormulaInput({ formula, onSetFormula }) {
	const inputRef = useRef(null)

	const addSymbol = symbol => {
		let idx = formula.length
		if (inputRef.current && inputRef.current.selectionStart >= 0) {
			idx = inputRef.current.selectionStart
		}
		const newFormula = formula.slice(0, idx) + symbol + formula.slice(idx)
		onSetFormula(newFormula)
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus()
				const caret = idx + symbol.length
				inputRef.current.selectionStart = caret
				inputRef.current.selectionEnd = caret
			}
		}, 0)
	}

	return (
		<>
			<Input
				ref={inputRef}
				type='text'
				value={formula}
				onChange={e => onSetFormula(e.target.value)}
			/>
			<KeyboardDiv>
				{keyboardData.map((s, i) => (
					<KeyboardCell key={i} title={s} onClick={() => addSymbol(s)}>
						<InlineMath math={s} />
					</KeyboardCell>
				))}
			</KeyboardDiv>
		</>
	)
}

export default FormulaInput
