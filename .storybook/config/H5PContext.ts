import React from 'react';
import { H5P } from "../../src/h5p/H5P.util";
import { H5PWrapper } from "../../src/h5p/H5PWrapper";

H5P.PytH5P = H5PWrapper;

export const H5PContext = React.createContext(H5PWrapper);