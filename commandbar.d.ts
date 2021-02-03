export interface CommandBar {
  readonly boot: (args: CommandBarBootArgs) => void;
  readonly addContext: (context: CommandBarContext) => void;
  readonly removeContext: (key: string) => void;
  readonly setContext: (context: CommandBarContext) => void;
  // K is a type containing types of arguments type K = T1 | T2 | T3
  readonly addCallback: <K = any>(name: string, callback: CommandBarCallback<K>) => void;
  readonly removeCallback: (name: string) => void;
  readonly addCommand: (command: CommandBarCommandConfig) => void;
  readonly removeCommand: (name: string) => void;
  readonly addRouter: (routerFunc: CommandBarRouterFunc) => void;
  readonly addSearch: (category: string, searchFunc: CommandBarSearchFunc) => void;
  readonly showGuide: (key: string) => void;
  readonly open: (input?: string) => void;
  readonly execute: (command: number | string) => void;
  readonly onboard: () => void;
  readonly isOpen: () => boolean | undefined;
  readonly updateContextSettings: <T>(key: string, settings: CommandBarSearchSettings<T>) => void;
}

declare global {
  interface Window {
    CommandBar: CommandBar;
  }
  namespace CommandBarTypes {
    // Core primitives
    // If you need several types to be passed to an object
    // you can pass union type T | K | N  as a generic?
    export type CommandBarContext<T> = Record<string, T>;
    export type CommandBarCallbackArgs<T> = Record<string, T>;
    export type CommandBarCallback<T, K> = (args: CommandBarCallbackArgs<T>, context: CommandBarContext<K>) => void;

    // Special cases
    export type CommandBarRouterFunc = (url: string) => void;
    export type CommandBarSearchFunc = (url: string) => void;

    // CommandBar.boot
    export type CommandBarBootArgs = {
      id: string;
    } & Record<string, string | undefined>; // Any other arguments? Possible to list them or create an interface?

    export enum TemplateTypes {
      callback = "callback",
      link = "link",
    }

    // Programmatic commands
    export type LinkCommandTemplate = {
      type: TemplateTypes.link;
      value: string;
      operation: "self" | "blank" | "router";
    };

    export type CallbackCommandTemplate = {
      type: TemplateTypes.callback;
      value: string;
    };

    export enum CommandBarArgumentTypes {
      context = "context",
      provided = "provided",
      dependent = "dependent",
      function = "function",
      set = "set",
    }

    export type ContextArgument = {
      type: CommandBarArgumentTypes.context;
      value: string;
      order_key: number;
      label_field?: string;
    };

    export type ProvidedArgument = {
      type: CommandBarArgumentTypes.provided;
      value: "text" | "time";
      order_key: number;
    };

    export type DependentArgument = {
      type: CommandBarArgumentTypes.dependent;
      value: string;
      order_key: number;
    };

    export type FunctionArgument = {
      type: CommandBarArgumentTypes.function;
      value: string;
      order_key: number;
    };

    export type SetArgument = {
      type: CommandBarArgumentTypes.set;
      value: string[];
      order_key: number;
    };

    export type CommandBarArgument =
      | ContextArgument
      | ProvidedArgument
      | DependentArgument
      | FunctionArgument
      | SetArgument;

    export type CommandBarCommandConfig = {
      name: string;
      text: string; // React.ReactNode type possible?
      template: LinkCommandTemplate | CallbackCommandTemplate;
      shortcut_mac?: string[];
      shortcut_win?: string[];
      tags?: string[];
      explanation?: string;
      sort_key?: number;
      arguments?: Record<string, CommandBarArgument>;
    };

    export type CommandBarSearchSettings<T> = {
      search: boolean;
      label_field?: keyof T;
      search_fields?: keyof T[];
      auto_execute?: boolean;
      description_field?: keyof T;
    };
  }
}
