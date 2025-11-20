// 레벨 별 아이콘 모음
import nebula_1 from '../../../assets/images/level/nebula_1.svg'
import star_2 from '../../../assets/images/level/star_2.svg'
import star_3 from '../../../assets/images/level/star_3.svg'
import star_4 from '../../../assets/images/level/star_4.svg'
import star_5 from '../../../assets/images/level/star_5.svg'
import star_6 from '../../../assets/images/level/star_6.svg'
import star_7 from '../../../assets/images/level/star_7.svg'
import star_8 from '../../../assets/images/level/star_8.svg'
import star_9 from '../../../assets/images/level/star_9.svg'
import star_10 from '../../../assets/images/level/star_10.svg'
import star_11 from '../../../assets/images/level/star_11.svg'

interface starNameOption {
  level: number;
}

const StarLevel = ({ level }: starNameOption) => {
  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1:
        return nebula_1;
      case 2:
        return star_2;
      case 3:
        return star_3;
      case 4:
        return star_4;
      case 5:
        return star_5;
      case 6:
        return star_6;
      case 7:
        return star_7;
      case 8:
        return star_8;
      case 9:
        return star_9;
      case 10:
        return star_10;
      case 11:
        return star_11;
      default:
        return nebula_1;
    }
  };

  // 레벨별 기본 이름 매핑
  const getLevelName = (level: number) => {
    switch (level) {
      case 1:
        return '성운';
      case 2:
        return '작은별 (빨강)';
      case 3:
        return '작은별 (주황)';
      case 4:
        return '작은별 (노랑)';
      case 5:
        return '작은별 (초록)';
      case 6:
        return '작은별 (하늘)';
      case 7:
        return '작은별 (파랑)';
      case 8:
        return '작은별 (보라)';
      case 9:
        return '반짝이는 작은 별';
      case 10:
        return '알록달록 무지개 별';
      case 11:
        return '초신성';
      default:
        return '-';
    }
  };


  return (
    <div className="flex items-center gap-2">
      <img
        src={getLevelIcon(level)}
        alt={`Level ${level}`}
        className="w-5 h-5"
      />
      <span>{getLevelName(level)}</span>
    </div>

  )
}

export default StarLevel;