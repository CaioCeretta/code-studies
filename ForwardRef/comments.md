## createElement from 'react'

createElement is what react uses behind the scenes when creating an element. it uses a bunch of data and generates it in the virtual dom.

## What exactly is the virtual dom

Virtual DOM is one of the central pierces that make React performative. Instead of directly handling the browser's DOM 
  (which is an expensive and slow in terms of processing), React uses a in-memory shallow copy.

We can think of it like:

1. **What is it?**: Virtual DOM is a representation in JS of the real DOM. It is an object that describes how the interface
should be, but without the weight of the rendering APIs of the browser.

2. **Functioning Flow**: It basically runs in three steps

  • Initial rendering: When the component is mounted, React creates the Virtual Dom's tree that reflects the initial
  state of the UI
  • Updating (Re-render): When the state, or the properties change, React creates a new Virtual DOM tree with the updates.
  • Diffing: React compares the new tree with the previous one to identify exactly what has changed. This comparison algorithm
  is called 'Diffing' 
  • The real DOM's "Patch": After identifying the differences, React calculates the minimum set of necessary changes and
  applies them to the DOM all at once (A process called Bath Update). This prevents unnecessary repaints on the screen.

### Minimum set of necessary changes

We have to see react as a very efficient contractor. Instead of tearing down a whole house because a lightbulb flickered,
React identifies exactly which wire is loose and fixes only that.

The "minimum set" is the output of the *Diffing Algorithm*. When react compares the old VDom with the new one, it looks
for specific type of changes.

**1. Attribute & Style Changes**

If only an element's attribute (like a `class` or `src`) or a CSS property changes, React doesn't recreate the element.
It simply updates the attribute in the real DOM.

• Example: Changing <div className="blue"> to <div className="red">.
• The Patch: element.className =  'red

**2. Text Content Updates**

If the structure of our HTML remains the same but the text inside a paragraph changes, React only targets the text node.

• Example: Changing <span>Count: 1</span> to <span>Count: 2</span>
• The Patch: A targeted updated to the `textContent` 

**3. Component Reordering (The "Key" Prop)**

This is where it gets clever. If we have a list and we move the bottom item to the top, a naive system might delete the
whole list and rebuilt it

• The Patch: By using `keys`. React recognizes the items are the same, just in a different order. It uses `insertBefore`
or `move` operations in the real DOM rather than destroying and recreating nodes

**4. Node Replacement (The "Nuclear" option)**

Sometimes the "minimum set" isn't just about *what* changes, but *how* they are applied.

If we update three different pieces of state in one function, React does't go to the real DOM three times. This is vital
because accessing the real DOM is "expensive" in terms of performance, it triggers browser calculations like Reflow
(layout) and Repaint. This is called *Batch Updating*


If the structure of our HTML remains the same but the text inside a paragraph changes, React only targets the text node.

• Example: Changing <span>Count: 1</span> to <span>Count: 2</span>
• The Patch: A targeted updated to the `textContent` 


## Declarative vs Opinionated

### What is imperative / declarative?

In the development context (specially on UIs), being declarative means that we describes the end result, and not the steps
to get there.

• Practical Example: Imagine we want a red button
 • Imperative (The "How"): "Go to the DOM, find the element with id `btn`, change its background color to red and a black
 border.

  . Code Example

  ```js
  /* Here we need to specifically tell the browser *how* to find the element, how to listen to the event and how to change
  the specific property. If we change the ID of the HTML button, the code breaks */
  // Detailed step by step
  const btn = document.getElementById('myBtn');
  let isTurnedOn = false;

  btn.addEventListener('click', () => {
    isTurnedOn = !isTurnedOn;

    //Direct DOM handling
    if(isTurnedOn) {
      btn.textContent = 'turned on';
      btn.style.backgroundColor = 'green'
    } else {
      btn.textContent = 'turned off';
      btn.style.backgroundColor = 'red';
    }
  })

  ```

 • Declarative: <Button color="red" />. We declare the visual state; React figures out how to handle the browser and ensure
 that the button is red


```js
 /* In React, we define a state and describes how the interface should look like for each value of the state, we don`t
 `order` the button to change color, we only say how it should like based on the state */

 import { useState } from 'react';

