export type Button = {
    id?: string;
    title: string;
    klass: string;
    onLaunchAction: () => void;
    disabled?: boolean;
    testid?: string;
    icon?: HTMLElement|any;
    text: string;
};
