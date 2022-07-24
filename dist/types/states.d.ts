export declare type validStates = 'IDLE' | 'BUFFERING' | 'LOADED' | 'PLAYING' | 'PAUSED';
export declare type StatesProps = {
    [key: string]: validStates;
};
declare const States: StatesProps;
export default States;
