import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { Shell } from '#/app/shell'

hydrateRoot(
	document,
	<StrictMode>
		<Shell route={window.location.pathname} />
	</StrictMode>,
)
