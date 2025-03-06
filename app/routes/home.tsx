import { useState } from 'react'

export default function Home() {
	const [count, setCount] = useState(0)

	return (
		<>
			<title>hono-vite-react</title>

			<button onClick={() => setCount(c => ++c)} type="button">{count}</button>
		</>
	)
}
