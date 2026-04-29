import { Catalog } from "../../Main/Catalog/Catalog";
import { CatalogSearchHeader } from './CatalogSearchHeader/CatalogSearchHeader';

export function CatalogSearch(): JSX.Element {

  return (
    <Catalog>
      <CatalogSearchHeader />
    </Catalog>
  )
}