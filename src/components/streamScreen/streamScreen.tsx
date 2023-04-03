import {ImageBackgroundLayout} from '../imageBackgroundLayout/imageBackgroundLayout';
import {MatchHeader} from '../matchHeader/matchHeader';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';
import {WebView} from 'react-native-webview';
import {useRef, useState} from 'react';

const StreamScreen = ({route}: {route: any}) => {
  const [horizontal, setHorizontal] = useState(false);
  const {t} = useTranslation();
  const ref: any = useRef();
  return (
    <ImageBackgroundLayout>
      <ScrollView
        ref={ref}
        onContentSizeChange={(w, h) => {
          if (h > w) {
            setHorizontal(false);
          } else {
            setHorizontal(true);
          }
          ref?.current?.scrollToEnd();
        }}
        removeClippedSubviews={true}
        style={styles.container}>
        <MatchHeader event={route.params.item} />
        <Text style={styles.title}>{t('streamPage.stream')}</Text>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000',
          }}>
          <WebView
            nestedScrollEnabled={true}
            javaScriptEnabled={true}
            scrollEnabled={true}
            allowsFullscreenVideo={true}
            overScrollMode="never"
            containerStyle={[
              {
                backgroundColor: '#000000',
              },
              `${route.params.stream}`.toLowerCase().includes('youtube')
                ? {height: 400, marginBottom: 20}
                : {
                    height: horizontal ? 400 : 500,
                    marginBottom: horizontal ? 0 : -290,
                  },
            ]}
            style={{
              backgroundColor: '#000000',
            }}
            source={{
              html: `${route.params.stream
                .replace(/width=["'“]\d{3}["'”]/g, 'width="100%"')
                .replace(/width=["'“]\d{2}["'”]/g, 'width="100%"')
                .replace(/height=["'“]\d{3}["'”]/g, 'height="100%"')
                .replace(/height=["'“]\d{2}["'”]/g, 'height="100%"')
                .replace(/embedssl.php/g, 'embedapp.php')
                .replace(/"/g, "'")
                .replace(/“/g, "'")
                .replace(/”/g, "'")
                .replace(/percent/g, '%')}`,
            }}
          />
        </View>
      </ScrollView>
    </ImageBackgroundLayout>
  );
};

export default StreamScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
    marginBottom: 15,
  },
});
