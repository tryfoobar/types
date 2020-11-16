// Core primitives
export type CommandBarContext = Record<string, any>;
export type CommandBarCallbackArgs = Record<string, any>;
export type CommandBarCallback = (args: CommandBarCallbackArgs, context: CommandBarContext) => void;

// Special cases
export type CommandBarRouterFunc = (url: string) => void;
export type CommandBarSearchFunc = (url: string) => void;

// CommandBar.boot
export type CommandBarBootArgs = {
    id: string;
} & Record<string, string | undefined>;

// Programmatic commands
export type LinkCommandTemplate = {
    type: 'link';
    value: string;
    operation: 'self' | 'blank' | 'router';
};

export type CallbackCommandTemplate = {
    type: 'callback';
    value: string;
};

export type ContextArgument = {
    type: 'context';
    value: string;
    order_key: number;
    label?: string;
};

export type ProvidedArgument = {
    type: 'provided';
    value: 'text' | 'time';
    order_key: number;
};

export type DependentArgument = {
    type: 'dependent';
    value: string;
    order_key: number;
};

export type FunctionArgument = {
    type: 'function';
    value: string;
    order_key: number;
};

export type SetArgument = {
    type: 'set';
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
    text: string;
    template: LinkCommandTemplate | CallbackCommandTemplate;
    shortcut_mac?: string[];
    shortcut_win?: string[];
    tags?: string[];
    explanation?: string;
    sort_key?: number;
    arguments?: Record<string, CommandBarArgument>;
};

export interface CommandBar {
    readonly boot: (args: CommandBarBootArgs) => void;
    readonly addContext: (context: CommandBarContext) => void;
    readonly removeContext: (key: string) => void;
    readonly setContext: (context: CommandBarContext) => void;
    readonly addCallback: (name: string, callback: CommandBarCallback | undefined) => void;
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
}

declare global {
    interface Window {
        CommandBar: CommandBar;
    }
}
