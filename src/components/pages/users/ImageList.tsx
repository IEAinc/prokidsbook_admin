import {useState,useMemo} from 'react';

import Checkbox from '../../common/forms/Checkbox';
interface ImageItem {
  charcNo: number;
  user_id: string;
  img_url?: string;
  alt?: string;
  time_stamp: string;
  ban: boolean;
}
interface DateGroupedImageList {
  date: string;
  items: ImageItem[];
}

interface ImageListProps {
  imageList: DateGroupedImageList[]; // 변경된 타입
  selectedMode: boolean;
  onImageClick?: (userId: any, charcId:any) => void;
}

const ImageList = ({ imageList, selectedMode, onImageClick }: ImageListProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSelectAllChange = (checked: boolean, items: ImageItem[]) => {
    const newCheckedItems = { ...checkedItems };
    items.forEach((item) => {
      newCheckedItems[item.charcNo] = checked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleClick = (userId: any,charcId:any) => {
    onImageClick?.(userId,charcId);
  };

  return (
    <div>
      {imageList.map(({ date, items }) => {
        const allChecked = items.length > 0 && items.every((item) => checkedItems[item.charcNo]);
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
              {/*{selectedMode && (
                <Checkbox
                  id={`${id}-${date}-select-all`}
                  checked={allChecked}
                  onChange={(checked) => handleSelectAllChange(checked, items)}
                />
              )}*/}
            </div>

            {/* 이미지 리스트 */}
            <div className="p-4">
              <ul className="grid grid-cols-8 gap-2">
                {items.map((item) => (
                  <li key={`${item.charcNo}-${item.time_stamp}`}
                    onClick={() =>
                      selectedMode
                        ? handleClick(item.user_id, item.charcNo.toString())
                        : handleClick(item.user_id, item.charcNo.toString())
                    }
                    className="relative border border-gray-200 rounded aspect-square overflow-hidden"
                  >
                    {/* 체크박스 */}
                    {selectedMode && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 left-2 z-10 cursor-pointer"
                      >
                        <Checkbox
                          id={`${item.charcNo}-checkbox`}
                          checked={checkedItems[item.charcNo] || false}
                          onChange={(checked) =>
                            handleCheckboxChange(item.charcNo.toString(), checked)
                          }
                        />
                      </div>
                    )}

                    {/* 이미지 또는 Ban 표시 */}
                    {!item.ban ? (
                      <img
                        src={item.img_url}
                        alt={item.alt || 'image'}
                        className={`w-full h-full object-contain transition-transform duration-200 ${
                          selectedMode && checkedItems[item.charcNo] ? 'scale-90' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-rose-50 flex justify-center items-center ${
                          selectedMode && checkedItems[item.charcNo] ? 'scale-90' : 'scale-100'
                        }`}
                      >
                        ban
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ImageList;