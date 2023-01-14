import {Dns} from '../icons/header/dns';
import {WebMasters} from '../icons/header/webMasters';

export interface ILinkWithIcon {
  name: string;
  link: string;
  shortName?: string;
  icon: Function;
}

export const tabsWithIcons: ILinkWithIcon[] = [
  {
    name: 'dns',
    link: 'development?dns=true',
    icon: (style: object) => <Dns style={style} />,
  },
  {
    name: 'webmasters',
    link: 'forWebmasters',
    icon: (style: object) => <WebMasters style={style} />,
  },
];
