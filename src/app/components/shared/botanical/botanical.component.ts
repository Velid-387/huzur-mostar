import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BotanicalVariant = 'stem' | 'sprig' | 'petals' | 'leaf';

/**
 * Hand-drawn botanical line art, one motif per section. Stroke uses currentColor,
 * so the parent sets colour and opacity; position it with a class on the host.
 * With `draw` on, the lines draw themselves once the nearest `.animated` ancestor reveals.
 */
@Component({
  selector: 'app-botanical',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg *ngIf="variant === 'stem'" viewBox="0 0 160 220" aria-hidden="true" focusable="false">
      <path pathLength="1" d="M12 210 C 30 150, 40 110, 70 60 C 85 35, 110 20, 140 12" />
      <path pathLength="1" d="M38 160 C 18 156, 8 140, 10 122 C 28 128, 38 144, 38 160 Z" />
      <path pathLength="1" d="M52 120 C 30 110, 20 90, 30 70 C 50 80, 58 100, 52 120 Z" />
      <path pathLength="1" d="M70 92 C 92 92, 108 76, 112 56 C 90 58, 74 72, 70 92 Z" />
      <path pathLength="1" d="M92 44 C 98 30, 110 24, 124 26 C 120 40, 108 48, 92 44 Z" />
      <path pathLength="1" d="M140 12 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" />
    </svg>
    <svg *ngIf="variant === 'sprig'" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path pathLength="1" d="M10 110 C 40 90, 70 60, 105 15" />
      <path pathLength="1" d="M28 92 C 18 84, 16 70, 22 60 C 34 68, 36 82, 28 92 Z" />
      <path pathLength="1" d="M40 80 C 36 60, 44 46, 60 40 C 64 58, 56 72, 40 80 Z" />
      <path pathLength="1" d="M66 54 C 62 36, 74 22, 92 18 C 92 38, 82 50, 66 54 Z" />
    </svg>
    <svg *ngIf="variant === 'petals'" viewBox="0 0 120 100" aria-hidden="true" focusable="false">
      <path pathLength="1" d="M20 30 C 34 10, 62 12, 66 34 C 46 44, 28 42, 20 30 Z" />
      <path pathLength="1" d="M70 70 C 78 48, 104 44, 112 62 C 98 80, 80 82, 70 70 Z" />
      <path pathLength="1" d="M50 62 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0" />
    </svg>
    <svg *ngIf="variant === 'leaf'" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path pathLength="1" d="M14 106 C 20 60, 50 24, 106 14 C 100 60, 66 96, 14 106 Z" />
      <path pathLength="1" d="M14 106 C 40 78, 70 50, 106 14" />
      <path pathLength="1" d="M44 74 C 52 70, 58 62, 60 52" />
      <path pathLength="1" d="M66 52 C 72 50, 80 44, 84 36" />
    </svg>
  `,
  styles: [`
    :host {
      display: block;
      pointer-events: none;
      color: var(--dark-green, #7cad7f);
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }

    path {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.3;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    /* Draw-on: hidden until the section reveals, then each line traces itself */
    :host(.draw) path {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }

    :host(.draw):host-context(.animated) path {
      animation: botanical-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    :host(.draw):host-context(.animated) path:nth-child(2) { animation-delay: 0.5s; }
    :host(.draw):host-context(.animated) path:nth-child(3) { animation-delay: 0.7s; }
    :host(.draw):host-context(.animated) path:nth-child(4) { animation-delay: 0.9s; }
    :host(.draw):host-context(.animated) path:nth-child(5) { animation-delay: 1.1s; }
    :host(.draw):host-context(.animated) path:nth-child(6) { animation-delay: 1.3s; }

    @keyframes botanical-draw {
      to { stroke-dashoffset: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      :host(.draw) path {
        stroke-dashoffset: 0;
        animation: none;
      }
    }
  `]
})
export class BotanicalComponent {
  @Input() variant: BotanicalVariant = 'sprig';
}
