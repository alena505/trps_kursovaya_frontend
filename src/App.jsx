import 'katex/dist/katex.min.css'
import { useState } from 'react'
import Menu from './Menu'
import Main from './Main'

function App() {
	const [page, setPage] = useState('menu')
	const [inputType, setInputType] = useState('input-by-values')

	const gotoMain = inputType => {
		setInputType(inputType)
		setPage('main')
	}

	if (page == 'menu') {
		return <Menu onGotoMain={gotoMain} />
	}

	return <Main inputType={inputType} onBack={() => setPage('menu')} />
}

export default App
