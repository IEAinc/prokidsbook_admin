import {useState,useMemo} from 'react';

import Checkbox from '../../common/forms/Checkbox';
interface StoryItem {
  user_id: string;
  story_no: number;
  story_img_list: {
    story_img_url: string;
    alt?: string;
  }[];
}
interface DateGroupedImageList {
  date: string;
  items: StoryItem[];
}

interface StoriesListProps {
  storyList: DateGroupedImageList[]; // 변경된 타입
  selectedMode: boolean;
  onStoryClick?: (userId: number, storyNo:number) => void;
}

const StoriesList = ({ storyList, selectedMode, onStoryClick }: StoriesListProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // const handleSelectAllChange = (checked: boolean, items: StoryItem[]) => {
  //   const newCheckedItems = { ...checkedItems };
  //   items.forEach((item) => {
  //     newCheckedItems[item.story_no] = checked;
  //   });
  //   setCheckedItems(newCheckedItems);
  // };

  const handleClick = (userId: any,storyNo:any) => {
    console.log(userId,storyNo);
    onStoryClick?.(userId,storyNo);
  };

  return (
    <div>
      {storyList.map(({ date, items }) => {
        // const allChecked = items.length > 0 && items.every((item) => checkedItems[item.story_no]);

        return (
          <div key={date}>
            {/* 날짜 & 전체 체크박스 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <p>{date}</p>
                <p>
                  <span>{items.length}</span>개
                </p>
              </div>
            </div>

            {/* items 각각에 대해 독립적인 ul */}
            {items.map((item) => (
              <div key={item.story_no} className="p-4">
                <ul
                  className="grid grid-cols-8 gap-2"
                  onClick={() =>
                    selectedMode
                      ? handleClick(item.user_id, item.story_no)
                      : handleClick(item.user_id, item.story_no)
                  }
                >
                  {item.story_img_list.map((img, idx) => (
                    <li
                      key={`${item.story_no}-${idx}`}
                      className="relative border border-gray-200 rounded aspect-square overflow-hidden"
                    >
                      {selectedMode && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-2 left-2 z-10 cursor-pointer"
                        >
                          <Checkbox
                            id={`${item.story_no}-checkbox`}
                            checked={checkedItems[item.story_no] || false}
                            onChange={(checked) =>
                              handleCheckboxChange(item.story_no.toString(), checked)
                            }
                          />
                        </div>
                      )}

                      <img
                        src={img.story_img_url}
                        alt={'image'}
                        className={`w-full h-full object-contain transition-transform duration-200 ${
                          selectedMode && checkedItems[item.story_no] ? 'scale-90' : 'scale-100'
                        }`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })}

    </div>
  );
};
export default StoriesList;