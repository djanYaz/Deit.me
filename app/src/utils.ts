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
