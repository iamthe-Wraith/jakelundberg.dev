import { expect, test } from '@playwright/test';
import { navItems } from '../../src/lib/components/Nav/nav-config';

const path = '/';

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(path);
  });

  test('has navigation', async ({ page, isMobile }) => {
    const navToggle = page.locator('.nav-toggle');
    const navOverlay = page.locator('.nav-overlay');
    const nav = page.locator('nav');
    const navItemContainers = await nav.locator('.nav-item-container').all();

    if (isMobile) {
      await expect(navToggle).toBeVisible();
      await expect(navOverlay).not.toBeVisible();
      await expect(nav).not.toBeVisible();

      await navToggle.click();

      await expect(navOverlay).toBeVisible();
      await expect(navOverlay).toHaveCSS('position', 'fixed');

      await expect(nav).toBeVisible();

      for (let i = 0; i < navItemContainers.length; i++) {
        const navItemContainer = navItemContainers[i];
        const navItem = navItems[i];
        await expect(navItemContainer).toBeVisible();
  
        const labelLink = navItemContainer.locator('.nav-item-label-link');
        await expect(labelLink).toBeVisible();
        await expect(labelLink).toHaveAttribute('href', navItem.href);

        const iconLink = navItemContainer.locator('.nav-item-icon-link');
        await expect(iconLink).toBeVisible();
        await expect(iconLink).toHaveAttribute('href', navItem.href);

        if (navItem.href === path) {
          await expect(labelLink).toHaveClass(/active-label/);
          await expect(iconLink).toHaveClass(/active/);
        }
      }
    } else {
      await expect(navToggle).not.toBeVisible();

      await expect(navOverlay).toBeVisible();
      await expect(navOverlay).toHaveCSS('position', 'static');

      await expect(nav).toBeVisible();
      await expect(nav).toHaveCSS('position', 'relative');
  
      for (let i = 0; i < navItemContainers.length; i++) {
        const navItemContainer = navItemContainers[i];
        const navItem = navItems[i];
        await expect(navItemContainer).toBeVisible();
  
        const labelLink = navItemContainer.locator('.nav-item-label-link');
        await expect(labelLink).not.toBeVisible();
        await expect(labelLink).toHaveAttribute('href', navItem.href);

        const iconLink = navItemContainer.locator('.nav-item-icon-link');
        await expect(iconLink).toBeVisible();
        await expect(iconLink).toHaveAttribute('href', navItem.href);

        if (navItem.href === path) {
          await expect(labelLink).toHaveClass(/active-label/);
          await expect(iconLink).toHaveClass(/active/);
        }
      }
    }
  });

  test('has expected elements', async ({ page }) => {
    const ui = page.locator('.ui-layer');
    await expect(ui).toBeVisible();
    await expect(ui).toHaveCSS('position', 'fixed');
    await expect(ui).toHaveCSS('z-index', '10');

    const header = ui.getByRole('heading', { name: 'Lorem ipsum dolor sit amet.' });
    await expect(header).toBeVisible();
    
    const rainContainer = page.locator('.rain-layer');
    await expect(rainContainer).toBeVisible();
    await expect(rainContainer).toHaveCSS('position', 'fixed');
    await expect(rainContainer).toHaveCSS('z-index', '6');

    const rain = rainContainer.locator('canvas#rain');
    await expect(rain).toBeVisible();
    
    const forestLayer1 = page.getByAltText('Leafless branches stretching out from the left and right of the screen, illuminated by the moonlight.');
    await expect(forestLayer1).toBeVisible();
    await expect(forestLayer1).toHaveCSS('position', 'fixed');
    await expect(forestLayer1).toHaveCSS('z-index', '5');
    
    const forestLayer2 = page.getByAltText('The beginning of a forest of leafless trees surrounding a dark path that forks to the left and right after a short distance.');
    await expect(forestLayer2).toBeVisible();
    await expect(forestLayer2).toHaveCSS('position', 'fixed');
    await expect(forestLayer2).toHaveCSS('z-index', '4');

    const forestLayer3 = page.getByAltText('A forest of leafless tress, faintly illuminated by the moonlight. 2 paths rest among them, one to the left and one to the right.');
    await expect(forestLayer3).toBeVisible();
    await expect(forestLayer3).toHaveCSS('position', 'fixed');
    await expect(forestLayer3).toHaveCSS('z-index', '3');
    
    const forestLayer4 = page.getByAltText('The silhouette of a forest, barely visible against the night sky.');
    await expect(forestLayer4).toBeVisible();
    await expect(forestLayer4).toHaveCSS('position', 'fixed');
    await expect(forestLayer4).toHaveCSS('z-index', '2');
  });
});
