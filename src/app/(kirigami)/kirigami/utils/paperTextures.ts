/**
 * Curated cardstock color palette faithfully sampled from the KIRIGAMI reference artwork,
 * plus shared SVG filter & lighting configuration helpers.
 */

export const PAPER_PALETTE = {
  // Sky & warm sunlit paper backdrop
  skyTop: '#FDF6EB',
  skyMid: '#F9ECDC',
  skyHorizon: '#F4DFC7',

  // Sun (warm muted peach-terracotta)
  sunHighlight: '#F5C4AB',
  sunMain: '#EBA586',
  sunDeep: '#DF8F6E',

  // Ornamental clouds (layered ivory & warm buff-peach)
  cloudTop: '#FCF5EA',
  cloudMid: '#F3DFC7',
  cloudBase: '#E5BC9B',
  cloudRim: '#FFFBF4',

  // Mountain ranges (far-to-near atmospheric cardstock sequence)
  mtFarLeftGray: '#BCC6B8',
  mtPaleSage: '#A7B597',
  mtPaleSageShade: '#96A585',
  mtDustyBlue: '#8EA6A5',
  mtDustyBlueShade: '#7B9595',
  mtOliveMid: '#6E8262',
  mtOliveMidShade: '#5D7152',
  mtForestCenter: '#516E55',
  mtForestCenterShade: '#425C46',
  mtDeepPine: '#3B564C',
  mtDeepPineShade: '#2F463D',
  mtFoothillLeft: '#64724E',
  mtFoothillLeftDark: '#4C5B3F',
  mtFoothillRight: '#49614F',
  mtFoothillRightLight: '#627962',

  // Valley meadow & riverbanks
  meadowCream: '#DEDEB8',
  meadowSage: '#C7CEA7',
  bankPale: '#B4C7B9',

  // Winding S-curve turquoise cut-paper river bands
  riverRim: '#D2E4E0',
  riverBand1: '#9FC1BE',
  riverBand2: '#82B1AE',
  riverBand3: '#689F9E',
  riverBand4: '#528D8E',
  riverBand5: '#417B7D',

  // Right terraced hills (concentric layered olive-sage cardstock)
  terrace1: '#A2AD86',
  terrace2: '#8E9C74',
  terrace3: '#B3BC96',
  terrace4: '#7E8E69',
  terrace5: '#9AA67F',
  terrace6: '#6D7E5D',
  terraceEdge: '#D0D6B8',

  // Traditional Japanese village & pathways
  pathIvory: '#EFE4CE',
  pathEdge: '#D5C6AA',
  roofLight: '#B69676',
  roofMain: '#967658',
  roofDark: '#73573E',
  roofRidge: '#5C4330',
  woodWall: '#A68364',
  woodShade: '#816247',
  windowDark: '#3E2C20',
  interiorGlow: '#F8D49A',
  interiorWarm: '#E8A564',
  stoneBase: '#8E887B',

  // Torii gate (muted terracotta-cinnabar)
  toriiBright: '#D26B4D',
  toriiMain: '#BE583D',
  toriiDark: '#8F3E2A',
  toriiCap: '#6E2E20',

  // Bamboo groves
  bambooLight: '#CFD5AD',
  bambooMid: '#9EB084',
  bambooDark: '#788C62',

  // Pine trees & vegetation
  pineFanLight: '#97A582',
  pineFanMid: '#778764',
  pineFanDeep: '#56684A',
  pineFanShadow: '#3E4F37',
  barkDark: '#52382B',
  barkMid: '#6E4C3B',
  cypressPale: '#C2C8A4',
  cypressMid: '#7E906B',
  cypressDark: '#3D5744',

  // Foreground terracotta & cream cut-paper rocks
  rockTerraLight: '#CB6D4E',
  rockTerraMain: '#B5573C',
  rockTerraDeep: '#96432C',
  rockTerraShadow: '#733120',
  rockCreamLight: '#F3E5CE',
  rockCreamMain: '#E6D4B8',
  rockCreamMid: '#D6BF9E',
  rockCreamShade: '#C1A784',

  // Foreground grasses, ferns & wildflowers
  grassSage: '#7A8C64',
  grassDeep: '#526546',
  reedCream: '#EFE1C6',
  fernDark: '#475D44',
  fernMid: '#607759',

  // Cherry blossoms (sakura)
  sakuraBark: '#4C3127',
  sakuraBarkLight: '#684537',
  petalIvory: '#FDF0EA',
  petalSoftPink: '#F6CBC6',
  petalBlush: '#ECA9A5',
  petalDeepPink: '#DE8E8A',
  stamenCenter: '#C46864',
  stamenGold: '#E8B27D',
} as const;

export interface ShadowConfig {
  enabled: boolean;
  intensity: number; // 0 to 1.8
  unfoldShadowFactor: number; // 0.32 to 1.0
}

/**
 * Computes effective SVG flood opacity for soft paper cast shadows.
 * Light direction comes consistently from upper-left (-dx, -dy) casting down-right (+dx, +dy).
 */
export function computeEffectiveShadowOpacity(
  baseOpacity: number,
  config: ShadowConfig
): number {
  if (!config.enabled) return 0;
  const val = baseOpacity * Math.max(0, Math.min(2, config.intensity)) * Math.max(0, Math.min(1, config.unfoldShadowFactor));
  return Number(Math.min(0.68, val).toFixed(3));
}
