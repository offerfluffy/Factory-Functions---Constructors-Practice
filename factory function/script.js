function createElement(tag, text, color) {
  const el = document.createElement(tag);
  el.innerText = text;
  el.style.color = color;
  document.body.append(el);

  return {
    el,
    setText(text) {
      el.innerText = text;
    },
    setColor(color) {
      el.style.color = color;
    },
  };
}

const h1 = createElement("h1", "Hello World", "green");

console.log(h1.el);
h1.setText("Hello World from SetText");
h1.setColor("red");

const p = createElement("p", "text", "purple");

console.log(p.el);
