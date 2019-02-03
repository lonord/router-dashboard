export function convertItemName(name: string): string {
	if (!name) {
		return ''
	}
	return name.toLowerCase().replace(/\s+/g, '+')
}
