# pawpaw-pet-shop

Interactive pet shop website created with Claude Code.

Адаптивна hero-сторінка преміального pet shop "Good Pets": React + TypeScript + Vite + Tailwind CSS, анімації на Framer Motion та CSS.

## Розробка

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production-збірка у dist/
npm run preview  # перегляд production-збірки
```

## Структура

```
src/
  components/
    Header.tsx            — прозорий хедер, навігація, іконки
    Hero.tsx               — hero-секція, оркестрація parallax/анімацій
    HeroContent.tsx        — заголовок + декоративні штрихи + CTA
    FurryButton.tsx         — пухнаста CTA-кнопка "Новини →" з fur-hover-ефектом
    HeroCharacter.tsx      — контейнер персонажа (гуска)
    DecorativeElements.tsx — рожева стіна, пальмове листя, текстура
  hooks/
    useParallax.ts
    useReducedMotion.ts
```

## Примітка щодо асету гуски

Референс-фото гуски в окулярах та рожевому рушнику не було надано як файл
зображення, тому в `HeroCharacter.tsx` залишено явний плейсхолдер
`[GOOSE_ASSET]` замість перемальовування персонажа через CSS/SVG. Компонент
вже підготовлений для `<picture>` з WebP/AVIF та PNG fallback — достатньо
покласти файл асету в `public/` і розкоментувати блок у коментарі всередині
компонента.
