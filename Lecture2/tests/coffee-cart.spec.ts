import { test, expect } from '@playwright/test';

test('Verify user can add item to cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('listitem').filter({ hasText: 'cart (1)' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $10.00');
  await expect(page.locator('#app')).toContainText('Espresso');
  await expect(page.locator('#app')).toContainText('$10.00 x 1');
  await expect(page.locator('#app')).toContainText('$10.00');
  await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
});

test('Verify suer can add multiple items to cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('button', { name: '×' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $22.00');
  await expect(page.locator('#app')).toContainText('Espresso');
  await expect(page.locator('#app')).toContainText('$10.00 x 1');
  await expect(page.locator('#app')).toContainText('$10.00');
  await expect(page.locator('#app')).toContainText('Espresso Macchiato');
  await expect(page.locator('#app')).toContainText('$12.00 x 1');
  await expect(page.locator('#app')).toContainText('$12.00');
});

test('Verify user can update card items amount', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $20.00');
  await expect(page.locator('#app')).toContainText('Espresso');
  await expect(page.locator('#app')).toContainText('$10.00 x 2');
  await expect(page.locator('#app')).toContainText('$20.00');
});


test('Verify user can remove items from cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Remove one Cappuccino' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
});

test('test verify user can add bonus item to cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await expect(page.getByLabel('Cart page')).toContainText('cart (3)');
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await expect(page.locator('#app')).toContainText('Yes, of course!');
  await expect(page.locator('#app')).toContainText('Nah, I\'ll skip.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await expect(page.getByLabel('Cart page')).toContainText('cart (4)');
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $48.00');
  await expect(page.locator('#app')).toContainText('(Discounted) Mocha');
  await expect(page.locator('#app')).toContainText('Americano');
  await expect(page.locator('#app')).toContainText('Cappuccino');
  await expect(page.locator('#app')).toContainText('Flat White');
});

test('test verify user can purchase a coffee', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $19.00');
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@gmsil.com');
  await page.getByRole('textbox', { name: 'Email' }).dblclick();
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByLabel('Cart page')).toContainText('cart (0)');
});