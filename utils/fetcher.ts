export default async function fetcher(url: string) {
  const result = await fetch(url);
  const parsedResult = await result.json();
  return await parsedResult;
}
