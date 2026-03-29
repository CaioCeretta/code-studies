### Basic Differences Concept

Let's think of ref as a state or similar to state. In a sense that we can hold and mutate values that are used in our
component. But the main difference is that unlike state, ref does not trigger a re-render of the component and ref values
are not used in the return body of the actual component. It is not used for something we are rendering, it is a hook
that is used for values that are not needed for rendering.

The application we have is really simple. It has a count, which is a state, and a setter to update this value.
Then we have another count through useRef, that is a useRef

In our program, when we click on the button, we set the count to count + 1, and then it will do the same thing to the
ref, incrementing it by 1. 

The .current is how we access and mutate the values of a ref. 

When we click on increment the log will show us

that the state is still 0, but the ref is 1. This has to do with the fact that refs don't need to wait for a re-render
to update its value. While the state expects one. The console that happens right when we click is not shown after the
new render, it is different from  the one that we see on screen.

Ref allows us to update and read the updated value, instantly, without waiting for a re-render. 

If we need to rerender, we must use useState, otherwise, we can use useRef.

useRef is a hook used for *value* that is not needed for *rendering*, allowing us to have access to this new value
right away.

### Replacing state for ref

We are currently displaying the value of the state. but if we modify the count to be *countRef*, we notice that the count
will stay at zero and remain zero even if we click on it. But the console will show us that this ref value is being
incremented.

This happens because refs do not cause a component to rerender, and to use it inside the component's return function we
will not get the updated value because its change won't cause a rerender. Meaning that we will only get that updated
value in case we have something else to trigger that re-render.

For instance, if we uncomment the setCount function, but keep displaying the ref. It will show us the current ref value
because it rerendered.

### Using it

That's why we should'nt use ref inside the return function, because our app won't work as expected and we are going to
use ref for something it is not intended to be used for.

However, we are going to usually see it being used with input elements or with any other HTML element.

In this case, we will have an example that we have an inputRef, which we will attach to an input element as its ref.
We won't access the .current when placing it inside the ref. Here is the only place we should use a ref inside a
return function.

In that case, react is going to handle setting the .current of the ref, to the input as long as it is mounted. And in
case it unmounts, react automatically handle removing the .current from the ref.

And by doing this. We are going to have access to some functions of that input. Like `inputRef.current?.focus()`. This
will make the input to be focused on mount. Which can be useful for cases where we have forms and want to facilitate
the user experience, an such.

Refs are interesting when we want to access directly DOM elements and call functions on those elements. We can also use
it with third party libraries that create a ref and expose that ref along with some functions so we can access from
anywhere those functions of inside of that component. Although this not usually one that we would write ourselves.
