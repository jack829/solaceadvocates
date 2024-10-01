
import { type Advocate } from "../utils/types";
import AdvocateItem from "./AdvocateItem";

type Props = {
  advocates: Advocate[]
}

export default function AdvocateList({ advocates }: Props) {
  return (
    <ul className='grid md:grid-cols-2 gap-4'>
      { advocates.map((advocate) => {
        return (
          <li key={advocate.phoneNumber}>
            <AdvocateItem advocate={advocate} />
          </li>
        );
      })}
    </ul>
  );
}
