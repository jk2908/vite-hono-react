import { useRouter } from '#/app/router'

export function Link({
	href,
	...props
}: { href: string } & React.ComponentPropsWithRef<'a'>) {
	const { push } = useRouter()

	return (
		<a
			{...props}
			href={href}
			onClick={e => {
				e.preventDefault()
				push(href)
			}}
		/>
	)
}
