export function getImageUrl(imagePath: string | null | undefined): string | null {
    const path = imagePath?.trim();
    if (!path) return null;

    if (/^https?:\/\//i.test(path)) return path;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
    if (!apiBaseUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL não está configurada");
    }

    const apiOrigin = new URL(apiBaseUrl).origin;
    return new URL(path, `${apiOrigin}/`).toString();
}
