export type AppProps = {
    params: any;
    contentId: any;
    trigger: ReturnType<() => {}>;
    createXAPIEventTemplate: ReturnType<() => {}>;
};
