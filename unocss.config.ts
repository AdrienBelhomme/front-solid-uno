import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetTagify from "@unocss/preset-tagify";
import presetWindi from "@unocss/preset-wind";
import presetWebFonts from '@unocss/preset-web-fonts'
import { presetForms } from "@julr/unocss-preset-forms";
import { presetScalpel } from "unocss-preset-scalpel";
import { presetExtra } from 'unocss-preset-extra';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { defineConfig, presetTypography, transformerDirectives, transformerVariantGroup } from "unocss";
import {presetBetterNestedColors} from "unocss-preset-better-nested-colors"


export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      trueToNonValued: true
    }),
    presetWindi(),
    presetTagify(),
    presetScalpel(),
    presetForms(),
    presetTypography(),
    presetExtra(),
    presetScrollbar(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }), // @ts-ignore
    presetWebFonts({
      provider: 'google',
      fonts: {
        manrope: 'Manrope',
        sans: 'Source Sans Pro',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
    presetBetterNestedColors({
      colors: {
        blu: '#303a70',
        rosewater: {
          DEFAULT: 'rosewater-latte',
          'latte': '#dc8a78',
          'macchiato': '#f4dbd6',
          ':dark': 'rosewater-macchiato',
          ':light': 'rosewater-latte',
        },
        flamingo: {
          DEFAULT: 'flamingo-latte',
          'latte': '#dd7878',
          'macchiato': '#f0c6c6',
          ':dark': 'flamingo-macchiato',
          ':light': 'flamingo-latte',
        },
        pink: {
          DEFAULT: 'pink-latte',
          'latte': '#ea76cb',
          'macchiato': '#f5bde6',
          ':dark': 'pink-macchiato',
          ':light': 'pink-latte',
        },
        mauve: {
          DEFAULT: 'mauve-latte',
          'latte': '#8839ef',
          'macchiato': '#c6a0f6',
          ':dark': 'mauve-macchiato',
          ':light': 'mauve-latte',
        },
        red: {
          DEFAULT: 'red-latte',
          'latte': '#d20f39',
          'macchiato': '#ed8796',
          ':dark': 'red-macchiato',
          ':light': 'red-latte',
        },
        maroon: {
          DEFAULT: 'maroon-latte',
          'latte': '#e64553',
          'macchiato': '#ee99a0',
          ':dark': 'maroon-macchiato',
          ':light': 'maroon-latte',
        },
        peach: {
          DEFAULT: 'peach-latte',
          'latte': '#fe640b',
          'macchiato': '#f5a97f',
          ':dark': 'peach-macchiato',
          ':light': 'peach-latte',
        },
        yellow: {
          DEFAULT: 'yellow-latte',
          'latte': '#df8e1d',
          'macchiato': '#eed49f',
          ':dark': 'yellow-macchiato',
          ':light': 'yellow-latte',
        },
        green: {
          DEFAULT: 'green-latte',
          'latte': '#40a02b',
          'macchiato': '#a6da95',
          ':dark': 'green-macchiato',
          ':light': 'green-latte',
        },
        teal: {
          DEFAULT: 'teal-latte',
          'latte': '#179299',
          'macchiato': '#8bd5ca',
          ':dark': 'teal-macchiato',
          ':light': 'teal-latte',
        },
        sky: {
          DEFAULT: 'sky-latte',
          'latte': '#04a5e5',
          'macchiato': '#91d7e3',
          ':dark': 'sky-macchiato',
          ':light': 'sky-latte',
        },
        sapphire: {
          DEFAULT: 'sapphire-latte',
          'latte': '#209fb5',
          'macchiato': '#7dc4e4',
          ':dark': 'sapphire-macchiato',
          ':light': 'sapphire-latte',
        },
        blue: {
          DEFAULT: 'blue-latte',
          'latte': '#1e66f5',
          'macchiato': '#8aadf4',
          ':dark': 'blue-macchiato',
          ':light': 'blue-latte',
        },
        lavender: {
          DEFAULT: 'lavender-latte',
          'latte': '#b7bdf8',
          'macchiato': '#f4dbd6',
          ':dark': 'lavender-macchiato',
          ':light': 'lavender-latte',
        },
        text: {
          DEFAULT: 'text-latte',
          'latte': '#4c4f69',
          'macchiato': '#cad3f5',
          ':dark': 'text-macchiato',
          ':light': 'text-latte',
        },
        subtext1: {
          DEFAULT: 'subtext1-latte',
          'latte': '#5c5f77',
          'macchiato': '#b8c0e0',
          ':dark': 'subtext1-macchiato',
          ':light': 'subtext1-latte',
        },
        subtext0: {
          DEFAULT: 'subtext0-latte',
          'latte': '#6c6f85',
          'macchiato': '#a5adcb',
          ':dark': 'subtext0-macchiato',
          ':light': 'subtext0-latte',
        },
        overlay2: {
          DEFAULT: 'overlay2-latte',
          'latte': '#7c7f93',
          'macchiato': '#939ab7',
          ':dark': 'overlay2-macchiato',
          ':light': 'overlay2-latte',
        },
        overlay1: {
          DEFAULT: 'overlay1-latte',
          'latte': '#8c8fa1',
          'macchiato': '#8087a2',
          ':dark': 'overlay1-macchiato',
          ':light': 'overlay1-latte',
        },
        overlay0: {
          DEFAULT: 'overlay0-latte',
          'latte': '#9ca0b0',
          'macchiato': '#6e738d',
          ':dark': 'overlay0-macchiato',
          ':light': 'overlay0-latte',
        },
        surface2: {
          DEFAULT: 'surface2-latte',
          'latte': '#acb0be',
          'macchiato': '#5b6078',
          ':dark': 'surface2-macchiato',
          ':light': 'surface2-latte',
        },
        surface1: {
          DEFAULT: 'surface1-latte',
          'latte': '#bcc0cc',
          'macchiato': '#494d64',
          ':dark': 'surface1-macchiato',
          ':light': 'surface1-latte',
        },
        surface0: {
          DEFAULT: 'surface0-latte',
          'latte': '#ccd0da',
          'macchiato': '#363a4f',
          ':dark': 'surface0-macchiato',
          ':light': 'surface0-latte',
        },
        base: {
          DEFAULT: 'base-latte',
          'latte': '#eff1f5',
          'macchiato': '#24273a',
          ':dark': 'base-macchiato',
          ':light': 'base-latte',
        },
        mantle: {
          DEFAULT: 'mantle-latte',
          'latte': '#e6e9ef',
          'macchiato': '#1e2030',
          ':dark': 'mantle-macchiato',
          ':light': 'mantle-latte',
        },
        crust: {
          DEFAULT: 'crust-latte',
          'latte': '#dce0e8',
          'macchiato': '#181926',
          ':dark': 'crust-macchiato',
          ':light': 'crust-latte',
        },
      }

    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {},
    breakpoints: {
      xs: '280px',
      sm: '480px',
      md: '720px',
      lg:'1024px',
      xl: '1280px',
    },

  },
  shortcuts: [
    {
      input: "w-full border-radius-4px bg-base h-42px focus:border-blu/50 focus:ring-0 border-2px border-overlay0/25 px-12px py-6px mt-6px",
      btn: "fw-600 px-28px py-12px border-radius-4px bg-blu/80 hover:bg-blu/60 color-light whitespace-nowrap",
      sexybar: "scrollbar scrollbar-thumb-color-overlay2/30 scrollbar-track-color-overlay0/30 scrollbar-rounded scrollbar-w-8px scrollbar-radius-4px scrollbar-track-radius-4"
    }
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        // @ts-ignore
        if (theme.colors[c])
          // @ts-ignore
          return { color: theme.colors[c] };
      },
    ],
  ],
});
