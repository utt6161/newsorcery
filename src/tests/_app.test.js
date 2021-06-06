import React from 'react';
import { mount } from '@cypress/react';
import RootComponent from "../../pages/_app"

it('renders shared layout', () => {
    mount(<RootComponent />);
});
