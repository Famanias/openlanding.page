'use client';

import React from 'react';
import { PAPER_PALETTE } from '../utils/paperTextures';
import { PaperCastShadow } from './PaperShadow';

interface PaperRiverProps {
  riverValleyRef: (el: SVGGElement | null) => void;
  shadowStrength: number;
  ambientEnabled: boolean;
}

const RIVER_CHANNEL_CLIP =
  'M 848 418 C 770 434, 718 446, 725 462 C 734 480, 916 492, 918 522 C 920 554, 714 562, 650 618 C 594 666, 756 672, 822 710 C 892 750, 938 825, 965 920 L 660 920 C 624 810, 560 720, 595 628 C 630 538, 845 538, 845 516 C 845 496, 682 478, 692 454 C 700 436, 772 424, 848 418 Z';

// Base river water sheet strictly sculpted inside the curving valley corridor (no rectangular horizon seam!)
const RIVER_WATER_CORRIDOR =
  'M 865 416 C 790 426, 718 440, 706 458 C 696 474, 868 488, 945 515 L 985 940 L 575 940 L 580 570 C 640 530, 820 520, 818 504 C 816 486, 675 472, 685 450 C 694 432, 765 422, 865 416 Z';

const BAND_1 =
  'M 854 418 C 782 430, 726 446, 734 462 C 742 478, 910 490, 912 520 C 914 550, 728 564, 666 616 C 618 656, 748 672, 814 708 C 882 745, 926 825, 948 925 L 674 925 C 640 825, 588 726, 616 634 C 644 548, 848 538, 848 516 C 848 494, 694 476, 704 454 C 712 436, 778 424, 854 418 Z';
const BAND_2 =
  'M 842 422 C 788 434, 742 448, 750 462 C 758 476, 896 490, 898 520 C 900 546, 748 566, 692 614 C 648 652, 762 676, 824 714 C 888 754, 926 832, 944 925 L 728 925 C 698 835, 650 742, 658 646 C 666 560, 854 540, 856 516 C 858 492, 716 476, 722 454 C 728 438, 782 426, 842 422 Z';
const BAND_3 =
  'M 836 426 C 794 438, 758 450, 764 462 C 770 474, 882 492, 884 520 C 886 544, 768 568, 718 614 C 682 648, 782 680, 838 720 C 896 762, 928 842, 944 925 L 785 925 C 762 845, 718 755, 706 658 C 696 574, 860 542, 862 518 C 864 494, 738 476, 740 456 C 742 440, 788 430, 836 426 Z';
const BAND_4 =
  'M 832 430 C 798 440, 770 450, 775 460 C 780 470, 872 492, 872 520 C 872 542, 784 572, 742 616 C 712 648, 804 686, 854 730 C 904 774, 932 854, 944 925 L 842 925 C 824 854, 782 768, 754 672 C 730 590, 866 544, 866 520 C 866 496, 756 476, 756 458 C 756 444, 794 434, 832 430 Z';

// Extended smoothly to the far left (x=40) so zero straight vertical seam is ever visible behind the valley trees
const LEFT_BANK_LOW =
  'M 40 560 L 665 560 C 708 572, 706 602, 658 632 C 620 656, 636 692, 724 720 C 768 734, 774 756, 738 776 C 680 808, 660 854, 712 910 L 40 910 Z';
const LEFT_BANK_MID =
  'M 40 505 L 748 515 C 800 524, 788 552, 722 574 C 668 592, 622 620, 642 652 C 662 682, 734 696, 756 718 C 774 736, 732 758, 668 784 L 40 845 Z';
const LEFT_MEADOW =
  'M 40 432 L 732 434 C 772 440, 834 468, 842 490 C 848 508, 790 528, 718 544 C 646 560, 614 584, 644 606 C 674 628, 648 648, 560 660 L 40 660 Z';

const RIGHT_BANK_LOW =
  'M 1340 535 L 1340 885 L 945 885 C 942 820, 910 778, 858 750 C 818 728, 814 700, 854 676 C 892 652, 878 626, 816 614 C 756 602, 748 574, 794 552 C 842 528, 916 516, 926 488 C 934 466, 882 454, 832 446 C 796 440, 804 428, 854 420 L 1340 420 Z';
const RIGHT_BANK_UPPER =
  'M 1360 422 L 1360 830 L 965 830 C 960 776, 918 742, 872 722 C 836 706, 836 680, 876 660 C 916 640, 902 614, 834 602 C 774 590, 770 568, 814 550 C 864 530, 932 512, 938 486 C 944 464, 898 452, 858 442 C 824 434, 842 426, 885 422 Z';

