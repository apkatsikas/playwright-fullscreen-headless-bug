import { expect, test } from '@playwright/test';


for (const videoPage of [
  {url: 'https://www.w3schools.com/html/mov_bbb.mp4', locator: 'video', platform: 'html5'}, 
  {url: 'https://player.vimeo.com/video/76979871', locator: 'div#player', platform: 'vimeo'}, 
  {url: 'https://www.youtube.com/watch?v=_GuOjXYl5ew', locator: 'video', platform: 'youtube'}
]) {
  test.describe(`Attempting to full screen via double-clicking a video on ${videoPage.platform}`, () => {
    let windowedSize: any;
    let fullscreenSize: any;

    test.beforeEach(async({page, browserName}) => {
      const videoLocator = page.locator(videoPage.locator);
      await page.goto(videoPage.url);
      await page.waitForTimeout(2000);
      windowedSize = await videoLocator.boundingBox();
      console.log(`BEFORE double-click on ${browserName}, video size is: ${JSON.stringify(windowedSize)}`);
      await videoLocator.click({
        clickCount: 2
      });
      await page.waitForTimeout(2000);
      fullscreenSize = await videoLocator.boundingBox();
      console.log(`AFTER double-click on ${browserName}, video size is: ${JSON.stringify(fullscreenSize)}`);
    });

    test('should show a different bounding box size', () => {
      expect(fullscreenSize).not.toEqual(windowedSize);
    });
  });
};
