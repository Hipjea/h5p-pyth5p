import { Behaviour } from '../../src/types/behaviour';

export const behaviourEditable: Behaviour = {
    isEditable: true,
    enableRetry: true,
    enableSolutionsButton: true
};

export const behaviourUneditable: Behaviour = {
    isEditable: false,
    enableRetry: true,
    enableSolutionsButton: true
};

export const behaviourManual: Behaviour = {
    isEditable: true,
    enableRetry: true,
    enableSolutionsButton: true
};