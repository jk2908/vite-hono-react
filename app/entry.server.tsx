import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
// @ts-expect-error
import { renderToReadableStream } from 'react-dom/server.browser'

import { Shell } from '#/app/shell'

const app = new Hono()
export type App = typeof app

app.use('/assets/*', serveStatic({ root: './dist' }))

app.get('*', async c => {
	const stream = await renderToReadableStream(<Shell route={c.req.path} />)

	return c.body(stream, {
		headers: {
			'Content-Type': 'text/html',
			'Transfer-Encoding': 'chunked',
		},
	})
})

export default app
