const token = "BQBNKPKvaiiZ2amfSYFXIKR3FN2pXssKvpanfFLKl5-2-p-R6kTdEnLA---9d0nVe2xt_hMFD-5cLjI8ZR6-aKQLWtsDPWFzpfIVi25nUPbQKptEXWs";

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const topTracksIds = [
  '1I3HTXuNYqmDYWywwf2v9h','4rPv8eZH6ABfkrtxxHHtV4','7wjmwD5nIYWVnHiR3X3PTO','0HWWt7Nv69TSuaVc5Woy7O','620q3OKfZXyy4dstdxSi9K'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);