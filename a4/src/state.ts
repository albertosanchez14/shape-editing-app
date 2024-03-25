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
  hue: number;
  r1: number;
  r2: number;
  points: number;
};

export type BullseyeProps = {
  type: "bullseye";
  hue: number;
  hue2: number;
  radius: number;
  rings: number;
};

export type CatProps = {
  type: "cat";
  hue: number;
  look: "left" | "centre" | "right";
};

export type ShapeType = "square" | "star" | "bullseye" | "cat";

export const shapes = signal<Shape[]>([]);
export const selectedShapes = computed(() => {
  return shapes.value.filter((shape) => shape.selected).length;
});
export const editShape = computed(() => {
  const selected = shapes.value.filter((shape) => shape.selected);
  if (selected.length === 0) return undefined;
  if (selected.length > 1) return "multiple";
  return selected[0];
});
export const multiSelect = signal(false);

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
          hue: Math.round(random(360)),
          r1: 15,
          r2: Math.round(random(20, 45)),
          points: Math.round(random(3, 10)),
        } as StarProps,
      };
    case "bullseye":
      return {
        id: nextId++,
        selected: false,
        props: {
          type: "bullseye",
          hue: Math.round(random(360)),
          hue2: Math.round(random(360)),
          radius: 45,
          rings: Math.round(random(2, 5)),
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
  if (shapes.value.length >= 25) return;     
  shapes.value = [...shapes.value, createRandomShape(type)];
};

export const selectShape = (id: number) => {
  const shape = shapes.value.find((shape) => shape.id === id);
  if (!shape) return;
  if (!multiSelect.value) {
    shapes.value = shapes.value.map((s) => ({
      ...s,
      selected: s.id === id,
    }));
  } else {
    shapes.value = shapes.value.map((s) =>
      s.id === id ? { ...s, selected: !s.selected } : s
    );
  }
};

export const removeShape = () => {
  shapes.value = shapes.value.filter((shape) => !shape.selected);
};

export const clearShapes = () => {
  shapes.value = [];
};

export const unSelectAll = (unAll: boolean) => {
  if (!unAll) return;
  shapes.value = shapes.value.map((s) => ({ ...s, selected: false }));
}
