## Traditional CSS vs Tailwind Utility First

### • Traditional CSS

In traditional css we create elements and assign CSS classes, something as a div with the class container and a h1 with
a class of container_heading. Then, we define those classes in CSS, which are just custom classes with pre-defined stats.

### • Utiliity First Mindset

What if instead of writing custom class names, we broke styles into small reusable utility classes, like

Every tailwind class is a predefined css rule.

### • Common Miths

1. "Why arent't all these just inline styles? Since we are basically writing everything on a single tag. So why don't we just
use regular CSS?"

This isn't actually the same, because this doesn't allow us to use more advanced properties like pseudo classes like
:hover, :focus, :even, and so on. As well as they don't give access to media queries, like `:md`, `:xl`. And even more
importantly: Inline styles cannot be reused. 

2. "But isn't this reusability just less code writing?":

Actually no, this affirmation does not have to do with the capacity of avoiding the repetition of the same string on each
element, (like flex, items-center, justify-center), but to the composition reuse in smaller utilitary classes to build
complex components in a consistent and efficient manner.

It isn't just the fewer words quantity. The core difference and the source of its "reuse" lies in the approach and
"cognitive economy" it provides.

Assume that in trad CSS, the reuse usually mean writing a big named class and apply it where it is necessary

In tailwind, the reuse is in the atomic classes as "buildig blocks"

**Reuse No1: Classes used inside different components**: The class `flex` is reused literally in every component that
needs the flex layout. The same goes for p-4, rounded-lg, etc. We are not writing a new CSS for each variation of
spacing or border. The generated CSS by p-4 is written only once and used in multiple places inside the HTML

**Reuse No2: Composition**: The bigest reuse happens when we are building **Components** in modern frameworks (like React,
Angular, etc). Instead of rewritting every class in pure HTML, we encapsulate them in a reusable component

```ts
// Exemplo in React
// This is the real tailwind's reuse point.
const CardHeader = ({ children }) => (
  <header className="flex items-center justify-center p-4 bg-gray-100 rounded-t-lg">
    {children}
  </header>
);

// Now, everywhere in our app, we reuse this component
function MeuComponente() {
  return (
    <CardHeader>
      <h1>Card Title</h1>
    </CardHeader>
  );
}
```

### But isn't it still abbreviation? could'nt i just create the reusable components with inline styling?

This is partially true, but the power isn't in the abbreviation. The real value is that items-center is a stable, documented
API for the CSS property align-items: center. You will never again have to think about what to name the class that vertically
centers items. The items-center class is always available, always does the same thing, and is consistent with all of Tailwind's
utility syntax (e.g., items-start, items-end, items-stretch, etc.).

In summary: Tailwind is reusable because it promotes the creation of a design system through the composition of utility
classes. When these are grouped into components (with React, Vue, etc.), the result is code that is more consistent, easier
to maintain, and faster to develop than naming and managing thousands of classes in separate CSS files."


## Just-In-Time Compiler

Jit compiler generates styles on demand, which means that tailwind only includes the exact styles our project uses and
keeping our final css small and efficient.

Assume we want to add a font-size of 13px, which is not a predefined tailwind utility. Normally we would have to create
an inline style or give it a custom class, but with the jit compiler, we can do instead text-[13px], or whathever value
not pre defined and jit compiler will add it to the css.

### So i can use rgb(245,39, 166) inside []?

The answer is yes, but no that way. When we are writing classnames, there are parts that will be translated to styles,
such as bg-red-500, where we must be careful with spaces, otherwise it won't target the utility functions.

The same goes for the arguments, we can't use them separate by spaces, they should be rgb(245,39,165). Therefore, we must
always make sure to use the correct spaces

### But why is it a big thing?

. Optimizes performance generating only what we need.
. Gives us faster build times since it does'nt need to precompile thousands of different classes
. Supports arbitrary values, meaning that we can pass any custom size, color, or property
. It works seamlessly in both development and production
. It is completely built-in tailwindcss with no any extra step.

## Responsive Navbar

If we want the height to be the full height of the screen, we can use h-screen

The tailwind utilities width, are responsive because they will use the rem values based on the font-size. but why does
that make it responsive?

rem means the root em, which is relative to the root font-size, normally the `<html>`, and since when we alter the html
font-size, everything that uses the `rem` increases or reduce its size automatically. However, rem does not magically
lower its value based on the screen size, but multiple times, it is common to combine rem with media queries.

So tailwind utilities make use of this responsiveness, since that, for example, w-x will be based on the browser rem,
suppose that we have an html font size of 16px, which will mean that a rem is going to be 16px.

Tailwind's font sizes uses 0.25rem by unit, so if we use that something is w-4, it will occupy 16px, w-24 occupy
96px and so on.

Therefore, if we want to make the width to be something as 560px would be by open and closing square brackets and
put whatever value we want.

But even if the width is empty, it will already take the whole width of the screen, since the height is already screen
size and div's are block by default. 

However, we can choose to use w-full or w-screen

  w-screen will make the div to take the full width of the viewport
  w-full will make the div to take the width of its parent

We can also add other versions/varieties like max-height or min-height

One thing that is really common is to apply a minimum-height to be the screen


## Outermost div page disposition

We can achieve this, by using the outermost div as flex, and inside the main one, or body, we can set it as flex-1, this
way, the footer stays in the bottom, the navbar at the top, and the rest of the content height is on flex-1, it would also
work if the flex-grow is 1

## Setting up dark mode

When developing a website, we usually want to have a theme for when the user preference is the light-mode and when it is
dark-mode. We also want to give the user the possibility of changing to the other option

First, we have to go to the CSS and add this line

@custom-variant dark (&:where(.dark .dark *));

what this this line does is that it allows us to apply dark mode capabilities to our styles.











`


























