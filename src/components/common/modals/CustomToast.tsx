import { useRef } from "react";
import { toast, ToastContainer, ToastContentProps, Id,  Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* 아이콘 */
import { IoClose } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";

/* 컴포넌트 */
import Btn from "../buttons/Btn.tsx";

interface CustomToastProps {
  selectedItemsNum: number;
  closeToast: () => void;
  onDelete: () => void;
}

const CustomToast = ({ closeToast, onDelete, selectedItemsNum }: CustomToastProps) => {
  return (
    <div className="flex items-center justify-between p-1">
      <div className="flex items-center">
        <span className="text-xs font-bold text-black inline-flex items-center">
          선택됨 : <span className="text-xs font-bold text-[#33BB9A] ml-1 ">{selectedItemsNum}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Btn
          type="button"
          background="regular"
          size="sm"
          onClick={onDelete}
        >
          <IoTrash className="mr-1"/> Delete
        </Btn>
        <IoClose
          onClick={closeToast}
          size={20}
        />
      </div>
    </div>
  );
};

const useCustomToast = () => {
  // toastIdRef를 Id 타입으로만 선언
  const toastIdRef = useRef<Id>();
  const showDeleteToast = (selectedItemsNum: number, onDeleteConfirm: () => void) => {
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
      // 기존 토스트 업데이트
      toast.update(toastIdRef.current!, {
        render: (props: ToastContentProps<unknown>) => (
          <CustomToast
            closeToast={props.closeToast ?? (() => {})}
            onDelete={() => {
              onDeleteConfirm();
              props.closeToast?.();
            }}
            selectedItemsNum={selectedItemsNum}
          />
        ),
      });
    } else {
      // 새 토스트 생성
      toastIdRef.current = toast(
        (props: ToastContentProps<unknown>) => (
          <CustomToast
            closeToast={props.closeToast ?? (() => {})}
            onDelete={() => {
              onDeleteConfirm();
              props.closeToast?.();
            }}
            selectedItemsNum={selectedItemsNum}
          />
        ),
        {
          position: "bottom-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
          transition: Slide
        }
      );
    }
  };

  return { showDeleteToast };
};

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      rtl={false}
      limit={3}
      theme="light"
    />
  );
};

export { CustomToast, useCustomToast, CustomToastContainer };