import {WebView} from 'react-native-webview';
import {useState} from 'react';

export const CustomHeaderWebView = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {uri, onLoadStart, ...restProps} = props;
  const [currentURI, setURI] = useState(props.source.uri);
  const newSource = {...props.source, uri: currentURI};

  return (
    <WebView
      {...restProps}
      source={newSource}
      onShouldStartLoadWithRequest={request => {
        if (request.url === currentURI) {
          return true;
        }
        setURI(request.url);
        return false;
      }}
    />
  );
};
