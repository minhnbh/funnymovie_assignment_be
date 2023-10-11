import axios from "axios";

class YoutubeService {
  getYoutubeMovieId(url: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  async getVideoDetailById(videoId: string) {
    try {
      const youtubeAPIUrl = "https://youtube.googleapis.com/youtube/v3/videos";
      const params = {
        part: "snippet",
        id: videoId,
        key: process.env.YOUTUBE_DATA_API_KEY,
      };
      const { data: detail } = await axios.get(youtubeAPIUrl, {
        params,
      });
      const snippet = detail.items[0]?.snippet;
      return { title: snippet.title, description: snippet.description };
    } catch (error) {
      return null;
    }
  }
}

export default new YoutubeService();
