import { Image, Vibration } from 'react-native';

export async function preloadImages(urlOfImages: string[]) {
  // an array of urls of images
  let preFetchTasks: Promise<boolean>[] = [];
  urlOfImages.forEach(url => {
    preFetchTasks.push(Image.prefetch(url));
  });

  let downloadedAll = false;
  await Promise.all(preFetchTasks).then(results => {
    try {
      downloadedAll = true;
      results.forEach(result => {
        if (!result) {
          //error occurred downloading a pic
          downloadedAll = false;
        }
      });
    } catch (e) {}
  });
  return downloadedAll;
}

export function FastVibrate() {
  Vibration.vibrate(5);
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export async function makeRequest(
  url: string,
  method: 'POST' | 'GET',
  data?: any,
  token?: string,
) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) {
      headers.append('Authorization', token);
    }
    const body = (data && JSON.stringify(data)) || '';
    const response = await fetch(url, {
      body,
      method,
      headers,
    });
    const json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    console.error('Network error:', error);
    return undefined;
  }
}
