const base = 'https://api.riftcodex.com';

export async function search(name) {
    const cardQuery = '/cards/name?fuzzy=' + encodeURIComponent(name);
    const res = await fetch(base + cardQuery);
    //console.log(await res.json())
    return await res.json();
}

export async function searchDefault(query) {
    const res = await fetch(query);
    //console.log(await res.json())
    return await res.json();
}