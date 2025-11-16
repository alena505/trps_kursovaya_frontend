import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { InlineMath } from 'react-katex'
import {
	Brain,
	Table2,
	CheckCircle,
	XCircle,
	Layers,
	Zap,
	Calculator,
	Activity,
} from 'lucide-react'
import { motion } from 'framer-motion'



const Wrap = styled('article')`
	font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial;
	color: #0f172a;
	max-width: 980px;
	margin: 18px auto;
	padding: 20px;
	box-sizing: border-box;
`

const Header = styled('header')`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 14px;
`

const Title = styled('h1')`
	font-size: 1.25rem;
	margin: 0;
	display: flex;
	gap: 10px;
	align-items: center;
`

const Band = styled('div')`
	background: linear-gradient(
		90deg,
		rgba(59, 130, 246, 0.12),
		rgba(96, 165, 250, 0.06)
	);
	padding: 12px 14px;
	border-radius: 10px;
	margin-bottom: 16px;
	display: flex;
	gap: 12px;
	align-items: center;
	font-size: 0.98rem;
`

const SectionTitle = styled('h2')`
	display: flex;
	gap: 10px;
	align-items: center;
	font-size: 1.05rem;
	margin: 18px 0 10px;
`

const Card = styled(motion.section)`
	background: white;
	border-radius: 12px;
	padding: 12px 14px;
	margin-bottom: 12px;
	border: 1px solid rgba(2, 6, 23, 0.04);
	box-shadow: 0 6px 18px rgba(2, 6, 23, 0.04);
`

const MathRow = styled('div')`
	background: #f8fafc;
	border-left: 4px solid #7dd3fc;
	padding: 10px;
	border-radius: 8px;
	margin: 8px 0;
	display: flex;
	align-items: center;
	gap: 8px;
`

const Small = styled('small')`
	color: rgba(2, 6, 23, 0.6);
	display: block;
	margin-top: 6px;
`

const TableWrap = styled('div')`
	overflow-x: auto;
	border-radius: 10px;
	padding: 8px;
	background: linear-gradient(
		180deg,
		rgba(224, 242, 254, 0.6),
		rgba(255, 255, 255, 0.4)
	);
`

const StyledTable = styled('table')`
	width: 100%;
	border-collapse: collapse;
	min-width: 680px;
`

const Th = styled('th')`
	padding: 10px 12px;
	text-align: left;
	font-weight: 700;
	border-bottom: 2px solid rgba(2, 6, 23, 0.06);
	background: linear-gradient(
		90deg,
		rgba(59, 130, 246, 0.06),
		rgba(34, 197, 94, 0.02)
	);
`

const Td = styled('td')`
	padding: 10px 12px;
	vertical-align: top;
	border-bottom: 1px dashed rgba(2, 6, 23, 0.04);
`

const RowHover = styled('tr')`
	transition: background 160ms ease;
	&:hover {
		background: rgba(59, 130, 246, 0.04);
	}
`

const Badge = styled('span')`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 6px 10px;
	border-radius: 999px;
	font-weight: 600;
	font-size: 0.88rem;
`

/* цветовые акценты для классов */
const classColors = {
	K0: 'linear-gradient(90deg,#fee2e2,#fff)', 
	K1: 'linear-gradient(90deg,#ecfdf5,#fff)', 
	KM: 'linear-gradient(90deg,#eff6ff,#fff)', 
	KS: 'linear-gradient(90deg,#f5f3ff,#fff)', 
	KL: 'linear-gradient(90deg,#fff7ed,#fff)', 
}

/* иконки/лейблы для классов */
const ClassIcon = {
	K0: <XCircle size={16} color='#ef4444' />,
	K1: <CheckCircle size={16} color='#16a34a' />,
	KM: <Layers size={16} color='#2563eb' />,
	KS: <Zap size={16} color='#7c3aed' />,
	KL: <Calculator size={16} color='#f97316' />,
}


const safe = (v, fallback = null) =>
	v === undefined || v === null ? fallback : v


