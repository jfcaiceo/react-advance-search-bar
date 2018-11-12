import React from 'react';
import { AdvanceSearchBar, InputOption } from '../lib';

const App = () => (
  <div>
    <AdvanceSearchBar>
      <InputOption name="first_option" label="First input"/>
      <InputOption name="second_option" label="Second input"/>
      <InputOption name="third_option" label="Third input"/>
      <InputOption name="fourth_option" label="Fourth input"/>
      <InputOption name="fifth_option" label="Fifth input"/>
    </AdvanceSearchBar>
  </div>
);

export default App;
