import './Footer.scss';
import { Contacts } from "./Contacts/Contacts";
import { Information } from "./Information/Information";
import { PayCopyright } from "./PayCopyright/PayCopyright";

export function Footer(): JSX.Element {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <Information />
        <PayCopyright />
        <Contacts />
      </div>
    </footer>
  )
}