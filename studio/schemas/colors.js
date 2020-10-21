export default {
  title: "Color List",
  description: "Pick a color",
  name: "colorlist",
  type: "colors", // required
  options: {
    borderradius: {
      outer: "100%",
      inner: "100%",
    },
    list: [
      { title: "Yellow", value: "rgba(245, 199, 1, 0.5)" },
      { title: "Pink", value: { r: 246, g: 206, b: 219 } },
      { title: "Red", value: "#f16d70" },
      { title: "Teal", value: "#88c6db" },
      { title: "Purple", value: "#aca0cc" },
      { title: "Green", value: "#bdcdcb" },
      { title: "White", value: "white" },
    ],
  },
};
