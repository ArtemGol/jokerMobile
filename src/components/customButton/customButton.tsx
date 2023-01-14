import {Pressable, StyleSheet, Text} from 'react-native';

interface IProps {
  blockStyles: object;
  textStyles: object;
  text: string;
  icon?: JSX.Element;
}

export const CustomButton = ({blockStyles, textStyles, icon, text}: IProps) => {
  return (
    <Pressable style={[styles.container, blockStyles]}>
      <Text style={[styles.btnText, textStyles]}>{text}</Text>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  btnText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
  },
});
