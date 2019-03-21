import React from 'react';
import { AdvanceSearchBar, InputOption } from '../lib';

const FIRST_OPTIONS = [
  { name: 'first_suboption0', label: 'Suboption 0' },
  { name: 'second_suboption0', label: 'Suboption 1' }
];

const SECOND_OPTIONS = [
  { name: 'first_suboption1', label: 'Suboption 0' },
  { name: 'second_suboption1', label: 'Suboption 1' },
  { name: 'third_suboption1', label: 'Suboption 2' },
  { name: 'fourth_suboption1', label: 'Suboption 3' }
];

const App = () => (
  <div>
    <AdvanceSearchBar
      callback={(params) => { window.alert(`Searching parameters\n${Object.keys(params).reduce((memo, key) => { return memo + `${key}: ${params[key]}\n`; }, '')}`); }}
      emptyCallback={() => { console.log('Empty'); }}
    >
      <InputOption name='first_option' label='First Option' options={FIRST_OPTIONS} />
      <InputOption name='second_option' label='Second Option' />
      <InputOption name='third_option' label='Third Option' />
      <InputOption name='fourth_option' label='Fouth Option' />
      <InputOption name='fifth_option' label='Fifth Option' options={SECOND_OPTIONS} />
    </AdvanceSearchBar>
  </div>
);

export default App;
