/**
Задание к TypeScript: Part 2 будет проверять ваше умение использовать и вычислять типы
Все задания устроены таким образом что в них есть тип FIXME (который any) и ваша задача избавится от него
Менять код кроме типов нельзя, исходные типы менять тоже нельзя, но можно рефакторить
Например `type A = 1 | 2` выразить как `type A1 = 1; type A2 = 2; type A = A1 | A2;`
* */

// В функцию приходит массив состояний заказа и фильтруется
// Нужно заменить FIXME на тип который вычисляется на освове OrderState

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as React from "react";

type stateType = Array<OrderState>;

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = (typeof orderStates)[number];

export const getUserOrderStates = (orderStates: OrderState[]): stateType => {
  const filteredStates = [] as stateType;
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};

// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME = any;

type orderType = Order["state"];

type Order =
  | {
      state: "initial";
      sum: number;
    }
  | {
      state: "inWork";
      sum: number;
      workerId: number;
    }
  | {
      state: "buyingSupplies";
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: "producing";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: "fullfilled";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const getOrderState = (order: Order): orderType => order.state;

// Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
// Нужно заменить FIXME на соответствующий тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<any, any>, K extends keyof T>(
  obj: T,
  keyToOmit: K,
): Omit<T, K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};

// Есть объединение (юнион) типов заказов в различных состояниях
// и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
// А возвращает только initial и inWork
// Нужно заменить FIXME на правильный тип вычисленный на основе Order

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME = any;

type initialAndWorkerType = Extract<Order, { state: "initial" | "inWork" }>;

type Order2 =
  | {
      state: "initial";
      sum: number;
    }
  | {
      state: "inWork";
      sum: number;
      workerId: number;
    }
  | {
      state: "buyingSupplies";
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: "producing";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: "fullfilled";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const filterOnlyInitialAndInWorkOrder = (
  order: Order,
): initialAndWorkerType | null => {
  if (order.state === "initial" || order.state === "inWork") {
    return order;
  }

  return null;
};

// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type FIXME = any

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>,
): Partial<T> | undefined => component.defaultProps;

// Задача состоит в том что написать калькулято для натуральных чисел, но только на типах!
// Ниже приведена заготовка
// Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
// Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Increase<A, ACC extends Array<number> = []> = ACC["length"] extends A
  ? [...ACC, 0]["length"]
  : Increase<A, [...ACC, 0]>;

type Decrease<A, ACC extends Array<number> = []> = [
  ...ACC,
  0,
]["length"] extends A
  ? ACC["length"]
  : Decrease<A, [...ACC, 0]>;

type ZERO = 0;
type Add<A, B> = A extends ZERO ? B : Add<Decrease<A>, Increase<B>>;
type Subtract<A, B> = B extends ZERO ? A : Subtract<Decrease<A>, Decrease<B>>;

type Equals<A, B> = A extends B ? (B extends A ? "success" : never) : never;

export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type TwoMinusOneTest = Equals<Subtract<2, 1>, 1>;
