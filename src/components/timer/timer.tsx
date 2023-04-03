import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {formatDate} from '../../../assets/constants/date';
import {colors} from '../../../assets/colors/colors';

interface IProps {
  endTime: number;
  onEnd?: () => void;
}

const Timer = ({endTime, onEnd}: IProps) => {
  const gtmDate = Date.now();
  const [milliseconds, setMilliseconds] = useState(endTime - gtmDate);
  const hasDays = milliseconds > 86400000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (milliseconds < 1000) {
        onEnd?.();
      }
      setMilliseconds(milliseconds - 1000);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milliseconds]);

  useEffect(() => {
    setMilliseconds(endTime - gtmDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  return (
    <View
      style={{
        backgroundColor: colors.white,
        width: 80,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <Text
        numberOfLines={1}
        style={{
          color: colors.green,
          fontFamily: 'Rubik-Bold',
          fontSize: 14,
          width: 90,
          paddingHorizontal: 10,
        }}>
        {formatDate(new Date(milliseconds), hasDays ? 'DD' : 'hhh:mm:ss')}
      </Text>
    </View>
  );
};

export default Timer;