// The "what": Describing the final state
export function BtnStatus() {
  const [turnedOn, setTurnedOn] = useState(false);

  return (
    <button 
      onClick={() => setTurnedOn(!turnedOn)}
      style={{ backgroundColor: turnedOn ? 'green' : 'red' }}
    >
      {turnedOn ? 'Turned On' : 'Turned Off'}
    </button>
  );
}
```


**Analogy**: It is like ordering a pizza. We **declare** the flavor (result). We don't enter the kitchen to tell the chef
the exact oven temperature or the order to put on the mozzarella (imperative process)

### What does opinionated mean?

Different of "declarative" that is a style of programming, opinionated refers to the level of "freedom" or "strictness"
of a framework

For example:

Angular is opinionated. They have a strong opinion of how we should work. Imposing the folder structure, a way of making
the requests, a native route system, etc. If we don't follow their way. The tool would "argue" with us

React on other hand, is minimally opinionated. It only focuses on the interface. It doesn't force us to use a specific
routing library or routes management. We have the freedom to create our own architecture (Even though, there are market
patterns, like the clean architecture) .

### Code Examples

• Example 1:

Assume we have a `Sample.jsx` and this code creates a `div` element, with the id of sample and it has the text of
"This is a react div". e.g: `const sample = createElement("div", { id: "sample"}, "This is a react div",);`

What is happening here is basically that react is keeping track of the virtual DOM and what it is actually showing us

Why is this important? If we want access to the actual div in the DOM, we need to have some kind of reference to that
rather than just connecting to the virtual DOM. and that's where useRef comes in handy.

• Example 2:

For instance, if we uncomment that previous App code, we can see that we are using `useRef` in a couple different places.

We are saying: "Hey, i need to have the input and, and i need to have the dialog. I want reference to both of those, and
so i can use this `useRef` hook, and attach these refs to the html elements. What this does is that it connects the virtual
DOM in a more direct way to the actual DOM that's being updated.

Now, what we can do, is run a useEffect hook that runs once on page load, and in case that inputRef.current exist. Focus
on it.

This is one of the biggest things that it's hard to kind  of get our mind around if we came from Vanilla JS. Is that we
are not working directly with the DOM, but with this secondary DOM. This virtual DOM, and it is then updating the DOM. So
this is why we need to have refs. 

Now, why would we use forwardRef. We can see that what we currently have is that form, that takes our name, and when we hit\
submit, we can see that the modal pops up.  The handle submit function is pretty straight forward. It prevents the default
behavior, and if the inputRef.current exists, it shows the modal that contains the state {name}

• Example 3:

The example above worked just fine, but what if we want that input or that form, or the dialog itself to be extracted out
to its own component? And this is where we need to forward the ref. Because we need to control it from the parent, however
we still need access to the actual DOM node, not the virtual DOM.

So for this example, we will move this whole form to a new component named Form.jsx.

If we remove the inputRef, it will work just fine, but one thing we may miss is that we are no longer focusing on that
input, the way we were doing with the ref.

Because our App, that calls the `Form` component, no longer has access to that DOM node. And this is where forwardRef
comes in handy.

We might think that we could just add in the form parameters that ref, and from the App component, pass it on to the Form.

However, in React 18 and below, we can't pass refs as props. Instead, what we need to do is wrap this entire function in
a *forwardRef*, so the Form component would be something as:
```ts
const Form = forwardRef(({ ... }) => {
  ...
})
```

In a forwardRef, we need to pass as the first parameter an object with the properties, like we are doing, and as the second
parameter, we pass the ref property. And when calling the `Form` component, we simply pass our ref to it. Now, we can see
that the focus comes back.

If we are working with TS, and we want to type that forwardRef, which is the input type that we are tying this ref to, in
this case, an `HTMLInputElement`, and the second thing, is whatever the props are, which would be our defined interface,
and so.

• Example 4:

We are simply going to modify the code and do the exact same thing to the dialog. Creating a dialog component , passing
down the ref and the name state to it. It will work as before.

• Example 5:

The dialog component has a h2 and a button that are going to be used on every requests. However, the name is dynamic.
How we could account for that and pass that name as a children?

We would simply, instead of receiving the name state in the dialog, replace that with the children. Which is basically
what is inside the opening and closing tags




