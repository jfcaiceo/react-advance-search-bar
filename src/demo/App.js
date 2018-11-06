import React from 'react';
import { AdvanceSearchBar, InputOption } from '../lib';

const App = () => (
  <div>
    <AdvanceSearchBar>
      <InputOption name="first_option" label="Codigo de guía"/>
      <InputOption name="second_option" label="Patente"/>
      <InputOption name="third_option" label="Transportista"/>
      <InputOption name="fouth_option" label="Estado"/>
    </AdvanceSearchBar>
  </div>
);

export default App;
