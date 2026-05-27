/**
 * Resolves an image path to its full URL.
 * If the path is relative (starts with /), it prepends the R2 public URL if available.
 */
export function resolveImageUrl(path: string | null | undefined): string | null {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
        return path;
    }

    if (path.startsWith("/")) {
        const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || "";
        return `${baseUrl}${path}`;
    }

    return path;
}
