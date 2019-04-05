// Loading.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './Loading';

test('It renders', () => {
    const component = renderer.create(
      <Loading />,
    );
  });
  