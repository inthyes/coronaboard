import React from 'react';
import { GlobalTable } from './V2-global-table';
import { Slide } from './V2-slide';
import { GlobalGeoChart } from './V2-global-chart-slide';

export function GlobalSlide(props) {
  const { id, dataSource } = props;
  const { countryByCc, globalStats } = dataSource;
  return (
    <Slide id={id} title="국가별 현황">
      <GlobalGeoChart countryByCc={countryByCc} globalStats={globalStats} />
      <GlobalTable countryByCc={countryByCc} globalStats={globalStats} />
    </Slide>
  );
}
