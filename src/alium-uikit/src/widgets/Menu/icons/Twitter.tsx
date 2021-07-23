import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 16 16' fill='none' {...props}>
      <path
        d='M15.5283 3.13991C15.4494 3.16295 15.3706 3.18441 15.2917 3.20439C14.8095 3.32614 14.7652 3.16548 15.1143 2.81104C15.2706 2.65221 15.4088 2.47947 15.5287 2.29289C15.7976 1.87449 15.5644 1.69204 15.1069 1.88747C14.9437 1.95719 14.7778 2.0204 14.6096 2.07676C14.1383 2.23506 13.4694 1.99627 13.0494 1.72988C12.5191 1.39363 11.9165 1.22559 11.2413 1.22559C10.2956 1.22559 9.48944 1.55913 8.82249 2.2257C8.15575 2.89262 7.8222 3.69897 7.8222 4.6445C7.8222 4.77381 7.82959 4.90509 7.84418 5.0382C7.86814 5.25485 7.50325 5.41191 7.01084 5.34237C5.94569 5.19199 4.93368 4.86924 3.97462 4.37448C3.02348 3.88387 2.18402 3.26648 1.45638 2.52228C1.10856 2.16661 0.63814 2.19724 0.50827 2.67738C0.43046 2.96519 0.39176 3.26451 0.39176 3.5754C0.39176 4.16127 0.529341 4.70465 0.804561 5.20553C0.941435 5.45479 1.10173 5.68045 1.28581 5.88237C1.59544 6.22224 1.54805 6.41944 1.11707 6.29861C0.686256 6.17777 0.370542 5.99837 0.370542 6.01009C0.370542 6.0218 0.370542 6.03134 0.370542 6.03134C0.370542 6.85676 0.629723 7.58204 1.14841 8.20646C1.46792 8.59116 1.83911 8.88833 2.26183 9.09763C2.70759 9.31843 2.91524 9.44159 2.66597 9.47385C2.51559 9.4933 2.3643 9.50301 2.21212 9.50301C2.10912 9.50301 2.00106 9.49833 1.88831 9.4888C1.71 9.47367 1.67795 9.84521 1.94829 10.2627C2.16315 10.5945 2.43816 10.8864 2.77318 11.1386C3.11394 11.3952 3.48119 11.5795 3.87433 11.6917C4.3527 11.828 4.44869 12.0764 4.02218 12.3321C2.96677 12.9654 1.79879 13.282 0.518423 13.282C0.374162 13.282 0.236552 13.2788 0.105093 13.2725C-0.1231 13.2615 0.0299898 13.4625 0.470512 13.6932C1.84705 14.4142 3.33778 14.7744 4.94289 14.7744C6.15646 14.7744 7.29616 14.5822 8.36184 14.1977C9.42714 13.8131 10.3376 13.2978 11.0926 12.6522C11.8476 12.0065 12.4987 11.2639 13.0456 10.4241C13.5925 9.58426 13.9998 8.70749 14.2682 7.79384C14.5362 6.87998 14.6704 5.96433 14.6704 5.04688C14.6704 4.96421 14.6697 4.88999 14.6684 4.82463C14.6659 4.70179 14.9908 4.36931 15.3535 4.02911C15.5172 3.87549 15.6734 3.71428 15.8225 3.54518C16.1515 3.17178 16.0058 3.00068 15.5283 3.13991Z'
        fill='#67c200'
      />
    </Svg>
  )
}

export default Icon