export const PaperRiver: React.FC<PaperRiverProps> = ({
  riverValleyRef,
  shadowStrength,
  ambientEnabled,
}) => {
  return (
    <g ref={riverValleyRef} id="kirigami-river-valley">
      <defs>
        <clipPath id="clip-kirigami-river">
          <path d={RIVER_CHANNEL_CLIP} />
        </clipPath>
      </defs>

      {/* Pale warm-sage distant valley floor connecting seamlessly into the mountain pass */}
      <rect x={40} y={414} width={1520} height={520} fill="#D5DAB4" />

      {/* Contoured turquoise water channel strictly tucked inside the curving S-river corridor */}
      <path d={RIVER_WATER_CORRIDOR} fill={PAPER_PALETTE.riverBand4} />

      {/* Concentric cut-paper water bands with crisp contact depth */}
      <PaperCastShadow d={BAND_1} strength={shadowStrength * 0.72} color="#1E4345" elevation={0.62} />
      <path d={BAND_1} fill={PAPER_PALETTE.riverBand1} />

      <PaperCastShadow d={BAND_2} strength={shadowStrength * 0.72} color="#1A3B3D" elevation={0.62} />
      <path d={BAND_2} fill={PAPER_PALETTE.riverBand2} />

      <PaperCastShadow d={BAND_3} strength={shadowStrength * 0.78} color="#163537" elevation={0.58} />
      <path d={BAND_3} fill={PAPER_PALETTE.riverBand3} />

      <path d={BAND_4} fill={PAPER_PALETTE.riverBand4} />

      {/* Animated decorative cut-paper current lines strictly clipped inside river */}
      <g
        clipPath="url(#clip-kirigami-river)"
        opacity={ambientEnabled ? 0.65 : 0.35}
        pointerEvents="none"
      >
        <path
          d="M 836 426 C 770 442, 738 456, 756 468 C 792 486, 888 498, 888 522 C 888 550, 736 572, 686 620 C 646 658, 774 686, 836 732 C 896 778, 922 850, 938 920"
          fill="none"
          stroke={PAPER_PALETTE.riverRim}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeDasharray="34 26 14 32"
          className="river-current-flow"
        />
        <path
          d="M 818 432 C 760 448, 728 462, 744 474 C 782 492, 868 502, 868 526 C 868 552, 712 580, 662 630 C 626 668, 748 696, 804 746 C 858 794, 884 862, 898 920"
          fill="none"
          stroke="#BBE0DC"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeDasharray="22 38 18 28"
          className="river-current-flow-slow"
        />
        <path
          d="M 852 426 C 788 442, 766 454, 782 466 C 814 484, 904 498, 904 522 C 904 548, 770 572, 728 620 C 698 656, 814 688, 874 736 C 924 776, 946 848, 960 920"
          fill="none"
          stroke="#407678"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="28 34 12 40"
          className="river-current-flow-slow"
          opacity={0.55}
        />
      </g>

      {/* ================= LEFT BANK LAYERED PAPER PENINSULAS & MEADOW ================= */}
      <g>
        <PaperCastShadow d={LEFT_BANK_LOW} strength={shadowStrength * 1.1} color="#1C3A3C" elevation={0.95} />
        <path d={LEFT_BANK_LOW} fill={PAPER_PALETTE.bankPale} />
        <path
          d="M 665 560 C 708 572, 706 602, 658 632 C 620 656, 636 692, 724 720 C 768 734, 774 756, 738 776"
          fill="none"
          stroke="#DCE6DF"
          strokeWidth={2}
        />
      </g>

      <g>
        <PaperCastShadow d={LEFT_BANK_MID} strength={shadowStrength * 1.15} color="#1F3B3A" elevation={1.0} />
        <path d={LEFT_BANK_MID} fill={PAPER_PALETTE.meadowSage} />
        <path
          d="M 748 515 C 800 524, 788 552, 722 574 C 668 592, 622 620, 642 652 C 662 682, 734 696, 756 718"
          fill="none"
          stroke="#E4E9CB"
          strokeWidth={2.2}
        />
      </g>

      <g>
        <PaperCastShadow d={LEFT_MEADOW} strength={shadowStrength * 1.15} color="#263B34" elevation={1.05} />
        <path d={LEFT_MEADOW} fill={PAPER_PALETTE.meadowCream} />
        <path
          d="M 732 434 C 772 440, 834 468, 842 490 C 848 508, 790 528, 718 544 C 646 560, 614 584, 644 606"
          fill="none"
          stroke="#F5F4DA"
          strokeWidth={2.4}
        />
        <path
          d="M 355 516 C 460 510, 568 526, 612 560 C 632 576, 618 594, 578 606"
          fill="none"
          stroke="#C2C89F"
          strokeWidth={1.6}
          opacity={0.7}
        />
      </g>

      {/* ================= RIGHT BANK LAYERED PENINSULAS (UNDER VILLAGE & TORII) ================= */}
      <g>
        <PaperCastShadow d={RIGHT_BANK_LOW} strength={shadowStrength * 1.1} color="#1B393B" elevation={0.95} />
        <path d={RIGHT_BANK_LOW} fill={PAPER_PALETTE.bankPale} />
        <path
          d="M 858 750 C 818 728, 814 700, 854 676 C 892 652, 878 626, 816 614 C 756 602, 748 574, 794 552"
          fill="none"
          stroke="#DCE6DF"
          strokeWidth={2}
        />
      </g>

      <g>
        <PaperCastShadow d={RIGHT_BANK_UPPER} strength={shadowStrength * 1.15} color="#1F3938" elevation={1.05} />
        <path d={RIGHT_BANK_UPPER} fill={PAPER_PALETTE.meadowSage} />
        <path
          d="M 872 722 C 836 706, 836 680, 876 660 C 916 640, 902 614, 834 602 C 774 590, 770 568, 814 550 C 864 530, 932 512, 938 486"
          fill="none"
          stroke="#E5EAD0"
          strokeWidth={2.3}
        />
      </g>
    </g>
  );
};
