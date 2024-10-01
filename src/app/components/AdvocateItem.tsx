import { useMemo, useState } from "react";
import { FaMinus, FaPlus } from 'react-icons/fa';
import { type Advocate } from "../utils/types";
import AdvocateDetailItem from "./AdvocateDetailItem";

type Props = {
  advocate: Advocate
}

export default function AdvocateItem({ advocate }: Props) {
  const {
    firstName,
    lastName,
    city,
    degree,
    specialties,
    yearsOfExperience,
    phoneNumber
  } = advocate;

  const [showExpanded, setShowExpanded] = useState(false);

  function onExpandItem() {
    setShowExpanded(!showExpanded);
  }

  const extraClasses = useMemo(() => {
    if (showExpanded) {
      return '';
    }
    return 'h-24 md:h-48 overflow-hidden';
  }, [showExpanded]);

  return (
    <div
      className={`flex flex-col shadow-lg p-4 rounded-md border-current border hover:cursor-pointer ${extraClasses}`}
      onClick={onExpandItem}
    >
      <ul>
        <div className='flex flex-row justify-between'>
          <AdvocateDetailItem value={`${firstName} ${lastName}`} className='text-lg' />
          { showExpanded ? <FaMinus /> : <FaPlus />}
        </div>
        <AdvocateDetailItem label='City' value={city} />
        <AdvocateDetailItem label='Degree' value={degree} />
        <li>
          <p>Specialties: </p>
          <ul className='list-disc ml-8'>
            {specialties.map((s) => (
              <AdvocateDetailItem key={s} value={s} />
            ))}
          </ul>
        </li>
        <AdvocateDetailItem label='Years of Experience' value={yearsOfExperience} />
        <AdvocateDetailItem label='Phone' value={phoneNumber} />
      </ul>
    </div>
  );
}
