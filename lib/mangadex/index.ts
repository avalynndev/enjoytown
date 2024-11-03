export async function fetchManga(id: string) {
    const res = await fetch(`https://api.mangadex.dev/at-home/server/${id}`, {
        next: { revalidate: 21600 },
    });
    const data = await res.json();
    return data;
}