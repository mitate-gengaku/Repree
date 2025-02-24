export const fetchFolderAnalyze = async (url: string, data: FormData) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
  });
  return await res.json();
};
