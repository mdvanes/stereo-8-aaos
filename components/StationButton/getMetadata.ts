// / @ts-expect-error
// import icy from "icy";

interface NowPlayingResponse {
  artist: string;
  title: string;
  last_updated: string;
  songImageUrl: string;
  name: string;
  imageUrl: string;
}

// const getMetadata = (name: string, url: string) =>
//   new Promise<NowPlayingResponse>((resolve) => {
//     // connect to the remote stream
//     icy.get(url, function (res: any) {
//       // log the HTTP response headers
//       console.error(res.headers);

//       // log any "metadata" events that happen
//       res.on("metadata", function (metadata: any) {
//         // TODO this could be kept open and send updates back over web socket, but you would need to build on icy.Client() instead of icy.get
//         var parsed = icy.parse(metadata);
//         const now = Date.now();
//         console.error(now, parsed);

//         // RADIO 2
//         // alternates: { StreamTitle: 'NPO Radio 2 - Soul Night met Shay & Morad - BNNVARA ' }
//         // and: { StreamTitle: 'Ryan Shaw - Do The 45' }
//         const [artist, title] = parsed.StreamTitle.split(" - ");

//         resolve({
//           title,
//           artist,
//           name,
//           imageUrl: "/skyradio.jpg",
//           songImageUrl: "",
//           last_updated: now.toString(),
//         });
//       });

//       // Let's play the music (assuming MP3 data).
//       // lame decodes and Speaker sends to speakers!
//       // res.pipe(new lame.Decoder()).pipe(new Speaker());
//     });
//   });
