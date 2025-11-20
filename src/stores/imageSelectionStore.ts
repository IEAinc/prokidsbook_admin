import { create } from 'zustand';

interface User {
  id: string;
  userName: string;
  userImage: string;
}

interface Prompt {
  words: string[];
  originalText?: string;
}

interface Page {
  image: string;
  content: string;
  prompt: Prompt;
  createdAt: string;
}

interface Story {
  id: string;
  title: string;
  createdAt: string;
  pages: Page[];
}

interface Character {
  id: string;
  image: string;
  createdAt: string;
  prompt: Prompt;
  creator: User;
  isBanned?: boolean;
  stories: Story[];
}

interface ImageSelectionState {
  // 상태
  isActive: boolean;
  selectedImages: Character[];
  selectedRows: string[];
  viewMode: 'image' | 'story';
  selectedStoryId: string | null;
  activeStoryId: string | null;
  selectedImageId: string | null;
  filterBan: boolean;
  customTitle: boolean;
  isModalOpen: boolean;
  bannedImage: boolean | null;

  // 액션
  setIsActive: (active: boolean) => void;
  setSelectedImages: (images: Character[]) => void;
  setSelectedRows: (rows: string[]) => void;
  setViewMode: (mode: 'image' | 'story') => void;
  setSelectedStoryId: (id: string | null) => void;
  setActiveStoryId: (id: string | null) => void;
  setSelectedImageId: (id: string | null) => void;
  setFilterBan: (banned: boolean) => void;
  setCustomTitle: (custom: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setBannedImage: (banned: boolean | null) => void;
  toggleImageSelection: (character: Character) => void;
  toggleRowSelection: (rowId: string) => void;
  clearSelections: () => void;
  handleModalClose: () => void;
}

export const useImageSelectionStore = create<ImageSelectionState>((set) => ({
  // 초기 상태
  isActive: false,
  selectedImages: [],
  selectedRows: [],
  viewMode: 'image',
  selectedStoryId: null,
  activeStoryId: null,
  selectedImageId: null,
  filterBan: false,
  customTitle: false,
  isModalOpen: false,
  bannedImage: null,

  // 액션 구현
  setIsActive: (active) => set({ isActive: active }),// '선택'버튼 클릭시 체크박스가 나타나는데 체크되면 isActivie = true, 아니면 isActive = false
  setSelectedImages: (images) => set({ selectedImages: images }),// 체크박스 활성화 시 > 선택된 이미지
  setSelectedRows: (rows) => set({ selectedRows: rows }), // 동화 선택 시 > 한줄 선택
  setViewMode: (mode) => set({ viewMode: mode }),// 캐릭터인지 동화인지
  setSelectedStoryId: (id) => set({ selectedStoryId: id }),// 모달창 제목 위치 : 캐릭터인지 동화인지에 따라 '닫기'버튼에 관한 위치 조절
  setActiveStoryId: (id) => set({ activeStoryId: id }),// 캐릭터인지 동화인지
  setSelectedImageId: (id) => set({ selectedImageId: id }), // 제작된 동화 > 선택된 동화가 무엇인지 찾기 위함.
  setFilterBan: (banned) => set({ filterBan: banned }),// 'Ban' 버튼 클릭 시 전체 이미지가 필터링 되어 나타남(핸재 기준 isBanned로 구분됨)
  setCustomTitle: (custom) => set({ customTitle: custom }),// 모달창 제목 위치 : 캐릭터인지 동화인지에 따라 '닫기'버튼에 관한 위치 조절
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),// 모달창 열고 닫음 확인을 위함
  setBannedImage: (banned) => set({ bannedImage: banned }), // 밴 당한 이미지인지 판단 후 > 이미지 클릭하면 모달 화면에 회색박스가 나옴

  toggleImageSelection: (character) =>
    set((state) => {
      const isSelected = state.selectedImages.some(img => img.id === character.id);
      return {
        selectedImages: isSelected
          ? state.selectedImages.filter(img => img.id !== character.id)
          : [...state.selectedImages, character]
      };
    }),

  toggleRowSelection: (rowId) =>
    set((state) => {
      const isSelected = state.selectedRows.includes(rowId);
      return {
        selectedRows: isSelected
          ? state.selectedRows.filter(id => id !== rowId)
          : [...state.selectedRows, rowId]
      };
    }),

  clearSelections: () => set({
    selectedImages: [],
    selectedRows: [],
    isActive: false,
    selectedStoryId: null,
    activeStoryId: null,
    selectedImageId: null
  }),

  handleModalClose: () => set({
    isModalOpen: false,
    viewMode: 'image',
    activeStoryId: null
  }),
}));