export default function Answer({ answer }) {
	if (!answer) return null



	const getK0Result = results => {
		if (!results) return null
		return results.map((res, idx) => {
			const k0 = safe(res.K0Result, {})
			const valueOnZeros = safe(k0.ValueOnZeros, '')
			const belongsToK0 = Boolean(k0.BelongsToClass)
			const zeros = Array(answer.xsCount).fill(0).join(', ')
			const contains = belongsToK0 ? '\\in' : '\\notin'
			return (
				<Card
					key={`k0-${idx}`}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<MathRow>
						<InlineMath
							math={`f_${
								idx + 1
							}(${zeros}) = ${valueOnZeros}, \\text{ следовательно } f_${
								idx + 1
							} ${contains} K_0`}
						/>
					</MathRow>
				</Card>
			)
		})
	}

	const getK1Result = results => {
		if (!results) return null
		return results.map((res, idx) => {
			const k1 = safe(res.K1Result, {})
			const valueOnOnes = safe(k1.ValueOnOnes, '')
			const belongsToK1 = Boolean(k1.BelongsToClass)
			const ones = Array(answer.xsCount).fill(1).join(', ')
			const contains = belongsToK1 ? '\\in' : '\\notin'
			return (
				<Card
					key={`k1-${idx}`}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<MathRow>
						<InlineMath
							math={`f_${
								idx + 1
							}(${ones}) = ${valueOnOnes}, \\text{ следовательно } f_${
								idx + 1
							} ${contains} K_1`}
						/>
					</MathRow>
				</Card>
			)
		})
	}

	const getKMResult = results => {
		if (!results) return null
		return results.map((res, idx) => {
			const km = safe(res.KMResult, {})
			const belongsToKM = Boolean(km.BelongsToClass)
			const contains = belongsToKM ? '\\in' : '\\notin'
			return (
				<Card
					key={`km-${idx}`}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{Array.isArray(km.Statements) &&
						km.Statements.map((stat, sIdx) => {
							const sigma1 = '(' + (stat.Sigma1 || []).join(', ') + ')'
							const sigma2 = '(' + (stat.Sigma2 || []).join(', ') + ')'
							const truth = stat.F1LessOrEqualF2 ? 'верно' : 'не верно'
							return (
								<MathRow key={`km-st-${idx}-${sIdx}`}>
									<InlineMath
										math={`${sigma1} \\leq ${sigma2}: f_${
											idx + 1
										}${sigma1} \\leq f_${
											idx + 1
										}${sigma2} \\text{ (${truth}) }`}
									/>
								</MathRow>
							)
						})}
					<div style={{ marginTop: 8 }}>
						<InlineMath math={`f_${idx + 1} ${contains} K_m`} />
						<Small>
							{belongsToKM
								? ' т.к. для всех случаев утверждения справедливы значения протиположны'
								: ', т.к. хотя бы в одном из случаев значения не противоположныдля одного из случаев неверно'}
						</Small>
					</div>
				</Card>
			)
		})
	}

	const getKSResult = results => {
		if (!results) return null
		return results.map((res, idx) => {
			const ks = safe(res.KSResult, {})
			const belongsToKS = Boolean(ks.BelongsToClass)
			const contains = belongsToKS ? '\\in' : '\\notin'
			return (
				<Card
					key={`ks-${idx}`}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{Array.isArray(ks.Statements) &&
						ks.Statements.map((stat, sIdx) => {
							const sigma1 = '(' + (stat.Sigma1 || []).join(', ') + ')'
							const sigma2 = '(' + (stat.Sigma2 || []).join(', ') + ')'
							const truth = stat.F1IsOppositeToF2
								? 'противоположны'
								: 'не противоположны'
							return (
								<MathRow key={`ks-st-${idx}-${sIdx}`}>
									<InlineMath
										math={`${sigma1} \\leftrightarrow ${sigma2}: \\text{ значения ${truth} }`}
									/>
								</MathRow>
							)
						})}
					<div style={{ marginTop: 8 }}>
						<InlineMath math={`f_${idx + 1} ${contains} K_s`} />
						{!belongsToKS && (
							<Small>
								{belongsToKS
									? ' т.к. во всех случаях значения протиположны'
									: ', т.к. хотя бы в одном из случаев значения не противоположны'}
							</Small>
						)}
					</div>
				</Card>
			)
		})
	}

	const getKLResultTriangleMethod = results => {
		if (!results) return null
		return results.map((res, idx) => {
			const kl = safe(res.KLResult, {})
			const tria = safe(kl.TriangleMethod, {})
			const triangle = Array.isArray(tria.Triangle) ? tria.Triangle : []
			const zheg = Array.isArray(tria.ZhegalkinPolynomial)
				? tria.ZhegalkinPolynomial
				: []
			const contains = tria.BelongsToClass ? '\\in' : '\\notin'

			// triangle rows rendering
			const triangleTable = (
				<table
					style={{
						borderCollapse: 'collapse',
						marginTop: 8,
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Roboto Mono',
					}}
				>
					<tbody>
						{triangle.map((row, rIdx) => (
							<tr key={`tri-${idx}-${rIdx}`}>
								{row.map((cell, cIdx) => (
									<td
										key={`tri-cell-${idx}-${rIdx}-${cIdx}`}
										style={{
											padding: 6,
											border: '1px solid rgba(2,6,23,0.04)',
											textAlign: 'center',
										}}
									>
										{cIdx < rIdx ? '' : String(cell)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)

			
			const zhegItems = zheg.map((mon, mIdx) => {
				const paramsIndices = Array.isArray(mon.ParamsIndices)
					? mon.ParamsIndices
					: []
				const indices = paramsIndices.reduce(
					(acc, v, i) => (v ? acc.concat(i + 1) : acc),
					[]
				)
				if (indices.length === 0) indices.push(0)
				const val = mon.Present ? 1 : 0
				const has = mon.Present ? 'есть' : 'нет'
				return (
					<li key={`zheg-${idx}-${mIdx}`} style={{ marginBottom: 6 }}>
						<InlineMath
							math={`a_{${indices.join(
								''
							)}} = ${val} \\implies \\text{${has} } ${mon.Value}`}
						/>
					</li>
				)
			})

			
			const polynomial = (() => {
				const xs = Array(answer.xsCount)
					.fill(0)
					.map((_, i) => `x_${i + 1}`)
					.join(', ')
				let poly = `f_${idx + 1}(${xs}) = `
				let first = true
				for (const mon of zheg) {
					if (mon.Present) {
						if (!first) poly += ' \\oplus'
						first = false
						poly += ` ${mon.Value}`
					}
				}
				if (first) poly += '0'
				return poly
			})()

			return (
				<Card
					key={`kl-tr-${idx}`}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div
						style={{
							display: 'flex',
							gap: 12,
							alignItems: 'center',
							marginBottom: 8,
						}}
					>
						<strong>
							Функция <InlineMath math={`f_${idx + 1}`} />
						</strong>
						<Small>Метод: Треугольник Паскаля</Small>
					</div>

					<div>
						<Small>Треугольник Паскаля (сумма по модулю 2):</Small>
						<div>{triangleTable}</div>
					</div>

					<div style={{ marginTop: 8 }}>
						<Small>Коэффициенты полинома Жегалкина:</Small>
						<ul style={{ marginTop: 6, paddingLeft: 18 }}>{zhegItems}</ul>
					</div>

					<div style={{ marginTop: 8 }}>
						<Small>Полином Жегалкина:</Small>
						<div style={{ marginTop: 6 }}>
							<InlineMath math={polynomial} />
						</div>
					</div>

					<div style={{ marginTop: 10 }}>
						<InlineMath math={`f_${idx + 1} ${contains} K_L`} />
						<Small>
							{tria.BelongsToClass
								? ', т.к. нет ни одного монома с несколькими аргументами.'
								: ', т.к. есть хотя бы 1 моном с несколькими аргументами.'}
						</Small>
					</div>
				</Card>
			)
		})
	}

	const expressionChangesToHtml = (expressionChanges = []) => {
		if (!expressionChanges || expressionChanges.length === 0) return null
		return expressionChanges.map((c, ind) => (
			<div key={`expr-${ind}`} style={{ marginBottom: 6 }}>
				<InlineMath math={c.Expression} /> <Small>({c.Reason})</Small>
			</div>
		))
	}

	const getKLResultAnalyticalMethod = results => {
		if (!results) return null
		return results.map((res, idx) => {
			const ana = safe(res.KLResult && res.KLResult.AnalyticalMethod, null)
			if (!ana) return null
			const contains = ana.BelongsToClass ? '\\in' : '\\notin'
			return (
				<Card
					key={`kl-ana-${idx}`}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
						<strong>
							Функция <InlineMath math={`f_${idx + 1}`} />
						</strong>
						<Small>Аналитический метод</Small>
					</div>

					<div style={{ marginTop: 8 }}>
						<h4 style={{ margin: '8px 0 6px' }}>Исходная формула функции</h4>
						<div className='math-original'>
							<InlineMath math={ana.SourceExpression} />
						</div>
					</div>

					{ana.RevealingComplexOperators &&
						ana.RevealingComplexOperators.length > 0 && (
							<>
								<h4 style={{ margin: '12px 0 6px' }}>
									Упрощаем выражение, оставляя только И, ИЛИ, НЕ
								</h4>
								{expressionChangesToHtml(ana.RevealingComplexOperators)}
							</>
						)}

					<h4 style={{ margin: '12px 0 6px' }}>Преобразуем в ДНФ</h4>
					{ana.DnfRetrieving && ana.DnfRetrieving.length > 0 ? (
						expressionChangesToHtml(ana.DnfRetrieving)
					) : (
						<div>Уже в ДНФ</div>
					)}

					<h4 style={{ margin: '12px 0 6px' }}>Преобразуем в СДНФ</h4>
					{expressionChangesToHtml(ana.PdnfRetrieving)}

					<h4 style={{ margin: '12px 0 6px' }}>
						Преобразуем в АНФ (полином Жегалкина)
					</h4>
					{expressionChangesToHtml(ana.AnfRetrieving)}

					<div style={{ marginTop: 8 }}>
						<InlineMath math={`f_${idx + 1} ${contains} K_L`} />
						<Small>
							{ana.BelongsToClass
								? ', т.к. нет ни одного монома с несколькими аргументами.'
								: ', т.к. есть хотя бы 1 моном с несколькими аргументами.'}
						</Small>
					</div>
				</Card>
			)
		})
	}

	const getFinalTable = results => {
		if (!results) return null
		return results.map((r, i) => {
			const belongsToK0 = r.K0Result && r.K0Result.BelongsToClass
			const belongsToK1 = r.K1Result && r.K1Result.BelongsToClass
			const belongsToKM = r.KMResult && r.KMResult.BelongsToClass
			const belongsToKS = r.KSResult && r.KSResult.BelongsToClass
			const belongsToKL =
				r.KLResult &&
				r.KLResult.TriangleMethod &&
				r.KLResult.TriangleMethod.BelongsToClass
			const sign = b =>
				b ? (
					<CheckCircle size={18} color='#16a34a' />
				) : (
					<XCircle size={18} color='#ef4444' />
				)
			return (
				<RowHover key={`final-${i}`}>
					<Td>
						<InlineMath math={`f_${i + 1}`} />
					</Td>
					<Td>{sign(belongsToK0)}</Td>
					<Td>{sign(belongsToK1)}</Td>
					<Td>{sign(belongsToKM)}</Td>
					<Td>{sign(belongsToKS)}</Td>
					<Td>{sign(belongsToKL)}</Td>
				</RowHover>
			)
		})
	}

	const getClassesAllFuncsBelongsTo = answerObj => {
		const propToName = {
			hasAtLeast1FuncNotBelongToK0: 'K0',
			hasAtLeast1FuncNotBelongToK1: 'K1',
			hasAtLeast1FuncNotBelongToKM: 'KM',
			hasAtLeast1FuncNotBelongToKS: 'KS',
			hasAtLeast1FuncNotBelongToKL: 'KL',
		}
		return Object.keys(propToName)
			.filter(prop => !answerObj[prop])
			.map(prop => propToName[prop])
			.join(', ')
	}



	return (
		<Wrap>
			<Header>
				<Title>
					<Brain size={22} color='#0b5cff' />
					Отчёт по классам Поста
				</Title>
			</Header>

			<Band>
				<Table2 size={18} color='#0369a1' />
				{answer.systemIsComplete ? (
					<span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
						<Badge style={{ background: classColors.K1 }}>
							<CheckCircle size={14} color='#16a34a' /> Система полна
						</Badge>
						<span style={{ color: 'rgba(2,6,23,0.7)' }}>
							Для каждого класса найденa функция, не принадлежащая ему.
						</span>
					</span>
				) : (
					<span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
						<Badge style={{ background: classColors.K0 }}>
							<XCircle size={14} color='#ef4444' /> Система не полна
						</Badge>
						<span style={{ color: 'rgba(2,6,23,0.7)' }}>
							Все функции принадлежат классам:{' '}
							{getClassesAllFuncsBelongsTo(answer)} (в этих столбцах все плюсы).
						</span>
					</span>
				)}
			</Band>

			<SectionTitle>
				<Table2 size={18} color='#0ea5e9' /> Итоговая таблица принадлежности
				функций
			</SectionTitle>
			<TableWrap>
				<StyledTable
					role='table'
					aria-label='Итоговая таблица принадлежности функций'
				>
					<thead>
						<tr>
							<Th>Функция</Th>
							<Th>{ClassIcon.K0} K_0</Th>
							<Th>{ClassIcon.K1} K_1</Th>
							<Th>{ClassIcon.KM} K_M</Th>
							<Th>{ClassIcon.KS} K_S</Th>
							<Th>{ClassIcon.KL} K_L</Th>
						</tr>
					</thead>
					<tbody>{getFinalTable(answer.results)}</tbody>
				</StyledTable>
			</TableWrap>

			<SectionTitle style={{ marginTop: 20 }}>
				<Layers size={18} color='#2563eb' /> Решение
			</SectionTitle>

			{/* K0 */}
			<div>
				<SectionTitle style={{ fontSize: '1rem' }}>
					<XCircle size={16} color='#ef4444' /> Класс <InlineMath math='K_0' />
				</SectionTitle>
				{getK0Result(answer.results)}
			</div>

			{/* K1 */}
			<div>
				<SectionTitle style={{ fontSize: '1rem' }}>
					<CheckCircle size={16} color='#16a34a' /> Класс{' '}
					<InlineMath math='K_1' />
				</SectionTitle>
				{getK1Result(answer.results)}
			</div>

			{/* KM */}
			<div>
				<SectionTitle style={{ fontSize: '1rem' }}>
					<Layers size={16} color='#2563eb' /> Класс <InlineMath math='K_m' />
				</SectionTitle>
				{getKMResult(answer.results)}
			</div>

			{/* KS */}
			<div>
				<SectionTitle style={{ fontSize: '1rem' }}>
					<Zap size={16} color='#7c3aed' /> Класс <InlineMath math='K_s' />
				</SectionTitle>
				{getKSResult(answer.results)}
			</div>

			{/* KL */}
			<div>
				<SectionTitle style={{ fontSize: '1rem' }}>
					<Calculator size={16} color='#f97316' /> Класс{' '}
					<InlineMath math='K_L' />
				</SectionTitle>
				<Small>Метод "Треугольник Паскаля"</Small>
				{getKLResultTriangleMethod(answer.results)}
			</div>

			{/* Аналитический метод (если есть) */}
			{answer.results &&
				answer.results.length > 0 &&
				answer.results[0].KLResult &&
				answer.results[0].KLResult.AnalyticalMethod && (
					<>
						<SectionTitle style={{ marginTop: 14 }}>
							<Activity size={18} color='#0b5cff' /> Аналитический метод
						</SectionTitle>
						{getKLResultAnalyticalMethod(answer.results)}
					</>
				)}
		</Wrap>
	)
}
