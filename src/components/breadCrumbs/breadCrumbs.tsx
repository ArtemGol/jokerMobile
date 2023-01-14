import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import type {IBreadCrumb} from '../../../assets/interfaces/IBreadCrumb';

const testBreadCrumbs: IBreadCrumb[] = [
  {name: 'Live streams', link: 'someLink'},
  {name: 'Football Live Streams | Jokerlivestream'},
];

export const BreadCrumbs = () => {
  return (
    <View style={styles.container}>
      {testBreadCrumbs.map((el, i) => (
        <View
          key={i}
          style={[
            styles.breadCrumbItemBlock,
            i === 0 && {borderTopLeftRadius: 8, borderBottomLeftRadius: 8},
            i === testBreadCrumbs.length - 1 && {
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            },
          ]}>
          <Text
            style={[
              styles.breadCrumbItemText,
              {
                color:
                  i === testBreadCrumbs.length - 1
                    ? colors.blue.DEFAULT
                    : colors.white,
              },
            ]}>
            {el.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 12,
  },
  breadCrumbItemBlock: {
    backgroundColor: colors.black,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2,
    marginRight: 2,
  },
  breadCrumbItemText: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
