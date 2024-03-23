import { signal, computed } from "@preact/signals";
import { random } from "./utility";

export type Shape = {
  id: number;
  selected: boolean;
  props: SquareProps | StarProps | BullseyeProps | CatProps;
};

export type SquareProps = {
  type: "square";
  hue: number;
};

export type StarProps = {
  type: "star";
  r1: number;
  r2: number;
  points: number;
  hue: number;
};

export type BullseyeProps = {
  type: "bullseye";
  radius: number;
  rings: number;
  hue: number;
  hue2: number;
};

export type CatProps = {
  type: "cat";
  hue: number;
  look: "left" | "centre" | "right";
};

export type ShapeType = "square" | "star" | "bullseye" | "cat";

// export const shapes = computed<Shape[]>(() => {
//   return [...Array(8)].map(() => createRandomShape("square"));
// });

export const shapes = signal<Shape[]>([]);

export const init = () => {
  shapes.value = [...Array(8)].map(() => createRandomShape("square"));
};

let nextId = 0;
function createRandomShape(type: ShapeType): Shape {
  switch (type) {
    case "square":
      return {
        id: nextId++,
        selected: false,
        props: {
          type: "square",
          hue: Math.round(random(360)),
        } as SquareProps,
      };
    case "star":
      return {
        id: nextId++,
        selected: false,
        props: {
          type: "star",
          r1: 15,
          r2: Math.round(random(20, 45)),
          points: Math.round(random(3, 10)),
          hue: Math.round(random(360)),
        } as StarProps,
      };
    case "bullseye":
      return {
        id: nextId++,
        selected: false,
        props: {
          type: "bullseye",
          radius: 45,
          rings: Math.round(random(2, 5)),
          hue: Math.round(random(360)),
          hue2: Math.round(random(360)),
        } as BullseyeProps,
      };
    case "cat":
      return {
        id: nextId++,
        selected: false,
        props: {
          type: "cat",
          hue: Math.round(random(360)),
          look: ["left", "centre", "right"][Math.round(random(3))] as
            | "left"
            | "centre"
            | "right",
        } as CatProps,
      };
  }
}

export const addShape = (type: ShapeType) => {
  shapes.value = [...shapes.value, createRandomShape(type)];
  console.log(shapes.value);
};

export const selectShape = (id: number) => {
  shapes.value.map((shape) => {
    if (shape.id === id) {
      shape.selected = !shape.selected;
    }
  });
  console.log(shapes.value);
};
