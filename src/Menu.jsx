import styled from '@emotion/styled'
import { Layout, List } from 'lucide-react'

const Card = styled.div`
	background: white;
	border-radius: 14px;
	padding: 30px 20px;
	max-width: 500px;
	margin: 40px auto;
	border: 1px solid rgba(2, 6, 23, 0.04);
	box-shadow: 0 8px 18px rgba(2, 6, 23, 0.06);
	text-align: center;
`
const PageWrap = styled('div')`
	font-family: Inter, system-ui, sans-serif;
	max-width: 1000px;
	margin: 0 auto;
	padding: 24px 20px 80px;
	color: #0f172a;
`
const Title = styled('h1')`
	margin-bottom: 60px;
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 1.4rem;
	font-weight: 700;
	background: linear-gradient(90deg, #2563eb, #0ea5e9);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`

const ButtonsWrapper = styled.div`
	padding-top: 40px;
	display: flex;
	flex-direction: column;
	gap: 17px;
`
const Button = styled.button`
	margin: 0;
	padding: 0px 18px;
	height: 48px;
	font-size: 14px;
	font-weight: 600;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	background: linear-gradient(90deg, #2563eb, #3b82f6);
	display: flex;
	align-items: center;
	gap: 6px;
	transition: all 0.25s;
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
	}
`

function Menu({ onGotoMain }) {
	return (
		<PageWrap>
			<Card>
				<Title>Обоснование полноты системы булевых функций</Title>
				<div>Выберите способ ввода функций:</div>
				<ButtonsWrapper>
					<Button onClick={() => onGotoMain('input-by-values')}>
						<List size={16} /> Ввод значений функций
					</Button>
					<Button onClick={() => onGotoMain('input-by-formulas')}>
						<Layout size={16} /> Ввод формул функций
					</Button>
				</ButtonsWrapper>
			</Card>
		</PageWrap>
	)
}

export default Menu
