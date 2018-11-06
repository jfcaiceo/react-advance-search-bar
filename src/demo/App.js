import React from 'react';
import { AdvanceSearchBar, InputOption } from '../lib';

const App = () => (
  <div>
    <AdvanceSearchBar>
      <InputOption name="first_option" label="Primera Opción"/>
      <InputOption name="second_option" label="Segunda Opción"/>
      <InputOption name="third_option" label="Tercera Opción"/>
    </AdvanceSearchBar>
  </div>
);

export default App;
