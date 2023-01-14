import {
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../../assets/colors/colors';
import {DropDownIcon} from '../../../../assets/icons/dropDownIcon';
import {useContext, useEffect, useState} from 'react';
import {options} from '../../../../assets/constants/mockHeaderOptions';
import {DropDownModalLayout} from './components/dropDownModalLayout';
import {InitialStateContext} from '../../../../App';
import {formatDate} from '../../../../assets/constants/date';
import {ClockIcon} from '../../../../assets/icons/clockIcon';

export const HeaderDropDown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {setTimeZone} = useContext(InitialStateContext);
  const gmtValue = -(+new Date().getTimezoneOffset() / 60);
  const [active, setActive] = useState<
    {name: string; value: number} | undefined
  >(options?.find(el => el.value === gmtValue));
  const [milliseconds, setMilliseconds] = useState<number>(
    Date.now() - (gmtValue - (active?.value || 0)) * 3.6e6,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds(Date.now() - (gmtValue - (active?.value || 0)) * 3.6e6);
    }, 1000);

    return () => clearInterval(interval);
  }, [active?.value, gmtValue, milliseconds]);

  const handleSet = (
    e: GestureResponderEvent,
    elem: {name: string; value: number},
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(elem);
    setTimeZone((elem.value - gmtValue) * 3.6e6);
    setOpen(false);
  };

  useEffect(() => {
    setMilliseconds(Date.now() - (gmtValue - (active?.value || 0)) * 3.6e6);
  }, [active, gmtValue]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(!open)} style={styles.GTMBlock}>
        <ClockIcon />
        <Text style={styles.GTM}>{active?.name}</Text>
        <DropDownIcon
          propStyles={{transform: [{rotate: open ? '-90deg' : '90deg'}]}}
          stroke={colors.white}
        />
        {open && (
          <DropDownModalLayout
            onPress={() => {
              setOpen(false);
            }}>
            <ScrollView
              onScroll={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={styles.optionsBlock}>
              {options
                .filter(filter => filter.name !== active?.name)
                .map(el => (
                  <Pressable
                    onPress={e => handleSet(e, el)}
                    key={el.name}
                    style={styles.optionItem}>
                    <Text style={styles.optionSpan}>{el.name}</Text>
                  </Pressable>
                ))}
            </ScrollView>
          </DropDownModalLayout>
        )}
      </Pressable>
      <View style={styles.timeBlock}>
        <Text style={styles.time}>
          {formatDate(new Date(milliseconds), 'HH:mm')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.blueOpacity1,
    borderRadius: 8,
    marginBottom: 10,
  },
  GTMBlock: {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  modal: {
    flex: 1,
  },
  optionsBlock: {
    display: 'flex',
    flexDirection: 'column',
    top: 75,
    left: 38,
    borderRadius: 8,
    width: 100,
    height: 200,
    overflow: 'scroll',
    position: 'absolute',
    backgroundColor: colors.blueOpacity1,
  },
  optionItem: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
    height: 30,
  },
  optionSpan: {
    color: colors.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
  },
  timeBlock: {
    backgroundColor: colors.black,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  time: {
    color: colors.white,
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
  },
  GTM: {
    color: colors.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    marginRight: 10,
  },
});
