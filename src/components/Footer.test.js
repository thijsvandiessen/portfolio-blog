import React from 'react';
import Footer from './Footer';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'


const context = {};

it('The Footer renders and does not explode', () => expect(renderer.create(
    <StaticRouter context={context}>
        <Footer />
    </StaticRouter>
)).toBeDefined())