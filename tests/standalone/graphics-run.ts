import {test,expect} from "@playwright/test";
import {openStandalone} from "./open";
import {installGraphicsProbe,verifyGraphics} from "./graphics";

const slugs:string[]=/* SLUGS */[];
for(const slug of slugs) test(`${slug}: renders the original graphics and media offline`,async({page})=>{
  test.setTimeout(slug==="lowtide"?180_000:120_000);
  const errors:string[]=[],requests:string[]=[];
  page.on("pageerror",error=>errors.push(error.message));
  page.on("request",request=>{if(/^https?:/.test(request.url()))requests.push(request.url());});
  await installGraphicsProbe(page);
  await page.emulateMedia({reducedMotion:"no-preference"});
  await openStandalone(page,`/${slug}`);
  await verifyGraphics(page,slug);
  expect(requests,"all runtime media must be embedded").toEqual([]);
  expect(errors,"original renderer must initialize without script errors").toEqual([]);
});
