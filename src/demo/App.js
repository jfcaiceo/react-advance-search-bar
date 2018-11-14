import React from 'react';
import { AdvanceSearchBar, InputOption } from '../lib';

const App = () => (
  <div>
    <AdvanceSearchBar callback={(params) => { window.alert(`Searching parameters\n${Object.keys(params).reduce((memo, key) => { return memo + `${key}: ${params[key]}\n`; }, '')}`); }}>
      <InputOption name='first_option' label='First Option' />
      <InputOption name='second_option' label='Second Option' />
      <InputOption name='third_option' label='Third Option' />
      <InputOption name='fourth_option' label='Fouth Option' />
      <InputOption name='fifth_option' label='Fifth Option' />
    </AdvanceSearchBar>
  </div>
);

export default App;
