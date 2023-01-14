import React, {FC, PropsWithChildren} from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  onPress: () => void;
}

export const DropDownModalLayout: FC<PropsWithChildren<IProps>> = ({
  children,
  onPress,
}) => (
  <Modal animationType="fade" transparent visible={true}>
    <TouchableOpacity onPress={onPress} style={styles.modal} activeOpacity={1}>
      {children}
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});
