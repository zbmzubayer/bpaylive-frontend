export const getVideoSourceType = (url: string) => {
  let type = "application/x-mpegURL";
  if (url.includes(".m3u8")) {
    type = "application/x-mpegURL";
  } else if (url.includes(".mp4") || url.includes(".mkv")) {
    type = "video/mp4";
  } else if (url.includes(".webm")) {
    type = "video/webm";
  }
  return type;
};
