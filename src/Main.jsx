import { useState } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Play, FileInput, FunctionSquare } from 'lucide-react'

import Answer from './Answer'
import ValuesInput from './ValuesInput'
import FormulasInput from './FormulasInput'
import { backRequest } from './request'

const PageWrap = styled('div')`
	font-family: Inter, system-ui, sans-serif;
	max-width: 1000px;
	margin: 0 auto;
	padding: 24px 20px 80px;
	color: #0f172a;
`

const Header = styled('header')`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 22px;
`

const Title = styled('h1')`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 1.4rem;
	font-weight: 700;
	background: linear-gradient(90deg, #2563eb, #0ea5e9);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`

const BackButton = styled(motion.button)`
	display: flex;
	align-items: center;
	gap: 6px;
	background: #eff6ff;
	border: none;
	border-radius: 8px;
	color: #2563eb;
	font-weight: 500;
	padding: 8px 14px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: #dbeafe;
		transform: translateX(-3px);
	}
`

const Card = styled(motion.section)`
	background: white;
	border-radius: 14px;
	padding: 18px 20px;
	margin-bottom: 24px;
	border: 1px solid rgba(2, 6, 23, 0.04);
	box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
`

const SectionTitle = styled('h2')`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 1.1rem;
	margin-bottom: 14px;
`

const SolveButton = styled(motion.button)`
	height: 46px;
	border: 0;
	border-radius: 10px;
	background: linear-gradient(90deg, #2563eb, #3b82f6);
	color: white;
	font-family: inherit;
	font-weight: 600;
	font-size: 1rem;
	padding: 0 22px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 10px;
	transition: all 0.25s ease-out;
	box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
	}
`

const ButtonArea = styled('div')`
	display: flex;
	justify-content: center;
	margin-top: 16px;
`

function Main({ inputType, onBack }) {
	const [table, setTable] = useState(null)
	const [answer, setAnswer] = useState(null)

	const solve = () => {
		if (!table) return

		for (let i = 0; i < table.lines.length; i++) {
			const line = table.lines[i]
			for (let j = 0; j < line.fs.length; j++) {
				const f = line.fs[j]
				if (f !== '0' && f !== '1') {
					alert(
						`Для набора (${line.xs.join(
							' '
						)}) задано некорректное значение функции f${j + 1}`
					)
					return
				}
			}
		}

		const fs = Array.from({ length: table.fsCount }, () => [])
		for (const line of table.lines) {
			for (let j = 0; j < line.fs.length; j++) {
				fs[j].push(+line.fs[j])
			}
		}

		const payload = {
			paramsCount: table.xsCount,
			fs: fs,
			fsFormulas: table.formulas,
			reduceOutput: true,
		}

		backRequest('Solve', payload, res => {
			setAnswer(res)
		})
	}

	return (
		<PageWrap>
			<Header>
				<Title>
					<Brain size={24} /> Обоснование полноты системы булевых функций
				</Title>
				<BackButton
					whileTap={{ scale: 0.95 }}
					onClick={onBack}
					title='Вернуться назад'
				>
					<ArrowLeft size={16} /> Назад
				</BackButton>
			</Header>

			<Card
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<SectionTitle>
					{inputType === 'input-by-values' ? (
						<FileInput size={20} color='#2563eb' />
					) : (
						<FunctionSquare size={20} color='#2563eb' />
					)}
					Ввод данных
				</SectionTitle>

				{inputType === 'input-by-values' ? (
					<ValuesInput table={table} onSetTable={setTable} />
				) : (
					<FormulasInput onSetTable={setTable} />
				)}

				{table && (
					<ButtonArea>
						<SolveButton
							onClick={solve}
							whileTap={{ scale: 0.96 }}
							title='Запустить вычисления'
						>
							<Play size={18} /> Обосновать полноту системы функций
						</SolveButton>
					</ButtonArea>
				)}
			</Card>

			{answer && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
				>
					<Answer answer={answer} />
				</motion.div>
			)}
		</PageWrap>
	)
}

export default Main
