import { useState, ReactNode }  from 'react';
import { title , subtitle } from "~/components/primitives";
import {AiOutlineLeft, AiOutlineDown} from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { types } from "util";


interface AccordionItem {
  heading: string;
  content: ReactNode;
  subHeading : string;
  disable : boolean;

}

interface CustomAccordionProps {
  items: AccordionItem[];
}

function CustomAccordionItem({
  heading,
  content,
  isOpen,
  toggleItem,
  subHeading,
  disable

}: {
  heading: string;
  content: ReactNode;
  isOpen: boolean;
  disable : boolean;
  subHeading : string;
  toggleItem: () => void;
}) {
  const { theme, setTheme } = useTheme();


  return (
    <div className={`p-5    bg-opacity-30 shadow-sm rounded-lg shadow-gray-600 relative
     ${theme == 'light'? "bg-gray-200":"bg-gray-800"}`}>

      <div className="cursor-pointer" onClick={toggleItem}>
        <div className={`flex justify-between items-center ${disable ? " opacity-50":""}`}>
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

  const toggleItem = (index: number, disable : boolean) => {
    if(disable) return;
    if (openItemIndices.includes(index)) {
      setOpenItemIndices(openItemIndices.filter((i) => i !== index));
    } else {
      setOpenItemIndices([...openItemIndices, index]);
    }
  };

  return (
    <div className="my-7 gap-7 flex-col flex ">
      {items.map((item, index) => (
        <CustomAccordionItem
          key={index}
          disable={item.disable}
          subHeading={item.subHeading}
          heading={item.heading}
          content={item.content}
          isOpen={openItemIndices.includes(index)}
          toggleItem={() => toggleItem(index, item.disable)}
        />
      ))}
    </div>
  );
}

export default CustomAccordion;
