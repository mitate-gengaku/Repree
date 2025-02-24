export const downloadImage = (url: string) => {
  const a = document.createElement("a");

  a.setAttribute("download", "download.svg");
  a.setAttribute("href", url);
  a.click();
};
