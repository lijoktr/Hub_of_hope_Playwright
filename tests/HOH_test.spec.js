const {test, expect} = require('@playwright/test');
const { time } = require('console');

test('Register a service test', async ({browser})=>{

    const context = await browser.newContext({
        httpCredentials: {
          username: 'chasingthestigma',
          password: 'hubofhopev2',

        },
      });
    const page = await context.newPage();
    await page.goto("https://hub-of-hope-staging.web.app/");
    

    await page.locator('a.font-bold[href="/resources"]').click()
    //await page.waitForTimeout(1000) 
    await page.waitForLoadState('networkidle'); 
    
    const resourcecard1 = page.locator('h3.font-bold').nth(0);
    
    //resourcecard1 text
    console.log(await resourcecard1.textContent());
    
    await expect((resourcecard1)).toContainText('Understanding depression')

    await page.locator('a[href="/"] svg').click()

    //register your service
    await page.locator('a[href="/register-your-service"]').nth(0).click()

    //enter service name
    await page.locator('[id="v-0-5"]').fill('Ohios')//for typing letters one by one .pressSequentially("Ohios")

    await page.locator('[id="v-0-6"]').fill('lijo@hiyield.co.uk')

    await page.locator('[role="textbox"]').nth(0).fill('Ohios provide private support service in cornwall')

    await page.locator('[id="v-0-12"]').check()

    //click continue
    await page.locator('div[class="mt-8"] button').click()

    //click abuse support tag
    await page.locator("//span[text()='Abuse']").click()

    //click continue - Step 2
    await page.locator("//span[text()='Continue']").click()

    //click continue - Step 3
    await page.locator("//span[text()='Continue']").click()

    //step 4 - confirmation tick box
    await page.locator('input.h-4.w-4.form-checkbox.rounded-sm').nth(0).click();

    await expect(page.locator('input.h-4.w-4.form-checkbox.rounded-sm').nth(0)).toBeChecked();

    //click submit for review
    await page.locator("//span[text()='Submit for review']").click();

    await page.locator("h2.font-brown").waitFor()

    await console.log(await page.locator("h2.font-brown").textContent())

    const bool = await page.locator("h2:has-text('Thank you for registering your service with Hub of Hope')").isVisible()

    expect(bool).toBeTruthy();

    await page.waitForTimeout(10000);

    //await page.pause()


});