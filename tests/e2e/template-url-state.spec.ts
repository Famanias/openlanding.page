import { expect, test } from "@playwright/test";

test("studio retains the namespaced URL through navigation and history", async ({ page }) => {
  await page.goto("/templates/lumen");
  await page.getByRole("button", { name: "Glass Studio", exact: true }).first().click();
  await expect(page).toHaveURL(url => url.pathname === "/templates/lumen" && url.search === "?studio=1");
  await page.reload();
  const back = page.getByRole("button", { name: "Back to LUMEN Page" });
  await expect(back).toBeVisible();
  await back.click();
  await expect(page).toHaveURL(url => url.pathname === "/templates/lumen" && url.search === "");
  await page.goBack();
  await expect(page).toHaveURL(url => url.pathname === "/templates/lumen" && url.search === "?studio=1");
  await expect(back).toBeVisible();
  await page.goForward();
  await expect(page).toHaveURL(url => url.pathname === "/templates/lumen" && url.search === "");
  await expect(back).toHaveCount(0);
});

test("planner retains the namespaced URL through selection, slider, and signup", async ({ page }) => {
  await page.goto("/templates/pello");
  await page.getByRole("radio", { name: /A softer landing/ }).check();
  await expect(page).toHaveURL(url => url.pathname === "/templates/pello" && url.search === "?plan=steady&goal=240");
  const slider = page.getByRole("slider", { name: "Weekend contribution" });
  await slider.focus();
  await slider.press("End");
  await expect(page).toHaveURL(url => url.pathname === "/templates/pello" && url.search === "?plan=steady&goal=1200");
  const signup = page.getByRole("link", { name: "Make this my starting point" });
  await expect(signup).toHaveAttribute("href", "/templates/pello?plan=steady&goal=1200#begin");
  await signup.click();
  await page.reload();
  await expect(page).toHaveURL(url => url.pathname === "/templates/pello" && url.search === "?plan=steady&goal=1200" && url.hash === "#begin");
  await expect(page.locator(".pel-signup-plan")).toContainText("A softer landing");
});
