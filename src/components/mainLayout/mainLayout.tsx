import {ImageBackground, ScrollView, StyleSheet} from 'react-native';
import {Header} from '../header/header';
import {Navbar} from '../navbar/navbar';
import {BreadCrumbs} from '../breadCrumbs/breadCrumbs';
import {Footer} from '../footer/footer';
import {colors} from '../../../assets/colors/colors';
import {FC, PropsWithChildren} from 'react';

interface IProps {}

export const MainLayout: FC<PropsWithChildren<IProps>> = ({children}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../assets/images/bgscreen.png')}
      style={styles.image}>
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <Header />
        {/*<Navbar />*/}
        <BreadCrumbs />
        {children}
        <Footer />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.blackOpacity2,
  },
});
