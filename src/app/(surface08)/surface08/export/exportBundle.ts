import JSZip from 'jszip';
import type { BackgroundEffect } from '../engine/effectTypes';
import { getExportBundleForEffect } from './componentSourceRegistry';

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export async function downloadEffectZipBundle(
  effect: BackgroundEffect,
  interaction: number,
  speed: number,
  paletteIndex: number
): Promise<string> {
  const bundle = getExportBundleForEffect(effect, interaction, speed, paletteIndex);
  const zip = new JSZip();

  const rootFolder = zip.folder(`surface-08-${effect.id}`);
  if (!rootFolder) {
    throw new Error('Failed to initialize ZIP archive folder.');
  }

  rootFolder.file('README.md', bundle.readmeMarkdown);
  rootFolder.file('package.json', bundle.packageJson);
  rootFolder.file('HeroExample.tsx', bundle.integrationSnippet);
  rootFolder.folder('components')?.file(`${bundle.componentName}.tsx`, bundle.standaloneComponentCode);

  const blob = await zip.generateAsync({ type: 'blob' });
  const filename = `surface-08-${effect.id}-bundle.zip`;

  if (typeof document !== 'undefined') {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  return filename;
}
