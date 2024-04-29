import { MenuItem, OrderItem } from "../data/types";

export type OrderActions =
  | {
      type: "add-item";
      payload: {
        item: MenuItem;
      };
    }
  | {
      type: "remove-item";
      payload: {
        id: MenuItem["id"];
      };
    }
  | {
      type: "place-order";
    }
  | {
      type: "add-tip";
      payload: { value: number };
    };

export type OrderState = {
  order: OrderItem[];
  tip: number;
};

export const initialState: OrderState = {
  order: [],
  tip: 0,
};

export const orderReducer = (state: OrderState, action: OrderActions) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let order: OrderItem[] = [];
    if (itemExist) {
      order = state.order.map((orderItem) =>
        orderItem.id === action.payload.item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      const newOrder: OrderItem = { ...action.payload.item, quantity: 1 };

      order = [...state.order, newOrder];
    }
    return { ...state, order: order };
  }
  if (action.type === "remove-item") {
    return {
      ...state,
      order: state.order.filter((item) => item.id !== action.payload.id),
    };
  }
  if (action.type === "place-order") {
    return { order: [], tip: 0 };
  }
  if (action.type === "add-tip") {
    return { ...state, tip: action.payload.value };
  }

  return state;
};
