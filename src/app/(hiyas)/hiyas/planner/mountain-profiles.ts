export type MountainProfile = {
  id: string;
  name: string;
  elevation: number;
  region: string;
  routeLabel: string;
  summit: { x: number; y: number };
  route: string;
  artwork: string;
  viewpoint: string;
  features: string;
  attribution: { author: string; license: string; licenseUrl: string; source: string };
};

// Each relief is traced from a photograph of that actual mountain, preserving
// its proportions, rock strata, snowfields and glacier. Artwork, summit anchors
// and schematic itinerary lines share a 1000 x 800 coordinate system.
// Viewpoints are explicit: itinerary lines are planning schematics, rather than
// surveyed routes projected onto these photographic perspectives.
// Credits and derivative licenses: public/templates/hiyas/mountains/README.md.
export const MOUNTAIN_PROFILES: Record<string, MountainProfile> = {
  everest: {
    id: "everest",
    name: "Everest",
    elevation: 8849,
    region: "Nepal / Tibet",
    routeLabel: "South Col & Khumbu Icefall Route",
    artwork: "/templates/hiyas/mountains/everest.svg",
    summit: {
      x: 529.1,
      y: 167.3
    },
    route: "M234.2 716.7 L282.3 681.3 L327.8 667.3 L360.8 643.3 L411.4 628.1 L458.2 606.6 L507.6 574.9 L563.3 543.3 L615.2 496.5 L659.5 454.7 L711.4 412.9 L763.3 397.7 L736.7 361.0 L708.9 334.4 L684.8 297.7 L662.0 274.9 L641.8 244.6 L620.3 218.0 L589.9 199.0 L563.3 186.3 L543.0 176.2 L529.1 167.3",
    viewpoint: "Southwest face from Gokyo Ri",
    features: "West ridge, summit pyramid, rock bands, southwest-face gullies and the Nuptse foreground",
    attribution: {
      author: "Rdevany",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "https://commons.wikimedia.org/wiki/File:Mt._Everest_from_Gokyo_Ri_November_5,_2012.jpg"
    }
  },
  k2: {
    id: "k2",
    name: "K2",
    elevation: 8611,
    region: "Pakistan / China",
    routeLabel: "Abruzzi Spur & The Bottleneck",
    artwork: "/templates/hiyas/mountains/k2.svg",
    summit: {
      x: 498.0,
      y: 135.0
    },
    route: "M785.0 751.0 L805.0 705.0 L813.0 657.0 L825.0 616.0 L822.0 580.0 L803.0 542.0 L788.0 504.0 L775.0 467.0 L767.0 430.0 L752.0 393.0 L738.0 361.0 L725.0 330.0 L716.0 304.0 L705.0 279.0 L688.0 263.0 L655.0 257.0 L628.0 251.0 L604.0 239.0 L593.0 217.0 L579.0 197.0 L556.0 175.0 L531.0 156.0 L511.0 143.0 L498.0 135.0",
    viewpoint: "Southeast face from the Godwin-Austen Glacier",
    features: "Abruzzi Spur, Black Pyramid, Shoulder, hanging seracs and Bottleneck",
    attribution: {
      author: "Zacharie Grossen",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Chogori.jpg"
    }
  },
  kangchenjunga: {
    id: "kangchenjunga",
    name: "Kangchenjunga",
    elevation: 8586,
    region: "Nepal / India",
    routeLabel: "Southwest Face & Great Shelf",
    artwork: "/templates/hiyas/mountains/kangchenjunga.svg",
    summit: {
      x: 537.0,
      y: 218.3
    },
    route: "M380.2 743.0 L413.6 698.5 L446.9 662.7 L481.5 626.9 L518.5 586.2 L546.9 546.7 L569.1 499.8 L567.9 459.0 L543.2 435.6 L511.1 417.0 L474.1 404.7 L453.1 383.7 L466.7 360.2 L486.4 329.4 L506.2 291.1 L519.8 252.8 L537.0 218.3",
    viewpoint: "Southwest Yalung face",
    features: "Yalung Kang, the main summit, the Great Shelf and glaciated southwest wall",
    attribution: {
      author: "Carsten.nebel",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      source: "https://commons.wikimedia.org/wiki/File:Kangchenjunga_South_Face.jpg"
    }
  },
  lhotse: {
    id: "lhotse",
    name: "Lhotse",
    elevation: 8516,
    region: "Nepal / Tibet",
    routeLabel: "Lhotse Couloir & Reiss Couloir",
    artwork: "/templates/hiyas/mountains/lhotse.svg",
    summit: {
      x: 380.1,
      y: 139.0
    },
    route: "M419.3 740.8 L441.7 689.2 L456.3 642.2 L473.1 599.6 L482.1 551.4 L469.7 508.8 L457.4 464.0 L441.7 418.0 L426.0 374.3 L411.5 328.4 L403.6 283.5 L399.1 238.7 L391.3 197.2 L380.1 139.0",
    viewpoint: "South face from Chukhung Ri",
    features: "Lhotse, Lhotse Middle and Lhotse Shar, fluted rock walls and hanging glaciers",
    attribution: {
      author: "Uwe Gille",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:Lhotse-fromChukhungRi.jpg"
    }
  },
  makalu: {
    id: "makalu",
    name: "Makalu",
    elevation: 8485,
    region: "Nepal / Tibet",
    routeLabel: "Northwest Ridge & French Couloir",
    artwork: "/templates/hiyas/mountains/makalu.svg",
    summit: {
      x: 490.4,
      y: 247.1
    },
    route: "M287.7 725.2 L327.4 688.2 L372.6 659.5 L405.5 622.5 L416.4 581.4 L419.2 544.4 L415.1 511.5 L390.4 477.3 L361.6 445.8 L358.9 410.1 L375.3 373.2 L400.0 338.9 L428.8 310.1 L446.6 284.1 L467.1 264.9 L490.4 247.1",
    viewpoint: "Western summit pyramid above the Barun glacier",
    features: "Four-sided summit pyramid, exposed buttresses and deeply crevassed glacier",
    attribution: {
      author: "Ben Tubby",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source: "https://commons.wikimedia.org/wiki/File:Makalu.jpg"
    }
  },
  "cho-oyu": {
    id: "cho-oyu",
    name: "Cho Oyu",
    elevation: 8188,
    region: "Nepal / Tibet",
    routeLabel: "Northwest Face & Glaciated Plateaus",
    artwork: "/templates/hiyas/mountains/cho-oyu.svg",
    summit: {
      x: 563.4,
      y: 260.6
    },
    route: "M231.2 741.3 L269.9 702.6 L309.7 658.5 L345.2 617.6 L381.7 576.8 L412.9 538.1 L436.6 503.7 L461.3 471.4 L477.4 437.0 L484.9 408.0 L498.9 383.2 L514.0 355.3 L529.0 329.5 L541.9 302.6 L550.5 277.8 L563.4 260.6",
    viewpoint: "Northern face from Tibet",
    features: "Broad summit plateau, banded ice cliffs, glacial terraces and northwest shoulder",
    attribution: {
      author: "Mark Horrell",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:Cho_Oyu.jpg"
    }
  },
  dhaulagiri: {
    id: "dhaulagiri",
    name: "Dhaulagiri",
    elevation: 8167,
    region: "Nepal",
    routeLabel: "Northeast Ridge Classic Line",
    artwork: "/templates/hiyas/mountains/dhaulagiri.svg",
    summit: {
      x: 489.5,
      y: 181.3
    },
    route: "M797.4 727.4 L763.2 677.4 L726.3 622.1 L701.3 577.4 L673.7 531.3 L650.0 486.6 L623.7 443.2 L601.3 398.4 L576.3 352.4 L557.9 310.3 L542.1 276.1 L528.9 245.8 L513.2 214.2 L489.5 181.3",
    viewpoint: "Northeastern massif, aerial perspective",
    features: "High snow dome, steep rock ribs, northeastern ridge and hanging icefields",
    attribution: {
      author: "Sergey Ashmarin",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:Dhaulagiri_-_view_from_aircraft.jpg"
    }
  },
  manaslu: {
    id: "manaslu",
    name: "Manaslu",
    elevation: 8163,
    region: "Nepal",
    routeLabel: "Northeast Face & Summit Pinnacle",
    artwork: "/templates/hiyas/mountains/manaslu.svg",
    summit: {
      x: 559.8,
      y: 315.2
    },
    route: "M766.5 707.4 L740.8 664.9 L712.8 633.6 L686.0 607.9 L659.2 576.6 L635.8 548.7 L611.2 525.3 L593.3 500.7 L581.0 478.3 L572.1 450.4 L565.4 419.1 L558.7 390.1 L555.3 365.5 L559.8 340.9 L559.8 315.2",
    viewpoint: "Eastern twin summits at first light",
    features: "Twin summit profile, narrow true-summit tower, cornices and deeply incised lower spurs",
    attribution: {
      author: "Ben Tubby",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Sunrise,_Manaslu.jpg"
    }
  },
  "nanga-parbat": {
    id: "nanga-parbat",
    name: "Nanga Parbat",
    elevation: 8126,
    region: "Pakistan",
    routeLabel: "Kinshofer Route on the Diamir Face",
    artwork: "/templates/hiyas/mountains/nanga-parbat.svg",
    summit: {
      x: 428.1,
      y: 141.5
    },
    route: "M591.5 735.1 L543.1 690.3 L504.0 645.4 L464.9 594.8 L426.9 547.6 L389.0 500.4 L357.9 454.4 L329.2 406.1 L307.3 357.8 L298.1 317.5 L309.6 280.7 L333.8 250.8 L366.0 225.5 L391.3 199.0 L412.0 171.4 L428.1 141.5",
    viewpoint: "Western Diamir face",
    features: "Vast Diamir amphitheatre, upper snow basin, Mummery Spur and summit headwall",
    attribution: {
      author: "Clara Kulich",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Nanga_Parbat_Diamir_face.jpg"
    }
  },
  annapurna: {
    id: "annapurna",
    name: "Annapurna I",
    elevation: 8091,
    region: "Nepal",
    routeLabel: "North Face & The Sickle Glacier",
    artwork: "/templates/hiyas/mountains/annapurna.svg",
    summit: {
      x: 510.1,
      y: 197.7
    },
    route: "M417.7 729.4 L444.3 685.1 L472.2 650.9 L492.4 611.6 L507.6 573.7 L522.8 538.2 L539.2 506.6 L551.9 472.4 L558.2 439.5 L558.2 406.6 L554.4 371.1 L545.6 335.7 L535.4 299.0 L526.6 266.1 L519.0 233.2 L510.1 197.7",
    viewpoint: "North and northeast face panorama",
    features: "Summit ridge, steep northern headwall, hanging snowfields and subsidiary ice buttresses",
    attribution: {
      author: "Theprotrekker",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Annapurna_1_from_NE-E.jpg"
    }
  },
  "gasherbrum-i": {
    id: "gasherbrum-i",
    name: "Gasherbrum I",
    elevation: 8080,
    region: "Pakistan / China",
    routeLabel: "Japanese Couloir & Northwest Face",
    artwork: "/templates/hiyas/mountains/gasherbrum-i.svg",
    summit: {
      x: 474.5,
      y: 140.0
    },
    route: "M231.5 721.0 L255.5 677.0 L275.5 637.0 L298.5 600.0 L322.5 563.0 L343.5 526.0 L358.5 486.0 L369.5 447.0 L382.5 409.0 L395.5 372.0 L411.5 337.0 L429.5 300.0 L444.5 262.0 L455.5 224.0 L465.5 185.0 L474.5 140.0",
    viewpoint: "Northwest face of Hidden Peak",
    features: "Summit pyramid, Japanese Couloir, rocky northwest buttress and suspended snowfields",
    attribution: {
      author: "Dr. Olaf Rieck ( http://www.olafrieck.de )",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:HiddenPeak.jpg"
    }
  },
  "broad-peak": {
    id: "broad-peak",
    name: "Broad Peak",
    elevation: 8051,
    region: "Pakistan / China",
    routeLabel: "West Ridge & Summit Crest Traverse",
    artwork: "/templates/hiyas/mountains/broad-peak.svg",
    summit: {
      x: 442.3,
      y: 158.2
    },
    route: "M297.4 728.7 L328.2 682.6 L356.4 641.5 L376.9 595.4 L397.4 551.8 L419.2 508.2 L439.7 464.6 L459.0 422.3 L475.6 380.0 L492.3 336.4 L502.6 299.2 L500.0 268.5 L485.9 244.1 L464.1 219.7 L442.3 201.8 L425.6 183.8 L442.3 158.2",
    viewpoint: "Western massif from the Godwin-Austen approach",
    features: "Long summit crest, rocky foresummit, central summit and broad glacial flanks",
    attribution: {
      author: "Kogo",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:7_15_BroadPeak.jpg"
    }
  },
  "gasherbrum-ii": {
    id: "gasherbrum-ii",
    name: "Gasherbrum II",
    elevation: 8035,
    region: "Pakistan / China",
    routeLabel: "Southwest Spur & Banana Ridge",
    artwork: "/templates/hiyas/mountains/gasherbrum-ii.svg",
    summit: {
      x: 507.5,
      y: 310.1
    },
    route: "M286.0 766.0 L309.7 723.0 L331.2 681.1 L351.6 641.3 L368.8 601.5 L387.1 562.8 L404.3 527.3 L418.3 490.8 L432.3 456.3 L449.5 425.2 L465.6 395.1 L480.6 367.1 L493.5 339.1 L507.5 310.1",
    viewpoint: "Southwestern snow slopes from the high glacier",
    features: "Upper summit pyramid, long southwest ridge, broad snow apron and ice terraces",
    attribution: {
      author: "Olaf Rieck",
      license: "Public domain",
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Gasherbrum2.jpg"
    }
  },
  shishapangma: {
    id: "shishapangma",
    name: "Shishapangma",
    elevation: 8027,
    region: "Tibet",
    routeLabel: "Northern Slopes & Razor Ridge",
    artwork: "/templates/hiyas/mountains/shishapangma.svg",
    summit: {
      x: 488.7,
      y: 284.6
    },
    route: "M434.4 742.9 L451.7 696.6 L468.9 651.5 L484.8 606.5 L499.3 562.8 L512.6 521.7 L525.8 486.0 L536.4 452.8 L540.4 425.0 L533.8 398.5 L519.2 374.7 L496.7 353.5 L471.5 331.0 L462.3 313.8 L474.2 297.9 L488.7 284.6",
    viewpoint: "Northern Tibetan panorama",
    features: "Main and central summit ridge, northern snow basins and fluted glacial buttresses",
    attribution: {
      author: "Hiroki Ogawa",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:8,013m_Shishapangma_Tibet_China_%E8%A5%BF%E8%97%8F_%E5%B8%8C%E5%A4%8F%E9%82%A6%E9%A9%AC%E5%B3%B0_-_panoramio.jpg"
    }
  }
};
