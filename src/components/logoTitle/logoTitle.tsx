import {Button} from 'react-native';

interface IProps {
  navigation: any;
}

export const LogoTitle = ({navigation}: IProps) => {
  return (
    <Button
      title="logoTitle"
      onPress={() => navigation?.setOptions({title: 'Updated!'})}
    />
  );
};
