import { useState, ReactNode } from 'react';
import { title , subtitle } from "~/components/primitives";
import {AiOutlineLeft, AiOutlineDown} from 'react-icons/ai';


interface AccordionItem {
  heading: string;
  content: ReactNode;
  subHeading : string;
}

interface CustomAccordionProps {
  items: AccordionItem[];
}

function CustomAccordionItem({
  heading,
  content,
  isOpen,
  toggleItem,
  subHeading
}: {
  heading: string;
  content: ReactNode;
  isOpen: boolean;
  subHeading : string;
  toggleItem: () => void;
}) {
  return (
    <div className="p-5 bg-gray-700 bg-opacity-30 shadow-sm rounded-lg shadow-gray-600">
      <div className="cursor-pointer" onClick={toggleItem}>
        <div className='flex justify-between items-center'>
          <div>
        <h1 className={title({ size: "sm", color: "violet" })} >{heading}</h1>
        <h2 className={subtitle()}>{subHeading}</h2>
        </div>
        {isOpen ? <AiOutlineDown fontSize={20}/> : <AiOutlineLeft fontSize={20}/> }
        </div>
        
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
}

function CustomAccordion({ items }: CustomAccordionProps) {
  const [openItemIndices, setOpenItemIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItemIndices.includes(index)) {
      setOpenItemIndices(openItemIndices.filter((i) => i !== index));
    } else {
      setOpenItemIndices([...openItemIndices, index]);
    }
  };

  return (
    <div className="my-3 gap-5 flex-col flex">
      {items.map((item, index) => (
        <CustomAccordionItem
          key={index}
          subHeading={item.subHeading}
          heading={item.heading}
          content={item.content}
          isOpen={openItemIndices.includes(index)}
          toggleItem={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}

export default CustomAccordion;
